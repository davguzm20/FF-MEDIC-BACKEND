# Evolución del modelo lógico F&F-MEDIC

## Modelo lógico v0.1 - 13/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Documents:** document_id, type, number, is_active
- **Patients:** patient_id, document_id, first_name, middle_name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active
- **Users:** user_id, role_id, document_id, username, password, email, is_active
- **Services:** service_id, name, is_active
- **ClinicalItems:** clinical_item_id, type, description, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **Medicaments:** medicament_id, description, concentration, form, is_active
- **Attentions:** attention_id, patient_id, service_id, current_disease, work_plan, create_at, update_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, observations, create_at
- **VitalSigns:** vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp
- **BiologicalFunctions:** biological_function_id, attention_id, type, status, observations
- **Histories:** history_id, attention_id, clinical_item_id, observations
- **Prescriptions:** prescription_id, attention_id, create_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **LabOrders:** lab_order_id, attention_id, create_at
- **LabOrderItems:** lab_order_item_id, lab_order_id, description, observations
- **LabOrderDiagnoses:** lab_order_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, reason, create_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Documents 1:N → Patients, Users
- ClinicalItems 1:N → Histories
- Patients 1:N → Attentions
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses
- Medicaments 1:N → PrescriptionItems
- Attentions 1:N → AttentionDiagnoses, BiologicalFunctions, Histories, Prescriptions, LabOrders, Referrals
- Attentions 1:N → VitalSigns
- AttentionDiagnoses 1:N → PrescriptionDiagnoses, LabOrderDiagnoses
- Prescriptions 1:N → PrescriptionItems
- PrescriptionItems 1:N → PrescriptionDiagnoses
- LabOrders 1:N → LabOrderItems
- LabOrderItems 1:N → LabOrderDiagnoses

</details>

### Decisiones para la siguiente versión (v0.2)

- `DEC-01`: Se eliminó la entidad `Documents` y se reemplazó por los campos `document_type` y `document_number` directamente en `Patients` y `Users`, ya que tener una entidad separada solo para tipos de documento resultaba innecesario. (OBS-01)

- `DEC-02`: Se reemplazó la entidad genérica `Histories` por cuatro entidades especializadas (`PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories` y `AllergyHistories`), todas sin campo `type` ya que ClinicalItem ya registraba el tipo. (OBS-02)

- `DEC-03`: Se vincularon las nuevas entidades de historias directamente a `Patients` en lugar de solo a `Attentions`, ya que los antecedentes pertenecen al paciente y no exclusivamente a una atención. (OBS-03)

- `DEC-04`: Se eliminó la entidad `LabOrderDiagnoses`, porque los exámenes auxiliares no requieren un vínculo obligatorio con diagnósticos CIE-10 y cada examen se solicita de forma independiente. (OBS-04)

- `DEC-05`: Se renombraron las entidades `LabOrders` y `LabOrderItems` a `Exams` y `ExamItems` respectivamente, porque los exámenes auxiliares no son solo de laboratorio sino que también incluyen imágenes. (OBS-05)

- `DEC-06`: Se agregó la entidad `Audits` como registro centralizado de auditoría para todas las entidades transaccionales del sistema. (OBS-06)

- `DEC-07`: Se agregó la entidad `PhysicalExams` con un campo por sistema corporal para estructurar el examen físico en lugar de dejarlo como texto libre. (OBS-07)

- `DEC-08`: Se agregó la entidad `ActiveIngredients` para clasificar los medicamentos por su principio activo, vinculando `Medicaments` a esta nueva entidad. (OBS-08)

- `DEC-09`: Se eliminó el campo `description` de la entidad `Medicaments` porque el principio activo era suficiente para identificar el medicamento. (OBS-09)

- `DEC-10`: Se agregaron los campos `name`, `paternal_surname`, `maternal_surname` y `cmp_code` en `Users` para incluir los datos personales y profesionales del médico que se necesitan en los documentos PDF. (OBS-12)

- `DEC-11`: Se eliminó la entidad `ClinicDetails` y se decidió manejar los datos de la clínica mediante variables de entorno en lugar de almacenarlos en la base de datos. (OBS-13)

- `DEC-12`: Se unificaron `first_name` y `middle_name` en un solo campo `name` en `Patients`, porque separar nombres compuestos con expresiones regulares genera ambigüedades al no existir un criterio claro de separación. (OBS-15)

- `DEC-13`: Se agregaron los campos `created_at` y `updated_at` en `Patients` para tener trazabilidad de registro y modificación del paciente. (OBS-16)

- `DEC-14`: Se confirmó el campo `phone` en `Patients` como dato obligatorio para contacto con el paciente. (OBS-17)

- `DEC-15`:\ Se\ agregó\ `diagnosis_id`\ como\ FK\ obligatoria\ en\ `Referrals`, ya que toda interconsulta necesita un diagnóstico CIE-10 que la justifique clínicamente. (OBS-56)

---

## Modelo lógico v0.2 - 18/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Medicaments:** medicament_id, active_ingredient_id, concentration, form, is_active
- **Attentions:** attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, uptade_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, observations, created_at
- **SignsSymptoms:** sign_symptom_id, attention_id, description, observations
- **VitalSigns:** vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp
- **BioFunctions:** bio_function_id, attention_id, type, status, observations
- **PhysicalExams:** physical_exam_id, attention_id
- **PhysicalExamItems:** physical_exam_item_id, physical_exam_id, system, status, observations
- **Exams:** exam_id, attention_id, created_at
- **ExamTypes:** exam_type_id, description, cie_10, is_active
- **ExamItems:** exam_item_id, exam_id, exam_type_id, indications
- **Prescriptions:** prescription_id, attention_id, created_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id (sin PK ni FKs definidas)
- **Referrals:** referral_id, attention_id, diagnosis_id, service_id, reason, created_at
- **PathologicalHistories:** pathological_history_id, patient_id, attention_id, diagnosis_id, type, specifications
- **FamilyHistories:** family_history_id, patient_id, attention_id, relative_type, status, specifications
- **GynecologicalHistories:** gynecological_history_id, patient_id, attention_id, menarche, menstrual_cycle, last_menstrual_period, obstetric_history, contraceptive_method, gestations, parity, orientation, andria, isa, lsa
- **AllergyHistories:** allergy_history_id, patient_id, attention_id, type, allergen, reaction, cie_code, specifications
- **Audits:** audit_id, table_name, record_id, action, user_id, changes, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Patients 1:N → Attentions, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, PathologicalHistories, Referrals
- ActiveIngredients 1:N → Medicaments
- Medicaments 1:N → PrescriptionItems
- Attentions 1:N → AttentionDiagnoses, SignsSymptoms, BioFunctions, Prescriptions, Exams, Referrals, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories
- Attentions 1:N → VitalSigns
- Attentions 1:1 → PhysicalExams
- PhysicalExams 1:N → PhysicalExamItems
- AttentionDiagnoses 1:N → PrescriptionDiagnoses
- Exams 1:N → ExamItems
- Prescriptions 1:N → PrescriptionItems
- PrescriptionItems 1:N → PrescriptionDiagnoses
- Users 1:N → Audits

</details>

### Decisiones para la siguiente versión (v0.3)

- `DEC-16`: Se estandarizaron todos los campos de timestamp a `created_at` y `updated_at` (participio pasado) en todo el modelo, siguiendo la convención dominante en frameworks ORM. Afecta a: `Patients`, `Attentions`, `AttentionDiagnoses`, `Exams`, `Prescriptions`, `Referrals` y `Audits`. (OBS-19)

- `DEC-17`: Se fusionaron los antecedentes patológicos y quirúrgicos en una sola entidad `PathologicalHistories` usando el campo `type` como discriminador (PATHOLOGICAL, SURGICAL), ya que ambos comparten la misma estructura de datos según la especificación. (OBS-20)

- `DEC-18`: Se fusionaron las reacciones adversas a medicamentos (RAM) y las alergias en una sola entidad `AllergyHistories` usando el campo `type` como discriminador (RAM, ALLERGY), ya que ambos comparten la misma estructura de datos según la especificación. (OBS-21)

- `DEC-19`: Se renombró el campo `observations` de `PathologicalHistories` a `specifications` para almacenar las especificaciones de cada antecedente. (OBS-22)

- `DEC-20`: Se agregaron las FKs explícitas hacia `Patients` y `Attentions` en `PathologicalHistories` que estaban ausentes en el DDL. (OBS-23)

- `DEC-21`: Se renombró el campo `observations` de `FamilyHistories` a `specifications` para mantener consistencia con PathologicalHistories. (OBS-24)

- `DEC-22`: Se agregó el campo `status` en `FamilyHistories` para registrar si el familiar está vivo o fallecido. (OBS-25)

- `DEC-23`: Se eliminó el campo `diagnosis_id` de `FamilyHistories` ya que no fue solicitado. (OBS-26)

- `DEC-24`: Se renombró `relative_type` a `type` en `FamilyHistories` para simplificar la nomenclatura. (OBS-27)

- `DEC-25`: Se agregaron las FKs explícitas hacia `Patients` y `Attentions` en `FamilyHistories` que estaban ausentes en el DDL. (OBS-28)

- `DEC-26`: Se agregaron los campos `gestations`, `parity`, `orientation`, `andria`, `isa` y `lsa` en `GynecologicalHistories` para completar los antecedentes ginecológicos según la especificación de datos. (OBS-29)

- `DEC-27`: Se eliminará el campo `obstetric_history` de `GynecologicalHistories` porque la especificación de datos separa gestaciones y partos como campos individuales y no incluye una fórmula obstétrica combinada. (OBS-30)

- `DEC-28`: Se agregaron las FKs explícitas hacia `Patients` y `Attentions` en `GynecologicalHistories` que estaban ausentes en el DDL. (OBS-31)

- `DEC-29`: Se renombró `cie_code` a `cie_10` en `AllergyHistories` para que sea consistente con el nombre que usa la entidad `Diagnoses`. (OBS-32)

- `DEC-30`: Se agregó el campo `specifications` en `AllergyHistories` siguiendo el estándar de nomenclatura del resto del modelo. (OBS-33)

- `DEC-31`: Se agregaron las FKs explícitas hacia `Patients` y `Attentions` en `AllergyHistories` que estaban ausentes en el DDL. (OBS-34)

- `DEC-32`: Se agregó la entidad `ExamTypes` como catálogo de exámenes disponibles en la clínica y se reemplazó `description` en `ExamItems` por `exam_type_id` como FK hacia este catálogo. (OBS-35)

- `DEC-33`: Se creó la entidad `PhysicalExamItems` para almacenar cada sistema corporal evaluado en el examen físico con su propio estado y observaciones, simplificando `PhysicalExams` a solo `physical_exam_id` y `attention_id`. (OBS-36)

- `DEC-34`: Se agregaron las FKs hacia `Attentions` en `PhysicalExams` que estaban ausentes en el DDL. (OBS-37)

- `DEC-35`: Se agregaron las FKs hacia `Attentions` en `VitalSigns` que estaban ausentes en el DDL. (OBS-38)

- `DEC-36`: Se creó la entidad `SignsSymptoms` para registrar signos y síntomas por atención. (OBS-39)

- `DEC-37`: Se reemplazó el estado `OBSERVADO` por `NO_EVALUADO` en `BioFunctions` para reflejar correctamente que la función biológica no fue evaluada. (OBS-40)

- `DEC-38`: Se re-agregó el campo `description` en `Medicaments` para almacenar el nombre comercial del medicamento, ya que solo el principio activo no era suficiente para identificarlo en la práctica. (OBS-42)

- `DEC-39`: Se renombró `observations` a `specifications` en `AttentionDiagnoses` para ser consistente con la nomenclatura de data-spec.md y con las entidades de historias clínicas. (OBS-43)

- `DEC-40`: Se renombró `attention_diagnoses_id` a `attention_diagnosis_id` en `AttentionDiagnoses` para mantener consistencia con la convención de nombres de claves primarias en singular. (OBS-44)

- `DEC-41`: Se corrigió la FK de `AttentionDiagnoses` en el campo `diagnosis_id` que referenciaba incorrectamente `Diagnoses.is_active` en lugar de `Diagnoses.diagnosis_id`. (OBS-45)

- `DEC-42`: Se corrigió la FK de `PrescriptionItems` en el campo `prescription_id` que referenciaba incorrectamente `Prescriptions.created_at` en lugar de `Prescriptions.prescription_id`. (OBS-46)

- `DEC-43`: Se restauraron correctamente la PK compuesta y las FKs de `PrescriptionDiagnoses` que estaban incompletas en el DDL. (OBS-47)

- `DEC-44`: Se separó el campo `changes` (JSON único) en `Audits` en `old_data` y `new_data` para poder consultar el estado anterior y posterior de cada cambio de forma independiente. (OBS-48)

- `DEC-45`: Se agregaron los campos `ip` y `user_agent` en `Audits` para tener trazabilidad completa de quién y desde dónde se realizó cada acción. (OBS-49)

- `DEC-46`: Se renombró `create_at` a `created_at` en `Audits` para mantener consistencia con la nomenclatura del resto del modelo. (OBS-50)

- `DEC-47`: Se corrigió la FK de `Audits` en el campo `user_id` que apuntaba erróneamente a `Users.maternal_surname` para que referencie correctamente a `Users.user_id`. (OBS-51)

- `DEC-48`: Se agregó la FK de `Attentions` hacia `Patients` que estaba ausente en el DDL. (OBS-52)

- `DEC-49`: Se corrigió el error tipográfico en `Attentions` donde el campo `uptade_at` se renombró a `update_at`. (OBS-53)

- `DEC-50`: Se eliminó el campo `clinical_exam` de `Attentions` ya que no fue solicitado. (OBS-54)

- `DEC-51`: Se agregaron los campos `illness_duration`, `onset_type` y `course` en `Attentions` para el motivo de consulta. (OBS-55)

---

## Modelo lógico v0.3 - 19/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Medicaments:** medicament_id, active_ingredient_id, description, concentration, form, is_active
- **Attentions:** attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at
- **SignsSymptoms:** sign_symptom_id, attention_id, description, observations
- **VitalSigns:** vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp
- **BioFunctions:** bio_function_id, attention_id, type, status, observations
- **PhysicalExams:** physical_exam_id, attention_id
- **PhysicalExamItems:** physical_exam_item_id, physical_exam_id, system, status, observations
- **Exams:** exam_id, attention_id, created_at
- **ExamTypes:** exam_type_id, description, cie_10, is_active
- **ExamItems:** exam_item_id, exam_id, exam_type_id, indications
- **Prescriptions:** prescription_id, attention_id, created_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, diagnosis_id, reason, created_at
- **PathologicalHistories:** pathological_history_id, patient_id, attention_id, diagnosis_id, type, specifications
- **FamilyHistories:** family_history_id, patient_id, attention_id, type, status, specifications
- **GynecologicalHistories:** gynecological_history_id, patient_id, attention_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, gestations, parity, orientation, andria, isa, lsa
- **AllergyHistories:** allergy_history_id, patient_id, attention_id, type, allergen, reaction, cie_10, specifications
- **Audits:** audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Patients 1:N → Attentions, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, PathologicalHistories, Referrals
- ActiveIngredients 1:N → Medicaments
- Medicaments N:1 → ActiveIngredients, 1:N → PrescriptionItems
- Attentions 1:N → AttentionDiagnoses, SignsSymptoms, VitalSigns, BioFunctions, Prescriptions, Exams, Referrals, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories
- Attentions 1:1 → PhysicalExams
- PhysicalExams 1:N → PhysicalExamItems
- AttentionDiagnoses 1:N → PrescriptionDiagnoses
- Exams 1:N → ExamItems
- ExamTypes 1:N → ExamItems
- Prescriptions 1:N → PrescriptionItems
- PrescriptionItems 1:N → PrescriptionDiagnoses
- Users 1:N → Audits

</details>

### Decisiones para la siguiente versión (v0.4)

- `DEC-52`: Se agregó el campo `created_at` a las entidades `VitalSigns`, `SignsSymptoms`, `BioFunctions`, `PhysicalExams`, `PathologicalHistories`, `FamilyHistories` y `GynecologicalHistories` para mantener consistencia con el estándar de auditoría temporal. (OBS-58)

- `DEC-53`: Se eliminó el campo `cie_10` de `ExamTypes` ya que se decidió manejar únicamente el catálogo de exámenes de la clínica sin codificación CIE-10. (OBS-59)

- `DEC-54`: Se reemplazó el campo `description` por `diagnosis_id` (FK a `Diagnoses`) en `SignsSymptoms` para evitar duplicidad de datos y mantener consistencia con el catálogo CIE-10. (OBS-60)

- `DEC-55`: Se estableció la relación 1:1 entre `VitalSigns` y `Attentions` mediante FK única y excluyente. (OBS-61)

- `DEC-56`: Se separó la entidad `VitalSigns` en dos: `VitalSigns` (con los campos `temperature`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp` y `diastolic_bp`) y `Somatometries` (con los campos `weight`, `height`, `abdominal_perimeter`, `hgt` y `hemoglobin`). (OBS-62)

- `DEC-57`: Se estableció la relación 1:1 entre `Somatometries` y `Patients` mediante FK única en `patient_id`. (OBS-63)

- `DEC-58`: Se estableció la relación 1:1 entre `BioFunctions` y `Attentions` mediante FK única en `attention_id`. (OBS-64)

- `DEC-59`: Se separó la entidad `AllergyHistories` en dos entidades especializadas: `AllergyHistories` (alergias) y `RamHistories` (reacciones adversas a medicamentos). (OBS-65)

- `DEC-60`: Se vinculó `AllergyHistories` a `Diagnoses` mediante FK para codificar alergias con CIE-10. (OBS-66)

- `DEC-61`: Se vinculó `RamHistories` a `ActiveIngredients` mediante FK para codificar reacciones adversas por principio activo. (OBS-67)

- `DEC-62`: Se reemplazó el campo `reaction_description` por `diagnosis_id` (FK a `Diagnoses`) en `RamHistories` para codificar la reacción adversa con CIE-10. (OBS-68)

- `DEC-63`: Se eliminó el campo `severity` de `AllergyHistories` y `RamHistories` por no haber sido solicitado. (OBS-69)

- `DEC-64`: Se eliminó el campo `attention_id` de `PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories`, `AllergyHistories` y `RamHistories`, ya que los antecedentes pertenecen al paciente y no requieren vínculo directo con una atención. (OBS-70)

- `DEC-65`: Se volvió opcional la FK `patient_id` en `GynecologicalHistories`, permitiendo que pacientes del sexo masculino no requieran este registro. (OBS-71)

- `DEC-66`: Se volvió opcional el campo `diagnosis_id` en `Referrals` con restricción XOR, permitiendo interconsultas sin diagnóstico vinculado. (OBS-73)

---

## Modelo lógico v0.4 - 21/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Medicaments:** medicament_id, active_ingredient_id, description, concentration, form, is_active
- **Attentions:** attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at, updated_at
- **SignsSymptoms:** sign_symptom_id, attention_id, diagnosis_id, observations, created_at, updated_at
- **VitalSigns:** vital_sign_id, attention_id, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, created_at, updated_at
- **Somatometries:** somatometry_id, patient_id, weight, height, abdominal_perimeter, hgt, hemoglobin, created_at, updated_at
- **BioFunctions:** bio_function_id, attention_id, type, status, observations, created_at, updated_at
- **PhysicalExams:** physical_exam_id, attention_id, created_at, updated_at
- **PhysicalExamItems:** physical_exam_item_id, physical_exam_id, system, status, observations
- **Exams:** exam_id, attention_id, created_at
- **ExamTypes:** exam_type_id, description, is_active
- **ExamItems:** exam_item_id, exam_id, exam_type_id, indications
- **Prescriptions:** prescription_id, attention_id, created_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, diagnosis_id, reason, created_at
- **PathologicalHistories:** pathological_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at
- **FamilyHistories:** family_history_id, patient_id, type, status, specifications, created_at, updated_at
- **GynecologicalHistories:** gynecological_history_id, patient_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **AllergyHistories:** allergy_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at
- **RamHistories:** ram_history_id, patient_id, active_ingredient_id, diagnosis_id, specifications, created_at, updated_at
- **Audits:** audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Patients 1:N → Attentions, PathologicalHistories, FamilyHistories, AllergyHistories, RamHistories
- Patients 1:1 → GynecologicalHistories, Somatometries
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, PathologicalHistories, Referrals, AllergyHistories, SignsSymptoms, RamHistories
- ActiveIngredients 1:N → Medicaments, RamHistories
- Medicaments N:1 → ActiveIngredients, 1:N → PrescriptionItems
- Attentions 1:N → AttentionDiagnoses, SignsSymptoms, Prescriptions, Exams, Referrals
- Attentions 1:1 → VitalSigns, BioFunctions, PhysicalExams
- PhysicalExams 1:N → PhysicalExamItems
- AttentionDiagnoses 1:N → PrescriptionDiagnoses
- Exams 1:N → ExamItems
- ExamTypes 1:N → ExamItems
- Prescriptions 1:N → PrescriptionItems
- PrescriptionItems 1:N → PrescriptionDiagnoses
- Users 1:N → Audits

</details>

### Decisiones para la siguiente versión (v0.5)

- `DEC-67`: Se tradujeron todos los valores de los listados a español, ya que el sistema se usa en Perú y los valores estaban en inglés. (OBS-75)

- `DEC-68`: Se agregó la restricción obligatorio al campo `is_active` en todas las entidades del sistema para garantizar que siempre tenga un valor para el borrado lógico. (OBS-76)

- `DEC-69`: Se eliminó la entidad `PhysicalExamItems` y la entidad `PhysicalExams` se simplificó a `attention_id`, `system`, `status` y `observations`, con relación N:1 hacia `Attentions` (un sistema por fila), similar al diseño de `BioFunctions`. (OBS-77)

- `DEC-70`: Se agregaron los campos `name` y `manufacturer_id` en `Medicaments`, y se crearon las entidades `Manufacturers` y `DosageForms`, reemplazando el campo `form` por `dosage_form_id` como FK. (OBS-78)

- `DEC-71`: Se eliminó el campo `description` de la entidad `Medicaments`, ya que el principio activo y el nombre comercial son suficientes para identificar el medicamento. (OBS-79)

- `DEC-72`: Se cambió la cardinalidad entre `Medicaments` y `ActiveIngredients` de N:1 a N:M mediante una tabla intermedia `MedicamentIngredients`, ya que un medicamento puede tener varios principios activos. (OBS-80)

- `DEC-73`: Se eliminó el listado `MENSTRUAL_CYCLE_TYPE` y se reemplazó por un campo de texto libre, ya que el ciclo menstrual tiene demasiadas variantes para un listado fijo. (OBS-81)

- `DEC-74`: Se eliminó el listado `ORIENTATION_TYPE` y se reemplazó por un campo de texto libre, ya que la orientación sexual puede no encajar en un listado cerrado. (OBS-82)

- `DEC-75`: Se corrigió la cardinalidad de `RamHistories` con `Patients` de 1:1 a N:1, ya que un paciente puede tener varias reacciones adversas a medicamentos. (OBS-83)

- `DEC-76`: Se corrigió la cardinalidad de `BioFunctions` con `Attentions` de 1:1 a N:1, ya que en una atención se pueden registrar varias funciones biológicas, con restricción de único por tipo. (OBS-84)

- `DEC-77`: Se movieron los campos `hgt`, `hemoglobin`, `weight` y `abdominal_perimeter` de `Somatometries` a `VitalSigns` porque estos parámetros se miden en cada atención y no son datos fijos del paciente. (OBS-85)

- `DEC-78`: Se renombró la entidad `VitalSigns` a `HealthMetrics`, ya que el nuevo nombre refleja mejor todos los campos que contiene. (OBS-86)

- `DEC-79`: Se cambiaron `temperature`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp` y `diastolic_bp` a opcional en `HealthMetrics` ya que los signos vitales pueden no tomarse en todas las atenciones. (OBS-87)

- `DEC-80`: Se eliminó la entidad `Somatometries` y se movió el campo `height` a `HealthMetrics` como obligatorio, ya que la talla es el único campo de datos del registro. (OBS-88)

- `DEC-81`: Se eliminó el campo `type` de la entidad `AllergyHistories`, ya que las reacciones adversas a medicamentos (RAM) tienen su propia entidad (`RamHistories`) y el discriminador ya no es necesario. (OBS-89)

- `DEC-82`: Se agregó el valor `OTRO` al listado `FAMILY_TYPE` para cubrir tipos de familiar que no encajan en las categorías existentes. (OBS-90)

- `DEC-83`: En la entidad `Users` se agregaron `created_at` y `updated_at` para mantener consistencia con el estándar de auditoría temporal del resto del modelo. (OBS-91)

- `DEC-84`: Se cambiaron `name`, `paternal_surname` y `maternal_surname` a obligatorio en `Users` ya que son necesarios para los documentos PDF. (OBS-92)

- `DEC-85`: Se cambió `maternal_surname` a obligatorio en `Patients` ya que es un dato requerido del paciente. (OBS-93)

- `DEC-86`: Se cambió `phone` a opcional en `Patients` ya que no todos los pacientes tienen teléfono. (OBS-94)

- `DEC-87`: Se cambió `birth_date` a obligatorio en `Patients` ya que es necesario para calcular la edad del paciente. (OBS-95)

- `DEC-88`: Se cambió `description` a obligatorio en `Diagnoses` ya que no puede haber un diagnóstico sin nombre. (OBS-96)

- `DEC-89`: Se cambió `illness_duration` a obligatorio en `Attentions` ya que es parte obligatoria del motivo de consulta. (OBS-97)

- `DEC-90`: Se agregó el campo `other` en `PhysicalExams`, `FamilyHistories` y `GynecologicalHistories` para capturar el valor personalizado cuando el usuario selecciona "Otro" en los listados `PHYSICAL_EXAM_SYSTEM`, `FAMILY_TYPE` y `CONTRACEPTIVE_METHOD`. (OBS-98)

- `DEC-91`: Se renombró la entidad `PathologicalHistories` a `ClinicalHistories` para mayor claridad, ya que almacena tanto antecedentes patológicos como quirúrgicos discriminados por el campo `type`. (OBS-99)

---

## Modelo lógico v0.5 - 28/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, created_at, updated_at, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Manufacturers:** manufacturer_id, name, is_active
- **DosageForms:** dosage_form_id, name, is_active
- **Medicaments:** medicament_id, name, manufacturer_id, concentration, dosage_form_id, is_active
- **MedicamentIngredients:** medicament_id, active_ingredient_id
- **Attentions:** attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at, updated_at
- **SignsSymptoms:** sign_symptom_id, attention_id, diagnosis_id, observations, created_at, updated_at
- **HealthMetrics:** health_metric_id, attention_id, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, abdominal_perimeter, height, created_at, updated_at
- **BioFunctions:** bio_function_id, attention_id, type, status, observations, created_at, updated_at
- **PhysicalExams:** physical_exam_id, attention_id, system, other, status, observations, created_at, updated_at
- **Exams:** exam_id, attention_id, created_at, updated_at
- **ExamTypes:** exam_type_id, description, is_active
- **ExamItems:** exam_item_id, exam_id, exam_type_id, indications, created_at
- **Prescriptions:** prescription_id, attention_id, created_at, updated_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications, created_at, updated_at
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, diagnosis_id, reason, created_at, updated_at
- **ClinicalHistories:** clinical_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at
- **FamilyHistories:** family_history_id, patient_id, type, other, status, specifications, created_at, updated_at
- **GynecologicalHistories:** gynecological_history_id, patient_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, other, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **AllergyHistories:** allergy_history_id, patient_id, diagnosis_id, specifications, created_at, updated_at
- **RamHistories:** ram_history_id, patient_id, active_ingredient_id, diagnosis_id, specifications, created_at, updated_at
- **Audits:** audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Patients 1:N → Attentions, ClinicalHistories, FamilyHistories, AllergyHistories, RamHistories
- Patients 1:1 → GynecologicalHistories
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, ClinicalHistories, Referrals, AllergyHistories, SignsSymptoms, RamHistories
- ActiveIngredients 1:N → MedicamentIngredients, RamHistories
- Manufacturers 1:N → Medicaments
- DosageForms 1:N → Medicaments
- Medicaments N:1 → Manufacturers, DosageForms; 1:N → PrescriptionItems, MedicamentIngredients
- MedicamentIngredients N:1 → Medicaments, ActiveIngredients
- Attentions N:1 → Patients, Services; 1:N → AttentionDiagnoses, SignsSymptoms, PhysicalExams, BioFunctions, Prescriptions, Exams, Referrals
- Attentions 1:1 → HealthMetrics
- AttentionDiagnoses N:1 → Attentions, Diagnoses; 1:N → PrescriptionDiagnoses
- SignsSymptoms N:1 → Attentions, Diagnoses
- BioFunctions N:1 → Attentions
- PhysicalExams N:1 → Attentions
- Exams N:1 → Attentions; 1:N → ExamItems
- ExamTypes 1:N → ExamItems
- ExamItems N:1 → Exams, ExamTypes
- Prescriptions N:1 → Attentions; 1:N → PrescriptionItems
- PrescriptionItems N:1 → Prescriptions, Medicaments; 1:N → PrescriptionDiagnoses
- PrescriptionDiagnoses N:1 → PrescriptionItems, AttentionDiagnoses
- Referrals N:1 → Attentions, Services, Diagnoses
- ClinicalHistories N:1 → Patients, Diagnoses
- FamilyHistories N:1 → Patients
- GynecologicalHistories 1:1 → Patients
- AllergyHistories N:1 → Patients, Diagnoses
- RamHistories N:1 → Patients, ActiveIngredients, Diagnoses
- Audits N:1 → Users

</details>

### Decisiones para la siguiente versión (v0.6)

- `DEC-92`: Se agregó el campo `user_id` como FK a `Users` en `Attentions` para saber qué médico realizó cada atención. (OBS-100)

- `DEC-93`: Se renombró la entidad `ExamTypes` a `Procedures` para reflejar que almacena procedimientos médicos en general como análisis de laboratorio, diagnóstico por imágenes y emergencia. (OBS-101)

- `DEC-94`: Se agregaron los campos `type` y `category` en `Procedures` para clasificar el procedimiento por tipo de documento y categoría médica. (OBS-102)

---

## Modelo lógico v0.6 - 06/07/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, created_at, updated_at, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Manufacturers:** manufacturer_id, name, is_active
- **DosageForms:** dosage_form_id, name, is_active
- **Medicaments:** medicament_id, name, manufacturer_id, concentration, dosage_form_id, is_active
- **MedicamentIngredients:** medicament_id, active_ingredient_id
- **Attentions:** attention_id, patient_id, service_id, user_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at, updated_at
- **SignsSymptoms:** sign_symptom_id, attention_id, diagnosis_id, observations, created_at, updated_at
- **HealthMetrics:** health_metric_id, attention_id, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, abdominal_perimeter, height, created_at, updated_at
- **BioFunctions:** bio_function_id, attention_id, type, status, observations, created_at, updated_at
- **PhysicalExams:** physical_exam_id, attention_id, system, other, status, observations, created_at, updated_at
- **Exams:** exam_id, attention_id, created_at, updated_at
- **Procedures:** procedure_id, type, category, description, is_active
- **ExamItems:** exam_item_id, exam_id, procedure_id, indications, created_at
- **Prescriptions:** prescription_id, attention_id, created_at, updated_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications, created_at, updated_at
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, diagnosis_id, reason, created_at, updated_at
- **ClinicalHistories:** clinical_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at
- **FamilyHistories:** family_history_id, patient_id, type, other, status, specifications, created_at, updated_at
- **GynecologicalHistories:** gynecological_history_id, patient_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, other, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at
- **AllergyHistories:** allergy_history_id, patient_id, diagnosis_id, specifications, created_at, updated_at
- **RamHistories:** ram_history_id, patient_id, active_ingredient_id, diagnosis_id, specifications, created_at, updated_at
- **Audits:** audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Users 1:N → Attentions, Audits
- Patients 1:N → Attentions, ClinicalHistories, FamilyHistories, AllergyHistories, RamHistories
- Patients 1:1 → GynecologicalHistories
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, ClinicalHistories, Referrals, AllergyHistories, SignsSymptoms, RamHistories
- ActiveIngredients 1:N → MedicamentIngredients, RamHistories
- Manufacturers 1:N → Medicaments
- DosageForms 1:N → Medicaments
- Medicaments N:1 → Manufacturers, DosageForms; 1:N → PrescriptionItems, MedicamentIngredients
- MedicamentIngredients N:1 → Medicaments, ActiveIngredients
- Attentions N:1 → Patients, Services, Users; 1:N → AttentionDiagnoses, SignsSymptoms, PhysicalExams, BioFunctions, Prescriptions, Exams, Referrals
- Attentions 1:1 → HealthMetrics
- AttentionDiagnoses N:1 → Attentions, Diagnoses; 1:N → PrescriptionDiagnoses
- SignsSymptoms N:1 → Attentions, Diagnoses
- BioFunctions N:1 → Attentions
- PhysicalExams N:1 → Attentions
- Exams N:1 → Attentions; 1:N → ExamItems
- Procedures 1:N → ExamItems
- ExamItems N:1 → Exams, Procedures
- Prescriptions N:1 → Attentions; 1:N → PrescriptionItems
- PrescriptionItems N:1 → Prescriptions, Medicaments; 1:N → PrescriptionDiagnoses
- PrescriptionDiagnoses N:1 → PrescriptionItems, AttentionDiagnoses
- Referrals N:1 → Attentions, Services, Diagnoses
- ClinicalHistories N:1 → Patients, Diagnoses
- FamilyHistories N:1 → Patients
- GynecologicalHistories 1:1 → Patients
- AllergyHistories N:1 → Patients, Diagnoses
- RamHistories N:1 → Patients, ActiveIngredients, Diagnoses
- Audits N:1 → Users

</details>
### Decisiones para la siguiente versión (v0.7)

- `DEC-95`: Se eliminó la entidad `SignsSymptoms`, ya que su información se almacenará en el relato de la enfermedad actual de `Attentions`. (OBS-103)

- `DEC-96`: Se renombró el campo `andria` a `sexual_partners` en `GynecologicalHistories` como entero positivo de máximo dos cifras, dado que el nombre no reflejaba que almacena el número de parejas sexuales. (OBS-104)

- `DEC-97`: Se renombró el campo `other` a `contraceptive_method_other` en `GynecologicalHistories`, puesto que el nombre no indicaba a qué listado pertenecía. (OBS-105)

- `DEC-98`: Se creó el listado `ORIENTATION_TYPE` con los valores Heterosexual, Homosexual, Bisexual, Pansexual, Asexual, Otro y Prefiere no responder, y el campo `orientation_other` en `GynecologicalHistories`, ya que la orientación sexual no encaja en texto libre y requiere un listado cerrado con valor comodín. (OBS-106)

- `DEC-99`: Se reemplazó el campo `parity` por `term_births`, `preterm_births`, `abortions` y `living_children` en `GynecologicalHistories` como enteros positivos de máximo dos cifras, ya que la fórmula obstétrica requiere cada valor por separado. (OBS-107)

- `DEC-100`: Se cambiaron los campos `isa` y `lsa` de fecha a texto libre en `GynecologicalHistories`, porque la paciente puede no recordar la fecha exacta de inicio o última actividad sexual. (OBS-108)

- `DEC-101`: Se eliminó el campo `diagnosis_id` de `Referrals` y se volvió obligatorio `reason`, dado que el doctor confirmó que el motivo es suficiente para justificar la interconsulta. (OBS-109)

- `DEC-102`: Se renombró el listado `FAMILY_TYPE` a `RELATIONSHIP_TYPE` y los campos `type` y `other` a `relationship` y `relationship_other` en `FamilyHistories`, ya que el listado será compartido con la nueva entidad Responsible. (OBS-110)

- `DEC-103`: Se creó la entidad `Responsible` como 1:1 con `Attentions` con los campos `name`, `paternal_surname`, `maternal_surname`, `relationship`, `relationship_other` y `phone`, dado que no existía una entidad para registrar al acompañante del paciente menor de edad. (OBS-111)

---

## Modelo lógico v0.7 - 25/07/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, created_at, updated_at, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Manufacturers:** manufacturer_id, name, is_active
- **DosageForms:** dosage_form_id, name, is_active
- **Medicaments:** medicament_id, name, manufacturer_id, concentration, dosage_form_id, is_active
- **MedicamentIngredients:** medicament_id, active_ingredient_id
- **Attentions:** attention_id, patient_id, service_id, user_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at, updated_at
- **HealthMetrics:** health_metric_id, attention_id, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, weight, abdominal_perimeter, height, created_at, updated_at
- **BioFunctions:** bio_function_id, attention_id, type, status, observations, created_at, updated_at
- **PhysicalExams:** physical_exam_id, attention_id, system, other, status, observations, created_at, updated_at
- **Exams:** exam_id, attention_id, created_at, updated_at
- **Procedures:** procedure_id, type, category, description, is_active
- **ExamItems:** exam_item_id, exam_id, procedure_id, indications, created_at
- **Prescriptions:** prescription_id, attention_id, created_at, updated_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications, created_at, updated_at
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id
- **Referrals:** referral_id, attention_id, service_id, reason, created_at, updated_at
- **ClinicalHistories:** clinical_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at
- **FamilyHistories:** family_history_id, patient_id, relationship, relationship_other, status, specifications, created_at, updated_at
- **GynecologicalHistories:** gynecological_history_id, patient_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, contraceptive_method_other, gestations, term_births, preterm_births, abortions, living_children, orientation, orientation_other, sexual_partners, isa, lsa, created_at, updated_at
- **AllergyHistories:** allergy_history_id, patient_id, diagnosis_id, specifications, created_at, updated_at
- **RamHistories:** ram_history_id, patient_id, active_ingredient_id, diagnosis_id, specifications, created_at, updated_at
- **Responsible:** responsible_id, attention_id, name, paternal_surname, maternal_surname, relationship, relationship_other, phone, created_at, updated_at
- **Audits:** audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at

</details>

### Relaciones

<details>
<summary>Ver más</summary>

- Roles 1:N → Users
- Users 1:N → Attentions, Audits
- Patients 1:N → Attentions, ClinicalHistories, FamilyHistories, AllergyHistories, RamHistories
- Patients 1:1 → GynecologicalHistories
- Services 1:N → Attentions, Referrals
- Diagnoses 1:N → AttentionDiagnoses, ClinicalHistories, Referrals, AllergyHistories, RamHistories
- ActiveIngredients 1:N → MedicamentIngredients, RamHistories
- Manufacturers 1:N → Medicaments
- DosageForms 1:N → Medicaments
- Medicaments N:1 → Manufacturers, DosageForms; 1:N → PrescriptionItems, MedicamentIngredients
- MedicamentIngredients N:1 → Medicaments, ActiveIngredients
- Attentions N:1 → Patients, Services, Users; 1:N → AttentionDiagnoses, PhysicalExams, BioFunctions, Prescriptions, Exams, Referrals
- Attentions 1:1 → HealthMetrics, Responsible
- AttentionDiagnoses N:1 → Attentions, Diagnoses; 1:N → PrescriptionDiagnoses
- BioFunctions N:1 → Attentions
- PhysicalExams N:1 → Attentions
- Exams N:1 → Attentions; 1:N → ExamItems
- Procedures 1:N → ExamItems
- ExamItems N:1 → Exams, Procedures
- Prescriptions N:1 → Attentions; 1:N → PrescriptionItems
- PrescriptionItems N:1 → Prescriptions, Medicaments; 1:N → PrescriptionDiagnoses
- PrescriptionDiagnoses N:1 → PrescriptionItems, AttentionDiagnoses
- Referrals N:1 → Attentions, Services
- ClinicalHistories N:1 → Patients, Diagnoses
- FamilyHistories N:1 → Patients
- GynecologicalHistories 1:1 → Patients
- AllergyHistories N:1 → Patients, Diagnoses
- RamHistories N:1 → Patients, ActiveIngredients, Diagnoses
- Responsible 1:1 → Attentions
- Audits N:1 → Users

</details>
