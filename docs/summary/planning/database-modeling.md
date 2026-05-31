# Modelado de Base de Datos F&F-MEDIC

## Introduccion

### Proposito

El siguiente documento tiene como objetivo registrar la evolucion de la base de datos con la que se desarrollara el sistema F&F-MEDIC, detallando los componentes de cada version del modelo logico.

### Alcance

Cada modelo de la base de datos abarca las entidades identificadas, sus campos propios y relaciones con las demas entidades, especificando su cardinalidad. Ademas, despues de revisar cada modelo se anotan las observaciones y las decisiones para la siguiente version con el fin de corregir puntos debiles y asegurar el uso de buenas practicas referentes al modelado de base de datos.

### Definiciones

| Termino | Definicion |
|---|---|
| Entidad | Representacion de un elemento del mundo real sobre el cual se desea almacenar informacion |
| Relacion | Asociacion de union entre entidades para recuperar datos |
| Cardinalidad | Cantidad de veces que los datos de una entidad se relacionan con otra en una relacion |
| Campo | Representacion de una caracteristica de un elemento del mundo real |
| Escalabilidad | Capacidad de un sistema para gestionar un crecimiento en el volumen de datos, usuarios o solicitudes |

---

## Modelo Logico v0.1

### Entidades

| Entidad | Campos |
|---|---|
| Roles | role_id, name, is_active |
| Documents | document_id, type, number, is_active |
| Patients | patient_id, document_id, first_name, middle_name, paternal_surname, maternal_surname, sex, phone, birth_date, is_active |
| Users | user_id, role_id, document_id, username, password, email, is_active |
| Services | service_id, name, is_active |
| ClinicalItems | clinical_item_id, type, description, is_active |
| Diagnoses | diagnosis_id, cie_10, description, is_active |
| Medicaments | medicament_id, description, concentration, form, is_active |
| Attentions | attention_id, patient_id, service_id, current_disease, work_plan, create_at, update_at |
| AttentionDiagnoses | attention_diagnosis_id, attention_id, diagnosis_id, type, observations, create_at |
| VitalSigns | vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp |
| BiologicalFunctions | biological_function_id, attention_id, type, status, observations |
| Histories | history_id, attention_id, clinical_item_id, observations |
| Prescriptions | prescription_id, attention_id, create_at |
| PrescriptionItems | prescription_item_id, prescription_id, medicament_id, quantity, indications |
| PrescriptionDiagnoses | prescription_item_id, attention_diagnosis_id |
| LabOrders | lab_order_id, attention_id, create_at |
| LabOrderItems | lab_order_item_id, lab_order_id, description, observations |
| LabOrderDiagnoses | lab_order_item_id, attention_diagnosis_id |
| Referrals | referral_id, attention_id, service_id, reason, create_at |

### Relaciones

| Entidad A | Relacion | Entidad B |
|---|---|---|
| Roles | 1:N | Users |
| Documents | 1:N | Patients, Users |
| ClinicalItems | 1:N | Histories |
| Patients | 1:N | Attentions |
| Services | 1:N | Attentions, Referrals |
| Diagnoses | 1:N | AttentionDiagnoses |
| Medicaments | 1:N | PrescriptionItems |
| Attentions | 1:N | AttentionDiagnoses, BiologicalFunctions, Histories, Prescriptions, LabOrders, Referrals |
| Attentions | 1:N | VitalSigns |
| AttentionDiagnoses | 1:N | PrescriptionDiagnoses, LabOrderDiagnoses |
| Prescriptions | 1:N | PrescriptionItems |
| PrescriptionItems | 1:N | PrescriptionDiagnoses |
| LabOrders | 1:N | LabOrderItems |
| LabOrderItems | 1:N | LabOrderDiagnoses |

### Observaciones

| Codigo | Tabla | Campo | Observacion |
|---|---|---|---|
| OBS-01 | Users | role_id | Se necesita tener roles considerando que la app es solo para el doctor |
| OBS-02 | Roles | | Roles no definidos del todo |
| OBS-03 | Documents | is_active | Se necesita si Users ya tiene is_active |
| OBS-04 | Patients | middle_name | Que ventaja tiene sobre un unico campo name |
| OBS-05 | Patients | phone | Pendiente de confirmar con el doctor |
| OBS-06 | Histories | type | Es necesario si ClinicalItem ya registra el tipo |
| OBS-07 | Histories | | No deberia estar conectado a Patients |
| OBS-08 | Attentions | service_id | Se necesita tener servicios |
| OBS-09 | Attentions | | Su relacion con VitalSigns no deberia ser 1:1 |
| OBS-10 | LabOrderItems | observations | No deberia ir en LabOrders |
| OBS-11 | LabOrderDiagnoses | | La relacion deberia ser con LabOrders |
| OBS-12 | Users | | Agregar nombre, apellidos y codigo de colegiatura para PDFs |
| OBS-13 | Users | | Posible agregar numeros de la clinica para PDFs |
| OBS-14 | BioFunctions | | Agregar tabla para los 8 tipos de funciones biologicas |

### Decisiones

| Observacion | Respuesta | Decision | Estado |
|---|---|---|---|
| OBS-01 | Pensado en la escalabilidad futura | Se mantendra la tabla | Completado |
| OBS-02 | Roles no definidos del todo | Se mantendra la tabla | Completado |
| OBS-03 | Para eliminacion y modificacion de documentos | Se elimino Documents y se reemplazo por campos directos en Patients y Users | Completado |
| OBS-04 | Evita problemas de separacion con nombres compuestos | Se unificaron first_name y middle_name en un solo campo name | Completado |
| OBS-05 | Necesario como medio de comunicacion | Se confirmo phone como obligatorio | Completado |
| OBS-06 | Correcto | Histories se reemplazo por PathologicalHistories, FamilyHistories, GynecologicalHistories y AllergyHistories | Completado |
| OBS-07 | Correcto | Abarcado con la decision anterior | Completado |
| OBS-08 | La atencion debe tener un servicio | Se mantendra la tabla | Completado |
| OBS-09 | Correcto | Se agregaron FKs hacia Patients y Attentions en tablas de historias | Completado |
| OBS-10 | Son observaciones por cada examen | LabOrders y LabOrderItems se renombraron a Exams y ExamItems | Completado |
| OBS-11 | No, cada examen debe tener uno o varios diagnosticos | Se elimino LabOrderDiagnoses | Completado |
| OBS-12 | | Se agregaron name, paternal_surname, maternal_surname y cmp_code a Users | Completado |
| OBS-13 | | Se elimino ClinicDetails, se manejara por variables de entorno | Completado |
| OBS-14 | | Se mantendran los tipos como ENUM | Completado |

### Decisiones Adicionales

- DEC-05: BiologicalFunctions se renombro a BioFunctions
- DEC-08: Se agrego ActiveIngredients para clasificar los medicamentos
- DEC-09: Se elimino description de Medicaments
- DEC-10: Se agrego PhysicalExams
- DEC-12: Se agregaron create_at y update_at a Patients
- DEC-13: Se agrego Audits como registro centralizado de auditoria

---

## Modelo Logico v0.2

### Entidades

| Entidad | Campos |
|---|---|
| Roles | role_id, name, is_active |
| Users | user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active |
| Patients | patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, create_at, update_at, is_active |
| Services | service_id, name, is_active |
| Diagnoses | diagnosis_id, cie_10, description, is_active |
| ActiveIngredients | active_ingredient_id, name, is_active |
| Medicaments | medicament_id, active_ingredient_id, concentration, form, is_active |
| Attentions | attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, create_at, uptade_at |
| AttentionDiagnoses | attention_diagnosis_id, attention_id, diagnosis_id, type, observations, create_at |
| SignsSymptoms | sign_symptom_id, attention_id, description, observations |
| VitalSigns | vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp |
| BioFunctions | bio_function_id, attention_id, type, status, observations |
| PhysicalExams | physical_exam_id, attention_id |
| PhysicalExamItems | physical_exam_item_id, physical_exam_id, system, status, observations |
| Exams | exam_id, attention_id, create_at |
| ExamTypes | exam_type_id, description, cie_10, is_active |
| ExamItems | exam_item_id, exam_id, exam_type_id, indications |
| Prescriptions | prescription_id, attention_id, create_at |
| PrescriptionItems | prescription_item_id, prescription_id, medicament_id, quantity, indications |
| PrescriptionDiagnoses | prescription_item_id, attention_diagnosis_id |
| Referrals | referral_id, attention_id, diagnosis_id, service_id, reason, create_at |
| PathologicalHistories | pathological_history_id, patient_id, attention_id, diagnosis_id, type, specifications |
| FamilyHistories | family_history_id, patient_id, attention_id, relative_type, status, specifications |
| GynecologicalHistories | gynecological_history_id, patient_id, attention_id, menarche, menstrual_cycle, last_menstrual_period, obstetric_history, contraceptive_method, gestations, parity, orientation, andria, isa, lsa |
| AllergyHistories | allergy_history_id, patient_id, attention_id, type, allergen, reaction, cie_code, specifications |
| Audits | audit_id, table_name, record_id, action, user_id, changes, create_at |

### Relaciones

| Entidad A | Relacion | Entidad B |
|---|---|---|
| Roles | 1:N | Users |
| Patients | 1:N | Attentions, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories |
| Services | 1:N | Attentions, Referrals |
| Diagnoses | 1:N | AttentionDiagnoses, PathologicalHistories, Referrals |
| ActiveIngredients | 1:N | Medicaments |
| Medicaments | 1:N | PrescriptionItems |
| Attentions | 1:N | AttentionDiagnoses, SignsSymptoms, BioFunctions, Prescriptions, Exams, Referrals, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories |
| Attentions | 1:N | VitalSigns |
| Attentions | 1:1 | PhysicalExams |
| PhysicalExams | 1:N | PhysicalExamItems |
| AttentionDiagnoses | 1:N | PrescriptionDiagnoses |
| Exams | 1:N | ExamItems |
| Prescriptions | 1:N | PrescriptionItems |
| PrescriptionItems | 1:N | PrescriptionDiagnoses |
| Users | 1:N | Audits |

### Observaciones

| Codigo | Tabla | Campo | Observacion |
|---|---|---|---|
| OBS-15 | Medicaments | form | Se puede separar en otra tabla |
| OBS-16 | Referrals | diagnosis_id | No se solcito |
| OBS-17 | Attentions | clinical_exam | No se solcito |
| OBS-18 | Attentions | | Faltan los campos del Motivo de consulta |
| OBS-19 | Attentions | | Faltan campos para Signos y Sintomas |
| OBS-20 | BioFunctions | type | Se puede separar en otra tabla |
| OBS-21 | BioFunctions | status | El estado Observado fue reemplazado por No evaluado |
| OBS-22 | ExamItems | | Donde se almacenara la lista de examenes de la clinica |
| OBS-23 | PhysicalExams | observations | Las observaciones son para cada examen fisico |
| OBS-24 | PhysicalExams | | Como se almacena el estado para cada campo |
| OBS-25 | VitalSigns | | La cardinalidad con Attentions es incorrecta |
| OBS-26 | PathologicalHistories | observations | Se debe usar especificaciones |
| OBS-27 | GynecologicalHistories | | Faltan campos |
| OBS-28 | FamilyHistories | observations | Se debe usar especificaciones |
| OBS-29 | FamilyHistories | | Falta campo Estado del familiar |
| OBS-30 | FamilyHistories | diagnosis_id | No se solcito |
| OBS-31 | AllergyHistories | | Falta campo especificaciones |
| OBS-32 | AllergyHistories | cie_code | Que es, como se obtiene |

### Decisiones

| Observacion | Respuesta | Decision | Estado |
|---|---|---|---|
| OBS-15 | Es necesario | Se mantendra el campo | Completado |
| OBS-16 | Para una interconsulta se necesita un diagnostico | Se agrego diagnosis_id como FK obligatoria en Referrals | Completado |
| OBS-17 | Correcto | Se elimino clinical_exam de Attentions | Completado |
| OBS-18 | Revisar requisitos | Se agregaron illness_duration, onset_type y course a Attentions, y se creo SignsSymptoms | Completado |
| OBS-19 | Revisar requisitos | Abarcado con la decision anterior | Completado |
| OBS-20 | Es necesario | Se mantendra como ENUM | Completado |
| OBS-21 | Revisar requisitos | OBSERVADO se reemplazo por NO_EVALUADO en BioFunctions | Completado |
| OBS-22 | Pendiente | Se agrego ExamTypes como catalogo | Completado |
| OBS-23 | Pendiente | Se creo PhysicalExamItems | Completado |
| OBS-24 | En BioFunctions se maneja de otra forma | Abarcado con la decision anterior | Completado |
| OBS-25 | Correcto, 1:1 | Se agregaron FKs en tablas de historias | Completado |
| OBS-26 | Es lo mismo, solo cambia en frontend | observations se renombro a specifications | Completado |
| OBS-27 | Revisar requisitos | Se agregaron gestations, parity, orientation, andria, isa y lsa | Completado |
| OBS-28 | Es lo mismo, solo cambia en frontend | observations se renombro a specifications | Completado |
| OBS-29 | Correcto | Se agrego status en FamilyHistories | Completado |
| OBS-30 | Correcto | Se elimino diagnosis_id de FamilyHistories | Completado |
| OBS-31 | Se usara specifications | Se agrego specifications en AllergyHistories | Completado |
| OBS-32 | Iba con cie_10 | Se renombro cie_code a cie_10 | Completado |

### Decisiones Adicionales

- DEC-15: Se corrigio FK de Audits (user_id apuntaba a maternal_surname)
- DEC-16: Se corrigio FK de PrescriptionItems (prescription_id incorrecta)
- DEC-17: Se corrigio FK de AttentionDiagnoses (diagnosis_id incorrecta)
- DEC-18: Se corrigio uptade_at a update_at en Attentions
- DEC-19: Se restauraron PK compuesta y FKs de PrescriptionDiagnoses
- DEC-20: En Audits, changes se separo en old_data y new_data
- DEC-21: En Audits se agregaron ip y user_agent
- DEC-22: En Audits se renombro create_at a created_at
- DEC-23: En Medicaments se re-agrego description
- DEC-25: En FamilyHistories se renombro relative_type a type
- DEC-27: Se agregaron FKs hacia Attentions en PhysicalExams y VitalSigns
- DEC-28: Se agrego FK de Attentions hacia Patients
- DEC-39: Se elimino obstetric_history de GynecologicalHistories
- DEC-40: observations se renombro a specifications en AttentionDiagnoses
- DEC-41: Patologicos y quirurgicos se fusionaron en PathologicalHistories con type discriminador
- DEC-42: RAM y alergias se fusionaron en AllergyHistories con type discriminador
- DEC-43: Se renombro attention_diagnoses_id a attention_diagnosis_id
- DEC-44: Se estandarizaron todos los timestamps a created_at y updated_at

---

## Modelo Logico v0.3

### Entidades

| Entidad | Campos |
|---|---|
| Roles | role_id, name, is_active |
| Users | user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active |
| Patients | patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active |
| Services | service_id, name, is_active |
| Diagnoses | diagnosis_id, cie_10, description, is_active |
| ActiveIngredients | active_ingredient_id, name, is_active |
| Medicaments | medicament_id, active_ingredient_id, description, concentration, form, is_active |
| Attentions | attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at |
| AttentionDiagnoses | attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at |
| SignsSymptoms | sign_symptom_id, attention_id, description, observations |
| VitalSigns | vital_sign_id, attention_id, weight, height, abdominal_perimeter, hgt, hemoglobin, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp |
| BioFunctions | bio_function_id, attention_id, type, status, observations |
| PhysicalExams | physical_exam_id, attention_id |
| PhysicalExamItems | physical_exam_item_id, physical_exam_id, system, status, observations |
| Exams | exam_id, attention_id, created_at |
| ExamTypes | exam_type_id, description, cie_10, is_active |
| ExamItems | exam_item_id, exam_id, exam_type_id, indications |
| Prescriptions | prescription_id, attention_id, created_at |
| PrescriptionItems | prescription_item_id, prescription_id, medicament_id, quantity, indications |
| PrescriptionDiagnoses | prescription_item_id, attention_diagnosis_id |
| Referrals | referral_id, attention_id, service_id, diagnosis_id, reason, created_at |
| PathologicalHistories | pathological_history_id, patient_id, attention_id, diagnosis_id, type, specifications |
| FamilyHistories | family_history_id, patient_id, attention_id, type, status, specifications |
| GynecologicalHistories | gynecological_history_id, patient_id, attention_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, gestations, parity, orientation, andria, isa, lsa |
| AllergyHistories | allergy_history_id, patient_id, attention_id, type, allergen, reaction, cie_10, specifications |
| Audits | audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at |

### Relaciones

| Entidad A | Relacion | Entidad B |
|---|---|---|
| Roles | 1:N | Users |
| Patients | 1:N | Attentions, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories |
| Services | 1:N | Attentions, Referrals |
| Diagnoses | 1:N | AttentionDiagnoses, PathologicalHistories, Referrals |
| ActiveIngredients | 1:N | Medicaments |
| Medicaments | 1:N | PrescriptionItems |
| Attentions | 1:N | AttentionDiagnoses, SignsSymptoms, VitalSigns, BioFunctions, Prescriptions, Exams, Referrals, PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories |
| Attentions | 1:1 | PhysicalExams |
| PhysicalExams | 1:N | PhysicalExamItems |
| AttentionDiagnoses | 1:N | PrescriptionDiagnoses |
| Exams | 1:N | ExamItems |
| ExamTypes | 1:N | ExamItems |
| Prescriptions | 1:N | PrescriptionItems |
| PrescriptionItems | 1:N | PrescriptionDiagnoses |
| Users | 1:N | Audits |

### Observaciones

| Codigo | Tabla | Campo | Observacion |
|---|---|---|---|
| OBS-33 | Audits | user_agent | Que se almacena aqui, es necesario |
| OBS-34 | GynecologicalHistories | isa, lsa | Cual es fecha de inicio y cual de fin |
| OBS-35 | GynecologicalHistories | patient_id | Cardinalidad con Patients seria 0:1 |
| OBS-36 | AllergyHistories | reaction | Este dato se puede obtener de active_ingredient |
| OBS-37 | AllergyHistories | cie_10 | Hace referencia a alergias o efecto adverso |
| OBS-38 | AllergyHistories | | Se podria separar en 2 tablas |
| OBS-39 | SignsSymptoms | description | Este dato se puede obtener de diagnoses |
| OBS-40 | VitalSigns | | La cardinalidad con Attentions es 1:1 |
| OBS-41 | ExamTypes | cie_10 | Se maneja CIE-10 aqui |
| OBS-42 | Referrals | diagnosis_id | Deberia ser nullable |
| OBS-43 | Varias tablas | created_at | Por que tienen updated_at pero no created_at |
| OBS-44 | AllergyHistories, RamHistories | severity | No se solcito |
| OBS-45 | Varias tablas de historias | attention_id | No es necesario, los antecedentes pertenecen al paciente |
| OBS-46 | RamHistories | reaction_description | Es redundante, se puede codificar con CIE-10 |
| OBS-47 | VitalSigns | weight, height, abdominal_perimeter, hgt, hemoglobin | Pertenecen a somatometria del paciente |
| OBS-48 | Somatometries | patient_id | Es un unico registro por paciente y editable |
| OBS-49 | BioFunctions | attention_id | Se registran una unica vez por atencion |

### Decisiones

| Observacion | Respuesta | Decision | Estado |
|---|---|---|---|
| OBS-33 | La app de conexion | Se mantendra el campo | Completado |
| OBS-34 | init y last | Se mantendran los campos | Completado |
| OBS-35 | Se arregla con FK nullable | patient_id en GynecologicalHistories se volvio nullable | Completado |
| OBS-36 | Falta relacion con active_ingredients o diagnoses | AllergyHistories se separo en AllergyHistories y RamHistories | Completado |
| OBS-37 | Mejor como FK | Abarcado por la decision anterior | Completado |
| OBS-38 | Si, parece mejor | Abarcado por la decision anterior | Completado |
| OBS-39 | Cierto | description se reemplazo por diagnosis_id en SignsSymptoms | Completado |
| OBS-40 | Cierto | Se establecio relacion 1:1 entre VitalSigns y Attentions | Completado |
| OBS-41 | No se maneja CIE-10 | Se elimino cie_10 de ExamTypes | Completado |
| OBS-42 | Algunas no se vinculan a diagnostico | diagnosis_id se volvio nullable con restriccion XOR en Referrals | Completado |
| OBS-43 | Se detecto inconsistencia | Se agrego created_at a las tablas afectadas | Completado |
| OBS-44 | Correcto | Se elimino severity de AllergyHistories y RamHistories | Completado |
| OBS-45 | Correcto | Se elimino attention_id de las tablas de antecedentes | Completado |
| OBS-46 | Correcto | reaction_description se reemplazo por diagnosis_id en RamHistories | Completado |
| OBS-47 | Correcto | VitalSigns se separo en VitalSigns y Somatometries | Completado |
| OBS-48 | Correcto | Se establecio relacion 1:1 entre Somatometries y Patients | Completado |
| OBS-49 | Correcto | Se establecio relacion 1:1 entre BioFunctions y Attentions | Completado |

### Decisiones Adicionales

- DEC-51: Se agrego updated_at a varias entidades
- DEC-58: Se establecio relacion 1:1 entre GynecologicalHistories y Patients

---

## Modelo Logico v0.4

### Entidades

| Entidad | Campos |
|---|---|
| Roles | role_id, name, is_active |
| Users | user_id, role_id, name, paternal_surname, maternal_surname, cmp_code, username, password, email, is_active |
| Patients | patient_id, document_type, document_number, name, paternal_surname, maternal_surname, sex, phone, birth_date, created_at, updated_at, is_active |
| Services | service_id, name, is_active |
| Diagnoses | diagnosis_id, cie_10, description, is_active |
| ActiveIngredients | active_ingredient_id, name, is_active |
| Medicaments | medicament_id, active_ingredient_id, description, concentration, form, is_active |
| Attentions | attention_id, patient_id, service_id, illness_duration, onset_type, course, current_disease, work_plan, created_at, updated_at |
| AttentionDiagnoses | attention_diagnosis_id, attention_id, diagnosis_id, type, specifications, created_at, updated_at |
| SignsSymptoms | sign_symptom_id, attention_id, diagnosis_id, observations, created_at, updated_at |
| VitalSigns | vital_sign_id, attention_id, temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp, hgt, hemoglobin, created_at, updated_at |
| Somatometries | somatometry_id, patient_id, weight, height, abdominal_perimeter, created_at, updated_at |
| BioFunctions | bio_function_id, attention_id, type, status, observations, created_at, updated_at |
| PhysicalExams | physical_exam_id, attention_id, created_at, updated_at |
| PhysicalExamItems | physical_exam_item_id, physical_exam_id, system, status, observations |
| Exams | exam_id, attention_id, created_at |
| ExamTypes | exam_type_id, description, is_active |
| ExamItems | exam_item_id, exam_id, exam_type_id, indications |
| Prescriptions | prescription_id, attention_id, created_at |
| PrescriptionItems | prescription_item_id, prescription_id, medicament_id, quantity, indications |
| PrescriptionDiagnoses | prescription_item_id, attention_diagnosis_id |
| Referrals | referral_id, attention_id, service_id, diagnosis_id, reason, created_at |
| PathologicalHistories | pathological_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at |
| FamilyHistories | family_history_id, patient_id, type, status, specifications, created_at, updated_at |
| GynecologicalHistories | gynecological_history_id, patient_id, menarche, menstrual_cycle, last_menstrual_period, contraceptive_method, gestations, parity, orientation, andria, isa, lsa, created_at, updated_at |
| AllergyHistories | allergy_history_id, patient_id, diagnosis_id, type, specifications, created_at, updated_at |
| RamHistories | ram_history_id, patient_id, active_ingredient_id, diagnosis_id, specifications, created_at, updated_at |
| Audits | audit_id, table_name, record_id, action, user_id, old_data, new_data, ip, user_agent, created_at |

### Relaciones

| Entidad A | Relacion | Entidad B |
|---|---|---|
| Roles | 1:N | Users |
| Patients | 1:N | Attentions, PathologicalHistories, FamilyHistories, AllergyHistories, RamHistories |
| Patients | 1:1 | GynecologicalHistories, Somatometries |
| Services | 1:N | Attentions, Referrals |
| Diagnoses | 1:N | AttentionDiagnoses, PathologicalHistories, Referrals, AllergyHistories, SignsSymptoms, RamHistories |
| ActiveIngredients | 1:N | Medicaments, RamHistories |
| Medicaments | 1:N | PrescriptionItems |
| Attentions | 1:N | AttentionDiagnoses, SignsSymptoms, Prescriptions, Exams, Referrals |
| Attentions | 1:1 | VitalSigns, BioFunctions, PhysicalExams |
| PhysicalExams | 1:N | PhysicalExamItems |
| AttentionDiagnoses | 1:N | PrescriptionDiagnoses |
| Exams | 1:N | ExamItems |
| ExamTypes | 1:N | ExamItems |
| Prescriptions | 1:N | PrescriptionItems |
| PrescriptionItems | 1:N | PrescriptionDiagnoses |
| Users | 1:N | Audits |

### Observaciones

| Codigo | Tabla | Campo | Observacion |
|---|---|---|---|
| OBS-50 | Somatometries, VitalSigns | hgt, hemoglobin | HGT y hemoglobina se miden en cada atencion, no son datos fijos del paciente |

### Decisiones

| Observacion | Respuesta | Decision | Estado |
|---|---|---|---|
| OBS-50 | Correcto | Se movieron hgt y hemoglobin de Somatometries a VitalSigns | Completado |