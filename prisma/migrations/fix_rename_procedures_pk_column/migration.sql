-- Rename remaining exam_type_id column and constraints in procedures table

ALTER TABLE "ff_medic_db"."procedures"
  RENAME COLUMN "exam_type_id" TO "procedure_id";

ALTER INDEX "ff_medic_db"."exam_types_pkey" RENAME TO "procedures_pkey";

ALTER TABLE "ff_medic_db"."procedures"
  RENAME CONSTRAINT "exam_types_exam_type_id_not_null" TO "procedures_procedure_id_not_null";

ALTER TABLE "ff_medic_db"."procedures"
  RENAME CONSTRAINT "exam_types_description_not_null" TO "procedures_description_not_null";

ALTER TABLE "ff_medic_db"."procedures"
  RENAME CONSTRAINT "exam_types_is_active_not_null" TO "procedures_is_active_not_null";

ALTER TABLE "ff_medic_db"."procedures"
  RENAME CONSTRAINT "exam_types_type_not_null" TO "procedures_type_not_null";

ALTER TABLE "ff_medic_db"."exam_items"
  RENAME CONSTRAINT "exam_items_exam_type_id_fkey" TO "exam_items_procedure_id_fkey";

ALTER TABLE "ff_medic_db"."exam_items"
  RENAME CONSTRAINT "exam_items_exam_type_id_not_null" TO "exam_items_procedure_id_not_null";
