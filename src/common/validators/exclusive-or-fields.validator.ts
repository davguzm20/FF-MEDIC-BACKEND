import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ExclusiveOrFields(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'exclusiveOrFields',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const relatedValue = (
            args.object as Record<string, unknown>
          )[property];
          return (
            (value != null && relatedValue == null) ||
            (value == null && relatedValue != null)
          );
        },
        defaultMessage(args: ValidationArguments) {
          const optionsMessage = validationOptions?.message;
          return (
            (optionsMessage as string) ??
            `Solo debe enviarse ${args.property} o ${property}, no ambos ni ninguno`
          );
        },
      },
    });
  };
}
