# Tablas del Sistema F&F-MEDIC

## Enumeraciones

| Tipo PostgreSQL | Valores |
|----------------|---------|
| DOCUMENT_TYPE | DNI, PASSPORT, CE |
| SEX_TYPE | M, F |
| ONSET_TYPE | INSIDIOUS, ABRUPT |
| COURSE_TYPE | PROGRESSIVE, STATIONARY, INTERMITTENT |
| DIAGNOSIS_TYPE | PRESUMPTIVE, DEFINITIVE, RECURRENT |
| BIO_FUNCTION_TYPE | THIRST, APPETITE, SLEEP, STOOL, URINE, PONDERAL, MOOD |
| BIO_FUNCTION_STATUS | INCREASED, DECREASED, PRESERVED, UNEVALUATED |
| PHYSICAL_EXAM_SYSTEM | APPEARANCE, SKIN, HEAD, NECK, CHEST, CARDIOVASCULAR, ABDOMEN, GENITOURINARY, MUSCULOSKELETAL, NEUROLOGICAL, OTHER |
| PHYSICAL_EXAM_STATUS | PRESERVED, OBSERVED, DEFERRED |
| FAMILY_TYPE | FATHER, MOTHER, SON, BROTHER, GRANDFATHER, UNCLE |
| FAMILY_STATUS | ALIVE, DECEASED |
| HISTORY_TYPE | PATHOLOGICAL, SURGICAL |
| MENSTRUAL_CYCLE_TYPE | REGULAR, IRREGULAR, AMENORRHEA, OLIGOMENORRHEA, POLYMENORRHEA, OTHER |
| CONTRACEPTIVE_METHOD | NONE, COC, INJECTABLE, IMPLANT, IUD, CONDOM, TUBAL, VASECTOMY, OTHER |
| ORIENTATION_TYPE | HETEROSEXUAL, HOMOSEXUAL, BISEXUAL, ASEXUAL, OTHER |
| ACTION_TYPE | INSERT, UPDATE, DELETE |

---

## 1. patients

| Columna | Tipo | Constraints |
|---------|------|-------------|
| patient_id | SERIAL | PK |
| document_type | DOCUMENT_TYPE | NOT NULL |
| document_number | VARCHAR(15) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| paternal_surname | VARCHAR(100) | NOT NULL |
| maternal_surname | VARCHAR(100) | |
| sex | SEX_TYPE | NOT NULL |
| phone | VARCHAR(15) | NOT NULL |
| birth_date | DATE | |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_patients`: PRIMARY KEY (patient_id)
- `uq_patients_document`: UNIQUE (document_type, document_number)

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
| name | VARCHAR(100) | |
| paternal_surname | VARCHAR(100) | |
| maternal_surname | VARCHAR(100) | |
| cmp_code | VARCHAR(20) | |
| username | VARCHAR(50) | NOT NULL |
| password | VARCHAR(250) | NOT NULL |
| email | VARCHAR(250) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_users`: PRIMARY KEY (user_id)
- `uq_users_username`: UNIQUE (username)
- `uq_users_email`: UNIQUE (email)
- `fk_users_role_id`: FOREIGN KEY (role_id) REFERENCES roles(role_id)

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
| description | TEXT | |
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

## 7. medicaments

| Columna | Tipo | Constraints |
|---------|------|-------------|
| medicament_id | SERIAL | PK |
| active_ingredient_id | INTEGER | NOT NULL, FK → active_ingredients |
| description | VARCHAR(150) | NOT NULL |
| concentration | VARCHAR(50) | NOT NULL |
| form | VARCHAR(50) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_medicaments`: PRIMARY KEY (medicament_id)
- `fk_medicaments_active_ingredient_id`: FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredients(active_ingredient_id)
- `uq_medicaments_product`: UNIQUE (description, concentration, form)

---

## 8. attentions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| attention_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| service_id | INTEGER | NOT NULL, FK → services |
| illness_duration | VARCHAR(100) | |
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

---

## 9. attention_diagnoses

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

---

## 10. signs_symptoms

| Columna | Tipo | Constraints |
|---------|------|-------------|
| sign_symptom_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| observations | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_signs_symptoms`: PRIMARY KEY (sign_symptom_id)
- `fk_signs_symptoms_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `fk_signs_symptoms_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

---

## 11. vital_signs

| Columna | Tipo | Constraints |
|---------|------|-------------|
| vital_sign_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| temperature | DECIMAL(4,2) | NOT NULL |
| spo2 | INTEGER | NOT NULL |
| heart_rate | INTEGER | NOT NULL |
| respiratory_rate | INTEGER | NOT NULL |
| systolic_bp | INTEGER | NOT NULL |
| diastolic_bp | INTEGER | NOT NULL |
| hgt | DECIMAL(5,2) | |
| hemoglobin | DECIMAL(4,2) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_vital_signs`: PRIMARY KEY (vital_sign_id)
- `fk_vital_signs_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_vital_signs_attention`: UNIQUE (attention_id)
- `ck_vital_signs_spo2`: CHECK (spo2 >= 0 AND spo2 <= 100)
- `ck_vital_signs_temperature`: CHECK (temperature >= 30 AND temperature <= 45)
- `ck_vital_signs_heart_rate`: CHECK (heart_rate > 0)
- `ck_vital_signs_respiratory_rate`: CHECK (respiratory_rate > 0)
- `ck_vital_signs_systolic_bp`: CHECK (systolic_bp > 0)
- `ck_vital_signs_diastolic_bp`: CHECK (diastolic_bp > 0)
- `ck_vital_signs_hgt`: CHECK (hgt > 0)
- `ck_vital_signs_hemoglobin`: CHECK (hemoglobin > 0)

---

## 12. somatometries

| Columna | Tipo | Constraints |
|---------|------|-------------|
| somatometry_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| weight | DECIMAL(5,2) | |
| height | DECIMAL(5,2) | |
| abdominal_perimeter | DECIMAL(5,2) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_somatometries`: PRIMARY KEY (somatometry_id)
- `fk_somatometries_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `uq_somatometries_patient`: UNIQUE (patient_id)
- `ck_somatometries_weight`: CHECK (weight > 0)
- `ck_somatometries_height`: CHECK (height > 0)
- `ck_somatometries_abdominal_perimeter`: CHECK (abdominal_perimeter > 0)

---

## 13. bio_functions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| bio_function_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| type | BIO_FUNCTION_TYPE | NOT NULL |
| status | BIO_FUNCTION_STATUS | NOT NULL |
| observations | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_bio_functions`: PRIMARY KEY (bio_function_id)
- `fk_bio_functions_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_bio_functions_attention_type`: UNIQUE (attention_id, type)

---

## 14. physical_exams

| Columna | Tipo | Constraints |
|---------|------|-------------|
| physical_exam_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_physical_exams`: PRIMARY KEY (physical_exam_id)
- `fk_physical_exams_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `uq_physical_exams_attention`: UNIQUE (attention_id)

---

## 15. physical_exam_items

| Columna | Tipo | Constraints |
|---------|------|-------------|
| physical_exam_item_id | SERIAL | PK |
| physical_exam_id | INTEGER | NOT NULL, FK → physical_exams |
| system | PHYSICAL_EXAM_SYSTEM | NOT NULL |
| status | PHYSICAL_EXAM_STATUS | NOT NULL |
| observations | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_physical_exam_items`: PRIMARY KEY (physical_exam_item_id)
- `fk_physical_exam_items_physical_exam_id`: FOREIGN KEY (physical_exam_id) REFERENCES physical_exams(physical_exam_id)
- `uq_physical_exam_items_system`: UNIQUE (physical_exam_id, system)

---

## 16. exams

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_exams`: PRIMARY KEY (exam_id)
- `fk_exams_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)

---

## 17. exam_types

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_type_id | SERIAL | PK |
| description | VARCHAR(100) | NOT NULL |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE |

**Constraints:**
- `pk_exam_types`: PRIMARY KEY (exam_type_id)

---

## 18. exam_items

| Columna | Tipo | Constraints |
|---------|------|-------------|
| exam_item_id | SERIAL | PK |
| exam_id | INTEGER | NOT NULL, FK → exams |
| exam_type_id | INTEGER | NOT NULL, FK → exam_types |
| indications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_exam_items`: PRIMARY KEY (exam_item_id)
- `fk_exam_items_exam_id`: FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
- `fk_exam_items_exam_type_id`: FOREIGN KEY (exam_type_id) REFERENCES exam_types(exam_type_id)

---

## 19. prescriptions

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_prescriptions`: PRIMARY KEY (prescription_id)
- `fk_prescriptions_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)

---

## 20. prescription_items

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_item_id | SERIAL | PK |
| prescription_id | INTEGER | NOT NULL, FK → prescriptions |
| medicament_id | INTEGER | NOT NULL, FK → medicaments |
| quantity | INTEGER | NOT NULL |
| indications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_prescription_items`: PRIMARY KEY (prescription_item_id)
- `fk_prescription_items_prescription_id`: FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id)
- `fk_prescription_items_medicament_id`: FOREIGN KEY (medicament_id) REFERENCES medicaments(medicament_id)
- `ck_prescription_items_quantity`: CHECK (quantity > 0)

---

## 21. prescription_diagnoses

| Columna | Tipo | Constraints |
|---------|------|-------------|
| prescription_item_id | INTEGER | PK, FK → prescription_items |
| attention_diagnosis_id | INTEGER | PK, FK → attention_diagnoses |

**Constraints:**
- `pk_prescription_diagnoses`: PRIMARY KEY (prescription_item_id, attention_diagnosis_id)
- `fk_prescription_diagnoses_prescription_item_id`: FOREIGN KEY (prescription_item_id) REFERENCES prescription_items(prescription_item_id)
- `fk_prescription_diagnoses_attention_diagnosis_id`: FOREIGN KEY (attention_diagnosis_id) REFERENCES attention_diagnoses(attention_diagnosis_id)

---

## 22. referrals

| Columna | Tipo | Constraints |
|---------|------|-------------|
| referral_id | SERIAL | PK |
| attention_id | INTEGER | NOT NULL, FK → attentions |
| service_id | INTEGER | NOT NULL, FK → services |
| diagnosis_id | INTEGER | FK → diagnoses |
| reason | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_referrals`: PRIMARY KEY (referral_id)
- `fk_referrals_attention_id`: FOREIGN KEY (attention_id) REFERENCES attentions(attention_id)
- `fk_referrals_service_id`: FOREIGN KEY (service_id) REFERENCES services(service_id)
- `fk_referrals_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)
- `ck_referrals_diagnosis_reason_exclusive`: CHECK ((diagnosis_id IS NOT NULL AND reason IS NULL) OR (diagnosis_id IS NULL AND reason IS NOT NULL))

---

## 23. pathological_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| pathological_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| type | HISTORY_TYPE | NOT NULL |
| specifications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_pathological_histories`: PRIMARY KEY (pathological_history_id)
- `fk_pathological_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_pathological_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

---

## 24. family_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| family_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| type | FAMILY_TYPE | NOT NULL |
| status | FAMILY_STATUS | NOT NULL |
| specifications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_family_histories`: PRIMARY KEY (family_history_id)
- `fk_family_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)

---

## 25. gynecological_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| gynecological_history_id | SERIAL | PK |
| patient_id | INTEGER | FK → patients |
| menarche | INTEGER | |
| menstrual_cycle | MENSTRUAL_CYCLE_TYPE | |
| last_menstrual_period | DATE | |
| contraceptive_method | CONTRACEPTIVE_METHOD | |
| gestations | INTEGER | |
| parity | INTEGER | |
| orientation | ORIENTATION_TYPE | |
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

## 26. allergy_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| allergy_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| type | VARCHAR(20) | NOT NULL |
| specifications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_allergy_histories`: PRIMARY KEY (allergy_history_id)
- `fk_allergy_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_allergy_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

---

## 27. ram_histories

| Columna | Tipo | Constraints |
|---------|------|-------------|
| ram_history_id | SERIAL | PK |
| patient_id | INTEGER | NOT NULL, FK → patients |
| active_ingredient_id | INTEGER | NOT NULL, FK → active_ingredients |
| diagnosis_id | INTEGER | NOT NULL, FK → diagnoses |
| specifications | VARCHAR(200) |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

**Constraints:**
- `pk_ram_histories`: PRIMARY KEY (ram_history_id)
- `fk_ram_histories_patient_id`: FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
- `fk_ram_histories_active_ingredient_id`: FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredients(active_ingredient_id)
- `fk_ram_histories_diagnosis_id`: FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id)

---

## 28. audits

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

---

# Resumen de enums

| Tabla | Columna | Enum |
|-------|---------|------|
| patients | document_type | DOCUMENT_TYPE |
| patients | sex | SEX_TYPE |
| attentions | onset_type | ONSET_TYPE |
| attentions | course | COURSE_TYPE |
| attention_diagnoses | type | DIAGNOSIS_TYPE |
| bio_functions | type | BIO_FUNCTION_TYPE |
| bio_functions | status | BIO_FUNCTION_STATUS |
| physical_exam_items | system | PHYSICAL_EXAM_SYSTEM |
| physical_exam_items | status | PHYSICAL_EXAM_STATUS |
| family_histories | type | FAMILY_TYPE |
| family_histories | status | FAMILY_STATUS |
| pathological_histories | type | HISTORY_TYPE |
| gynecological_histories | menstrual_cycle | MENSTRUAL_CYCLE_TYPE |
| gynecological_histories | contraceptive_method | CONTRACEPTIVE_METHOD |
| gynecological_histories | orientation | ORIENTATION_TYPE |
| audits | action | ACTION_TYPE |

---

# Resumen de constraints

## PRIMARY KEY

| Tabla | PK |
|-------|----|
| patients | pk_patients |
| roles | pk_roles |
| users | pk_users |
| services | pk_services |
| diagnoses | pk_diagnoses |
| active_ingredients | pk_active_ingredients |
| medicaments | pk_medicaments |
| attentions | pk_attentions |
| attention_diagnoses | pk_attention_diagnoses |
| signs_symptoms | pk_signs_symptoms |
| vital_signs | pk_vital_signs |
| somatometries | pk_somatometries |
| bio_functions | pk_bio_functions |
| physical_exams | pk_physical_exams |
| physical_exam_items | pk_physical_exam_items |
| exams | pk_exams |
| exam_types | pk_exam_types |
| exam_items | pk_exam_items |
| prescriptions | pk_prescriptions |
| prescription_items | pk_prescription_items |
| prescription_diagnoses | pk_prescription_diagnoses |
| referrals | pk_referrals |
| pathological_histories | pk_pathological_histories |
| family_histories | pk_family_histories |
| gynecological_histories | pk_gynecological_histories |
| allergy_histories | pk_allergy_histories |
| ram_histories | pk_ram_histories |
| audits | pk_audits |

## FOREIGN KEY

| Tabla | FK |
|-------|----|
| users | fk_users_role_id |
| medicaments | fk_medicaments_active_ingredient_id |
| attentions | fk_attentions_patient_id, fk_attentions_service_id |
| attention_diagnoses | fk_attention_diagnoses_attention_id, fk_attention_diagnoses_diagnosis_id |
| signs_symptoms | fk_signs_symptoms_attention_id, fk_signs_symptoms_diagnosis_id |
| vital_signs | fk_vital_signs_attention_id |
| somatometries | fk_somatometries_patient_id |
| bio_functions | fk_bio_functions_attention_id |
| physical_exams | fk_physical_exams_attention_id |
| physical_exam_items | fk_physical_exam_items_physical_exam_id |
| exams | fk_exams_attention_id |
| exam_items | fk_exam_items_exam_id, fk_exam_items_exam_type_id |
| prescriptions | fk_prescriptions_attention_id |
| prescription_items | fk_prescription_items_prescription_id, fk_prescription_items_medicament_id |
| prescription_diagnoses | fk_prescription_diagnoses_prescription_item_id, fk_prescription_diagnoses_attention_diagnosis_id |
| referrals | fk_referrals_attention_id, fk_referrals_service_id, fk_referrals_diagnosis_id |
| pathological_histories | fk_pathological_histories_patient_id, fk_pathological_histories_diagnosis_id |
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
| medicaments | uq_medicaments_product |
| attention_diagnoses | uq_attention_diagnoses_unique |
| vital_signs | uq_vital_signs_attention |
| somatometries | uq_somatometries_patient |
| bio_functions | uq_bio_functions_attention_type |
| physical_exams | uq_physical_exams_attention |
| physical_exam_items | uq_physical_exam_items_system |
| gynecological_histories | uq_gynecological_histories_patient |

## CHECK

| Tabla | CK |
|-------|----|
| vital_signs | ck_vital_signs_spo2, ck_vital_signs_temperature, ck_vital_signs_heart_rate, ck_vital_signs_respiratory_rate, ck_vital_signs_systolic_bp, ck_vital_signs_diastolic_bp, ck_vital_signs_hgt, ck_vital_signs_hemoglobin |
| somatometries | ck_somatometries_weight, ck_somatometries_height, ck_somatometries_abdominal_perimeter |
| prescription_items | ck_prescription_items_quantity |
| referrals | ck_referrals_diagnosis_reason_exclusive |
| gynecological_histories | ck_gynecological_histories_menarche, ck_gynecological_histories_gestations, ck_gynecological_histories_parity, ck_gynecological_histories_andria |

---

# Resumen de tipos textuales

## TEXT

| Tabla | Columna |
|-------|---------|
| attentions | current_disease, work_plan |
| diagnoses | description |

## VARCHAR(250)

| Tabla | Columna |
|-------|---------|
| users | password, email |
| audits | user_agent |

## VARCHAR(200)

| Tabla | Columna |
|-------|---------|
| attention_diagnoses | specifications |
| signs_symptoms | observations |
| bio_functions | observations |
| physical_exam_items | observations |
| exam_items | indications |
| prescription_items | indications |
| referrals | reason |
| pathological_histories | specifications |
| family_histories | specifications |
| allergy_histories | specifications |
| ram_histories | specifications |

## VARCHAR(150)

| Tabla | Columna |
|-------|---------|
| medicaments | description |

## VARCHAR(100)

| Tabla | Columna |
|-------|---------|
| patients | name, paternal_surname, maternal_surname |
| users | name, paternal_surname, maternal_surname |
| services | name |
| active_ingredients | name |
| attentions | illness_duration |
| exam_types | description |

## VARCHAR(50)

| Tabla | Columna |
|-------|---------|
| roles | name |
| users | username |
| medicaments | concentration, form |
| audits | table_name |

## VARCHAR(20)

| Tabla | Columna |
|-------|---------|
| users | cmp_code |
| allergy_histories | type |

## VARCHAR(15)

| Tabla | Columna |
|-------|---------|
| patients | document_number, phone |

## VARCHAR(10)

| Tabla | Columna |
|-------|---------|
| diagnoses | cie_10 |
