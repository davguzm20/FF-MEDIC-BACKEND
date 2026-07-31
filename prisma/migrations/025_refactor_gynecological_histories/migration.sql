-- Eliminar constraints de parity y andria
ALTER TABLE ff_medic_db.gynecological_histories DROP CONSTRAINT IF EXISTS ck_gynecological_histories_parity;
ALTER TABLE ff_medic_db.gynecological_histories DROP CONSTRAINT IF EXISTS ck_gynecological_histories_andria;

-- Agregar columnas de formula obstetrica y orientacion
ALTER TABLE ff_medic_db.gynecological_histories
  ADD COLUMN term_births SMALLINT,
  ADD COLUMN preterm_births SMALLINT,
  ADD COLUMN abortions SMALLINT,
  ADD COLUMN living_children SMALLINT,
  ADD COLUMN orientation_other VARCHAR(100);

-- Renombrar columnas andria y other
ALTER TABLE ff_medic_db.gynecological_histories
  RENAME COLUMN andria TO sexual_partners;
ALTER TABLE ff_medic_db.gynecological_histories
  RENAME COLUMN "other" TO contraceptive_method_other;

-- Cambiar tipos de columna
ALTER TABLE ff_medic_db.gynecological_histories
  ALTER COLUMN isa SET DATA TYPE VARCHAR(250) USING isa::text,
  ALTER COLUMN lsa SET DATA TYPE VARCHAR(250) USING lsa::text,
  ALTER COLUMN orientation SET DATA TYPE ff_medic_db."OrientationType"
    USING orientation::ff_medic_db."OrientationType",
  ALTER COLUMN menarche SET DATA TYPE SMALLINT,
  ALTER COLUMN gestations SET DATA TYPE SMALLINT,
  ALTER COLUMN sexual_partners SET DATA TYPE SMALLINT;

-- Eliminar columna parity
ALTER TABLE ff_medic_db.gynecological_histories DROP COLUMN parity;

-- Agregar constraints de validacion
ALTER TABLE ff_medic_db.gynecological_histories
  ADD CONSTRAINT ck_gynecological_histories_term_births CHECK (term_births >= 0 AND term_births <= 99),
  ADD CONSTRAINT ck_gynecological_histories_preterm_births CHECK (preterm_births >= 0 AND preterm_births <= 99),
  ADD CONSTRAINT ck_gynecological_histories_abortions CHECK (abortions >= 0 AND abortions <= 99),
  ADD CONSTRAINT ck_gynecological_histories_living_children CHECK (living_children >= 0 AND living_children <= 99),
  ADD CONSTRAINT ck_gynecological_histories_sexual_partners CHECK (sexual_partners >= 0 AND sexual_partners <= 99);

-- Agregar comentarios a columnas nuevas
COMMENT ON COLUMN ff_medic_db.gynecological_histories.term_births IS 'Número de partos a término';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.preterm_births IS 'Número de partos pretérmino';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.abortions IS 'Número de abortos';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.living_children IS 'Número de hijos vivos';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.sexual_partners IS 'Número de parejas sexuales';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.orientation_other IS 'Orientación sexual cuando es OTRO';
COMMENT ON COLUMN ff_medic_db.gynecological_histories.contraceptive_method_other IS 'Método anticonceptivo cuando es OTRO';
