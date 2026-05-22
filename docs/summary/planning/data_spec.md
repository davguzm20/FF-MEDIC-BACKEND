# Especificación de Datos F&F-MEDIC

## 4.3. Especificación de Datos

### 4.3.1. Antecedentes

#### Patológicos

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| cie10 | Texto | | Catálogo del CIE-10 de enfermedades |
| nombre | Texto | | |
| especificaciones | Texto | Límite de caracteres | |

#### RAM

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| principio activo | Texto | | Catálogo del CIE-10 de medicamentos |
| efecto adverso | Texto | | Catálogo del CIE-10 de síntomas |
| especificaciones | Texto | Límite de caracteres | |

#### Alergias

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| cie10 | Texto | | Catálogo del CIE-10 de enfermedades |
| descripción | Texto | | |
| especificaciones | Texto | Límite de caracteres | |

#### Quirúrgicos

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| cie10 | Texto | | Catálogo del CIE-10 de quirúrgicos |
| descripción | Texto | | |
| especificaciones | Texto | Límite de caracteres | |

#### Familiares

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| familiar | Texto | | |
| estado | Texto | | |
| especificaciones | Texto | Límite de caracteres | |

#### Ginecológicos

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| menarquía | Entero | | |
| régimen catamenial | Texto | Límite de caracteres | |
| FUR | Fecha | | |
| Gestaciones | Entero | | |
| Partos | Entero | | |
| método anticonceptivo | Enum | | Catálogo de métodos anticonceptivos |
| orientación sexual | Enum | | Catálogo de orientaciones sexuales |
| andria | Entero | | |
| inicio de relaciones sexuales | Fecha | | |
| última relación sexual | Fecha | | |

---

### 4.3.2. Evaluación

#### Somatometría

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| talla | Real | | |
| peso | Real | | |
| IMC | Real | | |
| perímetro abdominal | Real | | |
| superficie corporal | Real | | |

#### Signos Vitales

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| presión arterial sistólica | Real | | |
| presión arterial diastólica | Real | | |
| presión arterial media | Real | | |
| frecuencia cardiaca | Real | | |
| frecuencia respiratoria | Real | | |
| saturación de oxígeno | Real | | |
| temperatura | Real | | |

#### Parámetros Metabólicos

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| HGT | Real | | |
| hemoglobina | Real | | |

#### Motivo de Consulta

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| tiempo de enfermedad | Texto | Límite de caracteres | |
| forma de inicio | Enum | | Insidioso, Brusco |
| curso | Enum | | Progresivo, Estacionario, Intermitente |

#### Signos y Síntomas

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| descripción | Texto | | Catálogo del CIE-10 de síntomas |
| observaciones | Texto | Límite de caracteres | |

#### Relato Cronológico

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| enfermedad actual | Texto | Límite de caracteres | |

#### Funciones Biológicas

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| apetito | Enum | | Aumentado, Conservado, Disminuido, No evaluado. En cualquier caso, se pueden ingresar observaciones (campo textual) |
| sed | Enum | | |
| sueño | Enum | | |
| estado de ánimo | Enum | | |
| orina | Enum | | |
| deposiciones | Enum | | |
| variación ponderal | Enum | | |

#### Examen Físico

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| aspecto general | Enum | | Conservado, Observado, Diferido. Solo en el caso de observado, se puede ingresar observaciones (campo textual) |
| piel y faneras | Enum | | |
| cabeza | Enum | | |
| cuello | Enum | | |
| tórax y pulmones | Enum | | |
| cv | Enum | | |
| abd | Enum | | |
| g-u | Enum | | |
| soma | Enum | | |
| snc | Enum | | |
| otros | Enum | | |

---

### 4.3.3. Presunción Diagnóstica

#### Diagnóstico

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| cie10 | Texto | | Catálogo del CIE-10 de enfermedades |
| descripción | Texto | | |
| tipo de diagnóstico | Enum | | Presuntivo, Definitivo, Repetitivo |
| especificaciones | Texto | Límite de caracteres | |

---

### 4.3.4. Plan de Trabajo

#### Receta Médica

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| medicamento (principio activo + concentración + forma) | Texto | | Catálogo del CIE-10 de medicamentos |
| cie10 | Texto | | Catálogo del CIE-10 de enfermedades |
| cantidad | Entero | | |
| indicaciones | Texto | Límite de caracteres | |

#### Plan de Trabajo

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| plan o recomendaciones | Texto | Límite de caracteres | |

#### Exámenes Auxiliares

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| descripción | Texto | | Catálogo del CIE-10 de la clínica del doc |
| indicaciones | Texto | Límite de caracteres | |

---

### 4.3.5. Interconsulta

#### Interconsulta

| Campo | Tipo de Dato | Restricciones | Catálogo |
|---|---|---|---|
| servicio | Texto | | Catálogo de servicios |
| motivo | Texto | Límite de caracteres | |
