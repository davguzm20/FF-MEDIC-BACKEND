-- Eliminar indice de diagnosis_id
DROP INDEX IF EXISTS ff_medic_db.idx_referrals_diagnosis_id;

-- Eliminar constraint de diagnosis o reason
ALTER TABLE ff_medic_db.referrals DROP CONSTRAINT IF EXISTS ck_referrals_diagnosis_reason_exclusive;

-- Eliminar constraint de clave foranea de diagnosis_id
ALTER TABLE ff_medic_db.referrals DROP CONSTRAINT IF EXISTS referrals_diagnosis_id_fkey;

-- Eliminar columna diagnosis_id y hacer reason obligatorio
ALTER TABLE ff_medic_db.referrals
  DROP COLUMN diagnosis_id,
  ALTER COLUMN reason SET NOT NULL;
