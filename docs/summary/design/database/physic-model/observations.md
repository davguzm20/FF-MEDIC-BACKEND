# Observaciones del modelo físico F&F-MEDIC

## Sesión 28/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-01 | patients | document_number | El número de documento puede tener hasta 20 caracteres (DNI: 8, CE: hasta 12) | Correcto | Se ampliará el campo de 15 a 20 caracteres | DEC-01 |
| OBS-02 | patients, users | paternal_surname, maternal_surname | 100 caracteres es demasiado para un apellido en patients y users | Correcto | Se reducirán los campos de 100 a 50 caracteres | DEC-02 |
| OBS-03 | users | cmp_code | El código CMP tiene 6 dígitos | Correcto | Se reducirá el campo de 20 a 10 caracteres | DEC-03 |
| OBS-04 | users | email | RFC dice que el máximo es 254 caracteres | Correcto | Se ajustará el campo de 250 a 254 caracteres | DEC-04 |
| OBS-05 | attentions | illness_duration | 100 caracteres es demasiado para «3 días» o «2 semanas» | Correcto | Se reducirá el campo de 100 a 50 caracteres | DEC-05 |

---

## Sesión 06/07/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-06 | Todas | | Las columnas con FK no están indexadas en PostgreSQL | Correcto | Se agregarán índices en todas las columnas con FK | DEC-06 |
| OBS-07 | health_metrics, gynecological_histories, prescription_items, referrals | | Las tablas health_metrics, gynecological_histories, prescription_items y referrals no tienen CHECK constraints para validar los datos | Correcto | Se agregarán CHECK constraints en health_metrics, gynecological_histories, prescription_items y referrals | DEC-07 |
| OBS-08 | Todas | updated_at | El campo updated_at no se actualiza automáticamente al modificar un registro | Correcto | Se creará la función update_updated_at_column y triggers BEFORE UPDATE en todas las tablas con updated_at | DEC-08 |
| OBS-09 | Todas | | La auditoría de cambios no está implementada a nivel de base de datos | Correcto | Se creará la función audit_trigger y triggers AFTER INSERT OR UPDATE OR DELETE en todas las tablas transaccionales | DEC-09 |
| OBS-10 | Todas | | Las tablas, columnas e índices no tienen comentarios descriptivos en PostgreSQL | Correcto | Se agregarán comentarios en todas las tablas, columnas e índices | DEC-10 |
| OBS-11 | | | No existen roles de base de datos con permisos granulares para la aplicación y la auditoría | Correcto | Se crearán ffmedic_app_user con CRUD sin acceso a audits y ffmedic_audit_user con solo SELECT | DEC-11 |
| OBS-12 | medicaments | created_at, updated_at | La tabla medicaments tiene created_at y updated_at pero es un catálogo que no requiere trazabilidad temporal | Correcto | Se eliminarán created_at y updated_at de medicaments | DEC-12 |
| OBS-13 | audits | ip | El tipo INET no es compatible con Neon | Correcto | Se cambiará ip de INET a VARCHAR(45) | DEC-13 |
| OBS-14 | active_ingredients | name | 100 caracteres es insuficiente para nombres compuestos de principios activos | Correcto | Se ampliará name de VARCHAR(100) a VARCHAR(250) | DEC-14 |

---

## Sesión 25/07/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-18 | gynecological_histories | isa | El campo isa debe cambiar de DATE a VARCHAR(250) | Correcto | Se cambiará isa de DATE a VARCHAR(250) | DEC-18 |
| OBS-19 | gynecological_histories | lsa | El campo lsa debe cambiar de DATE a VARCHAR(250) | Correcto | Se cambiará lsa de DATE a VARCHAR(250) | DEC-19 |
| OBS-20 | gynecological_histories | parity | El campo parity INTEGER se debe eliminar y reemplazar por 4 campos SMALLINT con CHECK de entero positivo de 2 cifras | Correcto | Se eliminará parity y su CHECK, y se crearán term_births, preterm_births, abortions y living_children como SMALLINT con CHECK de entero positivo de 2 cifras cada uno | DEC-20 |
| OBS-21 | gynecological_histories | sexual_partners | El nuevo campo sexual_partners debe tener CHECK de entero positivo de 2 cifras | Correcto | Se creará CHECK sexual_partners como entero positivo de 2 cifras | DEC-21 |
| OBS-22 | referrals | diagnosis_id | La FK diagnosis_id, el CHECK XOR y el índice deben eliminarse al quitar el campo | Correcto | Se eliminarán la FK diagnosis_id, el CHECK ck_referrals_diagnosis_reason_exclusive y el índice idx_referrals_diagnosis_id | DEC-22 |
| OBS-23 | gynecological_histories, health_metrics | menarche, gestations, andria, spo2, heart_rate, respiratory_rate, systolic_bp, diastolic_bp | Estos 8 campos son enteros positivos de máximo dos cifras y usan INTEGER | Correcto | Se cambiarán a SMALLINT con sus respectivos CHECK constraints | DEC-23 |
| OBS-24 | patients | name, paternal_surname, maternal_surname, document_number | La búsqueda de pacientes por coincidencia parcial (ILIKE) hace full scan; no hay índices trigram | Correcto | Se agregarán índices GIN con opclass gin_trgm_ops en los 4 campos | DEC-24 |
| OBS-25 | active_ingredients, manufacturers, dosage_forms, medicaments | name, concentration | La búsqueda de medicamentos por coincidencia parcial (ILIKE) hace full scan; no hay índices trigram en name ni concentration | Correcto | Se agregarán índices GIN con opclass gin_trgm_ops en name de active_ingredients, manufacturers y dosage_forms, y en name y concentration de medicaments | DEC-25 |

## Sesión 22/08/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|--------|-------|-------|-------------|-----------|------------|----------|
| OBS-26 | allergy_histories | diagnosis_id | La FK diagnosis_id y su índice deben eliminarse al quitar el campo | Correcto | Se eliminará la FK y el índice de diagnosis_id | DEC-26 |
| OBS-27 | ram_histories | active_ingredient_id, diagnosis_id | Las FKs active_ingredient_id y diagnosis_id y sus índices deben eliminarse al quitar los campos | Correcto | Se eliminarán las FKs y los índices de active_ingredient_id y diagnosis_id | DEC-27 |
| OBS-28 | clinical_histories | diagnosis_id | El campo diagnosis_id debe volverse nullable y el enum HISTORY_TYPE debe agregar ALERGIA | Correcto | Se alterará diagnosis_id a nullable y se agregará ALERGIA al enum history_type | DEC-28 |
| OBS-29 | roles | | La tabla roles se elimina ya que los roles se manejarán mediante enum USER_ROLE | Correcto | Se eliminará la tabla roles quitando PK, UNIQUE, triggers, y la FK e índice en users | DEC-29 |
| OBS-30 | users | role_id | La FK role_id se elimina y se reemplaza por columna role tipo enum USER_ROLE | Correcto | Se creará enum USER_ROLE se alterará users agregando role se backfillará data y se eliminará role_id y la FK | DEC-30 |
