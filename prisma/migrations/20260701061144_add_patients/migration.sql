-- CreateEnum
CREATE TYPE "ff_medic_db"."DocumentType" AS ENUM ('DNI', 'PASAPORTE', 'CE');

-- CreateEnum
CREATE TYPE "ff_medic_db"."SexType" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "ff_medic_db"."HistoryType" AS ENUM ('PATOLOGICO', 'QUIRURGICO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."FamilyType" AS ENUM ('PADRE', 'MADRE', 'HIJO', 'HERMANO', 'ABUELO', 'TIO', 'OTRO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."FamilyStatus" AS ENUM ('VIVO', 'FALLECIDO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."ContraceptiveMethod" AS ENUM ('NINGUNO', 'AOC', 'INYECTABLE', 'IMPLANTE', 'DIU', 'PRESERVATIVO', 'LIGADURA', 'VASECTOMIA', 'OTRO');

-- CreateTable
CREATE TABLE "ff_medic_db"."patients" (
    "patient_id" SERIAL NOT NULL,
    "document_type" "ff_medic_db"."DocumentType" NOT NULL,
    "document_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paternal_surname" TEXT NOT NULL,
    "maternal_surname" TEXT NOT NULL,
    "sex" "ff_medic_db"."SexType" NOT NULL,
    "phone" TEXT,
    "birth_date" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."clinical_histories" (
    "clinical_history_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER NOT NULL,
    "type" "ff_medic_db"."HistoryType" NOT NULL,
    "specifications" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinical_histories_pkey" PRIMARY KEY ("clinical_history_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."family_histories" (
    "family_history_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "type" "ff_medic_db"."FamilyType" NOT NULL,
    "other" TEXT,
    "status" "ff_medic_db"."FamilyStatus" NOT NULL,
    "specifications" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_histories_pkey" PRIMARY KEY ("family_history_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."gynecological_histories" (
    "gynecological_history_id" SERIAL NOT NULL,
    "patient_id" INTEGER,
    "menarche" INTEGER,
    "menstrual_cycle" TEXT,
    "last_menstrual_period" DATE,
    "contraceptive_method" "ff_medic_db"."ContraceptiveMethod",
    "other" TEXT,
    "gestations" INTEGER,
    "parity" INTEGER,
    "orientation" TEXT,
    "andria" INTEGER,
    "isa" DATE,
    "lsa" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gynecological_histories_pkey" PRIMARY KEY ("gynecological_history_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."allergy_histories" (
    "allergy_history_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER NOT NULL,
    "specifications" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergy_histories_pkey" PRIMARY KEY ("allergy_history_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."ram_histories" (
    "ram_history_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "active_ingredient_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER NOT NULL,
    "specifications" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ram_histories_pkey" PRIMARY KEY ("ram_history_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_document_type_document_number_key" ON "ff_medic_db"."patients"("document_type", "document_number");

-- CreateIndex
CREATE UNIQUE INDEX "gynecological_histories_patient_id_key" ON "ff_medic_db"."gynecological_histories"("patient_id");

-- AddForeignKey
ALTER TABLE "ff_medic_db"."clinical_histories" ADD CONSTRAINT "clinical_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."family_histories" ADD CONSTRAINT "family_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."gynecological_histories" ADD CONSTRAINT "gynecological_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."allergy_histories" ADD CONSTRAINT "allergy_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."ram_histories" ADD CONSTRAINT "ram_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
