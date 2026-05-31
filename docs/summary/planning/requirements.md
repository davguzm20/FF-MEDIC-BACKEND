# Requisitos del Sistema F&F-MEDIC

## Requisitos Funcionales

### Acceso al sistema

| ID | Nombre | Descripcion | Dependencias | Criterios de aceptacion |
|---|---|---|---|---|
| RF-01 | Iniciar sesion | El sistema debe permitir a los usuarios autenticarse mediante el ingreso de sus credenciales (usuario y contrasena). | Ninguna | Si el usuario ingresa credenciales validas, el sistema permite el acceso. Si las credenciales son incorrectas o estan vacias, el sistema deniega el acceso y muestra un mensaje de error. |
| RF-02 | Cerrar sesion | El sistema debe permitir al usuario cerrar su sesion de manera segura. | RF-01 | Si el usuario cierra sesion, el sistema finaliza la sesion activa y restringe el acceso a las funcionalidades hasta un nuevo inicio de sesion. |
| RF-03 | Solicitar recuperacion de contrasena | El sistema debe permitir que el usuario solicite la recuperacion de su contrasena mediante el ingreso de su correo electronico registrado, enviando un codigo de recuperacion. | RF-01 | Si el usuario ingresa un correo registrado, el sistema genera y envia un codigo de recuperacion. Si el correo no existe o esta vacio, el sistema muestra un mensaje de error. |
| RF-04 | Restablecer contrasena | El sistema debe permitir al usuario establecer una nueva contrasena mediante un token de recuperacion valido. | RF-03 | Si el token es valido y la nueva contrasena cumple las reglas de seguridad, el sistema actualiza la contrasena y confirma el cambio. Si el token es invalido, expiro o la contrasena no cumple las reglas, el sistema rechaza la operacion y muestra un mensaje de error. |

### Gestion de pacientes

| ID | Nombre | Descripcion | Dependencias | Criterios de aceptacion |
|---|---|---|---|---|
| RF-05 | Registrar paciente | El sistema debe permitir al usuario registrar los datos de un nuevo paciente, incluyendo nombres, apellido paterno, materno, tipo y numero de documento de identidad, sexo, telefono, fecha de nacimiento, y la edad que sera calculada automaticamente. | RF-01 | Si los datos ingresados cumplen con las restricciones definidas, el sistema registra al paciente. Si existen datos invalidos, obligatorios incompletos o DNI duplicado, el sistema muestra un mensaje de error y solicita correccion. |
| RF-06 | Listar pacientes | El sistema debe permitir visualizar la lista de pacientes registrados en el sistema. | RF-05 | El sistema muestra correctamente la lista de pacientes registrados con su tipo y numero de documento de identidad, nombres, apellido paterno y materno, sexo y telefono. Si no existen pacientes registrados, el sistema informa que no hay resultados disponibles. |
| RF-07 | Buscar pacientes | El sistema debe permitir buscar pacientes registrados utilizando criterios como numero de documento o nombres o apellido paterno o materno. | RF-05 | Si el usuario ingresa un criterio valido, el sistema muestra los pacientes coincidentes. Si no se ingresa ningun criterio o no existen coincidencias, el sistema muestra un mensaje correspondiente. |
| RF-08 | Visualizar datos del paciente | El sistema debe permitir visualizar la informacion registrada de un paciente previamente registrado. | RF-06, RF-07 | Si el paciente existe y es seleccionado, el sistema muestra correctamente todos sus datos registrados. Si el paciente no existe, el sistema muestra un mensaje de error. |
| RF-09 | Actualizar datos del paciente | El sistema debe permitir modificar la informacion de un paciente registrado, garantizando la consistencia de los datos almacenados. | RF-08 | Si los datos modificados cumplen las restricciones definidas, el sistema actualiza correctamente la informacion del paciente y confirma el cambio. Si los datos son invalidos o ocurre un error al guardar, el sistema muestra un mensaje de error. |

### Gestion de atenciones medicas

| ID | Nombre | Descripcion | Dependencias | Criterios de aceptacion |
|---|---|---|---|---|
| RF-10 | Registrar atencion medica | El sistema debe permitir registrar una atencion medica asociada a un paciente, incluyendo los datos de antecedentes, evaluacion, presuncion diagnostica, plan de trabajo e interconsultas. | RF-05 | Si los datos ingresados cumplen con las restricciones definidas, el sistema registra la atencion medica. Si los datos son invalidos o incompletos, el sistema muestra un mensaje de error y solicita correccion. |
| RF-11 | Listar atenciones medicas de un paciente | El sistema debe permitir visualizar el listado de atenciones medicas registradas de un paciente. | RF-10 | El sistema muestra correctamente todas las atenciones medicas asociadas al paciente seleccionado. Si el paciente no tiene atenciones registradas, el sistema muestra un mensaje informativo. |
| RF-12 | Buscar atenciones medicas de un paciente | El sistema debe permitir buscar atenciones medicas de un paciente mediante criterios como fecha de registro. | RF-11 | Si el usuario ingresa criterios validos, el sistema muestra las atenciones medicas coincidentes. Si no existen resultados o no se ingresa ningun criterio, el sistema muestra un mensaje correspondiente. |
| RF-13 | Visualizar datos de la atencion medica de un paciente | El sistema debe permitir visualizar el detalle completo de una atencion medica registrada de un paciente. | RF-11 | Si la atencion medica existe y es seleccionada, el sistema muestra correctamente todos los datos registrados. Si la atencion no existe, el sistema muestra un mensaje de error. |
| RF-14 | Actualizar datos de la atencion medica de un paciente | El sistema debe permitir modificar los datos de una atencion medica previamente registrada, respetando las restricciones definidas. | RF-13 | Si los datos modificados son validos, el sistema actualiza correctamente la atencion medica y confirma los cambios. Si los datos son invalidos o ocurre un error al guardar, el sistema muestra un mensaje de error y no actualiza la informacion. |

### Generacion de documentos medicos

| ID | Nombre | Descripcion | Dependencias | Criterios de aceptacion |
|---|---|---|---|---|
| RF-15 | Generar receta medica | El sistema debe permitir generar un documento PDF de la receta medica asociada a una atencion medica. | RF-10 | Si la atencion medica contiene medicamentos, el sistema genera correctamente el PDF de la receta medica y permite visualizarlo. Si no existen medicamentos o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-19 | Generar receta medica por diagnostico | El sistema debe permitir generar documentos PDF de recetas medicas filtradas por diagnostico, incluyendo unicamente los medicamentos asociados al diagnostico seleccionado. | RF-10, RF-15 | Si existen medicamentos asociados a un diagnostico especifico, el sistema genera correctamente una receta PDF independiente para dicho diagnostico y permite visualizarla. Si no existen medicamentos asociados, el sistema muestra un mensaje informativo. |
| RF-16 | Generar orden de examenes auxiliares | El sistema debe permitir generar un documento PDF con las ordenes de examenes auxiliares asociadas a una atencion medica. | RF-10 | Si la atencion medica contiene examenes auxiliares, el sistema genera correctamente el PDF de ordenes de examenes y permite visualizarlo. Si no existen examenes o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-17 | Generar orden de interconsulta | El sistema debe permitir generar un documento PDF de interconsulta asociado a una atencion medica. | RF-10 | Si la atencion medica contiene interconsultas, el sistema genera correctamente el PDF de interconsulta y permite visualizarlo. Si no existen interconsultas o ocurre un error, el sistema muestra un mensaje informativo o de error. |
| RF-18 | Exportar reportes en PDF | El sistema debe permitir exportar los reportes generados en formato PDF. | RF-15, RF-16, RF-17, RF-19 | Si existe informacion disponible para el reporte, el sistema genera correctamente el documento PDF y permite su descarga o impresion. Si ocurre un error durante la generacion, el sistema notifica el problema al usuario. |

### Gestion de estadisticas

| ID | Nombre | Descripcion | Dependencias | Criterios de aceptacion |
|---|---|---|---|---|
| RF-20 | Visualizar estadisticas generales | El sistema debe permitir visualizar estadisticas generales, incluyendo cantidad de pacientes registrados, total de atenciones medicas, pacientes atendidos en el dia y promedio de tiempo de atencion. | RF-05, RF-10 | El sistema muestra correctamente las estadisticas generales. Si no existen datos registrados, el sistema muestra valores vacios o un mensaje informativo. |
| RF-21 | Visualizar distribucion de pacientes por sexo | El sistema debe permitir visualizar la distribucion de pacientes registrados segun sexo mediante grafico estadistico. | RF-05 | El sistema muestra correctamente la distribucion de pacientes por sexo utilizando representacion grafica. Si no existen pacientes registrados, el sistema muestra un mensaje informativo. |
| RF-22 | Visualizar distribucion de pacientes por grupo etario | El sistema debe permitir visualizar la distribucion de pacientes registrados segun grupos etarios mediante grafico estadistico. | RF-05 | El sistema muestracorrectamente la distribucion de pacientes por grupos etarios utilizando representacion grafica. Si no existen pacientes registrados, el sistema muestra un mensaje informativo. |
| RF-23 | Visualizar distribucion de atenciones por fecha | El sistema debe permitir visualizar la distribucion de atenciones medicas registradas segun fecha mediante grafico estadistico. | RF-10 | El sistema muestra correctamente la distribucion de atenciones medicas por fecha utilizando representacion grafica. Si no existen atenciones registradas, el sistema muestra un mensaje informativo. |

## Requisitos No Funcionales

### Seguridad

| ID | Nombre | Descripcion | Prioridad | Criterios de aceptacion |
|---|---|---|---|---|
| RNF-01 | Acceso seguro al sistema | El sistema debe permitir el acceso unicamente al usuario autorizado. | Alta | El usuario debe autenticarse correctamente antes de acceder a las funcionalidades del sistema. |
| RNF-02 | Proteccion de informacion | El sistema debe proteger la informacion almacenada y transmitida entre la aplicacion y la base de datos remota. | Alta | La informacion registrada y consultada no puede ser visualizada ni modificada por terceros no autorizados. |
| RNF-03 | Validacion de informacion | El sistema debe validar la informacion ingresada antes de almacenarla. | Alta | El sistema impide registrar informacion incompleta o invalida. |

### Disponibilidad

| ID | Nombre | Descripcion | Prioridad | Criterios de aceptacion |
|---|---|---|---|---|
| RNF-04 | Operatividad del sistema | El sistema debe mantenerse disponible para su uso cuando el usuario lo requiera. | Alta | El usuario puede acceder y utilizar las funcionalidades del sistema de manera continua durante su uso. |
| RNF-05 | Recuperacion ante fallos menores | El sistema debe restablecer su funcionamiento ante errores menores o interrupciones temporales. | Media | Ante fallos no criticos, el sistema continua funcionando o se recupera sin perdida significativa de informacion. |

### Rendimiento

| ID | Nombre | Descripcion | Prioridad | Criterios de aceptacion |
|---|---|---|---|---|
| RNF-06 | Tiempo de respuesta aceptable | El sistema debe responder de manera fluida a las operaciones principales realizadas por el usuario. | Media | Las busquedas, registros y consultas se ejecutan sin demoras excesivas perceptibles durante el uso normal. |
| RNF-07 | Generacion eficiente de documentos PDF | El sistema debe generar documentos PDF sin afectar significativamente la experiencia de uso. | Media | Los documentos PDF se generan correctamente en tiempos razonables para el usuario. |

### Usabilidad

| ID | Nombre | Descripcion | Prioridad | Criterios de aceptacion |
|---|---|---|---|---|
| RNF-08 | Consistencia visual | El sistema debe mantener uniformidad en formularios, disenos y navegacion. | Media | Las pantallas presentan estructuras y estilos coherentes en todo el sistema. |
| RNF-09 | Facilidad de aprendizaje | El sistema debe permitir que el usuario pueda adaptarse rapidamente a su funcionamiento. | Media | El usuario logra utilizar correctamente las funcionalidades principales con minima orientacion inicial. |