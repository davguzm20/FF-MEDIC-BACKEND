# Evolución del modelo físico F&F-MEDIC

## Modelo físico v0.1 - 27/05/2026

### Tablas

<details>
<summary>Ver más</summary>

- **patients:** patient_id PK, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active, created_at, updated_at
- **roles:** role_id PK, name, is_active
- **users:** user_id PK, role_id FK, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active
- **services:** service_id PK, name, is_active
- **diagnoses:** diagnosis_id PK, cie_10, description, is_active
- **active_ingredients:** active_ingredient_id PK, name, is_active
- **medicaments:** medicament_id PK, active_ingredient_id FK, description, concentration, form, is_active
- **attentions:** attention_id PK, patient_id FK, service_id FK, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **attention_diagnoses:** attention_diagnosis_id PK, attention_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **signs_symptoms:** sign_symptom_id PK, attention_id FK, diagnosis_id FK, observations, created_at, updated_at
- **vital_signs:** vital_sign_id PK, attention_id FK, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, created_at, updated_at
- **somatometries:** somatometry_id PK, patient_id FK, weight, height, abdominal_perimeter, created_at, updated_at
- **bio_functions:** bio_function_id PK, attention_id FK, type, status, observations, created_at, updated_at
- **physical_exams:** physical_exam_id PK, attention_id FK, created_at, updated_at
- **physical_exam_items:** physical_exam_item_id PK, physical_exam_id FK, system, status, observations, created_at
- **exams:** exam_id PK, attention_id FK, created_at, updated_at
- **exam_types:** exam_type_id PK, description, is_active
- **exam_items:** exam_item_id PK, exam_id FK, exam_type_id FK, indications, created_at
- **prescriptions:** prescription_id PK, attention_id FK, created_at, updated_at
- **prescription_items:** prescription_item_id PK, prescription_id FK, medicament_id FK, quantity, indications, created_at, updated_at
- **prescription_diagnoses:** prescription_item_id PK, attention_diagnosis_id PK
- **referrals:** referral_id PK, attention_id FK, service_id FK, diagnosis_id FK, reason, created_at, updated_at
- **pathological_histories:** pathological_history_id PK, patient_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **family_histories:** family_history_id PK, patient_id FK, type, status, specifications, created_at, updated_at
- **gynecological_histories:** gynecological_history_id PK, patient_id FK, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **allergy_histories:** allergy_history_id PK, patient_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **ram_histories:** ram_history_id PK, patient_id FK, active_ingredient_id FK, diagnosis_id FK, specifications, created_at, updated_at
- **audits:** audit_id PK, table_name, record_id, action, user_id FK, old_data, new_data, ip, user_agent, created_at

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

- **DOCUMENT_TYPE:** DNI, PASSPORT, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOUS, ABRUPT
- **COURSE_TYPE:** PROGRESSIVE, STATIONARY, INTERMITTENT
- **DIAGNOSIS_TYPE:** PRESUMPTIVE, DEFINITIVE, RECURRENT
- **BIO_FUNCTION_TYPE:** THIRST, APPETITE, SLEEP, STOOL, URINE, PONDERAL, MOOD
- **BIO_FUNCTION_STATUS:** INCREASED, DECREASED, PRESERVED, UNEVALUATED
- **PHYSICAL_EXAM_SYSTEM:** APPEARANCE, SKIN, HEAD, NECK, CHEST, CARDIOVASCULAR, ABDOMEN, GENITOURINARY, MUSCULOSKELETAL, NEUROLOGICAL, OTHER
- **PHYSICAL_EXAM_STATUS:** PRESERVED, OBSERVED, DEFERRED
- **FAMILY_TYPE:** FATHER, MOTHER, SON, BROTHER, GRANDFATHER, UNCLE
- **FAMILY_STATUS:** ALIVE, DECEASED
- **HISTORY_TYPE:** PATHOLOGICAL, SURGICAL
- **MENSTRUAL_CYCLE_TYPE:** REGULAR, IRREGULAR, AMENORRHEA, OLIGOMENORRHEA, POLYMENORRHEA, OTHER
- **CONTRACEPTIVE_METHOD:** NONE, COC, INJECTABLE, IMPLANT, IUD, CONDOM, TUBAL, VASECTOMY, OTHER
- **ORIENTATION_TYPE:** HETEROSEXUAL, HOMOSEXUAL, BISEXUAL, ASEXUAL, OTHER
- **ACTION_TYPE:** INSERT, UPDATE, DELETE

</details>

### Constraints

<details>
<summary>Ver más</summary>

- `uq_patients_document`: UNIQUE (document_type, document_number)
- `uq_roles_name`: UNIQUE (name)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `uq_services_name`: UNIQUE (name)
- `uq_diagnoses_cie_10`: UNIQUE (cie_10)
- `uq_active_ingredients_name`: UNIQUE (name)
- `uq_medicaments_product`: UNIQUE (description, concentration, form)
- `uq_attention_diagnoses_unique`: UNIQUE (attention_id, diagnosis_id)
- `uq_vital_signs_attention`: UNIQUE (attention_id)
- `uq_somatometries_patient`: UNIQUE (patient_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)
- `uq_physical_exams_attention`: UNIQUE (attention_id)
- `uq_physical_exam_items_system`: UNIQUE (physical_exam_id, system)
- `uq_gynecological_histories_patient`: UNIQUE (patient_id)
- `ck_vital_signs_spo2`: CHECK (spo2 >= 0 AND spo2 <= 100)
- `ck_vital_signs_temperature`: CHECK (temperature >= 30 AND temperature <= 45)
- `ck_vital_signs_heart_rate`: CHECK (heart_rate > 0)
- `ck_vital_signs_respiratory_rate`: CHECK (respiratory_rate > 0)
- `ck_vital_signs_systolic_bp`: CHECK (systolic_bp > 0)
- `ck_vital_signs_diastolic_bp`: CHECK (diastolic_bp > 0)
- `ck_vital_signs_hgt`: CHECK (hgt > 0)
- `ck_vital_signs_hemoglobin`: CHECK (hemoglobin > 0)
- `ck_somatometries_weight`: CHECK (weight > 0)
- `ck_somatometries_height`: CHECK (height > 0)
- `ck_somatometries_abdominal_perimeter`: CHECK (abdominal_perimeter > 0)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)
- `ck_referrals_diagnosis_reason_exclusive`: CHECK (XOR entre diagnosis_id y reason)
- `ck_gynecological_histories_menarche`: CHECK (menarche >= 0)
- `ck_gynecological_histories_gestations`: CHECK (gestations >= 0)
- `ck_gynecological_histories_parity`: CHECK (parity >= 0)
- `ck_gynecological_histories_andria`: CHECK (andria >= 0)

</details>

### Decisiones para la siguiente versión (v0.2)

- `DEC-01`: Se amplió el campo `document_number` de 15 a 20 caracteres en `patients`, ya que el número de documento puede tener hasta 20 caracteres (DNI: 8, CE: hasta 12). (OBS-01)

- `DEC-02`: Se redujeron los campos `paternal_surname` y `maternal_surname` de 100 a 50 caracteres en `patients` y `users`, porque 100 caracteres es demasiado para un apellido. (OBS-02)

- `DEC-03`: Se redujo el campo `cmp_code` de 20 a 10 caracteres en `users`, dado que el código CMP tiene 6 dígitos. (OBS-03)

- `DEC-04`: Se ajustó el campo `email` de 250 a 254 caracteres en `users`, puesto que el RFC especifica que el máximo es 254. (OBS-04)

- `DEC-05`: Se redujo el campo `illness_duration` de 100 a 50 caracteres en `attentions`, porque 100 caracteres es demasiado para valores como «3 días» o «2 semanas». (OBS-05)

- `DEC-06`: Se eliminó la tabla `physical_exam_items` y se refactorizó `physical_exams` con los campos `system`, `status` y `observations` y relación N:1 hacia `attentions`, puesto que cada examen físico debe tener un sistema por fila como `bio_functions`.

- `DEC-07`: Se creó la tabla `medicaments_ingredients` como relación N:M entre `medicaments` y `active_ingredients`, debido a que un medicamento puede tener varios principios activos.

- `DEC-08`: Se crearon las tablas `manufacturers` y `dosage_forms` y se agregaron los campos `name`, `manufacturer_id` y `dosage_form_id` en `medicaments`, reemplazando el campo `form`, dado que la marca y la forma farmacéutica deben estar normalizadas.

- `DEC-09`: Se tradujeron todos los valores de los enums a español, ya que el sistema se usa en Perú.

- `DEC-10`: Se agregó el valor `OTRO` al enum `FAMILY_TYPE`, puesto que pueden aparecer tipos de familiar no contemplados.

- `DEC-11`: Se eliminaron los enums `MENSTRUAL_CYCLE_TYPE` y `ORIENTATION_TYPE` y se reemplazaron por campos de texto libre, dado que ambos tienen demasiadas variantes para un listado fijo.

- `DEC-12`: Se eliminó el campo `type` en `allergy_histories`, debido a que las reacciones adversas tienen su propia tabla y el discriminador ya no es necesario.

- `DEC-13`: Se eliminó la tabla `somatometries` y se agregó el campo `height` como `DECIMAL(5,2) NOT NULL` en `health_metrics` con CHECK (height > 0), ya que la talla es un dato de salud que se mide en cada atención. (Implícito de DEC-80)

- `DEC-14`: Se agregaron los campos `created_at` y `updated_at` como `TIMESTAMPTZ NOT NULL DEFAULT NOW()` en `users`, porque es necesario mantener consistencia con el estándar de auditoría temporal del resto del modelo. (Implícito de DEC-83)

---

## Modelo físico v0.2 - 28/05/2026

### Tablas

<details>
<summary>Ver más</summary>

- **patients:** patient_id PK, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active, created_at, updated_at
- **roles:** role_id PK, name, is_active
- **users:** user_id PK, role_id FK, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active, created_at, updated_at
- **services:** service_id PK, name, is_active
- **diagnoses:** diagnosis_id PK, cie_10, description, is_active
- **active_ingredients:** active_ingredient_id PK, name, is_active
- **manufacturers:** manufacturer_id PK, name, is_active
- **dosage_forms:** dosage_form_id PK, name, is_active
- **medicaments:** medicament_id PK, name, manufacturer_id FK, concentration, dosage_form_id FK, is_active
- **medicaments_ingredients:** medicament_id PK FK, active_ingredient_id PK FK
- **attentions:** attention_id PK, patient_id FK, service_id FK, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **attention_diagnoses:** attention_diagnosis_id PK, attention_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **signs_symptoms:** sign_symptom_id PK, attention_id FK, description, observations, created_at, updated_at
- **health_metrics:** health_metric_id PK, attention_id FK, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, height, abdominal_perimeter, created_at, updated_at
- **bio_functions:** bio_function_id PK, attention_id FK, type, status, observations, created_at, updated_at
- **physical_exams:** physical_exam_id PK, attention_id FK, system, other, status, observations, created_at, updated_at
- **exams:** exam_id PK, attention_id FK, created_at
- **exam_types:** exam_type_id PK, description, cie_10, is_active
- **exam_items:** exam_item_id PK, exam_id FK, exam_type_id FK, indications
- **prescriptions:** prescription_id PK, attention_id FK, created_at
- **prescription_items:** prescription_item_id PK, prescription_id FK, medicament_id FK, quantity, indications
- **prescription_diagnoses:** prescription_item_id PK FK, attention_diagnosis_id PK FK
- **referrals:** referral_id PK, attention_id FK, diagnosis_id FK, service_id FK, reason
- **clinical_histories:** clinical_history_id PK, patient_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **family_histories:** family_history_id PK, patient_id FK, type, other, status, specifications
- **gynecological_histories:** gynecological_history_id PK, patient_id FK, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, other, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **allergy_histories:** allergy_history_id PK, patient_id FK, diagnosis_id FK, specifications
- **ram_histories:** ram_history_id PK, patient_id FK, active_ingredient_id FK, diagnosis_id FK, specifications
- **audits:** audit_id PK, table_name, record_id, action, user_id FK, old_data, new_data, ip, user_agent, created_at

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **FAMILY_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **CONTRACEPTIVE_METHOD:** NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO
- **ACTION_TYPE:** INSERTAR, ACTUALIZAR, ELIMINAR

</details>

### Constraints

<details>
<summary>Ver más</summary>

- `uq_patients_document`: UNIQUE (document_type, document_number)
- `uq_roles_name`: UNIQUE (name)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `uq_services_name`: UNIQUE (name)
- `uq_diagnoses_cie_10`: UNIQUE (cie_10)
- `uq_active_ingredients_name`: UNIQUE (name)
- `uq_manufacturers_name`: UNIQUE (name)
- `uq_dosage_forms_name`: UNIQUE (name)
- `uq_medicaments_product`: UNIQUE (name, concentration, manufacturer_id, dosage_form_id)
- `uq_attention_diagnoses_unique`: UNIQUE (attention_id, diagnosis_id)
- `uq_health_metrics_attention`: UNIQUE (attention_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)
- `uq_physical_exams_attention_system`: UNIQUE (attention_id, system)
- `uq_gynecological_histories_patient`: UNIQUE (patient_id)
- `ck_health_metrics_spo2`: CHECK (spo2 >= 0 AND spo2 <= 100)
- `ck_health_metrics_temperature`: CHECK (temperature >= 30 AND temperature <= 45)
- `ck_health_metrics_heart_rate`: CHECK (heart_rate > 0)
- `ck_health_metrics_respiratory_rate`: CHECK (respiratory_rate > 0)
- `ck_health_metrics_systolic_bp`: CHECK (systolic_bp > 0)
- `ck_health_metrics_diastolic_bp`: CHECK (diastolic_bp > 0)
- `ck_health_metrics_hgt`: CHECK (hgt > 0)
- `ck_health_metrics_hemoglobin`: CHECK (hemoglobin > 0)
- `ck_health_metrics_weight`: CHECK (weight > 0)
- `ck_health_metrics_abdominal_perimeter`: CHECK (abdominal_perimeter > 0)
- `ck_health_metrics_height`: CHECK (height > 0)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)
- `ck_referrals_diagnosis_reason_exclusive`: CHECK (XOR entre diagnosis_id y reason)
- `ck_gynecological_histories_menarche`: CHECK (menarche >= 0)
- `ck_gynecological_histories_gestations`: CHECK (gestations >= 0)
- `ck_gynecological_histories_parity`: CHECK (parity >= 0)
- `ck_gynecological_histories_andria`: CHECK (andria >= 0)

</details>

### Decisiones para la siguiente versión (v0.3)

- `DEC-15`: Se agregaron índices en todas las columnas con FK porque PostgreSQL no indexa las claves foráneas automáticamente. (OBS-06)

- `DEC-16`: Se agregaron CHECK constraints en health_metrics, gynecological_histories, prescription_items y referrals para validar los rangos de datos clínicos y reglas de negocio a nivel de base de datos. (OBS-07)

- `DEC-17`: Se creó la función update_updated_at_column y triggers BEFORE UPDATE en todas las tablas con updated_at, ya que el campo no se actualizaba automáticamente al modificar un registro. (OBS-08)

- `DEC-18`: Se creó la función audit_trigger y triggers AFTER INSERT OR UPDATE OR DELETE en todas las tablas transaccionales, dado que la auditoría de cambios no estaba implementada a nivel de base de datos. (OBS-09)

- `DEC-19`: Se agregaron comentarios en todas las tablas, columnas e índices para documentar su propósito en PostgreSQL. (OBS-10)

- `DEC-20`: Se crearon los roles de base de datos ffmedic_app_user con CRUD sin acceso a audits y ffmedic_audit_user con solo SELECT para establecer permisos granulares. (OBS-11)

- `DEC-21`: Se eliminaron created_at y updated_at de medicaments porque es un catálogo que no requiere trazabilidad temporal. (OBS-12)

- `DEC-22`: Se cambió ip de INET a VARCHAR(45) en audits, puesto que INET no es compatible con Neon. (OBS-13)

- `DEC-23`: Se amplió name de VARCHAR(100) a VARCHAR(250) en active_ingredients, ya que 100 caracteres es insuficiente para nombres compuestos de principios activos. (OBS-14)

- `DEC-24`: Se renombró exam_types a procedures y exam_type_id a procedure_id, ya que el nombre no es el término clínico adecuado para los procedimientos que almacena. (Implícito de DEC-93)

- `DEC-25`: Se agregaron type y category en procedures con UNIQUE compuesto sobre type, category y description, dado que la tabla necesitaba campos de agrupación para organizar los procedimientos. (Implícito de DEC-94)

- `DEC-26`: Se agregó user_id como FK a users en attentions con índice idx_attentions_user_id, porque la tabla no registraba el médico que realizó la atención. (Implícito de DEC-92)

---

## Modelo físico v0.3 - 06/07/2026

### Tablas

<details>
<summary>Ver más</summary>

- **patients:** patient_id PK, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active, created_at, updated_at
- **roles:** role_id PK, name, is_active
- **users:** user_id PK, role_id FK, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active, created_at, updated_at
- **services:** service_id PK, name, is_active
- **diagnoses:** diagnosis_id PK, cie_10, description, is_active
- **active_ingredients:** active_ingredient_id PK, name, is_active
- **manufacturers:** manufacturer_id PK, name, is_active
- **dosage_forms:** dosage_form_id PK, name, is_active
- **medicaments:** medicament_id PK, name, manufacturer_id FK, concentration, dosage_form_id FK, is_active
- **medicaments_ingredients:** medicament_id PK FK, active_ingredient_id PK FK
- **attentions:** attention_id PK, patient_id FK, service_id FK, user_id FK, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **attention_diagnoses:** attention_diagnosis_id PK, attention_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **signs_symptoms:** sign_symptom_id PK, attention_id FK, description, observations, created_at, updated_at
- **health_metrics:** health_metric_id PK, attention_id FK, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, height, abdominal_perimeter, created_at, updated_at
- **bio_functions:** bio_function_id PK, attention_id FK, type, status, observations, created_at, updated_at
- **physical_exams:** physical_exam_id PK, attention_id FK, system, other, status, observations, created_at, updated_at
- **exams:** exam_id PK, attention_id FK, created_at, updated_at
- **procedures:** procedure_id PK, type, category, description, is_active
- **exam_items:** exam_item_id PK, exam_id FK, procedure_id FK, indications
- **prescriptions:** prescription_id PK, attention_id FK, created_at, updated_at
- **prescription_items:** prescription_item_id PK, prescription_id FK, medicament_id FK, quantity, indications, created_at, updated_at
- **prescription_diagnoses:** prescription_item_id PK FK, attention_diagnosis_id PK FK
- **referrals:** referral_id PK, attention_id FK, diagnosis_id FK, service_id FK, reason
- **clinical_histories:** clinical_history_id PK, patient_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **family_histories:** family_history_id PK, patient_id FK, type, other, status, specifications, created_at, updated_at
- **gynecological_histories:** gynecological_history_id PK, patient_id FK, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, other, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **allergy_histories:** allergy_history_id PK, patient_id FK, diagnosis_id FK, specifications, created_at, updated_at
- **ram_histories:** ram_history_id PK, patient_id FK, active_ingredient_id FK, diagnosis_id FK, specifications, created_at, updated_at
- **audits:** audit_id PK, table_name, record_id, action, user_id FK, old_data, new_data, ip, user_agent, created_at

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **FAMILY_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **CONTRACEPTIVE_METHOD:** NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO
- **ACTION_TYPE:** INSERTAR, ACTUALIZAR, ELIMINAR

</details>

### Constraints

<details>
<summary>Ver más</summary>

- `uq_patients_document`: UNIQUE (document_type, document_number)
- `uq_roles_name`: UNIQUE (name)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `uq_services_name`: UNIQUE (name)
- `uq_diagnoses_cie_10`: UNIQUE (cie_10)
- `uq_active_ingredients_name`: UNIQUE (name)
- `uq_manufacturers_name`: UNIQUE (name)
- `uq_dosage_forms_name`: UNIQUE (name)
- `uq_medicaments_product`: UNIQUE (name, concentration, manufacturer_id, dosage_form_id)
- `uq_attention_diagnoses_unique`: UNIQUE (attention_id, diagnosis_id)
- `uq_health_metrics_attention`: UNIQUE (attention_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)
- `uq_physical_exams_attention_system`: UNIQUE (attention_id, system)
- `uq_gynecological_histories_patient`: UNIQUE (patient_id)
- `uq_procedures_type_category_description`: UNIQUE (type, category, description)
- `ck_health_metrics_spo2`: CHECK (spo2 >= 0 AND spo2 <= 100)
- `ck_health_metrics_temperature`: CHECK (temperature >= 30 AND temperature <= 45)
- `ck_health_metrics_heart_rate`: CHECK (heart_rate > 0)
- `ck_health_metrics_respiratory_rate`: CHECK (respiratory_rate > 0)
- `ck_health_metrics_systolic_bp`: CHECK (systolic_bp > 0)
- `ck_health_metrics_diastolic_bp`: CHECK (diastolic_bp > 0)
- `ck_health_metrics_hgt`: CHECK (hgt > 0)
- `ck_health_metrics_hemoglobin`: CHECK (hemoglobin > 0)
- `ck_health_metrics_weight`: CHECK (weight > 0)
- `ck_health_metrics_abdominal_perimeter`: CHECK (abdominal_perimeter > 0)
- `ck_health_metrics_height`: CHECK (height > 0)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)
- `ck_referrals_diagnosis_reason_exclusive`: CHECK (XOR entre diagnosis_id y reason)
- `ck_gynecological_histories_menarche`: CHECK (menarche >= 0)
- `ck_gynecological_histories_gestations`: CHECK (gestations >= 0)
- `ck_gynecological_histories_parity`: CHECK (parity >= 0)
- `ck_gynecological_histories_andria`: CHECK (andria >= 0)

</details>

### Indices

<details>
<summary>Ver más</summary>

- `idx_patients_document_number`: patients (document_number)
- `idx_users_role_id`: users (role_id)
- `idx_medicaments_manufacturer_id`: medicaments (manufacturer_id)
- `idx_medicaments_dosage_form_id`: medicaments (dosage_form_id)
- `idx_attentions_patient_id`: attentions (patient_id)
- `idx_attentions_user_id`: attentions (user_id)
- `idx_attentions_created_at`: attentions (created_at)
- `idx_attention_diagnoses_attention_id`: attention_diagnoses (attention_id)
- `idx_attention_diagnoses_diagnosis_id`: attention_diagnoses (diagnosis_id)
- `idx_signs_symptoms_attention_id`: signs_symptoms (attention_id)
- `idx_signs_symptoms_diagnosis_id`: signs_symptoms (diagnosis_id)
- `idx_bio_functions_attention_id`: bio_functions (attention_id)
- `idx_physical_exams_attention_id`: physical_exams (attention_id)
- `idx_exams_attention_id`: exams (attention_id)
- `idx_exam_items_exam_id`: exam_items (exam_id)
- `idx_exam_items_procedure_id`: exam_items (procedure_id)
- `idx_prescriptions_attention_id`: prescriptions (attention_id)
- `idx_prescription_items_prescription_id`: prescription_items (prescription_id)
- `idx_referrals_attention_id`: referrals (attention_id)
- `idx_referrals_service_id`: referrals (service_id)
- `idx_referrals_diagnosis_id`: referrals (diagnosis_id)
- `idx_clinical_histories_patient_id`: clinical_histories (patient_id)
- `idx_family_histories_patient_id`: family_histories (patient_id)
- `idx_allergy_histories_patient_id`: allergy_histories (patient_id)
- `idx_ram_histories_patient_id`: ram_histories (patient_id)
- `idx_audits_user_id`: audits (user_id)
- `idx_audits_table_record`: audits (table_name, record_id)

</details>

### Triggers

<details>
<summary>Ver más</summary>

- **update_updated_at_column():** Actualiza `updated_at` en BEFORE UPDATE sobre todas las tablas con `updated_at` (16 triggers)
- **audit_trigger():** Inserta en `audits` en AFTER INSERT OR UPDATE OR DELETE sobre las tablas transaccionales (28 triggers). SECURITY DEFINER. Lee app.current_user_id de la sesión

</details>

### Decisiones para la siguiente versión (v0.4)

- `DEC-27`: Se cambió `isa` de DATE a VARCHAR(250) en `gynecological_histories`, debido a que la paciente puede no recordar la fecha exacta. (OBS-18)

- `DEC-28`: Se cambió `lsa` de DATE a VARCHAR(250) en `gynecological_histories`, debido a que la paciente puede no recordar la fecha exacta. (OBS-19)

- `DEC-29`: Se eliminó `parity` y su CHECK, y se crearon `term_births`, `preterm_births`, `abortions` y `living_children` como SMALLINT con CHECK de entero positivo de 2 cifras cada uno en `gynecological_histories`, ya que la fórmula obstétrica requiere almacenar cada valor por separado. (OBS-20)

- `DEC-30`: Se creó CHECK `sexual_partners` como entero positivo de 2 cifras en `gynecological_histories`, puesto que el número de parejas sexuales es un entero positivo de máximo dos cifras. (OBS-21)

- `DEC-31`: Se eliminaron la FK `diagnosis_id`, el CHECK `ck_referrals_diagnosis_reason_exclusive` y el índice `idx_referrals_diagnosis_id` en `referrals`, ya que el campo `diagnosis_id` fue eliminado del modelo lógico. (OBS-22)

- `DEC-32`: Se cambiaron a SMALLINT los campos `menarche`, `gestations`, `andria`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp` y `diastolic_bp` en `gynecological_histories` y `health_metrics` con sus respectivos CHECK constraints, dado que sus valores caben en 2 bytes y se optimiza el almacenamiento. (OBS-23)

---

## Modelo físico v0.4 - 25/07/2026

### Tablas

<details>
<summary>Ver más</summary>

- **patients:** patient_id PK, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active, created_at, updated_at
- **roles:** role_id PK, name, is_active
- **users:** user_id PK, role_id FK, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active, created_at, updated_at
- **services:** service_id PK, name, is_active
- **diagnoses:** diagnosis_id PK, cie_10, description, is_active
- **active_ingredients:** active_ingredient_id PK, name, is_active
- **manufacturers:** manufacturer_id PK, name, is_active
- **dosage_forms:** dosage_form_id PK, name, is_active
- **medicaments:** medicament_id PK, name, manufacturer_id FK, concentration, dosage_form_id FK, is_active
- **medicaments_ingredients:** medicament_id PK FK, active_ingredient_id PK FK
- **attentions:** attention_id PK, patient_id FK, service_id FK, user_id FK, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **attention_diagnoses:** attention_diagnosis_id PK, attention_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **health_metrics:** health_metric_id PK, attention_id FK, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, height, abdominal_perimeter, created_at, updated_at
- **bio_functions:** bio_function_id PK, attention_id FK, type, status, observations, created_at, updated_at
- **physical_exams:** physical_exam_id PK, attention_id FK, system, other, status, observations, created_at, updated_at
- **exams:** exam_id PK, attention_id FK, created_at, updated_at
- **procedures:** procedure_id PK, type, category, description, is_active
- **exam_items:** exam_item_id PK, exam_id FK, procedure_id FK, indications, created_at
- **prescriptions:** prescription_id PK, attention_id FK, created_at, updated_at
- **prescription_items:** prescription_item_id PK, prescription_id FK, medicament_id FK, quantity, indications, created_at, updated_at
- **prescription_diagnoses:** prescription_item_id PK FK, attention_diagnosis_id PK FK
- **referrals:** referral_id PK, attention_id FK, service_id FK, reason, created_at, updated_at
- **clinical_histories:** clinical_history_id PK, patient_id FK, diagnosis_id FK, type, specifications, created_at, updated_at
- **family_histories:** family_history_id PK, patient_id FK, type, other, status, specifications, created_at, updated_at
- **gynecological_histories:** gynecological_history_id PK, patient_id FK, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, contraceptive_method_other, gestations, term_births, preterm_births, abortions, living_children, orientation, orientation_other, sexual_partners, isa, lsa, created_at, updated_at
- **allergy_histories:** allergy_history_id PK, patient_id FK, diagnosis_id FK, specifications, created_at, updated_at
- **ram_histories:** ram_history_id PK, patient_id FK, active_ingredient_id FK, diagnosis_id FK, specifications, created_at, updated_at
- **responsible:** responsible_id PK, attention_id FK, name, paternal_surname, maternal_surname, relationship, relationship_other, phone, created_at, updated_at
- **audits:** audit_id PK, table_name, record_id, action, user_id FK, old_data, new_data, ip, user_agent, created_at

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **RELATIONSHIP_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **ORIENTATION_TYPE:** HETEROSEXUAL, HOMOSEXUAL, BISEXUAL, PANSEXUAL, ASEXUAL, OTRO, PREFIERE_NO_RESPONDER
- **CONTRACEPTIVE_METHOD:** NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO
- **ACTION_TYPE:** INSERTAR, ACTUALIZAR, ELIMINAR

</details>

### Constraints

<details>
<summary>Ver más</summary>

- `uq_patients_document`: UNIQUE (document_type, document_number)
- `uq_roles_name`: UNIQUE (name)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `uq_services_name`: UNIQUE (name)
- `uq_diagnoses_cie_10`: UNIQUE (cie_10)
- `uq_active_ingredients_name`: UNIQUE (name)
- `uq_manufacturers_name`: UNIQUE (name)
- `uq_dosage_forms_name`: UNIQUE (name)
- `uq_medicaments_product`: UNIQUE (name, concentration, manufacturer_id, dosage_form_id)
- `uq_attention_diagnoses_unique`: UNIQUE (attention_id, diagnosis_id)
- `uq_health_metrics_attention`: UNIQUE (attention_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)
- `uq_physical_exams_attention_system`: UNIQUE (attention_id, system)
- `uq_procedures_type_category_description`: UNIQUE (type, category, description)
- `uq_gynecological_histories_patient`: UNIQUE (patient_id)
- `uq_responsible_attention`: UNIQUE (attention_id)
- `ck_health_metrics_spo2`: CHECK (spo2 >= 0 AND spo2 <= 100)
- `ck_health_metrics_temperature`: CHECK (temperature >= 30 AND temperature <= 45)
- `ck_health_metrics_heart_rate`: CHECK (heart_rate > 0)
- `ck_health_metrics_respiratory_rate`: CHECK (respiratory_rate > 0)
- `ck_health_metrics_systolic_bp`: CHECK (systolic_bp > 0)
- `ck_health_metrics_diastolic_bp`: CHECK (diastolic_bp > 0)
- `ck_health_metrics_hgt`: CHECK (hgt > 0)
- `ck_health_metrics_hemoglobin`: CHECK (hemoglobin > 0)
- `ck_health_metrics_weight`: CHECK (weight > 0)
- `ck_health_metrics_abdominal_perimeter`: CHECK (abdominal_perimeter > 0)
- `ck_health_metrics_height`: CHECK (height > 0)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)
- `ck_gynecological_histories_menarche`: CHECK (menarche >= 0)
- `ck_gynecological_histories_gestations`: CHECK (gestations >= 0)
- `ck_gynecological_histories_term_births`: CHECK (term_births >= 0 AND term_births <= 99)
- `ck_gynecological_histories_preterm_births`: CHECK (preterm_births >= 0 AND preterm_births <= 99)
- `ck_gynecological_histories_abortions`: CHECK (abortions >= 0 AND abortions <= 99)
- `ck_gynecological_histories_living_children`: CHECK (living_children >= 0 AND living_children <= 99)
- `ck_gynecological_histories_sexual_partners`: CHECK (sexual_partners >= 0 AND sexual_partners <= 99)

</details>

### Indices

<details>
<summary>Ver más</summary>

- `idx_patients_document_number`: patients (document_number)
- `idx_users_role_id`: users (role_id)
- `idx_medicaments_manufacturer_id`: medicaments (manufacturer_id)
- `idx_medicaments_dosage_form_id`: medicaments (dosage_form_id)
- `idx_attentions_patient_id`: attentions (patient_id)
- `idx_attentions_user_id`: attentions (user_id)
- `idx_attentions_created_at`: attentions (created_at)
- `idx_attention_diagnoses_attention_id`: attention_diagnoses (attention_id)
- `idx_attention_diagnoses_diagnosis_id`: attention_diagnoses (diagnosis_id)
- `idx_bio_functions_attention_id`: bio_functions (attention_id)
- `idx_physical_exams_attention_id`: physical_exams (attention_id)
- `idx_exams_attention_id`: exams (attention_id)
- `idx_exam_items_exam_id`: exam_items (exam_id)
- `idx_exam_items_procedure_id`: exam_items (procedure_id)
- `idx_prescriptions_attention_id`: prescriptions (attention_id)
- `idx_prescription_items_prescription_id`: prescription_items (prescription_id)
- `idx_referrals_attention_id`: referrals (attention_id)
- `idx_referrals_service_id`: referrals (service_id)
- `idx_clinical_histories_patient_id`: clinical_histories (patient_id)
- `idx_family_histories_patient_id`: family_histories (patient_id)
- `idx_allergy_histories_patient_id`: allergy_histories (patient_id)
- `idx_ram_histories_patient_id`: ram_histories (patient_id)
- `idx_audits_user_id`: audits (user_id)
- `idx_audits_table_record`: audits (table_name, record_id)

</details>

### Triggers

<details>
<summary>Ver más</summary>

- **update_updated_at_column():** Actualiza `updated_at` en BEFORE UPDATE sobre las tablas con `updated_at`: patients, users, attentions, attention_diagnoses, health_metrics, bio_functions, physical_exams, exams, prescriptions, prescription_items, referrals, clinical_histories, family_histories, gynecological_histories, allergy_histories, ram_histories, responsible (17 triggers)
- **audit_trigger():** Inserta en `audits` en AFTER INSERT OR UPDATE OR DELETE sobre todas las tablas transaccionales (28 triggers). SECURITY DEFINER. Lee app.current_user_id de la sesión

</details>

---
