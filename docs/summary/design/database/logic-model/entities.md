# Entidades del Sistema F&F-MEDIC

# Listados

Catálogo de valores permitidos para los campos que utilizan listas cerradas en el sistema.

| Listado | Valores |
|---------|---------|
| USER_ROLE | ADMIN, DOCTOR |
| DOCUMENT_TYPE | DNI, Pasaporte, CE |
| SEX_TYPE | M, F |
| ONSET_TYPE | Insidioso, Brusco |
| COURSE_TYPE | Progresivo, Estacionario, Intermitente |
| DIAGNOSIS_TYPE | Presuntivo, Definitivo, Repetitivo |
| BIO_FUNCTION_TYPE | Sed, Apetito, Sueño, Estado Animo, Orina, Deposiciones, Variacion Ponderal |
| BIO_FUNCTION_STATUS | Aumentado, Disminuido, Conservado, No evaluado |
| PHYSICAL_EXAM_SYSTEM | Aspecto General, Piel y Faneras, Cabeza, Cuello, Torax y Pulmones, Cardiovascular, Abdomen, Genitourinario, SOMA, SNC, Otro |
| PHYSICAL_EXAM_STATUS | Conservado, Observado, Diferido |
| RELATIONSHIP_TYPE | Padre, Madre, Hijo, Hermano, Abuelo, Tio, Otro |
| FAMILY_STATUS | Vivo, Fallecido |
| HISTORY_TYPE | Patologico, Quirurgico, Alergia |
| CONTRACEPTIVE_METHOD | Ninguno, AOC, Inyectable, Implante, DIU, Preservativo, Ligadura, Vasectomia, Otro |
| ORIENTATION_TYPE | Heterosexual, Homosexual, Bisexual, Pansexual, Asexual, Otro, Prefiere no responder |
| ACTION_TYPE | Insertar, Actualizar, Eliminar |

# Entities

## 1. Patients

**Descripción:** Registro de datos personales de los pacientes atendidos en el consultorio.

**Cubre:**
- RF-05: Registrar paciente
- RF-06: Listar pacientes
- RF-07: Buscar pacientes
- RF-08: Visualizar datos del paciente
- RF-09: Actualizar datos del paciente
- BR-01: Identificación por documento
- BR-02: Datos obligatorios
- BR-03: No duplicados por documento

| Campo | Descripción | Restricciones |
|---|---|---|
| `patient_id` | Identificador único del paciente | Clave primaria |
| `document_type` | Tipo de documento | Obligatorio |
| `document_number` | Número del documento | Único<br>Obligatorio |
| `name` | Nombre del paciente | Obligatorio |
| `paternal_surname` | Apellido paterno | Obligatorio |
| `maternal_surname` | Apellido materno | Obligatorio |
| `sex` | Sexo del paciente | Obligatorio |
| `phone` | Teléfono de contacto | |
| `birth_date` | Fecha de nacimiento | Obligatorio |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última actualización | |
| `is_active` | Indica si el paciente está activo | Obligatorio |

**Relaciones:**
- 1:N → Attentions
- 1:N → ClinicalHistories
- 1:N → FamilyHistories
- 1:1 → GynecologicalHistories
- 1:N → AllergyHistories
- 1:N → RamHistories

---

## 2. Users

**Descripción:** Usuarios del sistema autorizados para acceder a la aplicación. Incluye datos personales y profesionales del médico para documentos PDF.

**Cubre:**
- RF-01: Iniciar sesión
- RF-02: Cerrar sesión
- RF-03: Solicitar recuperación de contraseña
- RF-04: Restablecer contraseña
- RNF-01: Autenticación segura
- DEC-83: Estándar de auditoría temporal

| Campo | Descripción | Restricciones |
|---|---|---|
| `user_id` | Identificador único del usuario | Clave primaria |
| `role` | Rol del usuario | Listado: USER_ROLE<br>Obligatorio |
| `name` | Nombre del usuario | Obligatorio |
| `paternal_surname` | Apellido paterno | Obligatorio |
| `maternal_surname` | Apellido materno | Obligatorio |
| `cmp_code` | Código de colegiatura del Colegio Médico del Perú | |
| `username` | Nombre de usuario | Único<br>Obligatorio |
| `password` | Contraseña (hash) | Obligatorio |
| `email` | Correo electrónico | Único<br>Obligatorio |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última actualización | |
| `is_active` | Indica si el usuario está activo | Obligatorio |

**Relaciones:**
- 1:N → Audits
- 1:N → Attentions

---

## 3. Services

**Descripción:** Catálogo de servicios/especialidades médicas del consultorio.

**Cubre:**
- RF-10: Registrar atención médica
- RF-17: Generar orden de interconsulta

| Campo | Descripción | Restricciones |
|---|---|---|
| `service_id` | Identificador único del servicio | Clave primaria |
| `name` | Nombre del servicio o especialidad | Único<br>Obligatorio |
| `is_active` | Indica si el servicio está activo | Obligatorio |

**Relaciones:**
- 1:N → Attentions
- 1:N → Referrals

---

## 4. Diagnoses

**Descripción:** Catálogo de diagnósticos médicos codificados según CIE-10.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-42: Diagnóstico obligatorio para guardar atención
- BR-43: Interconsulta requiere diagnóstico CIE-10

| Campo | Descripción | Restricciones |
|---|---|---|
| `diagnosis_id` | Identificador único del diagnóstico | Clave primaria |
| `cie_10` | Código CIE-10 del diagnóstico | Único<br>Obligatorio |
| `description` | Descripción o nombre del diagnóstico | Obligatorio |
| `is_active` | Indica si el diagnóstico está activo | Obligatorio |

**Relaciones:**
- 1:N → AttentionDiagnoses
- 1:N → ClinicalHistories
- 1:N → Referrals
- 1:N → SignsSymptoms

---

## 5. ActiveIngredients

**Descripción:** Catálogo de principios activos (sustancias químicas) de los medicamentos.

**Cubre:**
- RF-15: Generar receta médica

| Campo | Descripción | Restricciones |
|---|---|---|
| `active_ingredient_id` | Identificador único del principio activo | Clave primaria |
| `name` | Nombre del principio activo | Único<br>Obligatorio |
| `is_active` | Indica si está activo | Obligatorio |

**Relaciones:**
- 1:N → MedicamentIngredients

---

## 6. Medicaments

**Descripción:** Catálogo de medicamentos disponibles para prescripción, asociados a un principio activo.

**Cubre:**
- RF-15: Generar receta médica
- BR-30: La receta debe contener al menos un medicamento

| Campo | Descripción | Restricciones |
|---|---|---|
| `medicament_id` | Identificador único del medicamento | Clave primaria |
| `name` | Nombre comercial del medicamento | Obligatorio |
| `manufacturer_id` | Fabricante del medicamento | Clave foránea<br>Obligatorio |
| `concentration` | Concentración del medicamento | Opcional |
| `dosage_form_id` | Forma farmacéutica | Clave foránea<br>Obligatorio |
| `is_active` | Indica si está activo | Obligatorio |

**Reglas:**
- La combinación de name, concentration y dosage_form_id debe ser única

**Relaciones:**
- N:1 → Manufacturers
- N:1 → DosageForms
- 1:N → PrescriptionItems
- 1:N → MedicamentIngredients

---

## 7. MedicamentIngredients

**Descripción:** Entidad intermedia que gestiona la relación N:M entre Medicaments y ActiveIngredients. Un medicamento puede tener varios principios activos (ej. medicamentos combinados) y un principio activo puede estar presente en varios medicamentos.

**Cubre:**
- DEC-72: Cardinalidad N:M entre Medicaments y ActiveIngredients

| Campo | Descripción | Restricciones |
|---|---|---|
| `medicament_id` | Medicamento asociado | Clave primaria<br>Clave foránea<br>Obligatorio |
| `active_ingredient_id` | Principio activo asociado | Clave primaria<br>Clave foránea<br>Obligatorio |

**Relaciones:**
- N:1 → Medicaments
- N:1 → ActiveIngredients

---

## 8. Attentions

**Descripción:** Registro de la atención médica realizada a un paciente. Contiene la información clínica general de la consulta.

**Cubre:**
- RF-10: Registrar atención médica
- RF-11: Listar atenciones médicas
- RF-12: Buscar atenciones médicas
- RF-13: Visualizar atención médica
- RF-14: Actualizar atención médica
- BR-04: Historial clínico desde atenciones
- BR-12: Atención asociada a paciente
- BR-18: Atención con fecha
- BR-20: Atenciones no eliminables, solo modificables
- BR-40: Relato de enfermedad obligatorio

| Campo | Descripción | Restricciones |
|---|---|---|
| `attention_id` | Identificador único de la atención | Clave primaria |
| `patient_id` | Paciente al que se realiza la atención | Clave foránea<br>Obligatorio |
| `service_id` | Servicio en el que se realiza la atención | Clave foránea<br>Obligatorio |
| `user_id` | Médico que realizó la atención | Clave foránea<br>Obligatorio |
| `illness_duration` | Tiempo de enfermedad | Obligatorio |
| `onset_type` | Forma de inicio | Listado: ONSET_TYPE<br>Obligatorio |
| `course` | Curso de la enfermedad | Listado: COURSE_TYPE<br>Obligatorio |
| `current_disease` | Enfermedad actual (descripción larga) | Obligatorio |
| `work_plan` | Plan de trabajo (descripción larga) | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Patients
- N:1 → Services
- N:1 → Users
- 1:N → AttentionDiagnoses
- 1:N → PhysicalExams
- 1:N → BioFunctions
- 1:N → Prescriptions
- 1:N → Exams
- 1:N → Referrals
- 1:1 → HealthMetrics
- 1:1 → Responsible

---

## 9. AttentionDiagnoses

**Descripción:** Diagnósticos asociados a una atención médica. Permite registrar múltiples diagnósticos por atención, cada uno con su tipo y observaciones.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-42: Diagnóstico obligatorio para guardar atención

| Campo | Descripción | Restricciones |
|---|---|---|
| `attention_diagnosis_id` | Identificador único del diagnóstico de atención | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio |
| `diagnosis_id` | Diagnóstico registrado | Clave foránea<br>Obligatorio |
| `type` | Tipo de diagnóstico | Listado: DIAGNOSIS_TYPE<br>Obligatorio |
| `specifications` | Especificaciones del diagnóstico | |
| `created_at` | Fecha del diagnóstico | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Reglas:**
- No puede repetirse el mismo diagnóstico en una misma atención

**Relaciones:**
- N:1 → Attentions
- N:1 → Diagnoses
- 1:N → PrescriptionDiagnoses

---

## 10. HealthMetrics

**Descripción:** Registro de las métricas de salud tomadas durante la atención: signos vitales, hemoglucotest, hemoglobina, peso, talla y perímetro abdominal.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-38: Signos vitales obligatorios para guardar atención

| Campo | Descripción | Restricciones |
|---|---|---|
| `health_metric_id` | Identificador único | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único |
| `temperature` | Temperatura en °C | |
| `spo2` | Saturación de oxígeno en % | |
| `heart_rate` | Frecuencia cardiaca (lpm) | |
| `respiratory_rate` | Frecuencia respiratoria (rpm) | |
| `systolic_bp` | Presión arterial sistólica (mmHg) | |
| `diastolic_bp` | Presión arterial diastólica (mmHg) | |
| `hgt` | Hemoglucotest | |
| `hemoglobin` | Hemoglobina | |
| `weight` | Peso en kg | |
| `abdominal_perimeter` | Perímetro abdominal en cm | |
| `height` | Talla en cm | Obligatorio |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- 1:1 → Attentions

---

## 11. BioFunctions

**Descripción:** Registro de las funciones biológicas evaluadas durante la atención.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico

| Campo | Descripción | Restricciones |
|---|---|---|
| `bio_function_id` | Identificador único | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único (con type) |
| `type` | Tipo de función biológica | Listado: BIO_FUNCTION_TYPE<br>Obligatorio |
| `status` | Estado de la función biológica | Listado: BIO_FUNCTION_STATUS<br>Obligatorio |
| `observations` | Detalle (solo cuando status = UNEVALUATED) | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Reglas:**
- No puede registrarse el mismo tipo de función biológica más de una vez por atención

**Relaciones:**
- N:1 → Attentions

---

## 12. PhysicalExams

**Descripción:** Evaluación de sistemas corporales por atención médica. Cada fila representa un sistema evaluado.

**Cubre:**
- BR-41: Examen físico obligatorio

| Campo | Descripción | Restricciones |
|---|---|---|
| `physical_exam_id` | Identificador único | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único (con system) |
| `system` | Sistema corporal evaluado | Listado: PHYSICAL_EXAM_SYSTEM<br>Obligatorio |
| `other` | Valor personalizado cuando system = Otro | |
| `status` | Estado del sistema | Listado: PHYSICAL_EXAM_STATUS<br>Obligatorio |
| `observations` | Observaciones del sistema | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Reglas:**
- No puede registrarse el mismo sistema más de una vez por atención

**Relaciones:**
- N:1 → Attentions

---

## 13. Exams

**Descripción:** Encabezado de las órdenes de exámenes auxiliares de laboratorio e imágenes solicitados durante una atención.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-37: Documento con fecha de emisión

| Campo | Descripción | Restricciones |
|---|---|---|
| `exam_id` | Identificador único de la orden | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio |
| `created_at` | Fecha de emisión | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Attentions
- 1:N → ExamItems

---

## 14. Procedures

**Descripción:** Catálogo de procedimientos médicos disponibles en la clínica como análisis de laboratorio, diagnóstico por imágenes y emergencia.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares
- DEC-93: Renombrado de ExamTypes a Procedures
- DEC-94: Clasificación por tipo y categoría

| Campo | Descripción | Restricciones |
|---|---|---|
| `procedure_id` | Identificador único del procedimiento | Clave primaria |
| `type` | Tipo de documento | Obligatorio |
| `category` | Categoría médica del procedimiento | |
| `description` | Nombre del procedimiento | Único<br>Obligatorio |
| `is_active` | Indica si está activo | Obligatorio |

**Reglas:**
- La combinación de type, category y description debe ser única

**Relaciones:**
- 1:N → ExamItems

---

## 15. ExamItems

**Descripción:** Ítems individuales de una orden de exámenes auxiliares. Vinculados al catálogo de exámenes de la clínica.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares

| Campo | Descripción | Restricciones |
|---|---|---|
| `exam_item_id` | Identificador único del ítem | Clave primaria |
| `exam_id` | Orden de examen asociada | Clave foránea<br>Obligatorio |
| `procedure_id` | Procedimiento solicitado | Clave foránea<br>Obligatorio |
| `indications` | Indicaciones del examen | |
| `created_at` | Fecha y hora de registro | Obligatorio |

**Relaciones:**
- N:1 → Exams
- N:1 → Procedures

---

## 16. Prescriptions

**Descripción:** Encabezado de las recetas médicas emitidas. Una atención puede tener múltiples recetas, permitiendo separar por vía de administración o por diagnóstico.

**Cubre:**
- RF-15: Generar receta médica
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-37: Documento con fecha de emisión

| Campo | Descripción | Restricciones |
|---|---|---|
| `prescription_id` | Identificador único de la receta | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio |
| `created_at` | Fecha de emisión | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Attentions
- 1:N → PrescriptionItems

---

## 17. PrescriptionItems

**Descripción:** Ítems individuales de una receta médica.

**Cubre:**
- RF-15: Generar receta médica
- BR-30: La receta debe contener al menos un medicamento

| Campo | Descripción | Restricciones |
|---|---|---|
| `prescription_item_id` | Identificador único del ítem | Clave primaria |
| `prescription_id` | Receta asociada | Clave foránea<br>Obligatorio |
| `medicament_id` | Medicamento prescrito | Clave foránea<br>Obligatorio |
| `quantity` | Cantidad prescrita | Obligatorio |
| `indications` | Indicaciones de uso | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Prescriptions
- N:1 → Medicaments
- 1:N → PrescriptionDiagnoses

---

## 18. PrescriptionDiagnoses

**Descripción:** Entidad puente que asocia ítems de receta con los diagnósticos de la atención. Permite filtrar recetas por diagnóstico para generar PDFs independientes.

**Cubre:**
- RF-19: Generar receta médica por diagnóstico

| Campo | Descripción | Restricciones |
|---|---|---|
| `prescription_item_id` | Ítem de receta | Clave primaria (compuesta)<br>Clave foránea |
| `attention_diagnosis_id` | Diagnóstico de la atención | Clave primaria (compuesta)<br>Clave foránea |

**Relaciones:**
- N:1 → PrescriptionItems
- N:1 → AttentionDiagnoses

---

## 19. Referrals

**Descripción:** Registro de interconsultas derivadas a otras especialidades durante una atención.

**Cubre:**
- RF-17: Generar orden de interconsulta
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-32: Interconsulta con al menos una derivación
- BR-37: Documento con fecha de emisión
- DEC-101: diagnosis_id eliminado

| Campo | Descripción | Restricciones |
|---|---|---|
| `referral_id` | Identificador único de la interconsulta | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio |
| `service_id` | Especialidad de destino | Clave foránea<br>Obligatorio |
| `reason` | Motivo de la interconsulta | Obligatorio |
| `created_at` | Fecha de emisión | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Attentions
- N:1 → Services

---

## 20. ClinicalHistories

**Descripción:** Registro de antecedentes del paciente: patológicos (con CIE-10), quirúrgicos (texto libre) y alergias (texto libre), discriminados por type.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-17: Discriminador de tipo de antecedente
- DEC-107: Fusionar alergias y hacer diagnosis_id opcional
- DEC-108: Agregar ALERGIA a HISTORY_TYPE

| Campo | Descripción | Restricciones |
|---|---|---|
| `clinical_history_id` | Identificador único | Clave primaria |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio |
| `diagnosis_id` | Diagnóstico CIE-10 (solo para PATOLOGICO) | Clave foránea |
| `type` | Tipo de antecedente | Listado: HISTORY_TYPE<br>Obligatorio |
| `specifications` | Especificaciones | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Patients
- N:1 → Diagnoses (opcional)

---

## 21. FamilyHistories

**Descripción:** Antecedentes familiares del paciente. Padre, madre, hijos y hermanos son campos fijos y obligatorios; abuelos y tíos son opcionales.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico

| Campo | Descripción | Restricciones |
|---|---|---|
| `family_history_id` | Identificador único | Clave primaria |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio |
| `relationship` | Tipo de familiar | Listado: RELATIONSHIP_TYPE<br>Obligatorio |
| `relationship_other` | Valor personalizado cuando relationship = Otro | |
| `status` | Estado del familiar | Listado: FAMILY_STATUS<br>Obligatorio |
| `specifications` | Especificaciones | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Patients

---

## 22. GynecologicalHistories

**Descripción:** Antecedentes ginecológicos específicos para pacientes femeninas.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-26: Campos ginecológicos
- DEC-65: FK patient_id opcional para pacientes del sexo masculino

| Campo | Descripción | Restricciones |
|---|---|---|
| `gynecological_history_id` | Identificador único | Clave primaria |
| `patient_id` | Paciente asociado | Clave foránea<br>Único |
| `menarche` | Edad de la primera menstruación | |
| `menstrual_cycle` | Régimen catamenial | Texto libre |
| `last_menstrual_period` | Fecha de última regla (FUR) | |
| `contraceptive_method` | Método anticonceptivo | Listado: CONTRACEPTIVE_METHOD |
| `contraceptive_method_other` | Valor personalizado cuando contraceptive_method = Otro | |
| `gestations` | Número de gestaciones | |
| `term_births` | Partos a término | Entero positivo de 2 cifras |
| `preterm_births` | Partos pretérmino | Entero positivo de 2 cifras |
| `abortions` | Abortos | Entero positivo de 2 cifras |
| `living_children` | Nacidos vivos | Entero positivo de 2 cifras |
| `orientation` | Orientación sexual | Listado: ORIENTATION_TYPE |
| `orientation_other` | Valor personalizado cuando orientation = Otro | |
| `sexual_partners` | Número de parejas sexuales | Entero positivo de 2 cifras |
| `isa` | Inicio de actividad sexual | Texto libre |
| `lsa` | Última actividad sexual | Texto libre |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- 1:1 → Patients

---

## 23. AllergyHistories

**Descripción:** Registro de alergias del paciente como texto libre (specifications). Se muestran resaltadas en la historia clínica por seguridad del paciente. Fusión de la tabla allergy_histories previa con ClinicalHistories.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-105: Eliminar diagnosis_id y usar solo specifications

| Campo | Descripción | Restricciones |
|---|---|---|
| `allergy_history_id` | Identificador único | Clave primaria |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio |
| `specifications` | Especificaciones de la alergia | Obligatorio |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Patients

---

## 24. RamHistories

**Descripción:** Registro de reacciones adversas a medicamentos (RAM) del paciente como texto libre único (specifications) que contiene el nombre del fármaco y la reacción adversa. Se muestran resaltadas en la historia clínica por seguridad del paciente.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-106: Eliminar active_ingredient_id y diagnosis_id, usar solo specifications

| Campo | Descripción | Restricciones |
|---|---|---|
| `ram_history_id` | Identificador único | Clave primaria |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio |
| `specifications` | Especificaciones (fármaco y reacción) | Obligatorio |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- N:1 → Patients

---

## 25. Responsible

**Descripción:** Datos del acompañante responsable del paciente cuando es menor de edad.

**Cubre:**
- DEC-103: Nueva entidad para responsable del paciente

| Campo | Descripción | Restricciones |
|---|---|---|
| `responsible_id` | Identificador único | Clave primaria |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único |
| `name` | Nombre del responsable | Obligatorio |
| `paternal_surname` | Apellido paterno | Obligatorio |
| `maternal_surname` | Apellido materno | Obligatorio |
| `relationship` | Parentesco del responsable | Listado: RELATIONSHIP_TYPE<br>Obligatorio |
| `relationship_other` | Valor personalizado cuando relationship = Otro | |
| `phone` | Teléfono de contacto | |
| `created_at` | Fecha y hora de registro | Obligatorio |
| `updated_at` | Fecha y hora de última modificación | |

**Relaciones:**
- 1:1 → Attentions

---

## 26. Audits

**Descripción:** Registro centralizado de auditoría para todas las entidades transaccionales del sistema. Cada inserción, actualización o eliminación importante queda registrada.

**Cubre:**
- DEC-06: Entidad de auditoría centralizada
- DEC-44: Separación de datos antes y después del cambio
- DEC-45: Trazabilidad de IP y user agent
- DEC-46: Estándar de nomenclatura created_at

| Campo | Descripción | Restricciones |
|---|---|---|
| `audit_id` | Identificador único del registro de auditoría | Clave primaria |
| `table_name` | Nombre de la entidad afectada | Obligatorio |
| `record_id` | ID del registro afectado | Obligatorio |
| `action` | Acción realizada | Listado: ACTION_TYPE<br>Obligatorio |
| `user_id` | Usuario que realizó la acción | Clave foránea<br>Obligatorio |
| `old_data` | Datos antes del cambio (JSON) | |
| `new_data` | Datos después del cambio (JSON) | |
| `ip` | Dirección IP del cliente | |
| `user_agent` | Agente del cliente | |
| `created_at` | Fecha y hora de la acción | Obligatorio |

**Relaciones:**
- N:1 → Users

---

## 27. Manufacturers

**Descripción:** Catálogo de fabricantes de medicamentos.

**Cubre:**
- DEC-70: Normalizar fabricantes

| Campo | Descripción | Restricciones |
|---|---|---|
| `manufacturer_id` | Identificador único del fabricante | Clave primaria |
| `name` | Nombre del fabricante | Único<br>Obligatorio |
| `is_active` | Indica si está activo | Obligatorio |

**Relaciones:**
- 1:N → Medicaments

---

## 28. DosageForms

**Descripción:** Catálogo de formas farmacéuticas de los medicamentos.

**Cubre:**
- DEC-70: Normalizar formas farmacéuticas

| Campo | Descripción | Restricciones |
|---|---|---|
| `dosage_form_id` | Identificador único de la forma farmacéutica | Clave primaria |
| `name` | Nombre de la forma farmacéutica | Único<br>Obligatorio |
| `is_active` | Indica si está activo | Obligatorio |

**Relaciones:**
- 1:N → Medicaments

---

# Resumenes

## Resumen de relaciones

| Entidad | Relaciones |
|---|---|
| Patients | 1:N → Attentions, ClinicalHistories, FamilyHistories, AllergyHistories, RamHistories<br>1:1 → GynecologicalHistories |
| Users | 1:N → Audits, Attentions |
| Services | 1:N → Attentions, Referrals |
| Diagnoses | 1:N → AttentionDiagnoses, ClinicalHistories, Referrals |
| ActiveIngredients | 1:N → MedicamentIngredients |
| Manufacturers | 1:N → Medicaments |
| DosageForms | 1:N → Medicaments |
| Medicaments | N:1 → Manufacturers, DosageForms<br>1:N → PrescriptionItems, MedicamentIngredients |
| MedicamentIngredients | N:1 → Medicaments, ActiveIngredients |
| Attentions | N:1 → Patients, Services, Users<br>1:N → AttentionDiagnoses, PhysicalExams, BioFunctions, Prescriptions, Exams, Referrals<br>1:1 → HealthMetrics, Responsible |
| AttentionDiagnoses | N:1 → Attentions, Diagnoses<br>1:N → PrescriptionDiagnoses |
| HealthMetrics | 1:1 → Attentions |
| BioFunctions | N:1 → Attentions |
| PhysicalExams | N:1 → Attentions |
| Exams | N:1 → Attentions<br>1:N → ExamItems |
| Procedures | 1:N → ExamItems |
| ExamItems | N:1 → Exams, Procedures |
| Prescriptions | N:1 → Attentions<br>1:N → PrescriptionItems |
| PrescriptionItems | N:1 → Prescriptions, Medicaments<br>1:N → PrescriptionDiagnoses |
| PrescriptionDiagnoses | N:1 → PrescriptionItems, AttentionDiagnoses |
| Referrals | N:1 → Attentions, Services |
| ClinicalHistories | N:1 → Patients, Diagnoses |
| FamilyHistories | N:1 → Patients |
| GynecologicalHistories | 1:1 → Patients |
| AllergyHistories | N:1 → Patients |
| RamHistories | N:1 → Patients |
| Responsible | 1:1 → Attentions |
| Audits | N:1 → Users |

---

## Resumen de coberturas

| Entidad | Cobertura |
|---|---|
| Patients | RF-05, RF-06, RF-07, RF-08, RF-09, RF-20, RF-21, RF-22, BR-01, BR-02, BR-03, BR-04 |
| Users | RF-01, RF-02, RF-03, RF-04, RF-05, RNF-01, DEC-10, DEC-83, DEC-109, DEC-110 |
| Services | RF-10, RF-17 |
| Diagnoses | BR-14, BR-42, BR-43 |
| ActiveIngredients | RF-15 |
| Manufacturers | DEC-70 |
| DosageForms | DEC-70 |
| Medicaments | RF-15, BR-30 |
| MedicamentIngredients | DEC-72 |
| Attentions | RF-10, RF-11, RF-12, RF-13, RF-14, RF-20, RF-23, BR-04, BR-12, BR-14, BR-18, BR-20, BR-40, DEC-51, DEC-92 |
| AttentionDiagnoses | BR-14, BR-42 |
| HealthMetrics | BR-14, BR-38 |
| BioFunctions | BR-14 |
| PhysicalExams | BR-14, BR-41 |
| Exams | RF-16, RF-18, BR-29, BR-34, BR-37 |
| Procedures | RF-16, DEC-93, DEC-94 |
| ExamItems | RF-16 |
| Prescriptions | RF-15, RF-18, BR-29, BR-34, BR-37 |
| PrescriptionItems | RF-15, BR-30 |
| PrescriptionDiagnoses | RF-19 |
| Referrals | RF-17, RF-18, BR-29, BR-32, BR-37, DEC-101 |
| ClinicalHistories | RF-10, RF-14, BR-04, BR-14, DEC-17, DEC-107, DEC-108 |
| FamilyHistories | RF-10, RF-14, BR-04, BR-14, DEC-102 |
| GynecologicalHistories | RF-10, RF-14, BR-04, BR-14, DEC-26, DEC-65, DEC-96, DEC-97, DEC-98, DEC-99, DEC-100 |
| AllergyHistories | RF-10, RF-14, BR-04, BR-14, DEC-105 |
| RamHistories | RF-10, RF-14, BR-04, BR-14, DEC-106 |
| Responsible | DEC-103 |
| Audits | DEC-06, DEC-44, DEC-45, DEC-46 |
