-- CreateTable
CREATE TABLE "ff_medic_db"."exam_types" (
    "exam_type_id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "exam_types_pkey" PRIMARY KEY ("exam_type_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."exams" (
    "exam_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."exam_items" (
    "exam_item_id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "exam_type_id" INTEGER NOT NULL,
    "indications" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_items_pkey" PRIMARY KEY ("exam_item_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."prescriptions" (
    "prescription_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("prescription_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."prescription_items" (
    "prescription_item_id" SERIAL NOT NULL,
    "prescription_id" INTEGER NOT NULL,
    "medicament_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "indications" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prescription_items_pkey" PRIMARY KEY ("prescription_item_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."prescription_diagnoses" (
    "prescription_item_id" INTEGER NOT NULL,
    "attention_diagnosis_id" INTEGER NOT NULL,

    CONSTRAINT "prescription_diagnoses_pkey" PRIMARY KEY ("prescription_item_id", "attention_diagnosis_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."referrals" (
    "referral_id" SERIAL NOT NULL,
    "attention_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "diagnosis_id" INTEGER,
    "reason" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("referral_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_types_description_key" ON "ff_medic_db"."exam_types"("description");

-- AddForeignKey
ALTER TABLE "ff_medic_db"."exams" ADD CONSTRAINT "exams_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."exam_items" ADD CONSTRAINT "exam_items_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "ff_medic_db"."exams"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."exam_items" ADD CONSTRAINT "exam_items_exam_type_id_fkey" FOREIGN KEY ("exam_type_id") REFERENCES "ff_medic_db"."exam_types"("exam_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."prescriptions" ADD CONSTRAINT "prescriptions_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."prescription_items" ADD CONSTRAINT "prescription_items_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "ff_medic_db"."prescriptions"("prescription_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."prescription_items" ADD CONSTRAINT "prescription_items_medicament_id_fkey" FOREIGN KEY ("medicament_id") REFERENCES "ff_medic_db"."medicaments"("medicament_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."prescription_diagnoses" ADD CONSTRAINT "prescription_diagnoses_prescription_item_id_fkey" FOREIGN KEY ("prescription_item_id") REFERENCES "ff_medic_db"."prescription_items"("prescription_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."prescription_diagnoses" ADD CONSTRAINT "prescription_diagnoses_attention_diagnosis_id_fkey" FOREIGN KEY ("attention_diagnosis_id") REFERENCES "ff_medic_db"."attention_diagnoses"("attention_diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."referrals" ADD CONSTRAINT "referrals_attention_id_fkey" FOREIGN KEY ("attention_id") REFERENCES "ff_medic_db"."attentions"("attention_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."referrals" ADD CONSTRAINT "referrals_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "ff_medic_db"."services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."referrals" ADD CONSTRAINT "referrals_diagnosis_id_fkey" FOREIGN KEY ("diagnosis_id") REFERENCES "ff_medic_db"."diagnoses"("diagnosis_id") ON DELETE RESTRICT ON UPDATE CASCADE;
