# Entidades del Sistema F&F-MEDIC

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

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `patient_id` | Identificador único del paciente | Clave primaria | |
| `document_type` | Tipo de documento | Obligatorio | BR-01: Identificación por documento |
| `document_number` | Número del documento | Único<br>Obligatorio | BR-01: Todo paciente debe estar identificado por un documento<br>BR-03: No duplicados por documento |
| `name` | Nombre del paciente | Obligatorio | BR-02: Dato obligatorio<br>RF-05: Registro de datos del paciente |
| `paternal_surname` | Apellido paterno | Obligatorio | BR-02: Dato obligatorio<br>RF-05: Registro de datos del paciente |
| `maternal_surname` | Apellido materno | | RF-05: Registro de datos del paciente |
| `sex` | Sexo del paciente | Obligatorio | BR-02: Dato obligatorio<br>RF-05: Registro de datos del paciente |
| `phone` | Teléfono de contacto | Obligatorio | BR-02: Dato obligatorio para contacto posterior<br>RF-05: Registro de datos del paciente |
| `birth_date` | Fecha de nacimiento | | RF-05: Registro de datos del paciente<br>RF-22: Cálculo automático de edad |
| `created_at` | Fecha y hora de registro | Obligatorio | BR-18: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última actualización | | RF-09: Actualización de datos del paciente |
| `is_active` | Indica si el paciente está activo | | RF-06: Listado de pacientes activos<br>RF-07: Búsqueda de pacientes activos |

**Relaciones:**
- 1:N → Attentions
- 1:N → PathologicalHistories
- 1:N → FamilyHistories
- 1:1 → GynecologicalHistories
- 1:N → AllergyHistories
- 1:N → RamHistories
- 1:1 → Somatometries

---

## 2. Roles

**Descripción:** Catálogo de roles de usuario del sistema.

**Cubre:**
- RF-01: Iniciar sesión

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `role_id` | Identificador único del rol | Clave primaria | |
| `name` | Nombre del rol | Único<br>Obligatorio | RF-01: Identificación del rol para control de acceso |
| `is_active` | Indica si el rol está activo | | RF-01: Gestión de roles activos |

**Relaciones:**
- 1:N → Users

---

## 3. Users

**Descripción:** Usuarios del sistema autorizados para acceder a la aplicación. Incluye datos personales y profesionales del médico para documentos PDF.

**Cubre:**
- RF-01: Iniciar sesión
- RF-02: Cerrar sesión
- RF-03: Solicitar recuperación de contraseña
- RF-04: Restablecer contraseña
- RNF-01: Autenticación segura

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `user_id` | Identificador único del usuario | Clave primaria | |
| `role_id` | Rol del usuario | Clave foránea<br>Obligatorio | RF-01: Asignación de permisos |
| `name` | Nombre del usuario | | RF-05: Registro de datos del usuario<br>DEC-03: Datos personales para PDF |
| `paternal_surname` | Apellido paterno | | RF-05: Registro de datos del usuario<br>DEC-03: Datos personales para PDF |
| `maternal_surname` | Apellido materno | | RF-05: Registro de datos del usuario<br>DEC-03: Datos personales para PDF |
| `cmp_code` | Código de colegiatura del Colegio Médico del Perú | | DEC-03: Identificación profesional en documentos PDF |
| `username` | Nombre de usuario | Único<br>Obligatorio | RF-01: Autenticación |
| `password` | Contraseña (hash) | Obligatorio | RF-01: Autenticación<br>RNF-01: Autenticación segura |
| `email` | Correo electrónico | Único<br>Obligatorio | RF-03: Recuperación de contraseña<br>RF-04: Restablecer contraseña |
| `is_active` | Indica si el usuario está activo | | RF-01: Control de acceso<br>RF-02: Cerrar sesión |

**Relaciones:**
- N:1 → Roles
- 1:N → Audits

---

## 4. Services

**Descripción:** Catálogo de servicios/especialidades médicas del consultorio.

**Cubre:**
- RF-10: Registrar atención médica
- RF-17: Generar orden de interconsulta

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `service_id` | Identificador único del servicio | Clave primaria | |
| `name` | Nombre del servicio o especialidad | Único<br>Obligatorio | RF-10: Servicio de la atención<br>RF-17: Servicio de destino en interconsulta |
| `is_active` | Indica si el servicio está activo | | RF-10: Catálogo de servicios activos<br>RF-17: Catálogo de servicios activos |

**Relaciones:**
- 1:N → Attentions
- 1:N → Referrals

---

## 5. Diagnoses

**Descripción:** Catálogo de diagnósticos médicos codificados según CIE-10.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-42: Diagnóstico obligatorio para guardar atención
- BR-43: Interconsulta requiere diagnóstico CIE-10

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `diagnosis_id` | Identificador único del diagnóstico | Clave primaria | |
| `cie_10` | Código CIE-10 del diagnóstico | Único<br>Obligatorio | BR-42: Diagnóstico codificado obligatorio<br>BR-43: Justificación de interconsulta |
| `description` | Descripción o nombre del diagnóstico | | BR-14: Nombre de la enfermedad |
| `is_active` | Indica si el diagnóstico está activo | | BR-42: Catálogo de diagnósticos activos |

**Relaciones:**
- 1:N → AttentionDiagnoses
- 1:N → PathologicalHistories
- 1:N → Referrals
- 1:N → AllergyHistories
- 1:N → SignsSymptoms
- 1:N → RamHistories

---

## 6. ActiveIngredients

**Descripción:** Catálogo de principios activos (sustancias químicas) de los medicamentos.

**Cubre:**
- RF-15: Generar receta médica

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `active_ingredient_id` | Identificador único del principio activo | Clave primaria | |
| `name` | Nombre del principio activo | Único<br>Obligatorio | RF-15: Clasificación de medicamentos |
| `is_active` | Indica si está activo | | RF-15: Catálogo de principios activos |

**Relaciones:**
- 1:N → Medicaments
- 1:N → RamHistories

---

## 7. Medicaments

**Descripción:** Catálogo de medicamentos disponibles para prescripción, asociados a un principio activo.

**Cubre:**
- RF-15: Generar receta médica
- BR-30: La receta debe contener al menos un medicamento

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `medicament_id` | Identificador único del medicamento | Clave primaria | |
| `active_ingredient_id` | Principio activo del medicamento | Clave foránea<br>Obligatorio | RF-15: Clasificación por sustancia química |
| `description` | Nombre comercial del medicamento | Obligatorio | RF-15: Identificación del medicamento<br>BR-30: Prescripción completa |
| `concentration` | Concentración del medicamento | Obligatorio | RF-15: Prescripción completa<br>BR-30: Prescripción completa |
| `form` | Forma farmacéutica | Obligatorio | RF-15: Prescripción completa<br>BR-30: Prescripción completa |
| `is_active` | Indica si está activo | | RF-15: Catálogo de medicamentos activos |

**Reglas:**
- La combinación de descripción, concentración y forma debe ser única

**Relaciones:**
- N:1 → ActiveIngredients
- 1:N → PrescriptionItems

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

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `attention_id` | Identificador único de la atención | Clave primaria | |
| `patient_id` | Paciente al que se realiza la atención | Clave foránea<br>Obligatorio | BR-04: Historial clínico desde atenciones<br>BR-12: Atención asociada a paciente |
| `service_id` | Servicio en el que se realiza la atención | Clave foránea<br>Obligatorio | RF-10: Servicio de la atención |
| `illness_duration` | Tiempo de enfermedad | | RF-10: Motivo de consulta<br>DEC-38: Campos del motivo de consulta |
| `onset_type` | Forma de inicio | Valores: INSIDIOUS, ABRUPT<br>Obligatorio | RF-10: Motivo de consulta<br>DEC-38: Campos del motivo de consulta |
| `course` | Curso de la enfermedad | Valores: PROGRESSIVE, STATIONARY, INTERMITTENT<br>Obligatorio | RF-10: Motivo de consulta<br>DEC-38: Campos del motivo de consulta |
| `current_disease` | Enfermedad actual (descripción larga) | Obligatorio | BR-40: Relato de enfermedad obligatorio |
| `work_plan` | Plan de trabajo (descripción larga) | | RF-10: Plan de trabajo y recomendaciones<br>RF-14: Actualización de atención |
| `created_at` | Fecha y hora de registro | Obligatorio | BR-18: Atención con fecha<br>RF-23: Distribución de atenciones por fecha |
| `updated_at` | Fecha y hora de última modificación | | BR-20: Atenciones no eliminables, solo modificables<br>RF-14: Actualización de atención |

**Relaciones:**
- N:1 → Patients
- N:1 → Services
- 1:N → AttentionDiagnoses
- 1:N → SignsSymptoms
- 1:N → Prescriptions
- 1:N → Exams
- 1:N → Referrals
- 1:1 → VitalSigns
- 1:1 → BioFunctions
- 1:1 → PhysicalExams

---

## 9. AttentionDiagnoses

**Descripción:** Diagnósticos asociados a una atención médica. Permite registrar múltiples diagnósticos por atención, cada uno con su tipo y observaciones.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-42: Diagnóstico obligatorio para guardar atención

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `attention_diagnosis_id` | Identificador único del diagnóstico de atención | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio | BR-14: Vinculación a la atención |
| `diagnosis_id` | Diagnóstico registrado | Clave foránea<br>Obligatorio | BR-42: Diagnóstico obligatorio para guardar atención |
| `type` | Tipo de diagnóstico | Valores: PRESUNTIVO, DEFINITIVO, REPETITIVO<br>Obligatorio | BR-14: Clasificación del diagnóstico |
| `specifications` | Especificaciones del diagnóstico | | BR-14: Detalles adicionales del diagnóstico |
| `created_at` | Fecha del diagnóstico | Obligatorio | BR-14: Fecha de registro del diagnóstico |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Reglas:**
- No puede repetirse el mismo diagnóstico en una misma atención

**Relaciones:**
- N:1 → Attentions
- N:1 → Diagnoses
- 1:N → PrescriptionDiagnoses

---

## 10. SignsSymptoms

**Descripción:** Signos y síntomas evaluados durante la atención médica. Permite registrar múltiples signos y síntomas por atención, vinculados al catálogo CIE-10.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-39: Signos y síntomas obligatorios, al menos uno
- DEC-47: Signos y síntomas vinculados a diagnóstico CIE-10

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `sign_symptom_id` | Identificador único | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio | BR-14: Vinculación a la atención |
| `diagnosis_id` | Diagnóstico CIE-10 del signo o síntoma | Clave foránea<br>Obligatorio | DEC-47: Evitar duplicidad con catálogo CIE-10 |
| `observations` | Observaciones adicionales | | BR-14: Detalles adicionales de la evaluación |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Attentions
- N:1 → Diagnoses

---

## 11. VitalSigns

**Descripción:** Registro de los signos vitales tomados durante la atención. Los valores calculados (IMC, presión arterial media) se obtienen por fórmula en la capa de aplicación.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico
- BR-38: Signos vitales obligatorios para guardar atención

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `vital_sign_id` | Identificador único | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único | BR-14: Vinculación a la atención |
| `temperature` | Temperatura en °C | Obligatorio | BR-38: Signo vital obligatorio |
| `spo2` | Saturación de oxígeno en % | Obligatorio | BR-38: Signo vital obligatorio |
| `heart_rate` | Frecuencia cardiaca (lpm) | Obligatorio | BR-38: Signo vital obligatorio |
| `respiratory_rate` | Frecuencia respiratoria (rpm) | Obligatorio | BR-38: Signo vital obligatorio |
| `systolic_bp` | Presión arterial sistólica (mmHg) | Obligatorio | BR-38: Signo vital obligatorio |
| `diastolic_bp` | Presión arterial diastólica (mmHg) | Obligatorio | BR-38: Signo vital obligatorio |
| `hgt` | Hemoglucotest | | BR-04: Parámetro metabólico |
| `hemoglobin` | Hemoglobina | | BR-04: Parámetro metabólico |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- 1:1 → Attentions

---

## 12. Somatometries

**Descripción:** Registro de la somatometría del paciente. Se almacena un único registro por paciente y es editable.

**Cubre:**
- BR-04: Historial clínico desde atenciones

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `somatometry_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio<br>Único | BR-04: Somatometría del paciente<br>DEC-57: 1:1 con Patients |
| `weight` | Peso en kg | | BR-04: Para cálculo de IMC |
| `height` | Talla en cm | | BR-04: Para cálculo de IMC |
| `abdominal_perimeter` | Perímetro abdominal en cm | | BR-04: Indicador de riesgo cardiovascular |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- 1:1 → Patients

---

## 13. BioFunctions

**Descripción:** Registro de las funciones biológicas evaluadas durante la atención.

**Cubre:**
- BR-14: Atención con evaluación y diagnóstico

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `bio_function_id` | Identificador único | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único | BR-14: Vinculación a la atención<br>DEC-59: 1:1 con Attentions |
| `type` | Tipo de función biológica | Valores: SED, APETITO, SUEÑO, DEPOSICIONES, ORINA, VARIACION_PONDERAL, ESTADO_ANIMO<br>Obligatorio | BR-14: Evaluación biológica completa |
| `status` | Estado de la función biológica | Valores: AUMENTADA, DISMINUIDA, CONSERVADA, NO_EVALUADO<br>Obligatorio | BR-14: Estado de cada función |
| `observations` | Detalle (solo cuando status = NO_EVALUADO) | | BR-14: Observaciones de función no evaluada |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Reglas:**
- No puede registrarse el mismo tipo de función biológica más de una vez por atención

**Relaciones:**
- 1:1 → Attentions

---

## 14. PhysicalExams

**Descripción:** Encabezado del examen físico asociado a una atención. Relación 1:1 con Attentions.

**Cubre:**
- BR-41: Examen físico obligatorio

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `physical_exam_id` | Identificador único | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio<br>Único | BR-41: Examen físico obligatorio por atención |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- 1:1 → Attentions
- 1:N → PhysicalExamItems

---

## 15. PhysicalExamItems

**Descripción:** Ítems individuales del examen físico por sistema corporal. Cada sistema se evalúa como CONSERVADO, OBSERVADO o DIFERIDO. El campo `observations` solo se completa cuando el sistema está OBSERVADO.

**Cubre:**
- BR-41: Examen físico obligatorio

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `physical_exam_item_id` | Identificador único del ítem | Clave primaria | |
| `physical_exam_id` | Examen físico asociado | Clave foránea<br>Obligatorio | BR-41: Vinculación al examen físico |
| `system` | Sistema corporal evaluado | Valores: GENERAL_APPEARANCE, SKIN_INTEGUMENT, HEAD, NECK, CHEST, CARDIOVASCULAR, ABDOMEN, GENITOURINARY, MUSCULOSKELETAL, NEUROLOGICAL, OTHER<br>Obligatorio | BR-41: Evaluación completa del examen físico |
| `status` | Estado del sistema | Valores: CONSERVADO, OBSERVADO, DIFERIDO<br>Obligatorio | BR-41: Estado de cada sistema |
| `observations` | Observaciones del sistema | | BR-41: Detalles cuando status = OBSERVADO |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |

**Reglas:**
- No puede registrarse el mismo sistema más de una vez por examen físico

**Relaciones:**
- N:1 → PhysicalExams

---

## 16. Exams

**Descripción:** Encabezado de las órdenes de exámenes auxiliares de laboratorio e imágenes solicitados durante una atención.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-37: Documento con fecha de emisión

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `exam_id` | Identificador único de la orden | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio | BR-29: Documento asociado a atención |
| `created_at` | Fecha de emisión | Obligatorio | BR-37: Documento con fecha de emisión<br>RF-16: Generar orden de exámenes |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Attentions
- 1:N → ExamItems

---

## 17. ExamTypes

**Descripción:** Catálogo de exámenes auxiliares disponibles en la clínica.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `exam_type_id` | Identificador único del tipo de examen | Clave primaria | |
| `description` | Nombre del examen | Obligatorio | RF-16: Catálogo de exámenes disponibles |
| `is_active` | Indica si está activo | | RF-16: Catálogo de exámenes activos |

**Relaciones:**
- 1:N → ExamItems

---

## 18. ExamItems

**Descripción:** Ítems individuales de una orden de exámenes auxiliares. Vinculados al catálogo de exámenes de la clínica.

**Cubre:**
- RF-16: Generar orden de exámenes auxiliares

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `exam_item_id` | Identificador único del ítem | Clave primaria | |
| `exam_id` | Orden de examen asociada | Clave foránea<br>Obligatorio | RF-16: Vinculación a la orden |
| `exam_type_id` | Tipo de examen | Clave foránea<br>Obligatorio | RF-16: Catálogo de exámenes de la clínica |
| `indications` | Indicaciones del examen | | RF-16: Indicaciones específicas del examen |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |

**Relaciones:**
- N:1 → Exams
- N:1 → ExamTypes

---

## 19. Prescriptions

**Descripción:** Encabezado de las recetas médicas emitidas. Una atención puede tener múltiples recetas, permitiendo separar por vía de administración o por diagnóstico.

**Cubre:**
- RF-15: Generar receta médica
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-37: Documento con fecha de emisión

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `prescription_id` | Identificador único de la receta | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio | BR-29: Documento asociado a atención |
| `created_at` | Fecha de emisión | Obligatorio | BR-37: Documento con fecha de emisión<br>RF-15: Generar receta médica |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Attentions
- 1:N → PrescriptionItems

---

## 20. PrescriptionItems

**Descripción:** Ítems individuales de una receta médica.

**Cubre:**
- RF-15: Generar receta médica
- BR-30: La receta debe contener al menos un medicamento

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `prescription_item_id` | Identificador único del ítem | Clave primaria | |
| `prescription_id` | Receta asociada | Clave foránea<br>Obligatorio | RF-15: Vinculación a la receta |
| `medicament_id` | Medicamento prescrito | Clave foránea<br>Obligatorio | BR-30: Receta con al menos un medicamento |
| `quantity` | Cantidad prescrita | Obligatorio | BR-30: Prescripción completa |
| `indications` | Indicaciones de uso | | BR-30: Instrucciones para el paciente<br>RF-15: Generar receta médica |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Prescriptions
- N:1 → Medicaments
- 1:N → PrescriptionDiagnoses

---

## 21. PrescriptionDiagnoses

**Descripción:** Entidad puente que asocia ítems de receta con los diagnósticos de la atención. Permite filtrar recetas por diagnóstico para generar PDFs independientes.

**Cubre:**
- RF-19: Generar receta médica por diagnóstico

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `prescription_item_id` | Ítem de receta | Clave primaria (compuesta)<br>Clave foránea | RF-19: Vinculación al ítem de receta |
| `attention_diagnosis_id` | Diagnóstico de la atención | Clave primaria (compuesta)<br>Clave foránea | RF-19: Generar receta por diagnóstico |

**Relaciones:**
- N:1 → PrescriptionItems
- N:1 → AttentionDiagnoses

---

## 22. Referrals

**Descripción:** Registro de interconsultas derivadas a otras especialidades durante una atención. Requiere diagnóstico CIE-10 o motivo para justificar la derivación.

**Cubre:**
- RF-17: Generar orden de interconsulta
- RF-18: Exportar reportes PDF
- BR-29: Documento médico asociado a atención
- BR-32: Interconsulta con al menos una derivación
- BR-37: Documento con fecha de emisión
- BR-43: Interconsulta requiere diagnóstico CIE-10
- DEC-50: diagnosis_id nullable con restricción XOR

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `referral_id` | Identificador único de la interconsulta | Clave primaria | |
| `attention_id` | Atención médica asociada | Clave foránea<br>Obligatorio | BR-29: Documento asociado a atención |
| `service_id` | Especialidad de destino | Clave foránea<br>Obligatorio | BR-32: Interconsulta con al menos una derivación |
| `diagnosis_id` | Diagnóstico CIE-10 que justifica la derivación | Clave foránea<br>XOR con reason | DEC-50: diagnosis_id nullable con restricción XOR |
| `reason` | Motivo de la interconsulta | Obligatorio<br>XOR con diagnosis_id | BR-32: Motivo de la derivación<br>DEC-50: diagnosis_id nullable con restricción XOR |
| `created_at` | Fecha de emisión | Obligatorio | BR-37: Documento con fecha de emisión<br>RF-17: Generar orden de interconsulta |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Reglas:**
- Restricción XOR: solo uno entre `diagnosis_id` y `reason` puede ser NULL. (DEC-50)

**Relaciones:**
- N:1 → Attentions
- N:1 → Services
- N:1 → Diagnoses

---

## 23. PathologicalHistories

**Descripción:** Antecedentes patológicos y quirúrgicos del paciente, estandarizados con códigos CIE-10.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-41: Discriminador de tipo de antecedente

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `pathological_history_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio | BR-04: Historial clínico del paciente |
| `diagnosis_id` | Diagnóstico CIE-10 | Clave foránea<br>Obligatorio | BR-14: Antecedente codificado con CIE-10 |
| `type` | Tipo de antecedente | Valores: PATHOLOGICAL, SURGICAL<br>Obligatorio | DEC-41: Discriminador de tipo de antecedente |
| `specifications` | Especificaciones | | BR-14: Observaciones clínicas |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Patients
- N:1 → Diagnoses

---

## 24. FamilyHistories

**Descripción:** Antecedentes familiares del paciente. Padre, madre, hijos y hermanos son campos fijos y obligatorios; abuelos y tíos son opcionales.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `family_history_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio | BR-04: Historial clínico del paciente |
| `type` | Tipo de familiar | Valores: PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO<br>Obligatorio | BR-14: Clasificación del familiar |
| `status` | Estado del familiar | Valores: VIVO, FALLECIDO<br>Obligatorio | BR-14: Estado del familiar |
| `specifications` | Especificaciones | | BR-14: Estado de salud del familiar |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Patients

---

## 25. GynecologicalHistories

**Descripción:** Antecedentes ginecológicos específicos para pacientes femeninas.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-35: Campos ginecológicos
- DEC-45: FK patient_id nullable para pacientes del sexo masculino

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `gynecological_history_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Único | DEC-45: FK nullable para pacientes del sexo masculino<br>DEC-58: 1:1 con Patients |
| `menarche` | Edad de la primera menstruación | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `menstrual_cycle` | Régimen catamenial | | BR-14: Características del ciclo menstrual<br>DEC-35: Campos ginecológicos |
| `last_menstrual_period` | Fecha de última regla (FUR) | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `contraceptive_method` | Método anticonceptivo | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `gestations` | Número de gestaciones | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `parity` | Número de partos | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `orientation` | Orientación sexual | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `andria` | Edad de inicio de actividad sexual | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `isa` | Fecha de inicio de relaciones sexuales | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `lsa` | Fecha de última relación sexual | | BR-14: Antecedente ginecológico<br>DEC-35: Campos ginecológicos |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- 1:1 → Patients

---

## 26. AllergyHistories

**Descripción:** Registro de alergias del paciente codificadas con CIE-10. Se muestran resaltadas en la historia clínica por seguridad del paciente.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-46: Alergias con FK a Diagnoses

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `allergy_history_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio | BR-04: Historial clínico del paciente |
| `diagnosis_id` | Diagnóstico CIE-10 de la alergia | Clave foránea<br>Obligatorio | DEC-46: Alergias vinculadas a catálogo CIE-10 |
| `type` | Tipo de reacción | Valores: ALLERGY<br>Obligatorio | DEC-46: Discriminador de tipo |
| `specifications` | Especificaciones | | BR-14: Detalles adicionales |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Patients
- N:1 → Diagnoses

---

## 27. RamHistories

**Descripción:** Registro de reacciones adversas a medicamentos (RAM) del paciente, vinculadas al principio activo del medicamento. Se muestran resaltadas en la historia clínica por seguridad del paciente.

**Cubre:**
- BR-04: Historial clínico desde atenciones
- BR-14: Atención con evaluación y diagnóstico
- DEC-46: RAM con FK a ActiveIngredients

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `ram_history_id` | Identificador único | Clave primaria | |
| `patient_id` | Paciente asociado | Clave foránea<br>Obligatorio | BR-04: Historial clínico del paciente |
| `active_ingredient_id` | Principio activo del medicamento | Clave foránea<br>Obligatorio | DEC-46: RAM vinculada a principio activo |
| `diagnosis_id` | Diagnóstico CIE-10 de la reacción adversa | Clave foránea<br>Obligatorio | DEC-55: Reacción codificada con CIE-10 |
| `specifications` | Especificaciones | | BR-14: Detalles adicionales |
| `created_at` | Fecha y hora de registro | Obligatorio | DEC-52: Estándar de auditoría temporal |
| `updated_at` | Fecha y hora de última modificación | | DEC-51: Soporte de actualizaciones |

**Relaciones:**
- N:1 → Patients
- N:1 → ActiveIngredients
- N:1 → Diagnoses

---

## 28. Audits

**Descripción:** Registro centralizado de auditoría para todas las entidades transaccionales del sistema. Cada inserción, actualización o eliminación importante queda registrada.

**Cubre:**
- DEC-13: Entidad de auditoría centralizada
- DEC-20: Separación de datos antes y después del cambio
- DEC-21: Trazabilidad de IP y user agent
- DEC-22: Estándar de nomenclatura created_at

| Campo | Descripción | Restricciones | Justificación |
|---|---|---|---|
| `audit_id` | Identificador único del registro de auditoría | Clave primaria | |
| `table_name` | Nombre de la entidad afectada | Obligatorio | DEC-13: Identifica qué entidad se modificó |
| `record_id` | ID del registro afectado | Obligatorio | DEC-13: Identifica qué registro se modificó |
| `action` | Acción realizada | Valores: INSERT, UPDATE, DELETE<br>Obligatorio | DEC-13: Tipo de acción de auditoría |
| `user_id` | Usuario que realizó la acción | Clave foránea<br>Obligatorio | DEC-13: Trazabilidad del usuario |
| `old_data` | Datos antes del cambio (JSON) | | DEC-13: Estado previo para UPDATE/DELETE<br>DEC-20: Separación de cambios |
| `new_data` | Datos después del cambio (JSON) | | DEC-13: Estado resultante para INSERT/UPDATE<br>DEC-20: Separación de cambios |
| `ip` | Dirección IP del cliente | | DEC-21: Trazabilidad de origen |
| `user_agent` | Agente del cliente | | DEC-21: Identifica navegador/dispositivo |
| `created_at` | Fecha y hora de la acción | Obligatorio | DEC-13: Momento exacto del cambio<br>DEC-22: Estándar de nomenclatura |

**Relaciones:**
- N:1 → Users

---

# Resumen de relaciones

| Entidad | Relaciones |
|---|---|
| Patients | 1:N → Attentions, PathologicalHistories, FamilyHistories, AllergyHistories, RamHistories<br>1:1 → GynecologicalHistories, Somatometries |
| Roles | 1:N → Users |
| Users | N:1 → Roles<br>1:N → Audits |
| Services | 1:N → Attentions, Referrals |
| Diagnoses | 1:N → AttentionDiagnoses, PathologicalHistories, Referrals, AllergyHistories, SignsSymptoms, RamHistories |
| ActiveIngredients | 1:N → Medicaments, RamHistories |
| Medicaments | N:1 → ActiveIngredients<br>1:N → PrescriptionItems |
| Attentions | N:1 → Patients, Services<br>1:N → AttentionDiagnoses, SignsSymptoms, Prescriptions, Exams, Referrals<br>1:1 → VitalSigns, BioFunctions, PhysicalExams |
| AttentionDiagnoses | N:1 → Attentions, Diagnoses<br>1:N → PrescriptionDiagnoses |
| SignsSymptoms | N:1 → Attentions, Diagnoses |
| VitalSigns | 1:1 → Attentions |
| Somatometries | 1:1 → Patients |
| BioFunctions | 1:1 → Attentions |
| PhysicalExams | 1:1 → Attentions<br>1:N → PhysicalExamItems |
| PhysicalExamItems | N:1 → PhysicalExams |
| Exams | N:1 → Attentions<br>1:N → ExamItems |
| ExamTypes | 1:N → ExamItems |
| ExamItems | N:1 → Exams, ExamTypes |
| Prescriptions | N:1 → Attentions<br>1:N → PrescriptionItems |
| PrescriptionItems | N:1 → Prescriptions, Medicaments<br>1:N → PrescriptionDiagnoses |
| PrescriptionDiagnoses | N:1 → PrescriptionItems, AttentionDiagnoses |
| Referrals | N:1 → Attentions, Services, Diagnoses |
| PathologicalHistories | N:1 → Patients, Diagnoses |
| FamilyHistories | N:1 → Patients |
| GynecologicalHistories | 1:1 → Patients |
| AllergyHistories | N:1 → Patients, Diagnoses |
| RamHistories | N:1 → Patients, ActiveIngredients, Diagnoses |
| Audits | N:1 → Users |

---

# Resumen de coberturas

| Entidad | Cobertura |
|---|---|
| Patients | RF-05: Registrar paciente<br>RF-06: Listar pacientes<br>RF-07: Buscar pacientes<br>RF-08: Visualizar datos del paciente<br>RF-09: Actualizar datos del paciente<br>RF-20: Visualizar estadísticas generales<br>RF-21: Distribución de pacientes por sexo<br>RF-22: Distribución de pacientes por grupo etario<br>BR-01: Paciente identificado por un documento de identidad<br>BR-02: Datos obligatorios del paciente<br>BR-03: No duplicados por documento de identidad<br>BR-04: Historial clínico desde atenciones |
| Roles | RF-01: Iniciar sesión |
| Users | RF-01: Iniciar sesión<br>RF-02: Cerrar sesión<br>RF-03: Solicitar recuperación de contraseña<br>RF-04: Restablecer contraseña<br>RF-05: Registrar paciente<br>RNF-01: Autenticación segura<br>DEC-03: Datos personales y profesionales del médico para PDF |
| Services | RF-10: Registrar atención médica<br>RF-17: Generar orden de interconsulta |
| Diagnoses | BR-14: Atención con evaluación y diagnóstico<br>BR-42: Diagnóstico obligatorio para guardar atención<br>BR-43: Interconsulta requiere diagnóstico CIE-10 |
| ActiveIngredients | RF-15: Generar receta médica |
| Medicaments | RF-15: Generar receta médica<br>BR-30: Receta con al menos un medicamento |
| Attentions | RF-10: Registrar atención médica<br>RF-11: Listar atenciones médicas<br>RF-12: Buscar atenciones médicas<br>RF-13: Visualizar atención médica<br>RF-14: Actualizar atención médica<br>RF-20: Visualizar estadísticas generales<br>RF-23: Distribución de atenciones por fecha<br>BR-04: Historial clínico desde atenciones<br>BR-12: Atención asociada a paciente<br>BR-14: Atención con evaluación y diagnóstico<br>BR-18: Atención con fecha<br>BR-20: Atenciones no eliminables, solo modificables<br>BR-40: Relato de enfermedad obligatorio<br>DEC-38: Campos del motivo de consulta |
| AttentionDiagnoses | BR-14: Atención con evaluación y diagnóstico<br>BR-42: Diagnóstico obligatorio para guardar atención |
| SignsSymptoms | BR-14: Atención con evaluación y diagnóstico<br>BR-39: Signos y síntomas obligatorios, al menos uno<br>DEC-47: Signos y síntomas vinculados a diagnóstico CIE-10 |
| VitalSigns | BR-14: Atención con evaluación y diagnóstico<br>BR-38: Signos vitales obligatorios para guardar atención |
| Somatometries | BR-04: Historial clínico desde atenciones |
| BioFunctions | BR-14: Atención con evaluación y diagnóstico |
| PhysicalExams | BR-14: Atención con evaluación y diagnóstico<br>BR-41: Examen físico obligatorio |
| PhysicalExamItems | BR-14: Atención con evaluación y diagnóstico<br>BR-41: Examen físico obligatorio |
| Exams | RF-16: Generar orden de exámenes auxiliares<br>RF-18: Exportar reportes PDF<br>BR-29: Documento médico asociado a atención<br>BR-34: Documentos emitidos no modificables<br>BR-37: Documento con fecha de emisión |
| ExamTypes | RF-16: Generar orden de exámenes auxiliares |
| ExamItems | RF-16: Generar orden de exámenes auxiliares |
| Prescriptions | RF-15: Generar receta médica<br>RF-18: Exportar reportes PDF<br>BR-29: Documento médico asociado a atención<br>BR-34: Documentos emitidos no modificables<br>BR-37: Documento con fecha de emisión |
| PrescriptionItems | RF-15: Generar receta médica<br>BR-30: Receta con al menos un medicamento |
| PrescriptionDiagnoses | RF-19: Generar receta médica por diagnóstico |
| Referrals | RF-17: Generar orden de interconsulta<br>RF-18: Exportar reportes PDF<br>BR-29: Documento médico asociado a atención<br>BR-32: Interconsulta con al menos una derivación<br>BR-34: Documentos emitidos no modificables<br>BR-37: Documento con fecha de emisión<br>BR-43: Interconsulta requiere diagnóstico CIE-10<br>DEC-50: diagnosis_id nullable con restricción XOR |
| PathologicalHistories | RF-10: Registrar atención médica<br>RF-14: Actualizar atención médica<br>BR-04: Historial clínico desde atenciones<br>BR-14: Atención con evaluación y diagnóstico<br>DEC-41: Discriminador de tipo de antecedente |
| FamilyHistories | RF-10: Registrar atención médica<br>RF-14: Actualizar atención médica<br>BR-04: Historial clínico desde atenciones<br>BR-14: Atención con evaluación y diagnóstico |
| GynecologicalHistories | RF-10: Registrar atención médica<br>RF-14: Actualizar atención médica<br>BR-04: Historial clínico desde atenciones<br>BR-14: Atención con evaluación y diagnóstico<br>DEC-35: Campos ginecológicos<br>DEC-45: FK patient_id nullable para pacientes del sexo masculino |
| AllergyHistories | RF-10: Registrar atención médica<br>RF-14: Actualizar atención médica<br>BR-04: Historial clínico desde atenciones<br>BR-14: Atención con evaluación y diagnóstico<br>DEC-46: Alergias con FK a Diagnoses |
| RamHistories | RF-10: Registrar atención médica<br>RF-14: Actualizar atención médica<br>BR-04: Historial clínico desde atenciones<br>BR-14: Atención con evaluación y diagnóstico<br>DEC-46: RAM con FK a ActiveIngredients |
| Audits | DEC-13: Entidad de auditoría centralizada<br>DEC-20: Separación de datos antes y después del cambio<br>DEC-21: Trazabilidad de IP y user agent<br>DEC-22: Estándar de nomenclatura created_at |