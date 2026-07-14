import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const FREE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
];

function isQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes("429") || msg.includes("quota") || msg.includes("Too Many Requests") || msg.includes("RESOURCE_EXHAUSTED");
}

async function generateWithFallback(contents: Content[]): Promise<string> {
  let lastError: unknown;
  for (const modelName of FREE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({ contents });
      return result.response.text().trim();
    } catch (err) {
      lastError = err;
      if (isQuotaError(err)) continue;
      throw err;
    }
  }
  throw lastError;
}

const SYSTEM_PROMPT = `You are an English speaking coach for Vietnamese learners. You evaluate spoken English transcripts.

IMPORTANT: Always respond in valid JSON with this exact structure:
{
  "scoreGrammar": <0-100>,
  "scoreVocabulary": <0-100>,
  "scoreFluency": <0-100>,
  "scoreTask": <0-100>,
  "scoreOverall": <0-100>,
  "feedback": "<overall feedback in Vietnamese, 2-3 sentences>",
  "corrections": "<specific grammar/vocabulary corrections in Vietnamese, use bullet points>",
  "suggestedResponse": "<a model answer in English that the student can learn from>"
}

Scoring rubric:
- Grammar (scoreGrammar): sentence structure, tense, subject-verb agreement, articles
- Vocabulary (scoreVocabulary): word choice, range, appropriateness for the topic
- Fluency (scoreFluency): natural flow, filler words, hesitation markers, coherence
- Task completion (scoreTask): did they address the prompt fully?
- Overall (scoreOverall): weighted average, be encouraging but honest

For beginners (A1-A2): be lenient, focus on communication success
For intermediate (B1-B2): expect more accuracy and range
For advanced (C1-C2): expect near-native fluency and sophistication

Always give actionable, specific feedback. Be encouraging.`;

export interface SpeakingEvaluation {
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreFluency: number;
  scoreTask: number;
  scoreOverall: number;
  feedback: string;
  corrections: string;
  suggestedResponse: string;
}

// ─── Writing evaluation ──────────────────────────────────

const WRITING_SYSTEM = `You are an English writing coach for Vietnamese learners. You evaluate written essays.

IMPORTANT: Always respond in valid JSON with this exact structure:
{
  "scoreGrammar": <0-100>,
  "scoreVocabulary": <0-100>,
  "scoreCoherence": <0-100>,
  "scoreTask": <0-100>,
  "scoreOverall": <0-100>,
  "feedback": "<overall feedback in Vietnamese, 2-3 sentences>",
  "corrections": "<specific corrections in Vietnamese with examples, use bullet points>",
  "improved": "<an improved version of the student's essay in English>"
}

Scoring rubric:
- Grammar (scoreGrammar): sentence structure, tense consistency, articles, prepositions
- Vocabulary (scoreVocabulary): word choice, range, collocations, spelling
- Coherence (scoreCoherence): logical flow, paragraph structure, linking words, organization
- Task completion (scoreTask): did they address the prompt fully and appropriately?
- Overall (scoreOverall): weighted average

For beginners (A1-A2): focus on basic communication, be encouraging
For intermediate (B1-B2): expect proper paragraphs and varied vocabulary
For advanced (C1-C2): expect sophisticated language and argumentation

Give specific, actionable corrections. Be encouraging but honest.`;

export interface WritingEvaluation {
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreCoherence: number;
  scoreTask: number;
  scoreOverall: number;
  feedback: string;
  corrections: string;
  improved: string;
}

export async function evaluateWriting(
  prompt: string,
  level: string,
  essay: string,
): Promise<WritingEvaluation> {
  const userMessage = `Level: ${level}
Prompt: ${prompt}
Student's essay:
"${essay}"

Evaluate this writing attempt. Respond ONLY with the JSON object, no markdown.`;

  const text = await generateWithFallback([
    { role: "user", parts: [{ text: WRITING_SYSTEM }] },
    { role: "model", parts: [{ text: "Understood. I will evaluate writing and respond only with valid JSON." }] },
    { role: "user", parts: [{ text: userMessage }] },
  ]);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini did not return valid JSON");

  const parsed = JSON.parse(jsonMatch[0]) as WritingEvaluation;
  const clamp = (n: unknown) => Math.max(0, Math.min(100, Number(n) || 0));

  return {
    scoreGrammar: clamp(parsed.scoreGrammar),
    scoreVocabulary: clamp(parsed.scoreVocabulary),
    scoreCoherence: clamp(parsed.scoreCoherence),
    scoreTask: clamp(parsed.scoreTask),
    scoreOverall: clamp(parsed.scoreOverall),
    feedback: String(parsed.feedback ?? ""),
    corrections: String(parsed.corrections ?? ""),
    improved: String(parsed.improved ?? ""),
  };
}

// ─── Speaking evaluation ─────────────────────────────────

export async function evaluateSpeaking(
  prompt: string,
  level: string,
  transcript: string,
): Promise<SpeakingEvaluation> {
  const userMessage = `Level: ${level}
Prompt: ${prompt}
Student's spoken transcript: "${transcript}"

Evaluate this speaking attempt. Respond ONLY with the JSON object, no markdown.`;

  const text = await generateWithFallback([
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I will evaluate speaking transcripts and respond only with valid JSON." }] },
    { role: "user", parts: [{ text: userMessage }] },
  ]);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini did not return valid JSON");

  const parsed = JSON.parse(jsonMatch[0]) as SpeakingEvaluation;
  const clamp = (n: unknown) => Math.max(0, Math.min(100, Number(n) || 0));

  return {
    scoreGrammar: clamp(parsed.scoreGrammar),
    scoreVocabulary: clamp(parsed.scoreVocabulary),
    scoreFluency: clamp(parsed.scoreFluency),
    scoreTask: clamp(parsed.scoreTask),
    scoreOverall: clamp(parsed.scoreOverall),
    feedback: String(parsed.feedback ?? ""),
    corrections: String(parsed.corrections ?? ""),
    suggestedResponse: String(parsed.suggestedResponse ?? ""),
  };
}
