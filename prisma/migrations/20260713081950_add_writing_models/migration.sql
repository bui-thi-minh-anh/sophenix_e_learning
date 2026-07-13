-- CreateTable
CREATE TABLE "WritingPrompt" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "hints" TEXT[],
    "minWords" INTEGER NOT NULL DEFAULT 50,
    "maxWords" INTEGER NOT NULL DEFAULT 300,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WritingPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "essay" TEXT NOT NULL,
    "scoreGrammar" INTEGER NOT NULL DEFAULT 0,
    "scoreVocabulary" INTEGER NOT NULL DEFAULT 0,
    "scoreCoherence" INTEGER NOT NULL DEFAULT 0,
    "scoreTask" INTEGER NOT NULL DEFAULT 0,
    "scoreOverall" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT NOT NULL DEFAULT '',
    "corrections" TEXT NOT NULL DEFAULT '',
    "improved" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WritingPrompt_slug_key" ON "WritingPrompt"("slug");

-- CreateIndex
CREATE INDEX "WritingResult_userId_idx" ON "WritingResult"("userId");

-- CreateIndex
CREATE INDEX "WritingResult_promptId_idx" ON "WritingResult"("promptId");

-- CreateIndex
CREATE INDEX "WritingResult_userId_createdAt_idx" ON "WritingResult"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "WritingResult" ADD CONSTRAINT "WritingResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingResult" ADD CONSTRAINT "WritingResult_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "WritingPrompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
