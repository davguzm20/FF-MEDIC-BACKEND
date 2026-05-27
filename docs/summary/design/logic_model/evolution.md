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

- `DEC-01`: Se eliminó la entidad `Documents` y se reemplazó por los campos `document_type` y `document_number` directamente en `Patients` y `Users`, ya que tener una entidad separada solo para tipos de documento resultaba innecesario.

- `DEC-02`: En la entidad `Patients` se unificaron `first_name` y `middle_name` en un solo campo `name`, porque separar nombres compuestos con expresiones regulares genera ambigüedades: por ejemplo, en "Luis Junior Alejandro" no hay un criterio claro de dónde hacer el corte. (OBS-04)

- `DEC-03`: En la entidad `Users` se agregaron los campos `name`, `paternal_surname`, `maternal_surname` y `cmp_code` para incluir los datos personales y profesionales del médico que se necesitan en los documentos PDF. (OBS-12)

- `DEC-04`: La entidad genérica `Histories` se reemplazó por cuatro entidades especializadas (`PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories` y `AllergyHistories`), todas vinculadas directamente a `Patients`, ya que los antecedentes pertenecen al paciente y no exclusivamente a una atención. (OBS-06, OBS-07)

- `DEC-05`: La entidad `BiologicalFunctions` se renombró a `BioFunctions` para simplificar el nombre.

- `DEC-06`: Las entidades `LabOrders` y `LabOrderItems` se renombraron a `Exams` y `ExamItems` respectivamente, porque los exámenes auxiliares no son solo de laboratorio sino que también incluyen imágenes. (OBS-10)

- `DEC-07`: Se eliminó la entidad `LabOrderDiagnoses` porque los exámenes auxiliares no requieren un vínculo obligatorio con diagnósticos CIE-10 y cada examen se solicita de forma independiente. (OBS-10, OBS-11)

- `DEC-08`: Se agregó la entidad `ActiveIngredients` para clasificar los medicamentos por su principio activo, de modo que la entidad `Medicaments` quedó vinculada a esta nueva entidad.

- `DEC-09`: Se eliminó el campo `description` de la entidad `Medicaments` bajo la idea de que el principio activo era suficiente para identificar el medicamento.

- `DEC-10`: Se agregó la entidad `PhysicalExams` con un campo por sistema corporal para estructurar el examen físico en lugar de dejarlo como texto libre.

- `DEC-11`: En la entidad `Referrals` se agregó `diagnosis_id` como FK obligatoria, ya que toda interconsulta necesita un diagnóstico CIE-10 que la justifique clínicamente. (OBS-16)

- `DEC-12`: En la entidad `Patients` se agregaron `create_at` y `update_at` para tener trazabilidad de cuándo se registró y cuándo se modificó por última vez.

- `DEC-13`: Se agregó la entidad `Audits` como registro centralizado de auditoría para todas las entidades transaccionales del sistema.

- `DEC-14`: Se confirmó el campo `phone` en la entidad `Patients` como dato obligatorio para contacto con el paciente. (OBS-05)

---

## Modelo lógico v0.2 - 18/05/2026

### Entidades

<details>
<summary>Ver más</summary>

- **Roles:** role_id, name, is_active
- **Users:** user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active
- **Patients:** patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, create_at, update_at, is_active
- **Services:** service_id, name, is_active
- **Diagnoses:** diagnosis_id, cie_10, description, is_active
- **ActiveIngredients:** active_ingredient_id, name, is_active
- **Medicaments:** medicament_id, active_ingredient_id, concentration, form, is_active
- **Attentions:** attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, create_at, uptade_at
- **AttentionDiagnoses:** attention_diagnosis_id, attention_id, diagnosis_id, type, observations, create_at
- **SignsSymptoms:** sign_symptom_id, attention_id, description, observations
- **VitalSigns:** vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp
- **BioFunctions:** bio_function_id, attention_id, type, status, observations
- **PhysicalExams:** physical_exam_id, attention_id
- **PhysicalExamItems:** physical_exam_item_id, physical_exam_id, system, status, observations
- **Exams:** exam_id, attention_id, create_at
- **ExamTypes:** exam_type_id, description, cie_10, is_active
- **ExamItems:** exam_item_id, exam_id, exam_type_id, indications
- **Prescriptions:** prescription_id, attention_id, create_at
- **PrescriptionItems:** prescription_item_id, prescription_id, medicament_id, quantity, indications
- **PrescriptionDiagnoses:** prescription_item_id, attention_diagnosis_id (sin PK ni FKs definidas)
- **Referrals:** referral_id, attention_id, diagnosis_id, service_id, reason, create_at
- **PathologicalHistories:** pathological_history_id, patient_id, attention_id, diagnosis_id, type, specifications
- **FamilyHistories:** family_history_id, patient_id, attention_id, relative_type, status, specifications
- **GynecologicalHistories:** gynecological_history_id, patient_id, attention_id, menarche, menstrual_cycle, last_menstrual_period, obstetric_history, contraceptive_method, gestations, parity, orientation, andria, isa, lsa
- **AllergyHistories:** allergy_history_id, patient_id, attention_id, type, allergen, reaction, cie_code, specifications
- **Audits:** audit_id, table_name, record_id, action, user_id, changes, create_at

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

- `DEC-15`: Se corrigió la FK de la entidad `Audits` en el campo `user_id` que apuntaba erróneamente a `Users.maternal_surname` para que referencie correctamente a `Users.user_id`.

- `DEC-16`: Se corrigió la FK de la entidad `PrescriptionItems` en el campo `prescription_id` que referenciaba incorrectamente `Prescriptions.create_at` en lugar de `Prescriptions.prescription_id`.

- `DEC-17`: Se corrigió la FK de la entidad `AttentionDiagnoses` en el campo `diagnosis_id` que referenciaba incorrectamente `Diagnoses.is_active` en lugar de `Diagnoses.diagnosis_id`.

- `DEC-18`: En la entidad `Attentions` el campo `uptade_at` tenía un error tipográfico y se corrigió a `update_at`.

- `DEC-19`: Se restauraron correctamente la PK compuesta y las FKs de la entidad `PrescriptionDiagnoses` que estaban incompletas en el DDL.

- `DEC-20`: En la entidad `Audits` el campo `changes` (JSON único) se separó en `old_data` y `new_data` para poder consultar el estado anterior y posterior de cada cambio de forma independiente.

- `DEC-21`: En la entidad `Audits` se agregaron los campos `ip` y `user_agent` para tener trazabilidad completa de quién y desde dónde se realizó cada acción.

- `DEC-22`: En la entidad `Audits` se renombró `create_at` a `created_at` para mantener consistencia con la nomenclatura del resto del modelo.

- `DEC-23`: En la entidad `Medicaments` se re-agregó el campo `description` para almacenar el nombre comercial del medicamento, ya que solo el principio activo no era suficiente para identificarlo en la práctica.

- `DEC-24`: En la entidad `AllergyHistories` se renombró `cie_code` a `cie_10` para que sea consistente con el nombre que usa la entidad `Diagnoses`. (OBS-32)

- `DEC-25`: En la entidad `FamilyHistories` se renombró `relative_type` a `type` para simplificar la nomenclatura.

- `DEC-26`: Se agregaron las FKs explícitas hacia `Patients` y `Attentions` en las entidades de historias (`PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories` y `AllergyHistories`) que estaban ausentes en el DDL.

- `DEC-27`: Se agregaron las FKs hacia `Attentions` en las entidades `PhysicalExams` y `VitalSigns` que también estaban ausentes en el DDL.

- `DEC-28`: Se agregó la FK de la entidad `Attentions` hacia `Patients` que estaba ausente en el DDL.

- `DEC-29`: Se eliminó el campo `diagnosis_id` de la entidad `FamilyHistories` ya que no fue solicitado. (OBS-30)

- `DEC-30`: Se eliminó la entidad `ClinicDetails` y se decidió manejar los datos de la clínica mediante variables de entorno en lugar de almacenarlos en la base de datos. (OBS-13)

- `DEC-31`: En la entidad `BioFunctions` el estado `OBSERVADO` se reemplazó por `NO_EVALUADO` para reflejar correctamente que la función biológica no fue evaluada. (OBS-21)

- `DEC-32`: Los campos `observations` de `PathologicalHistories` y `FamilyHistories` se renombraron a `specifications` y se agregó el mismo campo en `AllergyHistories` para almacenar las especificaciones de cada antecedente o alergia. (OBS-26, OBS-28, OBS-31)

- `DEC-33`: Se agregó el campo `status` en la entidad `FamilyHistories` para registrar si el familiar está vivo o fallecido. (OBS-29)

- `DEC-34`: Se eliminó el campo `clinical_exam` de la entidad `Attentions` ya que no fue solicitado. (OBS-17)

- `DEC-35`: Se agregaron los campos `gestations`, `parity`, `orientation`, `andria`, `isa` y `lsa` a la entidad `GynecologicalHistories` para completar los antecedentes ginecológicos según la especificación de datos. (OBS-27)

- `DEC-36`: Se agregó la entidad `ExamTypes` como catálogo de exámenes disponibles en la clínica y se reemplazó `description` en `ExamItems` por `exam_type_id` como FK hacia este catálogo. (OBS-22)

- `DEC-37`: Se creó la entidad `PhysicalExamItems` para almacenar cada sistema corporal evaluado en el examen físico con su propio estado y observaciones, simplificando `PhysicalExams` a solo `physical_exam_id` y `attention_id`. (OBS-23, OBS-24)

- `DEC-38`: Se agregaron los campos `illness_duration`, `onset_type` y `course` a la entidad `Attentions` para el motivo de consulta, y se creó la entidad `SignsSymptoms` para registrar signos y síntomas por atención. (OBS-18, OBS-19)

- `DEC-39`: Se eliminó el campo `obstetric_history` de la entidad `GynecologicalHistories` porque la especificación de datos separa gestaciones y partos como campos individuales y no incluye una fórmula obstétrica combinada.

- `DEC-40`: Se renombró `observations` a `specifications` en la entidad `AttentionDiagnoses` para ser consistente con la nomenclatura de data_spec.md y con las entidades de historias clínicas.

- `DEC-41`: Se fusionaron los antecedentes patológicos y quirúrgicos en una sola entidad `PathologicalHistories` usando el campo `type` como discriminador (PATHOLOGICAL, SURGICAL), ya que ambos comparten la misma estructura de datos según la especificación.

- `DEC-42`: Se fusionaron las reacciones adversas a medicamentos (RAM) y las alergias en una sola entidad `AllergyHistories` usando el campo `type` como discriminador (RAM, ALLERGY), ya que ambos comparten la misma estructura de datos según la especificación.

- `DEC-43`: En la entidad `AttentionDiagnoses` se renombró `attention_diagnoses_id` a `attention_diagnosis_id` para mantener consistencia con la convención de nombres de claves primarias en singular utilizada en todo el modelo (`vital_sign_id`, `exam_id`, `prescription_id`, etc.).

- `DEC-44`: Se estandarizaron todos los campos de timestamp a `created_at` y `updated_at` (participio pasado) en todo el modelo, siguiendo la convención dominante en frameworks ORM (Rails, Laravel, Prisma, Django, Sequelize, TypeORM). Afecta a: `Patients`, `Attentions`, `AttentionDiagnoses`, `Exams`, `Prescriptions`, `Referrals` y `Audits`.

- `DEC-45`: En la entidad `GynecologicalHistories` la FK `patient_id` se volvió nullable, permitiendo que pacientes del sexo masculino no requieran este registro. (OBS-35)

- `DEC-46`: La entidad `AllergyHistories` se separó en dos entidades especializadas: `AllergyHistories` (alergias codificadas con CIE-10 mediante FK a `Diagnoses`) y `RamHistories` (reacciones adversas a medicamentos mediante FK a `ActiveIngredients`). (OBS-36, OBS-37, OBS-38)

- `DEC-47`: En la entidad `SignsSymptoms` se reemplazó el campo `description` por `diagnosis_id` (FK a `Diagnoses`) para evitar duplicidad de datos y mantener consistencia con el catálogo CIE-10. (OBS-39)

- `DEC-48`: Se estableció relación 1:1 entre `VitalSigns` y `Attentions` mediante FK única y excluyente, ya que los signos vitales se registran una única vez por atención. (OBS-40)

- `DEC-49`: De la entidad `ExamTypes` se eliminó el campo `cie_10` ya que se decidió manejar únicamente el catálogo de exámenes de la clínica sin codificación CIE-10. (OBS-41)

- `DEC-50`: En la entidad `Referrals` el campo `diagnosis_id` se volvió nullable con restricción XOR: o bien `diagnosis_id` o bien `reason` debe tener valor, pero no ambos simultáneamente, permitiendo interconsultas sin diagnóstico vinculado. (OBS-42)

- `DEC-51`: Se agregó el campo `updated_at` a las entidades `VitalSigns`, `SignsSymptoms`, `BioFunctions`, `PhysicalExams`, `AllergyHistories`, `RamHistories`, `PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories` y `AttentionDiagnoses` para soportar actualizaciones.

- `DEC-52`: Se agregó el campo `created_at` a las entidades `VitalSigns`, `SignsSymptoms`, `BioFunctions`, `PhysicalExams`, `PathologicalHistories`, `FamilyHistories` y `GynecologicalHistories` para mantener consistencia con el estándar de auditoría temporal y permitir el rastreo completo del ciclo de vida de los registros. (OBS-43)

- `DEC-53`: Se eliminó el campo `severity` de las entidades `AllergyHistories` y `RamHistories` por no haber sido solicitado. (OBS-44)

- `DEC-54`: Se eliminó el campo `attention_id` de las entidades `PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories`, `AllergyHistories` y `RamHistories`, ya que los antecedentes pertenecen al paciente y no requieren vínculo directo con una atención. (OBS-45)

- `DEC-55`: En la entidad `RamHistories` se reemplazó el campo `reaction_description` por `diagnosis_id` (FK a `Diagnoses`) para codificar la reacción adversa con CIE-10, eliminando redundancia. (OBS-46)

- `DEC-56`: Se separó la entidad `VitalSigns` en dos entidades: `VitalSigns` (signos vitales: `temperature`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp`, `diastolic_bp`) y `Somatometries` (somatometría: `weight`, `height`, `abdominal_perimeter`, `hgt`, `hemoglobin`). VitalSigns mantuvo relación 1:1 con `Attentions` y Somatometries se vinculó a `Patients`. (OBS-47)

- `DEC-57`: Se estableció relación 1:1 entre `Somatometries` y `Patients` mediante FK única en `patient_id`. Un paciente puede tener 0 o 1 somatometría, y es editable. (OBS-48)

- `DEC-58`: Se estableció relación 1:1 entre `GynecologicalHistories` y `Patients` mediante FK única en `patient_id`, además de ser nullable (DEC-45).

- `DEC-59`: Se estableció relación 1:1 entre `BioFunctions` y `Attentions` mediante FK única en `attention_id`. (OBS-49)

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

---

### Decisiones para la siguiente versión (v0.4)

- `DEC-45`: En la entidad `GynecologicalHistories` la FK `patient_id` se volvió nullable, permitiendo que pacientes del sexo masculino no requieran este registro. (OBS-35)

- `DEC-46`: La entidad `AllergyHistories` se separó en dos entidades especializadas: `AllergyHistories` (alergias codificadas con CIE-10 mediante FK a `Diagnoses`) y `RamHistories` (reacciones adversas a medicamentos mediante FK a `ActiveIngredients`). (OBS-36, OBS-37, OBS-38)

- `DEC-47`: En la entidad `SignsSymptoms` se reemplazó el campo `description` por `diagnosis_id` (FK a `Diagnoses`) para evitar duplicidad de datos y mantener consistencia con el catálogo CIE-10. (OBS-39)

- `DEC-48`: Se estableció relación 1:1 entre `VitalSigns` y `Attentions` mediante FK única y excluyente, ya que los signos vitales se registran una única vez por atención. (OBS-40)

- `DEC-49`: De la entidad `ExamTypes` se eliminó el campo `cie_10` ya que se decidió manejar únicamente el catálogo de exámenes de la clínica sin codificación CIE-10. (OBS-41)

- `DEC-50`: En la entidad `Referrals` el campo `diagnosis_id` se volvió nullable con restricción XOR: o bien `diagnosis_id` o bien `reason` debe tener valor, pero no ambos simultáneamente, permitiendo interconsultas sin diagnóstico vinculado. (OBS-42)

- `DEC-51`: Se agregó el campo `updated_at` a las entidades `VitalSigns`, `SignsSymptoms`, `BioFunctions`, `PhysicalExams`, `AllergyHistories`, `RamHistories`, `PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories` y `AttentionDiagnoses` para soportar actualizaciones.

- `DEC-52`: Se agregó el campo `created_at` a las entidades `VitalSigns`, `SignsSymptoms`, `BioFunctions`, `PhysicalExams`, `PathologicalHistories`, `FamilyHistories` y `GynecologicalHistories` para mantener consistencia con el estándar de auditoría temporal y permitir el rastreo completo del ciclo de vida de los registros. (OBS-43)

- `DEC-53`: Se eliminó el campo `severity` de las entidades `AllergyHistories` y `RamHistories` por no haber sido solicitado. (OBS-44)

- `DEC-54`: Se eliminó el campo `attention_id` de las entidades `PathologicalHistories`, `FamilyHistories`, `GynecologicalHistories`, `AllergyHistories` y `RamHistories`, ya que los antecedentes pertenecen al paciente y no requieren vínculo directo con una atención. (OBS-45)

- `DEC-55`: En la entidad `RamHistories` se reemplazó el campo `reaction_description` por `diagnosis_id` (FK a `Diagnoses`) para codificar la reacción adversa con CIE-10, eliminando redundancia. (OBS-46)

- `DEC-56`: Se separó la entidad `VitalSigns` en dos entidades: `VitalSigns` (signos vitales: `temperature`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp`, `diastolic_bp`) y `Somatometries` (somatometría: `weight`, `height`, `abdominal_perimeter`, `hgt`, `hemoglobin`). VitalSigns mantuvo relación 1:1 con `Attentions` y Somatometries se vinculó a `Patients`. (OBS-47)

- `DEC-57`: Se estableció relación 1:1 entre `Somatometries` y `Patients` mediante FK única en `patient_id`. Un paciente puede tener 0 o 1 somatometría, y es editable. (OBS-48)

- `DEC-58`: Se estableció relación 1:1 entre `GynecologicalHistories` y `Patients` mediante FK única en `patient_id`, además de ser nullable (DEC-45).

- `DEC-59`: Se estableció relación 1:1 entre `BioFunctions` y `Attentions` mediante FK única en `attention_id`. (OBS-49)

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