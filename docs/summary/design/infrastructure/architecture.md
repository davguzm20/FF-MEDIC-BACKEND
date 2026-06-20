# Arquitectura del Sistema F&F-MEDIC

**Versión:** 0.3

## 1. Introducción

### 1.1 Propósito
Este documento define la arquitectura del Sistema de Consultorio Médico F&F-MEDIC. Describe la estructura técnica, los componentes que lo integran, las tecnologías seleccionadas, el modelo de despliegue y las decisiones de diseño que garantizan una base sólida para el desarrollo del proyecto.

### 1.2 Alcance
La arquitectura abarca la organización y comunicación entre los componentes del sistema: el Frontend como aplicación web de página única (SPA), el Backend como API REST, la base de datos relacional, la infraestructura en la nube, los mecanismos de autenticación y la generación de documentos médicos en formato PDF.

### 1.3 Definiciones

| Término | Definición |
|---|---|
| F&F-MEDIC | Sistema de Consultorio Médico |
| Cliente-Servidor | Modelo arquitectónico donde el Frontend solicita servicios y el Backend procesa y responde |
| API REST | Interfaz de comunicación HTTP entre Frontend y Backend |
| JWT | JSON Web Token, estándar para autenticación sin estado |
| SPA | Single Page Application, aplicación web que carga una sola página y se actualiza dinámicamente |
| ORM | Mapeo objeto-relacional para interactuar con la base de datos desde el código |

## 2. Arquitectura General

### 2.1 Estilo Arquitectónico

El sistema adopta un estilo **Cliente-Servidor** con dos componentes principales que se comunican a través de una API REST. Esta separación permite que Frontend y Backend evolucionen de forma independiente, facilitando el mantenimiento y la escalabilidad.

El Frontend es una SPA que se ejecuta en el navegador del usuario. Es responsable de la presentación e interacción: muestra formularios, tablas y documentos, y envía peticiones al Backend. No tiene acceso directo a la base de datos ni contiene lógica de negocio sensible.

El Backend es una API REST que procesa la lógica de negocio, aplica las reglas del dominio, gestiona la autenticación y autorización, y media el acceso a la base de datos. Es el único componente que puede leer o escribir en la base de datos.

```
+-----------------------------------------------------------------------+
|                    F&F-MEDIC-FRONTEND (cliente)                        |
|          React 18 + Vite + Tailwind CSS                               |
|                     Cloud Run (Docker + Nginx)                         |
+-----------------------------------+-----------------------------------+
                                    |  HTTPS / REST (JWT en headers)
                                    v
+-----------------------------------------------------------------------+
|                    F&F-MEDIC-BACKEND (servidor)                        |
|       NestJS + Prisma ORM + JWT + bcrypt + PDFKit                     |
|                      Cloud Run (Docker)                                |
+-----------------------------------+-----------------------------------+
                                    |  Prisma ORM
                                    v
+-----------------------------------------------------------------------+
|                     PostgreSQL (Neon)                                  |
|                     Serverless, TLS obligatorio                        |
+-----------------------------------------------------------------------+
```

### 2.2 Principios Arquitectónicos

El diseño del sistema se sustenta en los siguientes principios:

| Principio | Descripción |
|---|---|
| **Separación de responsabilidades** | Frontend y Backend residen en repositorios independientes, cada uno con su propio ciclo de desarrollo, pruebas y despliegue. Los cambios en una capa no afectan directamente a la otra. |
| **Modularidad** | El Backend se organiza en módulos funcionales. Cada módulo encapsula su propia capa de presentación (controladores), negocio (servicios) y persistencia (acceso a datos). |
| **Stateless** | La sesión de usuario se gestiona mediante tokens JWT. El servidor no almacena estado entre peticiones, lo que facilita la escalabilidad horizontal. |
| **Seguridad por diseño** | Los secretos y credenciales se gestionan en un servicio externo especializado. Las contraseñas se protegen con algoritmos de hashing. Los datos de entrada se validan tanto en Frontend como en Backend. |
| **Escalabilidad horizontal** | La infraestructura serverless permite aumentar o disminuir la cantidad de instancias según la demanda, sin cambios en la arquitectura ni en el código. |

### 2.3 Flujo de comunicación

El siguiente flujo describe el recorrido de una petición desde que el usuario realiza una acción hasta que recibe una respuesta:

1. El usuario interactúa con la interfaz gráfica del Frontend (registrar un paciente, consultar un historial, generar un documento).
2. El Frontend construye una petición HTTP y la envía al Backend. Las peticiones autenticadas incluyen un token JWT en los encabezados.
3. El Backend recibe la petición y la procesa a través de sus capas internas: primero verifica la autenticación y autorización, luego ejecuta la lógica de negocio correspondiente y finalmente accede a los datos si es necesario.
4. Si la operación lo requiere, el Backend consulta o modifica la información en la base de datos, aplicando las reglas de integridad y validaciones definidas.
5. Una vez procesada la petición, el Backend construye una respuesta en formato JSON y la envía de vuelta al Frontend.
6. En el caso de generación de documentos PDF, el Backend construye el archivo durante el procesamiento de la petición y lo envía al Frontend para su descarga o visualización.

## 3. Despliegue

El sistema se despliega en una infraestructura en la nube que ejecuta ambas aplicaciones de forma independiente, escalable y segura. Cada aplicación se empaqueta en un contenedor Docker y se ejecuta en un entorno serverless que autoescala según la demanda.

### 3.1 Infraestructura

Los componentes del sistema se distribuyen en los siguientes servicios:

| Componente | Función |
|---|---|
| **Backend API** | Contenedor que ejecuta NestJS. Procesa la lógica de negocio y sirve los endpoints REST. |
| **Frontend SPA** | Contenedor con Nginx que sirve los archivos estáticos de la aplicación React al navegador. |
| **Base de Datos** | Neon, servicio de PostgreSQL serverless externo al Backend. Almacena toda la información del sistema. |
| **Secretos** | Google Secret Manager. Servicio centralizado para la gestión de credenciales y configuraciones sensibles. |
| **Repositorios** | GitHub. Sistema de control de versiones para el almacenamiento del código fuente de Frontend y Backend. |

### 3.2 Flujo de despliegue

Cada vez que se realizan cambios en la rama principal de un repositorio, se ejecuta un pipeline automatizado:

1. El desarrollador sube los cambios a la rama principal del repositorio correspondiente (Frontend o Backend).
2. El servicio de integración continua detecta los cambios, instala las dependencias, ejecuta las pruebas y construye la imagen Docker.
3. La imagen se despliega en Cloud Run, que reemplaza la versión anterior sin tiempo de inactividad.
4. Frontend y Backend siguen este proceso de forma independiente, cada uno desde su propio repositorio.

### 3.3 Secretos

Las credenciales y configuraciones sensibles (claves de la base de datos, secreto del JWT, credenciales de servicios externos) no se almacenan en el código fuente ni en archivos de configuración del repositorio. Se gestionan a través de Google Secret Manager, que permite centralizar, rotar y auditar el acceso. Tanto en desarrollo local como en producción, la aplicación consulta este servicio en tiempo de ejecución.

### 3.4 CORS

Para garantizar la seguridad en la comunicación, el Backend restringe el acceso únicamente al dominio del Frontend en producción. En el entorno de desarrollo local, se permite el acceso desde el servidor de desarrollo del Frontend para facilitar las pruebas.

### 3.5 Costos

La infraestructura seleccionada opera dentro de los límites de los planes gratuitos de cada servicio, permitiendo mantener el proyecto en funcionamiento sin costos recurrentes:

| Servicio | Límite del plan gratuito |
|---|---|
| Frontend (Cloud Run) | 2 millones de peticiones al mes |
| Backend (Cloud Run) | 2 millones de peticiones al mes |
| Base de datos (Neon) | 0.5 GB de almacenamiento, 100 horas de cómputo al mes |
| Secretos (Secret Manager) | 6 secretos activos, 10 000 operaciones al mes |

A medida que el sistema crezca, la arquitectura permite escalar progresivamente hacia planes superiores sin requerir cambios estructurales.

## 4. Tecnologías

### 4.1 Stack completo

La siguiente tabla resume las tecnologías que componen el sistema, organizadas por capa:

| Capa | Tecnología | Versión | Propósito |
|---|---|---|---|
| Frontend | React | 18+ | Biblioteca para construcción de interfaces de usuario |
| Frontend | Vite | 6+ | Herramienta de construcción y servidor de desarrollo |
| Frontend | Tailwind CSS | 4+ | Framework de estilos utility-first |
| Frontend | React Router DOM | 7+ | Enrutamiento del lado del cliente |
| Frontend | React Hook Form | | Manejo eficiente de formularios con validación |
| Frontend | Axios | | Cliente HTTP para peticiones al Backend |
| Backend | NestJS | | Framework de Node.js estructurado y modular |
| Backend | Prisma | | ORM con tipado automático y sistema de migraciones |
| Backend | passport-jwt | | Estrategia de autenticación con JWT |
| Backend | bcrypt | | Librería de hashing para contraseñas |
| Backend | class-validator | | Validación declarativa de DTOs |
| Backend | PDFKit | | Generación de documentos PDF en el servidor |
| Infra | Google Cloud Run | | Plataforma de contenedores serverless |
| Infra | Google Secret Manager | | Almacenamiento seguro de secretos y configuraciones |
| Infra | Docker | | Plataforma de contenedores para empaquetar las aplicaciones |

### 4.2 Justificación

Cada tecnología fue seleccionada por su adecuación al dominio del proyecto y su madurez en la comunidad:

| Tecnología | Razón de selección |
|---|---|
| **React** | Ecosistema maduro, componentes reutilizables, ideal para formularios complejos como los de atención médica |
| **Vite** | Construcción ultrarrápida, recarga instantánea en desarrollo, configuración mínima |
| **Tailwind CSS** | Desarrollo rápido sin escribir CSS manual, diseño responsive nativo, purga de estilos no usados |
| **NestJS** | Código modular y estructurado con controladores, servicios y módulos. Inyección de dependencias y decoradores que facilitan la organización en proyectos con múltiples módulos como F&F-MEDIC |
| **Prisma** | Tipado automático a partir del schema, migraciones seguras, se adapta al modelo físico de 29 tablas |
| **Neon (PostgreSQL)** | Servicio serverless con pooler de conexiones integrado, free tier generoso (0.5 GB), compatible con Prisma |
| **Cloud Run** | Entorno serverless que autoescala a cero, solo se paga por uso, free tier suficiente para el proyecto |
| **Secret Manager** | Secretos centralizados con rotación programable, evita exponer credenciales en el código o en GitHub |
| **PDFKit** | Generación de PDFs directamente en Node.js, evita descargar la carga de procesamiento al frontend, adecuado para documentos médicos con datos dinámicos |

## 5. Base de Datos

La base de datos es el componente central que garantiza la integridad, consistencia y disponibilidad de la información clínica del consultorio. Su diseño prioriza la seguridad de los datos del paciente y el cumplimiento de las reglas de negocio definidas en el modelo lógico.

### 5.1 Gestor de base de datos

Se emplea PostgreSQL, un motor relacional que garantiza ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad). Esto es necesario para la naturaleza transaccional del sistema, donde cada atención médica involucra múltiples entidades relacionadas (diagnósticos, signos vitales, recetas, exámenes, etc.). La comunicación con la base de datos se realiza exclusivamente a través del Backend, y las credenciales de acceso se gestionan mediante Secret Manager, sin exponerlas en el código fuente.

### 5.2 Modelo de datos

El modelo de datos está compuesto por 29 tablas que representan las entidades del dominio, desde pacientes y usuarios hasta atenciones médicas, diagnósticos, recetas y documentos. Sus características principales son:

| Aspecto | Descripción |
|---|---|
| **Integridad referencial** | Todas las relaciones entre tablas están definidas mediante claves foráneas, garantizando que no existan registros huérfanos |
| **Restricciones semánticas** | CHECK para validar rangos de valores clínicos (presión arterial, frecuencia cardíaca, IMC) y reglas de negocio específicas (XOR entre diagnóstico y motivo en interconsultas) |
| **Normalización** | El modelo evita la redundancia mediante normalización, con entidades catálogo independientes (diagnósticos CIE-10, principios activos, tipos de examen) |
| **Identificadores** | Todas las tablas usan SERIAL como clave primaria. Las combinaciones únicas se protegen con restricciones UNIQUE |
| **Enumeraciones** | Los campos con valores fijos se definen como tipos enumerados nativos de PostgreSQL (14 enums), garantizando que solo se almacenen valores válidos |
| **Conexión** | Pool de conexiones para manejar peticiones concurrentes. Conexión con TLS obligatorio |

## 6. Autenticación y Autorización

El sistema implementa autenticación basada en tokens JWT, lo que permite mantener sesiones sin estado en el servidor. Se emplea una estrategia de dos tokens que balancea seguridad y usabilidad: un token de corta duración para las peticiones y un token de larga duración para renovar la sesión.

### 6.1 Estrategia de tokens

| Token | Duración | Propósito | Almacenamiento |
|---|---|---|---|
| **Access Token** | 15 minutos | Se envía en cada petición para autenticar al usuario | Memoria del Frontend |
| **Refresh Token** | 24 horas | Se utiliza exclusivamente para obtener nuevos access tokens sin que el usuario inicie sesión nuevamente | LocalStorage del Frontend |

### 6.2 Flujo de autenticación

1. El usuario ingresa sus credenciales en el formulario de inicio de sesión. Si son correctas, el Backend genera un access token y un refresh token.
2. El Frontend almacena el access token en memoria (variable de JavaScript) y el refresh token en LocalStorage.
3. Cada petición al Backend incluye el access token en el encabezado HTTP `Authorization`.
4. Cuando el access token expira (15 minutos), el Frontend detecta el error 401 y automáticamente utiliza el refresh token para solicitar uno nuevo al Backend, sin intervención del usuario.
5. Si el usuario recarga la página, el Frontend verifica si existe un refresh token en LocalStorage. De ser así, solicita un nuevo access token automáticamente y el usuario continúa su sesión sin tener que volver a iniciar sesión.

### 6.3 Seguridad

- Las contraseñas se almacenan en la base de datos utilizando bcrypt, un algoritmo de hashing que impide su recuperación en texto plano.
- Un guardián de autenticación (NestJS Guard) intercepta cada petición entrante y verifica la validez del access token antes de permitir el acceso a las rutas protegidas.
- Las únicas rutas públicas (sin autenticación) son: inicio de sesión, recuperación de contraseña y renovación de tokens.

## 7. Generación de PDF

El sistema requiere la emisión de documentos médicos en formato PDF, como recetas, órdenes de exámenes auxiliares e interconsultas. Estos documentos se generan desde el Backend, centralizando la lógica de construcción y evitando depender de la capacidad de procesamiento del navegador del usuario.

### 7.1 Flujo de generación

1. El Frontend solicita la generación del documento enviando los identificadores necesarios al Backend a través de un endpoint especializado.
2. El Backend consulta la información requerida en la base de datos, aplica las reglas de negocio correspondientes y construye el documento PDF utilizando PDFKit, una librería que permite generar documentos desde el servidor con Node.js.
3. Una vez generado, el Backend envía el archivo PDF al Frontend como parte de la respuesta HTTP.
4. El Frontend recibe el archivo y lo pone a disposición del usuario para su descarga o impresión directa.

### 7.2 Responsabilidad
Los endpoints de generación de PDF pertenecen al módulo **Reportes y Documentos**, que se encarga de orquestar la consulta de datos y la construcción de los archivos.

## 8. Estructura de Módulos

El Backend se organiza en módulos funcionales, cada uno responsable de un dominio específico del negocio. Esta organización permite que el código sea mantenible, testeable y escalable, ya que cada módulo puede desarrollarse y evolucionar de forma independiente.

### 8.1 Módulos funcionales

| Módulo | Responsabilidad |
|---|---|
| **Autenticación** | Gestión de inicio de sesión, registro de usuarios, recuperación de contraseña y administración del perfil del usuario |
| **Pacientes** | Administración del registro de pacientes, consulta del historial clínico y gestión de métricas de salud |
| **Atención Médica** | Registro y actualización de atenciones médicas, incluyendo diagnósticos, signos vitales, funciones biológicas, examen físico, recetas, órdenes de examen e interconsultas |
| **Catálogos** | Mantenimiento de datos maestros: diagnósticos CIE-10, medicamentos y principios activos, tipos de examen y servicios del consultorio |
| **Documentos** | Generación de documentos PDF como recetas, órdenes de examen, interconsultas e historial clínico |
| **Estadísticas** | Visualización de métricas del consultorio, distribuciones demográficas y reportes agregados |

### 8.2 Arquitectura por capas

Cada módulo sigue una arquitectura en capas que separa claramente las responsabilidades:

| Capa | Responsabilidad |
|---|---|
| **Presentación** | Controladores que exponen los endpoints de la API. Reciben las peticiones del Frontend, delegan el procesamiento a los servicios y retornan las respuestas. |
| **Negocio** | Servicios que contienen la lógica del dominio, las reglas de negocio y la coordinación entre operaciones. Son la capa central de cada módulo. |
| **Persistencia** | Acceso a la base de datos mediante el patrón Repository. Cada repositorio inyecta PrismaService y traduce entre interfaces propias del dominio y el formato de almacenamiento. Esta capa es la única que depende de Prisma, permitiendo reemplazar el ORM sin afectar la lógica de negocio. |
