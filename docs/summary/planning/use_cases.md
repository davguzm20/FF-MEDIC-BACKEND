# Especificación de Casos de Uso F&F-MEDIC

## 4.1. Diagrama de Casos de Uso

> *(El diagrama se encuentra en el documento original PDF)*

---

## 4.2. Especificación de Casos de Uso

### 4.2.1. Acceso al Sistema

#### CU-01: Iniciar Sesión

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario autenticarse en el sistema mediante el ingreso de sus credenciales. |
| **Actor** | Usuario |
| **Precondiciones** | El usuario debe encontrarse registrado en el sistema. |
| **Postcondiciones** | El usuario accede al sistema y puede utilizar sus funciones. |
| **Flujo principal** | 1. El usuario accede a la pantalla de inicio de sesión.<br>2. El sistema muestra el formulario de autenticación.<br>3. El usuario ingresa los datos: a) Su usuario, b) y su contraseña.<br>4. El usuario presiona en iniciar sesión.<br>5. El sistema valida las credenciales ingresadas.<br>6. El sistema permite el acceso al sistema. |
| **Flujos alternos** | 5a. Si las credenciales son incorrectas, el sistema muestra un mensaje de error y solicita nuevamente el ingreso de datos.<br>4a. Si existen campos vacíos, el sistema solicita completar los datos requeridos. |

#### CU-02: Cerrar Sesión

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario finalizar de manera segura su sesión activa en el sistema. |
| **Actor** | Usuario |
| **Precondiciones** | El usuario ha iniciado sesión en el sistema. |
| **Postcondiciones** | La sesión del usuario queda finalizada y el acceso al sistema es restringido hasta un nuevo inicio de sesión. |
| **Flujo principal** | 1. El usuario selecciona la opción "Cerrar sesión".<br>2. El sistema finaliza la sesión activa del usuario.<br>3. El sistema redirige al usuario a la pantalla de inicio de sesión. |
| **Flujos alternos** | No aplica. |

#### CU-03: Solicitar Recuperación de Contraseña

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario solicitar la recuperación de su contraseña mediante el correo electrónico registrado en el sistema. |
| **Actor** | Usuario |
| **Precondiciones** | El usuario se encuentra registrado en el sistema. |
| **Postcondiciones** | El sistema genera y envía un código o token de recuperación al correo electrónico del usuario. |
| **Flujo principal** | 1. El usuario selecciona la opción "Olvidé mi contraseña".<br>2. El sistema solicita el correo electrónico registrado.<br>3. El usuario ingresa su correo electrónico.<br>4. El usuario presiona en "enviar código de recuperación".<br>5. El sistema valida la existencia del correo electrónico.<br>6. El sistema genera un código o token de recuperación.<br>7. El sistema envía el código o token al correo electrónico del usuario. |
| **Flujos alternos** | 5a. Si el correo electrónico no existe, el sistema muestra un mensaje de error.<br>4a. Si el campo correo electrónico está vacío, el sistema solicita completar el dato requerido. |

#### CU-04: Restablecer Contraseña

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario establecer una nueva contraseña mediante un token de recuperación válido. |
| **Actor** | Usuario |
| **Precondiciones** | El usuario tiene un token o código de recuperación válido. |
| **Postcondiciones** | La contraseña del usuario queda actualizada en el sistema. |
| **Flujo principal** | 1. El sistema solicita el token o código de recuperación.<br>2. El usuario ingresa el token de recuperación.<br>3. El sistema valida el token ingresado.<br>4. El sistema habilita el formulario para ingresar la nueva contraseña.<br>5. El usuario ingresa y confirma la nueva contraseña.<br>6. El sistema valida las reglas de seguridad de la nueva contraseña.<br>7. El sistema actualiza la contraseña del usuario.<br>8. El sistema confirma el cambio realizado exitosamente. |
| **Flujos alternos** | 3a. Si el token es inválido o expiró, el sistema rechaza la operación y muestra un mensaje de error.<br>6a. Si la nueva contraseña no cumple las reglas de seguridad, el sistema solicita corregir la información ingresada. |

---

### 4.2.2. Gestión de Pacientes

#### CU-05: Registrar Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario registrar un nuevo paciente en el sistema. |
| **Actor** | Usuario |
| **Precondiciones** | El usuario ha iniciado sesión en el sistema. |
| **Postcondiciones** | El paciente queda registrado en el sistema. |
| **Flujo principal** | 1. El usuario selecciona la opción "Registrar paciente".<br>2. El sistema muestra el formulario de registro de pacientes.<br>3. El usuario ingresa los datos del paciente: a) Nombres, apellido paterno, materno, tipo y número de documento de identidad, sexo, teléfono y fecha de nacimiento, la edad se calcula automáticamente con la fecha de nacimiento.<br>4. El usuario presiona en guardar la información.<br>5. El sistema valida los datos ingresados.<br>6. El sistema registra al paciente.<br>7. El sistema confirma el registro exitoso. |
| **Flujos alternos** | 5a. Si existen datos inválidos o incompletos, el sistema muestra un mensaje de error y solicita corrección.<br>5b. Si el número de documento ya se encuentra registrado, el sistema informa que el paciente ya existe. |

#### CU-06: Buscar Pacientes

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario buscar pacientes registrados mediante criterios como número de documento o nombres y apellido paterno y materno. |
| **Actor** | Usuario |
| **Precondiciones** | Existen pacientes registrados en el sistema. |
| **Postcondiciones** | El sistema muestra los pacientes encontrados según el criterio de búsqueda ingresado. |
| **Flujo principal** | 1. El usuario accede a la pantalla de pacientes.<br>2. El sistema muestra la barra de búsqueda.<br>3. El usuario ingresa el criterio de búsqueda: a) número de documento de identidad, b) o nombres y apellido paterno y materno del paciente.<br>4. El sistema valida el criterio ingresado.<br>5. El sistema realiza la búsqueda de pacientes.<br>6. El sistema muestra la lista de pacientes coincidentes. |
| **Flujos alternos** | 4a. Si el usuario no ingresa ningún criterio, el sistema solicita ingresar información para realizar la búsqueda.<br>6a. Si no existen coincidencias, el sistema muestra un mensaje informativo. |

#### CU-07: Visualizar Datos del Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario visualizar los datos registrados de un paciente. |
| **Actor** | Usuario |
| **Precondiciones** | Existen pacientes registrados en el sistema. |
| **Postcondiciones** | El sistema muestra los datos registrados del paciente seleccionado. |
| **Flujo principal** | 1. El usuario selecciona un paciente.<br>2. El sistema muestra los datos registrados del paciente: a) Nombres, apellido paterno, materno, tipo y número de documento de identidad, sexo, teléfono, fecha de nacimiento y edad. |
| **Flujos alternos** | No aplica. |

#### CU-08: Actualizar Datos del Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario modificar los datos de un paciente previamente registrado. |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema. |
| **Postcondiciones** | Los datos del paciente quedan actualizados en el sistema. |
| **Flujo principal** | 1. El usuario selecciona un paciente.<br>2. El sistema muestra los datos registrados del paciente.<br>3. El usuario modifica los datos necesarios.<br>4. El usuario presiona en guardar los cambios.<br>5. El sistema valida los datos ingresados.<br>6. El sistema actualiza los datos del paciente.<br>7. El sistema confirma la actualización exitosa. |
| **Flujos alternos** | 5a. Si los datos ingresados son inválidos o incompletos, el sistema muestra un mensaje de error y solicita corrección.<br>6a. Si ocurre un error al guardar los datos, el sistema notifica el problema y no realiza la actualización. |

---

### 4.2.3. Gestión de Atenciones Médicas

#### CU-09: Registrar Atención Médica

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario registrar una atención médica asociada a un paciente. |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema. |
| **Postcondiciones** | Los datos de la atención médica quedan registrados y asociados al paciente. |
| **Flujo principal** | 1. El usuario selecciona un paciente.<br>2. El usuario selecciona la opción "Registrar atención médica".<br>3. El sistema muestra el formulario de atención médica.<br>4. El sistema muestra información previa del paciente y antecedentes registrados si existieran.<br>5. El usuario ingresa los datos correspondientes:<br>  a) **Antecedentes:** patológicos, RAM, alergias, quirúrgicos, familiares y ginecológicos.<br>  b) **Evaluación:** Signos y síntomas relevantes, motivo de consulta, enfermedad actual, funciones biológicas, somatometría, signos vitales, parámetros metabólicos y examen físico.<br>  c) **Presunción diagnóstica:** diagnóstico médico.<br>  d) **Plan de trabajo:** receta médica y exámenes auxiliares.<br>  e) **Interconsulta:** interconsulta médica.<br>6. El usuario presiona en guardar la atención médica.<br>7. El sistema valida los datos ingresados.<br>8. El sistema registra la atención médica asociándola al paciente.<br>9. El sistema confirma el registro exitoso. |
| **Flujos alternos** | 7a. Si existen datos inválidos o incompletos, el sistema muestra mensajes de error y solicita corrección.<br>8a. Si ocurre un error al guardar los datos, el sistema notifica el problema y no realiza el registro. |

#### CU-10: Buscar Atenciones Médicas de un Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario buscar atenciones médicas registradas de un paciente mediante criterios como fecha. |
| **Actor** | Usuario |
| **Precondiciones** | El paciente se encuentra registrado en el sistema. |
| **Postcondiciones** | El sistema muestra las atenciones médicas coincidentes con el criterio ingresado. |
| **Flujo principal** | 1. El usuario accede a la pantalla de pacientes.<br>2. El sistema muestra la barra de búsqueda.<br>3. El usuario ingresa el criterio de búsqueda: a) fecha de registro.<br>4. El sistema valida el criterio ingresado.<br>5. El sistema realiza la búsqueda de atenciones médicas.<br>6. El sistema muestra los resultados encontrados. |
| **Flujos alternos** | 4a. Si el usuario no ingresa ningún criterio, el sistema solicita ingresar información para realizar la búsqueda.<br>6a. Si no existen resultados coincidentes, el sistema muestra un mensaje informativo. |

#### CU-11: Visualizar Datos de la Atención Médica de un Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario visualizar los datos de una atención médica registrada. |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atención médica registrada asociada a un paciente. |
| **Postcondiciones** | El sistema muestra todos los datos de la atención médica seleccionada. |
| **Flujo principal** | 1. El usuario selecciona una atención médica.<br>2. El sistema muestra el detalle completo de la atención médica registrada. |
| **Flujos alternos** | No aplica. |

#### CU-12: Actualizar Datos de la Atención Médica de un Paciente

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario modificar los datos de una atención médica registrada. |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atención médica registrada asociada a un paciente. Se está dentro del plazo de 24 horas para actualizar esa atención médica. |
| **Postcondiciones** | La atención médica queda actualizada con los datos nuevos ingresados. |
| **Flujo principal** | 1. El usuario selecciona una atención médica.<br>2. El sistema muestra los datos registrados de la atención médica.<br>3. El usuario modifica los datos.<br>4. El usuario presiona en guardar los cambios.<br>5. El sistema valida los datos ingresados.<br>6. El sistema actualiza la atención médica.<br>7. El sistema confirma la actualización exitosa. |
| **Flujos alternos** | 5a. Si los datos ingresados son inválidos o incompletos, el sistema muestra mensajes de error y solicita corrección.<br>6a. Si ocurre un error durante la actualización, el sistema notifica el problema y no guarda los cambios. |

---

### 4.2.4. Generación de Documentos Médicos

#### CU-13: Generar Receta Médica

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario generar un documento PDF de la receta médica asociada a una atención médica registrada o en curso. |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atención médica registrada o en curso. La atención médica contiene al menos un medicamento ingresado o registrado. |
| **Postcondiciones** | El documento PDF de la receta médica queda generado y disponible para visualización, descarga o impresión. |
| **Flujo principal** | 1. El usuario selecciona una atención médica registrada o se encuentra en el proceso de registrar una.<br>2. El usuario accede a la sección de receta médica.<br>3. El sistema verifica la existencia de medicamentos registrados.<br>4. El usuario presiona en generar la receta médica en PDF.<br>5. El sistema genera el documento PDF.<br>6. El sistema muestra la vista previa del documento generado.<br>7. El usuario puede descargar o imprimir el documento. |
| **Flujos alternos** | 3a. Si no existen medicamentos registrados, el sistema muestra un mensaje informativo y no permite generar el documento.<br>5a. Si ocurre un error durante la generación del PDF, el sistema notifica el problema al usuario. |

#### CU-14: Generar Orden de Exámenes Auxiliares

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario generar un documento PDF de órdenes de exámenes auxiliares asociados a una atención médica registrada o en curso. |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atención médica registrada o en curso. La atención médica contiene al menos un examen ingresado o registrado. |
| **Postcondiciones** | El documento PDF de órdenes de exámenes auxiliares queda generado y disponible para visualización, descarga o impresión. |
| **Flujo principal** | 1. El usuario selecciona una atención médica registrada o se encuentra en el proceso de registrar una.<br>2. El usuario accede a la sección de exámenes auxiliares.<br>3. El sistema verifica la existencia de exámenes registrados.<br>4. El usuario solicita generar el documento PDF.<br>5. El sistema genera el documento PDF de órdenes de exámenes.<br>6. El sistema muestra la vista previa del documento generado.<br>7. El usuario puede descargar o imprimir el documento. |
| **Flujos alternos** | 3a. Si no existen exámenes auxiliares registrados, el sistema muestra un mensaje informativo y no permite generar el documento.<br>5a. Si ocurre un error durante la generación del PDF, el sistema notifica el problema al usuario. |

#### CU-15: Generar Orden de Interconsulta

| Campo | Detalle |
|---|---|
| **Descripción** | Permite al usuario generar un documento PDF de interconsulta asociado a una atención médica registrada o en curso. |
| **Actor** | Usuario |
| **Precondiciones** | Existe una atención médica registrada o en curso. La atención médica contiene al menos una interconsulta ingresada o registrada. |
| **Postcondiciones** | El documento PDF de interconsulta queda generado y disponible para visualización, descarga o impresión. |
| **Flujo principal** | 1. El usuario selecciona una atención médica registrada o se encuentra en el proceso de registrar una.<br>2. El usuario accede a la sección de interconsulta.<br>3. El sistema verifica la existencia de interconsultas registradas.<br>4. El usuario solicita generar el documento PDF.<br>5. El sistema genera el documento PDF de interconsulta.<br>6. El sistema muestra la vista previa del documento generado.<br>7. El usuario puede descargar o imprimir el documento. |
| **Flujos alternos** | 3a. Si no existen interconsultas registradas, el sistema muestra un mensaje informativo y no permite generar el documento.<br>5a. Si ocurre un error durante la generación del PDF, el sistema notifica el problema al usuario. |
