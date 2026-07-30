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

Se mantuvieron 14 tipos enum. Se renombró `FAMILY_TYPE` a `RELATIONSHIP_TYPE` y se creó `ORIENTATION_TYPE`. Todos los valores están en español.

- **DOCUMENT_TYPE:** DNI, PASAPORTE, CE
- **SEX_TYPE:** M, F
- **ONSET_TYPE:** INSIDIOSO, BRUSCO
- **COURSE_TYPE:** PROGRESIVO, ESTACIONARIO, INTERMITENTE
- **DIAGNOSIS_TYPE:** PRESUNTIVO, DEFINITIVO, REPETITIVO
- **BIO_FUNCTION_TYPE:** SED, APETITO, SUEÑO, ESTADO_ANIMO, ORINA, DEPOSICIONES, VARIACION_PONDERAL
- **BIO_FUNCTION_STATUS:** AUMENTADO, DISMINUIDO, CONSERVADO, NO_EVALUADO
- **PHYSICAL_EXAM_SYSTEM:** ASPECTO_GENERAL, PIEL_FANERAS, CABEZA, CUELLO, TORAX_PULMONES, CARDIOVASCULAR, ABDOMEN, GENITOURINARIO, SOMA, SNC, OTRO
- **PHYSICAL_EXAM_STATUS:** CONSERVADO, OBSERVADO, DIFERIDO
- **RELATIONSHIP_TYPE:** PADRE, MADRE, HIJO, HERMANO, ABUELO, TIO, OTRO
- **FAMILY_STATUS:** VIVO, FALLECIDO
- **HISTORY_TYPE:** PATOLOGICO, QUIRURGICO
- **ORIENTATION_TYPE:** HETEROSEXUAL, HOMOSEXUAL, BISEXUAL, PANSEXUAL, ASEXUAL, OTRO, PREFIERE_NO_RESPONDER
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
- **physical_exams:** se eliminó la dependencia de `physical_exam_items`. Ahora tiene los campos `system`, `other`, `status` y `observations` directamente, con relación N:1 hacia attentions
- **exams:** sin cambios respecto a v0.1
- **exam_types:** sin cambios respecto a v0.1
- **exam_items:** sin cambios respecto a v0.1
- **prescriptions:** sin cambios respecto a v0.1
- **prescription_items:** sin cambios respecto a v0.1
- **prescription_diagnoses:** sin cambios respecto a v0.1
- **referrals:** sin cambios respecto a v0.1
- **clinical_histories:** se renombró desde `pathological_histories`. Sin cambios de estructura respecto a v0.1
- **family_histories:** se agregó el campo `other`. Sin otros cambios respecto a v0.1
- **gynecological_histories:** `menstrual_cycle` y `orientation` cambiaron de enum a texto libre. Se agregó el campo `other`
- **allergy_histories:** se eliminó el campo `type`
- **ram_histories:** se corrigió la cardinalidad a N:1 con patients
- **audits:** sin cambios respecto a v0.1

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

Se mantuvieron 14 tipos enum. Se eliminaron `MENSTRUAL_CYCLE_TYPE` y `ORIENTATION_TYPE`. Todos los valores están en español.

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

### Decisiones para la siguiente versión (v0.3)

- `DEC-15`: Se agregaron índices en todas las columnas con FK porque PostgreSQL no indexa las claves foráneas automáticamente. (OBS-06)

- `DEC-16`: Se agregaron CHECK constraints en health_metrics, gynecological_histories, prescription_items y referrals para validar los rangos de datos clínicos y reglas de negocio a nivel de base de datos. (OBS-07)

- `DEC-17`: Se creó la función update_updated_at_column y triggers BEFORE UPDATE en todas las tablas con updated_at, ya que el campo no se actualizaba automáticamente al modificar un registro. (OBS-08)

- `DEC-18`: Se creó la función audit_trigger y triggers AFTER INSERT OR UPDATE OR DELETE en todas las tablas transaccionales, dado que la auditoría de cambios no estaba implementada a nivel de base de datos. (OBS-09)

- `DEC-19`: Se agregaron comentarios en todas las tablas, columnas e índices para documentar su propósito en PostgreSQL. (OBS-10)

- `DEC-20`: Se crearon los roles de base de datos ffmedic_app_user con CRUD sin acceso a audits y ffmedic_audit_user con solo SELECT para establecer permisos granulares. (OBS-11)

- `DEC-21`: Se eliminaron created_at y updated_at de medicaments porque es un catálogo que no requiere trazabilidad temporal. (OBS-12)

- `DEC-22`: Se cambió ip de INET a VARCHAR(45) en audits, puesto que INET no es compatible con Neon. (OBS-13)

- `DEC-23`: Se amplió name de VARCHAR(100) a VARCHAR(250) en active_ingredients, ya que 100 caracteres es insuficiente para nombres compuestos de principios activos. (OBS-14)

- `DEC-24`: Se renombró exam_types a procedures y exam_type_id a procedure_id, ya que el nombre no es el término clínico adecuado para los procedimientos que almacena. (Implícito de DEC-93)

- `DEC-25`: Se agregaron type y category en procedures con UNIQUE compuesto sobre type, category y description, dado que la tabla necesitaba campos de agrupación para organizar los procedimientos. (Implícito de DEC-94)

- `DEC-26`: Se agregó user_id como FK a users en attentions con índice idx_attentions_user_id, porque la tabla no registraba el médico que realizó la atención. (Implícito de DEC-92)

---

## Modelo físico v0.3 - 06/07/2026

### Tablas

<details>
<summary>Ver más</summary>

Se mantuvieron 29 tablas. Se renombró `exam_types` a `procedures` con los campos adicionales `type` y `category`, y se agregó `user_id` en `attentions`. Se eliminaron `created_at` y `updated_at` de `medicaments`. Se amplió `name` en `active_ingredients` de VARCHAR(100) a VARCHAR(250). Se corrigió `ip` en `audits` de INET a VARCHAR(45).

- **patients:** sin cambios respecto a v0.2
- **roles:** sin cambios respecto a v0.2
- **users:** sin cambios respecto a v0.2
- **services:** sin cambios respecto a v0.2
- **diagnoses:** sin cambios respecto a v0.2
- **active_ingredients:** `name` ampliado de VARCHAR(100) a VARCHAR(250). Sin otros cambios respecto a v0.2
- **manufacturers:** sin cambios respecto a v0.2
- **dosage_forms:** sin cambios respecto a v0.2
- **medicaments:** se eliminaron `created_at` y `updated_at` porque es un catálogo que no requiere trazabilidad temporal. Sin otros cambios respecto a v0.2
- **medicaments_ingredients:** sin cambios respecto a v0.2
- **attentions:** se agregó `user_id` como INTEGER NOT NULL con FK a users e índice, para registrar el médico que realizó la atención
- **attention_diagnoses:** sin cambios respecto a v0.2
- **signs_symptoms:** sin cambios respecto a v0.2
- **health_metrics:** se agregaron 11 CHECK constraints para validar rangos de datos clínicos. Sin otros cambios respecto a v0.2
- **bio_functions:** sin cambios respecto a v0.2
- **physical_exams:** sin cambios respecto a v0.2
- **exams:** sin cambios respecto a v0.2
- **procedures:** renombrada desde `exam_types`. Se agregaron `type` VARCHAR(50) NOT NULL y `category` VARCHAR(100). La restricción UNIQUE ahora es compuesta sobre `type`, `category` y `description`
- **exam_items:** `exam_type_id` renombrado a `procedure_id` con FK a procedures e índice actualizado
- **prescriptions:** sin cambios respecto a v0.2
- **prescription_items:** se agregó CHECK constraint `ck_prescription_items_quantity` (quantity > 0). Sin otros cambios respecto a v0.2
- **prescription_diagnoses:** sin cambios respecto a v0.2
- **referrals:** se agregó CHECK constraint `ck_referrals_diagnosis_reason_exclusive` para la restricción XOR entre diagnosis_id y reason. Sin otros cambios respecto a v0.2
- **clinical_histories:** sin cambios respecto a v0.2
- **family_histories:** sin cambios respecto a v0.2
- **gynecological_histories:** se agregaron 4 CHECK constraints para validar menarche, gestations, parity y andria (>= 0). Sin otros cambios respecto a v0.2
- **allergy_histories:** sin cambios respecto a v0.2
- **ram_histories:** sin cambios respecto a v0.2
- **audits:** `ip` cambiado de INET a VARCHAR(45) por compatibilidad con Neon. Sin otros cambios respecto a v0.2

Se agregaron 28 índices en todas las columnas con FK para optimizar búsquedas y joins. Se crearon 2 funciones trigger (`update_updated_at_column` y `audit_trigger`) con 44 triggers asociados (16 BEFORE UPDATE + 28 AFTER INSERT OR UPDATE OR DELETE). Se agregaron comentarios descriptivos en todas las tablas, columnas e índices. Se crearon los roles de base de datos `ffmedic_app_user` con CRUD sin acceso a audits y `ffmedic_audit_user` con solo SELECT, con GRANTs y ALTER DEFAULT PRIVILEGES.

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

Se mantuvieron 14 tipos enum sin cambios respecto a v0.2. Todos los valores están en español.

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
### Decisiones para la siguiente versión (v0.4)

- `DEC-27`: Se cambió `isa` de DATE a VARCHAR(250) en `gynecological_histories`, debido a que la paciente puede no recordar la fecha exacta. (OBS-18)

- `DEC-28`: Se cambió `lsa` de DATE a VARCHAR(250) en `gynecological_histories`, debido a que la paciente puede no recordar la fecha exacta. (OBS-19)

- `DEC-29`: Se eliminó `parity` y su CHECK, y se crearon `term_births`, `preterm_births`, `abortions` y `living_children` como SMALLINT con CHECK de entero positivo de 2 cifras cada uno en `gynecological_histories`, ya que la fórmula obstétrica requiere almacenar cada valor por separado. (OBS-20)

- `DEC-30`: Se creó CHECK `sexual_partners` como entero positivo de 2 cifras en `gynecological_histories`, puesto que el número de parejas sexuales es un entero positivo de máximo dos cifras. (OBS-21)

- `DEC-31`: Se eliminaron la FK `diagnosis_id`, el CHECK `ck_referrals_diagnosis_reason_exclusive` y el índice `idx_referrals_diagnosis_id` en `referrals`, ya que el campo `diagnosis_id` fue eliminado del modelo lógico. (OBS-22)

- `DEC-32`: Se cambiaron a SMALLINT los campos `menarche`, `gestations`, `andria`, `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp` y `diastolic_bp` en `gynecological_histories` y `health_metrics` con sus respectivos CHECK constraints, dado que sus valores caben en 2 bytes y se optimiza el almacenamiento. (OBS-23)

---

## Modelo físico v0.4 - 25/07/2026

### Tablas

<details>
<summary>Ver más</summary>

Se mantuvieron 29 tablas. Se eliminó `signs_symptoms` (OBS-23) y se creó `responsible`. Se renombró `exam_types` a `procedures` con los campos adicionales `type` y `category`, y se agregó `user_id` en `attentions`. Se eliminaron `created_at` y `updated_at` de `medicaments`. Se amplió `name` en `active_ingredients` de VARCHAR(100) a VARCHAR(250). Se corrigió `ip` en `audits` de INET a VARCHAR(45).

- **patients:** sin cambios respecto a v0.2
- **roles:** sin cambios respecto a v0.2
- **users:** sin cambios respecto a v0.2
- **services:** sin cambios respecto a v0.2
- **diagnoses:** sin cambios respecto a v0.2
- **active_ingredients:** `name` ampliado de VARCHAR(100) a VARCHAR(250). Sin otros cambios respecto a v0.2
- **manufacturers:** sin cambios respecto a v0.2
- **dosage_forms:** sin cambios respecto a v0.2
- **medicaments:** se eliminaron `created_at` y `updated_at` porque es un catálogo que no requiere trazabilidad temporal. Sin otros cambios respecto a v0.2
- **medicaments_ingredients:** sin cambios respecto a v0.2
- **attentions:** se agregó `user_id` como INTEGER NOT NULL con FK a users e índice, para registrar el médico que realizó la atención
- **attention_diagnoses:** sin cambios respecto a v0.2
- **health_metrics:** se agregaron 11 CHECK constraints para validar rangos de datos clínicos. `spo2`, `heart_rate`, `respiratory_rate`, `systolic_bp` y `diastolic_bp` cambiaron de INTEGER a SMALLINT para optimizar almacenamiento (OBS-23)
- **bio_functions:** sin cambios respecto a v0.2
- **physical_exams:** sin cambios respecto a v0.2
- **exams:** sin cambios respecto a v0.2
- **procedures:** renombrada desde `exam_types`. Se agregaron `type` VARCHAR(50) NOT NULL y `category` VARCHAR(100). La restricción UNIQUE ahora es compuesta sobre `type`, `category` y `description`
- **exam_items:** `exam_type_id` renombrado a `procedure_id` con FK a procedures e índice actualizado
- **prescriptions:** sin cambios respecto a v0.2
- **prescription_items:** se agregó CHECK constraint `ck_prescription_items_quantity` (quantity > 0). Sin otros cambios respecto a v0.2
- **prescription_diagnoses:** sin cambios respecto a v0.2
- **referrals:** se eliminó `diagnosis_id`, su FK, el CHECK `ck_referrals_diagnosis_reason_exclusive` y el índice `idx_referrals_diagnosis_id`. `reason` ahora es NOT NULL obligatorio (OBS-22)
- **clinical_histories:** sin cambios respecto a v0.2
- **family_histories:** sin cambios respecto a v0.2
- **gynecological_histories:** se eliminó `parity` y se reemplazó por `term_births`, `preterm_births`, `abortions` y `living_children` como SMALLINT con CHECK de 2 cifras (OBS-20). `menarche`, `gestations` y `sexual_partners` (antes `andria`) cambiaron a SMALLINT con CHECK (OBS-21, OBS-23). `isa` y `lsa` cambiaron de DATE a VARCHAR(250) (OBS-18, OBS-19). `orientation` cambió de VARCHAR(50) a enum ORIENTATION_TYPE con campo `orientation_other`. `other` renombrado a `contraceptive_method_other`
- **allergy_histories:** sin cambios respecto a v0.2
- **ram_histories:** sin cambios respecto a v0.2
- **responsible:** nueva. Almacena los datos del responsable del paciente con `name`, `paternal_surname`, `maternal_surname`, `relationship` (RELATIONSHIP_TYPE), `relationship_other` y `phone`. Relación 1:1 con attentions (UNIQUE attention_id). Se agregaron BEFORE UPDATE y AFTER trigger para auditoría
- **audits:** `ip` cambiado de INET a VARCHAR(45) por compatibilidad con Neon. Sin otros cambios respecto a v0.2

Se actualizaron los índices en todas las columnas con FK para optimizar búsquedas y joins. Se crearon 2 funciones trigger (`update_updated_at_column` y `audit_trigger`) con triggers BEFORE UPDATE y AFTER INSERT OR UPDATE OR DELETE en todas las tablas transaccionales. Se agregaron comentarios descriptivos en todas las tablas, columnas e índices. Se crearon los roles de base de datos `ffmedic_app_user` con CRUD sin acceso a audits y `ffmedic_audit_user` con solo SELECT, con GRANTs y ALTER DEFAULT PRIVILEGES.

</details>

### Enumeraciones

<details>
<summary>Ver más</summary>

Se mantuvieron 14 tipos enum sin cambios respecto a v0.2. Todos los valores están en español.

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
