# Especificacion de Datos F&F-MEDIC

## Antecedentes

### Patologicos

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| cie10 | Texto | | Catalogo del CIE-10 de enfermedades |
| nombre | Texto | | |
| especificaciones | Texto | Limite de caracteres | |

### RAM

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| principio activo | Texto | | Catalogo del CIE-10 de medicamentos |
| efecto adverso | Texto | | Catalogo del CIE-10 de sintomas |
| especificaciones | Texto | Limite de caracteres | |

### Alergias

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| cie10 | Texto | | Catalogo del CIE-10 de enfermedades |
| descripcion | Texto | | |
| especificaciones | Texto | Limite de caracteres | |

### Quirurgicos

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| cie10 | Texto | | Catalogo del CIE-10 de quirurgicos |
| descripcion | Texto | | |
| especificaciones | Texto | Limite de caracteres | |

### Familiares

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| familiar | Texto | | |
| estado | Texto | | |
| especificaciones | Texto | Limite de caracteres | |

### Ginecologicos

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| menarquia | Entero | | |
| regimen catamenial | Texto | Limite de caracteres | |
| FUR | Fecha | | |
| Gestaciones | Entero | | |
| Partos | Entero | | |
| metodo anticonceptivo | Enum | | Catalogo de metodos anticonceptivos |
| orientacion sexual | Enum | | Catalogo de orientaciones sexuales |
| andria | Entero | | |
| inicio de relaciones sexuales | Fecha | | |
| ultima relacion sexual | Fecha | | |

---

## Evaluacion

### Somatometria

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| talla | Real | | |
| peso | Real | | |
| IMC | Real | | |
| perimetro abdominal | Real | | |
| superficie corporal | Real | | |

### Signos Vitales

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| presion arterial sistolica | Real | | |
| presion arterial diastolica | Real | | |
| presion arterial media | Real | | |
| frecuencia cardiaca | Real | | |
| frecuencia respiratoria | Real | | |
| saturacion de oxigeno | Real | | |
| temperatura | Real | | |

### Parametros Metabolicos

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| HGT | Real | | |
| hemoglobina | Real | | |

### Motivo de Consulta

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| tiempo de enfermedad | Texto | Limite de caracteres | |
| forma de inicio | Enum | | Insidioso, Brusco |
| curso | Enum | | Progresivo, Estacionario, Intermitente |

### Signos y Sintomas

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| descripcion | Texto | | Catalogo del CIE-10 de sintomas |
| observaciones | Texto | Limite de caracteres | |

### Relato Cronologico

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| enfermedad actual | Texto | Limite de caracteres | |

### Funciones Biologicas

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| apetito | Enum | | Aumentado, Conservado, Disminuido, No evaluado |
| sed | Enum | | |
| sueno | Enum | | |
| estado de animo | Enum | | |
| orina | Enum | | |
| deposiciones | Enum | | |
| variacion ponderal | Enum | | |

> En cualquier caso, se pueden ingresar observaciones (campo textual)

### Examen Fisico

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| aspecto general | Enum | | Conservado, Observado, Diferido |
| piel y faneras | Enum | | |
| cabeza | Enum | | |
| cuello | Enum | | |
| torax y pulmones | Enum | | |
| cv | Enum | | |
| abd | Enum | | |
| g-u | Enum | | |
| soma | Enum | | |
| snc | Enum | | |
| otros | Enum | | |

> Solo en el caso de observado, se puede ingresar observaciones (campo textual)

---

## Presuncion Diagnostica

### Diagnostico

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| cie10 | Texto | | Catalogo del CIE-10 de enfermedades |
| descripcion | Texto | | |
| tipo de diagnostico | Enum | | Presuntivo, Definitivo, Repetitivo |
| especificaciones | Texto | Limite de caracteres | |

---

## Plan de Trabajo

### Receta Medica

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| medicamento | Texto | | Catalogo del CIE-10 de medicamentos |
| cie10 | Texto | | Catalogo del CIE-10 de enfermedades |
| cantidad | Entero | | |
| indicaciones | Texto | Limite de caracteres | |

> medicamento: principio activo + concentracion + forma

### Plan de Trabajo

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| plan o recomendaciones | Texto | Limite de caracteres | |

### Examenes Auxiliares

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| descripcion | Texto | | Catalogo de examenes de la clinica |
| indicaciones | Texto | Limite de caracteres | |

---

## Interconsulta

### Interconsulta

| Campo | Tipo de Dato | Restricciones | Catalogo |
|---|---|---|---|
| servicio | Texto | | Catalogo de servicios |
| diagnostico | Texto | Lista CIE-10, campo opcional | |
| motivo | Texto | Limite de caracteres | |