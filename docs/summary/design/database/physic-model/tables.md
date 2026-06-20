# Tablas del Sistema F&F-MEDIC

# Enums

| Tipo PostgreSQL | Valores |
|----------------|---------|
| DOCUMENT_TYPE | DNI, PASAPORTE, CE |
| SEX_TYPE | M, F |
| ONSET_TYPE | INSIDIOSO, BRUSCO |
| COURSE_TYPE | PROGRESIVO, ESTACIONARIO, INTERMITENTE |
| DIAGNOSIS_TYPE | PRESUNTIVO, DEFINITIVO, REPETITIVO |
| BIO_FUNCTION_TYPE | SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL |
| BIO_FUNCTION_STATUS | AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO |
| PHYSICAL_EXAM_SYSTEM | ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO |
| PHYSICAL_EXAM_STATUS | CONSERVADO, OBSERVADO, DIFERIDO |
| FAMILY_TYPE | PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO |
| FAMILY_STATUS | VIVO, FALLECIDO |
| HISTORY_TYPE | PATOLOGICO, QUIRURGICO |
| CONTRACEPTIVE_METHOD | NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO |
| ACTION_TYPE | INSERTAR, ACTUALIZAR, ELIMINAR |

---

# Triggers

| Función | Propósito |
|---------|-----------|
| update_updated_at_column() | Actualiza updated_at automáticamente en BEFORE UPDATE |
| audit_trigger() | Inserta en audits en AFTER INSERT/UPDATE/DELETE. SECURITY DEFINER. Lee app.current_user_id de la sesión |

---

# Users

| Rol | Permisos | Acceso a audits |
|-----|----------|----------------|
| ffmedic_admin_user | ALL en schema ff_medic_db, ALL en tablas y secuencias, DEFAULT PRIVILEGES | Sí |
| ffmedic_app_user | USAGE en schema, CRUD en tablas, USAGE SELECT en secuencias, DEFAULT PRIVILEGES | No (REVOKE ALL) |
| ffmedic_audit_user | USAGE en schema, SELECT en tablas, DEFAULT PRIVILEGES | Sí (solo lectura) |

---

# Tables

## 1. patients

| Columna | Tipo | Constraints |
|---------|------|-------------|
| patient_id | SERIAL | PK |
| document_type | DOCUMENT_TYPE | NOT NULL |
| document_number | VARCHAR(20) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| paternal_surname | VARCHAR(50) | NOT NULL |
| maternal_surname | VARCHAR(50) | NOT NULL |
| sex | SEX_TYPE | NOT NULL |
| phone | VARCHAR(15) | |
| birth_date | DATE | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_patients`: PRIMARY KEY (patient_id)
- `uq_patients_document`: UNIQUE (document_type, document_number)

**Indexes:**
- `idx_patients_document_number`: document_number

---

## 2. roles

| Columna | Tipo | Constraints |
|---------|------|-------------|
| role_id | SERIAL | PK |
| name | VARCHAR(50) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_roles`: PRIMARY KEY (role_id)
- `uq_roles_name`: UNIQUE (name)

---

## 3. users

| Columna | Tipo | Constraints |
|---------|------|-------------|
| user_id | SERIAL | PK |
| role_id | INTEGER | NOT NULL, FK → roles |
| name | VARCHAR(100) | NOT NULL |
| paternal_surname | VARCHAR(50) | NOT NULL |
| maternal_surname | VARCHAR(50) | NOT NULL |
| cmp_code | VARCHAR(10) | |
| username | VARCHAR(50) | NOT NULL |
| password | VARCHAR(250) | NOT NULL |
| email | VARCHAR(254) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_users`: PRIMARY KEY (user_id)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `fk_users_role_id`: FOREIGN KEY (role_id) REFERENCES roles(role_id)

**Indexes:**
- `idx_users_role_id`: role_id

---

## 4. services

| Columna | Tipo | Constraints |
|---------|------|-------------|
| service_id | SERIAL | PK |
| name | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_services`: PRIMARY KEY (service_id)
- `uq_services_name`: UNIQUE (name)

---

## 5. diagnoses

| Columna | Tipo | Constraints |
|---------|------|-------------|
| diagnosis_id | SERIAL | PK |
| cie_10 | VARCHAR(10) | NOT NULL |
| description | TEXT | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_diagnoses`: PRIMARY KEY (diagnosis_id)
- `uq_diagnoses_cie_10`: UNIQUE (cie_10)

---

## 6. active_ingredients

| Columna | Tipo | Constraints |
|---------|------|-------------|
| active_ingredient_id | SERIAL | PK |
| name | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_active_ingredients`: PRIMARY KEY (active_ingredient_id)
- `uq_active_ingredients_name`: UNIQUE (name)

---

## 7. manufacturers

| Columna | Tipo | Constraints |
|---------|------|-------------|
| manufacturer_id | SERIAL | PK |
| name | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_manufacturers`: PRIMARY KEY (manufacturer_id)
- `uq_manufacturers_name`: UNIQUE (name)

---

## 8. dosage_forms

| Columna | Tipo | Constraints |
|---------|------|-------------|
| dosage_form_id | SERIAL | PK |
| name | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_dosage_forms`: PRIMARY KEY (dosage_form_id)
- `uq_dosage_forms_name`: UNIQUE (name)

---

## 9. medicaments

| Columna | Tipo | Constraints |
|---------|------|-------------|
| medicament_id | SERIAL | PK |
| name | VARCHAR(100) | NOT NULL |
| manufacturer_id | INTEGER | NOT NULL, FK → manufacturers |
| concentration | VARCHAR(50) | NOT NULL |
| dosage_form_id | INTEGER | NOT NULL, FK → dosage_forms |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_medicaments`: PRIMARY KEY (medicament_id)
- `fk_medicaments_manufacturer_id`: FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
- `fk_medicaments_dosage_form_id`: FOREIGN KEY (dosage_form_id) REFERENCES dosage_forms(dosage_form_id)
- `uq_medicaments_product`: UNIQUE (name, concentration, manufacturer_id, dosage_form_id)

**Indexes:**
- `idx_medicaments_manufacturer_id`: manufacturer_id
- `idx_medicaments_dosage_form_id`: dosage_form_id

---

## 10. medicaments_ingredients

| Columna | Tipo | Constraints |
|---------|------|-------------|
| medicament_id | INTEGER | PK, FK → medicaments |
| active_ingredient_id | INTEGER | PK, FK → active_ingredients |

**Constraints:**
- `pk_medicaments_ingredients`: PRIMARY KEY (medicament_id, active_ingredient_id)
- `fk_medicaments_ingredients_medicament_id`: FOREIGN KEY (medicament_id) REFERENCES medicaments(medicament_id)
- `fk_medicaments_ingredients_active_ingredient_id`: FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredients(active_ingredient_id)

---

## 11. attentions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| attention_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| service_id | INTEGER | NOT NULL, FK → services |
| illness_duration | VARCHAR(50) | NOT NULL |
| onset_type | ONSET_TYPE | NOT NULL |
| course | COURSE_TYPE | NOT NULL |
| current_disease | TEXT | NOT NULL |
| work_plan | TEXT | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_attentions`: PRIMARY KEY (attention_id)
- `fk_attentions_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_attentions_service_id`: FOREIGN KEY (service_id) REFERENCES services(service_id)

**Indexes:**
- `idx_attentions_patient_id`: patient_id
- `idx_attentions_created_at`: created_at

---

## 12. attention_diagnoses

| Columna | Tipo | Constraints |
|---------|------|-------------|
| attention_diagnosis_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| type | DIAGNOSIS_TYPE | NOT NULL |
| specifications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_attention_diagnoses`: PRIMARY KEY (attention_diagnosis_id)
- `fk_attention_diagnoses_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `fk_attention_diagnoses_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)
- `uq_attention_diagnoses_unique`: UNIQUE (attention_id, diagnosis_id)

**Indexes:**
- `idx_attention_diagnoses_attention_id`: attention_id
- `idx_attention_diagnoses_diagnosis_id`: diagnosis_id

---

## 13. signs_symptoms

| Columna | Tipo | Constraints |
|---------|------|-------------|
| sign_symptom_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| observations | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_signs_symptoms`: PRIMARY KEY (sign_symptom_id)
- `fk_signs_symptoms_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `fk_signs_symptoms_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

**Indexes:**
- `idx_signs_symptoms_attention_id`: attention_id
- `idx_signs_symptoms_diagnosis_id`: diagnosis_id

---

## 14. health_metrics

| Columna | Tipo | Constraints |
|---------|------|-------------|
| health_metric_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| temperature | DECIMAL(4,2) | |
| spo2 | INTEGER | |
| heart_rate | INTEGER | |
| respiratory_rate | INTEGER | |
| systolic_bp | INTEGER | |
| diastolic_bp | INTEGER | |
| hgt | DECIMAL(5,2) | |
| hemoglobin | DECIMAL(4,2) | |
| weight | DECIMAL(5,2) | |
| abdominal_perimeter | DECIMAL(5,2) | |
| height | DECIMAL(5,2) | NOT NULL |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_health_metrics`: PRIMARY KEY (health_metric_id)
- `fk_health_metrics_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_health_metrics_attention`: UNIQUE (attention_id)
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

---

## 15. bio_functions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| bio_function_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| type | BIO_FUNCTION_TYPE | NOT NULL |
| status | BIO_FUNCTION_STATUS | NOT NULL |
| observations | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_bio_functions`: PRIMARY KEY (bio_function_id)
- `fk_bio_functions_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)

**Indexes:**
- `idx_bio_functions_attention_id`: attention_id

---

## 16. physical_exams

| Columna | Tipo | Constraints |
|---------|------|-------------|
| physical_exam_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| system | PHYSICAL_EXAM_SYSTEM | NOT NULL |
| other | VARCHAR(100) | |
| status | PHYSICAL_EXAM_STATUS | NOT NULL |
| observations | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_physical_exams`: PRIMARY KEY (physical_exam_id)
- `fk_physical_exams_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_physical_exams_attention_system`: UNIQUE (attention_id, system)

**Indexes:**
- `idx_physical_exams_attention_id`: attention_id

---

## 17. exams

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_exams`: PRIMARY KEY (exam_id)
- `fk_exams_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)

**Indexes:**
- `idx_exams_attention_id`: attention_id

---

## 18. exam_types

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_type_id | SERIAL | PK |
| description | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_exam_types`: PRIMARY KEY (exam_type_id)
- `uq_exam_types_description`: UNIQUE (description)

---

## 19. exam_items

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_item_id | SERIAL | PK |
| exam_id | INTEGER | NOT NULL, FK → exams |
| exam_type_id | INTEGER | NOT NULL, FK → exam_types |
| indications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_exam_items`: PRIMARY KEY (exam_item_id)
- `fk_exam_items_exam_id`: FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
- `fk_exam_items_exam_type_id`: FOREIGN KEY (exam_type_id) REFERENCES exam_types(exam_type_id)

**Indexes:**
- `idx_exam_items_exam_id`: exam_id
- `idx_exam_items_exam_type_id`: exam_type_id

---

## 20. prescriptions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_prescriptions`: PRIMARY KEY (prescription_id)
- `fk_prescriptions_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)

**Indexes:**
- `idx_prescriptions_attention_id`: attention_id

---

## 21. prescription_items

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_item_id | SERIAL | PK |
| prescription_id | INTEGER | NOT NULL, FK → prescriptions |
| medicament_id | INTEGER | NOT NULL, FK → medicaments |
| quantity | INTEGER | NOT NULL |
| indications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_prescription_items`: PRIMARY KEY (prescription_item_id)
- `fk_prescription_items_prescription_id`: FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id)
- `fk_prescription_items_medicament_id`: FOREIGN KEY (medicament_id) REFERENCES medicaments(medicament_id)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)

**Indexes:**
- `idx_prescription_items_prescription_id`: prescription_id

---

## 22. prescription_diagnoses

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_item_id | INTEGER | PK, FK → prescription_items |
| attention_diagnosis_id | INTEGER | PK, FK → attention_diagnoses |

**Constraints:**
- `pk_prescription_diagnoses`: PRIMARY KEY (prescription_item_id, attention_diagnosis_id)
- `fk_prescription_diagnoses_prescription_item_id`: FOREIGN KEY (prescription_item_id) REFERENCES prescription_items(prescription_item_id)
- `fk_prescription_diagnoses_attention_diagnosis_id`: FOREIGN KEY (attention_diagnosis_id) REFERENCES attention_diagnoses(attention_diagnosis_id)

---

## 23. referrals

| Columna | Tipo | Constraints |
|---------|------|-------------|
| referral_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| service_id | INTEGER | NOT NULL, FK → services |
| diagnosis_id | INTEGER | FK → diagnoses |
| reason | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_referrals`: PRIMARY KEY (referral_id)
- `fk_referrals_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `fk_referrals_service_id`: FOREIGN KEY (service_id) REFERENCES services(service_id)
- `fk_referrals_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)
- `ck_referrals_diagnosis_reason_exclusive`: CHECK ((diagnosis_id IS NOT NULL AND reason IS NULL) OR (diagnosis_id IS NULL AND reason IS NOT NULL))

**Indexes:**
- `idx_referrals_attention_id`: attention_id
- `idx_referrals_service_id`: service_id
- `idx_referrals_diagnosis_id`: diagnosis_id

---

## 24. clinical_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| clinical_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| type | HISTORY_TYPE | NOT NULL |
| specifications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_clinical_histories`: PRIMARY KEY (clinical_history_id)
- `fk_clinical_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_clinical_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

**Indexes:**
- `idx_clinical_histories_patient_id`: patient_id

---

## 25. family_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| family_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| type | FAMILY_TYPE | NOT NULL |
| other | VARCHAR(100) | |
| status | FAMILY_STATUS | NOT NULL |
| specifications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_family_histories`: PRIMARY KEY (family_history_id)
- `fk_family_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)

**Indexes:**
- `idx_family_histories_patient_id`: patient_id

---

## 26. gynecological_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| gynecological_history_id | SERIAL | PK |
| patient_id | INTEGER | FK → patients |
| menarche | INTEGER | |
| menstrual_cycle | VARCHAR(50) | |
| last_menstrual_period | DATE | |
| contraceptive_method | CONTRACEPTIVE_METHOD | |
| other | VARCHAR(100) | |
| gestations | INTEGER | |
| parity | INTEGER | |
| orientation | VARCHAR(50) | |
| andria | INTEGER | |
| isa | DATE | |
| lsa | DATE | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_gynecological_histories`: PRIMARY KEY (gynecological_history_id)
- `fk_gynecological_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `ck_gynecological_histories_menarche`: CHECK (menarche >= 0)
- `ck_gynecological_histories_gestations`: CHECK (gestations >= 0)
- `ck_gynecological_histories_parity`: CHECK (parity >= 0)
- `ck_gynecological_histories_andria`: CHECK (andria >= 0)
- `uq_gynecological_histories_patient`: UNIQUE (patient_id)

---

## 27. allergy_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| allergy_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| specifications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_allergy_histories`: PRIMARY KEY (allergy_history_id)
- `fk_allergy_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_allergy_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

**Indexes:**
- `idx_allergy_histories_patient_id`: patient_id

---

## 28. ram_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| ram_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| active_ingredient_id | INTEGER | NOT NULL, FK → active_ingredients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| specifications | VARCHAR(200) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_ram_histories`: PRIMARY KEY (ram_history_id)
- `fk_ram_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_ram_histories_active_ingredient_id`: FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredients(active_ingredient_id)
- `fk_ram_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

**Indexes:**
- `idx_ram_histories_patient_id`: patient_id

---

## 29. audits

| Columna | Tipo | Constraints |
|---------|------|-------------|
| audit_id | SERIAL | PK |
| table_name | VARCHAR(50) | NOT NULL |
| record_id | INTEGER | NOT NULL |
| action | ACTION_TYPE | NOT NULL |
| user_id | INTEGER | NOT NULL, FK → users |
| old_data | JSONB | |
| new_data | JSONB | |
| ip | INET | |
| user_agent | VARCHAR(250) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_audits`: PRIMARY KEY (audit_id)
- `fk_audits_user_id`: FOREIGN KEY (user_id) REFERENCES users(user_id)

**Indexes:**
- `idx_audits_user_id`: user_id
- `idx_audits_table_record`: (table_name, record_id)

---

# Resumenes

## Resumen de enums

| Tabla | Columna | Enum |
|-------|---------|------|
| patients | document_type | DOCUMENT_TYPE |
| patients | sex | SEX_TYPE |
| attentions | onset_type | ONSET_TYPE |
| attentions | course | COURSE_TYPE |
| attention_diagnoses | type | DIAGNOSIS_TYPE |
| bio_functions | type | BIO_FUNCTION_TYPE |
| bio_functions | status | BIO_FUNCTION_STATUS |
| physical_exams | system | PHYSICAL_EXAM_SYSTEM |
| physical_exams | status | PHYSICAL_EXAM_STATUS |
| family_histories | type | FAMILY_TYPE |
| family_histories | status | FAMILY_STATUS |
| clinical_histories | type | HISTORY_TYPE |
| gynecological_histories | contraceptive_method | CONTRACEPTIVE_METHOD |
| audits | action | ACTION_TYPE |

---

## Resumen de constraints

## PRIMARY KEY

| Tabla | PK |
|-------|----|
| patients | pk_patients |
| roles | pk_roles |
| users | pk_users |
| services | pk_services |
| diagnoses | pk_diagnoses |
| active_ingredients | pk_active_ingredients |
| manufacturers | pk_manufacturers |
| dosage_forms | pk_dosage_forms |
| medicaments | pk_medicaments |
| medicaments_ingredients | pk_medicaments_ingredients |
| attentions | pk_attentions |
| attention_diagnoses | pk_attention_diagnoses |
| signs_symptoms | pk_signs_symptoms |
| health_metrics | pk_health_metrics |
| bio_functions | pk_bio_functions |
| physical_exams | pk_physical_exams |
| exams | pk_exams |
| exam_types | pk_exam_types |
| exam_items | pk_exam_items |
| prescriptions | pk_prescriptions |
| prescription_items | pk_prescription_items |
| prescription_diagnoses | pk_prescription_diagnoses |
| referrals | pk_referrals |
| clinical_histories | pk_clinical_histories |
| family_histories | pk_family_histories |
| gynecological_histories | pk_gynecological_histories |
| allergy_histories | pk_allergy_histories |
| ram_histories | pk_ram_histories |
| audits | pk_audits |

## FOREIGN KEY

| Tabla | FK |
|-------|----|
| users | fk_users_role_id |
| medicaments | fk_medicaments_manufacturer_id, fk_medicaments_dosage_form_id |
| medicaments_ingredients | fk_medicaments_ingredients_medicament_id, fk_medicaments_ingredients_active_ingredient_id |
| attentions | fk_attentions_patient_id, fk_attentions_service_id |
| attention_diagnoses | fk_attention_diagnoses_attention_id, fk_attention_diagnoses_diagnosis_id |
| signs_symptoms | fk_signs_symptoms_attention_id, fk_signs_symptoms_diagnosis_id |
| health_metrics | fk_health_metrics_attention_id |
| bio_functions | fk_bio_functions_attention_id |
| physical_exams | fk_physical_exams_attention_id |
| exams | fk_exams_attention_id |
| exam_items | fk_exam_items_exam_id, fk_exam_items_exam_type_id |
| prescriptions | fk_prescriptions_attention_id |
| prescription_items | fk_prescription_items_prescription_id, fk_prescription_items_medicament_id |
| prescription_diagnoses | fk_prescription_diagnoses_prescription_item_id, fk_prescription_diagnoses_attention_diagnosis_id |
| referrals | fk_referrals_attention_id, fk_referrals_service_id, fk_referrals_diagnosis_id |
| clinical_histories | fk_clinical_histories_patient_id, fk_clinical_histories_diagnosis_id |
| family_histories | fk_family_histories_patient_id |
| gynecological_histories | fk_gynecological_histories_patient_id |
| allergy_histories | fk_allergy_histories_patient_id, fk_allergy_histories_diagnosis_id |
| ram_histories | fk_ram_histories_patient_id, fk_ram_histories_active_ingredient_id, fk_ram_histories_diagnosis_id |
| audits | fk_audits_user_id |

## UNIQUE

| Tabla | UQ |
|-------|----|
| patients | uq_patients_document |
| roles | uq_roles_name |
| users | uq_users_username, uq_users_email |
| services | uq_services_name |
| diagnoses | uq_diagnoses_cie_10 |
| active_ingredients | uq_active_ingredients_name |
| manufacturers | uq_manufacturers_name |
| dosage_forms | uq_dosage_forms_name |
| medicaments | uq_medicaments_product |
| attention_diagnoses | uq_attention_diagnoses_unique |
| health_metrics | uq_health_metrics_attention |
| bio_functions | uq_bio_functions_attention_type |
| physical_exams | uq_physical_exams_attention_system |
| exam_types | uq_exam_types_description |
| gynecological_histories | uq_gynecological_histories_patient |

## CHECK

| Tabla | CK |
|-------|----|
| health_metrics | ck_health_metrics_spo2, ck_health_metrics_temperature, ck_health_metrics_heart_rate, ck_health_metrics_respiratory_rate, ck_health_metrics_systolic_bp, ck_health_metrics_diastolic_bp, ck_health_metrics_hgt, ck_health_metrics_hemoglobin, ck_health_metrics_weight, ck_health_metrics_abdominal_perimeter, ck_health_metrics_height |
| prescription_items | ck_prescription_items_quantity |
| referrals | ck_referrals_diagnosis_reason_exclusive |
| gynecological_histories | ck_gynecological_histories_menarche, ck_gynecological_histories_gestations, ck_gynecological_histories_parity, ck_gynecological_histories_andria |

---

## Resumen de campos textuales

## TEXT

| Tabla | Columna |
|-------|---------|
| attentions | current_disease, work_plan |
| diagnoses | description |

## VARCHAR(254)

| Tabla | Columna |
|-------|---------|
| users | email |

## VARCHAR(250)

| Tabla | Columna |
|-------|---------|
| users | password |
| audits | user_agent |

## VARCHAR(200)

| Tabla | Columna |
|-------|---------|
| attention_diagnoses | specifications |
| signs_symptoms | observations |
| bio_functions | observations |
| physical_exams | observations |
| exam_items | indications |
| prescription_items | indications |
| referrals | reason |
| clinical_histories | specifications |
| family_histories | specifications |
| allergy_histories | specifications |
| ram_histories | specifications |

## VARCHAR(100)

| Tabla | Columna |
|-------|---------|
| patients | name |
| users | name |
| services | name |
| active_ingredients | name |
| manufacturers | name |
| dosage_forms | name |
| medicaments | name |
| exam_types | description |

## VARCHAR(50)

| Tabla | Columna |
|-------|---------|
| roles | name |
| users | username |
| patients | paternal_surname, maternal_surname |
| users | paternal_surname, maternal_surname |
| medicaments | concentration |
| attentions | illness_duration |
| gynecological_histories | menstrual_cycle, orientation |
| audits | table_name |

## VARCHAR(20)

| Tabla | Columna |
|-------|---------|
| patients | document_number |
| users | cmp_code |

## VARCHAR(15)

| Tabla | Columna |
|-------|---------|
| patients | phone |

## VARCHAR(10)

| Tabla | Columna |
|-------|---------|
| diagnoses | cie_10 |

---

## Resumen de triggers

| Trigger | Evento | Tabla |
|---------|--------|-------|
| trg_patients_updated_at | BEFORE UPDATE | patients |
| trg_users_updated_at | BEFORE UPDATE | users |
| trg_attentions_updated_at | BEFORE UPDATE | attentions |
| trg_attention_diagnoses_updated_at | BEFORE UPDATE | attention_diagnoses |
| trg_signs_symptoms_updated_at | BEFORE UPDATE | signs_symptoms |
| trg_health_metrics_updated_at | BEFORE UPDATE | health_metrics |
| trg_bio_functions_updated_at | BEFORE UPDATE | bio_functions |
| trg_physical_exams_updated_at | BEFORE UPDATE | physical_exams |
| trg_exams_updated_at | BEFORE UPDATE | exams |
| trg_prescriptions_updated_at | BEFORE UPDATE | prescriptions |
| trg_prescription_items_updated_at | BEFORE UPDATE | prescription_items |
| trg_referrals_updated_at | BEFORE UPDATE | referrals |
| trg_clinical_histories_updated_at | BEFORE UPDATE | clinical_histories |
| trg_family_histories_updated_at | BEFORE UPDATE | family_histories |
| trg_gynecological_histories_updated_at | BEFORE UPDATE | gynecological_histories |
| trg_allergy_histories_updated_at | BEFORE UPDATE | allergy_histories |
| trg_ram_histories_updated_at | BEFORE UPDATE | ram_histories |
| trg_patients_audit | AFTER INSERT OR UPDATE OR DELETE | patients |
| trg_roles_audit | AFTER INSERT OR UPDATE OR DELETE | roles |
| trg_users_audit | AFTER INSERT OR UPDATE OR DELETE | users |
| trg_services_audit | AFTER INSERT OR UPDATE OR DELETE | services |
| trg_diagnoses_audit | AFTER INSERT OR UPDATE OR DELETE | diagnoses |
| trg_active_ingredients_audit | AFTER INSERT OR UPDATE OR DELETE | active_ingredients |
| trg_manufacturers_audit | AFTER INSERT OR UPDATE OR DELETE | manufacturers |
| trg_dosage_forms_audit | AFTER INSERT OR UPDATE OR DELETE | dosage_forms |
| trg_medicaments_updated_at | BEFORE UPDATE | medicaments |
| trg_medicaments_audit | AFTER INSERT OR UPDATE OR DELETE | medicaments |
| trg_medicaments_ingredients_audit | AFTER INSERT OR UPDATE OR DELETE | medicaments_ingredients |
| trg_attentions_audit | AFTER INSERT OR UPDATE OR DELETE | attentions |
| trg_attention_diagnoses_audit | AFTER INSERT OR UPDATE OR DELETE | attention_diagnoses |
| trg_signs_symptoms_audit | AFTER INSERT OR UPDATE OR DELETE | signs_symptoms |
| trg_health_metrics_audit | AFTER INSERT OR UPDATE OR DELETE | health_metrics |
| trg_bio_functions_audit | AFTER INSERT OR UPDATE OR DELETE | bio_functions |
| trg_physical_exams_audit | AFTER INSERT OR UPDATE OR DELETE | physical_exams |
| trg_exams_audit | AFTER INSERT OR UPDATE OR DELETE | exams |
| trg_exam_types_audit | AFTER INSERT OR UPDATE OR DELETE | exam_types |
| trg_exam_items_audit | AFTER INSERT OR UPDATE OR DELETE | exam_items |
| trg_prescriptions_audit | AFTER INSERT OR UPDATE OR DELETE | prescriptions |
| trg_prescription_items_audit | AFTER INSERT OR UPDATE OR DELETE | prescription_items |
| trg_prescription_diagnoses_audit | AFTER INSERT OR UPDATE OR DELETE | prescription_diagnoses |
| trg_referrals_audit | AFTER INSERT OR UPDATE OR DELETE | referrals |
| trg_clinical_histories_audit | AFTER INSERT OR UPDATE OR DELETE | clinical_histories |
| trg_family_histories_audit | AFTER INSERT OR UPDATE OR DELETE | family_histories |
| trg_gynecological_histories_audit | AFTER INSERT OR UPDATE OR DELETE | gynecological_histories |
| trg_allergy_histories_audit | AFTER INSERT OR UPDATE OR DELETE | allergy_histories |
| trg_ram_histories_audit | AFTER INSERT OR UPDATE OR DELETE | ram_histories |

---

## Resumen de índices

| Índice | Columna(s) | Tabla |
|--------|-----------|-------|
| idx_patients_document_number | document_number | patients |
| idx_users_role_id | role_id | users |
| idx_medicaments_manufacturer_id | manufacturer_id | medicaments |
| idx_medicaments_dosage_form_id | dosage_form_id | medicaments |
| idx_attentions_patient_id | patient_id | attentions |
| idx_attentions_created_at | created_at | attentions |
| idx_attention_diagnoses_attention_id | attention_id | attention_diagnoses |
| idx_attention_diagnoses_diagnosis_id | diagnosis_id | attention_diagnoses |
| idx_signs_symptoms_attention_id | attention_id | signs_symptoms |
| idx_signs_symptoms_diagnosis_id | diagnosis_id | signs_symptoms |
| idx_bio_functions_attention_id | attention_id | bio_functions |
| idx_physical_exams_attention_id | attention_id | physical_exams |
| idx_exams_attention_id | attention_id | exams |
| idx_exam_items_exam_id | exam_id | exam_items |
| idx_exam_items_exam_type_id | exam_type_id | exam_items |
| idx_prescriptions_attention_id | attention_id | prescriptions |
| idx_prescription_items_prescription_id | prescription_id | prescription_items |
| idx_referrals_attention_id | attention_id | referrals |
| idx_referrals_service_id | service_id | referrals |
| idx_referrals_diagnosis_id | diagnosis_id | referrals |
| idx_clinical_histories_patient_id | patient_id | clinical_histories |
| idx_family_histories_patient_id | patient_id | family_histories |
| idx_allergy_histories_patient_id | patient_id | allergy_histories |
| idx_ram_histories_patient_id | patient_id | ram_histories |
| idx_audits_user_id | user_id | audits |
| idx_audits_table_record | (table_name, record_id) | audits |

