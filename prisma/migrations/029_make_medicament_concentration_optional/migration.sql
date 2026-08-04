-- Hacer la concentración de medicamentos opcional
ALTER TABLE ff_medic_db.medicaments ALTER COLUMN concentration DROP NOT NULL;
