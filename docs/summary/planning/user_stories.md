# Historias de Usuario F&F-MEDIC

## Epica 1: Acceso al sistema

### #001: Iniciar Sesion

**Como** medico
**Quiero** iniciar sesion en el sistema
**Para** acceder a las funciones de atencion medica

**Criterios de aceptacion:**
- El sistema debe permitir el acceso al usuario cuando las credenciales ingresadas sean validas.
- El sistema debe mostrar un mensaje de error cuando las credenciales ingresadas sean incorrectas.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe redirigir al usuario al panel principal despues de iniciar sesion correctamente.

---

### #002: Solicitar Recuperacion de Contrasena

**Como** medico
**Quiero** solicitar la recuperacion de mi contrasena
**Para** poder acceder a las funciones de atencion medica

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso de un correo electronico registrado.
- El sistema debe impedir continuar y mostrar una advertencia cuando el campo de correo electronico este vacio.
- El sistema debe enviar un codigo de verificacion al correo electronico ingresado.
- El sistema debe mostrar un mensaje de error cuando el correo electronico ingresado no exista en el sistema.
- El sistema debe permitir continuar al proceso de verificacion cuando el correo electronico sea valido.

---

### #003: Restablecer Contrasena

**Como** medico
**Quiero** restablecer mi contrasena usando un codigo de verificacion
**Para** poder acceder nuevamente al sistema

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso del codigo de verificacion recibido.
- El sistema debe validar que el codigo de verificacion ingresado sea correcto.
- El sistema debe permitir el ingreso de una nueva contrasena.
- El sistema debe impedir continuar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de error cuando el codigo de verificacion ingresado sea incorrecto.
- El sistema debe actualizar la contrasena cuando la validacion del codigo sea exitosa.

---

### #004: Cerrar Sesion

**Como** medico
**Quiero** cerrar mi sesion
**Para** finalizar mi acceso al sistema de forma segura

**Criterios de aceptacion:**
- El sistema debe cerrar la sesion del usuario cuando se seleccione la opcion "Cerrar sesion".
- El sistema debe redirigir al usuario a la pantalla de inicio de sesion despues de cerrar la sesion.
- El sistema no debe permitir el acceso a paginas protegidas una vez finalizada la sesion.

---

## Epica 2: Gestion de pacientes

### #005: Registrar Pacientes

**Como** medico
**Quiero** registrar pacientes nuevos
**Para** contar con su informacion en el sistema

**Criterios de aceptacion:**
- El sistema debe permitir el ingreso de los datos del paciente, incluyendo nombres, apellido paterno, materno, tipo y numero de documento de identidad, sexo, telefono y fecha de nacimiento; la edad sera calculada automaticamente.
- El sistema debe impedir registrar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de confirmacion cuando el registro del paciente sea exitoso o de error si ocurrio un fallo durante el proceso de registro.
- El sistema no debe permitir el registro de pacientes duplicados segun el numero de documento de identidad ingresado.

---

### #006: Editar Pacientes Registrados

**Como** medico
**Quiero** editar la informacion de mis pacientes registrados
**Para** mantener su informacion actualizada

**Criterios de aceptacion:**
- El sistema debe mostrar los datos registrados del paciente.
- El sistema debe permitir la modificacion de los datos.
- El sistema debe impedir actualizar y mostrar una advertencia cuando existan campos obligatorios vacios.
- El sistema debe mostrar un mensaje de confirmacion cuando la actualizacion de la informacion sea exitosa.
- El sistema debe mostrar un mensaje de error cuando ocurra un fallo durante el proceso de actualizacion.

---

### #007: Buscar Pacientes Registrados

**Como** medico
**Quiero** buscar pacientes registrados
**Para** localizar al paciente y acceder a su ficha cuando lo necesite

**Criterios de aceptacion:**
- El sistema debe permitir la busqueda de pacientes mediante el numero de documento de identidad o el nombre o apellido paterno o materno del paciente.
- El sistema debe mostrar una lista de pacientes que coincidan con los criterios de busqueda ingresados.
- El sistema debe mostrar un mensaje o indicacion cuando no se encuentren resultados relacionados con la busqueda realizada.

---

## Epica 3: Seccion antecedentes

### #008: Registrar Antecedentes Patologicos

**Como** medico
**Quiero** registrar los antecedentes patologicos de un paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar antecedentes patologicos mediante la descripcion de la enfermedad.
- El sistema debe mostrar una lista de enfermedades del CIE-10 que coincidan con el texto ingresado en la busqueda.
- El sistema debe permitir seleccionar uno o mas antecedentes patologicos de la lista mostrada.
- El sistema debe mostrar el codigo CIE-10 y la descripcion de cada antecedente patologico seleccionado.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente patologico seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe permitir eliminar antecedentes patologicos previamente seleccionados antes de guardar el registro.

---

### #009: Registrar Alergias del Paciente

**Como** medico
**Quiero** registrar las alergias de un paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar alergias mediante la descripcion de la alergia.
- El sistema debe mostrar una lista de alergias del CIE-10 que coincidan con el texto ingresado en la busqueda.
- El sistema debe permitir seleccionar una o mas alergias de la lista mostrada.
- El sistema debe mostrar el codigo CIE-10 y la descripcion de cada alergia seleccionada.
- El sistema debe permitir ingresar especificaciones adicionales para cada alergia seleccionada.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe permitir eliminar alergias previamente seleccionadas antes de guardar el registro.

---

### #010: Registrar RAM del Paciente

**Como** medico
**Quiero** registrar las reacciones adversas a medicamentos de un paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar RAMs mediante la descripcion de la RAM.
- El sistema debe mostrar una lista de RAMs del CIE-10 que coincidan con el texto ingresado en la busqueda.
- El sistema debe permitir seleccionar una o mas RAMs de la lista mostrada.
- El sistema debe mostrar el codigo CIE-10 y la descripcion de cada RAM seleccionada.
- El sistema debe permitir seleccionar el efecto adverso e ingresar especificaciones adicionales para cada RAM seleccionada.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe permitir eliminar RAMs previamente seleccionadas antes de guardar el registro.

---

### #011: Registrar Antecedentes Quirurgicos

**Como** medico
**Quiero** registrar los antecedentes quirurgicos de un paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir buscar antecedentes quirurgicos mediante la descripcion del procedimiento.
- El sistema debe mostrar una lista de procedimientos del CIE-10 que coincidan con el texto ingresado en la busqueda.
- El sistema debe permitir seleccionar uno o mas antecedentes quirurgicos de la lista mostrada.
- El sistema debe mostrar el codigo CIE-10 y la descripcion de cada antecedente quirurgico seleccionado.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente quirurgico seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe permitir eliminar antecedentes quirurgicos previamente seleccionados antes de guardar el registro.

---

### #012: Registrar Antecedentes Familiares

**Como** medico
**Quiero** registrar los antecedentes familiares de un paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir seleccionar el tipo de familiar y el estado del familiar para cada antecedente familiar que se desee ingresar.
- El sistema debe permitir ingresar especificaciones adicionales para cada antecedente familiar seleccionado.
- El sistema debe permitir que el campo de especificaciones permanezca vacio.
- El sistema debe permitir eliminar antecedentes familiares previamente ingresados antes de guardar el registro.

---

### #013: Registrar Antecedentes Ginecologicos

**Como** medico
**Quiero** registrar los antecedentes ginecologicos de una paciente
**Para** contar con esa informacion en las futuras atenciones

**Criterios de aceptacion:**
- El sistema debe permitir registrar la edad de menarquia mediante un valor numerico entero.
- El sistema debe permitir ingresar el regimen catamenial de la paciente mediante texto.
- El sistema debe permitir registrar la fecha de ultima regla (FUR).
- El sistema debe permitir registrar la cantidad de gestaciones y partos de la paciente mediante valores numericos enteros.
- El sistema debe permitir seleccionar un metodo anticonceptivo desde el catalogo disponible.
- El sistema debe permitir seleccionar la orientacion sexual de la paciente desde el catalogo disponible.
- El sistema debe permitir registrar el valor de andria mediante un numero entero.
- El sistema debe permitir registrar la fecha de inicio de relaciones sexuales y la fecha de la ultima relacion sexual.
- El sistema debe permitir que los campos de la seccion antecedentes ginecologicos permanezcan vacios.

---

## Epica 4: Seccion consulta medica

### #014: Registrar Signos y Sintomas

**Como** medico
**Quiero** registrar los signos y sintomas relevantes del paciente
**Para** contar con la informacion clinica observada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir buscar signos y sintomas mediante la descripcion del signo o del sintoma.
- El sistema debe mostrar una lista de signos y sintomas del CIE-10 que coincidan con el texto ingresado en la busqueda.
- El sistema debe permitir seleccionar uno o mas signos y sintomas de la lista mostrada.
- El sistema debe mostrar el codigo CIE-10 y la descripcion de cada signo y sintoma seleccionado.
- El sistema debe permitir ingresar observaciones adicionales para cada signo y sintoma seleccionado.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe permitir eliminar signos y sintomas previamente seleccionados antes de guardar el registro.

---

### #015: Registrar Enfermedad Actual

**Como** medico
**Quiero** registrar la enfermedad actual del paciente
**Para** contar con la descripcion del problema actual durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar informacion en el campo de enfermedad actual.
- El sistema debe permitir modificar o borrar la informacion ingresada antes de guardar la atencion.

---

### #016: Registrar Motivo de Consulta

**Como** medico
**Quiero** registrar el motivo de consulta del paciente
**Para** contar con la informacion clinica observada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar el tiempo de enfermedad, forma de inicio y curso de la enfermedad.
- El sistema debe permitir seleccionar una opcion en el campo forma de inicio (insidioso, brusco).
- El sistema debe permitir seleccionar una opcion en el campo curso de la enfermedad (progresivo, estacionario, intermitente).
- El sistema debe exigir el registro del tiempo de enfermedad, forma de inicio y curso de la enfermedad.

---

### #017: Registrar Funciones Biologicas

**Como** medico
**Quiero** registrar las funciones biologicas del paciente
**Para** contar con el estado de las funciones biologicas durante la consulta

**Criterios de aceptacion:**
- El sistema debe mostrar las funciones biologicas: sed, apetito, sueno, estado de animo, deposiciones, orina y variacion ponderal.
- El sistema debe permitir seleccionar el estado de cada funcion biologica mediante las opciones de evaluacion: aumentada, disminuida, conservada y no evaluada.
- El sistema debe permitir registrar observaciones de cada funcion biologica.
- El sistema debe permitir que el campo de observaciones permanezca vacio.
- El sistema debe exigir la seleccion del estado de cada funcion biologica antes de grabar la atencion.

---

### #018: Registrar Signos Vitales

**Como** medico
**Quiero** registrar los signos vitales del paciente
**Para** contar con el valor de los signos vitales durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir ingresar los signos vitales definidos para su registro: Peso, Talla, IMC, S.C., P. abdominal, HGT, Hemoglobina, Temperatura, SO2, FC, FR, Presion arterial (sistolica, diastolica y media).
- El sistema debe calcular automaticamente el valor del IMC y de la S.C. a partir del peso y la talla, segun la formula definida por el sistema.
- El sistema debe calcular automaticamente la presion arterial media a partir de la presion arterial sistolica y diastolica.
- El sistema debe permitir dejar vacio el registro de signos vitales.

---

### #019: Registrar Examen Fisico

**Como** medico
**Quiero** registrar el examen fisico del paciente
**Para** contar con la evaluacion fisica realizada durante la consulta

**Criterios de aceptacion:**
- El sistema debe permitir registrar el estado de aspecto general, piel y faneras, cabeza, cuello, torax y pulmones, CV, abdomen, G-U, SOMA, SNC y otros.
- El sistema debe permitir seleccionar unicamente los valores "Conservado", "Observado" o "Diferido" para cada seccion del examen fisico.
- El sistema debe permitir ingresar observaciones textuales unicamente cuando el estado seleccionado sea "Observado".
- El sistema no debe permitir ingresar observaciones cuando el estado seleccionado sea "Conservado" o "Diferido".
- El sistema debe permitir modificar o eliminar la informacion ingresada antes de guardar la atencion.

---

## Epica 5: Seccion presuncion diagnostica

### #020: Registrar Diagnostico

**Como** medico
**Quiero** registrar el diagnostico de la consulta medica actual
**Para** contar con la evaluacion diagnostica del paciente

**Criterios de aceptacion:**
- El sistema debe permitir buscar diagnosticos por nombre o codigo.
- El sistema debe permitir seleccionar los diagnosticos encontrados que coincidan con esos datos de busqueda.
- El sistema debe mostrar una indicacion cuando no existan diagnosticos que coincidan con la busqueda.
- El sistema debe permitir seleccionar el tipo de diagnostico para cada diagnostico seleccionado (presuntivo, definitivo, repetitivo).
- El sistema debe permitir ingresar especificaciones de cada diagnostico seleccionado.
- El sistema debe permitir dejar vacio el campo de especificaciones.
- El sistema debe exigir el registro de al menos un diagnostico con su tipo antes de guardar la atencion.
- El sistema debe permitir modificar o eliminar la informacion ingresada antes de guardar la atencion.

---

## Epica 6: Seccion plan de trabajo

### #021: Registrar Plan de Trabajo

**Como** medico
**Quiero** registrar el plan de trabajo complementario
**Para** contar con las indicaciones y recomendaciones a seguir

**Criterios de aceptacion:**
- El sistema debe permitir ingresar informacion en el campo de plan de trabajo.
- El sistema debe permitir dejar vacio el campo de plan de trabajo.
- El sistema debe permitir modificar o eliminar la informacion ingresada antes de guardar la atencion.

---

## Sub Epica 6.1: Receta Medica

### #022: Registrar Receta Medica

**Como** medico
**Quiero** registrar la receta medica de la consulta
**Para** contar con la receta medica elaborada para el paciente

**Criterios de aceptacion:**
- El sistema debe permitir buscar medicamentos por descripcion.
- El sistema debe permitir seleccionar los medicamentos encontrados que coinciden con esos datos de busqueda.
- El sistema debe mostrar una indicacion cuando no existan medicamentos que coincidan con la busqueda.
- El sistema debe permitir ingresar la cantidad e indicaciones para cada medicamento seleccionado.
- El sistema debe permitir seleccionar un diagnostico relacionado para cada medicamento seleccionado.
- El sistema debe permitir modificar o eliminar la informacion ingresada antes de guardar la atencion.
- El sistema debe permitir dejar vacio el registro de receta medica.

---

### #023: Registrar Multiples Recetas Medicas

**Como** medico
**Quiero** registrar mas de una receta medica en una atencion
**Para** contar con la receta medica elaborada para el paciente

**Criterios de aceptacion:**
- El sistema debe permitir crear una nueva receta medica dentro de una atencion medica en curso o ya registrada.
- Al crear una nueva receta medica, el sistema debe iniciar un nuevo registro de receta independiente dentro de la misma atencion.
- El sistema debe conservar las recetas medicas previamente registradas dentro de la misma atencion.

---

### #024: Generar PDF de Receta Medica

**Como** medico
**Quiero** generar el PDF de la receta medica de una atencion
**Para** poder imprimirla y entregarla al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de la receta medica cuando exista al menos un medicamento registrado en la atencion.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, telefono y fecha de nacimiento.
- El PDF debe mostrar los datos de la receta medica ingresados en la atencion.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresion.
- El PDF debe incluir el espacio correspondiente para el sello o firma del medico.

---

## Sub Epica 6.2: Examenes Auxiliares

### #025: Registrar Orden de Examenes Auxiliares

**Como** medico
**Quiero** registrar los examenes auxiliares
**Para** contar con los examenes auxiliares solicitados

**Criterios de aceptacion:**
- El sistema debe permitir buscar examenes por descripcion.
- El sistema debe permitir seleccionar examenes a partir de los resultados de busqueda o indicar cuando no haya.
- El sistema debe permitir ingresar observaciones para cada examen seleccionado.
- El sistema debe permitir dejar vacio el registro de examenes auxiliares.

---

### #026: Generar PDF de Examenes Auxiliares

**Como** medico
**Quiero** generar el PDF de examenes auxiliares de una atencion
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de examenes auxiliares cuando exista un examen auxiliar registrado en la atencion.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, telefono y fecha de nacimiento.
- El PDF debe mostrar los datos de los examenes auxiliares ingresados en la atencion.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresion.
- El PDF debe incluir el espacio correspondiente para el sello o firma del medico.

---

## Sub Epica 6.3: Interconsulta

### #027: Registrar Interconsulta

**Como** medico
**Quiero** registrar las interconsultas
**Para** contar con las interconsultas solicitadas

**Criterios de aceptacion:**
- El sistema debe permitir buscar servicios por nombre.
- El sistema debe permitir seleccionar el servicio solicitado de cada interconsulta.
- El sistema debe permitir ingresar el motivo de cada interconsulta.
- El sistema debe permitir dejar vacio el registro de interconsultas.

---

### #028: Generar PDF de Interconsulta

**Como** medico
**Quiero** generar el PDF de interconsulta de una atencion
**Para** poder imprimirlo y entregarlo al paciente

**Criterios de aceptacion:**
- El sistema debe permitir generar el PDF de interconsulta cuando exista al menos una interconsulta registrada en la atencion.
- El PDF debe mostrar los datos del paciente, incluyendo nombres, documento de identidad, sexo, edad, telefono y fecha de nacimiento.
- El PDF debe mostrar los datos de la interconsulta ingresados en la atencion.
- El PDF debe mostrar los datos de la fecha, hora y usuario de impresion.
- El PDF debe incluir el espacio correspondiente para el sello o firma del medico.

---

## Epica 7: Atencion medica

### #029: Iniciar Nueva Atencion

**Como** medico
**Quiero** iniciar la atencion de un paciente
**Para** registrar su atencion medica

**Criterios de aceptacion:**
- El sistema debe permitir iniciar la atencion de un paciente previamente seleccionado.
- Al iniciar la atencion, el sistema debe abrir la interfaz de atencion medica del paciente seleccionado.
- Al abrir la atencion, el sistema debe mostrar los datos basicos del paciente (nombre, DNI, edad, sexo).
- Al abrir la atencion, el sistema debe mostrar la informacion clinica previa disponible del paciente: antecedentes (empezando por RAM y alergias) y diagnosticos (con fecha).

---

### #030: Grabar Atencion Medica

**Como** medico
**Quiero** grabar la atencion medica
**Para** almacenar la informacion registrada

**Criterios de aceptacion:**
- El sistema debe permitir grabar la atencion medica cuando se hayan validado los datos ingresados y obligatorios.
- El sistema debe mostrar un mensaje de confirmacion cuando la atencion se grabe correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible grabar la atencion.
- El sistema debe almacenar la informacion registrada de la atencion en la base de datos para su posterior consulta.

---

### #031: Buscar Atenciones Medicas

**Como** medico
**Quiero** buscar atenciones medicas registradas
**Para** localizar una atencion especifica cuando lo necesite

**Criterios de aceptacion:**
- El sistema debe permitir ingresar criterios de busqueda por numero de documento, nombre del paciente o rango de fechas de registro.
- El sistema debe mostrar una lista de atenciones medicas que coincidan con los criterios ingresados.
- El sistema debe mostrar en la lista de resultados la informacion principal de cada atencion encontrada, incluyendo nombres y apellidos del paciente, numero de documento y fecha de registro de la atencion.
- El sistema debe mostrar un mensaje o indicacion cuando no se encuentren resultados.

---

### #032: Ver Atencion Medica Registrada

**Como** medico
**Quiero** ver una atencion medica registrada
**Para** revisar el detalle de una atencion especifica cuando lo necesite

**Criterios de aceptacion:**
- Al seleccionar una atencion medica, el sistema debe abrir la interfaz de detalle de la atencion seleccionada.
- Al ver la atencion, el sistema debe mostrar la informacion previamente registrada de la atencion seleccionada.
- El sistema debe mostrar la fecha de registro de la atencion y la fecha de la ultima actualizacion.
- El sistema no debe permitir ver una atencion medica si no se ha seleccionado una atencion registrada.

---

### #033: Editar Atencion Medica

**Como** medico
**Quiero** editar una atencion medica
**Para** corregir o actualizar la informacion registrada

**Criterios de aceptacion:**
- El sistema debe permitir abrir una atencion medica ya registrada para su edicion cuando este dentro del plazo de 24 horas.
- El sistema debe mostrar los datos registrados de la atencion seleccionada.
- El sistema debe permitir modificar los datos de la atencion medica.
- El sistema debe validar los campos obligatorios antes de guardar los cambios realizados.
- El sistema debe mostrar un mensaje de confirmacion cuando los cambios se guarden correctamente.
- El sistema debe mostrar un mensaje de error cuando no sea posible guardar los cambios realizados.

---

### #034: Consultar Historia Clinica del Paciente

**Como** medico
**Quiero** consultar la historia clinica de un paciente
**Para** revisar sus atenciones medicas a lo largo del tiempo

**Criterios de aceptacion:**
- El sistema debe permitir seleccionar un paciente registrado.
- El sistema debe mostrar el listado de atenciones medicas registradas del paciente en orden cronologico.
- El sistema debe permitir seleccionar una atencion del historial para revisar sus datos registrados.
- El sistema debe indicar cuando el paciente no tenga atenciones medicas registradas.

---

## Epica 8: Estadisticas

### #035: Ver Estadisticas Basicas de Atencion

**Como** medico
**Quiero** visualizar estadisticas basicas de atencion
**Para** tener una vision general de mis registros

**Criterios de aceptacion:**
- El sistema debe mostrar las estadisticas basicas de atencion al ingresar al sistema (numero de atenciones totales, numero de atenciones en el dia, numero de pacientes registrados).
- El sistema debe mostrar los valores actualizados de cada estadistica.
- El sistema debe indicar cuando no existan datos para alguna estadistica mostrada.

---

### #036: Ver Graficos Estadisticos de Atenciones

**Como** medico
**Quiero** visualizar graficos estadisticos de mis atenciones
**Para** tener un detalle visual de los datos estadisticos de cada atencion

**Criterios de aceptacion:**
- El sistema debe permitir visualizar la distribucion de pacientes registrados segun sexo mediante graficos estadisticos.
- El sistema debe permitir visualizar la distribucion de pacientes registrados segun grupos etarios mediante graficos estadisticos.
- El sistema debe permitir visualizar la distribucion de atenciones medicas segun fecha mediante graficos estadisticos.
- El sistema debe mostrar un mensaje informativo cuando no existan datos disponibles para alguna estadistica o grafico mostrado.
- El sistema debe actualizar automaticamente la informacion estadistica conforme se registren nuevos pacientes o atenciones medicas.