-- CreateEnum
CREATE TYPE "ff_medic_db"."OnsetType" AS ENUM ('INSIDIOSO', 'BRUSCO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."CourseType" AS ENUM ('PROGRESIVO', 'ESTACIONARIO', 'INTERMITENTE');

-- CreateEnum
CREATE TYPE "ff_medic_db"."DiagnosisType" AS ENUM ('PRESUNTIVO', 'DEFINITIVO', 'REPETITIVO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."BioFunctionType" AS ENUM ('SED', 'APETITO', 'SUEÑO', 'ESTADO_ANIMO', 'ORINA', 'DEPOSICIONES', 'VARIACION_PONDERAL');

-- CreateEnum
CREATE TYPE "ff_medic_db"."BioFunctionStatus" AS ENUM ('AUMENTADO', 'DISMINUIDO', 'CONSERVADO', 'NO_EVALUADO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."PhysicalExamSystem" AS ENUM ('ASPECTO_GENERAL', 'PIEL_FANERAS', 'CABEZA', 'CUELLO', 'TORAX_PULMONES', 'CARDIOVASCULAR', 'ABDOMEN', 'GENITOURINARIO', 'SOMA', 'SNC', 'OTRO');

-- CreateEnum
CREATE TYPE "ff_medic_db"."PhysicalExamStatus" AS ENUM ('CONSERVADO', 'OBSERVADO', 'DIFERIDO');

-- CreateTable
CREATE TABLE "ff_medic_db"."services" (
    "service_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."diagnoses" (
    "diagnosis_id" SERIAL NOT NULL,
    "cie_10" VARCHAR(10) NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "diagnoses_pkey" PRIMARY KEY ("diagnosis_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."attentions" (
    "attention_id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "illness_duration" VARCHAR(50) NOT NULL,
    "onset_type" "ff_medic_db"."OnsetType" NOT NULL,
    "course" "ff_medic_db"."CourseType" NOT NULL,
    "current_disease" TEXT NOT NULL,
    "work_plan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attentions_pkey" PRIMARY KEY ("attention_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."attention_diagnoses" (
    "attention_diagnosis_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER NOT NULL,
    "type" "ff_medic_db"."DiagnosisType" NOT NULL,
    "specifications" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attention_diagnoses_pkey" PRIMARY KEY ("attention_diagnosis_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."signs_symptoms" (
    "sign_symptom_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER NOT NULL,
    "observations" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signs_symptoms_pkey" PRIMARY KEY ("sign_symptom_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."health_metrics" (
    "health_metric_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "temperature" DECIMAL(4,2),
    "spo2" INTEGER,
    "heart_rate" INTEGER,
    "respiratory_rate" INTEGER,
    "systolic_bp" INTEGER,
    "diastolic_bp" INTEGER,
    "hgt" DECIMAL(5,2),
    "hemoglobin" DECIMAL(4,2),
    "weight" DECIMAL(5,2),
    "abdominal_perimeter" DECIMAL(5,2),
    "height" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_metrics_pkey" PRIMARY KEY ("health_metric_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."bio_functions" (
    "bio_function_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "type" "ff_medic_db"."BioFunctionType" NOT NULL,
    "status" "ff_medic_db"."BioFunctionStatus" NOT NULL,
    "observations" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bio_functions_pkey" PRIMARY KEY ("bio_function_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."physical_exams" (
    "physical_exam_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "system" "ff_medic_db"."PhysicalExamSystem" NOT NULL,
    "other" VARCHAR(100),
    "status" "ff_medic_db"."PhysicalExamStatus" NOT NULL,
    "observations" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "physical_exams_pkey" PRIMARY KEY ("physical_exam_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "ff_medic_db"."services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "diagnoses_cie_10_key" ON "ff_medic_db"."diagnoses"("cie_10");

-- CreateIndex
CREATE UNIQUE INDEX "attention_diagnoses_attention_id_diagnosis_id_key" ON "ff_medic_db"."attention_diagnoses"("attention_id", "diagnosis_id");

-- CreateIndex
CREATE UNIQUE INDEX "health_metrics_attention_id_key" ON "ff_medic_db"."health_metrics"("attention_id");

-- CreateIndex
CREATE UNIQUE INDEX "bio_functions_attention_id_type_key" ON "ff_medic_db"."bio_functions"("attention_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "physical_exams_attention_id_system_key" ON "ff_medic_db"."physical_exams"("attention_id", "system");

-- AddForeignKey
ALTER TABLE "ff_medic_db"."clinical_histories" ADD CONSTRAINT "clinical_histories_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."allergy_histories" ADD CONSTRAINT "allergy_histories_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."ram_histories" ADD CONSTRAINT "ram_histories_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."attentions" ADD CONSTRAINT "attentions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "ff_medic_db"."patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."attentions" ADD CONSTRAINT "attentions_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "ff_medic_db"."services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."attention_diagnoses" ADD CONSTRAINT "attention_diagnoses_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."attention_diagnoses" ADD CONSTRAINT "attention_diagnoses_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."signs_symptoms" ADD CONSTRAINT "signs_symptoms_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."signs_symptoms" ADD CONSTRAINT "signs_symptoms_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "health_metrics_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."bio_functions" ADD CONSTRAINT "bio_functions_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."physical_exams" ADD CONSTRAINT "physical_exams_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add CHECK constraints para health_metrics (alineado con ff-medic-schema.sql)

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_spo2" CHECK (spo2 >= 0 AND spo2 <= 100);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_temperature" CHECK (temperature >= 30 AND temperature <= 45);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_heart_rate" CHECK (heart_rate > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_respiratory_rate" CHECK (respiratory_rate > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_systolic_bp" CHECK (systolic_bp > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_diastolic_bp" CHECK (diastolic_bp > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_hgt" CHECK (hgt > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_hemoglobin" CHECK (hemoglobin > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_weight" CHECK (weight > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_abdominal_perimeter" CHECK (abdominal_perimeter > 0);

ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_height" CHECK (height > 0);
