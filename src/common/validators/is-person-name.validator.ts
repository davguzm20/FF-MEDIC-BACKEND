import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPersonName', async: false })
export class IsPersonNameConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value !== 'string') return false;
    return /^[\p{L}\s'._-]+$/u.test(value) && value.trim().length > 0;
  }

  defaultMessage() {
    return 'El nombre solo debe contener letras, espacios, apóstrofes o guiones';
  }
}

export function IsPersonName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPersonNameConstraint,
    });
  };
}
