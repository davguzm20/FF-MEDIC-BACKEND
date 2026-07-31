-- Eliminar timestamps de medicaments
ALTER TABLE "ff_medic_db"."medicaments" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
