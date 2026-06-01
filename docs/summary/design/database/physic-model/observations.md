# Observaciones del modelo físico F&F-MEDIC

## Sesión 28/05/2026

| Código | Tabla | Campo | Observación | Respuesta | Conclusión | Decisión |
|---|---|---|---|---|---|---|
| OBS-01 | patients | document_number | El número de documento puede tener hasta 20 caracteres (DNI: 8, CE: hasta 12) | Correcto | Se ampliará el campo de 15 a 20 caracteres | DEC-01 |
| OBS-02 | patients, users | paternal_surname, maternal_surname | 100 caracteres es demasiado para un apellido en patients y users | Correcto | Se reducirán los campos de 100 a 50 caracteres | DEC-02 |
| OBS-03 | users | cmp_code | El código CMP tiene 6 dígitos | Correcto | Se reducirá el campo de 20 a 10 caracteres | DEC-03 |
| OBS-04 | users | email | RFC dice que el máximo es 254 caracteres | Correcto | Se ajustará el campo de 250 a 254 caracteres | DEC-04 |
| OBS-05 | attentions | illness_duration | 100 caracteres es demasiado para «3 días» o «2 semanas» | Correcto | Se reducirá el campo de 100 a 50 caracteres | DEC-05 |
