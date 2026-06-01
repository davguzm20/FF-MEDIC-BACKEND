# Endpoints de la API F&F-MEDIC

**Versión:** 0.2

## Especificaciones Generales

- **Tipo:** REST
- **Autenticación:** JWT (Bearer token)

---

## Módulo de Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/logout` | Cerrar sesión |
| POST | `/auth/forgot-password` | Solicitar recuperación de contraseña |
| POST | `/auth/reset-password` | Restablecer contraseña |

---

## Módulo de Pacientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/patients` | Listar pacientes |
| GET | `/patients/search` | Buscar pacientes |
| POST | `/patients` | Registrar paciente |
| GET | `/patients/:id` | Visualizar datos del paciente |
| PATCH | `/patients/:id` | Actualizar datos del paciente |
| GET | `/patients/:id/clinical-history` | Obtener historia clínica completa (paciente + antecedentes + métricas de salud + atenciones) |
| POST | `/patients/:id/pathological-histories` | Registrar antecedente patológico/quirúrgico |
| DELETE | `/patients/:id/pathological-histories/:hid` | Eliminar antecedente patológico |
| POST | `/patients/:id/family-histories` | Registrar antecedente familiar |
| DELETE | `/patients/:id/family-histories/:hid` | Eliminar antecedente familiar |
| POST | `/patients/:id/gynecological-histories` | Registrar antecedente ginecológico |
| DELETE | `/patients/:id/gynecological-histories/:hid` | Eliminar antecedente ginecológico |
| POST | `/patients/:id/allergy-histories` | Registrar alergia |
| DELETE | `/patients/:id/allergy-histories/:hid` | Eliminar alergia |
| POST | `/patients/:id/ram-histories` | Registrar reacción adversa a medicamentos |
| DELETE | `/patients/:id/ram-histories/:hid` | Eliminar reacción adversa |

---

## Módulo de Atención Médica

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/patients/:id/attentions` | Crear atención completa |
| GET | `/patients/:id/attentions` | Listar atenciones del paciente |
| GET | `/attentions/:id` | Ver detalle completo de la atención |
| PATCH | `/attentions/:id` | Actualizar atención |

### Catálogos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/services` | Listar servicios/especialidades |
| GET | `/diagnoses` | Listar diagnósticos CIE-10 |
| GET | `/medicaments` | Listar medicamentos |
| GET | `/active-ingredients` | Listar principios activos |
| GET | `/exam-types` | Listar tipos de examen |

---

## Módulo de Reportes y Documentos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/attentions/:id/prescriptions/:pid/pdf` | Descargar receta médica |
| GET | `/attentions/:id/exams/:eid/pdf` | Descargar orden de exámenes auxiliares |
| GET | `/attentions/:id/referrals/:rid/pdf` | Descargar orden de interconsulta |

---

## Módulo de Estadísticas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/stats/overview` | Total pacientes, atenciones, atenciones hoy, tiempo promedio |
| GET | `/stats/patients-by-sex` | Distribución de pacientes por sexo |
| GET | `/stats/patients-by-age` | Distribución de pacientes por grupo etario |
| GET | `/stats/attentions-by-date` | Distribución de atenciones por fecha |
