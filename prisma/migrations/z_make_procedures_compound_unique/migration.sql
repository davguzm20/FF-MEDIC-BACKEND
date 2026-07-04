-- Drop the old unique index on description
DROP INDEX IF EXISTS "ff_medic_db"."exam_types_description_key";

-- Create compound unique index on (type, category, description)
CREATE UNIQUE INDEX "procedures_type_category_description_key" ON "ff_medic_db"."procedures"("type", "category", "description");

-- Update comment on description column
COMMENT ON COLUMN ff_medic_db.procedures.description IS 'Nombre del procedimiento médico (único en combinación con type y category)';
