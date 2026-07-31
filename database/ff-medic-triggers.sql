-- ============================================================
-- Triggers F&F-MEDIC
-- Based on Physical Model v0.4
-- ============================================================

SET search_path TO ff_medic_db;

-- ============================================================
-- UPDATED AT AUTO-UPDATE
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_attentions_updated_at BEFORE UPDATE ON attentions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_attention_diagnoses_updated_at BEFORE UPDATE ON attention_diagnoses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_health_metrics_updated_at BEFORE UPDATE ON health_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_bio_functions_updated_at BEFORE UPDATE ON bio_functions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_physical_exams_updated_at BEFORE UPDATE ON physical_exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_prescriptions_updated_at BEFORE UPDATE ON prescriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_prescription_items_updated_at BEFORE UPDATE ON prescription_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_referrals_updated_at BEFORE UPDATE ON referrals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_clinical_histories_updated_at BEFORE UPDATE ON clinical_histories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_family_histories_updated_at BEFORE UPDATE ON family_histories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_gynecological_histories_updated_at BEFORE UPDATE ON gynecological_histories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_allergy_histories_updated_at BEFORE UPDATE ON allergy_histories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_ram_histories_updated_at BEFORE UPDATE ON ram_histories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_responsible_updated_at BEFORE UPDATE ON responsible FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- AUDIT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION audit_trigger()
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

    INSERT INTO audits (table_name, record_id, action, user_id, old_data, new_data, ip, user_agent)
    VALUES (
        TG_TABLE_NAME,
        pk_value,
        CASE TG_OP
            WHEN 'INSERT' THEN 'INSERTAR'::ACTION_TYPE
            WHEN 'UPDATE' THEN 'ACTUALIZAR'::ACTION_TYPE
            WHEN 'DELETE' THEN 'ELIMINAR'::ACTION_TYPE
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

CREATE TRIGGER trg_patients_audit AFTER INSERT OR UPDATE OR DELETE ON patients FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_roles_audit AFTER INSERT OR UPDATE OR DELETE ON roles FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_users_audit AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_services_audit AFTER INSERT OR UPDATE OR DELETE ON services FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON diagnoses FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_active_ingredients_audit AFTER INSERT OR UPDATE OR DELETE ON active_ingredients FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_manufacturers_audit AFTER INSERT OR UPDATE OR DELETE ON manufacturers FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_dosage_forms_audit AFTER INSERT OR UPDATE OR DELETE ON dosage_forms FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_medicaments_audit AFTER INSERT OR UPDATE OR DELETE ON medicaments FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_medicaments_ingredients_audit AFTER INSERT OR UPDATE OR DELETE ON medicaments_ingredients FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_attentions_audit AFTER INSERT OR UPDATE OR DELETE ON attentions FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_attention_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON attention_diagnoses FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_health_metrics_audit AFTER INSERT OR UPDATE OR DELETE ON health_metrics FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_bio_functions_audit AFTER INSERT OR UPDATE OR DELETE ON bio_functions FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_physical_exams_audit AFTER INSERT OR UPDATE OR DELETE ON physical_exams FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_exams_audit AFTER INSERT OR UPDATE OR DELETE ON exams FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_procedures_audit AFTER INSERT OR UPDATE OR DELETE ON procedures FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_exam_items_audit AFTER INSERT OR UPDATE OR DELETE ON exam_items FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_prescriptions_audit AFTER INSERT OR UPDATE OR DELETE ON prescriptions FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_prescription_items_audit AFTER INSERT OR UPDATE OR DELETE ON prescription_items FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_prescription_diagnoses_audit AFTER INSERT OR UPDATE OR DELETE ON prescription_diagnoses FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_referrals_audit AFTER INSERT OR UPDATE OR DELETE ON referrals FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_clinical_histories_audit AFTER INSERT OR UPDATE OR DELETE ON clinical_histories FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_family_histories_audit AFTER INSERT OR UPDATE OR DELETE ON family_histories FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_gynecological_histories_audit AFTER INSERT OR UPDATE OR DELETE ON gynecological_histories FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_allergy_histories_audit AFTER INSERT OR UPDATE OR DELETE ON allergy_histories FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_ram_histories_audit AFTER INSERT OR UPDATE OR DELETE ON ram_histories FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER trg_responsible_audit AFTER INSERT OR UPDATE OR DELETE ON responsible FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON FUNCTION update_updated_at_column() IS 'Actualiza updated_at automáticamente en cada UPDATE';
COMMENT ON FUNCTION audit_trigger() IS 'Inserta registro en audits en INSERT/UPDATE/DELETE con user_id, ip y user_agent. SECURITY DEFINER';
