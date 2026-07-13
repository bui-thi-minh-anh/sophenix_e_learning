-- CreateTable
CREATE TABLE "SpeakingPrompt" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "hints" TEXT[],
    "durationSec" INTEGER NOT NULL DEFAULT 60,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpeakingPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakingResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "scoreGrammar" INTEGER NOT NULL DEFAULT 0,
    "scoreVocabulary" INTEGER NOT NULL DEFAULT 0,
    "scoreFluency" INTEGER NOT NULL DEFAULT 0,
    "scoreTask" INTEGER NOT NULL DEFAULT 0,
    "scoreOverall" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT NOT NULL DEFAULT '',
    "corrections" TEXT NOT NULL DEFAULT '',
    "suggestedResponse" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeakingResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpeakingPrompt_slug_key" ON "SpeakingPrompt"("slug");

-- CreateIndex
CREATE INDEX "SpeakingResult_userId_idx" ON "SpeakingResult"("userId");

-- CreateIndex
CREATE INDEX "SpeakingResult_promptId_idx" ON "SpeakingResult"("promptId");

-- CreateIndex
CREATE INDEX "SpeakingResult_userId_createdAt_idx" ON "SpeakingResult"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "SpeakingResult" ADD CONSTRAINT "SpeakingResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakingResult" ADD CONSTRAINT "SpeakingResult_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "SpeakingPrompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
