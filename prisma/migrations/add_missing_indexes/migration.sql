-- AlterTable (align audits table with Prisma conventions)
ALTER TABLE "ff_medic_db"."audits" RENAME CONSTRAINT "pk_audits" TO "audits_pkey";

ALTER TABLE "ff_medic_db"."audits" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- RenameForeignKey
ALTER TABLE "ff_medic_db"."audits" RENAME CONSTRAINT "fk_audits_user_id" TO "audits_user_id_fkey";

-- CreateIndex
CREATE INDEX "idx_allergy_histories_patient_id" ON "ff_medic_db"."allergy_histories"("patient_id");

CREATE INDEX "idx_attention_diagnoses_attention_id" ON "ff_medic_db"."attention_diagnoses"("attention_id");
CREATE INDEX "idx_attention_diagnoses_diagnosis_id" ON "ff_medic_db"."attention_diagnoses"("diagnosis_id");
CREATE INDEX "idx_attentions_created_at" ON "ff_medic_db"."attentions"("created_at");
CREATE INDEX "idx_attentions_patient_id" ON "ff_medic_db"."attentions"("patient_id");
CREATE INDEX "idx_bio_functions_attention_id" ON "ff_medic_db"."bio_functions"("attention_id");
CREATE INDEX "idx_clinical_histories_patient_id" ON "ff_medic_db"."clinical_histories"("patient_id");
CREATE INDEX "idx_exam_items_exam_id" ON "ff_medic_db"."exam_items"("exam_id");
CREATE INDEX "idx_exam_items_exam_type_id" ON "ff_medic_db"."exam_items"("exam_type_id");
CREATE INDEX "idx_exams_attention_id" ON "ff_medic_db"."exams"("attention_id");
CREATE INDEX "idx_family_histories_patient_id" ON "ff_medic_db"."family_histories"("patient_id");
CREATE INDEX "idx_medicaments_manufacturer_id" ON "ff_medic_db"."medicaments"("manufacturer_id");
CREATE INDEX "idx_medicaments_dosage_form_id" ON "ff_medic_db"."medicaments"("dosage_form_id");
CREATE INDEX "idx_patients_document_number" ON "ff_medic_db"."patients"("document_number");
CREATE INDEX "idx_physical_exams_attention_id" ON "ff_medic_db"."physical_exams"("attention_id");
CREATE INDEX "idx_prescription_items_prescription_id" ON "ff_medic_db"."prescription_items"("prescription_id");
CREATE INDEX "idx_prescriptions_attention_id" ON "ff_medic_db"."prescriptions"("attention_id");
CREATE INDEX "idx_ram_histories_patient_id" ON "ff_medic_db"."ram_histories"("patient_id");
CREATE INDEX "idx_referrals_attention_id" ON "ff_medic_db"."referrals"("attention_id");
CREATE INDEX "idx_referrals_service_id" ON "ff_medic_db"."referrals"("service_id");
CREATE INDEX "idx_referrals_diagnosis_id" ON "ff_medic_db"."referrals"("diagnosis_id");
CREATE INDEX "idx_signs_symptoms_attention_id" ON "ff_medic_db"."signs_symptoms"("attention_id");
CREATE INDEX "idx_signs_symptoms_diagnosis_id" ON "ff_medic_db"."signs_symptoms"("diagnosis_id");
CREATE INDEX "idx_users_role_id" ON "ff_medic_db"."users"("role_id");
