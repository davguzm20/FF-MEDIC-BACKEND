-- Drop FKs allergy_histories
ALTER TABLE "ff_medic_db"."allergy_histories" DROP CONSTRAINT IF EXISTS "fk_allergy_histories_diagnosis_id";

-- Drop FKs ram_histories
ALTER TABLE "ff_medic_db"."ram_histories" DROP CONSTRAINT IF EXISTS "fk_ram_histories_active_ingredient_id";
ALTER TABLE "ff_medic_db"."ram_histories" DROP CONSTRAINT IF EXISTS "fk_ram_histories_diagnosis_id";

-- Drop columns
ALTER TABLE "ff_medic_db"."allergy_histories" DROP COLUMN IF EXISTS "diagnosis_id";
ALTER TABLE "ff_medic_db"."ram_histories" DROP COLUMN IF EXISTS "active_ingredient_id";
ALTER TABLE "ff_medic_db"."ram_histories" DROP COLUMN IF EXISTS "diagnosis_id";

-- Make specifications NOT NULL
ALTER TABLE "ff_medic_db"."allergy_histories" ALTER COLUMN "specifications" SET NOT NULL;
ALTER TABLE "ff_medic_db"."ram_histories" ALTER COLUMN "specifications" SET NOT NULL;
