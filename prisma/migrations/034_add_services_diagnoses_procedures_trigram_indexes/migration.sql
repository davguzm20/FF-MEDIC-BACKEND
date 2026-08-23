-- Habilitar extension para busqueda sin acentos
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Crear indices de busqueda por subcadena en services
CREATE INDEX "idx_services_name_trgm" ON "ff_medic_db"."services" USING GIN ("name" gin_trgm_ops);

-- Crear indices de busqueda por subcadena en diagnoses
CREATE INDEX "idx_diagnoses_cie_10_trgm" ON "ff_medic_db"."diagnoses" USING GIN ("cie_10" gin_trgm_ops);
CREATE INDEX "idx_diagnoses_description_trgm" ON "ff_medic_db"."diagnoses" USING GIN ("description" gin_trgm_ops);

-- Crear indices de busqueda por subcadena en procedures
CREATE INDEX "idx_procedures_type_trgm" ON "ff_medic_db"."procedures" USING GIN ("type" gin_trgm_ops);
CREATE INDEX "idx_procedures_category_trgm" ON "ff_medic_db"."procedures" USING GIN ("category" gin_trgm_ops);
CREATE INDEX "idx_procedures_description_trgm" ON "ff_medic_db"."procedures" USING GIN ("description" gin_trgm_ops);
