-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "series" TEXT,
    "summary" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonSection" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LessonSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "lessonId" TEXT,
    "vocabTopicId" TEXT,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "exerciseSetId" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'mcq',
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "acceptable" TEXT[],
    "explanation" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizOption" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuizOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabTopic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabWord" (
    "id" TEXT NOT NULL,
    "vocabTopicId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "ipaUk" TEXT NOT NULL DEFAULT '',
    "ipaUs" TEXT NOT NULL DEFAULT '',
    "partOfSpeech" TEXT NOT NULL DEFAULT '',
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VocabWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabCollocation" (
    "id" TEXT NOT NULL,
    "vocabTopicId" TEXT NOT NULL,
    "phrase" TEXT NOT NULL,
    "meaning" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VocabCollocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonPattern" (
    "id" TEXT NOT NULL,
    "vocabTopicId" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "examples" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CommonPattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IrregularVerb" (
    "id" TEXT NOT NULL,
    "stt" INTEGER NOT NULL,
    "v1" TEXT NOT NULL,
    "v2" TEXT NOT NULL,
    "v3" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,

    CONSTRAINT "IrregularVerb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningTopic" (
    "id" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT 'headphones',
    "emoji" TEXT NOT NULL DEFAULT '',
    "illustration" TEXT NOT NULL DEFAULT '',
    "ieltsSection" TEXT NOT NULL DEFAULT '',
    "difficulty" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListeningTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningLesson" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "lessonSlug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL DEFAULT '',
    "audioType" TEXT NOT NULL DEFAULT '',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "accent" TEXT NOT NULL DEFAULT '',
    "audio" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "difficulty" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "grammarFocus" TEXT NOT NULL DEFAULT '',
    "transcript" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListeningLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningSpeaker" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "voice" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ListeningSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningVocab" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "ipa" TEXT NOT NULL DEFAULT '',
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ListeningVocab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningFillBlank" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ListeningFillBlank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningMcq" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" TEXT NOT NULL,
    "explanation" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ListeningMcq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningTranscriptTurn" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ListeningTranscriptTurn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_slug_key" ON "Lesson"("slug");

-- CreateIndex
CREATE INDEX "LessonSection_lessonId_idx" ON "LessonSection"("lessonId");

-- CreateIndex
CREATE INDEX "ExerciseSet_lessonId_idx" ON "ExerciseSet"("lessonId");

-- CreateIndex
CREATE INDEX "ExerciseSet_vocabTopicId_idx" ON "ExerciseSet"("vocabTopicId");

-- CreateIndex
CREATE INDEX "Exercise_exerciseSetId_idx" ON "Exercise"("exerciseSetId");

-- CreateIndex
CREATE INDEX "QuizOption_exerciseId_idx" ON "QuizOption"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "VocabTopic_slug_key" ON "VocabTopic"("slug");

-- CreateIndex
CREATE INDEX "VocabWord_vocabTopicId_idx" ON "VocabWord"("vocabTopicId");

-- CreateIndex
CREATE INDEX "VocabCollocation_vocabTopicId_idx" ON "VocabCollocation"("vocabTopicId");

-- CreateIndex
CREATE INDEX "CommonPattern_vocabTopicId_idx" ON "CommonPattern"("vocabTopicId");

-- CreateIndex
CREATE UNIQUE INDEX "IrregularVerb_stt_key" ON "IrregularVerb"("stt");

-- CreateIndex
CREATE UNIQUE INDEX "ListeningTopic_topicSlug_key" ON "ListeningTopic"("topicSlug");

-- CreateIndex
CREATE INDEX "ListeningLesson_topicId_idx" ON "ListeningLesson"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "ListeningLesson_topicId_lessonSlug_key" ON "ListeningLesson"("topicId", "lessonSlug");

-- CreateIndex
CREATE INDEX "ListeningSpeaker_lessonId_idx" ON "ListeningSpeaker"("lessonId");

-- CreateIndex
CREATE INDEX "ListeningVocab_lessonId_idx" ON "ListeningVocab"("lessonId");

-- CreateIndex
CREATE INDEX "ListeningFillBlank_lessonId_idx" ON "ListeningFillBlank"("lessonId");

-- CreateIndex
CREATE INDEX "ListeningMcq_lessonId_idx" ON "ListeningMcq"("lessonId");

-- CreateIndex
CREATE INDEX "ListeningTranscriptTurn_lessonId_idx" ON "ListeningTranscriptTurn"("lessonId");

-- AddForeignKey
ALTER TABLE "LessonSection" ADD CONSTRAINT "LessonSection_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_vocabTopicId_fkey" FOREIGN KEY ("vocabTopicId") REFERENCES "VocabTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exerciseSetId_fkey" FOREIGN KEY ("exerciseSetId") REFERENCES "ExerciseSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOption" ADD CONSTRAINT "QuizOption_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabWord" ADD CONSTRAINT "VocabWord_vocabTopicId_fkey" FOREIGN KEY ("vocabTopicId") REFERENCES "VocabTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabCollocation" ADD CONSTRAINT "VocabCollocation_vocabTopicId_fkey" FOREIGN KEY ("vocabTopicId") REFERENCES "VocabTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonPattern" ADD CONSTRAINT "CommonPattern_vocabTopicId_fkey" FOREIGN KEY ("vocabTopicId") REFERENCES "VocabTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningLesson" ADD CONSTRAINT "ListeningLesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "ListeningTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningSpeaker" ADD CONSTRAINT "ListeningSpeaker_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "ListeningLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningVocab" ADD CONSTRAINT "ListeningVocab_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "ListeningLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningFillBlank" ADD CONSTRAINT "ListeningFillBlank_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "ListeningLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningMcq" ADD CONSTRAINT "ListeningMcq_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "ListeningLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningTranscriptTurn" ADD CONSTRAINT "ListeningTranscriptTurn_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "ListeningLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
