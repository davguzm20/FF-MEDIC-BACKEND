-- Add USER_ROLE enum
CREATE TYPE "ff_medic_db"."USER_ROLE" AS ENUM ('ADMIN', 'DOCTOR');

-- Add role column to users table
ALTER TABLE "ff_medic_db"."users" ADD COLUMN "role" "ff_medic_db"."USER_ROLE" NOT NULL DEFAULT 'DOCTOR';
