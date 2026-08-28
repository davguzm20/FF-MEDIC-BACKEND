-- Drop triggers
DROP TRIGGER IF EXISTS trg_roles_updated_at ON "ff_medic_db"."roles";
DROP TRIGGER IF EXISTS trg_roles_audit ON "ff_medic_db"."roles";

-- Drop table
DROP TABLE IF EXISTS "ff_medic_db"."roles";
