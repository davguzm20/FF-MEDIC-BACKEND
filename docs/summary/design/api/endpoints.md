# Endpoints de la API F&F-MEDIC

**Versión:** 0.3

## Especificaciones Generales

- **Tipo:** REST
- **Autenticación:** JWT (Bearer token)

---
## Health
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/health` | Verificar estado del servidor |
---

## Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | Iniciar sesión |
| POST | `/api/v1/auth/logout` | Cerrar sesión |
| POST | `/api/v1/auth/refresh` | Renovar token de acceso |
| POST | `/api/v1/auth/forgot-password` | Solicitar restablecimiento de contraseña |
| POST | `/api/v1/auth/reset-password` | Restablecer contraseña |
---

## Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/users` | Crear usuario |
| GET | `/api/v1/users` | Listar usuarios |
| GET | `/api/v1/users/{id}` | Obtener usuario por ID |
| PATCH | `/api/v1/users/{id}` | Actualizar usuario |
| DELETE | `/api/v1/users/{id}` | Eliminar usuario |
---

## Roles

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/roles` | Crear rol |
| GET | `/api/v1/roles` | Listar roles |
| GET | `/api/v1/roles/{id}` | Obtener rol por ID |
| PATCH | `/api/v1/roles/{id}` | Actualizar rol |
| DELETE | `/api/v1/roles/{id}` | Eliminar rol |
---

## Pacientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/patients` | Crear paciente |
| GET | `/api/v1/patients` | Listar pacientes |
| GET | `/api/v1/patients/{id}` | Obtener paciente por ID |
| PATCH | `/api/v1/patients/{id}` | Actualizar paciente |
| DELETE | `/api/v1/patients/{id}` | Eliminar paciente |
| GET | `/api/v1/patients/{id}/attentions` | Listar atenciones de paciente |
| GET | `/api/v1/patients/{id}/histories` | Obtener historias clínicas de paciente |
---

## Atenciones Médicas

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/attentions` | Crear atención médica |
| GET | `/api/v1/attentions` | Listar atenciones  |
| GET | `/api/v1/attentions/{id}` | Obtener atención por ID |
| PATCH | `/api/v1/attentions/{id}` | Actualizar atención médica |
| DELETE | `/api/v1/attentions/{id}` | Eliminar atención médica |

## Servicios

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/services` | Crear servicio |
| GET | `/api/v1/services` | Listar servicios |
| GET | `/api/v1/services/{id}` | Obtener servicio por ID |
| PATCH | `/api/v1/services/{id}` | Actualizar servicio |
| DELETE | `/api/v1/services/{id}` | Eliminar servicio |
---
## Diagnósticos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/diagnoses` | Crear diagnóstico |
| GET | `/api/v1/diagnoses` | Buscar diagnósticos por texto |
| GET | `/api/v1/diagnoses/{id}` | Obtener diagnóstico por ID |
| PATCH | `/api/v1/diagnoses/{id}` | Actualizar diagnóstico |
| DELETE | `/api/v1/diagnoses/{id}` | Eliminar diagnóstico |
---
## Principios Activos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/active-ingredients` | Crear principio activo |
| GET | `/api/v1/active-ingredients` | Buscar principios activos por texto |
| GET | `/api/v1/active-ingredients/{id}` | Obtener principio activo por ID |
| PATCH | `/api/v1/active-ingredients/{id}` | Actualizar principio activo |
| DELETE | `/api/v1/active-ingredients/{id}` | Eliminar principio activo |
---
## Procedimientos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/procedures` | Crear procedimiento |
| GET | `/api/v1/procedures` | Buscar procedimientos por texto |
| GET | `/api/v1/procedures/{id}` | Obtener procedimiento por ID |
| PATCH | `/api/v1/procedures/{id}` | Actualizar procedimiento |
| DELETE | `/api/v1/procedures/{id}` | Eliminar procedimiento |
---
## Medicamentos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/medicaments` | Crear medicamento |
| GET | `/api/v1/medicaments` | Buscar medicamentos por texto |
| GET | `/api/v1/medicaments/{id}` | Obtener medicamento por ID |
| PATCH | `/api/v1/medicaments/{id}` | Actualizar medicamento |
| DELETE | `/api/v1/medicaments/{id}` | Eliminar medicamento |
---
## Fabricantes

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/manufacturers` | Crear fabricante |
| GET | `/api/v1/manufacturers` | Listar fabricantes |
| GET | `/api/v1/manufacturers/{id}` | Obtener fabricante por ID |
| PATCH | `/api/v1/manufacturers/{id}` | Actualizar fabricante |
| DELETE | `/api/v1/manufacturers/{id}` | Eliminar fabricante |
---
## Formas Farmacéuticas

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/dosage-forms` | Crear forma farmacéutica |
| GET | `/api/v1/dosage-forms` | Listar formas farmacéuticas |
| GET | `/api/v1/dosage-forms/{id}` | Obtener forma farmacéutica por ID |
| PATCH | `/api/v1/dosage-forms/{id}` | Actualizar forma farmacéutica |
| DELETE | `/api/v1/dosage-forms/{id}` | Eliminar forma farmacéutica |
---

## Estadísticas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/stats` | Obtener estadísticas de atenciones y pacientes | 
