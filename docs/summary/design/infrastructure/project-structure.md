# Estructura de Carpetas

## Árbol de directorios

```
ff-medic-backend/
├── prisma/
│   ├── schema.prisma
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
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── constants/
│   │       └── index.ts
│   ├── config/
│   │   ├── env.config.ts
│   │   └── cors.config.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── prisma.service.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── refresh-token.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── roles/
│   │       ├── roles.module.ts
│   │       ├── roles.controller.ts
│   │       └── roles.service.ts
│   ├── patients/
│   │   ├── patients.module.ts
│   │   ├── patients.controller.ts
│   │   ├── patients.service.ts
│   │   ├── dto/
│   │   │   ├── create-patient.dto.ts
│   │   │   ├── update-patient.dto.ts
│   │   │   └── patient-filter.dto.ts
│   │   ├── histories/
│   │   │   ├── histories.module.ts
│   │   │   ├── histories.controller.ts
│   │   │   ├── histories.service.ts
│   │   │   └── dto/
│   │   │       └── create-history.dto.ts
│   │   └── somatometries/
│   │       ├── somatometries.module.ts
│   │       ├── somatometries.controller.ts
│   │       ├── somatometries.service.ts
│   │       └── dto/
│   │           └── create-somatometry.dto.ts
│   ├── attention/
│   │   ├── attention.module.ts
│   │   ├── attention.controller.ts
│   │   ├── attention.service.ts
│   │   ├── dto/
│   │   │   ├── create-attention.dto.ts
│   │   │   ├── update-attention.dto.ts
│   │   │   └── add-diagnosis.dto.ts
│   │   ├── examinations/
│   │   │   ├── examinations.module.ts
│   │   │   ├── examinations.controller.ts
│   │   │   ├── examinations.service.ts
│   │   │   └── dto/
│   │   │       ├── vital-signs.dto.ts
│   │   │       ├── bio-function.dto.ts
│   │   │       ├── physical-exam.dto.ts
│   │   │       └── exam-order.dto.ts
│   │   ├── prescriptions/
│   │   │   ├── prescriptions.module.ts
│   │   │   ├── prescriptions.controller.ts
│   │   │   ├── prescriptions.service.ts
│   │   │   └── dto/
│   │   │       └── create-prescription.dto.ts
│   │   └── referrals/
│   │       ├── referrals.module.ts
│   │       ├── referrals.controller.ts
│   │       ├── referrals.service.ts
│   │       └── dto/
│   │           └── create-referral.dto.ts
│   ├── documents/
│   │   ├── documents.module.ts
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── templates/
│   │       ├── prescription.template.ts
│   │       ├── exam-order.template.ts
│   │       └── referral.template.ts
│   ├── statistics/
│   │   ├── statistics.module.ts
│   │   ├── statistics.controller.ts
│   │   └── statistics.service.ts
│   └── catalogs/
│       ├── catalogs.module.ts
│       ├── catalogs.controller.ts
│       ├── catalogs.service.ts
│       ├── diagnoses/
│       │   ├── diagnoses.module.ts
│       │   ├── diagnoses.controller.ts
│       │   └── diagnoses.service.ts
│       ├── medicaments/
│       │   ├── medicaments.module.ts
│       │   ├── medicaments.controller.ts
│       │   └── medicaments.service.ts
│       ├── exam-types/
│       │   ├── exam-types.module.ts
│       │   ├── exam-types.controller.ts
│       │   └── exam-types.service.ts
│       └── services/
│           ├── services.module.ts
│           ├── services.controller.ts
│           └── services.service.ts
│
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

## prisma/

Define el modelo de datos y los scripts de inicialización. schema.prisma contiene 28 tablas, 17 enums de PostgreSQL y sus relaciones.

| Archivo | Contenido |
|---|---|
| schema.prisma | Modelo de datos completo |
| seeds/index.ts | Orchestrador de seeds |
| seeds/roles.seed.ts | Roles del sistema |
| seeds/services.seed.ts | Servicios del consultorio |
| seeds/users.seed.ts | Usuario administrador inicial |

## src/common/

Recursos transversales compartidos por todos los módulos.

| Archivo | Propósito |
|---|---|
| guards/jwt-auth.guard.ts | Valida el access token en cada petición |
| guards/roles.guard.ts | Verifica el rol del usuario contra los roles permitidos |
| decorators/current-user.decorator.ts | Extrae el usuario autenticado del request |
| decorators/roles.decorator.ts | Marca roles permitidos en un endpoint |
| filters/http-exception.filter.ts | Unifica el formato de errores HTTP |
| interceptors/transform.interceptor.ts | Envuelve respuestas exitosas en formato estándar |
| constants/index.ts | Constantes globales (expiración, paginación) |

## src/config/

| Archivo | Propósito |
|---|---|
| env.config.ts | Valida y expone variables de entorno tipadas |
| cors.config.ts | Configura orígenes permitidos según entorno |

## src/database/

| Archivo | Propósito |
|---|---|
| database.module.ts | Declara PrismaService como proveedor global |
| prisma.service.ts | Extiende PrismaClient y gestiona el ciclo de vida |

## src/auth/

Endpoints públicos de autenticación. El controlador expone login y refresh-token. El servicio valida credenciales y genera tokens. Las estrategias de Passport validan el access y refresh token respectivamente.

| Archivo | Propósito |
|---|---|
| strategies/jwt.strategy.ts | Valida el access token |
| strategies/jwt-refresh.strategy.ts | Valida el refresh token |
| dto/login.dto.ts | Validación de credenciales |
| dto/refresh-token.dto.ts | Validación del refresh token |

## src/users/

CRUD de usuarios y roles, accesible solo por administradores.

| Submódulo | Propósito |
|---|---|
| users/ | CRUD de usuarios del sistema |
| users/roles/ | CRUD de roles, module independiente |

## src/patients/

Registro de pacientes y sus historiales clínicos.

| Submódulo | Propósito |
|---|---|
| patients/ | CRUD de pacientes, búsqueda por documento |
| patients/histories/ | Antecedentes patológicos, familiares, ginecológicos, alergias y RAM |
| patients/somatometries/ | Peso, talla y perímetro abdominal (1:1 con paciente) |

## src/attention/

Núcleo del sistema que orquesta la atención médica completa.

| Submódulo | Entidades que gestiona |
|---|---|
| examinations/ | vital_signs, bio_functions, physical_exam + items, exams + items |
| prescriptions/ | prescriptions, prescription_items, prescription_diagnoses |
| referrals/ | referrals con validación XOR diagnóstico/motivo |

## src/documents/

Generación de PDF en servidor con PDFKit.

| Archivo | Documento que genera |
|---|---|
| templates/prescription.template.ts | Receta médica |
| templates/exam-order.template.ts | Orden de examen auxiliar |
| templates/referral.template.ts | Interconsulta |

## src/statistics/

Endpoints de métricas del consultorio: demografía de pacientes, atenciones por período y diagnósticos más frecuentes.

## src/catalogs/

Mantenimiento de datos maestros en cuatro submódulos independientes.

| Submódulo | Catálogo |
|---|---|
| diagnoses/ | Códigos CIE-10 |
| medicaments/ | Principios activos y medicamentos |
| exam-types/ | Tipos de examen auxiliar |
| services/ | Servicios del consultorio |

## Raíz del proyecto

| Archivo | Propósito |
|---|---|
| docker/Dockerfile | Imagen para Cloud Run |
| test/ | Pruebas de integración e2e |
| uploads/ | PDFs temporales (gitignorado) |
| .env | Variables de entorno locales |
| .eslintrc.js | Configuración de linter |
| .prettierrc | Configuración de formateador |
| nest-cli.json | Configuración del CLI de NestJS |
| package.json | Dependencias y scripts |
| tsconfig.json | Configuración de TypeScript |

## Convenciones de código

| Aspecto | Regla | Ejemplo |
|---|---|---|
| Idioma del código | Inglés | `findAll()` |
| Idioma de comentarios | Español | `// Busca pacientes activos` |
| Archivos | kebab-case | `patients.service.ts` |
| Clases | PascalCase | `PatientsService` |
| Variables y métodos | camelCase | `findAll()` |
| Constantes | UPPER_SNAKE_CASE | `JWT_SECRET` |
| Enums TypeScript | PascalCase, sin prefijo | `DocumentType` |
| DTOs | {Acción}{Entidad}Dto | `CreatePatientDto` |
| Rutas API | /api/v1/{modulo} | /api/v1/patients |
