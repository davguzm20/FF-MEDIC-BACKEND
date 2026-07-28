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
| OBS-06 | Todas | | Las columnas con FK no están indexadas en PostgreSQL | Correcto | Se agregarán índices en todas las columnas con FK | DEC-15 |
| OBS-07 | health_metrics, gynecological_histories, prescription_items, referrals | | Las tablas health_metrics, gynecological_histories, prescription_items y referrals no tienen CHECK constraints para validar los datos | Correcto | Se agregarán CHECK constraints en health_metrics, gynecological_histories, prescription_items y referrals | DEC-16 |
| OBS-08 | Todas | updated_at | El campo updated_at no se actualiza automáticamente al modificar un registro | Correcto | Se creará la función update_updated_at_column y triggers BEFORE UPDATE en todas las tablas con updated_at | DEC-17 |
| OBS-09 | Todas | | La auditoría de cambios no está implementada a nivel de base de datos | Correcto | Se creará la función audit_trigger y triggers AFTER INSERT OR UPDATE OR DELETE en todas las tablas transaccionales | DEC-18 |
| OBS-10 | Todas | | Las tablas, columnas e índices no tienen comentarios descriptivos en PostgreSQL | Correcto | Se agregarán comentarios en todas las tablas, columnas e índices | DEC-19 |
| OBS-11 | | | No existen roles de base de datos con permisos granulares para la aplicación y la auditoría | Correcto | Se crearán ffmedic_app_user con CRUD sin acceso a audits y ffmedic_audit_user con solo SELECT | DEC-20 |
| OBS-12 | medicaments | created_at, updated_at | La tabla medicaments tiene created_at y updated_at pero es un catálogo que no requiere trazabilidad temporal | Correcto | Se eliminarán created_at y updated_at de medicaments | DEC-21 |
| OBS-13 | audits | ip | El tipo INET no es compatible con Neon | Correcto | Se cambiará ip de INET a VARCHAR(45) | DEC-22 |
| OBS-14 | active_ingredients | name | 100 caracteres es insuficiente para nombres compuestos de principios activos | Correcto | Se ampliará name de VARCHAR(100) a VARCHAR(250) | DEC-23 |
