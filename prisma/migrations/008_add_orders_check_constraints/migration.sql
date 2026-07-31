-- Agregar constraint de cantidad en prescription_items
ALTER TABLE "ff_medic_db"."prescription_items" ADD CONSTRAINT "ck_prescription_items_quantity" CHECK (quantity > 0);

-- Agregar constraint de diagnosis o reason en referrals
ALTER TABLE "ff_medic_db"."referrals" ADD CONSTRAINT "ck_referrals_diagnosis_reason_exclusive" CHECK (
    (diagnosis_id IS NOT NULL AND reason IS NULL)
    OR
    (diagnosis_id IS NULL AND reason IS NOT NULL)
);
