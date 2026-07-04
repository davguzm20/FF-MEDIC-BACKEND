-- Add default now to updated_at columns
ALTER TABLE ff_medic_db.patients ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.users ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.attentions ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.attention_diagnoses ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.signs_symptoms ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.health_metrics ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.bio_functions ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.physical_exams ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.exams ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.prescriptions ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.prescription_items ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.referrals ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.clinical_histories ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.family_histories ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.gynecological_histories ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.allergy_histories ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE ff_medic_db.ram_histories ALTER COLUMN updated_at SET DEFAULT NOW();
