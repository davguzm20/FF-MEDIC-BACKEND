-- AlterTable
ALTER TABLE "ff_medic_db"."active_ingredients" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ff_medic_db"."allergy_histories" ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "ff_medic_db"."clinical_histories" ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "ff_medic_db"."dosage_forms" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ff_medic_db"."family_histories" ALTER COLUMN "other" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "ff_medic_db"."gynecological_histories" ALTER COLUMN "menstrual_cycle" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "other" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "orientation" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "ff_medic_db"."manufacturers" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ff_medic_db"."medicaments" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "concentration" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "ff_medic_db"."patients" ALTER COLUMN "document_number" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "paternal_surname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "maternal_surname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "ff_medic_db"."ram_histories" ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "ff_medic_db"."roles" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "ff_medic_db"."users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "paternal_surname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "maternal_surname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "cmp_code" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(254);
