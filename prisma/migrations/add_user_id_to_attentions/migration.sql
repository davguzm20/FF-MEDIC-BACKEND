ALTER TABLE "ff_medic_db"."attentions" ADD COLUMN "user_id" INTEGER NOT NULL CONSTRAINT "fk_attentions_user_id" REFERENCES "ff_medic_db"."users" ("user_id");
CREATE INDEX "idx_attentions_user_id" ON "ff_medic_db"."attentions"("user_id");
COMMENT ON COLUMN "ff_medic_db"."attentions"."user_id" IS 'Identificador del médico que atendió';
