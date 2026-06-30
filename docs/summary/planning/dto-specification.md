# Especificación de Data Transferer Objets (Dtos)

## Módulo de Autenticación

### Users
#### CreateUserRequest
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
#### UpdateUserRequest
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
### LoginRequest
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
### RefreshTokenRequest
| **Campo** | **Tipo** | **Decorador** |                   **Justificación**                  |
|:---------:|:--------:|:-------------:|:----------------------------------------------------:|
| new_token |  string  |    IsString   | Se debe validar que el dato ingresado sea un String. |
### ForgotPasswordDto
| **Campo** | **Tipo** |  **Decorador** |                         **Justificación**                         |
|:---------:|:--------:|:--------------:|:-----------------------------------------------------------------:|
|   email   |  string  |     IsEmail    |        Se debe validar que el dato ingresado sea un email.        |
|   email   |  string  | MaxLength(254) | El modelo de datos dictamina que el máximo de caracteres sea 254. |
### ResetPasswordRequest
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
### CreateRoleRequest
| **Campo** | **Tipo** | **Decorador** |                        **Justificación**                        |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------:|
|    name   |  string  |    isString   |    Se debe validar que el dato ingresado sea de tipo String.    |
|    name   |  string  |  MinLength(3) |     Longitud mínima aceptable para nombres de rol legibles.     |
|    name   |  string  | MaxLength(50) | Límite de caracteres máximo establecido por el modelo de datos. |
### UpdateRoleRequest
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
#### CreatePatientRequest
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
#### UpdatePatientRequest
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
#### CreateClinicalHistoryRequest
|    **Campo**   | **Tipo de dato** |     **Decorador**     |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |        @IsInt()       |       El modelo de datos dictamina que debe ser un entero.      |
|   patient_id   |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|  diagnosis_id  |      number      |        @IsInt()       |       El modelo de datos dictamina que debe ser un entero.      |
|  diagnosis_id  |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|      type      |   HISTORY_TYPE   | @IsEnum(HISTORY_TYPE) | El modelo de datos solo acepta valores PATOLOGICO o QUIRURGICO. |
| specifications |      string      |     @IsOptional()     |                Se concluyó que un campo opcional.               |
| specifications |      string      |      @IsString()      |       El modelo de datos dictamina que debe ser un string.      |
| specifications |      string      |    @MaxLength(200)    |   El modelo de datos establece un límite de caracteres de 200.  |
#### UpdateClinicalHistoryRequest
|    **Campo**   | **Tipo de dato** |     **Decorador**     |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
|   patient_id   |      number      |        @IsInt()       |       El modelo de datos dictamina que debe ser un entero.      |
|   patient_id   |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|  diagnosis_id  |      number      |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
|  diagnosis_id  |      number      |        @IsInt()       |           El modelo de datos establece el mínimo a 1.           |
|  diagnosis_id  |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|      type      |   HISTORY_TYPE   |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
|      type      |   HISTORY_TYPE   | @IsEnum(HISTORY_TYPE) | El modelo de datos solo acepta valores PATOLOGICO o QUIRURGICO. |
| specifications |      string      |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
| specifications |      string      |      @IsString()      |       El modelo de datos dictamina que debe ser un string.      |
| specifications |      string      |    @MaxLength(200)    |   El modelo de datos establece un límite de caracteres de 200.  |
### Family_Histories
#### CreateFamilyHistoryRequest
|    **Campo**   | **Tipo de dato** |                  **Decorador**                  |                           **Justificación**                          |
|:--------------:|:----------------:|:-----------------------------------------------:|:--------------------------------------------------------------------:|
|   patient_id   |      number      |                     @IsInt()                    |         El modelo de datos dictamina que debe ser un entero.         |
|   patient_id   |      number      |                     @Min(1)                     |              El modelo de datos establece el mínimo a 1.             |
|      type      |    FAMILY_TYPE   |               @IsEnum(FAMILY_TYPE)              | Validar el ingreso solo de valores definidos en el enum FAMILY_TYPE. |
|      other     |      string      | @ValidateIf((o) => o.type === FAMILY_TYPE.OTRO) |             Solo se valida cuando el campo type tiene el valor 'OTRO'.             |
|      other     |      string      |                   @IsString()                   |         El modelo de datos dictamina que debe ser un string.         |
|      other     |      string      |                 @MaxLength(100)                 |   El modelo de datos establece la longitud máxima a 100 caracteres.  |
|     status     |   FAMILY_STATUS  |              @IsEnum(FAMILY_STATUS)             |                 Solo acepta valores VIVO o FALLECIDO.                |
| specifications |      string      |                  @IsOptional()                  |                 Se concluyó que es un campo opcional.                |
| specifications |      string      |                   @IsString()                   |         El modelo de datos dictamina que debe ser un string.         |
| specifications |      string      |                 @MaxLength(200)                 |   El modelo de datos establece la longitud máxima a 200 caracteres.  |
#### UpdateFamilyHistoryRequest
|    **Campo**   | **Tipo de dato** |                  **Decorador**                  |                                 **Justificación**                                |
|:--------------:|:----------------:|:-----------------------------------------------:|:--------------------------------------------------------------------------------:|
|   patient_id   |      number      |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|   patient_id   |      number      |                     @IsInt()                    |               El modelo de datos dictamina que debe ser un entero.               |
|   patient_id   |      number      |                     @Min(1)                     |                    El modelo de datos establece el mínimo a 1.                   |
|      type      |    FAMILY_TYPE   |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|      type      |    FAMILY_TYPE   |               @IsEnum(FAMILY_TYPE)              |       Validar el ingreso solo de valores definidos en el enum FAMILY_TYPE.       |
|      other     |      string      | @ValidateIf((o) => o.type === FAMILY_TYPE.OTRO) |            Solo se valida cuando el campo type tiene el valor 'OTRO'.            |
|      other     |      string      |                  @IsNotEmpty()                  | Obliga a enviar el campo 'other' cuando el valor del campo type cambia a 'OTRO'. |
|      other     |      string      |                   @IsString()                   |               El modelo de datos dictamina que debe ser un string.               |
|      other     |      string      |                 @MaxLength(100)                 |         El modelo de datos establece la longitud máxima a 100 caracteres.        |
|     status     |   FAMILY_STATUS  |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|     status     |   FAMILY_STATUS  |              @IsEnum(FAMILY_STATUS)             |                       Solo acepta valores VIVO o FALLECIDO.                      |
| specifications |      string      |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
| specifications |      string      |                   @IsString()                   |                       Solo acepta valores VIVO o FALLECIDO.                      |
| specifications |      string      |                 @MaxLength(200)                 |         El modelo de datos establece la longitud máxima a 200 caracteres.        |
### Gynecological_Histories
#### CreateGynecologicalHistoryRequest
|       **Campo**       |   **Tipo de dato**   |                               **Decorador**                              |                             **Justificación**                            |
|:---------------------:|:--------------------:|:------------------------------------------------------------------------:|:------------------------------------------------------------------------:|
|       patient_id      |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|       patient_id      |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|       patient_id      |        number        |                                  @Min(1)                                 |                El modelo de datos establece el mínimo a 1.               |
|        menarche       |        number        |                               @IsOptional()                              |                El modelo de datos establece el mínimo a 1.               |
|        menarche       |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|        menarche       |        number        |                                  @Min(0)                                 |        El modelo de datos indica que debe ser mayor o igual que 0.       |
|    menstrual_cycle    |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|    menstrual_cycle    |        string        |                                @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|    menstrual_cycle    |        string        |                              @MaxLength(50)                              |     El modelo de datos establece el valor máximo de caracteres a 50.     |
| last_menstrual_period |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
| last_menstrual_period |        string        |                              @IsDateString()                             |              Debe validarse que el formato sea "YYYY-MM-DD".             |
|  contraceptive_method | CONTRACEPTIVE_METHOD |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|  contraceptive_method | CONTRACEPTIVE_METHOD |                       @IsEnum(CONTRACEPTIVE_METHOD)                      |      Solo acepta valores definidos en el enum CONTRACEPTIVE_METHOD.      |
|         other         |        string        | @ValidateIf((o) => o.contraceptive_method === CONTRACEPTIVE_METHOD.OTRO) | Solo se valida cuando el valor del campo contraceptive_methor es 'OTRO'. |
|         other         |        string        |                                @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|         other         |        string        |                              @MaxLength(100)                             |      El modelo de datos indica que el máximo de caracteres sea 100.      |
|       gestations      |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|       gestations      |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|       gestations      |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|         parity        |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|         parity        |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|         parity        |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|      orientation      |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|      orientation      |        string        |                                @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|      orientation      |        string        |                              @MaxLength(50)                              |       El modelo de datos indica que el máximo de caracteres sea 50.      |
|         andria        |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|         andria        |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|         andria        |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|          isa          |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|          isa          |        string        |                              @IsDateString()                             |              Debe validarse que el formato sea "YYYY-MM-DD".             |
|          lsa          |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|          lsa          |        string        |                              @IsDateString()                             |              Debe validarse que el formato sea "YYYY-MM-DD".             |
#### UpdateGynecologicalHistoryRequest
|       **Campo**       |   **Tipo de dato**   |                               **Decorador**                              |                                         **Justificación**                                        |
|:---------------------:|:--------------------:|:------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------:|
|       patient_id      |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|       patient_id      |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|       patient_id      |        number        |                                  @Min(1)                                 |                            El modelo de datos establece el mínimo a 1.                           |
|        menarche       |        number        |                               @IsOptional()                              |                            El modelo de datos establece el mínimo a 1.                           |
|        menarche       |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|        menarche       |        number        |                                  @Min(0)                                 |                    El modelo de datos indica que debe ser mayor o igual que 0.                   |
|    menstrual_cycle    |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|    menstrual_cycle    |        string        |                                @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|    menstrual_cycle    |        string        |                              @MaxLength(50)                              |                 El modelo de datos establece el valor máximo de caracteres a 50.                 |
| last_menstrual_period |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
| last_menstrual_period |        string        |                              @IsDateString()                             |                          Debe validarse que el formato sea "YYYY-MM-DD".                         |
|  contraceptive_method | CONTRACEPTIVE_METHOD |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|  contraceptive_method | CONTRACEPTIVE_METHOD |                       @IsEnum(CONTRACEPTIVE_METHOD)                      |                  Solo acepta valores definidos en el enum CONTRACEPTIVE_METHOD.                  |
|         other         |        string        | @ValidateIf((o) => o.contraceptive_method === CONTRACEPTIVE_METHOD.OTRO) |             Solo se valida cuando el valor del campo contraceptive_method es 'OTRO'.             |
|         other         |        string        |                               @IsNotEmpty()                              | Obliga a enviar el campo ‘other’ cuando el valor del campo contraceptive_method cambia a ‘OTRO’. |
|         other         |        string        |                                @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|         other         |        string        |                              @MaxLength(100)                             |                  El modelo de datos indica que el máximo de caracteres sea 100.                  |
|       gestations      |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|       gestations      |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|       gestations      |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|         parity        |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|         parity        |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|         parity        |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|      orientation      |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|      orientation      |        string        |                                @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|      orientation      |        string        |                              @MaxLength(50)                              |                   El modelo de datos indica que el máximo de caracteres sea 50.                  |
|         andria        |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|         andria        |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|         andria        |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|          isa          |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|          isa          |        string        |                              @IsDateString()                             |                          Debe validarse que el formato sea "YYYY-MM-DD".                         |
|          lsa          |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|          lsa          |        string        |                              @IsDateString()                             |                          Debe validarse que el formato sea "YYYY-MM-DD".                         |
### Allergy_Histories
#### CreateAllergyHistoryRequest
|    **Campo**   | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|   patient_id   |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|  diagnosis_id  |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|  diagnosis_id  |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
| specifications |      string      |  @IsOptional()  |      El modelo de datos indica que el campo puede ser NULL.     |
| specifications |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
| specifications |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
#### UpdateAllergyHistoryRequest
|    **Campo**   | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |  @IsOptional()  |         No es obligatorio en una actualización parcial.         |
|   patient_id   |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|   patient_id   |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|  diagnosis_id  |      number      |  @IsOptional()  |         No es obligatorio en una actualización parcial.         |
|  diagnosis_id  |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|  diagnosis_id  |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
| specifications |      string      |  @IsOptional()  |         No es obligatorio en una actualización parcial.         |
| specifications |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
| specifications |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
### Ram_Histories
#### CreateRamHistoryRequest
|       **Campo**      | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|      patient_id      |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|      patient_id      |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
| active_ingredient_id |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
| active_ingredient_id |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|     diagnosis_id     |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|     diagnosis_id     |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|    specifications    |      string      |  @IsOptional()  |      El modelo de datos indica que el campo puede ser NULL.     |
|    specifications    |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
|    specifications    |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
#### UpdateRamHistoryRequest
|       **Campo**      | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|      patient_id      |      number      |  @IsOptional()  |          No es obligatorio en una actualización parcial         |
|      patient_id      |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|      patient_id      |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
| active_ingredient_id |      number      |  @IsOptional()  |          No es obligatorio en una actualización parcial         |
| active_ingredient_id |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
| active_ingredient_id |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|     diagnosis_id     |      number      |  @IsOptional()  |          No es obligatorio en una actualización parcial         |
|     diagnosis_id     |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|     diagnosis_id     |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|    specifications    |      string      |  @IsOptional()  |        El modelo de datos indica que el campo puede ser NULL.       |
|    specifications    |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
|    specifications    |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
## Módulo de Atenciones



### Health_Metrics
#### CreateHealthMetricsRequest

### UpdateHealthMetricsRequest

## Catálogos