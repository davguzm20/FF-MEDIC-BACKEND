-- CreateTable
CREATE TABLE "ff_medic_db"."active_ingredients" (
    "active_ingredient_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "active_ingredients_pkey" PRIMARY KEY ("active_ingredient_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."manufacturers" (
    "manufacturer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("manufacturer_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."dosage_forms" (
    "dosage_form_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "dosage_forms_pkey" PRIMARY KEY ("dosage_form_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."medicaments" (
    "medicament_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    "concentration" TEXT NOT NULL,
    "dosage_form_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicaments_pkey" PRIMARY KEY ("medicament_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."medicaments_ingredients" (
    "medicament_id" INTEGER NOT NULL,
    "active_ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "medicaments_ingredients_pkey" PRIMARY KEY ("medicament_id","active_ingredient_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "active_ingredients_name_key" ON "ff_medic_db"."active_ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_name_key" ON "ff_medic_db"."manufacturers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dosage_forms_name_key" ON "ff_medic_db"."dosage_forms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "medicaments_name_concentration_manufacturer_id_dosage_form__key" ON "ff_medic_db"."medicaments"("name", "concentration", "manufacturer_id", "dosage_form_id");

-- AddForeignKey
ALTER TABLE "ff_medic_db"."ram_histories" ADD CONSTRAINT "ram_histories_active_ingredient_id_fkey" FOREIGN KEY ("active_ingredient_id") REFERENCES "ff_medic_db"."active_ingredients"("active_ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."medicaments" ADD CONSTRAINT "medicaments_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "ff_medic_db"."manufacturers"("manufacturer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."medicaments" ADD CONSTRAINT "medicaments_dosage_form_id_fkey" FOREIGN KEY ("dosage_form_id") REFERENCES "ff_medic_db"."dosage_forms"("dosage_form_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."medicaments_ingredients" ADD CONSTRAINT "medicaments_ingredients_medicament_id_fkey" FOREIGN KEY ("medicament_id") REFERENCES "ff_medic_db"."medicaments"("medicament_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ff_medic_db"."medicaments_ingredients" ADD CONSTRAINT "medicaments_ingredients_active_ingredient_id_fkey" FOREIGN KEY ("active_ingredient_id") REFERENCES "ff_medic_db"."active_ingredients"("active_ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
