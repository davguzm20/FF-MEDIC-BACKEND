# Especificación de Data Transferer Objets (Dtos)

## Módulo de Autenticación

### Users
#### CreateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|       role       |  USER_ROLE  |                                                                @IsEnum(USER_ROLE)                                                                |           El modelo de datos dictamina que el rol sea un valor del enum USER_ROLE (ADMIN o DOCTOR).            |
|       name       |  string  |                                                                          @IsString()                                                                          |                                            Se debe validar que el nombre sea del tipo String.                                            |
|       name       |  string  |                                                                        @MinLength(3)                                                                        |                                              Mínimo aceptable de caracteres para legibilidad.                                             |
|       name       |  string  |                                                                       @MaxLength(100)                                                                       |                                       Validación de que el nombre no sobrepase los 100 caracteres.                                       |
| paternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| paternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| paternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
| maternal_surname |  string  |                                                                          @IsString()                                                                          |                                        Se debe validar que el valor ingresado sea de tipo String.                                        |
| maternal_surname |  string  |                                                                        @MinLength(3)                                                                        |                                                   Existen apellidos de solo tres letras.                                                  |
| maternal_surname |  string  |                                                                        @MaxLength(50)                                                                       |                                          El límite de caracteres establecido en la BD es de 50.                                          |
|     cmp_code     |  string  |                                                          @ValidateIf((o)=>o.role === USER_ROLE.DOCTOR)                                                          |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
| cmp_code | string | @MaxLength(10) | La base de datos establece el máximo de caracteres a 10. |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/)                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(6)                                                                        |                              Se recomienda un mínimo de 6 caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     username     |  string  |                                                                        @Matches(/^{a-zA-Z0-9_}+$/)                                                                       |                                        Validación de caracteres ingresados en el username.                                        |
|     password     |  string  |                                                                          @IsString()                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        @MinLength(12)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       @MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                           @IsEmail()                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       @MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |
#### UpdateUserRequest
|     **Campo**    | **Tipo** |                                                                        **Decorador**                                                                       |                                                             **Justificación**                                                            |
|:----------------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
|       role       |  USER_ROLE  |   @IsOptional()   |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|       role       |  USER_ROLE  | @IsEnum(USER_ROLE)  |                                     El modelo de datos dictamina que el rol sea un valor del enum USER_ROLE.                                     |
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
|     cmp_code     |  string  |                                                   @ValidateIf((o)=>o.role === USER_ROLE.DOCTOR)                                                   |                                  Se debe validar el cmp_code solo si el usuario posee el rol de médico.                                  |
|     cmp_code     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     cmp_code     |  string  |                                                                          @IsString()                                                                          |                                           Se valida que el valor ingresado sea de tipo String.                                           |
|   cmp_code    | string | @MaxLength(10) | La base de datos establece el máximo de caracteres a 10. |
|     cmp_code     |  string  |                               @Matches(/^\d{6}$/)                              |                                   Se valida que el String posea estrictamente solo 6 dígitos numéricos.                                  |
|     username     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     username     |  string  |                                                                          @IsString()                                                                          |                                        Es un estándar manejar los nombres de usuario como String.                                        |
|     username     |  string  |                                                                        @MinLength(6)                                                                        |                              Se recomienda un mínimo de 6 caracteres para evitar nombres de usuario ilegibles.                             |
|     username     |  string  |                                                                        @MaxLength(50)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 50.                                        |
|     username     |  string  |                                                                        @Matches(/^{a-zA-Z0-9_}+$/)                                                                       |                                        Validación de caracteres ingresados en el username.                                       |
|     password     |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|     password     |  string  |                                                                          @IsString()                                                                          |                                    Es un estándar guardas las contraseñas como un tipo de dato String.                                   |
|     password     |  string  |                                                                        @MinLength(12)                                                                       |                                                 Longitud mínima recomendada por el NIST.                                                 |
|     password     |  string  |                                                                       @MaxLength(250)                                                                       |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|     password     |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {message: 'La contraseña debe tener mayúsculas, minúsculas, números y caracteres especiales', }) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
|      email       |  string  |                                                                         @IsOptional()                                                                         |                    Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar.                   |
|      email       |  string  |                                                                           @IsEmail()                                                                          |                          Se valida que el String contenga características de un email (local@dominio.extension).                         |
|       email      |  string  |                                                                       @MaxLength(254)                                                                       |                                   El modelo de datos dictamina que el máximo de caracteres sea de 254.                                   |

#### UserResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| user_id | number |
| name | string |
| paternal_surname | string |
| maternal_surname | string |
| cmp_code | string - null |
| username | string |
| email | string |
| role | USER_ROLE |
| created_at | date |
| updated_at | date |


### LoginRequest
| **Campo** | **Tipo** |                                          **Decorador**                                         |                           **Justificación**                           |
|:---------:|:--------:|:----------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------:|
|  username |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  username |  string  |                                           @MinLength(6)                                           |       Se valida que por lo menos se hayan ingresado 6 caracteres.       |
|  username |  string  |                                          @MaxLength(50)                                         | El modelo de datos establece el máximo de caracteres a 50.            |
| password  |  string  |                                            @IsString()                                            |          Se valida que el valor ingresado sea de tipo String.         |
|  password |  string  |                                          @MinLength(12)                                         | Longitud mínima recomendada por el NIST.                              |
|  password |  string  |                                         @MaxLength(250)                                         | El modelo de datos establece el máximo de caracteres a 250.           |
### LoginResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| access_token | string |
| refresh_token | string |
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
|   code   |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
| code | string | @Length(8,8) | Se valida que el código ingresado tenga exactamente 8 caracteres.
|   new_password   |  string  |                                                                        @IsString()                                                                        |                                           Se debe validar que el dato ingresado sea un String.                                           |
|   new_password   |  string  |                                                                      @MinLength(12)                                                                     |                                                 Longitud mínima recomendada por el NIST.                                                 |
|   new_password   |  string  |                                                                     @MaxLength(250)                                                                     |                                        El modelo de datos establece el máximo de caracteres a 250.                                       |
|   new_password   |  string  | @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) | Se concluyó que las contraseñas deben contener por lo menos una letra minúscula, una mayúscula, un número entero y un caracter especial. |
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
|    name   |  string  |   @IsOptional()  | Establece que las validaciones se den siempre y cuando se haya brindado algún valor para modificar. |
|    name   |  string  |    @IsString()   |                      Se debe validar que el dato ingresado sea de tipo String.                      |
|    name   |  string  |  @MinLength(3) |                       Longitud mínima aceptable para nombres de rol legibles.                       |
|    name   |  string  | @MaxLength(50) |                   Límite de caracteres máximo establecido por el modelo de datos.                   |

#### RoleResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| role_id | number |
| name | string |
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

#### PatientResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| patient_id | number |
| document_type |  DOCUMENT_TYPE |
| document_number | string |
| name | string |
| paternal_surname | string |
| maternal_surname | string |
| sex | SEX_TYPE |
| phone | string - null |
| birth_date | date | 
| created_at | date |
| updated_at | date |

#### PatientHistoriesResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| patient_id | number |
| document_type |  DOCUMENT_TYPE |
| document_number | string |
| name | string |
| paternal_surname | string |
| maternal_surname | string |
| sex | SEX_TYPE |
| phone | string - null |
| birth_date | date | 
| created_at | date |
| updated_at | date |
| clinical_histories | ClinicalHistoryResponse[] |
| family_histories | FamilyHistoryResponse[] |
| gynecological_history | GynecologicalHistoryResponse - null |
| allergy_histories | AllergyHistoryResponse[] |
| ram_histories | RamHistoryResponse[] |

#### PatientListResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| patient_id | number |
| document_number | string |
| name | string |
| paternal_surname | string |
| maternal_surname | string |
| sex | SEX_TYPE |
| phone | string - null |
| birth_date | date | 

### Clinical_Histories
#### CreateClinicalHistoryRequest
|    **Campo**   | **Tipo de dato** |     **Decorador**     |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |        @IsInt()       |       El modelo de datos dictamina que debe ser un entero.      |
|   patient_id   |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|  diagnosis_id  |      number      |     @IsOptional()     |      El modelo de datos indica que el campo puede ser NULL.     |
|  diagnosis_id  |      number      |        @IsInt()       |       El modelo de datos dictamina que debe ser un entero.      |
|  diagnosis_id  |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|      type      |   HISTORY_TYPE   | @IsEnum(HISTORY_TYPE) | El modelo de datos solo acepta valores PATOLOGICO, QUIRURGICO o ALERGIA. |
| specifications |      string      |     @IsOptional()     |                Se concluyó que un campo opcional.               |
| specifications |      string      |      @IsString()      |       El modelo de datos dictamina que debe ser un string.      |
| specifications |      string      |    @MaxLength(200)    |   El modelo de datos establece un límite de caracteres de 200.  |
#### UpdateClinicalHistoryRequest
|    **Campo**   | **Tipo de dato** |     **Decorador**     |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------------:|:---------------------------------------------------------------:|
| clinical_history_id | number | @IsInt() | Identificador único en la base de datos. |
| clinical_history_id | number | @Min(1) | El valor mínimo establecido por el modelo de datos es 1. |
|  diagnosis_id  |      number      |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
|  diagnosis_id  |      number      |        @IsInt()       |           El modelo de datos establece el mínimo a 1.           |
|  diagnosis_id  |      number      |        @Min(1)        |           El modelo de datos establece el mínimo a 1.           |
|      type      |   HISTORY_TYPE   | @IsEnum(HISTORY_TYPE) | El modelo de datos solo acepta valores PATOLOGICO, QUIRURGICO o ALERGIA. |
| specifications |      string      |     @IsOptional()     |          No es obligatorio en una actualización parcial         |
| specifications |      string      |      @IsString()      |       El modelo de datos dictamina que debe ser un string.      |
| specifications |      string      |    @MaxLength(200)    |   El modelo de datos establece un límite de caracteres de 200.  |

#### ClinicalHistoryResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| clinical_history_id | number |
| patient_id | number |
| diagnosis_id | number - null |
| type | HISTORY_TYPE |
| specifications | string - null |
| diagnosis | {cie10: string, description: string } |
| created_at | date |
| updated_at | date |

### Family_Histories
#### CreateFamilyHistoryRequest
|    **Campo**   | **Tipo de dato** |                  **Decorador**                  |                           **Justificación**                          |
|:--------------:|:----------------:|:-----------------------------------------------:|:--------------------------------------------------------------------:|
|   patient_id   |      number      |                     @IsInt()                    |         El modelo de datos dictamina que debe ser un entero.         |
|   patient_id   |      number      |                     @Min(1)                     |              El modelo de datos establece el mínimo a 1.             |
|      type      |    FAMILY_TYPE   |               @IsEnum(FAMILY_TYPE)              | Validar el ingreso solo de valores definidos en el enum FAMILY_TYPE. |
|      other     |      string      | @ValidateIf((o: CreateFamilyHistoryRequest) => o.type === RelationshipType.OTRO) |             Solo se valida cuando el campo type tiene el valor 'OTRO'.             |
| other | string | @IsNotEmpty() | Se valida que el campo no sea nulo.
|      other     |      string      |                   @IsString()                   |         El modelo de datos dictamina que debe ser un string.         |
|      other     |      string      |                 @MaxLength(100)                 |   El modelo de datos establece la longitud máxima a 100 caracteres.  |
|     status     |   FAMILY_STATUS  |              @IsEnum(FAMILY_STATUS)             |                 Solo acepta valores VIVO o FALLECIDO.                |
| specifications |      string      |                  @IsOptional()                  |                 Se concluyó que es un campo opcional.                |
| specifications |      string      |                   @IsString()                   |         El modelo de datos dictamina que debe ser un string.         |
| specifications |      string      |                 @MaxLength(200)                 |   El modelo de datos establece la longitud máxima a 200 caracteres.  |
#### UpdateFamilyHistoryRequest
|    **Campo**   | **Tipo de dato** |                  **Decorador**                  |                                 **Justificación**                                |
|:--------------:|:----------------:|:-----------------------------------------------:|:--------------------------------------------------------------------------------:|
| family_history_id | number | @IsOptional() | No es obligatorio en una actualización parcial. |
| family_history_id | number | @IsInt() | El modelo de datos dictamina que debe ser un entero. |
| familty_history_id | number | @Min(1) | El modelo de datos establece el mínimo de caracteres a 1. |
|   patient_id   |      number      |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|   patient_id   |      number      |                     @IsInt()                    |               El modelo de datos dictamina que debe ser un entero.               |
|   patient_id   |      number      |                     @Min(1)                     |                    El modelo de datos establece el mínimo a 1.                   |
|      type      |    FAMILY_TYPE   |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|      type      |    FAMILY_TYPE   |               @IsEnum(FAMILY_TYPE)              |       Validar el ingreso solo de valores definidos en el enum FAMILY_TYPE.       |
|      other     |      string      | @ValidateIf((o: UpdateFamilyHistoryRequest) => o.type === RelationshipType.OTRO) |            Solo se valida cuando el campo type tiene el valor 'OTRO'.            |
|      other     |      string      |                  @IsNotEmpty()                  | Obliga a enviar el campo 'other' cuando el valor del campo type cambia a 'OTRO'. |
|      other     |      string      |                   @IsString()                   |               El modelo de datos dictamina que debe ser un string.               |
|      other     |      string      |                 @MaxLength(100)                 |         El modelo de datos establece la longitud máxima a 100 caracteres.        |
|     status     |   FAMILY_STATUS  |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
|     status     |   FAMILY_STATUS  |              @IsEnum(FAMILY_STATUS)             |                       Solo acepta valores VIVO o FALLECIDO.                      |
| specifications |      string      |                  @IsOptional()                  |                  No es obligatorio en una actualización parcial.                 |
| specifications |      string      |                   @IsString()                   |                       Solo acepta valores VIVO o FALLECIDO.                      |
| specifications |      string      |                 @MaxLength(200)                 |         El modelo de datos establece la longitud máxima a 200 caracteres.        |

#### FamilyHistoryResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| family_history_id | number |
| patient_id | number |
| type | RELATIONSHIP_TYPE |
| other | string - null |
| status | FAMILY_STATUS |
| specifications | string - null |
| created_at | date |
| updated_at | date |

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
| contraceptive_method_other |     string      | @ValidateIf((o: CreateGynecologicalHistoryRequest) => o.contraceptiveMethod === ContraceptiveMethod.OTRO) |  Solo se valida cuando el valor del campo contraceptive_method es 'OTRO'.  |
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
|     orientation_other |        string        |         @ValidateIf((o: CreateGynecologicalHistoryRequest) => o.orientation === OrientationType.OTRO)       |          Solo se valida cuando el valor del campo orientation es 'OTRO'.          |
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
| gynecological_history_id | number | @IsOptional() | Identificador único en la base de datos. |
| gynecological_history_id | number | @IsInt() | El modelo de datos dictamina que debe ser un entero. |
| gynecological_history_id | number | @Min(1) | El modelo de datos establece que el mínimo valor debe ser 1. |
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
|     orientation_other |        string        |         @ValidateIf((o: UpdateGynecologicalHistoryRequest) => o.orientation === OrientationType.OTRO)       |           Solo se valida cuando el valor del campo orientation es 'OTRO'.           |
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

#### GynecologicalHistoryResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| gynecological_history_id | number|
| patient_id | number - null |
| menarche | number - null |
| menstrual_cycle | string - null |
| last_menstrual_period | date - null |
| contraceptive_method | CONTRACEPTIVE_METHOD - null |
| contraceptive_method_other | string - null |
| gestations | number - null |
| term_births | number - null |
| preterm_births | number - null |
| abortions | number - null |
| living_children | number - null |
| orientation | ORIENTATION_TYPE - null |
| orientation_other | string - null |
| sexual_partners | number - null |
| isa | string - null |
| lsa | string - null |
| created_at | date |
| updated_at | date |

### Allergy_Histories
#### CreateAllergyHistoryRequest
|    **Campo**   | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|   patient_id   |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|   patient_id   |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
| specifications |      string      |    @IsString()  |        El modelo de datos indica que debe ser un string.        |
| specifications |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
#### UpdateAllergyHistoryRequest
|    **Campo**   | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
| allergy_history_id | number | @IsInt() | Identificador único en la base de datos. |
| allergy_history_id | number | @Min(1) | El mínimo valor debe ser 1 según el modelo de datos. |
| specifications |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
| specifications |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |

#### AllergyHistoryResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| allergy_history_id | number |
| patient_id | number |
| specifications | string - null |
| created_at | date |
| updated_at | date | 

### Ram_Histories
#### CreateRamHistoryRequest
|       **Campo**      | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
|      patient_id      |      number      |     @IsInt()    |        El modelo de datos indica que debe ser un entero.        |
|      patient_id      |      number      |     @Min(1)     | El modelo de datos establece que el identificador mínimo sea 1. |
|    specifications    |      string      |    @IsString()  |        El modelo de datos indica que debe ser un string.        |
|    specifications    |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |
#### UpdateRamHistoryRequest
|       **Campo**      | **Tipo de dato** |  **Decorador**  |                        **Justificación**                        |
|:--------------------:|:----------------:|:---------------:|:---------------------------------------------------------------:|
| ram_history_id | number | @IsInt() | Identificador único en la base de datos. |
| ram_history_id | number | @Min(1) | El valor mínimo establecido por el modelo de datos es 1. |
|    specifications    |      string      |   @IsString()   |        El modelo de datos indica que debe ser un string.        |
|    specifications    |      string      | @MaxLength(200) |      El modelo de datos indica un límite de 200 caracteres.     |

#### RamHistoryResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| ram_history_id | number |
| patient_id | number |
| specifications | string - null |
| created_at | date |
| updated_at | date |

## Módulo de Medicamentos
### Active_Ingredients
#### CreateActiveIngredientRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### UpdateActiveIngredientRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsOptional()   |  No es obligatorio en una actualización parcial.  |
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### ActiveIngredientResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| active_ingredient_id | number |
| name | string |

### Manufacturers
#### CreateManufacturerRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### UpdateManufacturerRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsOptional()   |  No es obligatorio en una actualización parcial.  |
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### ManufacturerResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| manufacturer_id | number |
| name | string |

### Dosage_Forms
#### CreateDosageFormRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### UpdateDosageFormRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                    **Justificación**                   |
|:---------:|:----------------:|:---------------:|:------------------------------------------------------:|
|    name   |      string      |   @IsOptional()   |  No es obligatorio en una actualización parcial.  |
|    name   |      string      |   @IsString()   |  El modelo de datos dictamina que debe ser un string.  |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) | El modelo de datos indica un límite de 100 caracteres. |

#### DosageFormResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| dosage_form_id | number |
| name | string |

### Medicaments
#### CreateMedicamentRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
|       name      |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|       name      |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.    |
| manufacturer_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| manufacturer_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |
|  concentration  |      string      |   @IsOptional() |        El campo es opcional ya que no todos los medicamentos tienen concentración.       |
|  concentration  |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|  concentration  |      string      |  @MaxLength(50) |     El modelo de datos indica un límite de 50 caracteres.    |
|  dosage_form_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  dosage_form_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |

#### UpdateMedicamentRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| name | string | @IsOptional() | No es obligatorio en una actualización parcial. |
|       name      |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
| name | string | @MinLength(3) | Mínimo de caracteres aceptable para legibilidad. |
|       name      |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.    |
| manufacturer_id | number | @IsOptional() | No es obligatorio en una actualización parcial. |
| manufacturer_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| manufacturer_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |
|  concentration  |      string      |   @IsOptional() |        El campo es opcional ya que no todos los medicamentos tienen concentración.       |
|  concentration  |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|  concentration  |      string      |  @MaxLength(50) |     El modelo de datos indica un límite de 50 caracteres.    |
| dosage_form_id | number | @IsOptional() | No es obligatorio en una actualización parcial. |
|  dosage_form_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  dosage_form_id |      number      |     @Min(1)     |       El identificador mínimo en la base de datos es 1.      |

#### MedicamentResponse
| **Campo** | **Tipo**|
|:---------:|:-------:|
|  medicament_id | number |
|  name | string |
|  manufacturer_id | number |
|  concentration | string - null |
|  dosage_form_id | number |
|  manufacturer | { manufacturer_id: number; name: string } |
|  dosage_form | { dosage_form_id: number; name: string } |
|  active_ingredients | { active_ingredient_id: number; name: string }[] |

#### CreateCompleteMedicamentRequest
|       **Campo**       | **Tipo de dato** |      **Decorador**      |                            **Justificación**                            |
|:---------------------:|:----------------:|:-----------------------:|:-----------------------------------------------------------------------:|
|  CreateMedicamentRequest  |         —        |            —            |      Hereda todos los campos y decoradores de CreateMedicamentRequest.      |
| active_ingredient_ids |     number[]     |        @IsArray()       |                 Debe ser un arreglo de identificadores.                 |
| active_ingredient_ids |     number[]     |  @IsInt({ each: true }) | El modelo de datos establece que cada elemento debe ser de tipo entero. |
| active_ingredient_ids |     number[]     | @Min(1, { each: true }) |              El identificador mínimo de cada elemento es 1.             |

#### UpdateCompleteMedicamentRequest
|       **Campo**       | **Tipo de dato** |      **Decorador**      |                            **Justificación**                            |
|:---------------------:|:----------------:|:-----------------------:|:-----------------------------------------------------------------------:|
|  CreateMedicamentRequest  |         —        |            —            |      Hereda todos los campos y decoradores de CreateMedicamentRequest.      |
| active_ingredient_ids |     number[]     |        @IsOptional()       | No es obligatorio en una actualización parcial. |  
| active_ingredient_ids |     number[]     |        @IsArray()       |                 Debe ser un arreglo de identificadores.                 |
| active_ingredient_ids |     number[]     |  @IsInt({ each: true }) | El modelo de datos establece que cada elemento debe ser de tipo entero. |
| active_ingredient_ids |     number[]     | @Min(1, { each: true }) |              El identificador mínimo de cada elemento debe ser 1.             |

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
| illness_duration | string | @MinLength(3) | El modelo de datos establece el mínimo de caracteres a 3. |
| illness_duration |      string      |    @MaxLength(50)    |                  El modelo de datos indica un límite de 50 caracteres.                  |
|    onset_type    |    ONSET_TYPE    |  @IsEnum(ONSET_TYPE) |   El modelo de datos indica que el campo solo acepta los valores definidos en el enum.  |
|      course      |    COURSE_TYPE   | @IsEnum(COURSE_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|  current_disease |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
| current_disease | string | @MinLength(3) | Valor mínimo aceptable para legibilidad. |
|     work_plan    |      string      |     @IsOptional()    |                   El modelo de datos indica que el campo es nullable.                   |
|     work_plan    |      string      |      @IsString()     |               El modelo de datos dictamina que el campo es de tipo texto.               |
| work_plan | string | @MinLength(3) | Valor mínimo aceptable para legibilidad. |
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
| illness_duration | string | @MinLength(3) | El modelo de datos establece el mínimo de caracteres a 3. |
| illness_duration |      string      |    @MaxLength(50)    |                  El modelo de datos indica un límite de 50 caracteres.                  |
|    onset_type    |    ONSET_TYPE    |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|    onset_type    |    ONSET_TYPE    |  @IsEnum(ONSET_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|      course      |    COURSE_TYPE   |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|      course      |    COURSE_TYPE   | @IsEnum(COURSE_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|  current_disease |      string      |     @IsOptional()    |                     No es obligatorio en una actualización parcial.                     |
|  current_disease |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
| current_disease | string | @MinLength(3) | Mínimo valor viable para legibilidad. |
|     work_plan    |      string      |     @IsOptional()    |                   El modelo de datos indica que el campo es nullable.                   |
|     work_plan    |      string      |      @IsString()     |               El modelo de datos establece que el campo es de tipo texto.               |
| work_plan | string | @MinLength(3) | Mínimo valor viable para legibilidad. |

#### AttentionResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  attention_id | number |
|  patient_id | number |
|  service_id | number |
|  illness_duration | string |
|  onset_type | ONSET_TYPE |
|  course | COURSE_TYPE |
|  current_disease | string |
|  work_plan | string - null |
|  created_at | date |
|  updated_at | date |

#### CreateCompleteAttentionRequest
|         **Campo**         |           **Tipo de dato**          |                  **Decorador**                 |                                   **Justificación**                                   |
|:-------------------------:|:-----------------------------------:|:----------------------------------------------:|:-------------------------------------------------------------------------------------:|
| CreateAttentionRequest |                  —                  |                        —                       |            Hereda todos los campos y decoradores de CreateAttentionRequest.           |
| clinical_histories | CreateClinicalHistoryRequest[] | @IsOptional() | No es obligatorio en el registro de una atención. |
| clinical_histories | CreateClinicalHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| clinical_histories | CreateClinicalHistoryRequest[] | @ValidateNested({each: true}) | Valida el objeto con las reglas de CreateClinicalHistoryRequest. |
| clinical_histories | CreateClinicalHistoryRequest[] | @Type(() => CreateClinicalHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| family_histories | CreateFamilyHistoryRequest[] | @IsOptional() | No es obligatorio en el registro de una atención. |
| family_histories | CreateFamiltyHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| family_histories | CreateFamilyHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateFamilyHistoryRequest. |
| family_histories | CreateFamilyHistoryRequest[] | @Type(() => CreateFamilyHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| gynecological_history | CreateGynecologicalHistoryRequest | @IsOptional() | No es obligatorio en el registro de una atención. |
| gynecological_history | CreateGynecologicalHistoryRequest | @ValidateNested() | Valida el objeto con las reglas de CreateGynecologicalHistoryRequest. |
| gynecological_history | CreateGynecologicalHistoryRequest | @Type(() => CreateGynecologicalHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| allergy_histories | CreateAllergyHistoryRequest[] | @IsOptional() | No es obligatorio en el registro de una atención. |
| allergy_histories | CreateAllergyHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| allergy_histories | CreateAllergyHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateAllergyHistoryRequest. |
| allergy_histories | CreateAllergyHistoryRequest[] | @Type(() => CreateAllergyHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| ram_histories | CreateRamHistoryRequest[] | @IsOptional() | No es obligatorio en el registro de una atención. |
| ram_histories | CreateRamHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| ram_histories | CreateRamHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateRamHistoryRequest. |
| ram_histories | CreateRamHistoryRequest[] | @Type(() => CreateRamHistoryRequest) | Indica a class-transformer el tipo del objeto. |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |                   @IsArray()                   |                          Debe ser un arreglo de diagnósticos.                         |
| attention_diagnoses | CreateAttentionDiagnosisRequest[] | @ArrayMinSize(1) | Es obligatorio que se registre mínimo un diagnóstico. |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |         @ValidateNested({ each: true })        |  Valida cada elemento del arreglo con las reglas de CreateAttentionDiagnosisRequest.  |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |  @Type(() => CreateAttentionDiagnosisRequest)  |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|       health_metrics      |      CreateHealthMetricRequest      |                @IsOptional()               |             No es obligatorio en el registro de una atención clínica.             |
|       health_metrics      |      CreateHealthMetricRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreateHealthMetricRequest.             |
|       health_metrics      |      CreateHealthMetricRequest      |     @Type(() => CreateHealthMetricRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
| bio_functions | CreateBioFunctionRequest[] | @IsArray() | Se pueden registrar varios tipos de funciones biológicas. |
| bio_functions | CreateBioFunctionRequest[] | @ArrayMinSize(7) | Se deben registrar todos los tipos de bio_functions. |
| bio_functions | CreateBioFunctionRequest[] | @ValidateNested({ each: true }) | Valida el objeto con las reglas de CreateBioFunctionRequest. |
| bio_functions | CreateBioFunctionRequest[] | @Type(() => CreateBioFunctionRequest) | Indica a class-transformer el tipo del objeto.|
| physical_exams | CreatePhysicalExamRequest[] | @IsArray() | Se pueden registrar varios tipos de exámenes físicos. |
| physical_exams | CreatePhysicalExamRequest[] | @ArrayMinSize(10) | Se deben registrar todos los sistemas obligatorios. |
| physical_exams | CreatePhysicalExamRequest[] | @ValidateNested({ each: true }) | Valida el objeto con las reglas de CreatePhysicalExamRequest. |
| physical_exams | CreatePhysicalExamRequest[] | @Type(() => CreatePhysicalExamRequest) |Indica a class-transformer el tipo del objeto. |
|           exams           |     CreateCompleteExamRequest[]     |                  @IsOptional()                 |              Las órdenes de examen son opcionales al crear una atención.              |
|           exams           |     CreateCompleteExamRequest[]     |                   @IsArray()                   |                       Debe ser un arreglo de órdenes de examen.                       |
|           exams           |     CreateCompleteExamRequest[]     |         @ValidateNested({ each: true })        |     Valida cada elemento del arreglo con las reglas de CreateCompleteExamRequest.     |
|           exams           |     CreateCompleteExamRequest[]     |     @Type(() => CreateCompleteExamRequest)     |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                  @IsOptional()                 |                Las prescripciones son opcionales al crear una atención.               |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                   @IsArray()                   |                         Debe ser un arreglo de prescripciones.                        |
|       prescriptions       | CreateCompletePrescriptionRequest[] |         @ValidateNested({ each: true })        | Valida cada elemento del arreglo con las reglas de CreateCompletePrescriptionRequest. |
|       prescriptions       | CreateCompletePrescriptionRequest[] | @Type(() => CreateCompletePrescriptionRequest) |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|         referrals         |       CreateReferralRequest[]       |                  @IsOptional()                 |                 Las referencias son opcionales al crear una atención.                 |
|         referrals         |       CreateReferralRequest[]       |                   @IsArray()                   |                          Debe ser un arreglo de referencias.                          |
|         referrals         |       CreateReferralRequest[]       |         @ValidateNested({ each: true })        |       Valida cada elemento del arreglo con las reglas de CreateReferralRequest.       |
|         referrals         |       CreateReferralRequest[]       |       @Type(() => CreateReferralRequest)       |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|        responsible        |       CreateResponsibleRequest      |                  @IsOptional()                 |           El responsable es opcional al crear una atención.           |
|        responsible        |       CreateResponsibleRequest      |               @ValidateNested()                |             Valida el objeto con las reglas de CreateResponsibleRequest.             |
|        responsible        |       CreateResponsibleRequest      |      @Type(() => CreateResponsibleRequest)     |            Indica a class-transformer el tipo del objeto.           |

#### UpdateCompleteAttentionRequest
|         **Campo**         |           **Tipo de dato**          |                  **Decorador**                 |                                   **Justificación**                                   |
|:-------------------------:|:-----------------------------------:|:----------------------------------------------:|:-------------------------------------------------------------------------------------:|
| CreateAttentionRequest |                  —                  |                        —                       |            Hereda todos los campos y decoradores de CreateAttentionRequest.           |
| clinical_histories | CreateClinicalHistoryRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| clinical_histories | CreateClinicalHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| clinical_histories | CreateClinicalHistoryRequest[] | @ValidateNested({each: true}) | Valida el objeto con las reglas de CreateClinicalHistoryRequest. |
| clinical_histories | CreateClinicalHistoryRequest[] | @Type(() => CreateClinicalHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| family_histories | CreateFamilyHistoryRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| family_histories | CreateFamiltyHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| family_histories | CreateFamilyHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateFamilyHistoryRequest. |
| family_histories | CreateFamilyHistoryRequest[] | @Type(() => CreateFamilyHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| gynecological_history | CreateGynecologicalHistoryRequest | @IsOptional() | No es obligatorio en una actualización parcial. |
| gynecological_history | CreateGynecologicalHistoryRequest | @ValidateNested() | Valida el objeto con las reglas de CreateGynecologicalHistoryRequest. |
| gynecological_history | CreateGynecologicalHistoryRequest | @Type(() => CreateGynecologicalHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| allergy_histories | CreateAllergyHistoryRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| allergy_histories | CreateAllergyHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| allergy_histories | CreateAllergyHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateAllergyHistoryRequest. |
| allergy_histories | CreateAllergyHistoryRequest[] | @Type(() => CreateAllergyHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| ram_histories | CreateRamHistoryRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| ram_histories | CreateRamHistoryRequest[] | @IsArray() | Se pueden registrar varias historias de este tipo en una sola atención. |
| ram_histories | CreateRamHistoryRequest[] | @ValidateNested({each:true}) | Valida el objeto con las reglas de CreateRamHistoryRequest. |
| ram_histories | CreateRamHistoryRequest[] | @Type(() => CreateRamHistoryRequest) | Indica a class-transformer el tipo del objeto. |
| attention_diagnoses | CreateAttentionDiagnosisRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |                   @IsArray()                   |                          Debe ser un arreglo de diagnósticos.                         |
| attention_diagnoses | CreateAttentionDiagnosisRequest[] | @ArrayMinSize(1) | Es obligatorio que se registre mínimo un diagnóstico. |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |         @ValidateNested({ each: true })        |  Valida cada elemento del arreglo con las reglas de CreateAttentionDiagnosisRequest.  |
|    attention_diagnoses    |  CreateAttentionDiagnosisRequest[]  |  @Type(() => CreateAttentionDiagnosisRequest)  |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|       health_metrics      |      CreateHealthMetricRequest      |                @IsOptional()               |             No es obligatorio en una actualización parcial.             |
|       health_metrics      |      CreateHealthMetricRequest      |                @ValidateNested()               |             Valida el objeto con las reglas de CreateHealthMetricRequest.             |
|       health_metrics      |      CreateHealthMetricRequest      |     @Type(() => CreateHealthMetricRequest)     |                     Indica a class-transformer el tipo del objeto.                    |
| bio_functions | CreateBioFunctionRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| bio_functions | CreateBioFunctionRequest[] | @IsArray() | Se pueden registrar varios tipos de funciones biológicas. |
| bio_functions | CreateBioFunctionRequest[] | @ArrayMinSize(7) | Se deben registrar todos los tipos de bio_functions. |
| bio_functions | CreateBioFunctionRequest[] | @ValidateNested({ each: true }) | Valida el objeto con las reglas de CreateBioFunctionRequest. |
| bio_functions | CreateBioFunctionRequest[] | @Type(() => CreateBioFunctionRequest) | Indica a class-transformer el tipo del objeto.|
| physical_exams | CreatePhysicalExamRequest[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| physical_exams | CreatePhysicalExamRequest[] | @IsArray() | Se pueden registrar varios tipos de exámenes físicos. |
| physical_exams | CreatePhysicalExamRequest[] | @ArrayMinSize(10) | Se deben registrar todos los sistemas obligatorios. |
| physical_exams | CreatePhysicalExamRequest[] | @ValidateNested({ each: true }) | Valida el objeto con las reglas de CreatePhysicalExamRequest. |
| physical_exams | CreatePhysicalExamRequest[] | @Type(() => CreatePhysicalExamRequest) |Indica a class-transformer el tipo del objeto. |
|           exams           |     CreateCompleteExamRequest[]     |                  @IsOptional()                 |              No es obligatorio en una actualización parcial.              |
|           exams           |     CreateCompleteExamRequest[]     |                   @IsArray()                   |                       Debe ser un arreglo de órdenes de examen.                       |
|           exams           |     CreateCompleteExamRequest[]     |         @ValidateNested({ each: true })        |     Valida cada elemento del arreglo con las reglas de CreateCompleteExamRequest.     |
|           exams           |     CreateCompleteExamRequest[]     |     @Type(() => CreateCompleteExamRequest)     |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                  @IsOptional()                 |                No es obligatorio en una actualización parcial.               |
|       prescriptions       | CreateCompletePrescriptionRequest[] |                   @IsArray()                   |                         Debe ser un arreglo de prescripciones.                        |
|       prescriptions       | CreateCompletePrescriptionRequest[] |         @ValidateNested({ each: true })        | Valida cada elemento del arreglo con las reglas de CreateCompletePrescriptionRequest. |
|       prescriptions       | CreateCompletePrescriptionRequest[] | @Type(() => CreateCompletePrescriptionRequest) |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|         referrals         |       CreateReferralRequest[]       |                  @IsOptional()                 |                No es obligatorio en una actualización parcial.                 |
|         referrals         |       CreateReferralRequest[]       |                   @IsArray()                   |                          Debe ser un arreglo de referencias.                          |
|         referrals         |       CreateReferralRequest[]       |         @ValidateNested({ each: true })        |       Valida cada elemento del arreglo con las reglas de CreateReferralRequest.       |
|         referrals         |       CreateReferralRequest[]       |       @Type(() => CreateReferralRequest)       |            Indica a class-transformer el tipo de cada elemento del arreglo.           |
|        responsible        |       CreateResponsibleRequest      |                  @IsOptional()                 |          No es obligatorio en una actualización parcial.           |
|        responsible        |       CreateResponsibleRequest      |               @ValidateNested()                |             Valida el objeto con las reglas de CreateResponsibleRequest.             |
|        responsible        |       CreateResponsibleRequest      |      @Type(() => CreateResponsibleRequest)     |            Indica a class-transformer el tipo del objeto.           |

#### CompleteAttentionResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| clinical_histories | ClinicalHistoryResponse[] |
|  family_histories | FamilyHistoryResponse[] |
|  gynecological_history | GynecologicalHistoryResponse - null |
|  allergy_histories | AllergyHistoryResponse[] |
|  ram_histories | RamHistoryResponse[] |
|  attention_diagnoses | AttentionDiagnosisResponse[] |
|  health_metrics | HealthMetricResponse - null |
|  bio_functions | BioFunctionResponse[] |
|  physical_exams | PhysicalExamResponse[] |
|  exams | ExamResponse[] |
|  prescriptions | PrescriptionResponse[] |
|  referrals | ReferralResponse[] |
|  responsible | ResponsibleResponse - null |

#### AttentionListResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| attention_id | number |
| created_at | date |
| current_disease | string |
| service | {serviceId: number; name: string} |
| medic | {name: string; paternalSurname: string; maternalSurname: string} |

### AttentionDiagnosis
#### CreateAttentionDiagnosisRequest
|    **Campo**   | **Tipo de dato** |      **Decorador**      |                                    **Justificación**                                    |
|:--------------:|:----------------:|:-----------------------:|:---------------------------------------------------------------------------------------:|
|  diagnosis_id  |      number      |         @IsInt()        |                El modelo de datos indica que el campo es de tipo entero.                |
|  diagnosis_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|      type      |  DIAGNOSIS_TYPE  | @IsEnum(DIAGNOSIS_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| specifications |      string      |      @IsOptional()      |                   El modelo de datos indica que el campo es nullable.                   |
| specifications |      string      |       @IsString()       |               El modelo de datos dictamina que el campo es de tipo texto.               |
| specifications |      string      |     @MaxLength(200)     |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdateAttentionDiagnosisRequest
|    **Campo**   | **Tipo de dato** |      **Decorador**      |                                    **Justificación**                                    |
|:--------------:|:----------------:|:-----------------------:|:---------------------------------------------------------------------------------------:|
|  attention_diagnosis_id  |      number      |      @IsOptional()      |                     No es obligatorio en una actualización parcial.                     |
|  attention_diagnosis_id  |      number      |         @IsInt()        |               El modelo de datos establece que el campo es de tipo entero.              |
|  attention_diagnosis_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|  diagnosis_id  |      number      |      @IsOptional()      |                     No es obligatorio en una actualización parcial.                     |
|  diagnosis_id  |      number      |         @IsInt()        |               El modelo de datos establece que el campo es de tipo entero.              |
|  diagnosis_id  |      number      |         @Min(1)         |                              El identificador mínimo es 1.                              |
|      type      |  DIAGNOSIS_TYPE  | @IsEnum(DIAGNOSIS_TYPE) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| specifications |      string      |      @IsOptional()      |                   El modelo de datos indica que el campo es nullable.                   |
| specifications |      string      |       @IsString()       |               El modelo de datos establece que el campo es de tipo texto.               |
| specifications |      string      |     @MaxLength(200)     |                  El modelo de datos indica un límite de 200 caracteres.                 |

#### AttentionDiagnosisResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  attention_diagnosis_id | number |
|  attention_id | number |
|  diagnosis_id | number |
|  type | DIAGNOSIS_TYPE |
|  specifications | string - null |
|  created_at | date |
|  updated_at | date | 

### Health_Metrics
#### CreateHealthMetricsRequest
|      **Campo**      | **Tipo de dato** |            **Decorador**           |                                   **Justificación**                                  |
|:-------------------:|:----------------:|:----------------------------------:|:------------------------------------------------------------------------------------:|
|     temperature     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     temperature     |      number      |              @Min(30)              |                 El modelo de datos indica que el valor mínimo es 30.                 |
|     temperature     |      number      |              @Max(45)              |                     El valor máximo en el modelo de datos es 45.                     |
|         spo2        |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
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
|         hgt         |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|      hemoglobin     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      hemoglobin     |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|        weight       |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|        weight       |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
| abdominal_perimeter |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
| abdominal_perimeter |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|        height       |      number      |             @Min(1)             |              El modelo de datos indica que el valor mínimo debe ser .              |
#### UpdateHealthMetricsRequest
|      **Campo**      | **Tipo de dato** |            **Decorador**           |                                   **Justificación**                                  |
|:-------------------:|:----------------:|:----------------------------------:|:------------------------------------------------------------------------------------:|
|     health_metric_id    |      number      |            @IsOptional()           |                    No es obligatorio en una actualización parcial.                   |
|     health_metric_id    |      number      |              @IsInt()              |             El modelo de datos establece que el campo es de tipo entero.             |
|     health_metric_id    |      number      |               @Min(1)              |                             El identificador mínimo es 1.                            |
|     temperature     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|     temperature     |      number      |              @Min(30)              |                 El modelo de datos indica que el valor mínimo es 30.                 |
|     temperature     |      number      |              @Max(45)              |                 El modelo de datos indica que el valor máximo es 45.                 |
|         spo2        |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
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
|         hgt         |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|      hemoglobin     |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|      hemoglobin     |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|        weight       |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
|        weight       |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
| abdominal_perimeter |      number      |            @IsOptional()           |                  El modelo de datos indica que el campo es nullable.                 |
| abdominal_perimeter |      number      |             @Min(0)             |              El modelo de datos indica que el valor mínimo debe ser 0.              |
|        height       |      number      |            @IsOptional()           |                    No es obligatorio en una actualización parcial.                   |
|        height       |      number      |             @Min(1)             |              El modelo de datos indica que el valor mínimo debe ser 1.              |

#### HealthMetricResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  health_metric_id | number |
|  attention_id | number |
|  temperature | decimal - null |
|  spo2 | number - null |
|  heart_rate | number - null |
|  respiratory_rate | number - null |
|  systolic_bp | number - null |
|  diastolic_bp | number - null |
|  hgt | decimal - null |
|  hemoglobin | decimal - null |
|  weight | decimal - null |
|  abdominal_perimeter | decimal - null |
|  height | decimal |
|  created_at | date |
|  updated_at | date |

### Diagnosis
#### CreateDiagnosisRequest
|  **Campo**  | **Tipo de dato** |             **Decorador**            |                                            **Justificación**                                            |
|:-----------:|:----------------:|:------------------------------------:|:-------------------------------------------------------------------------------------------------------:|
|    cie_10   |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
|    cie_10   |      string      |              @IsNotEmpty()             |                       Se valida que no se envíen datos vacíos.                       |
|    cie_10   |      string      |              @MinLength(1)             |                       El valor mínimo de caracteres debe ser 1.                       |
|    cie_10   |      string      |            @MaxLength(10)            |                          El modelo de datos indica un límite de 10 caracteres.                          |
| description |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
| description |      string      |              @MinLength(3)             |                       El mínimo de caracteres debe ser 3 para asegurar legibilidad.                       |

#### UpdateDiagnosisRequest
|  **Campo**  | **Tipo de dato** |             **Decorador**            |                                            **Justificación**                                            |
|:-----------:|:----------------:|:------------------------------------:|:-------------------------------------------------------------------------------------------------------:|
|    cie_10   |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
|    cie_10   |      string      |              @IsNotEmpty()             |                       Se valida que no se envíen datos vacíos.                       |
|    cie_10   |      string      |              @MinLength(1)             |                       El valor mínimo de caracteres debe ser 1.                       |
|    cie_10   |      string      |            @MaxLength(10)            |                          El modelo de datos indica un límite de 10 caracteres.                          |
| description |      string      |              @IsString()             |                       El modelo de datos establece que el campo es de tipo texto.                       |
| description |      string      |              @MinLength(3)             |                       El mínimo de caracteres debe ser 3 para asegurar legibilidad.                       |

#### DiagnoseResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  diagnosis_id | number |
|  cie10 | string |
|  description | string |

### Services
#### CreateServiceRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                      **Justificación**                      |
|:---------:|:----------------:|:---------------:|:-----------------------------------------------------------:|
|    name   |      string      |   @IsString()   | El modelo de datos establece que el campo es de tipo texto. |
|    name   |      string      |   @MinLength(3)   | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.   |

#### UpdateServiceRequest
| **Campo** | **Tipo de dato** |  **Decorador**  |                      **Justificación**                      |
|:---------:|:----------------:|:---------------:|:-----------------------------------------------------------:|
|    name   |      string      |   @IsString()   | El modelo de datos establece que el campo es de tipo texto. |
|    name   |      string      |   @MinLength(3)   | Mínimo de caracteres aceptable para legibilidad. |
|    name   |      string      | @MaxLength(100) |    El modelo de datos indica un límite de 100 caracteres.   |

#### ServiceResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  service_id | number |
|  name | string |

### Bio_Functions
#### CreateBioFunctionRequest
|   **Campo**  |   **Tipo de dato**  |         **Decorador**        |                                    **Justificación**                                    |
|:------------:|:-------------------:|:----------------------------:|:---------------------------------------------------------------------------------------:|
|     type     |  BIO_FUNCTION_TYPE  |  @IsEnum(BIO_FUNCTION_TYPE)  | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|    status    | BIO_FUNCTION_STATUS | @IsEnum(BIO_FUNCTION_STATUS) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string       |         @IsOptional()        |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string       |          @IsString()         |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string       |        @MaxLength(200)       |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdateBioFunctionRequest
|   **Campo**  |   **Tipo de dato**  |         **Decorador**        |                                    **Justificación**                                    |
|:------------:|:-------------------:|:----------------------------:|:---------------------------------------------------------------------------------------:|
| bio_function_id |        number       |         @IsOptional()        |                     No es obligatorio en una actualización parcial.                     |
| bio_function_id |        number       |           @IsInt()           |               El modelo de datos establece que el campo es de tipo entero.              |
| bio_function_id |        number       |            @Min(1)           |                              El identificador mínimo es 1.                              |
|     type     |  BIO_FUNCTION_TYPE  |  @IsEnum(BIO_FUNCTION_TYPE)  | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|    status    | BIO_FUNCTION_STATUS | @IsEnum(BIO_FUNCTION_STATUS) | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string       |         @IsOptional()        |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string       |          @IsString()         |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string       |        @MaxLength(200)       |                  El modelo de datos indica un límite de 200 caracteres.                 |

#### BioFunctionResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  bio_function_id | number |
|  attention_id | number |
|  type | BIO_FUNCTION_TYPE |
|  status | BIO_FUNCTION_STATUS |
|  observations | string - null |
|  created_at | date |
|  updated_at | date | 


### Physical_Exams
#### CreatePhysicalExamRequest
|   **Campo**  |   **Tipo de dato**   |                        **Decorador**                       |                                    **Justificación**                                    |
|:------------:|:--------------------:|:----------------------------------------------------------:|:---------------------------------------------------------------------------------------:|
|    system    | PHYSICAL_EXAM_SYSTEM |                @IsEnum(PHYSICAL_EXAM_SYSTEM)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|     other    |        string        |                         @IsOptional()                        |               No es obligatorio al momento de registro.             |
|     other    |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
|     other    |        string        |                       @MaxLength(100)                      |                  El modelo de datos indica un límite de 100 caracteres.                 |
|    status    | PHYSICAL_EXAM_STATUS |                @IsEnum(PHYSICAL_EXAM_STATUS)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string        |                        @IsOptional()                       |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string        |                       @MaxLength(200)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |
#### UpdatePhysicalExamRequest
|   **Campo**  |   **Tipo de dato**   |                        **Decorador**                       |                                    **Justificación**                                    |
|:------------:|:--------------------:|:----------------------------------------------------------:|:---------------------------------------------------------------------------------------:|
| physical_exam_id |        number        |                        @IsOptional()                       |                     No es obligatorio en una actualización parcial.                     |
| physical_exam_id |        number        |                          @IsInt()                          |               El modelo de datos establece que el campo es de tipo entero.              |
| physical_exam_id |        number        |                           @Min(1)                          |                              El identificador mínimo es 1.                              |
|    system    | PHYSICAL_EXAM_SYSTEM |                @IsEnum(PHYSICAL_EXAM_SYSTEM)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
|     other    |        string        |                        @IsOptional()                       |                  No es obligatorio en una actualización parcial.                 |
|     other    |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
|     other    |        string        |                       @MaxLength(100)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |
|    status    | PHYSICAL_EXAM_STATUS |                        @IsOptional()                       |                     No es obligatorio en una actualización parcial.                     |
|    status    | PHYSICAL_EXAM_STATUS |                @IsEnum(PHYSICAL_EXAM_STATUS)               | El modelo de datos establece que el campo solo acepta los valores definidos en el enum. |
| observations |        string        |                        @IsOptional()                       |                   El modelo de datos indica que el campo es nullable.                   |
| observations |        string        |                         @IsString()                        |               El modelo de datos establece que el campo es de tipo texto.               |
| observations |        string        |                       @MaxLength(200)                      |                  El modelo de datos indica un límite de 200 caracteres.                 |

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

#### ResponsibleResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  responsible_id | number |
|  attention_id | number |
|  name | string |
|  paternal_surname | string |
|  maternal_surname | string |
|  relationship | RELATIONSHIP_TYPE |
|  relationship_other | string - null |
|  phone | string - null |
|  created_at | date |
|  updated_at | date |

## Módulo de Órdenes
### Exams
#### CreateExamItemRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| procedure_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| procedure_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |
| indications | string | @IsOptional() | No es obligatorio al momento del registro. |
| indications | string | @IsString() | El modelo de datos dictamina que debe ser un string. |
| indications | string | @MaxLength(200) | El modelo de datos establece que el máximo de caracteres debe ser 200. |
#### UpdateExamItemRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| exam_item_id | number | @IsOptional() | Identificador único para la actualización. |
| exam_item_id | number | @IsInt() | El modelo de datos establece que el campo es de tipo entero. |
| exam_item_id | number | @Min(1) | El identificador mínimo debe ser 1. |
| procedure_id |      number      |    @IsOptional()   | No es obligatorio en una actualización parcial. |
| procedure_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| procedure_id |      number      |    @Min(1)    |                 El identificador mínimo debe ser 1.                |
| indications | string | @IsOptional() | No es obligatorio en una actualización parcial. |
| indications | string | @IsString() | El modelo de datos dictamina que debe ser un string. |
| indications | string | @MaxLength(200) | El modelo de datos establece que el máximo de caracteres debe ser 200. |

#### ExamItemResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  exam_item_id | number |
|  exam_id | number |
|  procedure_id | number |
|  indications | string - null |

#### ExamResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  exam_id | number |
|  attention_id | number |
|  items | ExamItemResponse[] |
|  created_at | date |
|  updated_at | date |

#### CreateCompleteExamRequest
|     **Campo**     |     **Tipo de dato**    |            **Decorador**           |                             **Justificación**                             |
|:-----------------:|:-----------------------:|:----------------------------------:|:-------------------------------------------------------------------------:|
|       items       | CreateExamItemRequest[] |             @IsArray()             |                  Debe ser un arreglo de ítems de examen.                  |
|       items       | CreateExamItemRequest[] |   @ValidateNested({ each: true })  | Valida cada elemento del arreglo con las reglas de CreateExamItemRequest. |
|       items       | CreateExamItemRequest[] | @Type(() => CreateExamItemRequest) |      Indica a class-transformer el tipo de cada elemento del arreglo.     |

#### UpdateCompleteExamRequest
|     **Campo**     |     **Tipo de dato**    |            **Decorador**           |                             **Justificación**                             |
|:-----------------:|:-----------------------:|:----------------------------------:|:-------------------------------------------------------------------------:|
| exam_id | number | @IsOptional() | Identificador único para la actualización. |
| exam_id | number | @IsInt() | El modelo de datos indica que debe ser un entero. |
| exam_id | number | @Min(1) | Valor mínimo aceptable según el modelo de datos. |
|       items       | UpdateExamItemRequest[] |             @IsArray()             |                  Debe ser un arreglo de ítems de examen.                  |
|       items       | UpdateExamItemRequest[] |   @ValidateNested({ each: true })  | Valida cada elemento del arreglo con las reglas de UpdateExamItemRequest. |
|       items       | UpdateExamItemRequest[] | @Type(() => UpdateExamItemRequest) |      Indica a class-transformer el tipo de cada elemento del arreglo.     |

### Prescriptions
#### CreatePrescriptionItemRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
|  medicament_id  |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  medicament_id  |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|     quantity    |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|     quantity    |      number      |     @Min(1)     |  El modelo de datos indica que el valor debe ser mayor a 0.  |
|   indications   |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|   indications   |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|   indications   |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
| attention_diagnosis_ids | number[] | @IsArray() | Se valida que sea un arreglo. |
| attention_diagnosis_ids | number[] | @IsInt({ each:true }) | Se valida que cada elemento sea un entero. |
| attention_diagnosis_ids | number[] | @Min(1, {each : true}) | Se valida que cada elemento tenga no menos del valor mínimo de 1. |
#### UpdatePrescriptionItemRequest
|    **Campo**    | **Tipo de dato** |  **Decorador**  |                       **Justificación**                      |
|:---------------:|:----------------:|:---------------:|:------------------------------------------------------------:|
| prescription_item_id |      number      |  @IsOptional()  |        Identificador único para la actualización.       |
| prescription_item_id |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
| prescription_item_id |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|  medicament_id  |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
|  medicament_id  |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|  medicament_id  |      number      |     @Min(1)     |                 El identificador mínimo es 1.                |
|     quantity    |      number      |  @IsOptional()  |        No es obligatorio en una actualización parcial.       |
|     quantity    |      number      |     @IsInt()    | El modelo de datos establece que el campo es de tipo entero. |
|     quantity    |      number      |     @Min(1)     |  El modelo de datos indica que el valor debe ser mayor a 0.  |
|   indications   |      string      |  @IsOptional()  |      El modelo de datos indica que el campo es nullable.     |
|   indications   |      string      |   @IsString()   |  El modelo de datos establece que el campo es de tipo texto. |
|   indications   |      string      | @MaxLength(200) |    El modelo de datos indica un límite de 200 caracteres.    |
| attention_diagnosis_ids | number[] | @IsOptional() | No es obligatorio en una actualización parcial. |
| attention_diagnosis_ids | number[] | @IsArray() | Se valida que sea un arreglo. |
| attention_diagnosis_ids | number[] | @IsInt({ each:true }) | Se valida que cada elemento sea un entero. |
| attention_diagnosis_ids | number[] | @Min(1, {each : true}) | Se valida que cada elemento tenga no menos del valor mínimo de 1. |

#### CreateCompletePrescriptionRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| items |      CreatePrescriptionItemRequest[]      |    @IsArray()   | Se valida que sea un arreglo. |
| items |      CreatePrescriptionItemRequest[]      |    @ValidateNested({ each: true })    |                 Valida el objeto con las reglas de CreatePrescriptionItemRequest.                |
| items | CreatePrescriptionItemRequest[] | @Type(() => CreatePrescriptionItemRequest) | Indica a class-transformer el tipo del objeto. |

#### UpdateCompletePrescriptionRequest
|   **Campo**  | **Tipo de dato** | **Decorador** |                       **Justificación**                      |
|:------------:|:----------------:|:-------------:|:------------------------------------------------------------:|
| prescription_id |      number      | @IsOptional() |        Identificador único para la actualización.       |
| prescription_id |      number      |    @IsInt()   | El modelo de datos establece que el campo es de tipo entero. |
| prescription_id |      number      |    @Min(1)    |                 El identificador mínimo es 1.                |
| items |      UpdatePrescriptionItemRequest[]      |    @IsArray()   | Se valida que sea un arreglo. |
| items |      UpdatePrescriptionItemRequest[]      |    @ValidateNested({ each: true })    |                 Valida el objeto con las reglas de UpdatePrescriptionItemRequest.                |
| items | UpdatePrescriptionItemRequest[] | @Type(() => UpdatePrescriptionItemRequest) | Indica a class-transformer el tipo del objeto. |

#### PrescriptionItemResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  prescription_item_id | number |
|  prescription_id | number |
|  medicament_id | number |
|  quantity | number |
|  indications | string - null |
|  attention_diagnosis_id | number[] |

#### PrescriptionResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  prescription_id | number |
|  attention_id | number |
|  items | PrescriptionItemResponse[] |
|  created_at | date |
|  updated_at | date |

### Referrals
#### CreateReferralRequest
|   **Campo**  | **Tipo de dato** |                                                **Decorador**                                               |                                                   **Justificación**                                                   |
|:------------:|:----------------:|:----------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------:|
|  service_id  |      number      |                                                  @IsInt()                                                  |                              El modelo de datos establece que el campo es de tipo entero.                             |
|  service_id  |      number      |                                                   @Min(1)                                                  |                                             El identificador mínimo es 1.                                             |
|    reason    |      string      |                                                 @IsString()                                                |                              El modelo de datos establece que el campo es de tipo texto.                              |
|    reason    |      string      |                                               @MinLength(3)                                                |                                El modelo de datos indica un mínimo de 3 caracteres.                                |
|    reason    |      string      |                                               @MaxLength(200)                                              |                                 El modelo de datos indica un límite de 200 caracteres.                                |

#### UpdateReferralRequest
|   **Campo**  | **Tipo de dato** |            **Decorador**            |                       **Justificación**                      |
|:------------:|:----------------:|:-----------------------------------:|:------------------------------------------------------------:|
| referral_id |      number      |            @IsOptional()            |        No es obligatorio en una actualización parcial.       |
| referral_id |      number      |               @IsInt()              | El modelo de datos establece que el campo es de tipo entero. |
| referral_id |      number      |               @Min(1)               |                 El identificador mínimo es 1.                |
|  service_id  |      number      |               @IsInt()              | El modelo de datos establece que el campo es de tipo entero. |
|  service_id  |      number      |               @Min(1)               |                 El identificador mínimo es 1.                |
|    reason    |      string      |             @IsString()             |  El modelo de datos establece que el campo es de tipo texto. |
|    reason    |      string      |           @MinLength(3)             |    El modelo de datos indica un mínimo de 3 caracteres.    |
|    reason    |      string      |           @MaxLength(200)           |    El modelo de datos indica un límite de 200 caracteres.    |

#### ReferralResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| referral_id | number |
|  attention_id | number |
|  service_id | number |
|  reason | string |

### Procedures
#### CreateProcedureRequest
| **Campo** | **Tipo de dato** | **Decorador** | **Justificación** |
|:-----------:|:----------------:|:-------------:|:-----------------:|
| type | string | @IsString() | El modelo de datos establece que debe ser string. |
| type | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| type | string | @MaxLength(50) | Máximo valor asignado según el modelo de datos. |
| category | string | @IsOptional() | No es necesario en el momento de registro. |
| category | string | @IsString() | El modelo de datos establece que debe ser string. |
| category | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| category | string | @MaxLength(100) | Máximo valor asignado según el modelo de datos. |
| description | string | @IsString() | El modelo de datos establece que debe ser string. |
| description | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| description | string | @MaxLength(200) | Máximo valor asignado según el modelo de datos. |

#### UpdateProcedureRequest
| **Campo** | **Tipo de dato** | **Decorador** | **Justificación** |
|:-----------:|:----------------:|:-------------:|:-----------------:|
| type | string | @IsOptional() | No es obligatorio en una actualización parcial. |
| type | string | @IsString() | El modelo de datos establece que debe ser string. |
| type | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| type | string | @MaxLength(50) | Máximo valor asignado según el modelo de datos. |
| category | string | @IsOptional() | No es obligatorio en una actualización parcial. |
| category | string | @IsString() | El modelo de datos establece que debe ser string. |
| category | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| category | string | @MaxLength(100) | Máximo valor asignado según el modelo de datos. |
| description | string | @IsOptional() | No es obligatorio en una actualización parcial. |
| description | string | @IsString() | El modelo de datos establece que debe ser string. |
| description | string | @MinLength(3) | Mínimo de caracteres viables para legibilidad. |
| description | string | @MaxLength(200) | Máximo valor asignado según el modelo de datos. |

#### ProcedureResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
|  procedure_id | number |
|  type | string |
|  category | string - null |
|  description | string |

## Módulo de Estadísticas
### Stats
#### StatsResponse
| **Campo** | **Tipo** |
|:---------:|:--------:|
| total_atentions | number |
| weekly_atentions | number |
| new_patients | number |
| total_patients | number |
| patients_per_group_0_5 | number |
| patients_per_group_5_17 | number |
| patients_per_group_17_60 | number |
| patients_older_than_60 | number |
| patients_per_sex_M | number |
| patients_per_sex_F | number |
