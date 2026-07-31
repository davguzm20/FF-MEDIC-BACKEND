-- Crear tipo enum ActionType
DO $$ BEGIN
  CREATE TYPE "ff_medic_db"."ActionType" AS ENUM ('INSERTAR', 'ACTUALIZAR', 'ELIMINAR');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Crear tabla audits
CREATE TABLE IF NOT EXISTS "ff_medic_db"."audits" (
    "audit_id" SERIAL NOT NULL,
    "table_name" VARCHAR(50) NOT NULL,
    "record_id" INTEGER NOT NULL,
    "action" "ff_medic_db"."ActionType" NOT NULL,
    "user_id" INTEGER,
    "old_data" JSONB,
    "new_data" JSONB,
    "ip" VARCHAR(45),
    "user_agent" VARCHAR(250),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "pk_audits" PRIMARY KEY ("audit_id")
);

-- Agregar constraint de clave foranea si no existe
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_audits_user_id'
  ) THEN
    ALTER TABLE "ff_medic_db"."audits" ADD CONSTRAINT "fk_audits_user_id" FOREIGN KEY ("user_id") REFERENCES "ff_medic_db"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Agregar constraints de validacion si no existen
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_spo2') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_spo2" CHECK (spo2 >= 0 AND spo2 <= 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_temperature') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_temperature" CHECK (temperature >= 30 AND temperature <= 45);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_heart_rate') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_heart_rate" CHECK (heart_rate > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_respiratory_rate') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_respiratory_rate" CHECK (respiratory_rate > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_systolic_bp') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_systolic_bp" CHECK (systolic_bp > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_diastolic_bp') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_diastolic_bp" CHECK (diastolic_bp > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_hgt') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_hgt" CHECK (hgt > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_hemoglobin') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_hemoglobin" CHECK (hemoglobin > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_weight') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_weight" CHECK (weight > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_abdominal_perimeter') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_abdominal_perimeter" CHECK (abdominal_perimeter > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_health_metrics_height') THEN
    ALTER TABLE "ff_medic_db"."health_metrics" ADD CONSTRAINT "ck_health_metrics_height" CHECK (height > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_gynecological_histories_menarche') THEN
    ALTER TABLE "ff_medic_db"."gynecological_histories" ADD CONSTRAINT "ck_gynecological_histories_menarche" CHECK (menarche >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_gynecological_histories_gestations') THEN
    ALTER TABLE "ff_medic_db"."gynecological_histories" ADD CONSTRAINT "ck_gynecological_histories_gestations" CHECK (gestations >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_gynecological_histories_parity') THEN
    ALTER TABLE "ff_medic_db"."gynecological_histories" ADD CONSTRAINT "ck_gynecological_histories_parity" CHECK (parity >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_gynecological_histories_andria') THEN
    ALTER TABLE "ff_medic_db"."gynecological_histories" ADD CONSTRAINT "ck_gynecological_histories_andria" CHECK (andria >= 0);
  END IF;
END $$;
