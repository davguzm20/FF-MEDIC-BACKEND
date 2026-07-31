-- Crear tipo enum OrientationType
DO $$ BEGIN
  CREATE TYPE "ff_medic_db"."OrientationType" AS ENUM (
    'HETEROSEXUAL', 'HOMOSEXUAL', 'BISEXUAL',
    'PANSEXUAL', 'ASEXUAL', 'OTRO', 'PREFIERE_NO_RESPONDER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Renombrar tipo enum FamilyType a RelationshipType
ALTER TYPE "ff_medic_db"."FamilyType" RENAME TO "RelationshipType";
