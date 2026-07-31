-- Eliminar indice unico de description
DROP INDEX IF EXISTS "ff_medic_db"."exam_types_description_key";

-- Crear indice unico compuesto de type, category y description
CREATE UNIQUE INDEX "procedures_type_category_description_key" ON "ff_medic_db"."procedures"("type", "category", "description");

-- Actualizar comentario de description
COMMENT ON COLUMN ff_medic_db.procedures.description IS 'Nombre del procedimiento médico (único en combinación con type y category)';
