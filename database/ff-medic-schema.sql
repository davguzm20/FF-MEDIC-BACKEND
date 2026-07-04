-- ============================================================
-- Schema F&F-MEDIC
-- Based on Physical Model v0.2 and Logical Model v0.5
-- ============================================================

CREATE SCHEMA IF NOT EXISTS ff_medic_db;

SET search_path TO ff_medic_db;

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE ACTION_TYPE AS ENUM ('INSERTAR', 'ACTUALIZAR', 'ELIMINAR');

CREATE TYPE BIO_FUNCTION_STATUS AS ENUM (
    'AUMENTADO', 'DISMINUIDO', 'CONSERVADO', 'NO_EVALUADO'
);

CREATE TYPE BIO_FUNCTION_TYPE AS ENUM (
    'SED', 'APETITO', 'SUEÑO', 'ESTADO_ANIMO', 'ORINA', 'DEPOSICIONES', 'VARIACION_PONDERAL'
);

CREATE TYPE CONTRACEPTIVE_METHOD AS ENUM (
    'NINGUNO', 'AOC', 'INYECTABLE', 'IMPLANTE', 'DIU', 'PRESERVATIVO',
    'LIGADURA', 'VASECTOMIA', 'OTRO'
);

CREATE TYPE COURSE_TYPE AS ENUM (
    'PROGRESIVO', 'ESTACIONARIO', 'INTERMITENTE'
);

CREATE TYPE DIAGNOSIS_TYPE AS ENUM (
    'PRESUNTIVO', 'DEFINITIVO', 'REPETITIVO'
);

CREATE TYPE DOCUMENT_TYPE AS ENUM ('DNI', 'PASAPORTE', 'CE');

CREATE TYPE FAMILY_STATUS AS ENUM ('VIVO', 'FALLECIDO');

CREATE TYPE FAMILY_TYPE AS ENUM (
    'PADRE', 'MADRE', 'HIJO', 'HERMANO', 'ABUELO', 'TIO', 'OTRO'
);

CREATE TYPE HISTORY_TYPE AS ENUM ('PATOLOGICO', 'QUIRURGICO');

CREATE TYPE ONSET_TYPE AS ENUM ('INSIDIOSO', 'BRUSCO');

CREATE TYPE PHYSICAL_EXAM_STATUS AS ENUM (
    'CONSERVADO', 'OBSERVADO', 'DIFERIDO'
);

CREATE TYPE PHYSICAL_EXAM_SYSTEM AS ENUM (
    'ASPECTO_GENERAL', 'PIEL_FANERAS', 'CABEZA', 'CUELLO', 'TORAX_PULMONES',
    'CARDIOVASCULAR', 'ABDOMEN', 'GENITOURINARIO', 'SOMA', 'SNC', 'OTRO'
);

CREATE TYPE SEX_TYPE AS ENUM ('M', 'F');

-- ============================================================
-- TABLES
-- ============================================================

-- 1. Patients

CREATE TABLE patients (
    patient_id         SERIAL        CONSTRAINT pk_patients PRIMARY KEY,
    document_type      DOCUMENT_TYPE NOT NULL,
    document_number    VARCHAR(20)   NOT NULL,
    name               VARCHAR(100)  NOT NULL,
    paternal_surname   VARCHAR(50)   NOT NULL,
    maternal_surname   VARCHAR(50)   NOT NULL,
    sex                SEX_TYPE      NOT NULL,
    phone              VARCHAR(15),
    birth_date         DATE          NOT NULL,
    is_active          BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_patients_document UNIQUE (document_type, document_number)
);

-- 2. Roles

CREATE TABLE roles (
    role_id    SERIAL      CONSTRAINT pk_roles PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    is_active  BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_roles_name UNIQUE (name)
);

-- 3. Users

CREATE TABLE users (
    user_id          SERIAL       CONSTRAINT pk_users PRIMARY KEY,
    role_id          INTEGER      NOT NULL
                                  CONSTRAINT fk_users_role_id
                                  REFERENCES roles (role_id),
    name             VARCHAR(100)  NOT NULL,
    paternal_surname VARCHAR(50)   NOT NULL,
    maternal_surname VARCHAR(50)   NOT NULL,
    cmp_code         VARCHAR(10),
    username         VARCHAR(50)  NOT NULL
                                  CONSTRAINT uq_users_username UNIQUE,
    password         VARCHAR(250) NOT NULL,
    email            VARCHAR(254) NOT NULL
                                  CONSTRAINT uq_users_email UNIQUE,
    is_active        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 4. Services

CREATE TABLE services (
    service_id SERIAL       CONSTRAINT pk_services PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_services_name UNIQUE (name)
);

-- 5. Diagnoses

CREATE TABLE diagnoses (
    diagnosis_id SERIAL      CONSTRAINT pk_diagnoses PRIMARY KEY,
    cie_10       VARCHAR(10) NOT NULL,
    description  TEXT        NOT NULL,
    is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_diagnoses_cie_10 UNIQUE (cie_10)
);

-- 6. Active Ingredients

CREATE TABLE active_ingredients (
    active_ingredient_id SERIAL      CONSTRAINT pk_active_ingredients PRIMARY KEY,
    name                 VARCHAR(250) NOT NULL,
    is_active            BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_active_ingredients_name UNIQUE (name)
);

-- 7. Manufacturers

CREATE TABLE manufacturers (
    manufacturer_id SERIAL       CONSTRAINT pk_manufacturers PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_manufacturers_name UNIQUE (name)
);

-- 8. Dosage Forms

CREATE TABLE dosage_forms (
    dosage_form_id SERIAL       CONSTRAINT pk_dosage_forms PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_dosage_forms_name UNIQUE (name)
);

-- 9. Medicaments

CREATE TABLE medicaments (
    medicament_id   SERIAL       CONSTRAINT pk_medicaments PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    manufacturer_id INTEGER      NOT NULL
                                 CONSTRAINT fk_medicaments_manufacturer_id
                                 REFERENCES manufacturers (manufacturer_id),
    concentration   VARCHAR(50)  NOT NULL,
    dosage_form_id  INTEGER      NOT NULL
                                 CONSTRAINT fk_medicaments_dosage_form_id
                                 REFERENCES dosage_forms (dosage_form_id),
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_medicaments_product UNIQUE (name, concentration, manufacturer_id, dosage_form_id)
);

-- 10. Medicaments Ingredients (N:M)

CREATE TABLE medicaments_ingredients (
    medicament_id       INTEGER NOT NULL
                                CONSTRAINT fk_medicaments_ingredients_medicament_id
                                REFERENCES medicaments (medicament_id),
    active_ingredient_id INTEGER NOT NULL
                                CONSTRAINT fk_medicaments_ingredients_active_ingredient_id
                                REFERENCES active_ingredients (active_ingredient_id),
    CONSTRAINT pk_medicaments_ingredients PRIMARY KEY (medicament_id, active_ingredient_id)
);

-- 11. Attentions

CREATE TABLE attentions (
    attention_id     SERIAL      CONSTRAINT pk_attentions PRIMARY KEY,
    patient_id       INTEGER     NOT NULL
                                 CONSTRAINT fk_attentions_patient_id
                                 REFERENCES patients (patient_id),
    service_id       INTEGER     NOT NULL
                                 CONSTRAINT fk_attentions_service_id
                                 REFERENCES services (service_id),
    illness_duration VARCHAR(50)   NOT NULL,
    onset_type       ONSET_TYPE  NOT NULL,
    course           COURSE_TYPE NOT NULL,
    current_disease  TEXT        NOT NULL,
    work_plan        TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Attention Diagnoses

CREATE TABLE attention_diagnoses (
    attention_diagnosis_id SERIAL         CONSTRAINT pk_attention_diagnoses PRIMARY KEY,
    attention_id           INTEGER        NOT NULL
                                          CONSTRAINT fk_attention_diagnoses_attention_id
                                          REFERENCES attentions (attention_id),
    diagnosis_id           INTEGER        NOT NULL
                                          CONSTRAINT fk_attention_diagnoses_diagnosis_id
                                          REFERENCES diagnoses (diagnosis_id),
    type                   DIAGNOSIS_TYPE NOT NULL,
    specifications         VARCHAR(200),
    created_at             TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at             TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_attention_diagnoses_unique UNIQUE (attention_id, diagnosis_id)
);

-- 13. Signs Symptoms

CREATE TABLE signs_symptoms (
    sign_symptom_id SERIAL      CONSTRAINT pk_signs_symptoms PRIMARY KEY,
    attention_id    INTEGER     NOT NULL
                                CONSTRAINT fk_signs_symptoms_attention_id
                                REFERENCES attentions (attention_id),
    diagnosis_id    INTEGER     NOT NULL
                                CONSTRAINT fk_signs_symptoms_diagnosis_id
                                REFERENCES diagnoses (diagnosis_id),
    observations    VARCHAR(200),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Health Metrics

CREATE TABLE health_metrics (
    health_metric_id   SERIAL       CONSTRAINT pk_health_metrics PRIMARY KEY,
    attention_id       INTEGER      NOT NULL
                                    CONSTRAINT fk_health_metrics_attention_id
                                    REFERENCES attentions (attention_id),
    temperature        DECIMAL(4,2),
    spo2               INTEGER,
    heart_rate         INTEGER,
    respiratory_rate   INTEGER,
    systolic_bp        INTEGER,
    diastolic_bp       INTEGER,
    hgt                DECIMAL(5,2),
    hemoglobin         DECIMAL(4,2),
    weight             DECIMAL(5,2),
    abdominal_perimeter DECIMAL(5,2),
    height              DECIMAL(5,2)  NOT NULL,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_health_metrics_attention UNIQUE (attention_id),
    CONSTRAINT ck_health_metrics_spo2 CHECK (spo2 >= 0 AND spo2 <= 100),
    CONSTRAINT ck_health_metrics_temperature CHECK (temperature >= 30 AND temperature <= 45),
    CONSTRAINT ck_health_metrics_heart_rate CHECK (heart_rate > 0),
    CONSTRAINT ck_health_metrics_respiratory_rate CHECK (respiratory_rate > 0),
    CONSTRAINT ck_health_metrics_systolic_bp CHECK (systolic_bp > 0),
    CONSTRAINT ck_health_metrics_diastolic_bp CHECK (diastolic_bp > 0),
    CONSTRAINT ck_health_metrics_hgt CHECK (hgt > 0),
    CONSTRAINT ck_health_metrics_hemoglobin CHECK (hemoglobin > 0),
    CONSTRAINT ck_health_metrics_weight CHECK (weight > 0),
    CONSTRAINT ck_health_metrics_abdominal_perimeter CHECK (abdominal_perimeter > 0),
    CONSTRAINT ck_health_metrics_height CHECK (height > 0)
);

-- 15. Bio Functions

CREATE TABLE bio_functions (
    bio_function_id SERIAL             CONSTRAINT pk_bio_functions PRIMARY KEY,
    attention_id    INTEGER            NOT NULL
                                       CONSTRAINT fk_bio_functions_attention_id
                                       REFERENCES attentions (attention_id),
    type            BIO_FUNCTION_TYPE   NOT NULL,
    status          BIO_FUNCTION_STATUS NOT NULL,
    observations    VARCHAR(200),
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_bio_functions_attention_type UNIQUE (attention_id, type)
);

-- 16. Physical Exams (refactored: system, status, observations directly)

CREATE TABLE physical_exams (
    physical_exam_id SERIAL               CONSTRAINT pk_physical_exams PRIMARY KEY,
    attention_id     INTEGER              NOT NULL
                                          CONSTRAINT fk_physical_exams_attention_id
                                          REFERENCES attentions (attention_id),
    system           PHYSICAL_EXAM_SYSTEM NOT NULL,
    other            VARCHAR(100),
    status           PHYSICAL_EXAM_STATUS NOT NULL,
    observations     VARCHAR(200),
    created_at       TIMESTAMPTZ          NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ          NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_physical_exams_attention_system UNIQUE (attention_id, system)
);

-- 17. Exams

CREATE TABLE exams (
    exam_id      SERIAL      CONSTRAINT pk_exams PRIMARY KEY,
    attention_id INTEGER     NOT NULL
                             CONSTRAINT fk_exams_attention_id
                             REFERENCES attentions (attention_id),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Procedures

CREATE TABLE procedures (
    procedure_id SERIAL       CONSTRAINT pk_procedures PRIMARY KEY,
    type         VARCHAR(50)  NOT NULL,
    category     VARCHAR(100),
    description  VARCHAR(200) NOT NULL,
    is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_procedures_type_category_description UNIQUE (type, category, description)
);

-- 19. Exam Items

CREATE TABLE exam_items (
    exam_item_id SERIAL       CONSTRAINT pk_exam_items PRIMARY KEY,
    exam_id      INTEGER      NOT NULL
                               CONSTRAINT fk_exam_items_exam_id
                               REFERENCES exams (exam_id),
    procedure_id INTEGER      NOT NULL
                               CONSTRAINT fk_exam_items_procedure_id
                               REFERENCES procedures (procedure_id),
    indications  VARCHAR(200),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 20. Prescriptions

CREATE TABLE prescriptions (
    prescription_id SERIAL      CONSTRAINT pk_prescriptions PRIMARY KEY,
    attention_id    INTEGER     NOT NULL
                                CONSTRAINT fk_prescriptions_attention_id
                                REFERENCES attentions (attention_id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. Prescription Items

CREATE TABLE prescription_items (
    prescription_item_id SERIAL      CONSTRAINT pk_prescription_items PRIMARY KEY,
    prescription_id      INTEGER     NOT NULL
                                     CONSTRAINT fk_prescription_items_prescription_id
                                     REFERENCES prescriptions (prescription_id),
    medicament_id        INTEGER     NOT NULL
                                     CONSTRAINT fk_prescription_items_medicament_id
                                     REFERENCES medicaments (medicament_id),
    quantity             INTEGER     NOT NULL,
    indications          VARCHAR(200),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_prescription_items_quantity CHECK (quantity > 0)
);

-- 22. Prescription Diagnoses

CREATE TABLE prescription_diagnoses (
    prescription_item_id   INTEGER NOT NULL
                                   CONSTRAINT fk_prescription_diagnoses_prescription_item_id
                                   REFERENCES prescription_items (prescription_item_id),
    attention_diagnosis_id INTEGER NOT NULL
                                   CONSTRAINT fk_prescription_diagnoses_attention_diagnosis_id
                                   REFERENCES attention_diagnoses (attention_diagnosis_id),
    CONSTRAINT pk_prescription_diagnoses PRIMARY KEY (prescription_item_id, attention_diagnosis_id)
);

-- 23. Referrals

CREATE TABLE referrals (
    referral_id  SERIAL      CONSTRAINT pk_referrals PRIMARY KEY,
    attention_id INTEGER     NOT NULL
                             CONSTRAINT fk_referrals_attention_id
                             REFERENCES attentions (attention_id),
    service_id   INTEGER     NOT NULL
                             CONSTRAINT fk_referrals_service_id
                             REFERENCES services (service_id),
    diagnosis_id INTEGER
                             CONSTRAINT fk_referrals_diagnosis_id
                             REFERENCES diagnoses (diagnosis_id),
    reason       VARCHAR(200),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_referrals_diagnosis_reason_exclusive CHECK (
        (diagnosis_id IS NOT NULL AND reason IS NULL)
        OR
        (diagnosis_id IS NULL AND reason IS NOT NULL)
    )
);

-- 24. Clinical Histories (renamed from Pathological Histories)

CREATE TABLE clinical_histories (
    clinical_history_id SERIAL       CONSTRAINT pk_clinical_histories PRIMARY KEY,
    patient_id          INTEGER      NOT NULL
                                     CONSTRAINT fk_clinical_histories_patient_id
                                     REFERENCES patients (patient_id),
    diagnosis_id        INTEGER      NOT NULL
                                     CONSTRAINT fk_clinical_histories_diagnosis_id
                                     REFERENCES diagnoses (diagnosis_id),
    type                HISTORY_TYPE NOT NULL,
    specifications      VARCHAR(200),
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 25. Family Histories

CREATE TABLE family_histories (
    family_history_id SERIAL       CONSTRAINT pk_family_histories PRIMARY KEY,
    patient_id        INTEGER      NOT NULL
                                   CONSTRAINT fk_family_histories_patient_id
                                   REFERENCES patients (patient_id),
    type              FAMILY_TYPE   NOT NULL,
    other             VARCHAR(100),
    status            FAMILY_STATUS NOT NULL,
    specifications    VARCHAR(200),
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 26. Gynecological Histories

CREATE TABLE gynecological_histories (
    gynecological_history_id SERIAL                CONSTRAINT pk_gynecological_histories PRIMARY KEY,
    patient_id               INTEGER
                                                  CONSTRAINT fk_gynecological_histories_patient_id
                                                  REFERENCES patients (patient_id),
    menarche                 INTEGER,
    menstrual_cycle          VARCHAR(50),
    last_menstrual_period    DATE,
    contraceptive_method     CONTRACEPTIVE_METHOD,
    other                    VARCHAR(100),
    gestations               INTEGER,
    parity                   INTEGER,
    orientation              VARCHAR(50),
    andria                   INTEGER,
    isa                      DATE,
    lsa                      DATE,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_gynecological_histories_patient UNIQUE (patient_id),
    CONSTRAINT ck_gynecological_histories_menarche CHECK (menarche >= 0),
    CONSTRAINT ck_gynecological_histories_gestations CHECK (gestations >= 0),
    CONSTRAINT ck_gynecological_histories_parity CHECK (parity >= 0),
    CONSTRAINT ck_gynecological_histories_andria CHECK (andria >= 0)
);

-- 27. Allergy Histories (type removed)

CREATE TABLE allergy_histories (
    allergy_history_id SERIAL      CONSTRAINT pk_allergy_histories PRIMARY KEY,
    patient_id         INTEGER     NOT NULL
                                   CONSTRAINT fk_allergy_histories_patient_id
                                   REFERENCES patients (patient_id),
    diagnosis_id       INTEGER     NOT NULL
                                   CONSTRAINT fk_allergy_histories_diagnosis_id
                                   REFERENCES diagnoses (diagnosis_id),
    specifications     VARCHAR(200),
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 28. RAM Histories

CREATE TABLE ram_histories (
    ram_history_id       SERIAL      CONSTRAINT pk_ram_histories PRIMARY KEY,
    patient_id           INTEGER     NOT NULL
                                     CONSTRAINT fk_ram_histories_patient_id
                                     REFERENCES patients (patient_id),
    active_ingredient_id INTEGER     NOT NULL
                                     CONSTRAINT fk_ram_histories_active_ingredient_id
                                     REFERENCES active_ingredients (active_ingredient_id),
    diagnosis_id         INTEGER     NOT NULL
                                     CONSTRAINT fk_ram_histories_diagnosis_id
                                     REFERENCES diagnoses (diagnosis_id),
    specifications       VARCHAR(200),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 29. Audits

CREATE TABLE audits (
    audit_id   SERIAL      CONSTRAINT pk_audits PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id  INTEGER     NOT NULL,
    action     ACTION_TYPE NOT NULL,
    user_id    INTEGER
                            CONSTRAINT fk_audits_user_id
                            REFERENCES users (user_id),
    old_data   JSONB,
    new_data   JSONB,
    ip         VARCHAR(45),
    user_agent VARCHAR(250),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON TABLE patients IS 'Pacientes del consultorio';
COMMENT ON TABLE roles IS 'Roles del sistema';
COMMENT ON TABLE users IS 'Usuarios del sistema';
COMMENT ON TABLE services IS 'Servicios del consultorio';
COMMENT ON TABLE diagnoses IS 'Diagnósticos CIE-10';
COMMENT ON TABLE active_ingredients IS 'Principios activos de medicamentos';
COMMENT ON TABLE manufacturers IS 'Fabricantes de medicamentos';
COMMENT ON TABLE dosage_forms IS 'Formas farmacéuticas de medicamentos';
COMMENT ON TABLE medicaments IS 'Medicamentos del consultorio';
COMMENT ON TABLE medicaments_ingredients IS 'Relación N:M entre medicamentos y principios activos';
COMMENT ON TABLE attentions IS 'Atenciones médicas';
COMMENT ON TABLE attention_diagnoses IS 'Diagnósticos asociados a la atención';
COMMENT ON TABLE signs_symptoms IS 'Signos y síntomas de la atención';
COMMENT ON TABLE health_metrics IS 'Métricas de salud de la atención (signos vitales, peso, talla, perímetro abdominal, HGT, hemoglobina)';
COMMENT ON TABLE bio_functions IS 'Funciones biológicas de la atención';
COMMENT ON TABLE physical_exams IS 'Sistemas evaluados en el examen físico';
COMMENT ON TABLE exams IS 'Órdenes de examen de la atención';
COMMENT ON TABLE procedures IS 'Catálogo de procedimientos médicos (exámenes de laboratorio, imágenes, etc.)';
COMMENT ON TABLE exam_items IS 'Ítems de la orden de examen';
COMMENT ON TABLE prescriptions IS 'Recetas médicas de la atención';
COMMENT ON TABLE prescription_items IS 'Medicamentos de la receta';
COMMENT ON TABLE prescription_diagnoses IS 'Diagnósticos asociados al medicamento recetado';
COMMENT ON TABLE referrals IS 'Interconsultas de la atención';
COMMENT ON TABLE clinical_histories IS 'Antecedentes patológicos y quirúrgicos del paciente';
COMMENT ON TABLE family_histories IS 'Antecedentes familiares del paciente';
COMMENT ON TABLE gynecological_histories IS 'Antecedentes ginecológicos del paciente';
COMMENT ON TABLE allergy_histories IS 'Antecedentes de alergias del paciente';
COMMENT ON TABLE ram_histories IS 'Reacciones Adversas a Medicamentos del paciente';
COMMENT ON TABLE audits IS 'Auditoría de acciones del sistema';

COMMENT ON COLUMN patients.patient_id IS 'Identificador único del paciente';
COMMENT ON COLUMN patients.document_type IS 'Tipo de documento del paciente';
COMMENT ON COLUMN patients.document_number IS 'Número de documento del paciente';
COMMENT ON COLUMN patients.name IS 'Nombre del paciente';
COMMENT ON COLUMN patients.paternal_surname IS 'Apellido paterno del paciente';
COMMENT ON COLUMN patients.maternal_surname IS 'Apellido materno del paciente';
COMMENT ON COLUMN patients.sex IS 'Sexo del paciente';
COMMENT ON COLUMN patients.phone IS 'Teléfono del paciente';
COMMENT ON COLUMN patients.birth_date IS 'Fecha de nacimiento del paciente';
COMMENT ON COLUMN patients.is_active IS 'Estado del registro';
COMMENT ON COLUMN patients.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN patients.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN roles.role_id IS 'Identificador único del rol';
COMMENT ON COLUMN roles.name IS 'Nombre del rol';
COMMENT ON COLUMN roles.is_active IS 'Estado del registro';

COMMENT ON COLUMN users.user_id IS 'Identificador único del usuario';
COMMENT ON COLUMN users.role_id IS 'Identificador del rol asignado';
COMMENT ON COLUMN users.name IS 'Nombre del usuario';
COMMENT ON COLUMN users.paternal_surname IS 'Apellido paterno del usuario';
COMMENT ON COLUMN users.maternal_surname IS 'Apellido materno del usuario';
COMMENT ON COLUMN users.cmp_code IS 'Código del Colegio Médico del Perú';
COMMENT ON COLUMN users.username IS 'Nombre de usuario para inicio de sesión';
COMMENT ON COLUMN users.password IS 'Contraseña hasheada del usuario';
COMMENT ON COLUMN users.email IS 'Correo electrónico del usuario';
COMMENT ON COLUMN users.is_active IS 'Estado del registro';
COMMENT ON COLUMN users.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN users.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN services.service_id IS 'Identificador único del servicio';
COMMENT ON COLUMN services.name IS 'Nombre del servicio';
COMMENT ON COLUMN services.is_active IS 'Estado del registro';

COMMENT ON COLUMN diagnoses.diagnosis_id IS 'Identificador único del diagnóstico';
COMMENT ON COLUMN diagnoses.cie_10 IS 'Código CIE-10 del diagnóstico';
COMMENT ON COLUMN diagnoses.description IS 'Descripción del diagnóstico';
COMMENT ON COLUMN diagnoses.is_active IS 'Estado del registro';

COMMENT ON COLUMN active_ingredients.active_ingredient_id IS 'Identificador único del principio activo';
COMMENT ON COLUMN active_ingredients.name IS 'Nombre del principio activo';
COMMENT ON COLUMN active_ingredients.is_active IS 'Estado del registro';

COMMENT ON COLUMN manufacturers.manufacturer_id IS 'Identificador único del fabricante';
COMMENT ON COLUMN manufacturers.name IS 'Nombre del fabricante';
COMMENT ON COLUMN manufacturers.is_active IS 'Estado del registro';

COMMENT ON COLUMN dosage_forms.dosage_form_id IS 'Identificador único de la forma farmacéutica';
COMMENT ON COLUMN dosage_forms.name IS 'Nombre de la forma farmacéutica';
COMMENT ON COLUMN dosage_forms.is_active IS 'Estado del registro';

COMMENT ON COLUMN medicaments.medicament_id IS 'Identificador único del medicamento';
COMMENT ON COLUMN medicaments.name IS 'Nombre comercial del medicamento';
COMMENT ON COLUMN medicaments.manufacturer_id IS 'Identificador del fabricante asociado';
COMMENT ON COLUMN medicaments.concentration IS 'Concentración del principio activo';
COMMENT ON COLUMN medicaments.dosage_form_id IS 'Identificador de la forma farmacéutica asociada';
COMMENT ON COLUMN medicaments.is_active IS 'Estado del registro';

COMMENT ON COLUMN medicaments_ingredients.medicament_id IS 'Identificador del medicamento asociado';
COMMENT ON COLUMN medicaments_ingredients.active_ingredient_id IS 'Identificador del principio activo asociado';

COMMENT ON COLUMN attentions.attention_id IS 'Identificador único de la atención médica';
COMMENT ON COLUMN attentions.patient_id IS 'Identificador del paciente atendido';
COMMENT ON COLUMN attentions.service_id IS 'Identificador del servicio brindado';
COMMENT ON COLUMN attentions.illness_duration IS 'Tiempo de enfermedad del paciente';
COMMENT ON COLUMN attentions.onset_type IS 'Tipo de inicio de la enfermedad';
COMMENT ON COLUMN attentions.course IS 'Curso de la enfermedad';
COMMENT ON COLUMN attentions.current_disease IS 'Descripción de la enfermedad actual';
COMMENT ON COLUMN attentions.work_plan IS 'Plan de trabajo del paciente';
COMMENT ON COLUMN attentions.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN attentions.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN attention_diagnoses.attention_diagnosis_id IS 'Identificador único del diagnóstico asociado';
COMMENT ON COLUMN attention_diagnoses.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN attention_diagnoses.diagnosis_id IS 'Identificador del diagnóstico asignado';
COMMENT ON COLUMN attention_diagnoses.type IS 'Tipo de diagnóstico';
COMMENT ON COLUMN attention_diagnoses.specifications IS 'Especificaciones del diagnóstico';
COMMENT ON COLUMN attention_diagnoses.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN attention_diagnoses.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN signs_symptoms.sign_symptom_id IS 'Identificador único del signo o síntoma';
COMMENT ON COLUMN signs_symptoms.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN signs_symptoms.diagnosis_id IS 'Identificador del diagnóstico asociado';
COMMENT ON COLUMN signs_symptoms.observations IS 'Observaciones del signo o síntoma';
COMMENT ON COLUMN signs_symptoms.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN signs_symptoms.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN health_metrics.health_metric_id IS 'Identificador único de las métricas de salud';
COMMENT ON COLUMN health_metrics.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN health_metrics.temperature IS 'Temperatura corporal del paciente';
COMMENT ON COLUMN health_metrics.spo2 IS 'Saturación de oxígeno del paciente';
COMMENT ON COLUMN health_metrics.heart_rate IS 'Frecuencia cardíaca del paciente';
COMMENT ON COLUMN health_metrics.respiratory_rate IS 'Frecuencia respiratoria del paciente';
COMMENT ON COLUMN health_metrics.systolic_bp IS 'Presión arterial sistólica del paciente';
COMMENT ON COLUMN health_metrics.diastolic_bp IS 'Presión arterial diastólica del paciente';
COMMENT ON COLUMN health_metrics.hgt IS 'Hemoglucotest del paciente';
COMMENT ON COLUMN health_metrics.hemoglobin IS 'Hemoglobina del paciente';
COMMENT ON COLUMN health_metrics.weight IS 'Peso corporal del paciente';
COMMENT ON COLUMN health_metrics.abdominal_perimeter IS 'Perímetro abdominal del paciente';
COMMENT ON COLUMN health_metrics.height IS 'Talla del paciente';
COMMENT ON COLUMN health_metrics.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN health_metrics.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN bio_functions.bio_function_id IS 'Identificador único de la función biológica';
COMMENT ON COLUMN bio_functions.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN bio_functions.type IS 'Tipo de función biológica evaluada';
COMMENT ON COLUMN bio_functions.status IS 'Estado de la función biológica';
COMMENT ON COLUMN bio_functions.observations IS 'Observaciones de la función biológica';
COMMENT ON COLUMN bio_functions.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN bio_functions.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN physical_exams.physical_exam_id IS 'Identificador único del sistema evaluado';
COMMENT ON COLUMN physical_exams.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN physical_exams.system IS 'Sistema del cuerpo evaluado';
COMMENT ON COLUMN physical_exams.other IS 'Especificación del sistema evaluado cuando es OTRO';
COMMENT ON COLUMN physical_exams.status IS 'Estado del sistema evaluado';
COMMENT ON COLUMN physical_exams.observations IS 'Observaciones del examen físico';
COMMENT ON COLUMN physical_exams.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN physical_exams.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN exams.exam_id IS 'Identificador único de la orden de examen';
COMMENT ON COLUMN exams.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN exams.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN exams.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN procedures.procedure_id IS 'Identificador único del procedimiento';
COMMENT ON COLUMN procedures.type IS 'Tipo de documento: Solicitud de análisis, Diagnóstico por imágenes, Solicitud de análisis de emergencia';
COMMENT ON COLUMN procedures.category IS 'Categoría del procedimiento: Hematología, Bioquímica, Cabeza y Cuello, etc.';
COMMENT ON COLUMN procedures.description IS 'Nombre del procedimiento médico';
COMMENT ON COLUMN procedures.is_active IS 'Estado del registro';

COMMENT ON COLUMN exam_items.exam_item_id IS 'Identificador único del ítem de examen';
COMMENT ON COLUMN exam_items.exam_id IS 'Identificador de la orden de examen asociada';
COMMENT ON COLUMN exam_items.procedure_id IS 'Identificador del procedimiento solicitado';
COMMENT ON COLUMN exam_items.indications IS 'Indicaciones para la realización del examen';
COMMENT ON COLUMN exam_items.created_at IS 'Fecha de creación del registro';

COMMENT ON COLUMN prescriptions.prescription_id IS 'Identificador único de la receta';
COMMENT ON COLUMN prescriptions.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN prescriptions.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN prescriptions.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN prescription_items.prescription_item_id IS 'Identificador único del medicamento recetado';
COMMENT ON COLUMN prescription_items.prescription_id IS 'Identificador de la receta asociada';
COMMENT ON COLUMN prescription_items.medicament_id IS 'Identificador del medicamento recetado';
COMMENT ON COLUMN prescription_items.quantity IS 'Cantidad recetada del medicamento';
COMMENT ON COLUMN prescription_items.indications IS 'Indicaciones de uso del medicamento';
COMMENT ON COLUMN prescription_items.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN prescription_items.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN prescription_diagnoses.prescription_item_id IS 'Identificador del medicamento recetado';
COMMENT ON COLUMN prescription_diagnoses.attention_diagnosis_id IS 'Identificador del diagnóstico asociado';

COMMENT ON COLUMN referrals.referral_id IS 'Identificador único de la interconsulta';
COMMENT ON COLUMN referrals.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN referrals.service_id IS 'Identificador del servicio de destino';
COMMENT ON COLUMN referrals.diagnosis_id IS 'Identificador del diagnóstico asociado';
COMMENT ON COLUMN referrals.reason IS 'Motivo de la interconsulta';
COMMENT ON COLUMN referrals.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN referrals.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN clinical_histories.clinical_history_id IS 'Identificador único del antecedente clínico';
COMMENT ON COLUMN clinical_histories.patient_id IS 'Identificador del paciente asociado';
COMMENT ON COLUMN clinical_histories.diagnosis_id IS 'Identificador del diagnóstico asociado';
COMMENT ON COLUMN clinical_histories.type IS 'Tipo de antecedente';
COMMENT ON COLUMN clinical_histories.specifications IS 'Especificaciones del antecedente';
COMMENT ON COLUMN clinical_histories.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN clinical_histories.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN family_histories.family_history_id IS 'Identificador único del antecedente familiar';
COMMENT ON COLUMN family_histories.patient_id IS 'Identificador del paciente asociado';
COMMENT ON COLUMN family_histories.type IS 'Tipo de familiar';
COMMENT ON COLUMN family_histories.status IS 'Estado del familiar';
COMMENT ON COLUMN family_histories.specifications IS 'Especificaciones del antecedente familiar';
COMMENT ON COLUMN family_histories.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN family_histories.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN gynecological_histories.gynecological_history_id IS 'Identificador único del antecedente ginecológico';
COMMENT ON COLUMN gynecological_histories.patient_id IS 'Identificador del paciente asociado';
COMMENT ON COLUMN gynecological_histories.menarche IS 'Edad de la menarquia del paciente';
COMMENT ON COLUMN gynecological_histories.menstrual_cycle IS 'Tipo de ciclo menstrual del paciente';
COMMENT ON COLUMN gynecological_histories.last_menstrual_period IS 'Fecha de la última menstruación del paciente';
COMMENT ON COLUMN gynecological_histories.contraceptive_method IS 'Método anticonceptivo del paciente';
COMMENT ON COLUMN gynecological_histories.other IS 'Otros métodos anticonceptivos o especificaciones';
COMMENT ON COLUMN gynecological_histories.gestations IS 'Número de gestaciones del paciente';
COMMENT ON COLUMN gynecological_histories.parity IS 'Número de partos del paciente';
COMMENT ON COLUMN gynecological_histories.orientation IS 'Orientación sexual del paciente';
COMMENT ON COLUMN gynecological_histories.andria IS 'Número de abortos del paciente';
COMMENT ON COLUMN gynecological_histories.isa IS 'Inicio de Actividad Sexual del paciente';
COMMENT ON COLUMN gynecological_histories.lsa IS 'Última Actividad Sexual del paciente';
COMMENT ON COLUMN gynecological_histories.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN gynecological_histories.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN allergy_histories.allergy_history_id IS 'Identificador único del antecedente alérgico';
COMMENT ON COLUMN allergy_histories.patient_id IS 'Identificador del paciente asociado';
COMMENT ON COLUMN allergy_histories.diagnosis_id IS 'Identificador del diagnóstico asociado';
COMMENT ON COLUMN allergy_histories.specifications IS 'Especificaciones de la alergia';
COMMENT ON COLUMN allergy_histories.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN allergy_histories.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN ram_histories.ram_history_id IS 'Identificador único de la RAM';
COMMENT ON COLUMN ram_histories.patient_id IS 'Identificador del paciente asociado';
COMMENT ON COLUMN ram_histories.active_ingredient_id IS 'Identificador del principio activo asociado';
COMMENT ON COLUMN ram_histories.diagnosis_id IS 'Identificador del diagnóstico asociado';
COMMENT ON COLUMN ram_histories.specifications IS 'Especificaciones de la reacción adversa';
COMMENT ON COLUMN ram_histories.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN ram_histories.updated_at IS 'Fecha de actualización del registro';

COMMENT ON COLUMN audits.audit_id IS 'Identificador único de la auditoría';
COMMENT ON COLUMN audits.table_name IS 'Nombre de la tabla afectada';
COMMENT ON COLUMN audits.record_id IS 'Identificador del registro afectado';
COMMENT ON COLUMN audits.action IS 'Tipo de acción realizada';
COMMENT ON COLUMN audits.user_id IS 'Identificador del usuario que realizó la acción';
COMMENT ON COLUMN audits.old_data IS 'Datos anteriores a la modificación';
COMMENT ON COLUMN audits.new_data IS 'Datos posteriores a la modificación';
COMMENT ON COLUMN audits.ip IS 'Dirección IP de la solicitud';
COMMENT ON COLUMN audits.user_agent IS 'Aplicación origen de la solicitud';
COMMENT ON COLUMN audits.created_at IS 'Fecha de creación del registro';
