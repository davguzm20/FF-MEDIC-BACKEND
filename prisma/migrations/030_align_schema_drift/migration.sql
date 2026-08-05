-- Alinear drift schema <-> BD con la documentación:
-- 1) procedures.type: quitar DEFAULT '' (la doc no lo define, schema no lo declara)
-- 2) fk_attentions_user_id: la 018 la creó sin referential actions (default NO ACTION);
--    el schema la define con ON DELETE RESTRICT ON UPDATE CASCADE
-- (updated_at DEFAULT now(), idx_audits_*, uq_responsible_attention y
--  fk_responsible_attention_id ya existen en BD y ahora el schema los declara)

-- DropForeignKey
ALTER TABLE "ff_medic_db"."attentions" DROP CONSTRAINT "fk_attentions_user_id";

-- AlterTable
ALTER TABLE "ff_medic_db"."procedures" ALTER COLUMN "type" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."attentions" ADD CONSTRAINT "fk_attentions_user_id" FOREIGN KEY ("user_id") REFERENCES "ff_medic_db"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
