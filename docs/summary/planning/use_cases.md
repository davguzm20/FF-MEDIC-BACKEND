# Casos de Uso F&F-MEDIC

## Diagrama de Casos de Uso

> El diagrama se encuentra en el documento original PDF

---

## Acceso al Sistema

### CU-01: Iniciar Sesion

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario autenticarse en el sistema mediante el ingreso de sus credenciales |
| **Actor** | Usuario |
| **Precondiciones** | El usuario debe encontrarse registrado en el sistema |
| **Postcondiciones** | El usuario accede al sistema y puede utilizar sus funciones |
| **Flujo principal** | 1. El usuario accede a la pantalla de inicio de sesion<br>2. El sistema muestra el formulario de autenticacion<br>3. El usuario ingresa los datos: su usuario y su contrasena<br>4. El usuario presiona en iniciar sesion<br>5. El sistema valida las credenciales ingresadas<br>6. El sistema permite el acceso al sistema |
| **Flujos alternos** | 5a. Si las credenciales son incorrectas, el sistema muestra un mensaje de error<br>4a. Si existen campos vacios, el sistema solicita completar los datos requeridos |

### CU-02: Cerrar Sesion

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario finalizar de manera segura su sesion activa en el sistema |
| **Actor** | Usuario |
| **Precondiciones** | El usuario ha iniciado sesion en el sistema |
| **Postcondiciones** | La sesion del usuario queda finalizada y el acceso al sistema es restringido |
| **Flujo principal** | 1. El usuario selecciona la opcion Cerrar sesion<br>2. El sistema finaliza la sesion activa del usuario<br>3. El sistema redirige al usuario a la pantalla de inicio de sesion |
| **Flujos alternos** | No aplica |

### CU-03: Solicitar Recuperacion de Contrasena

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario solicitar la recuperacion de su contrasena mediante el correo electronico registrado |
| **Actor** | Usuario |
| **Precondiciones** | El usuario se encuentra registrado en el sistema |
| **Postcondiciones** | El sistema genera y envia un codigo de recuperacion al correo del usuario |
| **Flujo principal** | 1. El usuario selecciona la opcion Olvide mi contrasena<br>2. El sistema solicita el correo electronico registrado<br>3. El usuario ingresa su correo electronico<br>4. El usuario presiona en enviar codigo de recuperacion<br>5. El sistema valida la existencia del correo electronico<br>6. El sistema genera un codigo de recuperacion<br>7. El sistema envia el codigo al correo electronico del usuario |
| **Flujos alternos** | 5a. Si el correo electronico no existe, el sistema muestra un mensaje de error<br>4a. Si el campo correo esta vacio, el sistema solicita completar el dato |

### CU-04: Restablecer Contrasena

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario establecer una nueva contrasena mediante un token de recuperacion valido |
| **Actor** | Usuario |
| **Precondiciones** | El usuario tiene un token de recuperacion valido |
| **Postcondiciones** | La contrasena del usuario queda actualizada en el sistema |
| **Flujo principal** | 1. El sistema solicita el token de recuperacion<br>2. El usuario ingresa el token de recuperacion<br>3. El sistema valida el token ingresado<br>4. El sistema habilita el formulario para la nueva contrasena<br>5. El usuario ingresa y confirma la nueva contrasena<br>6. El sistema valida las reglas de seguridad<br>7. El sistema actualiza la contrasena<br>8. El sistema confirma el cambio exitoso |
| **Flujos alternos** | 3a. Si el token es invalido o expiro, el sistema rechaza la operacion<br>6a. Si la nueva contrasena no cumple las reglas, el sistema solicita correccion |

---

## Gestion de Pacientes

### CU-05: Registrar Paciente

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario registrar un nuevo paciente en el sistema |
| **Actor** | Usuario |
| **Precondiciones** | El usuario ha iniciado sesion en el sistema |
| **Postcondiciones** | El paciente queda registrado en el sistema |
| **Flujo principal** | 1. El usuario selecciona la opcion Registrar paciente<br>2. El sistema muestra el formulario de registro<br>3. El usuario ingresa los datos del paciente: nombres, apellido paterno, materno, tipo y numero de documento, sexo, telefono y fecha de nacimiento. La edad se calcula automaticamente<br>4. El usuario presiona en guardar<br>5. El sistema valida los datos ingresados<br>6. El sistema registra al paciente<br>7. El sistema confirma el registro exitoso |
| **Flujos alternos** | 5a. Si existen datos invalidos o incompletos, el sistema muestra un mensaje de error<br>5b. Si el numero de documento ya esta registrado, el sistema informa que el paciente ya existe |

### CU-06: Buscar Pacientes

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario buscar pacientes registrados mediante criterios de busqueda |
| **Actor** | Usuario |
| **Precondiciones** | Existen pacientes registrados en el sistema |
| **Postcondiciones** | El sistema muestra los pacientes encontrados segun el criterio ingresado |
| **Flujo principal** | 1. El usuario accede a la pantalla de pacientes<br>2. El sistema muestra la barra de busqueda<br>3. El usuario ingresa el criterio de busqueda: numero de documento o nombres y apellidos<br>4. El sistema valida el criterio ingresado<br>5. El sistema realiza la busqueda<br>6. El sistema muestra la lista de pacientes coincidentes |
| **Flujos alternos** | 4a. Si el usuario no ingresa ningun criterio, el sistema solicita ingresar informacion<br>6a. Si no existen coincidencias, el sistema muestra un mensaje informativo |

### CU-07: Visualizar Datos del Paciente

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario visualizar los datos registrados de un paciente |
| **Actor** | Usuario |
| **Precondiciones** | Existen pacientes registrados en el sistema |
| **Postcondiciones** | El sistema muestra los datos registrados del paciente seleccionado |
| **Flujo principal** | 1. El usuario selecciona un paciente<br>2. El sistema muestra los datos registrados: nombres, apellidos, documento, sexo, telefono, fecha de nacimiento y edad |
| **Flujos alternos** | No aplica |

### CU-08: Actualizar Datos del Paciente

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario modificar los datos de un paciente previamente registrado |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema |
| **Postcondiciones** | Los datos del paciente quedan actualizados en el sistema |
| **Flujo principal** | 1. El usuario selecciona un paciente<br>2. El sistema muestra los datos registrados<br>3. El usuario modifica los datos necesarios<br>4. El usuario presiona en guardar los cambios<br>5. El sistema valida los datos ingresados<br>6. El sistema actualiza los datos<br>7. El sistema confirma la actualizacion exitosa |
| **Flujos alternos** | 5a. Si los datos son invalidos o incompletos, el sistema muestra un mensaje de error<br>6a. Si ocurre un error al guardar, el sistema notifica el problema |

---

## Gestion de Atenciones Medicas

### CU-09: Registrar Atencion Medica

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario registrar una atencion medica asociada a un paciente |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema |
| **Postcondiciones** | Los datos de la atencion medica quedan registrados y asociados al paciente |
| **Flujo principal** | 1. El usuario selecciona un paciente<br>2. El usuario selecciona la opcion Registrar atencion medica<br>3. El sistema muestra el formulario de atencion medica<br>4. El sistema muestra informacion previa del paciente y antecedentes si existieran<br>5. El usuario ingresa los datos: Antecedentes, Evaluacion, Presuncion diagnostica, Plan de trabajo e Interconsulta<br>6. El usuario presiona en guardar<br>7. El sistema valida los datos ingresados<br>8. El sistema registra la atencion medica<br>9. El sistema confirma el registro exitoso |
| **Flujos alternos** | 7a. Si existen datos invalidos o incompletos, el sistema muestra mensajes de error<br>8a. Si ocurre un error al guardar, el sistema notifica el problema |

### CU-10: Buscar Atenciones Medicas

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario buscar atenciones medicas de un paciente mediante criterios como fecha |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema |
| **Postcondiciones** | El sistema muestra las atenciones medicas coincidentes con el criterio ingresado |
| **Flujo principal** | 1. El usuario accede a la pantalla de pacientes<br>2. El sistema muestra la barra de busqueda<br>3. El usuario ingresa el criterio de busqueda: fecha de registro<br>4. El sistema valida el criterio<br>5. El sistema realiza la busqueda<br>6. El sistema muestra los resultados |
| **Flujos alternos** | 4a. Si no se ingresa ningun criterio, el sistema solicita ingresar informacion<br>6a. Si no existen resultados, el sistema muestra un mensaje informativo |

### CU-11: Visualizar Atencion Medica

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario visualizar los datos de una atencion medica registrada |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atencion medica registrada asociada a un paciente |
| **Postcondiciones** | El sistema muestra todos los datos de la atencion medica seleccionada |
| **Flujo principal** | 1. El usuario selecciona una atencion medica<br>2. El sistema muestra el detalle completo de la atencion |
| **Flujos alternos** | No aplica |

### CU-12: Actualizar Atencion Medica

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite al usuario modificar los datos de una atencion medica registrada |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atencion medica registrada. Se esta dentro del plazo de 24 horas para actualizarla |
| **Postcondiciones** | La atencion medica queda actualizada con los nuevos datos |
| **Flujo principal** | 1. El usuario selecciona una atencion medica<br>2. El sistema muestra los datos registrados<br>3. El usuario modifica los datos<br>4. El usuario presiona en guardar los cambios<br>5. El sistema valida los datos<br>6. El sistema actualiza la atencion<br>7. El sistema confirma la actualizacion exitosa |
| **Flujos alternos** | 5a. Si los datos son invalidos o incompletos, el sistema muestra mensajes de error<br>6a. Si ocurre un error, el sistema notifica el problema y no guarda los cambios |

---

## Generacion de Documentos Medicos

### CU-13: Generar Receta Medica

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite generar un documento PDF de la receta medica asociada a una atencion |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atencion medica registrada o en curso. Contiene al menos un medicamento |
| **Postcondiciones** | El PDF de la receta medica queda generado y disponible |
| **Flujo principal** | 1. El usuario selecciona una atencion medica<br>2. El usuario accede a la seccion de receta medica<br>3. El sistema verifica la existencia de medicamentos<br>4. El usuario presiona en generar PDF<br>5. El sistema genera el documento<br>6. El sistema muestra la vista previa<br>7. El usuario puede descargar o imprimir |
| **Flujos alternos** | 3a. Si no existen medicamentos, el sistema muestra un mensaje informativo<br>5a. Si ocurre un error, el sistema notifica al usuario |

### CU-14: Generar Orden de Examenes Auxiliares

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite generar un documento PDF de ordenes de examenes auxiliares |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atencion medica. Contiene al menos un examen registrado |
| **Postcondiciones** | El PDF de ordenes de examenes queda generado y disponible |
| **Flujo principal** | 1. El usuario selecciona una atencion medica<br>2. El usuario accede a la seccion de examenes<br>3. El sistema verifica la existencia de examenes<br>4. El usuario solicita generar el PDF<br>5. El sistema genera el documento<br>6. El sistema muestra la vista previa<br>7. El usuario puede descargar o imprimir |
| **Flujos alternos** | 3a. Si no existen examenes, el sistema muestra un mensaje informativo<br>5a. Si ocurre un error, el sistema notifica al usuario |

### CU-15: Generar Orden de Interconsulta

| Campo | Detalle |
|---|---|
| **Descripcion** | Permite generar un documento PDF de interconsulta |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atencion medica. Contiene al menos una interconsulta registrada |
| **Postcondiciones** | El PDF de interconsulta queda generado y disponible |
| **Flujo principal** | 1. El usuario selecciona una atencion medica<br>2. El usuario accede a la seccion de interconsulta<br>3. El sistema verifica la existencia de interconsultas<br>4. El usuario solicita generar el PDF<br>5. El sistema genera el documento<br>6. El sistema muestra la vista previa<br>7. El usuario puede descargar o imprimir |
| **Flujos alternos** | 3a. Si no existen interconsultas, el sistema muestra un mensaje informativo<br>5a. Si ocurre un error, el sistema notifica al usuario |