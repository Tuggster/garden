-- CreateEnum
CREATE TYPE "api_key_level" AS ENUM ('READ', 'WRITE', 'MANAGE');

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_key" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "permissions" "api_key_level"[] DEFAULT ARRAY['READ']::"api_key_level"[],

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_id_key" ON "project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_id_key" ON "api_key"("id");

-- CreateIndex
CREATE INDEX "api_key_id_projectId_idx" ON "api_key"("id", "projectId");
