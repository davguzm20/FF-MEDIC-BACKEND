# Especificación de Data Transferer Objets (Dtos)

## Módulo de Autenticación

### Users
#### CreateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      role_id     |  number  |                                                                            @IsInt()                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      role_id     |  number  |                                                                           @Min(1)                                                                           |                                           En sistemas modernos los identificadores numéricos .                                           |
|       name       |  string  |                                                                          @IsString()                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        @MinLength(2)                                                                        |                                              Existen nombres que poseen solo dos caracteres.                                             |
|       name       |  string  |                                                                       @MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        @MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| paternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        @MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| maternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              @ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' })                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(3)                                                                        |                              Se recomienda un mínimo de caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     password     |  string  |                                                                          @IsString()                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        @MinLength(15)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       @MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {message: 'La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales', }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                           @IsEmail()                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       @MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |
#### UpdateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|      roleId      |  number  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      roleId      |  number  |                                                                            @IsInt()                                                                           |                                     El modelo de datos dictamina que el roleId sea un número entero.                                     |
|      roleId      |  number  |                                                                           @Min(1)                                                                           |                                           En sistemas modernos los identificadores numéricos .                                           |
|       name       |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|       name       |  string  |                                                                          @IsString()                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        @MinLength(2)                                                                        |                                              Existen nombres que poseen solo dos caracteres.                                             |
|       name       |  string  |                                                                       @MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| paternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        @MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| paternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
| maternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        @MinLength(2)                                                                        |                                                   Existen apellidos de solo dos letras.                                                  |
| maternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                              @ValidateIf((o)=>o.role_id === 2)                                                              |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' })                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(3)                                                                        |                              Se recomienda un mínimo de caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
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
|  username |  string  |                                  @ValidateIf((o)=>!o.cmp_code)                                  |    Se hace la validación solo si no se ha ingresado un código cpm.    |
|  username |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  username |  string  |                                           @IsNotEmpty()                                           |       Se valida que por lo menos se haya ingresado un caracter.       |
|  username |  string  |                                          @MaxLength(50)                                         | El modelo de datos establece el máximo de caracteres a 50.            |
|  cmp_code |  string  |                                  @ValidateIf((o)=>!o.username)                                  |     Se hace la validación solo si no se ha ingresado un username.     |
|  cmp_code |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  cmp_code |  string  | @Matches(/^\d{6}$/, { message: 'El código CMP debe contener exactamente 6 dígitos numéricos' }) | Se valida que el String posea estrictamente solo 6 dígitos numéricos. |
| password  |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  password |  string  |                                          @MinLength(15)                                         | Longitud mínima recomendada por el NIST.                              |
|  password |  string  |                                         @MaxLength(250)                                         | El modelo de datos establece el máximo de caracteres a 250.           |
### RefreshTokenRequest
| **Campo** | **Tipo** | **Decorador** |                   **Justificación**                  |
|:---------:|:--------:|:-------------:|:----------------------------------------------------:|
| new_token |  string  |    @IsString()   | Se debe validar que el dato ingresado sea un String. |
### ForgotPasswordDto
| **Campo** | **Tipo** |  **Decorador** |                         **Justificación**                         |
|:---------:|:--------:|:--------------:|:-----------------------------------------------------------------:|
|   email   |  string  |     @IsEmail()    |        Se debe validar que el dato ingresado sea un email.        |
|   email   |  string  | @MaxLength(254) | El modelo de datos dictamina que el máximo de caracteres sea 254. |
### ResetPasswordRequest
|     **Campo**    | **Tipo** |                                                                      **Decorador**                                                                     |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|   new_password   |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
|   new_password   |  string  | @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/, {message: ‘La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales’, }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|   new_password   |  string  |                                                                      @MinLength(15)                                                                     |                                                 Longitud mínima recomendada por el NIST.                                                 |
|   new_password   |  string  |                                                                     @MaxLength(250)                                                                     |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
| confirm_password |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
| confirm_password |  string  |                                         @MatchField('new_password', { message: 'Las contraseñas no coinciden' })                                        |             Confirmación de contraseña, dado que no existe un decorador especializado ya definido, se crea uno personalizado.            |
### Roles
### CreateRoleRequest
| **Campo** | **Tipo** | **Decorador** |                        **Justificación**                        |
|:---------:|:--------:|:-------------:|:---------------------------------------------------------------:|
|    name   |  string  |    @IsString()   |    Se debe validar que el dato ingresado sea de tipo String.    |
|    name   |  string  |  @MinLength(3) |     Longitud mínima aceptable para nombres de rol legibles.     |
|    name   |  string  | @MaxLength(50) | Límite de caracteres máximo establecido por el modelo de datos. |

## Módulo de Pacientes
### Patients
#### CreatePatientRequest
|     **Campo**    |    **Tipo**   |     **Decorador**     |                                    **Justificación**                                   |
|:----------------:|:-------------:|:---------------------:|:--------------------------------------------------------------------------------------:|
|   document_type  | DOCUMENT_TYPE | @IsEnum(DOCUMENT_TYPE) |     Se valida que el valor ingresado pertenezca a un tipo de documento predefinido.    |
|  document_number |     string    |  @ValidDocumentNumber()  |       Validación del número del documento según el tipo, decorador personalizado       |
|       name       |     string    |        @IsString()       |                   Se valida que el valor ingresado sea de tipo String                  |
|       name       |     string    |      @MinLength(2)     |                     Existen nombres que poseen solo dos caracteres.                    |
|       name       |     string    |     @MaxLength(100)    |              Validación de que el nombre no sobrepase los 100 caracteres.              |
| paternal_surname |     string    |        @IsString()       |               Se debe validar que el valor ingresado sea de tipo String.               |
| paternal_surname |     string    |      @MinLength(2)     |                          Existen apellidos de solo dos letras.                         |
| paternal_surname |     string    |     @MaxLength(50)     |                 El límite de caracteres establecido en la BD es de 50.                 |
| maternal_surname |     string    |        @IsString()       |               Se debe validar que el valor ingresado sea de tipo String.               |
| maternal_surname |     string    |      @MinLength(2)     |                          Existen apellidos de solo dos letras.                         |
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
|       name       |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       name       |     string    |        @IsString()       |                         Se valida que el valor ingresado sea de tipo String                         |
|       name       |     string    |      @MinLength(2)     |                           Existen nombres que poseen solo dos caracteres.                           |
|       name       |     string    |     @MaxLength(100)    |                     Validación de que el nombre no sobrepase los 100 caracteres.                    |
| paternal_surname |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| paternal_surname |     string    |        @IsString()       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| paternal_surname |     string    |      @MinLength(2)     |                                Existen apellidos de solo dos letras.                                |
| paternal_surname |     string    |     @MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
| maternal_surname |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
| maternal_surname |     string    |        @IsString()       |                      Se debe validar que el valor ingresado sea de tipo String.                     |
| maternal_surname |     string    |      @MinLength(2)     |                                Existen apellidos de solo dos letras.                                |
| maternal_surname |     string    |     @MaxLength(50)     |                        El límite de caracteres establecido en la BD es de 50.                       |
|        sex       |    SEX_TYPE   |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|        sex       |    SEX_TYPE   |    @IsEnum(SEX_TYPE)   |                  Se valida que el valor ingresado pertenezca a un sexo predefinido.                 |
|       phone      |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|       phone      |     string    |     @IsPhoneNumber()     |        Se valida el número de teléfono, sin parámetros para permitir números internacionales.       |
|       phone      |     string    |     @MaxLength(15)     |                      El modelo de datos establece el máximo de caracteres a 15.                     |
|    birth_date    |     string    |       @IsOptional()      | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    birth_date    |     string    |      @IsDateString()     |            Se valida que el texto ingresado sea una fecha y tenga el formato YYYY-MM-DD.            |
#### CreateCompletePatientRequest
|       **Campo**       |        **Tipo de dato**       |                **Decorador**               |                               **Justificación**                              |
|:---------------------:|:-----------------------------:|:------------------------------------------:|:----------------------------------------------------------------------------:|
|  CreatePatientRequest |               —               |                      —                     |        Hereda todos los campos y decoradores de CreatePatientRequest.        |
|   clinical_histories  |   CreateClinicalHistoryDto[]  |                @IsOptional()               |         Las historias clínicas son opcionales en el registro inicial.        |
|   clinical_histories  |   CreateClinicalHistoryDto[]  |                 @IsArray()                 |                  Debe ser un arreglo de historias clínicas.                  |
|   clinical_histories  |   CreateClinicalHistoryDto[]  |       @ValidateNested({ each: true })      | Valida cada elemento del arreglo con las reglas de CreateClinicalHistoryDto. |
|   clinical_histories  |   CreateClinicalHistoryDto[]  |    @Type(() => CreateClinicalHistoryDto)   |       Indica a class-transformer el tipo de cada elemento del arreglo.       |
|    family_histories   |    CreateFamilyHistoryDto[]   |                @IsOptional()               |        Las historias familiares son opcionales en el registro inicial.       |
|    family_histories   |    CreateFamilyHistoryDto[]   |                 @IsArray()                 |                 Debe ser un arreglo de historias familiares.                 |
|    family_histories   |    CreateFamilyHistoryDto[]   |       @ValidateNested({ each: true })      |  Valida cada elemento del arreglo con las reglas de CreateFamilyHistoryDto.  |
|    family_histories   |    CreateFamilyHistoryDto[]   |     @Type(() => CreateFamilyHistoryDto)    |       Indica a class-transformer el tipo de cada elemento del arreglo.       |
| gynecological_history | CreateGynecologicalHistoryDto |                @IsOptional()               |         La historia ginecológica es opcional en el registro inicial.         |
| gynecological_history | CreateGynecologicalHistoryDto |              @ValidateNested()             |       Valida el objeto con las reglas de CreateGynecologicalHistoryDto.      |
| gynecological_history | CreateGynecologicalHistoryDto | @Type(() => CreateGynecologicalHistoryDto) |                Indica a class-transformer el tipo del objeto.                |
|   allergy_histories   |   CreateAllergyHistoryDto[]   |                @IsOptional()               |       Las historias de alergias son opcionales en el registro inicial.       |
|   allergy_histories   |   CreateAllergyHistoryDto[]   |                 @IsArray()                 |                 Debe ser un arreglo de historias de alergias.                |
|   allergy_histories   |   CreateAllergyHistoryDto[]   |       @ValidateNested({ each: true })      |  Valida cada elemento del arreglo con las reglas de CreateAllergyHistoryDto. |
|   allergy_histories   |   CreateAllergyHistoryDto[]   |    @Type(() => CreateAllergyHistoryDto)    |       Indica a class-transformer el tipo de cada elemento del arreglo.       |
|     ram_histories     |     CreateRamHistoryDto[]     |                @IsOptional()               |           Las historias RAM son opcionales en el registro inicial.           |
|     ram_histories     |     CreateRamHistoryDto[]     |                 @IsArray()                 |                     Debe ser un arreglo de historias RAM.                    |
|     ram_histories     |     CreateRamHistoryDto[]     |       @ValidateNested({ each: true })      |    Valida cada elemento del arreglo con las reglas de CreateRamHistoryDto.   |
|     ram_histories     |     CreateRamHistoryDto[]     |      @Type(() => CreateRamHistoryDto)      |       Indica a class-transformer el tipo de cada elemento del arreglo.       |
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
### Signs_Symptoms
#### CreateSignSymptomRequest
|   **Campo**  | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| attention_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
| diagnosis_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| diagnosis_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
| observations |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
| observations |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
| observations |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
#### UpdateSignSymptomRequest
|   **Campo**  | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| attention_id |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
| attention_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| attention_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
| diagnosis_id |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
| diagnosis_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| diagnosis_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
| observations |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
| observations |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
| observations |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
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
|    cie_10   |      string      | @Matches(/^[A-Z]\d{2}(\.\d\|\.X)?$/) | El estándar CIE-10 exige una letra seguida de 2 dígitos, con un cuarto carácter opcional tras un punto. |
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
| diagnosis_id |      number      | @ExclusiveOrFields('reason', { message: 'Solo debe enviarse diagnosis_id o reason, no ambos ni ninguno' }) | El modelo de datos establece que diagnosis_id y reason son mutuamente excluyentes y al menos uno debe estar presente. |
| diagnosis_id |      number      |                                        @ValidateIf((o) => !o.reason)                                       |                                     Solo se valida cuando reason no está presente.                                    |
| diagnosis_id |      number      |                                                  @IsInt()                                                  |                              El modelo de datos establece que el campo es de tipo entero.                             |
| diagnosis_id |      number      |                                                   @Min(1)                                                  |                                             El identificador mínimo es 1.                                             |
|    reason    |      string      |                                     @ValidateIf((o) => !o.diagnosis_id)                                    |                                  Solo se valida cuando diagnosis_id no está presente.                                 |
|    reason    |      string      |                                                 @IsString()                                                |                              El modelo de datos establece que el campo es de tipo texto.                              |
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
| diagnosis_id |      number      |    @ValidateIf((o) => !o.reason)    |        Solo se valida cuando reason no está presente.        |
| diagnosis_id |      number      |            @IsOptional()            |        No es obligatorio en una actualización parcial.       |
| diagnosis_id |      number      |               @IsInt()              | El modelo de datos establece que el campo es de tipo entero. |
| diagnosis_id |      number      |               @Min(1)               |                 El identificador mínimo es 1.                |
|    reason    |      string      | @ValidateIf((o) => !o.diagnosis_id) |     Solo se valida cuando diagnosis_id no está presente.     |
|    reason    |      string      |            @IsOptional()            |        No es obligatorio en una actualización parcial.       |
|    reason    |      string      |             @IsString()             |  El modelo de datos establece que el campo es de tipo texto. |
|    reason    |      string      |           @MaxLength(200)           |    El modelo de datos indica un límite de 200 caracteres.    |