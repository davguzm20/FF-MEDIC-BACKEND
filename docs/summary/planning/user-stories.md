# Historias de Usuario F&F-MEDIC

## Epica 1: Acceso al sistema

### #001: Iniciar Sesion

**Como** médico
**Quiero** iniciar sesión en el sistema
**Para** acceder a las funciónes de atención médica

**Criterios de aceptacion:**
- El sistema debe permitir el acceso al usuario cuando las credenciales ingresadas sean validas.
- El sistema debe mostrar un mensaje de error cuando las credenciales ingresadas sean incorrectas.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe redirigir al usuario al panel principal despues de iniciar sesión correctamente.

---

### #002: Solicitar Recuperacion de Contrasena

**Como** médico
**Quiero** solicitar la recuperación de mi contraseña
**Para** poder acceder a las funciónes de atención médica

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso de un correo electrónico registrado.
- El sistema debe impedir continuar y mostrar una advertencia cuando el campo de correo electrónico este vacio.
- El sistema debe enviar un código de verificación al correo electrónico ingresado.
- El sistema debe mostrar un mensaje de error cuando el correo electrónico ingresado no exista en el sistema.
- El sistema debe permitir continuar al proceso de verificación cuando el correo electrónico sea valido.

---

### #003: Restablecer Contrasena

**Como** médico
**Quiero** restablecer mi contraseña usando un código de verificación
**Para** poder acceder nuevamente al sistema

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso del código de verificación recibido.
- El sistema debe validar que el código de verificación ingresado sea correcto.
- El sistema debe permitir el ingreso de una nueva contraseña.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de error cuando el código de verificación ingresado sea incorrecto.
- El sistema debe actualizar la contraseña cuando la validación del código sea exitosa.

---

### #004: Cerrar Sesion

**Como** médico
**Quiero** cerrar mi sesión
**Para** finalizar mi acceso al sistema de forma segura

**Criterios de aceptacion:**
- El sistema debe cerrar la sesión del usuario cuando se seleccióne la opción "Cerrar sesión".
- El sistema debe redirigir al usuario a la pantalla de inicio de sesión despues de cerrar la sesión.
- El sistema no debe permitir el acceso a paginas protegidas una vez finalizada la sesión.

---

## Epica 2: Gestion de pacientes

### #005: Registrar Pacientes

**Como** médico
**Quiero** registrar pacientes nuevos
**Para** contar con su información en el sistema

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso de los datos del paciente, incluyendo nombres, apellido paterno, materno, tipo y número de documento de identidad, sexo, teléfono y fecha de nacimiento; la edad sera calculada automáticamente.
- El sistema debe impedir registrar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de confirmación cuando el registro del paciente sea exitoso o de error si ocurrio un fallo durante el proceso de registro.
- El sistema no debe permitir el registro de pacientes duplicados según el número de documento de identidad ingresado.

---

### #006: Editar Pacientes Registrados

**Como** médico
**Quiero** editar la información de mis pacientes registrados
**Para** mantener su información actualizada

**Criterios de aceptacion:**
- El sistema debe mostrar los datos registrados del paciente.
- El sistema debe permitir la modificación de los datos.
- El sistema debe impedir actualizar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de confirmación cuando la actualización de la información sea exitosa.
- El sistema debe mostrar un mensaje de error cuando ocurra un fallo durante el proceso de actualización.

---

### #007: Buscar Pacientes Registrados

**Como** médico
**Quiero** buscar pacientes registrados
**Para** localizar al paciente y acceder a su ficha cuando lo necesite

**Criterios de aceptacion:**
- El sistema debe permitir la búsqueda de pacientes mediante el número de documento de identidad o el nombre o apellido paterno o materno del paciente.
- El sistema debe mostrar una lista de pacientes que coincidan con los criterios de búsqueda ingresados.
- El sistema debe mostrar un mensaje o indicación cuando no se encuentren resultados relacionados con la búsqueda realizada.

---

## Epica 3: Seccion antecedentes

### #008: Registrar Antecedentes Patologicos

**Como** médico
**Quiero** registrar los antecedentes patológicos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar antecedentes patológicos mediante la descripción de la enfermedad.
- El sistema debe mostrar una lista de enfermedades del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir selecciónar uno o más antecedentes patológicos de la lista mostrada.
- El sistema debe mostrar el código CIE-10 y la descripción de cada antecedente patologico selecciónado.
- El sistema debe permitir ingresar específicaciones adicionales para cada antecedente patologico selecciónado.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe permitir eliminar antecedentes patológicos previamente selecciónados antes de guardar el registro.

---

### #009: Registrar Alergias del Paciente

**Como** médico
**Quiero** registrar las alergias de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar alergias mediante la descripción de la alergia.
- El sistema debe mostrar una lista de alergias del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir selecciónar una o más alergias de la lista mostrada.
- El sistema debe mostrar el código CIE-10 y la descripción de cada alergia selecciónada.
- El sistema debe permitir ingresar específicaciones adicionales para cada alergia selecciónada.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe permitir eliminar alergias previamente selecciónadas antes de guardar el registro.

---

### #010: Registrar RAM del Paciente

**Como** médico
**Quiero** registrar las reacciones adversas a médicamentos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar RAMs mediante la descripción de la RAM.
- El sistema debe mostrar una lista de RAMs del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir selecciónar una o más RAMs de la lista mostrada.
- El sistema debe mostrar el código CIE-10 y la descripción de cada RAM selecciónada.
- El sistema debe permitir selecciónar el efecto adverso e ingresar específicaciones adicionales para cada RAM selecciónada.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe permitir eliminar RAMs previamente selecciónadas antes de guardar el registro.

---

### #011: Registrar Antecedentes Quirurgicos

**Como** médico
**Quiero** registrar los antecedentes quirúrgicos de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar antecedentes quirúrgicos mediante la descripción del procedimiento.
- El sistema debe mostrar una lista de procedimientos del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir selecciónar uno o más antecedentes quirúrgicos de la lista mostrada.
- El sistema debe mostrar el código CIE-10 y la descripción de cada antecedente quirurgico selecciónado.
- El sistema debe permitir ingresar específicaciones adicionales para cada antecedente quirurgico selecciónado.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe permitir eliminar antecedentes quirúrgicos previamente selecciónados antes de guardar el registro.

---

### #012: Registrar Antecedentes Familiares

**Como** médico
**Quiero** registrar los antecedentes familiares de un paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir selecciónar el tipo de familiar y el estado del familiar para cada antecedente familiar que se desee ingresar.
- El sistema debe permitir ingresar específicaciones adicionales para cada antecedente familiar selecciónado.
- El sistema debe permitir que el campo de específicaciones permanezca vacio.
- El sistema debe permitir eliminar antecedentes familiares previamente ingresados antes de guardar el registro.

---

### #013: Registrar Antecedentes Ginecologicos

**Como** médico
**Quiero** registrar los antecedentes ginecológicos de una paciente
**Para** contar con esa información en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir registrar la edad de menarquia mediante un valor numerico entero.
- El sistema debe permitir ingresar el regimen catamenial de la paciente mediante texto.
- El sistema debe permitir registrar la fecha de última regla (FUR).
- El sistema debe permitir registrar la cantidad de gestaciones y partos de la paciente mediante valores numericos enteros.
- El sistema debe permitir selecciónar un metodo anticonceptivo desde el catalogo disponible.
- El sistema debe permitir selecciónar la orientación sexual de la paciente desde el catalogo disponible.
- El sistema debe permitir registrar el valor de andria mediante un número entero.
- El sistema debe permitir registrar la fecha de inicio de relaciones sexuales y la fecha de la última relacion sexual.
- El sistema debe permitir que los campos de la seccion antecedentes ginecológicos permanezcan vacios.

---

## Epica 4: Seccion consulta médica

### #014: Registrar Signos y Sintomás

**Como** médico
**Quiero** registrar los signos y sintomás relevantes del paciente
**Para** contar con la información clínica observada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir buscar signos y sintomás mediante la descripción del signo o del sintoma.
- El sistema debe mostrar una lista de signos y sintomás del CIE-10 que coincidan con el texto ingresado en la búsqueda.
- El sistema debe permitir selecciónar uno o más signos y sintomás de la lista mostrada.
- El sistema debe mostrar el código CIE-10 y la descripción de cada signo y sintoma selecciónado.
- El sistema debe permitir ingresar observaciónes adicionales para cada signo y sintoma selecciónado.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe permitir eliminar signos y sintomás previamente selecciónados antes de guardar el registro.

---

### #015: Registrar Enfermedad Actual

**Como** médico
**Quiero** registrar la enfermedad actual del paciente
**Para** contar con la descripción del problema actual durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar información en el campo de enfermedad actual.
- El sistema debe permitir modificar o borrar la información ingresada antes de guardar la atención.

---

### #016: Registrar Motivo de Consulta

**Como** médico
**Quiero** registrar el motivo de consulta del paciente
**Para** contar con la información clínica observada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar el tiempo de enfermedad, forma de inicio y curso de la enfermedad.
- El sistema debe permitir selecciónar una opción en el campo forma de inicio (insidioso, brusco).
- El sistema debe permitir selecciónar una opción en el campo curso de la enfermedad (progresivo, estacionario, intermitente).
- El sistema debe exigir el registro del tiempo de enfermedad, forma de inicio y curso de la enfermedad.

---

### #017: Registrar Funciones Biologicas

**Como** médico
**Quiero** registrar las funciónes biológicas del paciente
**Para** contar con el estado de las funciónes biológicas durante la consulta

**Criterios de aceptacion:**
- El sistema debe mostrar las funciónes biológicas: sed, apetito, sueno, estado de animo, deposiciones, orina y variacion ponderal.
- El sistema debe permitir selecciónar el estado de cada función biológica mediante las opciónes de evaluacion: aumentada, disminuida, conservada y no evaluada.
- El sistema debe permitir registrar observaciónes de cada función biológica.
- El sistema debe permitir que el campo de observaciónes permanezca vacio.
- El sistema debe exigir la selección del estado de cada función biológica antes de grabar la atención.

---

### #018: Registrar Signos Vitales

**Como** médico
**Quiero** registrar los signos vitales del paciente
**Para** contar con el valor de los signos vitales durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar los signos vitales definidos para su registro: Peso, Talla, IMC, S.C., P. abdominal, HGT, Hemoglobina, Temperatura, SO2, FC, FR, Presion arterial (sistolica, díastolica y medía).
- El sistema debe calcular automáticamente el valor del IMC y de la S.C. a partir del peso y la talla, según la formula definida por el sistema.
- El sistema debe calcular automáticamente la presión arterial medía a partir de la presión arterial sistolica y díastolica.
- El sistema debe permitir dejar vacio el registro de signos vitales.

---

### #019: Registrar Examen Fisico

**Como** médico
**Quiero** registrar el examen fisico del paciente
**Para** contar con la evaluacion fisica realizada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir registrar el estado de aspecto general, piel y faneras, cabeza, cuello, torax y pulmones, CV, abdomen, G-U, SOMA, SNC y otros.
- El sistema debe permitir selecciónar unicamente los valores "Conservado", "Observado" o "Diferido" para cada seccion del examen fisico.
- El sistema debe permitir ingresar observaciónes textuales unicamente cuando el estado selecciónado sea "Observado".
- El sistema no debe permitir ingresar observaciónes cuando el estado selecciónado sea "Conservado" o "Diferido".
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Epica 5: Seccion presuncion díagnostica

### #020: Registrar Diagnostico

**Como** médico
**Quiero** registrar el díagnóstico de la consulta médica actual
**Para** contar con la evaluacion díagnostica del paciente

**Criterios de aceptacion:**
- El sistema debe permitir buscar díagnósticos por nombre o código.
- El sistema debe permitir selecciónar los díagnósticos encontrados que coincidan con esos datos de búsqueda.
- El sistema debe mostrar una indicación cuando no existan díagnósticos que coincidan con la búsqueda.
- El sistema debe permitir selecciónar el tipo de díagnóstico para cada díagnóstico selecciónado (presuntivo, definitivo, repetitivo).
- El sistema debe permitir ingresar específicaciones de cada díagnóstico selecciónado.
- El sistema debe permitir dejar vacio el campo de específicaciones.
- El sistema debe exigir el registro de al menos un díagnóstico con su tipo antes de guardar la atención.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Epica 6: Seccion plan de trabajo

### #021: Registrar Plan de Trabajo

**Como** médico
**Quiero** registrar el plan de trabajo complementario
**Para** contar con las indicaciónes y recomendaciones a seguir

**Criterios de aceptacion:**
- El sistema debe permitir ingresar información en el campo de plan de trabajo.
- El sistema debe permitir dejar vacio el campo de plan de trabajo.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.

---

## Sub Epica 6.1: Receta Medica

### #022: Registrar Receta Medica

**Como** médico
**Quiero** registrar la receta médica de la consulta
**Para** contar con la receta médica elaborada para el paciente

**Criterios de aceptacion:**
- El sistema debe permitir buscar médicamentos por descripción.
- El sistema debe permitir selecciónar los médicamentos encontrados que coinciden con esos datos de búsqueda.
- El sistema debe mostrar una indicación cuando no existan médicamentos que coincidan con la búsqueda.
- El sistema debe permitir ingresar la cantidad e indicaciónes para cada médicamento selecciónado.
- El sistema debe permitir selecciónar un díagnóstico relacionado para cada médicamento selecciónado.
- El sistema debe permitir modificar o eliminar la información ingresada antes de guardar la atención.
- El sistema debe permitir dejar vacio el registro de receta médica.

---

### #023: Registrar Multiples Recetas Medicas

**Como** médico
**Quiero** registrar más de una receta médica en una atención
**Para** contar con la receta médica elaborada para el paciente

**Criterios de aceptacion:**
- El sistema debe permitir crear una nueva receta médica dentro de una atención médica en curso o ya registrada.
- Al crear una nueva receta médica, el sistema debe iniciar un nuevo registro de receta independiente dentro de la misma atención.
- El sistema debe conservar las recetas médicas previamente registradas dentro de la misma atención.

---

### #024: Generar PDF de Receta Medica

**Como** médico
**Quiero** generar el PDF de la receta médica de una atención
**Para** poder imprimirla y entregarla al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de la receta médica cuando exista al menos un médicamento registrado en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de la receta médica ingresados en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Sub Epica 6.2: Examenes Auxiliares

### #025: Registrar Orden de Examenes Auxiliares

**Como** médico
**Quiero** registrar los exámenes auxiliares
**Para** contar con los exámenes auxiliares solicitados

**Criterios de aceptacion:**
- El sistema debe permitir buscar exámenes por descripción.
- El sistema debe permitir selecciónar exámenes a partir de los resultados de búsqueda o indicar cuando no haya.
- El sistema debe permitir ingresar observaciónes para cada examen selecciónado.
- El sistema debe permitir dejar vacio el registro de exámenes auxiliares.

---

### #026: Generar PDF de Examenes Auxiliares

**Como** médico
**Quiero** generar el PDF de exámenes auxiliares de una atención
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de exámenes auxiliares cuando exista un examen auxiliar registrado en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de los exámenes auxiliares ingresados en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Sub Epica 6.3: Interconsulta

### #027: Registrar Interconsulta

**Como** médico
**Quiero** registrar las interconsultas
**Para** contar con las interconsultas solicitadas

**Criterios de aceptacion:**
- El sistema debe permitir buscar servicios por nombre.
- El sistema debe permitir selecciónar el servicio solicitado de cada interconsulta.
- El sistema debe permitir ingresar el motivo de cada interconsulta.
- El sistema debe permitir dejar vacio el registro de interconsultas.

---

### #028: Generar PDF de Interconsulta

**Como** médico
**Quiero** generar el PDF de interconsulta de una atención
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de interconsulta cuando exista al menos una interconsulta registrada en la atención.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, teléfono y fecha de nacimiento.
- El PDF debe mostrar los datos de la interconsulta ingresados en la atención.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresión.
- El PDF debe incluir el espacio correspondiente para el sello o firma del médico.

---

## Epica 7: Atencion médica

### #029: Iniciar Nueva Atencion

**Como** médico
**Quiero** iniciar la atención de un paciente
**Para** registrar su atención médica

**Criterios de aceptacion:**
- El sistema debe permitir iniciar la atención de un paciente previamente selecciónado.
- Al iniciar la atención, el sistema debe abrir la interfaz de atención médica del paciente selecciónado.
- Al abrir la atención, el sistema debe mostrar los datos básicos del paciente (nombre, DNI, edad, sexo).
- Al abrir la atención, el sistema debe mostrar la información clínica previa disponible del paciente: antecedentes (empezando por RAM y alergias) y díagnósticos (con fecha).

---

### #030: Grabar Atencion Medica

**Como** médico
**Quiero** grabar la atención médica
**Para** almacenar la información registrada

**Criterios de aceptacion:**
- El sistema debe permitir grabar la atención médica cuando se hayan validado los datos ingresados y obligatorios.
- El sistema debe mostrar un mensaje de confirmación cuando la atención se grabe correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible grabar la atención.
- El sistema debe almacenar la información registrada de la atención en la base de datos para su posterior consulta.

---

### #031: Buscar Atenciones Medicas

**Como** médico
**Quiero** buscar atenciones médicas registradas
**Para** localizar una atención específica cuando lo necesite

**Criterios de aceptacion:**
- El sistema debe permitir ingresar criterios de búsqueda por número de documento, nombre del paciente o rango de fechas de registro.
- El sistema debe mostrar una lista de atenciones médicas que coincidan con los criterios ingresados.
- El sistema debe mostrar en la lista de resultados la información principal de cada atención encontrada, incluyendo nombres y apellidos del paciente, número de documento y fecha de registro de la atención.
- El sistema debe mostrar un mensaje o indicación cuando no se encuentren resultados.

---

### #032: Ver Atencion Medica Registrada

**Como** médico
**Quiero** ver una atención médica registrada
**Para** revisar el detalle de una atención específica cuando lo necesite

**Criterios de aceptacion:**
- Al selecciónar una atención médica, el sistema debe abrir la interfaz de detalle de la atención selecciónada.
- Al ver la atención, el sistema debe mostrar la información previamente registrada de la atención selecciónada.
- El sistema debe mostrar la fecha de registro de la atención y la fecha de la última actualización.
- El sistema no debe permitir ver una atención médica si no se ha selecciónado una atención registrada.

---

### #033: Editar Atencion Medica

**Como** médico
**Quiero** editar una atención médica
**Para** corregir o actualizar la información registrada

**Criterios de aceptacion:**
- El sistema debe permitir abrir una atención médica ya registrada para su edición cuando este dentro del plazo de 24 horas.
- El sistema debe mostrar los datos registrados de la atención selecciónada.
- El sistema debe permitir modificar los datos de la atención médica.
- El sistema debe validar los campos obligatorios antes de guardar los cambios realizados.
- El sistema debe mostrar un mensaje de confirmación cuando los cambios se guarden correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible guardar los cambios realizados.

---

### #034: Consultar Historia Clinica del Paciente

**Como** médico
**Quiero** consultar la historia clínica de un paciente
**Para** revisar sus atenciones médicas a lo largo del tiempo

**Criterios de aceptacion:**
- El sistema debe permitir selecciónar un paciente registrado.
- El sistema debe mostrar el listado de atenciones médicas registradas del paciente en orden cronológico.
- El sistema debe permitir selecciónar una atención del historial para revisar sus datos registrados.
- El sistema debe indicar cuando el paciente no tenga atenciones médicas registradas.

---

## Epica 8: Estadisticas

### #035: Ver Estadisticas Basicas de Atencion

**Como** médico
**Quiero** visualizar estadísticas básicas de atención
**Para** tener una vision general de mis registros

**Criterios de aceptacion:**
- El sistema debe mostrar las estadísticas básicas de atención al ingresar al sistema (número de atenciones totales, número de atenciones en el día, número de pacientes registrados).
- El sistema debe mostrar los valores actualizados de cada estadística.
- El sistema debe indicar cuando no existan datos para alguna estadística mostrada.

---

### #036: Ver Graficos Estadisticos de Atenciones

**Como** médico
**Quiero** visualizar gráficos estadísticos de mis atenciones
**Para** tener un detalle visual de los datos estadísticos de cada atención

**Criterios de aceptacion:**
- El sistema debe permitir visualizar la distribución de pacientes registrados según sexo mediante gráficos estadísticos.
- El sistema debe permitir visualizar la distribución de pacientes registrados según grupos etarios mediante gráficos estadísticos.
- El sistema debe permitir visualizar la distribución de atenciones médicas según fecha mediante gráficos estadísticos.
- El sistema debe mostrar un mensaje informativo cuando no existan datos disponibles para alguna estadística o grafico mostrado.
- El sistema debe actualizar automáticamente la información estadística conforme se registren nuevos pacientes o atenciones médicas.