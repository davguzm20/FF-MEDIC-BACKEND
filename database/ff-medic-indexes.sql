-- ============================================================
-- Indexes F&F-MEDIC
-- Based on Physical Model v0.5
-- ============================================================

SET search_path TO ff_medic_db;

CREATE INDEX idx_patients_document_number ON patients (document_number);
CREATE INDEX idx_attentions_created_at ON attentions (created_at);

-- Patient partial-match search (requires pg_trgm extension)
CREATE INDEX idx_patients_name_trgm ON patients USING GIN (name gin_trgm_ops);
CREATE INDEX idx_patients_paternal_surname_trgm ON patients USING GIN (paternal_surname gin_trgm_ops);
CREATE INDEX idx_patients_maternal_surname_trgm ON patients USING GIN (maternal_surname gin_trgm_ops);
CREATE INDEX idx_patients_document_number_trgm ON patients USING GIN (document_number gin_trgm_ops);

CREATE INDEX idx_attentions_patient_id ON attentions (patient_id);
CREATE INDEX idx_attentions_user_id ON attentions (user_id);
CREATE INDEX idx_clinical_histories_patient_id ON clinical_histories (patient_id);
CREATE INDEX idx_family_histories_patient_id ON family_histories (patient_id);
CREATE INDEX idx_allergy_histories_patient_id ON allergy_histories (patient_id);
CREATE INDEX idx_ram_histories_patient_id ON ram_histories (patient_id);

CREATE INDEX idx_attention_diagnoses_attention_id ON attention_diagnoses (attention_id);
CREATE INDEX idx_bio_functions_attention_id ON bio_functions (attention_id);
CREATE INDEX idx_physical_exams_attention_id ON physical_exams (attention_id);
CREATE INDEX idx_exams_attention_id ON exams (attention_id);
CREATE INDEX idx_prescriptions_attention_id ON prescriptions (attention_id);
CREATE INDEX idx_referrals_attention_id ON referrals (attention_id);

-- Active ingredients, manufacturers and dosage forms partial-match search (requires pg_trgm extension)
CREATE INDEX idx_active_ingredients_name_trgm ON active_ingredients USING GIN (name gin_trgm_ops);
CREATE INDEX idx_manufacturers_name_trgm ON manufacturers USING GIN (name gin_trgm_ops);
CREATE INDEX idx_dosage_forms_name_trgm ON dosage_forms USING GIN (name gin_trgm_ops);

-- Medicaments partial-match search (requires pg_trgm extension)
CREATE INDEX idx_medicaments_name_trgm ON medicaments USING GIN (name gin_trgm_ops);
CREATE INDEX idx_medicaments_concentration_trgm ON medicaments USING GIN (concentration gin_trgm_ops);

CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_medicaments_manufacturer_id ON medicaments (manufacturer_id);
CREATE INDEX idx_medicaments_dosage_form_id ON medicaments (dosage_form_id);
CREATE INDEX idx_exam_items_exam_id ON exam_items (exam_id);
CREATE INDEX idx_exam_items_procedure_id ON exam_items (procedure_id);
CREATE INDEX idx_prescription_items_prescription_id ON prescription_items (prescription_id);
CREATE INDEX idx_referrals_service_id ON referrals (service_id);
CREATE INDEX idx_audits_user_id ON audits (user_id);

CREATE INDEX idx_audits_table_record ON audits (table_name, record_id);
CREATE INDEX idx_attention_diagnoses_diagnosis_id ON attention_diagnoses (diagnosis_id);

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON INDEX idx_patients_document_number IS 'Búsqueda de paciente por número de documento';
COMMENT ON INDEX idx_patients_name_trgm IS 'Búsqueda de paciente por nombre con coincidencia parcial';
COMMENT ON INDEX idx_patients_paternal_surname_trgm IS 'Búsqueda de paciente por apellido paterno con coincidencia parcial';
COMMENT ON INDEX idx_patients_maternal_surname_trgm IS 'Búsqueda de paciente por apellido materno con coincidencia parcial';
COMMENT ON INDEX idx_patients_document_number_trgm IS 'Búsqueda de paciente por documento con coincidencia parcial';
COMMENT ON INDEX idx_attentions_created_at IS 'Filtro de atenciones por fecha';
COMMENT ON INDEX idx_attentions_patient_id IS 'Atenciones de un paciente';
COMMENT ON INDEX idx_attentions_user_id IS 'Atenciones por médico';
COMMENT ON INDEX idx_clinical_histories_patient_id IS 'Antecedentes clínicos por paciente';
COMMENT ON INDEX idx_family_histories_patient_id IS 'Antecedentes familiares por paciente';
COMMENT ON INDEX idx_allergy_histories_patient_id IS 'Antecedentes alérgicos por paciente';
COMMENT ON INDEX idx_ram_histories_patient_id IS 'RAM por paciente';
COMMENT ON INDEX idx_attention_diagnoses_attention_id IS 'Diagnósticos de una atención';
COMMENT ON INDEX idx_bio_functions_attention_id IS 'Funciones biológicas de una atención';
COMMENT ON INDEX idx_physical_exams_attention_id IS 'Exámenes físicos de una atención';
COMMENT ON INDEX idx_exams_attention_id IS 'Órdenes de examen de una atención';
COMMENT ON INDEX idx_prescriptions_attention_id IS 'Recetas de una atención';
COMMENT ON INDEX idx_referrals_attention_id IS 'Interconsultas de una atención';
COMMENT ON INDEX idx_users_role IS 'Usuarios por rol';
COMMENT ON INDEX idx_active_ingredients_name_trgm IS 'Búsqueda de principio activo por nombre con coincidencia parcial';
COMMENT ON INDEX idx_manufacturers_name_trgm IS 'Búsqueda de fabricante por nombre con coincidencia parcial';
COMMENT ON INDEX idx_dosage_forms_name_trgm IS 'Búsqueda de forma farmacéutica por nombre con coincidencia parcial';
COMMENT ON INDEX idx_medicaments_name_trgm IS 'Búsqueda de medicamento por nombre con coincidencia parcial';
COMMENT ON INDEX idx_medicaments_concentration_trgm IS 'Búsqueda de medicamento por concentración con coincidencia parcial';
COMMENT ON INDEX idx_medicaments_manufacturer_id IS 'Medicamentos por fabricante';
COMMENT ON INDEX idx_medicaments_dosage_form_id IS 'Medicamentos por forma farmacéutica';
COMMENT ON INDEX idx_exam_items_exam_id IS 'Ítems de una orden de examen';
COMMENT ON INDEX idx_exam_items_procedure_id IS 'Ítems por procedimiento';
COMMENT ON INDEX idx_prescription_items_prescription_id IS 'Ítems de una receta';
COMMENT ON INDEX idx_referrals_service_id IS 'Interconsultas por servicio de destino';
COMMENT ON INDEX idx_audits_user_id IS 'Auditoría por usuario';
COMMENT ON INDEX idx_audits_table_record IS 'Auditoría por tabla y registro';
COMMENT ON INDEX idx_attention_diagnoses_diagnosis_id IS 'Atenciones por diagnóstico';
