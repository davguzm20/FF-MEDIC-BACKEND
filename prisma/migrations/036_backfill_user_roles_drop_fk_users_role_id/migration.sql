-- Backfill: role_id 1=ADMIN, 2=DOCTOR
UPDATE "ff_medic_db"."users" SET "role" = CASE "role_id" WHEN 1 THEN 'ADMIN'::"ff_medic_db"."USER_ROLE" ELSE 'DOCTOR'::"ff_medic_db"."USER_ROLE" END;

-- Drop FK
ALTER TABLE "ff_medic_db"."users" DROP CONSTRAINT IF EXISTS "fk_users_role_id";

-- Drop old index
DROP INDEX IF EXISTS "ff_medic_db"."idx_users_role_id";

-- Drop column
ALTER TABLE "ff_medic_db"."users" DROP COLUMN "role_id";

-- Add new index
CREATE INDEX "idx_users_role" ON "ff_medic_db"."users" ("role");
