ALTER TABLE ff_medic_db.exam_types
  ADD COLUMN "type" VARCHAR(50) NOT NULL DEFAULT '',
  ADD COLUMN "category" VARCHAR(100),
  ALTER COLUMN "description" TYPE VARCHAR(200);

COMMENT ON COLUMN ff_medic_db.exam_types."type" IS 'Tipo de documento: Solicitud de análisis, Diagnóstico por imágenes, Solicitud de análisis de emergencia';
COMMENT ON COLUMN ff_medic_db.exam_types."category" IS 'Categoría del procedimiento: Hematología, Bioquímica, Cabeza y Cuello, etc.';
COMMENT ON COLUMN ff_medic_db.exam_types."description" IS 'Nombre del procedimiento médico';
