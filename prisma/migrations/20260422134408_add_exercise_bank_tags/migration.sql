-- CreateTable
CREATE TABLE "ExerciseBank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExerciseBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseBank_Tag" (
    "exerciseBankId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ExerciseBank_Tag_pkey" PRIMARY KEY ("exerciseBankId","tagId")
);

-- AddForeignKey
ALTER TABLE "ExerciseBank_Tag" ADD CONSTRAINT "ExerciseBank_Tag_exerciseBankId_fkey" FOREIGN KEY ("exerciseBankId") REFERENCES "ExerciseBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseBank_Tag" ADD CONSTRAINT "ExerciseBank_Tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
