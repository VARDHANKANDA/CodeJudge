-- CreateEnum if not exists
DO $$ BEGIN
    CREATE TYPE "QualityStatus" AS ENUM ('DRAFT', 'REVIEW', 'VERIFIED', 'PUBLISHED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable Problem: Add missing columns
ALTER TABLE "Problem" 
ADD COLUMN IF NOT EXISTS "qualityStatus" "QualityStatus" NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS "inputFormat" TEXT,
ADD COLUMN IF NOT EXISTS "outputFormat" TEXT,
ADD COLUMN IF NOT EXISTS "hints" JSONB,
ADD COLUMN IF NOT EXISTS "supportedLanguages" JSONB,
ADD COLUMN IF NOT EXISTS "referenceSolutions" JSONB,
ADD COLUMN IF NOT EXISTS "source" TEXT,
ADD COLUMN IF NOT EXISTS "license" TEXT;

-- AlterTable Editorial: Add missing columns
ALTER TABLE "Editorial"
ADD COLUMN IF NOT EXISTS "approach" TEXT,
ADD COLUMN IF NOT EXISTS "algorithm" TEXT,
ADD COLUMN IF NOT EXISTS "timeComplexity" TEXT,
ADD COLUMN IF NOT EXISTS "spaceComplexity" TEXT,
ADD COLUMN IF NOT EXISTS "referenceCode" JSONB;
