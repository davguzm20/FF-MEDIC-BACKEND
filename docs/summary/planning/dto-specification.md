# Especificación de Data Transferer Objets (Dtos)

## Módulo de Autenticación

### Users
#### CreateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      role_id     |  number  |                                                                            @IsInt()                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      role_id     |  number  |                                                                           @Min(1)                                                                           |                                           En sistemas modernos los identificadores numéricos .                                           |
|       name       |  string  |                                                                          @IsString()                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        @MinLength(3)                                                                        |                                              Mínimo aceptable de caracteres para legibilidad.                                             |
|       name       |  string  |                                                                       @MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| paternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| maternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              @ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/)                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(6)                                                                        |                              Se recomienda un mínimo de 6 caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     username     |  string  |                                                                        @Matches(/^{a-zA-Z0-9_}+$/)                                                                       |                                        Validación de caracteres ingresados en el username.                                        |
|     password     |  string  |                                                                          @IsString()                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        @MinLength(12)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       @MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                           @IsEmail()                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       @MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |
#### UpdateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      roleId      |  number  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      roleId      |  number  |                                                                            @IsInt()                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      roleId      |  number  |                                                                           @Min(1)                                                                           |                                           Valor mínimo que puede tener un identificador numérico.                                       |
|       name       |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|       name       |  string  |                                                                          @IsString()                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        @MinLength(3)                                                                        |                                              Existen nombres que poseen solo tres caracteres.                                             |
|       name       |  string  |                                                                       @MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| paternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| paternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| maternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| maternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              @ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/)                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(6)                                                                        |                              Se recomienda un mínimo de 6 caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     username     |  string  |                                                                        @Matches(/^{a-zA-Z0-9_}+$/)                                                                       |                                        Validación de caracteres ingresados en el username.                                       |
|     password     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     password     |  string  |                                                                          @IsString()                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        @MinLength(15)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       @MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {message: 'La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales', }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      email       |  string  |                                                                           @IsEmail()                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       @MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |

### LoginRequest
| **Campo** | **Tipo** |                                          **Decorador**                                         |                           **Justificación**                           |
|:---------:|:--------:|:----------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------:|
|  username |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  username |  string  |                                           @MinLength(6)                                           |       Se valida que por lo menos se hayan ingresado 6 caracteres.       |
|  username |  string  |                                          @MaxLength(50)                                         | El modelo de datos establece el máximo de caracteres a 50.            |
| password  |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  password |  string  |                                          @MinLength(12)                                         | Longitud mínima recomendada por el NIST.                              |
|  password |  string  |                                         @MaxLength(250)                                         | El modelo de datos establece el máximo de caracteres a 250.           |
### RefreshTokenRequest
| **Campo** | **Tipo** | **Decorador** |                   **Justificación**                  |
|:---------:|:--------:|:-------------:|:----------------------------------------------------:|
| refreshToken |  string  |    @IsString()   | Se debe validar que el dato ingresado sea un String. |
### ForgotPasswordDto
| **Campo** | **Tipo** |  **Decorador** |                         **Justificación**                         |
|:---------:|:--------:|:--------------:|:-----------------------------------------------------------------:|
|   email   |  string  |     @IsEmail()    |        Se debe validar que el dato ingresado sea un email.        |
|   email   |  string  | @MaxLength(254) | El modelo de datos dictamina que el máximo de caracteres sea 254. |
### ResetPasswordRequest
|     **Campo**    | **Tipo** |                                                                      **Decorador**                                                                     |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|   token   |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
|   new_password   |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
|   new_password   |  string  |                                                                      @MinLength(12)                                                                     |                                                 Longitud mínima recomendada por el NIST.                                                 |
|   new_password   |  string  |                                                                     @MaxLength(250)                                                                     |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|   new_password   |  string  | @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
| confirm_password |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
| confirm_password |  string  |                                         @MatchField('new_password')                                        |             Confirmación de contraseña, dado que no existe un decorador especializado ya definido, se crea uno personalizado.            |
### Roles
### CreateRoleRequest
| **Campo** | **Tipo** | **Decorador** |                        **Justificación**                        |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------:|
|    name   |  string  |    @IsString()   |    Se debe validar que el dato ingresado sea de tipo String.    |
|    name   |  string  |  @MinLength(3) |     Longitud mínima aceptable para nombres de rol legibles.     |
|    name   |  string  | @MaxLength(50) | Límite de caracteres máximo establecido por el modelo de datos. |
### UpdateRoleRequest
| **Campo** | **Tipo** | **Decorador** |                                          **Justificación**                                          |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------------------------------------------:|
|    name   |  string  |   IsOptional  | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    name   |  string  |    IsString   |                      Se debe validar que el dato ingresado sea de tipo String.                      |
|    name   |  string  |  MinLength(3) |                       Longitud mínima aceptable para nombres de rol legibles.                       |
|    name   |  string  | MaxLength(50) |                   Límite de caracteres máximo establecido por el modelo de datos.                   |
| is_active |  boolean |   IsOptional  | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| is_active |  boolean |   IsBoolean   |                 El modelo de datos establece que el valor debe ser de tipo Booleano.                |
## Módulo de Pacientes
### Patients
#### CreatePatientRequest
|     **Campo**    |    **Tipo**   |     **Decorador**     |                                    **Justificación**                                   |
|:----------------:|:-------------:|:---------------------:|:--------------------------------------------------------------------------------------:|
|   document_type  | DOCUMENT_TYPE | @IsEnum(DOCUMENT_TYPE) |     Se valida que el valor ingresado pertenezca a un tipo de documento predefinido.    |
|  document_number |     string    |  @ValidDocumentNumber()  |       Validación del número del documento según el tipo, decorador personalizado       |
|  document_number |     string    |      @MaxLength(20)     |               El modelo de datos establece el máximo de caracteres a 20.               |
|       name       |     string    |        @IsString()       |                   Se valida que el valor ingresado sea de tipo String                  |
|       name       |     string    |      @MinLength(3)     |                     Existen nombres que poseen solo tres caracteres.                    |
|       name       |     string    |     @MaxLength(100)    |              Validación de que el nombre no sobrepase los 100 caracteres.              |
| paternal_surname |     string    |        @IsString()       |               Se debe validar que el valor ingresado sea de tipo String.               |
| paternal_surname |     string    |      @MinLength(3)     |                          Existen apellidos de solo tres letras.                         |
| paternal_surname |     string    |     @MaxLength(50)     |                 El límite de caracteres establecido en la BD es de 50.                 |
| maternal_surname |     string    |        @IsString()       |               Se debe validar que el valor ingresado sea de tipo String.               |
| maternal_surname |     string    |      @MinLength(3)     |                          Existen apellidos de solo tres letras.                         |
| maternal_surname |     string    |     @MaxLength(50)     |                 El límite de caracteres establecido en la BD es de 50.                 |
|        sex       |    SEX_TYPE   |    @IsEnum(SEX_TYPE)   |           Se valida que el valor ingresado pertenezca a un sexo predefinido.           |
|       phone      |     string    |       @IsOptional()      |  Establece que las validaciones se den siempre y cuando se haya brindado algún valor.  |
|       phone      |     string    |     @IsPhoneNumber()     | Se valida el número de teléfono, sin parámetros para permitir números internacionales. |
|       phone      |     string    |     @MaxLength(15)     |               El modelo de datos establece el máximo de caracteres a 15.               |
|    birth_date    |     string    |      @IsDateString()     |      Se valida que el texto ingresado sea una fecha y tenga el formato YYYY-MM-DD.     |
#### UpdatePatientRequest
|     **Campo**    |    **Tipo**   |     **Decorador**     |                                          **Justificación**                                          |
|:----------------:|:-------------:|:---------------------:|:---------------------------------------------------------------------------------------------------:|
|   document_type  | DOCUMENT_TYPE |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|   document_type  | DOCUMENT_TYPE | @IsEnum(DOCUMENT_TYPE) |           Se valida que el valor ingresado pertenezca a un tipo de documento predefinido.           |
|  document_number |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|  document_number |     string    |  @ValidDocumentNumber()  |              Validación del número del documento según el tipo, decorador personalizado             |
|  document_number |     string    |      @MaxLength(20)     |                      El modelo de datos establece el máximo de caracteres a 20.                     |
|       name       |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       name       |     string    |        @IsString()       |                         Se valida que el valor ingresado sea de tipo String                         |
|       name       |     string    |      @MinLength(3)     |                           Existen nombres que poseen solo tres caracteres.                           |
|       name       |     string    |     @MaxLength(100)    |                     Validación de que el nombre no sobrepase los 100 caracteres.                    |
| paternal_surname |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| paternal_surname |     string    |        @IsString()       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| paternal_surname |     string    |      @MinLength(3)     |                                Existen apellidos de solo tres letras.                                |
| paternal_surname |     string    |     @MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
| maternal_surname |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| maternal_surname |     string    |        @IsString()       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| maternal_surname |     string    |      @MinLength(3)     |                                Existen apellidos de solo tres letras.                                |
| maternal_surname |     string    |     @MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
|        sex       |    SEX_TYPE   |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|        sex       |    SEX_TYPE   |    @IsEnum(SEX_TYPE)   |                  Se valida que el valor ingresado pertenezca a un sexo predefinido.                 |
|       phone      |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       phone      |     string    |     @IsPhoneNumber()     |        Se valida el número de teléfono, sin parámetros para permitir números internacionales.       |
|       phone      |     string    |     @MaxLength(15)     |                      El modelo de datos establece el máximo de caracteres a 15.                     |
|    birth_date    |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    birth_date    |     string    |      @IsDateString()     |            Se valida que el texto ingresado sea una fecha y tenga el formato YYYY-MM-DD.            |
#### CreateCompletePatientRequest
|       **Campo**       |          **Tipo de dato**         |                  **Decorador**                 |                                 **Justificación**                                |
|:---------------------:|:---------------------------------:|:----------------------------------------------:|:--------------------------------------------------------------------------------:|
|  CreatePatientRequest |                 —                 |                        —                       |          Hereda todos los campos y decoradores de CreatePatientRequest.          |
|   clinical_histories  |   CreateClinicalHistoryRequest[]  |                  @IsOptional()                 |           Las historias clínicas son opcionales en el registro inicial.          |
|   clinical_histories  |   CreateClinicalHistoryRequest[]  |                   @IsArray()                   |                    Debe ser un arreglo de historias clínicas.                    |
|   clinical_histories  |   CreateClinicalHistoryRequest[]  |         @ValidateNested({ each: true })        | Valida cada elemento del arreglo con las reglas de CreateClinicalHistoryRequest. |
|   clinical_histories  |   CreateClinicalHistoryRequest[]  |    @Type(() => CreateClinicalHistoryRequest)   |         Indica a class-transformer el tipo de cada elemento del arreglo.         |
|    family_histories   |    CreateFamilyHistoryRequest[]   |                  @IsOptional()                 |          Las historias familiares son opcionales en el registro inicial.         |
|    family_histories   |    CreateFamilyHistoryRequest[]   |                   @IsArray()                   |                   Debe ser un arreglo de historias familiares.                   |
|    family_histories   |    CreateFamilyHistoryRequest[]   |         @ValidateNested({ each: true })        |  Valida cada elemento del arreglo con las reglas de CreateFamilyHistoryRequest.  |
|    family_histories   |    CreateFamilyHistoryRequest[]   |     @Type(() => CreateFamilyHistoryRequest)    |         Indica a class-transformer el tipo de cada elemento del arreglo.         |
| gynecological_history | CreateGynecologicalHistoryRequest |                  @IsOptional()                 |           La historia ginecológica es opcional en el registro inicial.           |
| gynecological_history | CreateGynecologicalHistoryRequest |                @ValidateNested()               |         Valida el objeto con las reglas de CreateGynecologicalHistoryRequest.        |
| gynecological_history | CreateGynecologicalHistoryRequest | @Type(() => CreateGynecologicalHistoryRequest) |                  Indica a class-transformer el tipo del objeto.                  |
|   allergy_histories   |   CreateAllergyHistoryRequest[]   |                  @IsOptional()                 |         Las historias de alergias son opcionales en el registro inicial.         |
|   allergy_histories   |   CreateAllergyHistoryRequest[]   |                   @IsArray()                   |                   Debe ser un arreglo de historias de alergias.                  |
|   allergy_histories   |   CreateAllergyHistoryRequest[]   |         @ValidateNested({ each: true })        |  Valida cada elemento del arreglo con las reglas de CreateAllergyHistoryRequest. |
|   allergy_histories   |   CreateAllergyHistoryRequest[]   |    @Type(() => CreateAllergyHistoryRequest)    |         Indica a class-transformer el tipo de cada elemento del arreglo.         |
|     ram_histories     |     CreateRamHistoryRequest[]     |                  @IsOptional()                 |             Las historias RAM son opcionales en el registro inicial.             |
|     ram_histories     |     CreateRamHistoryRequest[]     |                   @IsArray()                   |                       Debe ser un arreglo de historias RAM.                      |
|     ram_histories     |     CreateRamHistoryRequest[]     |         @ValidateNested({ each: true })        |    Valida cada elemento del arreglo con las reglas de CreateRamHistoryRequest.   |
|     ram_histories     |     CreateRamHistoryRequest[]     |      @Type(() => CreateRamHistoryRequest)      |         Indica a class-transformer el tipo de cada elemento del arreglo.         |
#### UpdateCompletePatientRequest

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
| contraceptive_method_other |     string      | @ValidateIf((o) => o.contraceptive_method === CONTRACEPTIVE_METHOD.OTRO) |  Solo se valida cuando el valor del campo contraceptive_method es 'OTRO'.  |
| contraceptive_method_other |     string      |                               @IsNotEmpty()                              |             Obliga a enviar el campo cuando contraceptive_method es 'OTRO'.             |
| contraceptive_method_other |     string      |                               @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
| contraceptive_method_other |     string      |                             @MaxLength(100)                             |      El modelo de datos indica que el máximo de caracteres sea 100.      |
|       gestations      |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|       gestations      |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|       gestations      |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|       term_births     |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|       term_births     |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|       term_births     |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|      preterm_births   |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|      preterm_births   |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|      preterm_births   |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|        abortions      |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|        abortions      |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|        abortions      |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|    living_children    |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|    living_children    |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|    living_children    |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|      orientation      |     ORIENTATION_TYPE |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|      orientation      |     ORIENTATION_TYPE |                        @IsEnum(ORIENTATION_TYPE)                         |          Solo acepta valores definidos en el enum ORIENTATION_TYPE.          |
|     orientation_other |        string        |         @ValidateIf((o) => o.orientation === ORIENTATION_TYPE.OTRO)       |          Solo se valida cuando el valor del campo orientation es 'OTRO'.          |
|     orientation_other |        string        |                               @IsNotEmpty()                              |             Obliga a enviar el campo cuando orientation es 'OTRO'.             |
|     orientation_other |        string        |                               @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|     orientation_other |        string        |                             @MaxLength(100)                             |      El modelo de datos indica que el máximo de caracteres sea 100.      |
|     sexual_partners   |        number        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|     sexual_partners   |        number        |                                 @IsInt()                                 |           El modelo de datos dictamina que debe ser un entero.           |
|     sexual_partners   |        number        |                                  @Min(0)                                 |           El modelo de datos indica que el valor mínimo sea 0.           |
|          isa          |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|          isa          |        string        |                               @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|          isa          |        string        |                             @MaxLength(250)                             |      El modelo de datos indica que el máximo de caracteres sea 250.      |
|          lsa          |        string        |                               @IsOptional()                              |               El modelo de datos indica que puede ser NULL.              |
|          lsa          |        string        |                               @IsString()                               |           El modelo de datos dictamina que debe ser un string.           |
|          lsa          |        string        |                             @MaxLength(250)                             |      El modelo de datos indica que el máximo de caracteres sea 250.      |
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
| contraceptive_method_other |     string      | @ValidateIf((o) => o.contraceptive_method === CONTRACEPTIVE_METHOD.OTRO) |          Solo se valida cuando el valor del campo contraceptive_method es 'OTRO'.          |
| contraceptive_method_other |     string      |                               @IsNotEmpty()                              |        Obliga a enviar el campo cuando el valor del campo contraceptive_method es 'OTRO'.        |
| contraceptive_method_other |     string      |                               @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
| contraceptive_method_other |     string      |                             @MaxLength(100)                             |                  El modelo de datos indica que el máximo de caracteres sea 100.                  |
|       gestations      |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|       gestations      |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|       gestations      |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|       term_births     |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|       term_births     |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|       term_births     |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|      preterm_births   |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|      preterm_births   |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|      preterm_births   |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|        abortions      |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|        abortions      |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|        abortions      |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|    living_children    |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|    living_children    |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|    living_children    |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|      orientation      |     ORIENTATION_TYPE |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|      orientation      |     ORIENTATION_TYPE |                        @IsEnum(ORIENTATION_TYPE)                         |              Solo acepta valores definidos en el enum ORIENTATION_TYPE.              |
|     orientation_other |        string        |         @ValidateIf((o) => o.orientation === ORIENTATION_TYPE.OTRO)       |           Solo se valida cuando el valor del campo orientation es 'OTRO'.           |
|     orientation_other |        string        |                               @IsNotEmpty()                              |             Obliga a enviar el campo cuando el valor del campo orientation es 'OTRO'.             |
|     orientation_other |        string        |                               @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|     orientation_other |        string        |                             @MaxLength(100)                             |                  El modelo de datos indica que el máximo de caracteres sea 100.                  |
|     sexual_partners   |        number        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|     sexual_partners   |        number        |                                 @IsInt()                                 |                       El modelo de datos dictamina que debe ser un entero.                       |
|     sexual_partners   |        number        |                                  @Min(0)                                 |                       El modelo de datos indica que el valor mínimo sea 0.                       |
|          isa          |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|          isa          |        string        |                               @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|          isa          |        string        |                             @MaxLength(250)                             |                  El modelo de datos indica que el máximo de caracteres sea 250.                  |
|          lsa          |        string        |                               @IsOptional()                              |                          No es obligatorio en una actualización parcial.                         |
|          lsa          |        string        |                               @IsString()                               |                       El modelo de datos dictamina que debe ser un string.                       |
|          lsa          |        string        |                             @MaxLength(250)                             |                  El modelo de datos indica que el máximo de caracteres sea 250.                  |
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
## Módulo de Medicamentos
### Active_Ingredients
#### CreateActiveIngredientRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

### Manufacturers
#### CreateManufacturerRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |
### Dosage_Forms
#### CreateDosageFormRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |
### Medicaments
#### CreateMedicamentRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
|       name      |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|       name      |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.    |
| manufacturer_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| manufacturer_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |
|  concentration  |      string      |   @IsOptional() |        El campo es opcional ya que no todos los medicamentos tienen concentración.       |
|  concentration  |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|  concentration  |      string      |  @MaxLength(50) |     El modelo de datos indica un límite de 50 caracteres.    |
|  dosage_form_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  dosage_form_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |
#### CreateCompleteMedicamentRequest
|       **Campo**       | **Tipo de dato** |      **Decorador**      |                            **Justificación**                            |
|:---------------------:|:----------------:|:-----------------------:|:-----------------------------------------------------------------------:|
|  CreateMedicamentRequest  |         —        |            —            |      Hereda todos los campos y decoradores de CreateMedicamentRequest.      |
| active_ingredient_ids |     number[]     |        @IsArray()       |                 Debe ser un arreglo de identificadores.                 |
| active_ingredient_ids |     number[]     |  @IsInt({ each: true }) | El modelo de datos establece que cada elemento debe ser de tipo entero. |
| active_ingredient_ids |     number[]     | @Min(1, { each: true }) |              El identificador mínimo de cada elemento es 1.             |
## Módulo de Atenciones
### Attentions
#### CreateAttentionRequest
|     **Campo**    | **Tipo de dato** |     **Decorador**    |                                    **Justificación**                                    |
|:----------------:|:----------------:|:--------------------:|:---------------------------------------------------------------------------------------:|
|    patient_id    |      number      |       @IsInt()       |               El modelo de datos dictamina que el campo es de tipo entero.              |
|    patient_id    |      number      |        @Min(1)       |                              El identificador mínimo es 1.                              |
|    service_id    |      number      |       @IsInt()       |               El modelo de datos establece que el campo es de tipo entero.              |
|    service_id    |      number      |        @Min(1)       |                              El identificador mínimo es 1.                              |
| illness_duration |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
| illness_duration |      string      |    @MaxLength(50)    |                  El modelo de datos indica un límite de 50 caracteres.                  |
|    onset_type    |    ONSET_TYPE    |  @IsEnum(ONSET_TYPE) |   El modelo de datos indica que el campo solo acepta los valores definidos en el enum.  |
|      course      |    COURSE_TYPE   | @IsEnum(COURSE_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|  current_disease |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
|     work_plan    |      string      |     @IsOptional()    |                   El modelo de datos indica que el campo es nullable.                   |
|     work_plan    |      string      |      @IsString()     |               El modelo de datos dictamina que el campo es de tipo texto.               |
#### UpdateAttentionRequest
|     **Campo**    | **Tipo de dato** |     **Decorador**    |                                    **Justificación**                                    |
|:----------------:|:----------------:|:--------------------:|:---------------------------------------------------------------------------------------:|
|    patient_id    |      number      |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|    patient_id    |      number      |       @IsInt()       |               El modelo de datos establece que el campo es de tipo entero.              |
|    patient_id    |      number      |        @Min(1)       |                              El identificador mínimo es 1.                              |
|    service_id    |      number      |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|    service_id    |      number      |       @IsInt()       |               El modelo de datos establece que el campo es de tipo entero.              |
|    service_id    |      number      |        @Min(1)       |                              El identificador mínimo es 1.                              |
| illness_duration |      string      |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
| illness_duration |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
| illness_duration |      string      |    @MaxLength(50)    |                  El modelo de datos indica un límite de 50 caracteres.                  |
|    onset_type    |    ONSET_TYPE    |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|    onset_type    |    ONSET_TYPE    |  @IsEnum(ONSET_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|      course      |    COURSE_TYPE   |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|      course      |    COURSE_TYPE   | @IsEnum(COURSE_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|  current_disease |      string      |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|  current_disease |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
|     work_plan    |      string      |     @IsOptional()    |                   El modelo de datos indica que el campo es nullable.                   |
|     work_plan    |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
#### CreateCompleteAttentionRequest
|         **Campo**         |           **Tipo de dato**          |                  **Decorador**                 |                                   **Justificación**                                   |
|:-------------------------:|:-----------------------------------:|:----------------------------------------------:|:-------------------------------------------------------------------------------------:|
| CreateAttentionRequest |                  —                  |                        —                       |            Hereda todos los campos y decoradores de CreateAttentionRequest.           |
|       health_metrics      |      CreateHealthMetricRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreateHealthMetricRequest.             |
|       health_metrics      |      CreateHealthMetricRequest      |     @Type(() => CreateHealthMetricRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|            sed            |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|            sed            |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|          apetito          |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|          apetito          |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|           sueno           |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|           sueno           |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|        estado_animo       |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|        estado_animo       |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|           orina           |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|           orina           |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|        deposiciones       |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|        deposiciones       |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|     variacion_ponderal    |       CreateBioFunctionRequest      |                @ValidateNested()               |              Valida el objeto con las reglas de CreateBioFunctionRequest.             |
|     variacion_ponderal    |       CreateBioFunctionRequest      |      @Type(() => CreateBioFunctionRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|      aspecto_general      |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|      aspecto_general      |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|        piel_faneras       |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|        piel_faneras       |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|           cabeza          |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|           cabeza          |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|           cuello          |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|           cuello          |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|       torax_pulmones      |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|       torax_pulmones      |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|       cardiovascular      |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|       cardiovascular      |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|          abdomen          |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|          abdomen          |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|       genitourinario      |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|       genitourinario      |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|            soma           |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|            soma           |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|            snc            |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|            snc            |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|            otro           |      CreatePhysicalExamRequest      |                  @IsOptional()                 |            El sistema indica que el examen físico de tipo OTRO es opcional.           |
|            otro           |      CreatePhysicalExamRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreatePhysicalExamRequest.             |
|            otro           |      CreatePhysicalExamRequest      |     @Type(() => CreatePhysicalExamRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |                   @IsArray()                   |                          Debe ser un arreglo de diagnósticos.                         |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |                @ArrayMinSize(1)                |            El sistema indica que debe registrarse al menos un diagnóstico.            |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |         @ValidateNested({ each: true })        |  Valida cada elemento del arreglo con las reglas de CreateAttentionDiagnosisRequest.  |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |  @Type(() => CreateAttentionDiagnosisRequest)  |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|        responsible        |       CreateResponsibleRequest      |                  @IsOptional()                 |           El responsable es opcional al crear una atención.           |
|        responsible        |       CreateResponsibleRequest      |               @ValidateNested()                |             Valida el objeto con las reglas de CreateResponsibleRequest.             |
|        responsible        |       CreateResponsibleRequest      |      @Type(() => CreateResponsibleRequest)     |            Indica a class-transformer el tipo del objeto.           |
|         referrals         |       CreateReferralRequest[]       |                  @IsOptional()                 |                 Las referencias son opcionales al crear una atención.                 |
|         referrals         |       CreateReferralRequest[]       |                   @IsArray()                   |                          Debe ser un arreglo de referencias.                          |
|         referrals         |       CreateReferralRequest[]       |         @ValidateNested({ each: true })        |       Valida cada elemento del arreglo con las reglas de CreateReferralRequest.       |
|         referrals         |       CreateReferralRequest[]       |       @Type(() => CreateReferralRequest)       |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                  @IsOptional()                 |                Las prescripciones son opcionales al crear una atención.               |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                   @IsArray()                   |                         Debe ser un arreglo de prescripciones.                        |
|       prescriptions       | CreateCompletePrescriptionRequest[] |         @ValidateNested({ each: true })        | Valida cada elemento del arreglo con las reglas de CreateCompletePrescriptionRequest. |
|       prescriptions       | CreateCompletePrescriptionRequest[] | @Type(() => CreateCompletePrescriptionRequest) |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|           exams           |     CreateCompleteExamRequest[]     |                  @IsOptional()                 |              Las órdenes de examen son opcionales al crear una atención.              |
|           exams           |     CreateCompleteExamRequest[]     |                   @IsArray()                   |                       Debe ser un arreglo de órdenes de examen.                       |
|           exams           |     CreateCompleteExamRequest[]     |         @ValidateNested({ each: true })        |     Valida cada elemento del arreglo con las reglas de CreateCompleteExamRequest.     |
|           exams           |     CreateCompleteExamRequest[]     |     @Type(() => CreateCompleteExamRequest)     |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
### Attention_Diagnoses
#### CreateAttentionDiagnoseRequest
|    **Campo**   | **Tipo de dato** |      **Decorador**      |                                    **Justificación**                                    |
|:--------------:|:----------------:|:-----------------------:|:---------------------------------------------------------------------------------------:|
|  attention_id  |      number      |         @IsInt()        |               El modelo de datos establece que el campo es de tipo entero.              |
|  attention_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|  diagnosis_id  |      number      |         @IsInt()        |                El modelo de datos indica que el campo es de tipo entero.                |
|  diagnosis_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|      type      |  DIAGNOSIS_TYPE  | @IsEnum(DIAGNOSIS_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| specifications |      string      |      @IsOptional()      |                   El modelo de datos indica que el campo es nullable.                   |
| specifications |      string      |       @IsString()       |               El modelo de datos dictamina que el campo es de tipo texto.               |
| specifications |      string      |     @MaxLength(200)     |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdateAttentionDiagnoseRequest
|    **Campo**   | **Tipo de dato** |      **Decorador**      |                                    **Justificación**                                    |
|:--------------:|:----------------:|:-----------------------:|:---------------------------------------------------------------------------------------:|
|  attention_id  |      number      |      @IsOptional()      |                     No es obligatorio en una actualización parcial.                     |
|  attention_id  |      number      |         @IsInt()        |               El modelo de datos establece que el campo es de tipo entero.              |
|  attention_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|  diagnosis_id  |      number      |      @IsOptional()      |                     No es obligatorio en una actualización parcial.                     |
|  diagnosis_id  |      number      |         @IsInt()        |               El modelo de datos establece que el campo es de tipo entero.              |
|  diagnosis_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|      type      |  DIAGNOSIS_TYPE  |      @IsOptional()      |                     No es obligatorio en una actualización parcial.                     |
|      type      |  DIAGNOSIS_TYPE  | @IsEnum(DIAGNOSIS_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| specifications |      string      |      @IsOptional()      |                   El modelo de datos indica que el campo es nullable.                   |
| specifications |      string      |       @IsString()       |               El modelo de datos establece que el campo es de tipo texto.               |
| specifications |      string      |     @MaxLength(200)     |                  El modelo de datos indica un límite de 200 caracteres.                 |
### Health_Metrics
#### CreateHealthMetricsRequest
|      **Campo**      | **Tipo de dato** |            **Decorador**           |                                   **Justificación**                                  |
|:-------------------:|:----------------:|:----------------------------------:|:------------------------------------------------------------------------------------:|
|     attention_id    |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     attention_id    |      number      |               @Min(1)              |                             El identificador mínimo es 1.                            |
|     temperature     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     temperature     |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos dictamina que el campo es de tipo numérico con hasta 2 decimales. |
|     temperature     |      number      |              @Min(30)              |                 El modelo de datos indica que el valor mínimo es 30.                 |
|     temperature     |      number      |              @Max(45)              |                     El valor máximo en el modelo de datos es 45.                     |
|         spo2        |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|         spo2        |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|         spo2        |      number      |               @Min(0)              |                El modelo de datos dictamina que el valor mínimo es 0.                |
|         spo2        |      number      |              @Max(100)             |                     El valor máximo en el modelo de datos es 100.                    |
|      heart_rate     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      heart_rate     |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|      heart_rate     |      number      |               @Min(1)              |                  El modelo de datos indica que el valor mínimo es 1.                 |
|   respiratory_rate  |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|   respiratory_rate  |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|   respiratory_rate  |      number      |               @Min(1)              |               El valor mínimo aceptable según el modelo de datos es 1.               |
|     systolic_bp     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     systolic_bp     |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     systolic_bp     |      number      |               @Min(1)              |               El valor mínimo aceptable según el modelo de datos es 1.               |
|     diastolic_bp    |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     diastolic_bp    |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     diastolic_bp    |      number      |               @Min(1)              |               El valor mínimo aceptable según el modelo de datos es 1.               |
|         hgt         |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|         hgt         |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|         hgt         |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|      hemoglobin     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      hemoglobin     |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|      hemoglobin     |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|        weight       |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|        weight       |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|        weight       |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
| abdominal_perimeter |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
| abdominal_perimeter |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
| abdominal_perimeter |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|        height       |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|        height       |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
#### UpdateHealthMetricsRequest
|      **Campo**      | **Tipo de dato** |            **Decorador**           |                                   **Justificación**                                  |
|:-------------------:|:----------------:|:----------------------------------:|:------------------------------------------------------------------------------------:|
|     attention_id    |      number      |            @IsOptional()           |                    No es obligatorio en una actualización parcial.                   |
|     attention_id    |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     attention_id    |      number      |               @Min(1)              |                             El identificador mínimo es 1.                            |
|     temperature     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     temperature     |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|     temperature     |      number      |              @Min(30)              |                 El modelo de datos indica que el valor mínimo es 30.                 |
|     temperature     |      number      |              @Max(45)              |                 El modelo de datos indica que el valor máximo es 45.                 |
|         spo2        |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|         spo2        |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|         spo2        |      number      |               @Min(0)              |                  El modelo de datos indica que el valor mínimo es 0.                 |
|         spo2        |      number      |              @Max(100)             |                 El modelo de datos indica que el valor máximo es 100.                |
|      heart_rate     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      heart_rate     |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|      heart_rate     |      number      |               @Min(1)              |                  El modelo de datos indica que el valor mínimo es 1.                 |
|   respiratory_rate  |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|   respiratory_rate  |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|   respiratory_rate  |      number      |               @Min(1)              |                  El modelo de datos indica que el valor mínimo es 1.                 |
|     systolic_bp     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     systolic_bp     |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     systolic_bp     |      number      |               @Min(1)              |                  El modelo de datos indica que el valor mínimo es 1.                 |
|     diastolic_bp    |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     diastolic_bp    |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     diastolic_bp    |      number      |               @Min(1)              |                  El modelo de datos indica que el valor mínimo es 1.                 |
|         hgt         |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|         hgt         |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|         hgt         |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|      hemoglobin     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      hemoglobin     |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|      hemoglobin     |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|        weight       |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|        weight       |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|        weight       |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
| abdominal_perimeter |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
| abdominal_perimeter |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
| abdominal_perimeter |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
|        height       |      number      |            @IsOptional()           |                    No es obligatorio en una actualización parcial.                   |
|        height       |      number      | @IsNumber({ maxDecimalPlaces: 2 }) | El modelo de datos establece que el campo es de tipo numérico con hasta 2 decimales. |
|        height       |      number      |             @Min(0.01)             |              El modelo de datos indica que el valor debe ser mayor a 0.              |
### Diagnoses
#### CreateDiagnoseRequest
|  **Campo**  | **Tipo de dato** |             **Decorador**            |                                            **Justificación**                                            |
|:-----------:|:----------------:|:------------------------------------:|:-------------------------------------------------------------------------------------------------------:|
|    cie_10   |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
|    cie_10   |      string      |            @MaxLength(10)            |                          El modelo de datos indica un límite de 10 caracteres.                          |
|    cie_10   |      string      | @Matches(/^{A-Z}\d{2}(\.\d\|\.X)?$/) | El estándar CIE-10 exige una letra seguida de 2 dígitos, con un cuarto carácter opcional tras un punto. |
| description |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
### Services
#### CreateServiceRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                      **Justificación**                      |
|:---------:|:----------------:|:---------------:|:-----------------------------------------------------------:|
|    name   |      string      |   @IsString()   | El modelo de datos establece que el campo es de tipo texto. |
|    name   |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.   |
### Bio_Functions
#### CreateBioFunctionRequest
|   **Campo**  |   **Tipo de dato**  |         **Decorador**        |                                    **Justificación**                                    |
|:------------:|:-------------------:|:----------------------------:|:---------------------------------------------------------------------------------------:|
| attention_id |        number       |           @IsInt()           |               El modelo de datos establece que el campo es de tipo entero.              |
| attention_id |        number       |            @Min(1)           |                              El identificador mínimo es 1.                              |
|     type     |  BIO_FUNCTION_TYPE  |  @IsEnum(BIO_FUNCTION_TYPE)  | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|    status    | BIO_FUNCTION_STATUS | @IsEnum(BIO_FUNCTION_STATUS) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string       |         @IsOptional()        |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string       |          @IsString()         |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string       |        @MaxLength(200)       |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdateBioFunctionRequest
|   **Campo**  |   **Tipo de dato**  |         **Decorador**        |                                    **Justificación**                                    |
|:------------:|:-------------------:|:----------------------------:|:---------------------------------------------------------------------------------------:|
| attention_id |        number       |         @IsOptional()        |                     No es obligatorio en una actualización parcial.                     |
| attention_id |        number       |           @IsInt()           |               El modelo de datos establece que el campo es de tipo entero.              |
| attention_id |        number       |            @Min(1)           |                              El identificador mínimo es 1.                              |
|     type     |  BIO_FUNCTION_TYPE  |         @IsOptional()        |                     No es obligatorio en una actualización parcial.                     |
|     type     |  BIO_FUNCTION_TYPE  |  @IsEnum(BIO_FUNCTION_TYPE)  | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|    status    | BIO_FUNCTION_STATUS |         @IsOptional()        |                     No es obligatorio en una actualización parcial.                     |
|    status    | BIO_FUNCTION_STATUS | @IsEnum(BIO_FUNCTION_STATUS) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string       |         @IsOptional()        |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string       |          @IsString()         |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string       |        @MaxLength(200)       |                  El modelo de datos indica un límite de 200 caracteres.                 |
### Physical_Exams
#### CreatePhysicalExamRequest
|   **Campo**  |   **Tipo de dato**   |                        **Decorador**                       |                                    **Justificación**                                    |
|:------------:|:--------------------:|:----------------------------------------------------------:|:---------------------------------------------------------------------------------------:|
| attention_id |        number        |                          @IsInt()                          |               El modelo de datos establece que el campo es de tipo entero.              |
| attention_id |        number        |                           @Min(1)                          |                              El identificador mínimo es 1.                              |
|    system    | PHYSICAL_EXAM_SYSTEM |                @IsEnum(PHYSICAL_EXAM_SYSTEM)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|     other    |        string        | @ValidateIf((o) => o.system === PHYSICAL_EXAM_SYSTEM.OTRO) |                        Solo se valida cuando el sistema es OTRO.                        |
|     other    |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
|     other    |        string        |                       @MaxLength(100)                      |                  El modelo de datos indica un límite de 100 caracteres.                 |
|    status    | PHYSICAL_EXAM_STATUS |                @IsEnum(PHYSICAL_EXAM_STATUS)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string        |                        @IsOptional()                       |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string        |                       @MaxLength(200)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdatePhysicalExamRequest
|   **Campo**  |   **Tipo de dato**   |                        **Decorador**                       |                                    **Justificación**                                    |
|:------------:|:--------------------:|:----------------------------------------------------------:|:---------------------------------------------------------------------------------------:|
| attention_id |        number        |                        @IsOptional()                       |                     No es obligatorio en una actualización parcial.                     |
| attention_id |        number        |                          @IsInt()                          |               El modelo de datos establece que el campo es de tipo entero.              |
| attention_id |        number        |                           @Min(1)                          |                              El identificador mínimo es 1.                              |
|    system    | PHYSICAL_EXAM_SYSTEM |                        @IsOptional()                       |                     No es obligatorio en una actualización parcial.                     |
|    system    | PHYSICAL_EXAM_SYSTEM |                @IsEnum(PHYSICAL_EXAM_SYSTEM)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|     other    |        string        | @ValidateIf((o) => o.system === PHYSICAL_EXAM_SYSTEM.OTRO) |                        Solo se valida cuando el sistema es OTRO.                        |
|     other    |        string        |                        @IsNotEmpty()                       |                  Obliga a enviar other cuando el sistema cambia a OTRO.                 |
|     other    |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
|     other    |        string        |                       @MaxLength(100)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |
|    status    | PHYSICAL_EXAM_STATUS |                        @IsOptional()                       |                     No es obligatorio en una actualización parcial.                     |
|    status    | PHYSICAL_EXAM_STATUS |                @IsEnum(PHYSICAL_EXAM_STATUS)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string        |                        @IsOptional()                       |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string        |                       @MaxLength(200)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |
## Módulo de Órdenes
### Exams
#### CreateExamRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| attention_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |
#### UpdateExamRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| attention_id |      number      | @IsOptional() |        No es obligatorio en una actualización parcial.       |
| attention_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |

#### CreateCompleteExamRequest
|     **Campo**     |     **Tipo de dato**    |            **Decorador**           |                             **Justificación**                             |
|:-----------------:|:-----------------------:|:----------------------------------:|:-------------------------------------------------------------------------:|
| CreateExamRequest |            —            |                  —                 |        Hereda todos los campos y decoradores de CreateExamRequest.        |
|       items       | CreateExamItemRequest[] |             @IsArray()             |                  Debe ser un arreglo de ítems de examen.                  |
|       items       | CreateExamItemRequest[] |          @ArrayMinSize(1)          |                      Debe contener al menos un ítem.                      |
|       items       | CreateExamItemRequest[] |   @ValidateNested({ each: true })  | Valida cada elemento del arreglo con las reglas de CreateExamItemRequest. |
|       items       | CreateExamItemRequest[] | @Type(() => CreateExamItemRequest) |      Indica a class-transformer el tipo de cada elemento del arreglo.     |
### Exam_Items
#### CreateExamItemRequest
|   **Campo**  | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
|    exam_id   |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|    exam_id   |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
| exam_type_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| exam_type_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|  indications |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|  indications |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|  indications |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
#### UpdateExamItemRequest
|   **Campo**  | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| exam_type_id |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
| exam_type_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| exam_type_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|  indications |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|  indications |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|  indications |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
### Exam_Types
#### CreateExamTypeRequest
|  **Campo**  | **Tipo de dato** |  **Decorador**  |                      **Justificación**                      |
|:-----------:|:----------------:|:---------------:|:-----------------------------------------------------------:|
| description |      string      |   @IsString()   | El modelo de datos establece que el campo es de tipo texto. |
| description |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.   |
### Prescriptions
#### CreatePrescriptionRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| attention_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |
#### UpdatePrescriptionRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| attention_id |      number      | @IsOptional() |        No es obligatorio en una actualización parcial.       |
| attention_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |
### Prescription_Items
#### CreatePrescriptionItemRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| prescription_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| prescription_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|  medicament_id  |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  medicament_id  |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|     quantity    |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|     quantity    |      number      |     @Min(1)     |  El modelo de datos indica que el valor debe ser mayor a 0.  |
|   indications   |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|   indications   |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|   indications   |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
#### UpdatePrescriptionItemRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| prescription_id |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
| prescription_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| prescription_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|  medicament_id  |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
|  medicament_id  |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  medicament_id  |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|     quantity    |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
|     quantity    |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|     quantity    |      number      |     @Min(1)     |  El modelo de datos indica que el valor debe ser mayor a 0.  |
|   indications   |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|   indications   |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|   indications   |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
### Prescription_Diagnoses
#### CreatePrescriptionDiagnoseRequest (DTO Compuesto)

### Referrals
#### CreateReferralRequest
|   **Campo**  | **Tipo de dato** |                                                **Decorador**                                               |                                                   **Justificación**                                                   |
|:------------:|:----------------:|:----------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------:|
| attention_id |      number      |                                                  @IsInt()                                                  |                              El modelo de datos establece que el campo es de tipo entero.                             |
| attention_id |      number      |                                                   @Min(1)                                                  |                                             El identificador mínimo es 1.                                             |
|  service_id  |      number      |                                                  @IsInt()                                                  |                              El modelo de datos establece que el campo es de tipo entero.                             |
|  service_id  |      number      |                                                   @Min(1)                                                  |                                             El identificador mínimo es 1.                                             |
|    reason    |      string      |                                                 @IsString()                                                |                              El modelo de datos establece que el campo es de tipo texto.                              |
|    reason    |      string      |                                               @MinLength(3)                                                |                                El modelo de datos indica un mínimo de 3 caracteres.                                |
|    reason    |      string      |                                               @MaxLength(200)                                              |                                 El modelo de datos indica un límite de 200 caracteres.                                |
#### UpdateReferralRequest
|   **Campo**  | **Tipo de dato** |            **Decorador**            |                       **Justificación**                      |
|:------------:|:----------------:|:-----------------------------------:|:------------------------------------------------------------:|
| attention_id |      number      |            @IsOptional()            |        No es obligatorio en una actualización parcial.       |
| attention_id |      number      |               @IsInt()              | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |               @Min(1)               |                 El identificador mínimo es 1.                |
|  service_id  |      number      |            @IsOptional()            |        No es obligatorio en una actualización parcial.       |
|  service_id  |      number      |               @IsInt()              | El modelo de datos establece que el campo es de tipo entero. |
|  service_id  |      number      |               @Min(1)               |                 El identificador mínimo es 1.                |
|    reason    |      string      |             @IsString()             |  El modelo de datos establece que el campo es de tipo texto. |
|    reason    |      string      |           @MinLength(3)             |    El modelo de datos indica un mínimo de 3 caracteres.    |
|    reason    |      string      |           @MaxLength(200)           |    El modelo de datos indica un límite de 200 caracteres.    |
### Responsible
#### CreateResponsibleRequest
|        **Campo**       |    **Tipo de dato**    |                          **Decorador**                         |                          **Justificación**                          |
|:----------------------:|:----------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------------:|
|         name           |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|         name           |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|         name           |         string         |                        @MaxLength(100)                        |          El modelo de datos indica un máximo de 100 caracteres.         |
|   paternal_surname     |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|   paternal_surname     |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|   paternal_surname     |         string         |                        @MaxLength(50)                         |          El modelo de datos indica un máximo de 50 caracteres.          |
|   maternal_surname     |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|   maternal_surname     |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|   maternal_surname     |         string         |                        @MaxLength(50)                         |          El modelo de datos indica un máximo de 50 caracteres.          |
|      relationship      |    RELATIONSHIP_TYPE   |                     @IsEnum(RELATIONSHIP_TYPE)                |         Solo acepta valores definidos en el enum RELATIONSHIP_TYPE.        |
|  relationship_other    |         string         |  @ValidateIf((o) => o.relationship === RELATIONSHIP_TYPE.OTRO) |           Solo se valida cuando relationship es 'OTRO'.          |
|  relationship_other    |         string         |                       @IsNotEmpty()                           |         Obliga a enviar el campo cuando relationship es 'OTRO'.         |
|  relationship_other    |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|  relationship_other    |         string         |                        @MaxLength(100)                        |          El modelo de datos indica un máximo de 100 caracteres.         |
|         phone          |         string         |                        @IsOptional()                          |              El modelo de datos indica que puede ser NULL.             |
|         phone          |         string         |                       @IsPhoneNumber()                        |  Se valida el número de teléfono en formato internacional con '+'.  |
|         phone          |         string         |                        @MaxLength(20)                         |          El modelo de datos indica un máximo de 20 caracteres.          |
#### UpdateResponsibleRequest
|        **Campo**       |    **Tipo de dato**    |                          **Decorador**                         |                          **Justificación**                          |
|:----------------------:|:----------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------------:|
|         name           |         string         |                        @IsOptional()                          |          No es obligatorio en una actualización parcial.         |
|         name           |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|         name           |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|         name           |         string         |                        @MaxLength(100)                        |          El modelo de datos indica un máximo de 100 caracteres.         |
|   paternal_surname     |         string         |                        @IsOptional()                          |          No es obligatorio en una actualización parcial.         |
|   paternal_surname     |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|   paternal_surname     |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|   paternal_surname     |         string         |                        @MaxLength(50)                         |          El modelo de datos indica un máximo de 50 caracteres.          |
|   maternal_surname     |         string         |                        @IsOptional()                          |          No es obligatorio en una actualización parcial.         |
|   maternal_surname     |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|   maternal_surname     |         string         |                         @MinLength(3)                         |           El modelo de datos indica un mínimo de 3 caracteres.          |
|   maternal_surname     |         string         |                        @MaxLength(50)                         |          El modelo de datos indica un máximo de 50 caracteres.          |
|      relationship      |    RELATIONSHIP_TYPE   |                        @IsOptional()                          |          No es obligatorio en una actualización parcial.         |
|      relationship      |    RELATIONSHIP_TYPE   |                     @IsEnum(RELATIONSHIP_TYPE)                |         Solo acepta valores definidos en el enum RELATIONSHIP_TYPE.        |
|  relationship_other    |         string         |  @ValidateIf((o) => o.relationship === RELATIONSHIP_TYPE.OTRO) |           Solo se valida cuando relationship es 'OTRO'.          |
|  relationship_other    |         string         |                       @IsNotEmpty()                           |         Obliga a enviar el campo cuando relationship es 'OTRO'.         |
|  relationship_other    |         string         |                          @IsString()                          |        El modelo de datos establece que el campo es de tipo texto.        |
|  relationship_other    |         string         |                        @MaxLength(100)                        |          El modelo de datos indica un máximo de 100 caracteres.         |
|         phone          |         string         |                        @IsOptional()                          |          No es obligatorio en una actualización parcial.         |
|         phone          |         string         |                       @IsPhoneNumber()                        |  Se valida el número de teléfono en formato internacional con '+'.  |
|         phone          |         string         |                        @MaxLength(20)                         |          El modelo de datos indica un máximo de 20 caracteres.          |