# Observaciones del modelo lógico F&F-MEDIC

## Sesión 17/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-01 | Users | role_id | ¿Será necesario tener roles considerando que la app es solo para el doctor? | Pensado en la escalabilidad del sistema para uso futuro en clínica privada | Se mantendrá la tabla |  |
| OBS-02 | Roles |  | Misma observación anterior | Roles no definidos del todo; pendiente definir quién gestione usuarios y catálogos | Se mantendrá la tabla |  |
| OBS-03 | Documents | is_active | ¿Será necesario si Users ya tiene is_active? | Para eliminación y modificación de documentos | Se eliminará la tabla junto con el campo | DEC-01 |
| OBS-04 | Patients | middle_name | ¿Qué ventaja tiene sobre un único campo "name"? | Evita problemas de separación con nombres compuestos | Se unificarán los campos en un único campo name | DEC-02 |
| OBS-05 | Patients | phone | Pendiente de confirmar con el doctor | Necesario como medio de comunicación secundario o directo | Se confirmará el campo como obligatorio | DEC-14 |
| OBS-06 | Histories | type | ¿Es necesario si ClinicalItem ya registra el tipo? | Correcto | Se corregirá la tabla | DEC-04 | COMPLETADO |
| OBS-07 | Histories | | ¿No debería estar conectado a Patients? | Correcto | Se corregirá la relación | DEC-04 | COMPLETADO |
| OBS-08 | Attentions | service_id | ¿Será necesario tener servicios? | La atención debe tener un servicio (medicina general) y soportar escalabilidad | Se mantendrá la tabla | | COMPLETADO |
| OBS-09 | Attentions |  | ¿Su relación con VitalSigns no debería ser 1:1? | Correcto | Se corregirá la cardinalidad | DEC-27 |
| OBS-10 | LabOrderItems | observations | ¿No debería ir en LabOrders? | Son observaciones por cada examen. Además el nombre debería ser AuxiliaryExams | Se corregirá el campo y se renombrará la tabla | DEC-06, DEC-07 |
| OBS-11 | LabOrderDiagnoses |  | ¿La relación debería ser con LabOrders? | No, cada examen debe tener uno o varios diagnósticos asociados | Se eliminará la tabla | DEC-07 |
| OBS-12 | Users |  | Agregar nombre, apellidos y código de colegiatura para PDFs |  | Se agregarán los campos name, paternal_surname, maternal_surname y cmp_code | DEC-03 |
| OBS-13 | Users |  | Posible: agregar números de la clínica y datos de información para PDFs |  | Se eliminará la tabla ClinicDetails y se definirá el manejo por variables de entorno | DEC-30 |
| OBS-14 | BioFunctions |  | Agregar tabla para los 8 tipos de funciones biológicas |  | Se mantendrán los tipos como ENUM |  |

---

## Sesión 18/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-15 | Medicaments | form | ¿Se puede separar en otra tabla? | ¿Es necesario? | Se mantendrá el campo |  |
| OBS-16 | Referrals | diagnosis_id | No se solicitó | Para una interconsulta se necesita un diagnóstico | Se mantendrá el campo | DEC-11 |
| OBS-17 | Attentions | clinical_exam | No se solicitó | Correcto | Se eliminará el campo | DEC-34 |
| OBS-18 | Attentions |  | Faltan los campos del Motivo de consulta | Revisar documento de requisitos | Se agregarán los campos illness_duration, onset_type y course | DEC-38 |
| OBS-19 | Attentions |  | Faltan campos (o tabla) para Signos y Síntomas | Revisar documento de requisitos | Se creará la tabla SignsSymptoms | DEC-38 |
| OBS-20 | BioFunctions | type | ¿Se puede separar en otra tabla? | ¿Es necesario? | Se mantendrá el campo como ENUM |  |
| OBS-21 | BioFunctions | status | El estado "Observado" fue reemplazado por "No evaluado" | Revisar documento de requisitos | Se renombrará el valor OBSERVADO a NO_EVALUADO | DEC-31 |
| OBS-22 | ExamItems |  | ¿Dónde se almacenará la lista de exámenes auxiliares de la clínica? | Pendiente | Se agregará la tabla ExamTypes y se vinculará ExamItems mediante FK | DEC-36 |
| OBS-23 | PhysicalExams | observations | Las observaciones son para cada examen físico | Pendiente | Se creará la tabla PhysicalExamItems para observaciones por sistema | DEC-37 |
| OBS-24 | PhysicalExams |  | ¿Cómo se almacena el estado (observado, conservado, diferido) para cada campo? | En BioFunctions se maneja de otra forma | Se creará la tabla PhysicalExamItems con estado por sistema | DEC-37 |
| OBS-25 | VitalSigns |  | La cardinalidad con Attentions es incorrecta | Correcto, 1:1 | Se corregirá la cardinalidad | DEC-27 |
| OBS-26 | PathologicalHistories | observations | Se debe usar "especificaciones" | Es lo mismo, solo cambia en frontend | Se renombrará el campo a specifications | DEC-32 |
| OBS-27 | GynecologicalHistories |  | Faltan campos | Revisar documento de requisitos | Se agregarán los campos gestations, parity, orientation, andria, isa y lsa | DEC-35 |
| OBS-28 | FamilyHistories | observations | Se debe usar "especificaciones" | Es lo mismo, solo cambia en frontend | Se renombrará el campo a specifications | DEC-32 |
| OBS-29 | FamilyHistories |  | Falta campo Estado del familiar (vivo, fallecido) | Correcto | Se agregará el campo status | DEC-33 |
| OBS-30 | FamilyHistories | diagnosis_id | No se solicitó | Correcto | Se eliminará el campo | DEC-29 |
| OBS-31 | AllergyHistories |  | Falta campo especificaciones | Se usará specifications | Se agregará el campo specifications | DEC-32 |
| OBS-32 | AllergyHistories | cie_code | ¿Qué es? ¿Cómo se obtiene? | ¿No iba a ser con cie_10? | Se renombrará el campo a cie_10 | DEC-24 |

---

## Sesión 21/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-33 | Audits | user_agent | ¿Qué se almacena aquí? ¿es necesario? | La app de conexión: app web, script de Python, pgAdmin, cliente externo, etc. Se sugiere renombrar a `user_app` | Se mantendrá el campo |  |
| OBS-34 | GynecologicalHistories | isa, lsa | ¿Cuál es fecha de inicio y cuál de fin? | init y last, es decir inicio y final | Se mantendrán los campos |  |
| OBS-35 | GynecologicalHistories | patient_id | Cardinalidad con Patients sería 0:1 (en hombres no aplica) | Se arregla con FK nullable | Se permitirá que el campo sea nulo para pacientes del sexo masculino | DEC-45 |
| OBS-36 | AllergyHistories | reaction | ¿Este dato se puede obtener de active_ingredient? | Falta relación con active_ingredients o diagnoses | Se separará en dos tablas | DEC-46 |
| OBS-37 | AllergyHistories | cie_10 | ¿Hace referencia a alergias o efecto adverso? | Mejor como FK | Se vinculará a Diagnoses y ActiveIngredients respectivamente | DEC-46 |
| OBS-38 | AllergyHistories |  | ¿Se podría separar en 2 tablas? | Sí, parece mejor | Se crearán las tablas AllergyHistories y RamHistories | DEC-46 |
| OBS-39 | SignsSymptoms | description | ¿Este dato se puede obtener de diagnoses? | Cierto | Se reemplazará el campo por una clave foránea a Diagnoses | DEC-47 |
| OBS-40 | VitalSigns |  | ¿La cardinalidad con Attentions es 1:1? | Cierto | Se establecerá una relación uno a uno con Attentions | DEC-48 |
| OBS-41 | ExamTypes | cie_10 | ¿Se maneja CIE-10 aquí? | Se decidió no manejar CIE-10, solo exámenes de la clínica | Se eliminará el campo | DEC-49 |
| OBS-42 | Referrals | diagnosis_id | ¿Debería ser nullable? | Algunas interconsultas no se vinculan a diagnóstico. El detalle va en reason | Se permitirá que el campo sea nulo, pero al menos uno de los dos campos debe tener valor | DEC-50 |
| OBS-43 | VitalSigns, SignsSymptoms, BioFunctions, PhysicalExams, PathologicalHistories, FamilyHistories, GynecologicalHistories | created_at | ¿Por qué estas tablas tienen `updated_at` pero no `created_at`? | Se detectó inconsistencia: DEC-51 agregó `updated_at` pero faltó `created_at` para auditoría completa | Se agregará el campo a las tablas que tienen updated_at | DEC-52 |
| OBS-44 | AllergyHistories, RamHistories | severity | No se solicitó | Correcto | Se eliminará el campo de ambas tablas | DEC-53 |
| OBS-45 | PathologicalHistories, FamilyHistories, GynecologicalHistories, AllergyHistories, RamHistories | attention_id | No es necesario, los antecedentes pertenecen al paciente | Correcto | Se eliminará el campo de las tablas de antecedentes | DEC-54 |
| OBS-46 | RamHistories | reaction_description | Es redundante, se puede codificar con CIE-10 | Correcto | Se reemplazará el campo por una clave foránea a Diagnoses | DEC-55 |
| OBS-47 | VitalSigns | weight, height, abdominal_perimeter, hgt, hemoglobin | Pertenecen a somatometría del paciente, no a signos vitales | Correcto | Se separará la tabla en dos: VitalSigns y Somatometries | DEC-56 |
| OBS-48 | Somatometries | patient_id | Es un único registro por paciente y editable | Correcto | Se establecerá una relación uno a uno con Patients | DEC-57 |
| OBS-49 | BioFunctions | attention_id | Se registran una única vez por atención | Correcto | Se establecerá una relación uno a uno con Attentions | DEC-59 |

---

## Sesión 27/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-50 | Somatometries, VitalSigns | hgt, hemoglobin | HGT y hemoglobina se miden en cada atención, no son datos fijos del paciente como peso y talla. Por lo tanto, deberían pertenecer a VitalSigns | Correcto | Se moverán los campos hgt y hemoglobin de Somatometries a VitalSigns | DEC-60 |
