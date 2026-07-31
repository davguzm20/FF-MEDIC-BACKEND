-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ff_medic_db";

-- CreateTable
CREATE TABLE "ff_medic_db"."roles" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "ff_medic_db"."users" (
    "user_id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "paternal_surname" TEXT NOT NULL,
    "maternal_surname" TEXT NOT NULL,
    "cmp_code" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "ff_medic_db"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "ff_medic_db"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "ff_medic_db"."users"("email");

-- AddForeignKey
ALTER TABLE "ff_medic_db"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "ff_medic_db"."roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
