# Guía de Skills del Proyecto

Esta guía explica qué contiene cada skill de la carpeta skills y su propósito en el proyecto.

---

## prisma-database-setup

Skill de referencia para configurar Prisma ORM con PostgreSQL. Cubre la inicializacion del proyecto, configuracion del datasource, driver adapters obligatorios en Prisma v7, cadenas de conexion, variables de entorno, generacion del cliente y troubleshooting de conexion.

### Archivos incluidos

- **SKILL.md:** Instrucciones principales del skill
- **references/postgresql.md:** Guia especifica para configurar Prisma con PostgreSQL
- **references/prisma-client-setup.md:** Generacion e instanciacion del cliente de Prisma

### Cuando aplica

Usar este skill cuando se necesite inicializar Prisma en el proyecto, configurar la conexion a PostgreSQL, cambiar de provider de base de datos, o solucionar problemas de conexion.

---

## postgres-best-practices

Skill de referencia para buenas practicas de PostgreSQL puro. Cubre diseno de esquemas, estrategias de indexacion, optimizacion de consultas, migraciones y errores comunes al trabajar con PostgreSQL.

### Archivos incluidos

- **SKILL.md:** Instrucciones principales del skill
- **references/schema-design.md:** Guia de diseno de tablas, tipos de datos y normalizacion

### Cuando aplica

Usar este skill al escribir SQL, disenar esquemas de base de datos, optimizar consultas, crear indices o configurar una base de datos PostgreSQL. Aplica directamente al schema existente del proyecto con sus 28 tablas, 17 enums, 27 indices y triggers de auditoria.

---

## test-driven-development

Skill de flujo de trabajo que impone el ciclo TDD: escribir la prueba primero, verla fallar, escribir el codigo minimo para que pase, verificar y refactorizar. El principio central es que si no se vio fallar la prueba, no se sabe si realmente prueba lo correcto.

### Archivos incluidos

- **SKILL.md:** Instrucciones del ciclo TDD
- **testing-anti-patterns.md:** Patrones de prueba que se deben evitar

### Cuando aplica

Usar este skill siempre al implementar nuevas funcionalidades, corregir bugs, refactorizar o cambiar comportamientos. Solo se exceptuan prototipos descartables, codigo generado y archivos de configuracion.

---

## verification-before-completion

Skill de verificación que impide marcar una tarea como completada sin evidencia fresca de que funciona. Obliga a ejecutar el comando de verificacion correspondiente y confirmar su salida antes de hacer cualquier afirmacion de exito.

### Archivos incluidos

- **SKILL.md:** Instrucciones de la regla de verificacion

### Cuando aplica

Usar este skill siempre antes de afirmar que un trabajo esta completo, corregido o funcionando, y antes de hacer commits o crear PRs. La evidencia debe ser fresca y obtenida en la misma sesion.

---

## find-skills

Skill meta que permite descubrir e instalar otros skills desde skills.sh dentro de la sesion del agente, sin necesidad de salir ni reiniciar.

### Archivos incluidos

- **SKILL.md:** Instrucciones para buscar e instalar skills

### Cuando aplica

Usar este skill cuando se necesite buscar funcionalidades nuevas que podrian existir como skills instalables, instalar skills adicionales, verificar actualizaciones o explorar el ecosistema de skills.

---

## code-documenter

Skill especializado en documentacion de codigo, APIs (OpenAPI/Swagger), documentacion de sitios, y guias para desarrolladores. Incluye referencias especificas para NestJS/Express API.

### Archivos incluidos

- **SKILL.md:** Instrucciones principales del skill
- **references/:** Referencias por tecnologia (NestJS, TypeScript, Python, etc.)

### Cuando aplica

Usar este skill al agregar docstrings, crear documentacion de API con OpenAPI/Swagger, construir sitios de documentacion, escribir guias y tutoriales, o documentar APIs REST, GraphQL, WebSocket y gRPC.
