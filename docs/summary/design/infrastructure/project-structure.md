# Estructura de Carpetas

**Versión:** 0.5

## Árbol de directorios

```
ff-medic-backend/
├── prisma/
│   ├── schema.prisma
│   ├── prisma.config.ts
│   └── seeds/
│       ├── index.ts
│       ├── roles.seed.ts
│       ├── services.seed.ts
│       └── users.seed.ts
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── common.module.ts
│   │   ├── validators/
│   │   │   └── valid-document-number.validator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   ├── mail/
│   │   │   └── mail.module.ts
│   │   └── redis/
│   │       └── redis.module.ts
│   ├── config/
│   │   ├── env.config.ts
│   │   └── cors.config.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── prisma.service.ts
│   └── features/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── jwt/
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── strategies/
│       │   │   │   ├── jwt.strategy.ts
│       │   │   │   └── jwt-refresh.strategy.ts
│       │   │   ├── guards/
│       │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   └── roles.guard.ts
│       │   │   ├── decorators/
│       │   │   │   ├── current-user.decorator.ts
│       │   │   │   ├── match-field.decorator.ts
│       │   │   │   └── roles.decorator.ts
│       │   │   └── dtos/
│       │   │       ├── login.request.ts
│       │   │       ├── login.response.ts
│       │   │       ├── refresh-token.request.ts
│       │   │       ├── forgot-password.request.ts
│       │   │       └── reset-password.request.ts
│       │   ├── user/
│       │   │   ├── user.module.ts
│       │   │   ├── user.controller.ts
│       │   │   ├── user.service.ts
│       │   │   ├── user.repository.ts
│       │   │   ├── user.mapper.ts
│       │   │   ├── user.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-user.request.ts
│       │   │       ├── update-user.request.ts
│       │   │       └── user.response.ts
│       │   └── role/
│       │       ├── role.module.ts
│       │       ├── role.controller.ts
│       │       ├── role.service.ts
│       │       ├── role.repository.ts
│       │       ├── role.mapper.ts
│       │       ├── role.entity.ts
│       │       └── dtos/
│       │           ├── create-role.request.ts
│       │           ├── update-role.request.ts
│       │           └── role.response.ts
│       │
│       ├── patients/
│       │   ├── patients.module.ts
│       │   ├── patient/
│       │   │   ├── patient.module.ts
│       │   │   ├── patient.controller.ts
│       │   │   ├── patient.service.ts
│       │   │   ├── patient.repository.ts
│       │   │   ├── patient.mapper.ts
│       │   │   ├── patient.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-patient.request.ts
│       │   │       ├── create-complete-patient.request.ts
│       │   │       ├── update-patient.request.ts
│       │   │       ├── update-complete-patient.request.ts
│       │   │       ├── patient.response.ts
│       │   │       └── complete-patient.response.ts
│       │   ├── clinical-history/
│       │   │   ├── clinical-history.module.ts
│       │   │   ├── clinical-history.service.ts
│       │   │   ├── clinical-history.repository.ts
│       │   │   ├── clinical-history.mapper.ts
│       │   │   ├── clinical-history.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-clinical-history.request.ts
│       │   │       └── update-clinical-history.request.ts
│       │   ├── family-history/
│       │   │   ├── family-history.module.ts
│       │   │   ├── family-history.service.ts
│       │   │   ├── family-history.repository.ts
│       │   │   ├── family-history.mapper.ts
│       │   │   ├── family-history.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-family-history.request.ts
│       │   │       └── update-family-history.request.ts
│       │   ├── gynecological-history/
│       │   │   ├── gynecological-history.module.ts
│       │   │   ├── gynecological-history.service.ts
│       │   │   ├── gynecological-history.repository.ts
│       │   │   ├── gynecological-history.mapper.ts
│       │   │   ├── gynecological-history.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-gynecological-history.request.ts
│       │   │       └── update-gynecological-history.request.ts
│       │   ├── allergy-history/
│       │   │   ├── allergy-history.module.ts
│       │   │   ├── allergy-history.service.ts
│       │   │   ├── allergy-history.repository.ts
│       │   │   ├── allergy-history.mapper.ts
│       │   │   ├── allergy-history.entity.ts
│       │   │   └── dtos/
│       │   │       ├── create-allergy-history.request.ts
│       │   │       └── update-allergy-history.request.ts
│       │   └── ram-history/
│       │       ├── ram-history.module.ts
│       │       ├── ram-history.service.ts
│       │       ├── ram-history.repository.ts
│       │       ├── ram-history.mapper.ts
│       │       ├── ram-history.entity.ts
│       │       └── dtos/
│       │           ├── create-ram-history.request.ts
│       │           └── update-ram-history.request.ts
│       │
│       ├── medicaments/          ← Pendiente (mismo patrón)
│       ├── attentions/           ← Pendiente (mismo patrón)
│       ├── orders/               ← Pendiente (mismo patrón)
│       ├── documents/            ← Pendiente
│       └── statistics/           ← Pendiente
│
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
├── test/
│   ├── setup.ts
│   └── unit/
│       └── features/
│           ├── auth/
│           │   ├── jwt/
│           │   │   ├── controllers/
│           │   │   ├── services/
│           │   │   ├── strategies/
│           │   │   ├── guards/
│           │   │   └── decorators/
│           │   ├── user/
│           │   │   ├── controllers/
│           │   │   ├── services/
│           │   │   ├── repositories/
│           │   │   └── mappers/
│           │   └── role/
│           │       ├── controllers/
│           │       ├── services/
│           │       ├── repositories/
│           │       └── mappers/
│           └── patients/
│               ├── patient/
│               │   ├── controllers/
│               │   ├── services/
│               │   ├── repositories/
│               │   └── mappers/
│               ├── clinical-history/   (same structure)
│               ├── family-history/     (same structure)
│               ├── gynecological-history/ (same structure)
│               ├── allergy-history/    (same structure)
│               └── ram-history/        (same structure)
├── .env
├── .env.example
├── .prettierrc
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

## prisma/

Define el modelo de datos y los scripts de inicialización. `schema.prisma` contiene 35 modelos y 14 enums de PostgreSQL. `prisma.config.ts` configura la URL de conexión desde `DATABASE_URL` via `dotenv` (requerido por Prisma 7).

| Archivo | Contenido |
|---|---|
| schema.prisma | Modelo de datos completo (35 modelos, 14 enums) |
| prisma.config.ts | Configuración de Prisma 7 con datasource desde env |
| seeds/index.ts | Orchestrador de seeds |
| seeds/roles.seed.ts | Roles del sistema |
| seeds/services.seed.ts | Servicios del consultorio |
| seeds/users.seed.ts | Usuario administrador inicial |

## src/common/

Recursos transversales compartidos por todos los módulos.

| Archivo | Propósito |
|---|---|
| validators/valid-document-number.validator.ts | Valida DNI (8 díg), CE (9 díg), PASAPORTE (alfanumérico 6-20) |
| filters/http-exception.filter.ts | Unifica el formato de errores HTTP |
| interceptors/transform.interceptor.ts | Envuelve respuestas exitosas en formato estándar |
| mail/mail.module.ts | Módulo SendGrid para envío de emails |
| redis/redis.module.ts | Módulo Redis (Upstash) para caché/blacklist |

## src/config/

| Archivo | Propósito |
|---|---|
| env.config.ts | Valida y expone variables de entorno tipadas |
| cors.config.ts | Configura orígenes permitidos según entorno |

## src/database/

| Archivo | Propósito |
|---|---|
| database.module.ts | Declara PrismaService como proveedor global |
| prisma.service.ts | Extiende PrismaClient con driver adapter (PrismaPg), gestiona el ciclo de vida |

## Path Aliases

Definidos en `tsconfig.json` y resueltos en Jest via `moduleNameMapper` en `package.json`:

| Alias | Resuelve a |
|---|---|
| `@database/*` | `src/database/*` |
| `@config/*` | `src/config/*` |
| `@common/*` | `src/common/*` |
| `@auth/*` | `src/features/auth/*` |
| `@patients/*` | `src/features/patients/*` |

## src/features/

Módulos funcionales agrupados por dominio. Cada feature contiene submódulos (entidades), cada submódulo es un módulo NestJS vertical con estructura plana: archivos sueltos directamente en la carpeta del submódulo, con solo `dtos/` como subcarpeta.

### Convenciones por entidad (submódulo)

| Capa | Archivo | Responsabilidad |
|---|---|---|
| Module | `{entidad}.module.ts` | Declara controllers + providers, importa dependencias |
| Controller | `{entidad}.controller.ts` | Endpoints REST, delega al service, usa DTOs |
| Service | `{entidad}.service.ts` | Lógica de negocio y reglas de dominio |
| Repository | `{entidad}.repository.ts` | Acceso a datos. Única capa que inyecta PrismaService. Traduce de/a interfaces propias |
| Entity | `{entidad}.entity.ts` | Interface TypeScript propia. Desacoplada de Prisma |
| Mapper | `{entidad}.mapper.ts` | Funciones `toEntity` (Prisma → Entity) y `toResponse` (Entity → Response DTO) |
| DTO | `dtos/{accion}-{entidad}.request.ts` / `.response.ts` | Validación de entrada/salida con class-validator |

**Regla:** Archivos sueltos en la raíz del submódulo, solo `dtos/` como subcarpeta. Sin subdirectorios `entities/`, `mappers/`, `repositories/`, `services/`, `controllers/`.

### auth/

Autenticación y gestión de usuarios y roles del sistema.

| Submódulo | Responsabilidad | Tablas |
|---|---|---|
| jwt/ | Login, logout, refresh, forgot-password, reset-password. JWT strategies, guards y decorators | — |
| user/ | CRUD de usuarios, soft-delete | `users` |
| role/ | CRUD de roles | `roles` |

Endpoints:
- `POST /api/v1/auth/login`, `/logout`, `/refresh`, `/forgot-password`, `/reset-password`
- `CRUD /api/v1/users` (solo Admin)
- `CRUD /api/v1/roles` (solo Admin)

### patients/

Administración del registro de pacientes e historiales clínicos. Endpoint único atómico.

| Submódulo | Responsabilidad | Tablas |
|---|---|---|
| patient/ | CRUD de pacientes + histories anidados (atómico) | `patients` |
| clinical-history/ | Antecedentes patológicos y quirúrgicos (CIE-10) | `clinical_histories` |
| family-history/ | Antecedentes familiares (tipo, estado, especificaciones) | `family_histories` |
| gynecological-history/ | Antecedentes ginecológicos (0..1 por paciente, sexo F) | `gynecological_histories` |
| allergy-history/ | Antecedentes de alergias (CIE-10) | `allergy_histories` |
| ram-history/ | Reacciones Adversas a Medicamentos | `ram_histories` |

Endpoints:
- `POST /api/v1/patients` — Crea paciente + histories (atómico)
- `GET /api/v1/patients/:id` — Paciente + histories anidados
- `PUT /api/v1/patients/:id` — Reemplazo total
- `PATCH /api/v1/patients/:id` — Actualización parcial
- `DELETE /api/v1/patients/:id` — Soft delete

### medicaments/ (Pendiente)

Catálogo farmacéutico del consultorio. Sigue el mismo patrón de estructura plana y path aliases.

| Submódulo | Responsabilidad | Tablas | Endpoints |
|---|---|---|---|
| active-ingredient/ | CRUD principios activos | `active_ingredients` | `/api/v1/active-ingredients` |
| manufacturer/ | CRUD fabricantes | `manufacturers` | `/api/v1/manufacturers` |
| dosage-form/ | CRUD formas farmacéuticas | `dosage_forms` | `/api/v1/dosage-forms` |
| medicament/ | CRUD medicamentos | `medicaments`, `medicaments_ingredients` | `/api/v1/medicaments` |

### attentions/ (Pendiente)

Núcleo del sistema que orquesta la atención médica completa.

| Submódulo | Responsabilidad | Tablas | Endpoints |
|---|---|---|---|
| attention/ | Atención médica, diagnósticos, signos/síntomas | `attentions`, `attention_diagnoses`, `signs_symptoms` | `/api/v1/attentions` |
| health-metric/ | Signos vitales | `health_metrics` | `/api/v1/health-metrics` |
| diagnosis/ | Catálogo CIE-10 | `diagnoses` | `/api/v1/diagnoses` |
| bio-function/ | Funciones biológicas | `bio_functions` | `/api/v1/bio-functions` |
| physical-exam/ | Exámenes físicos | `physical_exams` | `/api/v1/physical-exams` |
| service/ | Servicios del consultorio | `services` | `/api/v1/services` |

### orders/ (Pendiente)

Órdenes derivadas de la atención médica.

| Submódulo | Responsabilidad | Tablas | Endpoints |
|---|---|---|---|
| exam/ | Órdenes de examen + ítems | `exams`, `exam_items` | `/api/v1/exams` |
| exam-type/ | Tipos de examen | `exam_types` | `/api/v1/exam-types` |
| prescription/ | Recetas + ítems + diagnósticos | `prescriptions`, `prescription_items`, `prescription_diagnoses` | `/api/v1/prescriptions` |
| referral/ | Interconsultas (XOR diagnóstico/motivo) | `referrals` | `/api/v1/referrals` |

### documents/ (Pendiente)

Generación de PDF en servidor con PDFKit.

| Archivo | Documento que genera |
|---|---|
| templates/prescription.template.ts | Receta médica |
| templates/exam-order.template.ts | Orden de examen auxiliar |
| templates/referral.template.ts | Interconsulta |

### statistics/ (Pendiente)

Endpoints de métricas del consultorio: demografía de pacientes, atenciones por período y diagnósticos más frecuentes. Usa queries de agregación sobre el repository.

## Raíz del proyecto

| Archivo | Propósito |
|---|---|
| docker/Dockerfile | Imagen para Cloud Run |
| test/setup.ts | Configuración de env vars para entorno de tests |
| .env | Variables de entorno locales (gitignorado) |
| .env.example | Plantilla con `DATABASE_URL` (unificada) |
| .prettierrc | Configuración de formateador |
| .gitignore | Archivos excluidos del repositorio |
| nest-cli.json | Configuración del CLI de NestJS |
| package.json | Dependencias, scripts y config Jest |
| tsconfig.json | Configuración de TypeScript con path aliases |

## Diferencias con v0.4

| Cambio | Motivo |
|---|---|
| Estructura plana en submódulos | Archivos sueltos en raíz, solo `dtos/` como subcarpeta. Sin `entities/`, `mappers/`, `repositories/`, `services/`, `controllers/` |
| Path aliases (`@auth/*`, `@patients/*`, etc.) | Imports más limpios y mantenibles. Configurados en tsconfig.json + Jest moduleNameMapper |
| Unificación a `DATABASE_URL` | Variable única en lugar de `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` separadas |
| `ValidDocumentNumber` | Validador personalizado para DNI/CE/PASAPORTE en `common/validators/` |
| Módulos Mail y Redis | Agregados a `common/` |
| `test/setup.ts` | Archivo de configuración de entorno para Jest |
| Endpoints atómicos en patients | `POST/PUT/PATCH /patients` recibe paciente + histories en un solo body |
| Sin controller en histories | Los histories no tienen endpoints propios, se manejan embebidos en patient |

## Convenciones de código

| Aspecto | Regla | Ejemplo |
|---|---|---|
| Idioma del código | Inglés | `findAll()` |
| Idioma de comentarios | Español | `// Busca pacientes activos` |
| Archivos | kebab-case | `patient.service.ts` |
| Clases | PascalCase | `PatientService` |
| Variables y métodos | camelCase | `findAll()` |
| Constantes | UPPER_SNAKE_CASE | `JWT_SECRET` |
| Enums TypeScript | PascalCase, sin prefijo | `DocumentType` |
| DTOs | {Acción}{Entidad}Request / {Entidad}Response | `CreatePatientRequest` / `PatientResponse` |
| Rutas API | /api/v1/{modulo} | /api/v1/patients |
| Imports | Path aliases (`@auth/`, `@patients/`, `@database/`) | `import { PatientService } from '@patients/patient/patient.service'` |
| Estructura submódulo | Archivos sueltos + `dtos/` | Sin subdirectorios intermedios |
