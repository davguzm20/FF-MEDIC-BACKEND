-- Corregir check constraints de health_metrics para aceptar valores nulos
ALTER TABLE ff_medic_db.health_metrics
  DROP CONSTRAINT "ck_health_metrics_hgt",
  ADD CONSTRAINT "ck_health_metrics_hgt" CHECK (hgt IS NULL OR hgt > 0);

ALTER TABLE ff_medic_db.health_metrics
  DROP CONSTRAINT "ck_health_metrics_hemoglobin",
  ADD CONSTRAINT "ck_health_metrics_hemoglobin" CHECK (hemoglobin IS NULL OR hemoglobin > 0);

ALTER TABLE ff_medic_db.health_metrics
  DROP CONSTRAINT "ck_health_metrics_weight",
  ADD CONSTRAINT "ck_health_metrics_weight" CHECK (weight IS NULL OR weight > 0);

ALTER TABLE ff_medic_db.health_metrics
  DROP CONSTRAINT "ck_health_metrics_abdominal_perimeter",
  ADD CONSTRAINT "ck_health_metrics_abdominal_perimeter" CHECK (abdominal_perimeter IS NULL OR abdominal_perimeter > 0);
