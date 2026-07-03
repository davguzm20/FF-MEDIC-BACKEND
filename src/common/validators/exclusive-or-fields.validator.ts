import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ExclusiveOrFields(
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (target: object) {
    registerDecorator({
      name: 'exclusiveOrFields',
      target: target.constructor,
      propertyName: target.constructor.name,
      constraints: fields,
      options: validationOptions,
      validator: {
        validate(_value: unknown, args: ValidationArguments) {
          const obj = args.object as Record<string, unknown>;
          const values = (args.constraints as string[]).map(
            (f) => obj[f] != null,
          );
          return values.filter(Boolean).length === 1;
        },
        defaultMessage(args: ValidationArguments) {
          const fields = (args.constraints as string[]).join(', ');
          return (
            (validationOptions?.message as string) ??
            `Solo debe enviarse ${fields}, no ambos ni ninguno`
          );
        },
      },
    });
  };
}
