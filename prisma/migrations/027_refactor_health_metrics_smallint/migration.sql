-- Cambiar tipo de columnas de signos vitales a SMALLINT
ALTER TABLE ff_medic_db.health_metrics
  ALTER COLUMN spo2 SET DATA TYPE SMALLINT,
  ALTER COLUMN heart_rate SET DATA TYPE SMALLINT,
  ALTER COLUMN respiratory_rate SET DATA TYPE SMALLINT,
  ALTER COLUMN systolic_bp SET DATA TYPE SMALLINT,
  ALTER COLUMN diastolic_bp SET DATA TYPE SMALLINT;
