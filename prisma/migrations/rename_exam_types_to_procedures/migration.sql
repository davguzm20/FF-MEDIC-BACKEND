ALTER TABLE "ff_medic_db"."exam_types" RENAME TO "procedures";
ALTER TABLE "ff_medic_db"."exam_items" RENAME COLUMN "exam_type_id" TO "procedure_id";

ALTER INDEX "ff_medic_db"."idx_exam_items_exam_type_id" RENAME TO "idx_exam_items_procedure_id";

ALTER TRIGGER "trg_exam_types_audit" ON "ff_medic_db"."procedures" RENAME TO "trg_procedures_audit";

COMMENT ON TABLE "ff_medic_db"."procedures" IS 'Catálogo de procedimientos médicos (exámenes de laboratorio, imágenes, etc.)';
