-- CreateTable
CREATE TABLE "personal_stats" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "personal_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "personal_stats_userId_idx" ON "personal_stats"("userId");

-- AddForeignKey
ALTER TABLE "personal_stats" ADD CONSTRAINT "personal_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
