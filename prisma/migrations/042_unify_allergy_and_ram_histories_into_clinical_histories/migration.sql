-- Add observations column to clinical_histories
ALTER TABLE "ff_medic_db"."clinical_histories" ADD COLUMN "observations" VARCHAR(200);

-- Add RAM value to HistoryType enum
ALTER TYPE "ff_medic_db"."HistoryType" ADD VALUE 'RAM';

-- Drop triggers before dropping tables
DROP TRIGGER IF EXISTS trg_allergy_histories_audit ON "ff_medic_db"."allergy_histories";
DROP TRIGGER IF EXISTS trg_allergy_histories_updated_at ON "ff_medic_db"."allergy_histories";
DROP TRIGGER IF EXISTS trg_ram_histories_audit ON "ff_medic_db"."ram_histories";
DROP TRIGGER IF EXISTS trg_ram_histories_updated_at ON "ff_medic_db"."ram_histories";

-- Drop allergy_histories table
DROP TABLE IF EXISTS "ff_medic_db"."allergy_histories";

-- Drop ram_histories table
DROP TABLE IF EXISTS "ff_medic_db"."ram_histories";
