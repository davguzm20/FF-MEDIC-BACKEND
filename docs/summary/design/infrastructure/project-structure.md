# Estructura de Carpetas

**Versión:** 0.3

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
│   └── features/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── user/
│       │   │   ├── user.module.ts
│       │   │   ├── user.controller.ts
│       │   │   ├── user.service.ts
│       │   │   ├── user.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── user.entity.ts
│       │   │   │   └── role.entity.ts
│       │   │   └── dto/
│       │   │       ├── create-user.dto.ts
│       │   │       └── update-user.dto.ts
│       │   └── strategies/
│       │       ├── jwt.strategy.ts
│       │       └── jwt-refresh.strategy.ts
│       │
│       ├── patients/
│       │   ├── patients.module.ts
│       │   ├── patient/
│       │   │   ├── patient.module.ts
│       │   │   ├── patient.controller.ts
│       │   │   ├── patient.service.ts
│       │   │   ├── patient.repository.ts
│       │   │   ├── entities/
│       │   │   │   └── patient.entity.ts
│       │   │   └── dto/
│       │   │       ├── create-patient.dto.ts
│       │   │       ├── update-patient.dto.ts
│       │   │       └── patient-filter.dto.ts
│       │   ├── history/
│       │   │   ├── history.module.ts
│       │   │   ├── history.controller.ts
│       │   │   ├── history.service.ts
│       │   │   ├── history.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── clinical-history.entity.ts
│       │   │   │   ├── family-history.entity.ts
│       │   │   │   ├── gynecological-history.entity.ts
│       │   │   │   ├── allergy-history.entity.ts
│       │   │   │   └── ram-history.entity.ts
│       │   │   └── dto/
│       │   │       └── create-history.dto.ts
│       │   └── health-metric/
│       │       ├── health-metric.module.ts
│       │       ├── health-metric.controller.ts
│       │       ├── health-metric.service.ts
│       │       ├── health-metric.repository.ts
│       │       ├── entities/
│       │       │   └── health-metric.entity.ts
│       │       └── dto/
│       │           └── create-health-metric.dto.ts
│       │
│       ├── attention/
│       │   ├── attention.module.ts
│       │   ├── attention/
│       │   │   ├── attention.module.ts
│       │   │   ├── attention.controller.ts
│       │   │   ├── attention.service.ts
│       │   │   ├── attention.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── attention.entity.ts
│       │   │   │   ├── attention-diagnosis.entity.ts
│       │   │   │   └── signs-symptom.entity.ts
│       │   │   └── dto/
│       │   │       ├── create-attention.dto.ts
│       │   │       ├── update-attention.dto.ts
│       │   │       └── add-diagnosis.dto.ts
│       │   ├── examination/
│       │   │   ├── examination.module.ts
│       │   │   ├── examination.controller.ts
│       │   │   ├── examination.service.ts
│       │   │   ├── examination.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── bio-function.entity.ts
│       │   │   │   ├── physical-exam.entity.ts
│       │   │   │   ├── exam.entity.ts
│       │   │   │   └── exam-item.entity.ts
│       │   │   └── dto/
│       │   │       ├── vital-signs.dto.ts
│       │   │       ├── bio-function.dto.ts
│       │   │       ├── physical-exam.dto.ts
│       │   │       └── exam-order.dto.ts
│       │   ├── prescription/
│       │   │   ├── prescription.module.ts
│       │   │   ├── prescription.controller.ts
│       │   │   ├── prescription.service.ts
│       │   │   ├── prescription.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── prescription.entity.ts
│       │   │   │   ├── prescription-item.entity.ts
│       │   │   │   └── prescription-diagnosis.entity.ts
│       │   │   └── dto/
│       │   │       └── create-prescription.dto.ts
│       │   └── referral/
│       │       ├── referral.module.ts
│       │       ├── referral.controller.ts
│       │       ├── referral.service.ts
│       │       ├── referral.repository.ts
│       │       ├── entities/
│       │       │   └── referral.entity.ts
│       │       └── dto/
│       │           └── create-referral.dto.ts
│       │
│       ├── catalogs/
│       │   ├── catalogs.module.ts
│       │   ├── diagnosis/
│       │   │   ├── diagnosis.module.ts
│       │   │   ├── diagnosis.controller.ts
│       │   │   ├── diagnosis.service.ts
│       │   │   ├── diagnosis.repository.ts
│       │   │   ├── entities/
│       │   │   │   └── diagnosis.entity.ts
│       │   │   └── dto/
│       │   ├── medicament/
│       │   │   ├── medicament.module.ts
│       │   │   ├── medicament.controller.ts
│       │   │   ├── medicament.service.ts
│       │   │   ├── medicament.repository.ts
│       │   │   ├── entities/
│       │   │   │   ├── medicament.entity.ts
│       │   │   │   ├── active-ingredient.entity.ts
│       │   │   │   ├── manufacturer.entity.ts
│       │   │   │   └── dosage-form.entity.ts
│       │   │   └── dto/
│       │   ├── exam-type/
│       │   │   ├── exam-type.module.ts
│       │   │   ├── exam-type.controller.ts
│       │   │   ├── exam-type.service.ts
│       │   │   ├── exam-type.repository.ts
│       │   │   ├── entities/
│       │   │   │   └── exam-type.entity.ts
│       │   │   └── dto/
│       │   └── service/
│       │       ├── service.module.ts
│       │       ├── service.controller.ts
│       │       ├── service.service.ts
│       │       ├── service.repository.ts
│       │       ├── entities/
│       │       │   └── service.entity.ts
│       │       └── dto/
│       │
│       ├── documents/
│       │   ├── documents.module.ts
│       │   ├── documents.controller.ts
│       │   ├── documents.service.ts
│       │   ├── documents.repository.ts
│       │   └── templates/
│       │       ├── prescription.template.ts
│       │       ├── exam-order.template.ts
│       │       └── referral.template.ts
│       │
│       └── statistics/
│           ├── statistics.module.ts
│           ├── statistics.controller.ts
│           ├── statistics.service.ts
│           └── statistics.repository.ts
│
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
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

Define el modelo de datos y los scripts de inicialización. `schema.prisma` contiene 29 modelos y 14 enums de PostgreSQL. `prisma.config.ts` configura la URL de conexión desde variables de entorno (requerido por Prisma 7).

| Archivo | Contenido |
|---|---|
| schema.prisma | Modelo de datos completo (29 modelos, 14 enums) |
| prisma.config.ts | Configuración de Prisma 7 con datasource desde env |
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
| prisma.service.ts | Extiende PrismaClient con driver adapter (PrismaPg), gestiona el ciclo de vida |

## src/features/

Módulos funcionales agrupados por dominio. Cada feature contiene entidades, cada entidad es un módulo NestJS vertical con sus propias capas: module, controller, service, repository, entities y dto.

### Convenciones por entidad

| Capa | Archivo | Responsabilidad |
|---|---|---|
| Module | `{entity}.module.ts` | Declara controllers + providers, importa dependencias |
| Controller | `{entity}.controller.ts` | Endpoints REST, delega al service, usa DTOs |
| Service | `{entity}.service.ts` | Lógica de negocio y reglas de dominio |
| Repository | `{entity}.repository.ts` | Acceso a datos. Única capa que inyecta PrismaService. Traduce de/a interfaces propias |
| Entity | `entities/{entity}.entity.ts` | Interfaces TypeScript propias. No importan de Prisma |
| DTO | `dto/{accion}-{entity}.dto.ts` | Validación de entrada/salida con class-validator |

### auth/

Endpoints públicos de autenticación y gestión de usuarios.

| Submódulo | Responsabilidad |
|---|---|
| user/ | Login, logout, forgot-password, reset-password. CRUD de usuarios y roles |
| strategies/ | Estrategias de Passport para validar access token y refresh token |

| Archivo | Propósito |
|---|---|
| auth.module.ts | Orquesta los submódulos user y strategies |
| strategies/jwt.strategy.ts | Valida el access token |
| strategies/jwt-refresh.strategy.ts | Valida el refresh token |

### patients/

Administración del registro de pacientes, historial clínico y métricas de salud.

| Submódulo | Responsabilidad |
|---|---|
| patient/ | CRUD de pacientes, búsqueda por documento |
| history/ | Antecedentes clínicos: patológicos, quirúrgicos, familiares, ginecológicos, alergias y RAM |
| health-metric/ | Signos vitales: temperatura, SpO2, frecuencia cardíaca, presión arterial, HGT, hemoglobina, peso, talla, perímetro abdominal |

### attention/

Núcleo del sistema que orquesta la atención médica completa.

| Submódulo | Entidades que gestiona |
|---|---|
| attention/ | attentions, attention_diagnoses, signs_symptoms |
| examination/ | bio_functions, physical_exams, exams, exam_items, exam_types |
| prescription/ | prescriptions, prescription_items, prescription_diagnoses |
| referral/ | referrals con validación XOR diagnóstico/motivo |

### catalogs/

Mantenimiento de datos maestros.

| Submódulo | Catálogo |
|---|---|
| diagnosis/ | Códigos CIE-10 |
| medicament/ | Medicamentos, principios activos, fabricantes y formas farmacéuticas |
| exam-type/ | Tipos de examen auxiliar |
| service/ | Servicios del consultorio |

### documents/

Generación de PDF en servidor con PDFKit.

| Archivo | Documento que genera |
|---|---|
| templates/prescription.template.ts | Receta médica |
| templates/exam-order.template.ts | Orden de examen auxiliar |
| templates/referral.template.ts | Interconsulta |

### statistics/

Endpoints de métricas del consultorio: demografía de pacientes, atenciones por período y diagnósticos más frecuentes. Usa queries de agregación sobre el repository.

## Raíz del proyecto

| Archivo | Propósito |
|---|---|
| docker/Dockerfile | Imagen para Cloud Run |
| test/ | Pruebas de integración e2e |
| .env | Variables de entorno locales (gitignorado) |
| .env.example | Plantilla de variables de entorno |
| .prettierrc | Configuración de formateador |
| .gitignore | Archivos excluidos del repositorio |
| nest-cli.json | Configuración del CLI de NestJS |
| package.json | Dependencias y scripts |
| tsconfig.json | Configuración de TypeScript |

## Diferencias con v0.2

| Cambio | Motivo |
|---|---|
| Agrupación `src/features/` | Módulos funcionales organizados por dominio |
| Carpeta `entities/` en cada módulo | Interfaces TypeScript propias desacopladas de Prisma |
| Capa `repository.ts` en cada módulo | Acceso a datos centralizado, único que toca PrismaService |
| `prisma/prisma.config.ts` | Requerido por Prisma 7 para configurar datasource |
| `/generated` en .gitignore | Cliente Prisma se regenera, no se versiona |
| 29 tablas (antes 28) | Corrección: se contaba una tabla de menos |
| 14 enums (antes 17) | Corrección: se eliminaron 3 enums en la evolución del modelo |

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
| DTOs | {Acción}{Entidad}Dto | `CreatePatientDto` |
| Rutas API | /api/v1/{modulo} | /api/v1/patients |
