-- Eliminar trigger de updated_at de signs_symptoms
DROP TRIGGER IF EXISTS trg_signs_symptoms_updated_at ON ff_medic_db.signs_symptoms;

-- Eliminar trigger de auditoria de signs_symptoms
DROP TRIGGER IF EXISTS trg_signs_symptoms_audit ON ff_medic_db.signs_symptoms;

-- Eliminar tabla signs_symptoms
DROP TABLE IF EXISTS ff_medic_db.signs_symptoms CASCADE;
