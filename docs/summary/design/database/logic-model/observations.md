# Observaciones del modelo lógico F&F-MEDIC

## Sesión 17/05/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-01 | Documents | is_active | El campo is_active en Documents sobra si Users ya tiene is_active | Sirve para soportar la eliminación y modificación de los documentos con borrado lógico | Se eliminará la tabla Documents y su campo is_active | DEC-01 |
| OBS-02 | Histories | type | El campo type en Histories sobra porque ClinicalItem ya registra el tipo | Correcto | Se reemplazará Histories por entidades especializadas sin campo type | DEC-02 |
| OBS-03 | Histories | | La entidad Histories debería estar conectada a Patients, no solo a Attentions | Correcto | Se vincularán las nuevas entidades de historias directamente a Patients | DEC-03 |
| OBS-04 | LabOrders | | La tabla LabOrderDiagnoses sobra, la relación debería ser con LabOrders | Cada examen se solicita de forma independiente y necesita su propio diagnóstico | Se eliminará LabOrderDiagnoses | DEC-04 |
| OBS-05 | LabOrderItems | observations | El campo observations debería estar en LabOrders, no en LabOrderItems | Las observaciones van por cada examen, no aplican a toda la orden | Se renombrarán LabOrders y LabOrderItems a Exams y ExamItems | DEC-05 |
| OBS-06 | Audits | | No existe una entidad que registre la auditoría de cambios en el sistema | No se consultó | Se agregará la entidad Audits como registro centralizado de auditoría | DEC-06 |
| OBS-07 | PhysicalExams | | No existe una entidad para registrar el examen físico del paciente | No se consultó | Se agregará la entidad PhysicalExams con un campo por sistema corporal | DEC-07 |
| OBS-08 | ActiveIngredients | | No existe un catálogo de principios activos para clasificar los medicamentos | No se consultó | Se creará la entidad ActiveIngredients | DEC-08 |
| OBS-09 | Medicaments | description | El campo description en Medicaments es redundante porque el principio activo es suficiente | No se consultó | Se eliminará el campo description de Medicaments | DEC-09 |
| OBS-10 | BioFunctions | | Falta una tabla para los 8 tipos de funciones biológicas | Con los ENUM basta, no necesita tabla aparte | Se mantendrán los tipos como ENUM | |
| OBS-11 | Roles | | Los roles no están definidos y falta definir quién gestiona usuarios y catálogos | La app va a escalar a una clínica, los roles se van a necesitar después | Se mantendrá la tabla Roles | |
| OBS-12 | Users | | Faltan nombre, apellidos y código de colegiatura del médico para los documentos PDF | No se consultó | Se agregarán name, paternal_surname, maternal_surname y cmp_code | DEC-10 |
| OBS-13 | Users | | Es posible agregar datos de la clínica para los documentos PDF | No se consultó | Se eliminará ClinicDetails y se manejará por variables de entorno | DEC-11 |
| OBS-14 | Users | role_id | Si la app es solo para el doctor, el campo role_id podría ser innecesario | La app está pensada para escalar a una clínica con múltiples usuarios | Se mantendrá el campo role_id | |
| OBS-15 | Patients | middle_name | El campo middle_name puede unificarse con first_name en un solo campo name | Los nombres compuestos como Luis Junior Alejandro no se pueden separar con un criterio claro | Se unificarán first_name y middle_name en un solo campo name | DEC-12 |
| OBS-16 | Patients | created_at, updated_at | La entidad Patients no tiene campos de auditoría temporal | No se consultó | Se agregarán created_at y update_at en Patients | DEC-13 |
| OBS-17 | Patients | phone | El campo phone queda pendiente de confirmar con el doctor | Sirve como medio de contacto secundario o directo con el paciente | Se confirmará phone como obligatorio | DEC-14 |
| OBS-18 | Attentions | service_id | Si solo hay un servicio, el campo service_id en Attentions podría ser innecesario | La atención siempre tiene un servicio asignado y el sistema tiene que escalar | Se mantendrá service_id como FK a Services | |

---

## Sesión 18/05/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-19 | General | | Los nombres de los campos temporales no son consistentes (create_at vs created_at) | Mejor usar created_at y updated_at como los frameworks ORM | Se estandarizarán todos los campos de timestamp a created_at y updated_at | DEC-15 |
| OBS-20 | PathologicalHistories | | Los antecedentes patológicos y quirúrgicos comparten la misma estructura | Correcto, se pueden unificar con un type que los diferencie | Se fusionarán en PathologicalHistories con type como discriminador | DEC-16 |
| OBS-21 | AllergyHistories | | Las alergias y las reacciones adversas a medicamentos comparten la misma estructura | Correcto, se pueden unificar con un type que los diferencie | Se fusionarán en AllergyHistories con type como discriminador | DEC-17 |
| OBS-22 | PathologicalHistories | observations | El campo observations debe llamarse specifications | Es lo mismo, solo cambia en frontend | Se renombrará observations a specifications | DEC-18 |
| OBS-23 | PathologicalHistories | | PathologicalHistories no tiene FKs hacia Patients y Attentions en el DDL | No se consultó | Se agregarán las FKs faltantes | DEC-19 |
| OBS-24 | FamilyHistories | observations | El nombre observations debería ser specifications, igual que en PathologicalHistories | Es lo mismo, solo cambia en frontend | Se renombrará observations a specifications | DEC-20 |
| OBS-25 | FamilyHistories | | Falta el campo estado del familiar (vivo o fallecido) | Correcto, es necesario para el historial familiar | Se agregará status | DEC-21 |
| OBS-26 | FamilyHistories | diagnosis_id | El campo diagnosis_id no se solicitó y es innecesario en antecedentes familiares | Correcto, los antecedentes familiares no necesitan CIE-10 | Se eliminará diagnosis_id | DEC-22 |
| OBS-27 | FamilyHistories | relative_type | El nombre relative_type podría simplificarse a type | Correcto, type es suficiente | Se renombrará relative_type a type | DEC-23 |
| OBS-28 | FamilyHistories | | FamilyHistories no tiene FKs hacia Patients y Attentions en el DDL | No se consultó | Se agregarán las FKs faltantes | DEC-24 |
| OBS-29 | GynecologicalHistories | | Faltan campos en GynecologicalHistories | Hay que revisar el documento de requisitos | Se agregarán gestations, parity, orientation, andria, isa y lsa | DEC-25 |
| OBS-30 | GynecologicalHistories | obstetric_history | El campo obstetric_history guarda la fórmula obstétrica combinada pero los datos ya están separados | Correcto, sobra porque los campos individuales ya lo cubren | Se eliminará el campo obstetric_history | DEC-26 |
| OBS-31 | GynecologicalHistories | | GynecologicalHistories no tiene FKs hacia Patients y Attentions en el DDL | No se consultó | Se agregarán las FKs faltantes | DEC-27 |
| OBS-32 | AllergyHistories | cie_code | El campo cie_code no es claro, debería ser cie_10 como en Diagnoses | Correcto, tiene que coincidir con el nombre que usa Diagnoses | Se renombrará cie_code a cie_10 | DEC-28 |
| OBS-33 | AllergyHistories | | Falta campo de especificaciones en AllergyHistories | Se usa specifications como en las demás tablas de historias | Se agregará specifications | DEC-29 |
| OBS-34 | AllergyHistories | | AllergyHistories no tiene FKs hacia Patients y Attentions en el DDL | No se consultó | Se agregarán las FKs faltantes | DEC-30 |
| OBS-35 | ExamItems | | Falta dónde almacenar el catálogo de exámenes auxiliares de la clínica | Está pendiente de definir | Se agregará ExamTypes y se vinculará ExamItems mediante FK | DEC-31 |
| OBS-36 | PhysicalExams | observations, status | Las observaciones y el estado deben estar por sistema evaluado, no a nivel de PhysicalExams | Está pendiente de definir | Se creará PhysicalExamItems para observaciones y estado por sistema | DEC-32 |
| OBS-37 | PhysicalExams | | PhysicalExams no tiene FK hacia Attentions en el DDL | No se consultó | Se agregará la FK faltante | DEC-33 |
| OBS-38 | VitalSigns | | VitalSigns no tiene FK hacia Attentions en el DDL | No se consultó | Se agregará la FK faltante | DEC-34 |
| OBS-39 | SignsSymptoms | | No existe una tabla para signos y síntomas | Hay que revisar el documento de requisitos | Se creará la tabla SignsSymptoms | DEC-35 |
| OBS-40 | BioFunctions | status | El estado Observado no es adecuado, debe ser No evaluado | Hay que revisar el documento de requisitos | Se renombrará OBSERVADO a NO_EVALUADO | DEC-36 |
| OBS-41 | BioFunctions | type | El campo type podría moverse a una tabla separada | Con los ENUM basta, no necesita tabla aparte | Se mantendrá el campo type como ENUM | |
| OBS-42 | Medicaments | description | El campo description se eliminó pero el nombre comercial del medicamento sigue siendo necesario | No se consultó | Se re-agregará el campo description en Medicaments | DEC-37 |
| OBS-43 | AttentionDiagnoses | observations | El campo observations debe llamarse specifications como en las historias | Es lo mismo, solo cambia en frontend | Se renombrará observations a specifications | DEC-38 |
| OBS-44 | AttentionDiagnoses | attention_diagnoses_id | El nombre attention_diagnoses_id está en plural y debería ser singular | Correcto, se usa singular para las claves primarias | Se renombrará a attention_diagnosis_id | DEC-39 |
| OBS-45 | AttentionDiagnoses | | La FK diagnosis_id apunta a Diagnoses.is_active en vez de Diagnoses.diagnosis_id | No se consultó | Se corregirá la FK para que apunte a Diagnoses.diagnosis_id | DEC-40 |
| OBS-46 | PrescriptionItems | | La FK prescription_id apunta a Prescriptions.create_at en vez de Prescriptions.prescription_id | No se consultó | Se corregirá la FK para que apunte a Prescriptions.prescription_id | DEC-41 |
| OBS-47 | PrescriptionDiagnoses | | La PK compuesta y las FKs están incompletas en el DDL | No se consultó | Se restaurarán la PK compuesta y las FKs | DEC-42 |
| OBS-48 | Audits | changes | El campo changes es un JSON único y no permite consultar el estado anterior y posterior por separado | Correcto, separar ayuda a consultar los cambios | Se separará changes en old_data y new_data | DEC-43 |
| OBS-49 | Audits | ip, user_agent | Falta trazabilidad de quién y desde dónde se realizó cada acción | No se consultó | Se agregarán los campos ip y user_agent | DEC-44 |
| OBS-50 | Audits | create_at | El campo create_at debe llamarse created_at para mantener consistencia | Correcto, tiene que seguir el estándar del modelo | Se renombrará create_at a created_at | DEC-45 |
| OBS-51 | Audits | | La FK user_id apunta a Users.maternal_surname en vez de Users.user_id | No se consultó | Se corregirá la FK para que apunte a Users.user_id | DEC-46 |
| OBS-52 | Attentions | | Attentions no tiene FK hacia Patients en el DDL | No se consultó | Se agregará la FK faltante | DEC-47 |
| OBS-53 | Attentions | uptade_at | El campo uptade_at tiene un error tipográfico, debe ser update_at | No se consultó | Se renombrará uptade_at a update_at | DEC-48 |
| OBS-54 | Attentions | clinical_exam | El campo clinical_exam no se solicitó | Correcto | Se eliminará clinical_exam | DEC-49 |
| OBS-55 | Attentions | | Faltan los campos del motivo de consulta en Attentions | Revisar documento de requisitos | Se agregarán illness_duration, onset_type y course | DEC-50 |
| OBS-56 | Referrals | diagnosis_id | No se solicitó pero puede ser necesario | Para una interconsulta se necesita un diagnóstico | Se mantendrá diagnosis_id como FK obligatoria | DEC-15 |
| OBS-57 | Medicaments | form | ¿El campo form puede ir en una tabla aparte? | Con los ENUM basta | Se mantendrá el campo form | |

---

## Sesión 21/05/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-58 | VitalSigns, SignsSymptoms, BioFunctions, PhysicalExams, PathologicalHistories, FamilyHistories, GynecologicalHistories | created_at | Estas tablas tienen updated_at pero no created_at, es una inconsistencia | Se agregó updated_at pero falta created_at para la auditoría completa | Se agregará created_at a las tablas que tienen updated_at | DEC-52 |
| OBS-59 | ExamTypes | cie_10 | El campo cie_10 en ExamTypes no es necesario | Mejor solo el catálogo de la clínica sin CIE-10 | Se eliminará cie_10 de ExamTypes | DEC-53 |
| OBS-60 | SignsSymptoms | description | El campo description se puede obtener de Diagnoses | Cierto, así se evita duplicar datos | Se reemplazará description por diagnosis_id como FK a Diagnoses | DEC-54 |
| OBS-61 | VitalSigns | | La cardinalidad con Attentions debería ser 1:1 | Cierto, solo se toman una vez por atención | Se establecerá relación 1:1 con Attentions | DEC-55 |
| OBS-62 | VitalSigns | weight, height, abdominal_perimeter, hgt, hemoglobin | Estos campos pertenecen a somatometría, no a signos vitales | Correcto | Se separará VitalSigns en VitalSigns y Somatometries | DEC-56 |
| OBS-63 | Somatometries | patient_id | Somatometries debe ser un único registro por paciente y editable | Correcto, se actualiza en cada atención | Se establecerá relación 1:1 con Patients | DEC-57 |
| OBS-64 | BioFunctions | attention_id | BioFunctions se registra una única vez por atención | Correcto | Se establecerá relación 1:1 con Attentions | DEC-58 |
| OBS-65 | AllergyHistories | reaction | El campo reaction se puede obtener de active_ingredient o de diagnoses | Falta la relación con active_ingredients y diagnoses | Se separará en AllergyHistories y RamHistories | DEC-59 |
| OBS-66 | AllergyHistories | cie_10 | El campo cie_10 no deja claro si referencia a alergias o a efectos adversos | Mejor modelarlo con FKs separadas a Diagnoses y ActiveIngredients | Se vinculará AllergyHistories a Diagnoses | DEC-60 |
| OBS-67 | AllergyHistories | | La entidad AllergyHistories puede separarse en dos tablas | Sí, es mejor separar alergias de reacciones adversas | Se vinculará RamHistories a ActiveIngredients | DEC-61 |
| OBS-68 | RamHistories | reaction_description | El campo reaction_description es redundante porque se puede codificar con CIE-10 | Correcto | Se reemplazará reaction_description por diagnosis_id como FK a Diagnoses | DEC-62 |
| OBS-69 | AllergyHistories, RamHistories | severity | El campo severity no se solicitó | Correcto | Se eliminará severity de AllergyHistories y RamHistories | DEC-63 |
| OBS-70 | PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories, RamHistories | attention_id | El campo attention_id sobra porque los antecedentes pertenecen al paciente, no a la atención | Correcto | Se eliminará attention_id de las tablas de antecedentes | DEC-64 |
| OBS-71 | GynecologicalHistories | patient_id | La cardinalidad con Patients debería ser 0:1 porque en hombres no aplica | Se arregla con FK opcional | Se permitirá patient_id nulo para pacientes del sexo masculino | DEC-65 |
| OBS-72 | GynecologicalHistories | isa, lsa | Los campos isa y lsa no tienen clara cuál es la fecha de inicio y cuál la de fin | init significa inicio y last significa final | Se mantendrán isa y lsa | |
| OBS-73 | Referrals | diagnosis_id | El campo diagnosis_id debería ser opcional porque algunas interconsultas no se vinculan a un diagnóstico | Cuando no hay diagnóstico, el detalle va en reason | Se permitirá diagnosis_id nulo con restricción XOR con reason | DEC-66 |
| OBS-74 | Audits | user_agent | El campo user_agent no está claro qué almacena ni si es necesario | La app se puede conectar desde web, script de Python, pgAdmin o un cliente externo | Se mantendrá user_agent | |

---

## Sesión 28/05/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-75 | Todas | Listados | Todos los valores de los listados están en inglés pero el sistema se usa en Perú | Correcto | Se traducirán todos los valores a español | DEC-67 |
| OBS-76 | Todas | is_active | El campo is_active en todas las entidades del sistema debe ser obligatorio ya que siempre debe tener un valor para el borrado lógico | Correcto | Se agregará la restricción obligatorio al campo is_active en todas las entidades del sistema | DEC-68 |
| OBS-77 | PhysicalExams | | La tabla PhysicalExamItems sobra, cada examen físico debe tener un system por fila como BioFunctions | Correcto | Se eliminará PhysicalExamItems y PhysicalExams será N:1 con Attentions con campo system | DEC-69 |
| OBS-78 | Medicaments | name, manufacturer_id | Faltan campos para marca y fabricante, además de normalizar fabricantes y formas farmacéuticas | Hay que revisar el catálogo de medicamentos | Se agregarán name y manufacturer_id y se crearán Manufacturers y DosageForms | DEC-70 |
| OBS-79 | Medicaments | description | El campo description sobra porque el principio activo y el nombre comercial ya identifican el medicamento | El nombre lo da el principio activo | Se eliminará description de Medicaments | DEC-71 |
| OBS-80 | Medicaments | active_ingredient_id | La relación con ActiveIngredients es 1:N pero un medicamento puede tener varios principios activos, debería ser N:M | Correcto, el modelo físico ya lo implementa como N:M | Se cambiará la cardinalidad a N:M mediante MedicamentIngredients | DEC-72 |
| OBS-81 | GynecologicalHistories | menstrual_cycle | El ciclo menstrual tiene demasiadas variantes para un listado fijo | Mejor dejarlo como texto libre | Se eliminará el listado MENSTRUAL_CYCLE_TYPE y se usará texto libre | DEC-73 |
| OBS-82 | GynecologicalHistories | orientation | La orientación sexual puede no encajar en un listado cerrado | Mejor dejarlo como texto libre | Se eliminará el listado ORIENTATION_TYPE y se usará texto libre | DEC-74 |
| OBS-83 | RamHistories | | La cardinalidad con Patients es N:1 pero un paciente puede tener varias RAM | Correcto | Se corregirá RamHistories a N:1 con Patients | DEC-75 |
| OBS-84 | BioFunctions | | La cardinalidad con Attentions es N:1 pero en una atención se registran varias funciones biológicas | Correcto | Se corregirá BioFunctions a N:1 con Attentions con único por tipo | DEC-76 |
| OBS-85 | VitalSigns | hgt, hemoglobin, weight, abdominal_perimeter | HGT, hemoglobina, peso y perímetro abdominal se miden en cada atención, no son datos fijos del paciente como la talla | Correcto | Se moverán hgt, hemoglobin, weight y abdominal_perimeter a VitalSigns | DEC-77 |
| OBS-86 | VitalSigns | nombre | El nombre VitalSigns ya no refleja todos los campos que contiene | Correcto | Se renombrará VitalSigns a HealthMetrics | DEC-78 |
| OBS-87 | HealthMetrics | temperature, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp | Los signos vitales pueden no tomarse en todas las atenciones, deben ser opcionales | Correcto | Se cambiarán a opcional | DEC-79 |
| OBS-88 | HealthMetrics | height | Somatometries se elimina, el campo height debe ir en HealthMetrics como obligatorio | Correcto | Se eliminará Somatometries y se moverá height a HealthMetrics como obligatorio | DEC-80 |
| OBS-89 | AllergyHistories | type | El campo type sobra porque RAM ya tiene su propia tabla | Correcto, ya no hace falta el discriminador | Se eliminará type de AllergyHistories | DEC-81 |
| OBS-90 | FamilyHistories | type | Faltan tipos de familiares que pueden aparecer y no están contemplados en el listado | Correcto, se necesita un valor comodín | Se agregará OTRO a FAMILY_TYPE | DEC-82 |
| OBS-91 | Users | created_at, updated_at | La entidad Users no tiene created_at ni updated_at, a diferencia de la mayoría de entidades del sistema | Correcto, se agregarán ambos para mantener la consistencia | Se agregarán created_at y updated_at a Users | DEC-83 |
| OBS-92 | Users | name, paternal_surname, maternal_surname | Los nombres y apellidos del usuario deben ser obligatorios para los documentos PDF | Correcto | Se cambiarán a obligatorio | DEC-84 |
| OBS-93 | Patients | maternal_surname | El apellido materno debe ser obligatorio ya que es un dato requerido del paciente | Correcto | Se cambiará a obligatorio | DEC-85 |
| OBS-94 | Patients | phone | El teléfono debe ser opcional ya que no todos los pacientes tienen | Correcto | Se cambiará a opcional | DEC-86 |
| OBS-95 | Patients | birth_date | La fecha de nacimiento debe ser obligatoria para calcular la edad del paciente | Correcto | Se cambiará a obligatorio | DEC-87 |
| OBS-96 | Diagnoses | description | La descripción debe ser obligatoria, no puede haber un diagnóstico sin nombre | Correcto | Se cambiará a obligatorio | DEC-88 |
| OBS-97 | Attentions | illness_duration | El tiempo de enfermedad es obligatorio como parte del motivo de consulta | Correcto | Se cambiará a obligatorio | DEC-89 |
| OBS-98 | PhysicalExams, FamilyHistories, GynecologicalHistories | other | Los listados PHYSICAL_EXAM_SYSTEM, FAMILY_TYPE y CONTRACEPTIVE_METHOD tienen "Otro" pero no hay campo para capturar el valor personalizado | Correcto | Se agregará el campo `other` en las tres entidades | DEC-90 |
| OBS-99 | PathologicalHistories | | El nombre "PathologicalHistories" solo refleja antecedentes patológicos pero la entidad también almacena quirúrgicos, y el campo `type` ya los discrimina | Correcto | Se renombrará a ClinicalHistories para mayor claridad | DEC-91 |

---

## Sesión 06/07/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-100 | Attentions | user_id | La entidad Attentions no registra el médico que realizó la atención | Correcto | Se agregará user_id como FK a Users | DEC-92 |
| OBS-101 | ExamTypes | | El nombre ExamTypes no es el término clínico adecuado para los procedimientos que almacena | Correcto | Se renombrará ExamTypes a Procedures | DEC-93 |
| OBS-102 | ExamTypes | type, category | Faltan campos de agrupación en ExamTypes para organizar los procedimientos por tipo y categoría | Correcto | Se agregarán type y category | DEC-94 |

---

## Sesión 25/07/2026

| Código | Entidad | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-103 | SignsSymptoms | | La entidad SignsSymptoms se debe eliminar, su información va en el relato de la enfermedad actual | Correcto | Se eliminará SignsSymptoms y su información irá en current_disease de Attentions | DEC-95 |
| OBS-104 | GynecologicalHistories | andria | El campo andria debería renombrarse como número de parejas sexuales | Correcto | Se renombrará andria a sexual_partners como entero positivo de máximo dos cifras | DEC-96 |
| OBS-105 | GynecologicalHistories | other | El campo other no indica a qué listado pertenece | Correcto | Se renombrará other a contraceptive_method_other | DEC-97 |
| OBS-106 | GynecologicalHistories | orientation | El campo orientation debería ser un listado cerrado con la opción Otro y un campo orientation_other para el valor personalizado | Correcto | Se creará el listado ORIENTATION_TYPE con Heterosexual, Homosexual, Bisexual, Pansexual, Asexual, Otro y Prefiere no responder, y el campo orientation_other | DEC-98 |
| OBS-107 | GynecologicalHistories | parity | El campo parity debería reemplazarse por 4 campos que corresponden a partos a término, pretérmino, abortos y nacidos vivos | Correcto | Se reemplazará parity por term_births, preterm_births, abortions y living_children como enteros positivos de máximo dos cifras | DEC-99 |
| OBS-108 | GynecologicalHistories | isa, lsa | Los campos isa y lsa deberían ser texto libre en lugar de fecha | Correcto | Se cambiarán isa y lsa de fecha a texto libre | DEC-100 |
| OBS-109 | Referrals | diagnosis_id | El campo diagnosis_id se debe eliminar, su información irá en el motivo | Correcto | Se eliminará diagnosis_id de Referrals y reason será obligatorio | DEC-101 |
| OBS-110 | FamilyHistories | type, other | El listado FAMILY_TYPE debería llamarse RELATIONSHIP_TYPE para que Responsible comparta el mismo listado, y los campos type y other deberían llamarse relationship y relationship_other | Correcto | Se renombrará FAMILY_TYPE a RELATIONSHIP_TYPE, type a relationship y other a relationship_other | DEC-102 |
| OBS-111 | Attentions | | Falta una entidad para el responsable del paciente cuando es menor de edad | Correcto | Se creará la entidad Responsible como 1:1 con Attentions con name, paternal_surname, maternal_surname, relationship, relationship_other y phone | DEC-103 |
| OBS-112 | Medicaments | concentration | La concentración debe ser opcional, ya que no todos los medicamentos la presentan | Correcto | Se cambiará a opcional | DEC-104 |
