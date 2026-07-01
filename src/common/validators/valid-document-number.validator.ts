import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'validDocumentNumber', async: false })
export class ValidDocumentNumberConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const obj = args.object as { documentType: string };
    const type = obj.documentType;

    if (type === 'DNI') return /^\d{8}$/.test(value);
    if (type === 'CE') return /^\d{9}$/.test(value);
    if (type === 'PASAPORTE') return /^[a-zA-Z0-9]{6,20}$/.test(value);
    return false;
  }

  defaultMessage() {
    return 'El número de documento no es válido para el tipo seleccionado';
  }
}

export function ValidDocumentNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidDocumentNumberConstraint,
    });
  };
}
