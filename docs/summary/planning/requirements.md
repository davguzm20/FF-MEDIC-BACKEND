# Requisitos del Sistema F&F-MEDIC

## Requisitos Funcionales

### Acceso al sistema

| ID | Nombre | Descripción | Dependencias | Criterios de aceptación |
|---|---|---|---|---|
| RF-01 | Iniciar sesión | El sistema debe permitir a los usuarios autenticarse mediante el ingreso de sus credenciales (usuario y contraseña). | Ninguna | Si el usuario ingresa credenciales válidas, el sistema permite el acceso. Si las credenciales son incorrectas o están vacías, el sistema deniega el acceso y muestra un mensaje de error. |
| RF-02 | Cerrar sesión | El sistema debe permitir al usuario cerrar su sesión de manera segura. | RF-01 | Si el usuario cierra sesión, el sistema finaliza la sesión activa y restringe el acceso a las funcionalidades hasta un nuevo inicio de sesión. |
| RF-03 | Solicitar recuperación de contraseña | El sistema debe permitir que el usuario solicite la recuperación de su contraseña mediante el ingreso de su correo electrónico registrado, envíando un código de recuperación. | RF-01 | Si el usuario ingresa un correo registrado, el sistema genera y envía un código de recuperación. Si el correo no existe o está vacío, el sistema muestra un mensaje de error. |
| RF-04 | Restablecer contraseña | El sistema debe permitir al usuario establecer una nueva contraseña mediante un token de recuperación válido. | RF-03 | Si el token es válido y la nueva contraseña cumple las reglas de seguridad, el sistema actualiza la contraseña y confirma el cambio. Si el token es inválido, expiró o la contraseña no cumple las reglas, el sistema rechaza la operación y muestra un mensaje de error. |

### Gestión de pacientes

| ID | Nombre | Descripción | Dependencias | Criterios de aceptación |
|---|---|---|---|---|
| RF-05 | Registrar paciente | El sistema debe permitir al usuario registrar los datos de un nuevo paciente, incluyendo nombres, apellido paterno, materno, tipo y número de documento de identidad, sexo, teléfono, fecha de nacimiento, y la edad que sera calculada automáticamente. | RF-01 | Si los datos ingresados cumplen con las restricciones definidas, el sistema registra al paciente. Si existen datos inválidos, obligatorios incompletos o DNI duplicado, el sistema muestra un mensaje de error y solicita corrección. |
| RF-06 | Listar pacientes | El sistema debe permitir visualizar la lista de pacientes registrados en el sistema. | RF-05 | El sistema muestra correctamente la lista de pacientes registrados con su tipo y número de documento de identidad, nombres, apellido paterno y materno, sexo y teléfono. Si no existen pacientes registrados, el sistema informa que no hay resultados disponibles. |
| RF-07 | Buscar pacientes | El sistema debe permitir buscar pacientes registrados utilizando criterios como número de documento o nombres o apellido paterno o materno. | RF-05 | Si el usuario ingresa un criterio válido, el sistema muestra los pacientes coincidentes. Si no se ingresa ningún criterio o no existen coincidencias, el sistema muestra un mensaje correspondiente. |
| RF-08 | Visualizar datos del paciente | El sistema debe permitir visualizar la información registrada de un paciente previamente registrado. | RF-06, RF-07 | Si el paciente existe y es seleccionado, el sistema muestra correctamente todos sus datos registrados. Si el paciente no existe, el sistema muestra un mensaje de error. |
| RF-09 | Actualizar datos del paciente | El sistema debe permitir modificar la información de un paciente registrado, garantizando la consistencia de los datos almacenados. | RF-08 | Si los datos modificados cumplen las restricciones definidas, el sistema actualiza correctamente la información del paciente y confirma el cambio. Si los datos son inválidos o ocurre un error al guardar, el sistema muestra un mensaje de error. |

### Gestión de atenciones médicas

| ID | Nombre | Descripción | Dependencias | Criterios de aceptación |
|---|---|---|---|---|
| RF-10 | Registrar atención médica | El sistema debe permitir registrar una atención médica asociada a un paciente, incluyendo los datos de antecedentes, evaluación, presunción diagnóstica, plan de trabajo e interconsultas. | RF-05 | Si los datos ingresados cumplen con las restricciones definidas, el sistema registra la atención médica. Si los datos son inválidos o incompletos, el sistema muestra un mensaje de error y solicita corrección. |
| RF-11 | Listar atenciones médicas de un paciente | El sistema debe permitir visualizar el listado de atenciones médicas registradas de un paciente. | RF-10 | El sistema muestra correctamente todas las atenciones médicas asociadas al paciente seleccionado. Si el paciente no tiene atenciones registradas, el sistema muestra un mensaje informativo. |
| RF-12 | Buscar atenciones médicas de un paciente | El sistema debe permitir buscar atenciones médicas de un paciente mediante criterios como fecha de registro. | RF-11 | Si el usuario ingresa criterios válidos, el sistema muestra las atenciones médicas coincidentes. Si no existen resultados o no se ingresa ningún criterio, el sistema muestra un mensaje correspondiente. |
| RF-13 | Visualizar datos de la atención médica de un paciente | El sistema debe permitir visualizar el detalle completo de una atención médica registrada de un paciente. | RF-11 | Si la atención médica existe y es seleccionada, el sistema muestra correctamente todos los datos registrados. Si la atención no existe, el sistema muestra un mensaje de error. |
| RF-14 | Actualizar datos de la atención médica de un paciente | El sistema debe permitir modificar los datos de una atención médica previamente registrada, respetando las restricciones definidas. | RF-13 | Si los datos modificados son válidos, el sistema actualiza correctamente la atención médica y confirma los cambios. Si los datos son inválidos o ocurre un error al guardar, el sistema muestra un mensaje de error y no actualiza la información. |

### Generación de documentos medicos

| ID | Nombre | Descripción | Dependencias | Criterios de aceptación |
|---|---|---|---|---|
| RF-15 | Generar receta médica | El sistema debe permitir generar un documento PDF de la receta médica asociada a una atención médica. | RF-10 | Si la atención médica contiene medicamentos, el sistema genera correctamente el PDF de la receta médica y permite visualizarlo. Si no existen medicamentos o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-19 | Generar receta médica por díagnóstico | El sistema debe permitir generar documentos PDF de recetas médicas filtradas por díagnóstico, incluyendo únicamente los medicamentos asociados al díagnóstico seleccionado. | RF-10, RF-15 | Si existen medicamentos asociados a un díagnóstico específico, el sistema genera correctamente una receta PDF independiente para dicho díagnóstico y permite visualizarla. Si no existen medicamentos asociados, el sistema muestra un mensaje informativo. |
| RF-16 | Generar orden de exámenes auxiliares | El sistema debe permitir generar un documento PDF con las ordenes de exámenes auxiliares asociadas a una atención médica. | RF-10 | Si la atención médica contiene exámenes auxiliares, el sistema genera correctamente el PDF de ordenes de exámenes y permite visualizarlo. Si no existen exámenes o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-17 | Generar orden de interconsulta | El sistema debe permitir generar un documento PDF de interconsulta asociado a una atención médica. | RF-10 | Si la atención médica contiene interconsultas, el sistema genera correctamente el PDF de interconsulta y permite visualizarlo. Si no existen interconsultas o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-18 | Exportar reportes en PDF | El sistema debe permitir exportar los reportes generados en formato PDF. | RF-15, RF-16, RF-17, RF-19 | Si existe información disponible para el reporte, el sistema genera correctamente el documento PDF y permite su descarga o impresión. Si ocurre un error durante la generación, el sistema notifica el problema al usuario. |

### Gestión de estadísticas

| ID | Nombre | Descripción | Dependencias | Criterios de aceptación |
|---|---|---|---|---|
| RF-20 | Visualizar estadísticas generales | El sistema debe permitir visualizar estadísticas generales, incluyendo cantidad de pacientes registrados, total de atenciones médicas, pacientes atendidos en el día y promedio de tiempo de atención. | RF-05, RF-10 | El sistema muestra correctamente las estadísticas generales. Si no existen datos registrados, el sistema muestra valores vacíos o un mensaje informativo. |
| RF-21 | Visualizar distribución de pacientes por sexo | El sistema debe permitir visualizar la distribución de pacientes registrados según sexo mediante gráfico estadístico. | RF-05 | El sistema muestra correctamente la distribución de pacientes por sexo utilizando representación gráfica. Si no existen pacientes registrados, el sistema muestra un mensaje informativo. |
| RF-22 | Visualizar distribución de pacientes por grupo etario | El sistema debe permitir visualizar la distribución de pacientes registrados según grupos etarios mediante gráfico estadístico. | RF-05 | El sistema muestra correctamente la distribución de pacientes por grupos etarios utilizando representación gráfica. Si no existen pacientes registrados, el sistema muestra un mensaje informativo. |
| RF-23 | Visualizar distribución de atenciones por fecha | El sistema debe permitir visualizar la distribución de atenciones médicas registradas según fecha mediante gráfico estadístico. | RF-10 | El sistema muestra correctamente la distribución de atenciones médicas por fecha utilizando representación gráfica. Si no existen atenciones registradas, el sistema muestra un mensaje informativo. |

## Requisitos No Funcionales

### Seguridad

| ID | Nombre | Descripción | Prioridad | Criterios de aceptación |
|---|---|---|---|---|
| RNF-01 | Acceso seguro al sistema | El sistema debe permitir el acceso únicamente al usuario autorizado. | Alta | El usuario debe autenticarse correctamente antes de acceder a las funcionalidades del sistema. |
| RNF-02 | Protección de información | El sistema debe proteger la información almacenada y transmitida entre la aplicación y la base de datos remota. | Alta | La información registrada y consultada no puede ser visualizada ni modificada por terceros no autorizados. |
| RNF-03 | Validación de información | El sistema debe validar la información ingresada antes de almacenarla. | Alta | El sistema impide registrar información incompleta o inválida. |

### Disponibilidad

| ID | Nombre | Descripción | Prioridad | Criterios de aceptación |
|---|---|---|---|---|
| RNF-04 | Operatividad del sistema | El sistema debe mantenerse disponible para su uso cuando el usuario lo requiera. | Alta | El usuario puede acceder y utilizar las funcionalidades del sistema de manera continúa durante su uso. |
| RNF-05 | Recuperación ante fallos menores | El sistema debe restablecer su funcionamiento ante errores menores o interrupciones temporales. | Medía | Ante fallos no críticos, el sistema continúa funcionando o se recupera sin pérdida significativa de información. |

### Rendimiento

| ID | Nombre | Descripción | Prioridad | Criterios de aceptación |
|---|---|---|---|---|
| RNF-06 | Tiempo de respuesta aceptable | El sistema debe responder de manera fluida a las operaciones principales realizadas por el usuario. | Medía | Las búsquedas, registros y consultas se ejecutan sin demoras excesivas perceptibles durante el uso normal. |
| RNF-07 | Generación eficiente de documentos PDF | El sistema debe generar documentos PDF sin afectar significativamente la experiencia de uso. | Medía | Los documentos PDF se generan correctamente en tiempos razonables para el usuario. |

### Usabilidad

| ID | Nombre | Descripción | Prioridad | Criterios de aceptación |
|---|---|---|---|---|
| RNF-08 | Consistencia visual | El sistema debe mantener uniformidad en formularios, diseños y navegación. | Medía | Las pantallas presentan estructuras y estilos coherentes en todo el sistema. |
| RNF-09 | Facilidad de aprendizaje | El sistema debe permitir que el usuario pueda adaptarse rápidamente a su funcionamiento. | Medía | El usuario logra utilizar correctamente las funcionalidades principales con mínima orientación inicial. |