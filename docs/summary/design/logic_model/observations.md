# Observaciones del modelo lógico F&F-MEDIC

## Sesión 17/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión | Estado |
|---|---|---|---|---|---|---|---|
| OBS-01 | Users | role_id | ¿Será necesario tener roles considerando que la app es solo para el doctor? | Pensado en la escalabilidad del sistema para uso futuro en clínica privada | Se mantendrá la tabla | | COMPLETADO |
| OBS-02 | Roles | | Misma observación anterior | Roles no definidos del todo; pendiente definir quién gestione usuarios y catálogos | Se mantendrá la tabla | | COMPLETADO |
| OBS-03 | Documents | is_active | ¿Será necesario si Users ya tiene is_active? | Para eliminación y modificación de documentos | Se eliminará la tabla junto con el campo | DEC-01 | COMPLETADO |
| OBS-04 | Patients | middle_name | ¿Qué ventaja tiene sobre un único campo "name"? | Evita problemas de separación con nombres compuestos | Se unificarán los campos en un único campo name | DEC-02 | COMPLETADO |
| OBS-05 | Patients | phone | Pendiente de confirmar con el doctor | Necesario como medio de comunicación secundario o directo | Se confirmará el campo como obligatorio | DEC-14 | COMPLETADO |
| OBS-06 | Histories | type | ¿Es necesario si ClinicalItem ya registra el tipo? | Correcto | Se corregirá la tabla | DEC-04 | COMPLETADO |
| OBS-07 | Histories | | ¿No debería estar conectado a Patients? | Correcto | Se corregirá la relación | DEC-04 | COMPLETADO |
| OBS-08 | Attentions | service_id | ¿Será necesario tener servicios? | La atención debe tener un servicio (medicina general) y soportar escalabilidad | Se mantendrá la tabla | | COMPLETADO |
| OBS-09 | Attentions | | ¿Su relación con VitalSigns no debería ser 1:1? | Correcto | Se corregirá la cardinalidad | DEC-26 | COMPLETADO |
| OBS-10 | LabOrderItems | observations | ¿No debería ir en LabOrders? | Son observaciones por cada examen. Además el nombre debería ser AuxiliaryExams | Se corregirá el campo y se renombrará la tabla | DEC-06, DEC-07 | COMPLETADO |
| OBS-11 | LabOrderDiagnoses | | ¿La relación debería ser con LabOrders? | No, cada examen debe tener uno o varios diagnósticos asociados | Se eliminará la tabla | DEC-07 | COMPLETADO |
| OBS-12 | Users | | Agregar nombre, apellidos y código de colegiatura para PDFs | | Se agregarán los campos name, paternal_surname, maternal_surname y cmp_code | DEC-03 | COMPLETADO |
| OBS-13 | Users | | Posible: agregar números de la clínica y datos de información para PDFs | | Se eliminará la tabla ClinicDetails y se definirá el manejo por variables de entorno | DEC-30 | COMPLETADO |
| OBS-14 | BioFunctions | | Agregar tabla para los 8 tipos de funciones biológicas | | Se mantendrán los tipos como ENUM | | COMPLETADO |

---

## Sesión 18/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión | Estado |
|---|---|---|---|---|---|---|---|
| OBS-15 | Medicaments | form | ¿Se puede separar en otra tabla? | ¿Es necesario? | Se mantendrá el campo | | COMPLETADO |
| OBS-16 | Referrals | diagnosis_id | No se solicitó | Para una interconsulta se necesita un diagnóstico | Se mantendrá el campo | DEC-11 | COMPLETADO |
| OBS-17 | Attentions | clinical_exam | No se solicitó | Correcto | Se eliminará el campo | DEC-34 | COMPLETADO |
| OBS-18 | Attentions | | Faltan los campos del Motivo de consulta | Revisar documento de requisitos | Se agregarán los campos illness_duration, onset_type y course | DEC-38 | COMPLETADO |
| OBS-19 | Attentions | | Faltan campos (o tabla) para Signos y Síntomas | Revisar documento de requisitos | Se creará la tabla SignsSymptoms | DEC-38 | COMPLETADO |
| OBS-20 | BioFunctions | type | ¿Se puede separar en otra tabla? | ¿Es necesario? | Se mantendrá el campo como ENUM | | COMPLETADO |
| OBS-21 | BioFunctions | status | El estado "Observado" fue reemplazado por "No evaluado" | Revisar documento de requisitos | Se renombrará el valor OBSERVADO a NO_EVALUADO | DEC-31 | COMPLETADO |
| OBS-22 | ExamItems | | ¿Dónde se almacenará la lista de exámenes auxiliares de la clínica? | Pendiente | Se agregará la tabla ExamTypes y se vinculará ExamItems mediante FK | DEC-36 | COMPLETADO |
| OBS-23 | PhysicalExams | observations | Las observaciones son para cada examen físico | Pendiente | Se creará la tabla PhysicalExamItems para observaciones por sistema | DEC-37 | COMPLETADO |
| OBS-24 | PhysicalExams | | ¿Cómo se almacena el estado (observado, conservado, diferido) para cada campo? | En BioFunctions se maneja de otra forma | Se creará la tabla PhysicalExamItems con estado por sistema | DEC-37 | COMPLETADO |
| OBS-25 | VitalSigns | | La cardinalidad con Attentions es incorrecta | Correcto, 1:1 | Se corregirá la cardinalidad | DEC-26 | COMPLETADO |
| OBS-26 | PathologicalHistories | observations | Se debe usar "especificaciones" | Es lo mismo, solo cambia en frontend | Se renombrará el campo a specifications | DEC-32 | COMPLETADO |
| OBS-27 | GynecologicalHistories | | Faltan campos | Revisar documento de requisitos | Se agregarán los campos gestations, parity, orientation, andria, isa y lsa | DEC-35 | COMPLETADO |
| OBS-28 | FamilyHistories | observations | Se debe usar "especificaciones" | Es lo mismo, solo cambia en frontend | Se renombrará el campo a specifications | DEC-32 | COMPLETADO |
| OBS-29 | FamilyHistories | | Falta campo Estado del familiar (vivo, fallecido) | Correcto | Se agregará el campo status | DEC-33 | COMPLETADO |
| OBS-30 | FamilyHistories | diagnosis_id | No se solicitó | Correcto | Se eliminará el campo | DEC-29 | COMPLETADO |
| OBS-31 | AllergyHistories | | Falta campo especificaciones | Se usará specifications | Se agregará el campo specifications | DEC-32 | COMPLETADO |
| OBS-32 | AllergyHistories | cie_code | ¿Qué es? ¿Cómo se obtiene? | ¿No iba a ser con cie_10? | Se renombrará el campo a cie_10 | DEC-24 | COMPLETADO |
