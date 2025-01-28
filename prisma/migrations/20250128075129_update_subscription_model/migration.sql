-- CreateEnum
CREATE TYPE "SUBSCRIPTION_PLAN" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "INTEGRATIONS" AS ENUM ('INSTAGRAM');

-- CreateEnum
CREATE TYPE "LISTENER" AS ENUM ('MESSAGE', 'SMARTAI');

-- CreateEnum
CREATE TYPE "MEDIATYPE" AS ENUM ('IMAGE', 'VIDEO', 'CAROSEL_ALBUM');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plan" "SUBSCRIPTION_PLAN" NOT NULL DEFAULT 'FREE',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "name" "INTEGRATIONS" NOT NULL DEFAULT 'INSTAGRAM',
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "instargramId" TEXT,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Automation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'Untitled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Triger" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "automationId" UUID,
    "promt" TEXT NOT NULL,
    "comentReply" TEXT,
    "listener" "LISTENER" NOT NULL DEFAULT 'MESSAGE',
    "dmCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Triger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listener" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "automationId" UUID NOT NULL,

    CONSTRAINT "Listener_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "automationId" UUID,
    "caption" TEXT,
    "media" TEXT NOT NULL,
    "mediaType" "MEDIATYPE" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DMS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "automationId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "sender" TEXT,
    "reciver" TEXT,
    "message" TEXT,

    CONSTRAINT "DMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "automationId" UUID,
    "word" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_firstname_key" ON "User"("firstname");

-- CreateIndex
CREATE UNIQUE INDEX "User_lastname_key" ON "User"("lastname");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Integration_token_key" ON "Integration"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Integration_instargramId_key" ON "Integration"("instargramId");

-- CreateIndex
CREATE UNIQUE INDEX "Listener_automationId_key" ON "Listener"("automationId");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_word_automationId_key" ON "Keyword"("word", "automationId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Automation" ADD CONSTRAINT "Automation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triger" ADD CONSTRAINT "Triger_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listener" ADD CONSTRAINT "Listener_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DMS" ADD CONSTRAINT "DMS_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
