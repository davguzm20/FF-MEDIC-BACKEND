# Historias de Usuario F&F-MEDIC

**Versión:** 2.0
**Fecha:** 16/05/2026
**Autores:** Jeanmarco Rosales Trinidad, Manuel David Guzman Chavez, Iris Marisol Hanampa Bellido

## Historial de Cambios

| Fecha | Descripción | Autor |
|---|---|---|
| 24 abr 2026 | Versión preliminar de las historias de usuario | Jeanmarco Rosales |
| 16 may 2026 | Formato de historias de usuario modificado, función de crear elementos en catálogo eliminada, campo teléfono agregado | Jeanmarco Rosales |

---

## Épica 1: Acceso al Sistema

### #001: Iniciar Sesión

**Como** médico
**Quiero** iniciar sesión en el sistema
**Para** acceder a las funciones de atención médica

**Criterios de aceptación:**
- El sistema debe permitir el acceso al usuario cuando las credenciales ingresadas sean válidas.
- El sistema debe mostrar un mensaje de error cuando las credenciales ingresadas sean incorrectas.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacíos.
- El sistema debe redirigir al usuario al panel principal después de iniciar sesión correctamente.

---

### #002: Solicitar Recuperación de Contraseña

**Como** médico
**Quiero** solicitar la recuperación de mi contraseña
**Para** poder acceder a las funciones de atención médica

**Criterios de aceptación:**
- El sistema debe permitir el ingreso de un correo electrónico registrado.
- El sistema debe impedir continuar y mostrar una advertencia cuando el campo de correo electrónico está vacío.
- El sistema debe enviar un código de verificación al correo electrónico ingresado.
- El sistema debe mostrar un mensaje de error cuando el correo electrónico ingresado no exista en el sistema.
- El sistema debe permitir continuar al proceso de verificación cuando el correo electrónico sea válido.

---

### #003: Restablecer Contraseña

**Como** médico
**Quiero** restablecer mi contraseña usando un código de verificación
**Para** poder acceder nuevamente al sistema

**Criterios de aceptación:**
- El sistema debe permitir el ingreso del código de verificación recibido.
- El sistema debe validar que el código de verificación ingresado sea correcto.
- El sistema debe permitir el ingreso de una nueva contraseña.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacíos.
- El sistema debe mostrar un mensaje de error cuando el código de verificación ingresado sea incorrecto.
- El sistema debe actualizar la contraseña cuando la validación del código sea exitosa.

---

### #004: Cerrar Sesión

**Como** médico
**Quiero** cerrar mi sesión
**Para** finalizar mi acceso al sistema de forma segura

**Criterios de aceptación:**
- El sistema debe cerrar la sesión del usuario cuando se seleccione la opción "Cerrar sesión".
- El sistema debe redirigir al usuario a la pantalla de inicio de sesión después de cerrar la sesión.
- El sistema no debe permitir el acceso a páginas protegidas una vez finalizada la sesión.

---

## Épica 2: Gestión de Pacientes

### #005: Registrar Pacientes

**Como** médico
**Quiero** registrar pacientes nuevos
**Para** contar con su información en el sistema

**Criterios de aceptación:**
- El sistema debe permitir el ingreso de los datos del paciente, incluyendo nombres, apellido paterno, materno, tipo y número de documento de identidad, sexo, teléfono y fecha de nacimiento, la edad será calculada automáticamente.
- El sistema debe impedir registrar y mostrar una advertencia cuando existan campos obligatorios vacíos.
- El sistema debe mostrar un mensaje de confirmación cuando el registro del paciente sea exitoso o de error si ocurrió un fallo durante el proceso de registro.
- El sistema no debe permitir el registro de pacientes duplicados según el número de documento de identidad ingresado.

---

### #006: Editar Pacientes Registrados

**Como** médico
**Quiero** editar la información de mis pacientes registrados
**Para** mantener su información actualizada

**Criterios de aceptación:**
- El sistema debe mostrar los datos registrados del paciente.
- El sistema debe permitir la modificación de los datos.
- El sistema debe impedir actualizar y mostrar una advertencia cuando existan campos obligatorios vacíos.
- El sistema debe mostrar un mensaje de confirmación cuando la actualización de la información sea exitosa.
- El sistema debe mostrar un mensaje de error cuando ocurra un fallo durante el proceso de actualización.

---

### #007: Buscar Pacientes Registrados

**Como** médico
**Quiero** buscar pacientes registrados
**Para** localizar al paciente y acceder a su ficha cuando lo necesite

**Criterios de aceptación:**
- El sistema debe permitir la búsqueda de pacientes mediante el número de documento de identidad o el nombre o apellido paterno o materno del paciente.
- El sistema debe mostrar una lista de pacientes que coincidan con los criterios de búsqueda ingresados.
- El sistema debe mostrar un mensaje o indicación cuando no se encuentren resultados relacionados con la búsqueda realizada.

---

## Épica 3: Sección Antecedentes

### #008: Registrar Antecedentes Patológicos

**Como** médico
**Quiero** registrar los antecedentes patológicos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir buscar antecedentes patológicos mediante la descripción de la enfermedad.
- El sistema debe mostrar una lista de enfermedades del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir seleccionar uno o más antecedentes patológicos de la lista mostrada.
- El sistema debe mostrar el código cie10 y la descripción de cada antecedente patológico seleccionado.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente patológico seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe permitir eliminar antecedentes patológicos previamente seleccionados antes de guardar el registro.

---

### #009: Registrar Alergias del Paciente

**Como** médico
**Quiero** registrar las alergias de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir buscar alergias mediante la descripción de la alergia.
- El sistema debe mostrar una lista de alergias del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir seleccionar una o más alergias de la lista mostrada.
- El sistema debe mostrar el código cie10 y la descripción de cada alergia seleccionada.
- El sistema debe permitir ingresar especificaciones adicionales para cada alergia seleccionada.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe permitir eliminar alergias previamente seleccionadas antes de guardar el registro.

---

### #010: Registrar RAM del Paciente

**Como** médico
**Quiero** registrar las reacciones adversas a medicamentos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir buscar RAMs mediante la descripción de la RAM.
- El sistema debe mostrar una lista de RAMs del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir seleccionar una o más RAMs de la lista mostrada.
- El sistema debe mostrar el código cie10 y la descripción de cada RAM seleccionada.
- El sistema debe permitir seleccionar el efecto adverso e ingresar especificaciones adicionales para cada RAM seleccionada.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe permitir eliminar RAMs previamente seleccionadas antes de guardar el registro.

---

### #011: Registrar Antecedentes Quirúrgicos

**Como** médico
**Quiero** registrar los antecedentes quirúrgicos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir buscar antecedentes quirúrgicos mediante la descripción del procedimiento.
- El sistema debe mostrar una lista de procedimientos del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir seleccionar uno o más antecedentes quirúrgicos de la lista mostrada.
- El sistema debe mostrar el código cie10 y la descripción de cada antecedente quirúrgico seleccionado.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente quirúrgico seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe permitir eliminar antecedentes quirúrgicos previamente seleccionados antes de guardar el registro.

---

### #012: Registrar Antecedentes Familiares

**Como** médico
**Quiero** registrar los antecedentes familiares de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir seleccionar el tipo de familiar y el estado del familiar para cada antecedente familiar que se desee ingresar.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente familiar seleccionado.
- El sistema debe permitir que el campo de especificaciones permanezca vacío.
- El sistema debe permitir eliminar antecedentes familiares previamente ingresados antes de guardar el registro.

---

### #013: Registrar Antecedentes Ginecológicos

**Como** médico
**Quiero** registrar los antecedentes ginecológicos de una paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptación:**
- El sistema debe permitir registrar la edad de menarquía mediante un valor numérico entero.
- El sistema debe permitir ingresar el régimen catamenial de la paciente mediante texto.
- El sistema debe permitir registrar la fecha de última regla (FUR).
- El sistema debe permitir registrar la cantidad de gestaciones de la paciente mediante un valor numérico entero.
- El sistema debe permitir registrar la cantidad de partos de la paciente mediante un valor numérico entero.
- El sistema debe permitir seleccionar un método anticonceptivo desde el catálogo disponible.
- El sistema debe permitir seleccionar la orientación sexual de la paciente desde el catálogo disponible.
- El sistema debe permitir registrar el valor de andria mediante un número entero.
- El sistema debe permitir registrar la fecha de inicio de relaciones sexuales.
- El sistema debe permitir registrar la fecha de la última relación sexual.
- El sistema debe permitir que los campos de la sección antecedentes ginecológicos permanezcan vacíos.

---

## Épica 4: Sección Consulta Médica

### #014: Registrar Signos y Síntomas

**Como** médico
**Quiero** registrar los signos y síntomas relevantes del paciente
**Para** contar con la información clínica observada durante la consulta

**Criterios de aceptación:**
- El sistema debe permitir buscar signos y síntomas mediante la descripción del signo o del síntoma.
- El sistema debe mostrar una lista de signos y síntomas del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir seleccionar uno o más signos y síntomas de la lista mostrada.
- El sistema debe mostrar el código cie10 y la descripción de cada signo y síntoma seleccionado.
- El sistema debe permitir ingresar especificaciones adicionales para cada signo y síntoma seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe permitir eliminar signos y síntomas previamente seleccionados antes de guardar el registro.

---

### #015: Registrar Enfermedad Actual

**Como** médico
**Quiero** registrar la enfermedad actual del paciente
**Para** contar con la descripción del problema actual durante la consulta

**Criterios de aceptación:**
- El sistema debe permitir ingresar información en el campo de enfermedad actual.
- El sistema debe permitir modificar o borrar la información ingresada antes de guardar la atención.

---

### #016: Registrar Motivo de Consulta

**Como** médico
**Quiero** registrar el motivo de consulta del paciente
**Para** contar con la información clínica observada durante la consulta

**Criterios de aceptación:**
- El sistema debe permitir ingresar el tiempo de enfermedad, forma de inicio y curso de la enfermedad.
- El sistema debe permitir seleccionar una opción en el campo forma de inicio (insidioso, brusco).
- El sistema debe permitir seleccionar una opción en el campo curso de la enfermedad (progresivo, estacionario, intermitente).
- El sistema debe exigir el registro del tiempo de enfermedad, forma de inicio y curso de la enfermedad.

---

### #017: Registrar Funciones Biológicas

**Como** médico
**Quiero** registrar las funciones biológicas del paciente
**Para** contar con el estado de las funciones biológicas durante la consulta

**Criterios de aceptación:**
- El sistema debe mostrar las funciones biológicas: sed, apetito, sueño, estado de ánimo, deposiciones, orina y variación ponderal.
- El sistema debe permitir seleccionar el estado de cada función biológica mediante las opciones de evaluación: aumentada, disminuida, conservada y no evaluada.
- El sistema debe permitir registrar observaciones de cada función biológica.
- El sistema debe permitir que el campo de observaciones permanezca vacío.
- El sistema debe exigir la selección del estado de cada función biológica antes de grabar la atención.

---

### #018: Registrar Signos Vitales

**Como** médico
**Quiero** registrar los signos vitales del paciente
**Para** contar con el valor de los signos vitales durante la consulta

**Criterios de aceptación:**
- El sistema debe permitir ingresar los signos vitales definidos para su registro: Peso, Talla, IMC, S.C., P. abdominal, HGT, Hemoglobina, Temperatura, SO2, FC, FR, Presión arterial (sistólica, diastólica y media).
- El sistema debe calcular automáticamente el valor del IMC y de la S.C. a partir del peso y la talla, según la fórmula definida por el sistema.
- El sistema debe calcular automáticamente la presión arterial media a partir de la presión arterial sistólica y diastólica.
- El sistema debe permitir dejar vacío el registro de signos vitales.

---

### #019: Registrar Examen Físico

**Como** médico
**Quiero** registrar el examen físico del paciente
**Para** contar con la evaluación física realizada durante la consulta

**Criterios de aceptación:**
- El sistema debe permitir registrar el estado de aspecto general, piel y faneras, cabeza, cuello, tórax y pulmones, CV, abdomen, G-U, SOMA, SNC y otros.
- El sistema debe permitir seleccionar únicamente los valores "Conservado", "Observado" o "Diferido" para cada sección del examen físico.
- El sistema debe permitir ingresar observaciones textuales únicamente cuando el estado seleccionado sea "Observado".
- El sistema no debe permitir ingresar observaciones cuando el estado seleccionado sea "Conservado" o "Diferido".
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Épica 5: Sección Presunción Diagnóstica

### #020: Registrar Diagnóstico

**Como** médico
**Quiero** registrar el diagnóstico de la consulta médica actual
**Para** contar con la evaluación diagnóstica del paciente

**Criterios de aceptación:**
- El sistema debe permitir buscar diagnósticos por nombre o código.
- El sistema debe permitir seleccionar los diagnósticos encontrados que coincidan con esos datos de búsqueda.
- El sistema debe mostrar una indicación cuando no existan diagnósticos que coincidan con la búsqueda.
- El sistema debe permitir seleccionar el tipo de diagnóstico para cada diagnóstico seleccionado (presuntivo, definitivo, repetitivo).
- El sistema debe permitir ingresar especificaciones de cada diagnóstico seleccionado.
- El sistema debe permitir dejar vacío el campo de especificaciones.
- El sistema debe exigir el registro de al menos un diagnóstico con su tipo antes de guardar la atención.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Épica 6: Sección Plan de Trabajo

### #021: Registrar Plan de Trabajo

**Como** médico
**Quiero** registrar el plan de trabajo complementario
**Para** contar con las indicaciones y recomendaciones a seguir

**Criterios de aceptación:**
- El sistema debe permitir ingresar información en el campo de plan de trabajo.
- El sistema debe permitir dejar vacío el campo de plan de trabajo.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Sub Épica 6.1: Receta Médica

### #022: Registrar Receta Médica

**Como** médico
**Quiero** registrar la receta médica de la consulta
**Para** contar con la receta médica elaborada para el paciente

**Criterios de aceptación:**
- El sistema debe permitir buscar medicamentos por descripción.
- El sistema debe permitir seleccionar los medicamentos encontrados que coinciden con esos datos de búsqueda.
- El sistema debe mostrar una indicación cuando no existan medicamentos que coincidan con la búsqueda.
- El sistema debe permitir ingresar la cantidad e indicaciones para cada medicamento seleccionado.
- El sistema debe permitir seleccionar un diagnóstico relacionado para cada medicamento seleccionado.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.
- El sistema debe permitir dejar vacío el registro de receta médica.

---

### #023: Registrar Múltiples Recetas Médicas

**Como** médico
**Quiero** registrar más de una receta médica en una atención
**Para** contar con la receta médica elaborada para el paciente

**Criterios de aceptación:**
- El sistema debe permitir crear una nueva receta médica dentro de una atención médica en curso o ya registrada.
- Al crear una nueva receta médica, el sistema debe iniciar un nuevo registro de receta independiente dentro de la misma atención.
- El sistema debe conservar las recetas médicas previamente registradas dentro de la misma atención.

---

### #024: Generar PDF de Receta Médica

**Como** médico
**Quiero** generar el PDF de la receta médica de una atención
**Para** poder imprimirla y entregarla al paciente

**Criterios de aceptación:**
- El sistema debe permitir generar el PDF de la receta médica cuando exista al menos un medicamento registrado en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de la receta médica ingresados en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Sub Épica 6.2: Exámenes Auxiliares

### #025: Registrar Orden de Exámenes Auxiliares

**Como** médico
**Quiero** registrar los exámenes auxiliares
**Para** contar con los exámenes auxiliares solicitados

**Criterios de aceptación:**
- El sistema debe permitir buscar exámenes por descripción.
- El sistema debe permitir seleccionar exámenes a partir de los resultados de búsqueda o indicar cuando no haya.
- El sistema debe permitir ingresar observaciones para cada examen seleccionado.
- El sistema debe permitir dejar vacío el registro de exámenes auxiliares.

---

### #026: Generar PDF de Exámenes Auxiliares

**Como** médico
**Quiero** generar el PDF de exámenes auxiliares de una atención
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptación:**
- El sistema debe permitir generar el PDF de exámenes auxiliares cuando exista un examen auxiliar registrado en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de los exámenes auxiliares ingresados en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Sub Épica 6.3: Interconsulta

### #027: Registrar Interconsulta

**Como** médico
**Quiero** registrar las interconsultas
**Para** contar con las interconsultas solicitadas

**Criterios de aceptación:**
- El sistema debe permitir buscar servicios por nombre.
- El sistema debe permitir seleccionar el servicio solicitado de cada interconsulta.
- El sistema debe permitir ingresar el motivo de cada interconsulta.
- El sistema debe permitir dejar vacío el registro de interconsultas.

---

### #028: Generar PDF de Interconsulta

**Como** médico
**Quiero** generar el PDF de interconsulta de una atención
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptación:**
- El sistema debe permitir generar el PDF de interconsulta cuando exista al menos una interconsulta registrada en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de la interconsulta ingresada en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Épica 7: Atención Médica

### #029: Iniciar Nueva Atención

**Como** médico
**Quiero** iniciar la atención de un paciente
**Para** registrar su atención médica

**Criterios de aceptación:**
- El sistema debe permitir iniciar la atención de un paciente previamente seleccionado.
- Al iniciar la atención, el sistema debe abrir la interfaz de atención médica del paciente seleccionado.
- Al abrir la atención, el sistema debe mostrar los datos básicos del paciente (nombre, DNI, edad, sexo).
- Al abrir la atención, el sistema debe mostrar la información clínica previa disponible del paciente: antecedentes (empezando por RAM y alergias) y diagnósticos (con fecha).

---

### #030: Grabar Atención Médica

**Como** médico
**Quiero** grabar la atención médica
**Para** almacenar la información registrada

**Criterios de aceptación:**
- El sistema debe permitir grabar la atención médica cuando se hayan validado los datos ingresados y obligatorios.
- El sistema debe mostrar un mensaje de confirmación cuando la atención se grabe correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible grabar la atención.
- El sistema debe almacenar la información registrada de la atención en la base de datos para su posterior consulta.

---

### #031: Buscar Atenciones Médicas

**Como** médico
**Quiero** buscar atenciones médicas registradas
**Para** localizar una atención específica cuando lo necesite

**Criterios de aceptación:**
- El sistema debe permitir ingresar criterios de búsqueda por número de documento, nombre del paciente o rango de fechas de registro.
- El sistema debe mostrar una lista de atenciones médicas que coincidan con los criterios ingresados.
- El sistema debe mostrar en la lista de resultados la información principal de cada atención encontrada, incluyendo nombres y apellidos del paciente, número de documento y fecha de registro de la atención.
- El sistema debe mostrar un mensaje o indicación cuando no se encuentren resultados.

---

### #032: Ver Atención Médica Registrada

**Como** médico
**Quiero** ver una atención médica registrada
**Para** revisar el detalle de una atención específica cuando lo necesite

**Criterios de aceptación:**
- Al seleccionar una atención médica, el sistema debe abrir la interfaz de detalle de la atención seleccionada.
- Al ver la atención, el sistema debe mostrar la información previamente registrada de la atención seleccionada.
- El sistema debe mostrar la fecha de registro de la atención y la fecha de la última actualización.
- El sistema no debe permitir ver una atención médica si no se ha seleccionado una atención registrada.

---

### #033: Editar Atención Médica

**Como** médico
**Quiero** editar una atención médica
**Para** corregir o actualizar la información registrada

**Criterios de aceptación:**
- El sistema debe permitir abrir una atención médica ya registrada para su edición cuando esté dentro del plazo de 24 horas.
- El sistema debe mostrar los datos registrados de la atención seleccionada.
- El sistema debe permitir modificar los datos de la atención médica.
- El sistema debe validar los campos obligatorios antes de guardar los cambios realizados.
- El sistema debe mostrar un mensaje de confirmación cuando los cambios se guarden correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible guardar los cambios realizados.

---

### #034: Consultar Historia Clínica del Paciente

**Como** médico
**Quiero** consultar la historia clínica de un paciente
**Para** revisar sus atenciones médicas a lo largo del tiempo

**Criterios de aceptación:**
- El sistema debe permitir seleccionar un paciente registrado.
- El sistema debe mostrar el listado de atenciones médicas registradas del paciente en orden cronológico.
- El sistema debe permitir seleccionar una atención del historial para revisar sus datos registrados.
- El sistema debe indicar cuando el paciente no tenga atenciones médicas registradas.

---

## Épica 8: Estadísticas

### #035: Ver Estadísticas Básicas de Atención

**Como** médico
**Quiero** visualizar estadísticas básicas de atención
**Para** tener una visión general de mis registros

**Criterios de aceptación:**
- El sistema debe mostrar las estadísticas básicas de atención al ingresar al sistema (número de atenciones totales, número de atenciones en el día, número de pacientes registrados).
- El sistema debe mostrar los valores actualizados de cada estadística.
- El sistema debe indicar cuando no existan datos para alguna estadística mostrada.

---

### #036: Ver Gráficos Estadísticos de Atenciones

**Como** médico
**Quiero** visualizar gráficos estadísticos de mis atenciones
**Para** tener un detalle visual de los datos estadísticos de cada atención

**Criterios de aceptación:**
- El sistema debe permitir visualizar la distribución de pacientes registrados según sexo mediante gráficos estadísticos.
- El sistema debe permitir visualizar la distribución de pacientes registrados según grupos etarios mediante gráficos estadísticos.
- El sistema debe permitir visualizar la distribución de atenciones médicas según fecha mediante gráficos estadísticos.
- El sistema debe mostrar un mensaje informativo cuando no existan datos disponibles para alguna estadística o gráfico mostrado.
- El sistema debe actualizar automáticamente la información estadística conforme se registren nuevos pacientes o atenciones médicas.
