-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "subjectTopicId" TEXT;

-- AlterTable
ALTER TABLE "ListeningLesson" ADD COLUMN     "subjectTopicId" TEXT;

-- AlterTable
ALTER TABLE "VocabWord" ADD COLUMN     "topicId" TEXT;

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE INDEX "Lesson_subjectTopicId_idx" ON "Lesson"("subjectTopicId");

-- CreateIndex
CREATE INDEX "ListeningLesson_subjectTopicId_idx" ON "ListeningLesson"("subjectTopicId");

-- CreateIndex
CREATE INDEX "VocabWord_topicId_idx" ON "VocabWord"("topicId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectTopicId_fkey" FOREIGN KEY ("subjectTopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabWord" ADD CONSTRAINT "VocabWord_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningLesson" ADD CONSTRAINT "ListeningLesson_subjectTopicId_fkey" FOREIGN KEY ("subjectTopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
