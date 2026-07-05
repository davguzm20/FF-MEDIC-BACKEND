-- ============================================================
-- Audit context columns: ip + user_agent
-- Replaces audit_trigger() to populate the new columns using:
--   1. current_setting('app.ip' / 'app.user_agent') set by the app
--   2. inet_client_addr() / application_name for direct DB connections
-- Function body changed, so audit triggers must be recreated.
-- ============================================================

-- CreateFunction (audit_trigger with ip + user_agent)
CREATE OR REPLACE FUNCTION ff_medic_db.audit_trigger()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
DECLARE
    pk_value INTEGER;
    pk_column TEXT;
BEGIN
    SELECT a.attname INTO pk_column
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = TG_RELID AND i.indisprimary
    ORDER BY a.attnum
    LIMIT 1;

    EXECUTE format('SELECT ($1).%I', pk_column) INTO pk_value USING COALESCE(NEW, OLD);

    INSERT INTO ff_medic_db.audits (table_name, record_id, action, user_id, old_data, new_data, ip, user_agent)
    VALUES (
        TG_TABLE_NAME,
        pk_value,
        CASE TG_OP
            WHEN 'INSERT' THEN 'INSERTAR'::ff_medic_db."ActionType"
            WHEN 'UPDATE' THEN 'ACTUALIZAR'::ff_medic_db."ActionType"
            WHEN 'DELETE' THEN 'ELIMINAR'::ff_medic_db."ActionType"
        END,
        NULLIF(current_setting('app.current_user_id', true), '')::INTEGER,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD)::jsonb END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb END,
        COALESCE(
            NULLIF(current_setting('app.ip', true), '')::VARCHAR(45),
            inet_client_addr()::VARCHAR(45)
        ),
        COALESCE(
            NULLIF(current_setting('app.user_agent', true), '')::VARCHAR(250),
            current_setting('application_name', true)
        )
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- DropAuditTriggers (idempotent)
DROP TRIGGER IF EXISTS trg_patients_audit ON ff_medic_db.patients;
DROP TRIGGER IF EXISTS trg_roles_audit ON ff_medic_db.roles;
DROP TRIGGER IF EXISTS trg_users_audit ON ff_medic_db.users;
DROP TRIGGER IF EXISTS trg_services_audit ON ff_medic_db.services;
DROP TRIGGER IF EXISTS trg_diagnoses_audit ON ff_medic_db.diagnoses;
DROP TRIGGER IF EXISTS trg_active_ingredients_audit ON ff_medic_db.active_ingredients;
DROP TRIGGER IF EXISTS trg_manufacturers_audit ON ff_medic_db.manufacturers;
DROP TRIGGER IF EXISTS trg_dosage_forms_audit ON ff_medic_db.dosage_forms;
DROP TRIGGER IF EXISTS trg_medicaments_audit ON ff_medic_db.medicaments;
DROP TRIGGER IF EXISTS trg_medicaments_ingredients_audit ON ff_medic_db.medicaments_ingredients;
DROP TRIGGER IF EXISTS trg_attentions_audit ON ff_medic_db.attentions;
DROP TRIGGER IF EXISTS trg_attention_diagnoses_audit ON ff_medic_db.attention_diagnoses;
DROP TRIGGER IF EXISTS trg_signs_symptoms_audit ON ff_medic_db.signs_symptoms;
DROP TRIGGER IF EXISTS trg_health_metrics_audit ON ff_medic_db.health_metrics;
DROP TRIGGER IF EXISTS trg_bio_functions_audit ON ff_medic_db.bio_functions;
DROP TRIGGER IF EXISTS trg_physical_exams_audit ON ff_medic_db.physical_exams;
DROP TRIGGER IF EXISTS trg_exams_audit ON ff_medic_db.exams;
DROP TRIGGER IF EXISTS trg_procedures_audit ON ff_medic_db.procedures;
DROP TRIGGER IF EXISTS trg_exam_items_audit ON ff_medic_db.exam_items;
DROP TRIGGER IF EXISTS trg_prescriptions_audit ON ff_medic_db.prescriptions;
DROP TRIGGER IF EXISTS trg_prescription_items_audit ON ff_medic_db.prescription_items;
DROP TRIGGER IF EXISTS trg_prescription_diagnoses_audit ON ff_medic_db.prescription_diagnoses;
DROP TRIGGER IF EXISTS trg_referrals_audit ON ff_medic_db.referrals;
DROP TRIGGER IF EXISTS trg_clinical_histories_audit ON ff_medic_db.clinical_histories;
DROP TRIGGER IF EXISTS trg_family_histories_audit ON ff_medic_db.family_histories;
DROP TRIGGER IF EXISTS trg_gynecological_histories_audit ON ff_medic_db.gynecological_histories;
DROP TRIGGER IF EXISTS trg_allergy_histories_audit ON ff_medic_db.allergy_histories;
DROP TRIGGER IF EXISTS trg_ram_histories_audit ON ff_medic_db.ram_histories;

-- CreateAuditTriggers
CREATE TRIGGER trg_patients_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.patients FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_roles_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.roles FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_users_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.users FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_services_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.services FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.diagnoses FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_active_ingredients_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.active_ingredients FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_manufacturers_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.manufacturers FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_dosage_forms_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.dosage_forms FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_medicaments_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.medicaments FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_medicaments_ingredients_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.medicaments_ingredients FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_attentions_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.attentions FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_attention_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.attention_diagnoses FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_signs_symptoms_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.signs_symptoms FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_health_metrics_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.health_metrics FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_bio_functions_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.bio_functions FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_physical_exams_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.physical_exams FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_exams_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.exams FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_procedures_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.procedures FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_exam_items_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.exam_items FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_prescriptions_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.prescriptions FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_prescription_items_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.prescription_items FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_prescription_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.prescription_diagnoses FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_referrals_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.referrals FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_clinical_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.clinical_histories FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_family_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.family_histories FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_gynecological_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.gynecological_histories FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_allergy_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.allergy_histories FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();
CREATE TRIGGER trg_ram_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.ram_histories FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();

-- Comments
COMMENT ON FUNCTION ff_medic_db.audit_trigger() IS 'Inserta registro en audits en INSERT/UPDATE/DELETE con user_id, ip y user_agent. SECURITY DEFINER';
