# Guía de Estilo para el Modelado de Base de Datos

Esta guía explica qué contiene cada archivo de la carpeta database y su estilo de escritura en cada uno.

---

## Flujo de trabajo de una sesión de observaciones

1. **Registrar observaciones** en `observations.md` (lógico y/o físico según corresponda)
2. **Registrar decisiones** en `evolution.md` de la versión anterior, bajo `Decisiones para la siguiente versión`
3. **Aplicar las decisiones** a `entities.md` y `tables.md` — estos archivos siempre reflejan el estado actual del modelo sin desactualizarse
4. **Crear la nueva versión** en `evolution.md` con las secciones de Entidades/Tablas y Relaciones/Enumeraciones reflejando el nuevo estado — estas secciones no se copian de la versión anterior, se modifican según los cambios aplicados
5. La nueva versión **no** lleva decisiones porque es la última — cuando haya otra sesión, las decisiones se colocarán en esta versión

---

## logic-model

### observations.md

Aquí se anotan las observaciones que surgen en una versión del modelo lógico para corregirlas posteriormente. Se encuentra organizado por sesiones con títulos en el siguiente formato `## Sesión DD/MM/AAAA` y cada sesión presenta una tabla de observaciones ordenada por prioridad, es decir, lo que afecta más va primero. Además, las observaciones que afectan a una misma entidad deben agruparse consecutivamente para facilitar su consulta. Las columnas son las siguientes:

- **Código:** Identificador de la observación que cuenta con el siguiente formato `OBS-XX`
- **Entidad:** La entidad donde ocurre el hallazgo
- **Campo:** El campo específico del hallazgo, en caso de abarcar a toda la entidad se deja vacío
- **Observación:** Dada por el jefe de proyecto el cual describe el hallazgo en presente, sin hacer preguntas
- **Respuesta:** Dada por el diseñador, puede ser una respuesta escrita que justifique su postura, o `Correcto`/`Cierto` si confirma el hallazgo, o `No se consultó` si no se le preguntó. Nunca se deja vacío
- **Conclusión:** Veredicto dado y aprobado por ambos, su formato es el siguiente, empieza con `Se` + verbo en futuro + la acción que se va a tomar, sin punto al final
- **Decisión:** Identificador de la decisión en caso proceda a una, cuenta con el siguiente formato `DEC-XX`, en caso contrario se deja vacío. Cada observación debe tener una única decisión (relación 1:1)

Todas las columnas se escriben de forma corrida, sin punto y coma, sin viñetas y sin punto al final de Observación, Respuesta ni Conclusión.

#### Tipos de hallazgo del modelo lógico

Los siguientes hallazgos van en el modelo lógico porque modifican el modelo conceptual:

- Agregar, eliminar o renombrar una entidad
- Agregar, eliminar o renombrar un campo
- Cambiar la cardinalidad entre entidades
- Crear, modificar o eliminar un listado cerrado
- Cambiar la obligatoriedad de un campo
- Cambiar el tipo semántico de un dato (ej: de fecha a texto libre porque cambió lo que el campo representa)

Los tipos de dato se expresan en español: `fecha`, `texto libre`, `entero positivo`, `entero positivo de máximo dos cifras`.

### evolution.md

Cada versión refleja el estado del modelo después de aplicar las decisiones de la sesión correspondiente. Las secciones de `Entidades` y `Relaciones` se modifican según los cambios aplicados — nunca se copian de la versión anterior sin cambios. La sección `Decisiones para la siguiente versión` se coloca en la versión N y lista las decisiones que crearán la versión N+1. La última versión no tiene esta sección. Entre el encabezado `## Modelo` y `### Entidades` no van párrafos descriptivos.

Aquí se registran las decisiones que se tomaron en una versión del modelo lógico y que afectan a la siguiente versión. Se encuentra organizado por versiones con títulos en el siguiente formato `## Modelo lógico vX.Y - DD/MM/AAAA`. Cada versión presenta los siguientes bloques:

- **Entidades:** Un detalle plegable `<details>` que contiene las entidades de esa versión y sus campos
- **Relaciones:** Un detalle plegable `<details>` que contiene las relaciones entre entidades y su cardinalidad
- **Decisiones para la siguiente versión (vX.Y):** Lista de decisiones que se tomaron, cada una cuenta con el siguiente formato `DEC-XX: Se [verbo en pasado] [qué se hizo] para [por qué]. (OBS-XX)`

Después del `(OBS-XX)` no va punto. Los verbos que se usan son los siguientes: `eliminó`, `agregó`, `creó`, `renombró`, `reemplazó`, `amplió`, `redujo`, `ajustó`, `cambió`, `estableció`, `volvió`, `separó`, `corrigió`, `unificaron`, `estandarizaron`, `fusionaron`, `restauraron`, `vincularon`, `confirmó`, `tradujeron`, `movieron`. Los conectores que se usan para dar el motivo son: `ya que`, `porque`, `dado que`, `puesto que`, `debido a que`, `para`. No se usa punto y coma ni viñetas dentro del texto de cada decisión.

### entities.md

Aquí se lista el modelo lógico completo, es decir, todas las entidades, sus campos, las relaciones entre ellas y los requisitos que cubre cada una. Se encuentra organizado en las siguientes secciones:

- **# Listados:** Tabla de dos columnas que muestra los valores permitidos para los campos con lista cerrada. Los valores van en español con la primera letra en mayúscula, como `DNI` o `Pasaporte`
- **# Entities:** Cada entidad cuenta con un encabezado en el siguiente formato `## N. Nombre` y dentro tiene una descripción breve, una línea `Cubre:` con los requisitos que atiende en el siguiente formato `RF-XX`, `BR-XX` o `DEC-XX`, y una tabla de 4 columnas que son `Campo`, `Descripción`, `Restricciones` y `Justificación`
- **# Resumenes:** Subsecciones `## Resumen de relaciones` y `## Resumen de coberturas`. `Resumen de relaciones` es una tabla de dos columnas que lista las relaciones entre entidades y su cardinalidad. `Resumen de coberturas` es una tabla que asocia cada entidad con los requisitos que cubre

---

## physic-model

### observations.md

Aquí se anotan las observaciones que surgen en una versión del modelo físico para corregirlas posteriormente. Se encuentra organizado por sesiones con títulos en el siguiente formato `## Sesión DD/MM/AAAA` y cada sesión presenta una tabla de observaciones ordenada por prioridad, es decir, lo que afecta más va primero. Además, las observaciones que afectan a una misma tabla deben agruparse consecutivamente para facilitar su consulta. Las observaciones del modelo lógico no se repiten aquí, solo se documentan hallazgos específicos de la implementación en PostgreSQL. Las columnas son las siguientes:

- **Código:** Identificador de la observación que cuenta con el siguiente formato `OBS-XX`
- **Tabla:** La tabla de PostgreSQL donde ocurre el hallazgo
- **Campo:** El campo específico del hallazgo, en caso de abarcar a toda la tabla se deja vacío
- **Observación:** Dada por el jefe de proyecto el cual describe el hallazgo en presente, sin hacer preguntas
- **Respuesta:** Dada por el diseñador, puede ser una respuesta escrita que justifique su postura, o `Correcto`/`Cierto` si confirma el hallazgo, o `No se consultó` si no se le preguntó. Nunca se deja vacío
- **Conclusión:** Veredicto dado y aprobado por ambos, su formato es el siguiente, empieza con `Se` + verbo en futuro + la acción que se va a tomar, sin punto al final
- **Decisión:** Identificador de la decisión en caso proceda a una, cuenta con el siguiente formato `DEC-XX`, en caso contrario se deja vacío. Cada observación debe tener una única decisión (relación 1:1)

Todas las columnas se escriben de forma corrida, sin punto y coma, sin viñetas y sin punto al final de Observación, Respuesta ni Conclusión.

#### Tipos de hallazgo del modelo físico

Los siguientes hallazgos van en el modelo físico porque son específicos de PostgreSQL y no se derivan automáticamente de una decisión lógica:

- Ajustar el ancho de un VARCHAR
- Cambiar un tipo de dato por incompatibilidad con la plataforma (ej: INET a VARCHAR)
- Agregar o eliminar CHECK constraints, índices o triggers de forma sistémica
- Agregar o eliminar roles de base de datos
- Optimizar el tipo de dato sin cambiar su semántica (ej: INTEGER a SMALLINT)

Si un cambio físico es consecuencia directa de una decisión lógica (ej: eliminar una FK porque el campo se eliminó en el modelo lógico), no se registra como observación física separada.

### evolution.md

Cada versión refleja el estado del modelo después de aplicar las decisiones de la sesión correspondiente. Las secciones de `Tablas` y `Enumeraciones` se modifican según los cambios aplicados — nunca se copian de la versión anterior sin cambios. La sección `Decisiones para la siguiente versión` se coloca en la versión N y lista las decisiones que crearán la versión N+1. La última versión no tiene esta sección. Entre el encabezado `## Modelo` y `### Tablas` no van párrafos descriptivos.

Aquí se registran las decisiones que se tomaron en una versión del modelo físico y que afectan a la siguiente versión. Se encuentra organizado por versiones con títulos en el siguiente formato `## Modelo físico vX - DD/MM/AAAA`. Cada versión presenta los siguientes bloques:

- **Tablas:** Un detalle plegable `<details>` con las tablas de esa versión y su descripción
- **Enumeraciones:** Un detalle plegable `<details>` con los tipos enum y sus valores
- **Decisiones para la siguiente versión (vX):** Lista de decisiones que se tomaron, cada una cuenta con el siguiente formato `DEC-XX: Se [verbo en pasado] [qué se hizo] para [por qué]. (OBS-XX)`

Después del `(OBS-XX)` no va punto. Los verbos que se usan son los siguientes: `eliminó`, `agregó`, `creó`, `renombró`, `reemplazó`, `amplió`, `redujo`, `ajustó`, `cambió`, `estableció`, `volvió`, `separó`, `corrigió`, `unificaron`, `estandarizaron`, `fusionaron`, `restauraron`, `vincularon`, `confirmó`, `tradujeron`, `movieron`. Los conectores que se usan para dar el motivo son: `ya que`, `porque`, `dado que`, `puesto que`, `debido a que`, `para`. No se usa punto y coma ni viñetas dentro del texto de cada decisión.

### tables.md

Aquí se describe la implementación de cada tabla en PostgreSQL. Las decisiones del modelo lógico se implementan directamente aquí, sin duplicarse en `physic-model/evolution.md`. Se encuentra organizado en las siguientes secciones:

- **# Enums:** Tabla de dos columnas con los tipos enum en SCREAMING_CASE y sus valores en español
- **# Triggers:** Tabla de las funciones trigger y su propósito
- **# Users:** Tabla de roles del sistema, permisos y acceso a audits
- **# Tables:** Cada tabla cuenta con un encabezado en el siguiente formato `## N. nombre` y una tabla de 3 columnas que son `Columna` que es el nombre del campo en snake_case, `Tipo` que es el tipo de dato de PostgreSQL y `Constraints` que son las restricciones como `NOT NULL`, `PK`, `REFERENCES tabla(columna)` o `DEFAULT`. Después de `Constraints` puede incluir `Indexes` si la tabla los tiene
- **# Resumenes:** Subsecciones `## Resumen de enums`, `## Resumen de constraints`, `## Resumen de campos textuales`, `## Resumen de triggers` y `## Resumen de índices`
