-- Crear indices de busqueda por subcadena en active_ingredients, manufacturers y dosage_forms
CREATE INDEX "idx_active_ingredients_name_trgm" ON "ff_medic_db"."active_ingredients" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "idx_manufacturers_name_trgm" ON "ff_medic_db"."manufacturers" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "idx_dosage_forms_name_trgm" ON "ff_medic_db"."dosage_forms" USING GIN ("name" gin_trgm_ops);

-- Crear indices de busqueda por subcadena en medicaments
CREATE INDEX "idx_medicaments_name_trgm" ON "ff_medic_db"."medicaments" USING GIN ("name" gin_trgm_ops);
CREATE INDEX "idx_medicaments_concentration_trgm" ON "ff_medic_db"."medicaments" USING GIN ("concentration" gin_trgm_ops);