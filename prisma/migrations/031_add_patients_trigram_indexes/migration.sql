-- Habilitar extension para busqueda por subcadena
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Crear indices de busqueda por subcadena en patients
CREATE INDEX "idx_patients_name_trgm" ON "ff_medic_db"."patients" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "idx_patients_paternal_surname_trgm" ON "ff_medic_db"."patients" USING GIN ("paternal_surname" gin_trgm_ops);
CREATE INDEX "idx_patients_maternal_surname_trgm" ON "ff_medic_db"."patients" USING GIN ("maternal_surname" gin_trgm_ops);
CREATE INDEX "idx_patients_document_number_trgm" ON "ff_medic_db"."patients" USING GIN ("document_number" gin_trgm_ops);