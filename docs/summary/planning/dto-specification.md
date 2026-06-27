# Especificación de Data Transferer Objets (Dtos)

## Módulo de Autenticación

### Users
#### CreateUserDto
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      role_id     |  number  |                                                                            IsInt                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      role_id     |  number  |                                                                           Min(1)                                                                           |                                           En sistemas modernos los identificadores numéricos .                                           |
|       name       |  string  |                                                                          IsString                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        MinLength(2)                                                                        |                                              Existen nombres que poseen solo dos caracteres.                                             |
|       name       |  string  |                                                                       MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                          IsString                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| paternal_surname |  string  |                                                                        MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                          IsString                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| maternal_surname |  string  |                                                                        MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                          IsString                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' })                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                          IsString                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        MinLength(3)                                                                        |                              Se recomienda un mínimo de caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     password     |  string  |                                                                          IsString                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        MinLength(15)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {message: 'La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales', }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                           IsEmail                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |
#### UpdateUserDto
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      roleId      |  number  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      roleId      |  number  |                                                                            IsInt                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      roleId      |  number  |                                                                           Min(1)                                                                           |                                           En sistemas modernos los identificadores numéricos .                                           |
|       name       |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|       name       |  string  |                                                                          IsString                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        MinLength(2)                                                                        |                                              Existen nombres que poseen solo dos caracteres.                                             |
|       name       |  string  |                                                                       MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| paternal_surname |  string  |                                                                          IsString                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| paternal_surname |  string  |                                                                        MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| maternal_surname |  string  |                                                                          IsString                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| maternal_surname |  string  |                                                                        MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     cmp_code     |  string  |                                                                          IsString                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' })                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     username     |  string  |                                                                          IsString                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        MinLength(3)                                                                        |                              Se recomienda un mínimo de caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     password     |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     password     |  string  |                                                                          IsString                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        MinLength(15)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {message: 'La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales', }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      email       |  string  |                                                                           IsEmail                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |
|     is_active    |  boolean |                                                                         IsOptional                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     is_active    |  boolean |                                                                          IsBoolean                                                                         |                                   El modelo de datos establece que el valor debe ser de tipo Booleano.                                   |
### LoginDto
| **Campo** | **Tipo** |                                          **Decorador**                                         |                           **Justificación**                           |
|:---------:|:--------:|:----------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------:|
|  username |  string  |                                  ValidateIf((o)=>!o.cmp_code)                                  |    Se hace la validación solo si no se ha ingresado un código cpm.    |
|  username |  string  |                                            IsString                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  username |  string  |                                           IsNotEmpty                                           |       Se valida que por lo menos se haya ingresado un caracter.       |
|  username |  string  |                                          MaxLength(50)                                         | El modelo de datos establece el máximo de caracteres a 50.            |
|  cmp_code |  string  |                                  ValidateIf((o)=>!o.username)                                  |     Se hace la validación solo si no se ha ingresado un username.     |
|  cmp_code |  string  |                                            IsString                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  cmp_code |  string  | Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' }) | Se valida que el String posea estrictamente solo 6 dígitos numéricos. |
| password  |  string  |                                            IsString                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  password |  string  |                                          MinLength(15)                                         | Longitud mínima recomendada por el NIST.                              |
|  password |  string  |                                         MaxLength(250)                                         | El modelo de datos establece el máximo de caracteres a 250.           |
### RefreshTokenDto
| **Campo** | **Tipo** | **Decorador** |                   **Justificación**                  |
|:---------:|:--------:|:-------------:|:----------------------------------------------------:|
| new_token |  string  |    IsString   | Se debe validar que el dato ingresado sea un String. |
### ForgotPasswordDto
| **Campo** | **Tipo** |  **Decorador** |                         **Justificación**                         |
|:---------:|:--------:|:--------------:|:-----------------------------------------------------------------:|
|   email   |  string  |     IsEmail    |        Se debe validar que el dato ingresado sea un email.        |
|   email   |  string  | MaxLength(254) | El modelo de datos dictamina que el máximo de caracteres sea 254. |
### ResetPasswordDto
|     **Campo**    | **Tipo** |                                                                      **Decorador**                                                                     |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|   new_password   |  string  |                                                                        IsString                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
|   new_password   |  string  | @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/, {message: ‘La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales’, }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|   new_password   |  string  |                                                                      MinLength(15)                                                                     |                                                 Longitud mínima recomendada por el NIST.                                                 |
|   new_password   |  string  |                                                                     MaxLength(250)                                                                     |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
| confirm_password |  string  |                                                                        IsString                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
| confirm_password |  string  |                                         MatchField('new_password', { message: 'Las contraseñas no coinciden' })                                        |             Confirmación de contraseña, dado que no existe un decorador especializado ya definido, se crea uno personalizado.            |
...

### Roles
### CreateRoleDto
| **Campo** | **Tipo** | **Decorador** |                        **Justificación**                        |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------:|
|    name   |  string  |    isString   |    Se debe validar que el dato ingresado sea de tipo String.    |
|    name   |  string  |  MinLength(3) |     Longitud mínima aceptable para nombres de rol legibles.     |
|    name   |  string  | MaxLength(50) | Límite de caracteres máximo establecido por el modelo de datos. |
### UpdateRoleDto
| **Campo** | **Tipo** | **Decorador** |                                          **Justificación**                                          |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------------------------------------------:|
|    name   |  string  |   IsOptional  | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    name   |  string  |    IsString   |                      Se debe validar que el dato ingresado sea de tipo String.                      |
|    name   |  string  |  MinLength(3) |                       Longitud mínima aceptable para nombres de rol legibles.                       |
|    name   |  string  | MaxLength(50) |                   Límite de caracteres máximo establecido por el modelo de datos.                   |
| is_active |  boolean |   IsOptional  | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| is_active |  boolean |   IsBoolean   |                 El modelo de datos establece que el valor debe ser de tipo Booleano.                |
...

## Módulo de Pacientes
### Patients
#### CreatePatientDto
|     **Campo**    |    **Tipo**   |     **Decorador**     |                                    **Justificación**                                   |
|:----------------:|:-------------:|:---------------------:|:--------------------------------------------------------------------------------------:|
|   document_type  | DOCUMENT_TYPE | IsEnum(DOCUMENT_TYPE) |     Se valida que el valor ingresado pertenezca a un tipo de documento predefinido.    |
|  document_number |     string    |  ValidDocumentNumber  |       Validación del número del documento según el tipo, decorador personalizado       |
|       name       |     string    |        IsString       |                   Se valida que el valor ingresado sea de tipo String                  |
|       name       |     string    |      MinLength(2)     |                     Existen nombres que poseen solo dos caracteres.                    |
|       name       |     string    |     MaxLength(100)    |              Validación de que el nombre no sobrepase los 100 caracteres.              |
| paternal_surname |     string    |        IsString       |               Se debe validar que el valor ingresado sea de tipo String.               |
| paternal_surname |     string    |      MinLength(2)     |                          Existen apellidos de solo dos letras.                         |
| paternal_surname |     string    |     MaxLength(50)     |                 El límite de caracteres establecido en la BD es de 50.                 |
| maternal_surname |     string    |        IsString       |               Se debe validar que el valor ingresado sea de tipo String.               |
| maternal_surname |     string    |      MinLength(2)     |                          Existen apellidos de solo dos letras.                         |
| maternal_surname |     string    |     MaxLength(50)     |                 El límite de caracteres establecido en la BD es de 50.                 |
|        sex       |    SEX_TYPE   |    IsEnum(SEX_TYPE)   |           Se valida que el valor ingresado pertenezca a un sexo predefinido.           |
|       phone      |     string    |       IsOptional      |  Establece que las validaciones se den siempre y cuando se haya brindado algún valor.  |
|       phone      |     string    |     IsPhoneNumber     | Se valida el número de teléfono, sin parámetros para permitir números internacionales. |
|       phone      |     string    |     MaxLength(15)     |               El modelo de datos establece el máximo de caracteres a 15.               |
|    birth_date    |     string    |      IsDateString     |      Se valida que el texto ingresado sea una fecha y tenga el formato YYYY-MM-DD.     |
#### UpdatePatientDto
|     **Campo**    |    **Tipo**   |     **Decorador**     |                                          **Justificación**                                          |
|:----------------:|:-------------:|:---------------------:|:---------------------------------------------------------------------------------------------------:|
|   document_type  | DOCUMENT_TYPE |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|   document_type  | DOCUMENT_TYPE | IsEnum(DOCUMENT_TYPE) |           Se valida que el valor ingresado pertenezca a un tipo de documento predefinido.           |
|  document_number |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|  document_number |     string    |  ValidDocumentNumber  |              Validación del número del documento según el tipo, decorador personalizado             |
|       name       |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       name       |     string    |        IsString       |                         Se valida que el valor ingresado sea de tipo String                         |
|       name       |     string    |      MinLength(2)     |                           Existen nombres que poseen solo dos caracteres.                           |
|       name       |     string    |     MaxLength(100)    |                     Validación de que el nombre no sobrepase los 100 caracteres.                    |
| paternal_surname |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| paternal_surname |     string    |        IsString       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| paternal_surname |     string    |      MinLength(2)     |                                Existen apellidos de solo dos letras.                                |
| paternal_surname |     string    |     MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
| maternal_surname |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| maternal_surname |     string    |        IsString       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| maternal_surname |     string    |      MinLength(2)     |                                Existen apellidos de solo dos letras.                                |
| maternal_surname |     string    |     MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
|        sex       |    SEX_TYPE   |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|        sex       |    SEX_TYPE   |    IsEnum(SEX_TYPE)   |                  Se valida que el valor ingresado pertenezca a un sexo predefinido.                 |
|       phone      |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       phone      |     string    |     IsPhoneNumber     |        Se valida el número de teléfono, sin parámetros para permitir números internacionales.       |
|       phone      |     string    |     MaxLength(15)     |                      El modelo de datos establece el máximo de caracteres a 15.                     |
|    birth_date    |     string    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    birth_date    |     string    |      IsDateString     |            Se valida que el texto ingresado sea una fecha y tenga el formato YYYY-MM-DD.            |
|     is_active    |    boolean    |       IsOptional      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|     is_active    |    boolean    |       IsBoolean       |                 El modelo de datos establece que el valor debe ser de tipo Booleano.                |
### Clinical_Histories
### Family_Histories
### Gynecological_Histories
### Allergy_Histories
### Ram_Histories

## Módulo de Atenciones

## Catálogos