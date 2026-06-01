# Evolución del modelo físico F&F-MEDIC

## Modelo físico v0.1 - 27/05/2026

Modelo físico inicial construido a partir del modelo lógico v0.4.

### Tablas

<details>
<summary>Ver más</summary>

Se crearon 28 tablas. Cada tabla usa un identificador autoincrementable como clave primaria y marcas de tiempo con zona horaria para los campos de auditoría. Las tablas transaccionales incluyen fecha de creación y de actualización, mientras que las tablas de solo inserción solo tienen fecha de creación.

- **patients:** almacena los datos del paciente con tipo y número de documento, nombres, sexo, teléfono y fecha de nacimiento
- **roles:** catálogo de roles del sistema
- **users:** usuarios del sistema vinculados a roles con datos personales del médico, credenciales y correo electrónico
- **services:** catálogo de servicios médicos disponibles
- **diagnoses:** catálogo de diagnósticos CIE-10 con código y descripción
- **active_ingredients:** catálogo de principios activos de medicamentos
- **medicaments:** catálogo de medicamentos vinculados a un principio activo con concentración y forma farmacéutica
- **attentions:** atenciones médicas vinculadas a paciente y servicio con motivo de consulta, enfermedad actual y plan de trabajo
- **attention_diagnoses:** diagnósticos asociados a una atención con tipo de diagnóstico
- **signs_symptoms:** signos y síntomas registrados en cada atención
- **health_metrics:** métricas de salud por atención: temperatura, saturación, frecuencia cardiaca, frecuencia respiratoria, presión arterial, HGT, hemoglobina, peso y perímetro abdominal. Relación uno a uno con attentions
- **somatometries:** talla del paciente. Relación uno a uno con patients
- **bio_functions:** funciones biológicas evaluadas por atención
- **physical_exams:** vincula el examen físico con la atención. Los detalles se almacenan en physical_exam_items
- **physical_exam_items:** evaluación de cada sistema corporal con estado y observaciones
- **exams:** solicitudes de exámenes auxiliares por atención
- **exam_types:** catálogo de tipos de examen
- **exam_items:** exámenes solicitados vinculados a un tipo
- **prescriptions:** recetas médicas por atención
- **prescription_items:** medicamentos recetados con cantidad e indicaciones
- **prescription_diagnoses:** relación entre ítems de receta y diagnósticos
- **referrals:** interconsultas derivadas a otros servicios
- **pathological_histories:** antecedentes patológicos y quirúrgicos del paciente
- **family_histories:** antecedentes familiares con tipo de familiar y estado
- **gynecological_histories:** antecedentes ginecológicos de la paciente
- **allergy_histories:** alergias del paciente codificadas con CIE-10
- **ram_histories:** reacciones adversas a medicamentos
- **audits:** registro de auditoría para operaciones de inserción, modificación y eliminación

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

Se definieron 16 tipos enum en PostgreSQL para campos con valores fijos. Los valores estaban en inglés.

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **FAMILY_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **CONTRACEPTIVE_METHOD:** NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO
- **ACTION_TYPE:** INSERTAR, ACTUALIZAR, ELIMINAR

</details>

### Decisiones para la siguiente versión (v0.2)

- `DEC-01`: Se amplió el campo `document_number` de 15 a 20 caracteres en `patients`, ya que el número de documento puede tener hasta 20 caracteres (DNI: 8, CE: hasta 12). (OBS-01)

- `DEC-02`: Se redujeron los campos `paternal_surname` y `maternal_surname` de 100 a 50 caracteres en `patients` y `users`, porque 100 caracteres es demasiado para un apellido. (OBS-02)

- `DEC-03`: Se redujo el campo `cmp_code` de 20 a 10 caracteres en `users`, dado que el código CMP tiene 6 dígitos. (OBS-03)

- `DEC-04`: Se ajustó el campo `email` de 250 a 254 caracteres en `users`, puesto que el RFC especifica que el máximo es 254. (OBS-04)

- `DEC-05`: Se redujo el campo `illness_duration` de 100 a 50 caracteres en `attentions`, porque 100 caracteres es demasiado para valores como «3 días» o «2 semanas». (OBS-05)

- `DEC-06`: Se eliminó la tabla `physical_exam_items` y se refactorizó `physical_exams` con los campos `system`, `status` y `observations` y relación N:1 hacia `attentions`, puesto que cada examen físico debe tener un sistema por fila como `bio_functions`.

- `DEC-07`: Se creó la tabla `medicaments_ingredients` como relación N:M entre `medicaments` y `active_ingredients`, debido a que un medicamento puede tener varios principios activos.

- `DEC-08`: Se crearon las tablas `manufacturers` y `dosage_forms` y se agregaron los campos `name`, `manufacturer_id` y `dosage_form_id` en `medicaments`, reemplazando el campo `form`, dado que la marca y la forma farmacéutica deben estar normalizadas.

- `DEC-09`: Se tradujeron todos los valores de los enums a español, ya que el sistema se usa en Perú.

- `DEC-10`: Se agregó el valor `OTRO` al enum `FAMILY_TYPE`, puesto que pueden aparecer tipos de familiar no contemplados.

- `DEC-11`: Se eliminaron los enums `MENSTRUAL_CYCLE_TYPE` y `ORIENTATION_TYPE` y se reemplazaron por campos de texto libre, dado que ambos tienen demasiadas variantes para un listado fijo.

- `DEC-12`: Se eliminó el campo `type` en `allergy_histories`, debido a que las reacciones adversas tienen su propia tabla y el discriminador ya no es necesario.

- `DEC-13`: Se eliminó la tabla `somatometries` y se agregó el campo `height` como `DECIMAL(5,2) NOT NULL` en `health_metrics` con CHECK (height > 0), ya que la talla es un dato de salud que se mide en cada atención. (Implícito de DEC-80)

- `DEC-14`: Se agregaron los campos `created_at` y `updated_at` como `TIMESTAMPTZ NOT NULL DEFAULT NOW()` en `users`, porque es necesario mantener consistencia con el estándar de auditoría temporal del resto del modelo. (Implícito de DEC-83)

---

## Modelo físico v0.2 - 28/05/2026

Modelo físico actualizado a partir del modelo lógico v0.5.

### Tablas

<details>
<summary>Ver más</summary>

Se mantuvieron 27 tablas, se agregaron 3 nuevas y se eliminó 1, dando un total de 29 tablas. Se eliminó `physical_exam_items` y `somatometries`, y se crearon `manufacturers`, `dosage_forms` y `medicaments_ingredients` (relación N:M).

- **patients:** mismos campos que v0.1 con `document_number` de 20 caracteres, `paternal_surname` y `maternal_surname` de 50 caracteres
- **roles:** sin cambios respecto a v0.1
- **users:** mismos campos que v0.1 con `paternal_surname` y `maternal_surname` de 50 caracteres, `cmp_code` de 10 caracteres, `email` de 254 caracteres. Se agregaron `created_at` y `updated_at` como TIMESTAMPTZ
- **services:** sin cambios respecto a v0.1
- **diagnoses:** sin cambios respecto a v0.1
- **active_ingredients:** sin cambios respecto a v0.1
- **manufacturers:** nueva. Almacena el fabricante del medicamento con `name` e `is_active`
- **dosage_forms:** nueva. Almacena la forma farmacéutica con `name` e `is_active`
- **medicaments:** se agregaron `name`, `manufacturer_id` (FK a manufacturers) y `dosage_form_id` (FK a dosage_forms). Se eliminaron `form` y `description`. Relación N:M con active_ingredients mediante medicaments_ingredients
- **medicaments_ingredients:** nueva. Relación N:M entre medicaments y active_ingredients
- **attentions:** mismos campos que v0.1 con `illness_duration` de 50 caracteres
- **attention_diagnoses:** sin cambios respecto a v0.1
- **signs_symptoms:** sin cambios respecto a v0.1
- **health_metrics:** se agregó `height` como DECIMAL(5,2) NOT NULL. Relación uno a uno con attentions
- **bio_functions:** sin cambios de estructura. Se agregó restricción unique por tipo por atención
- **physical_exams:** se eliminó la dependencia de `physical_exam_items`. Ahora tiene los campos `system`, `status` y `observations` directamente, con relación N:1 hacia attentions
- **exams:** sin cambios respecto a v0.1
- **exam_types:** sin cambios respecto a v0.1
- **exam_items:** sin cambios respecto a v0.1
- **prescriptions:** sin cambios respecto a v0.1
- **prescription_items:** sin cambios respecto a v0.1
- **prescription_diagnoses:** sin cambios respecto a v0.1
- **referrals:** sin cambios respecto a v0.1
- **pathological_histories:** sin cambios respecto a v0.1
- **family_histories:** sin cambios respecto a v0.1
- **gynecological_histories:** `menstrual_cycle` y `orientation` cambiaron de enum a texto libre
- **allergy_histories:** se eliminó el campo `type`
- **ram_histories:** se corrigió la cardinalidad a N:1 con patients
- **audits:** sin cambios respecto a v0.1

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

Se mantuvieron 14 tipos enum. Se eliminaron `MENSTRUAL_CYCLE_TYPE` y `ORIENTATION_TYPE`. Todos los valores están en español.

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CARNE_DE_EXTRANJERIA
- **SEX_TYPE:** MASCULINO, FEMENINO
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **FAMILY_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **CONTRACEPTIVE_METHOD:** NINGUNO, AOC, INYECTABLE, IMPLANTE, DIU, PRESERVATIVO, LIGADURA, VASECTOMIA, OTRO
- **ACTION_TYPE:** INSERTAR, ACTUALIZAR, ELIMINAR

</details>
