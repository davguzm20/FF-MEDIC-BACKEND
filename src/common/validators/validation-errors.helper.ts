import { ValidationException } from './validation.exception';

interface ConstraintArgs {
  property: string;
  constraints: string | number | string[] | number[] | undefined;
}

const CONSTRAINT_MESSAGES: Record<string, (args: ConstraintArgs) => string> = {
  isNotEmpty: (args) => `El campo ${args.property} es requerido`,
  isPresent: (args) => `El campo ${args.property} es requerido`,
  isString: (args) => `El campo ${args.property} debe ser un texto`,
  isNumber: (args) => `El campo ${args.property} debe ser un número`,
  isInt: (args) => `El campo ${args.property} debe ser un número entero`,
  isBoolean: (args) =>
    `El campo ${args.property} debe ser un valor verdadero o falso`,
  isDateString: (args) => `El campo ${args.property} debe ser una fecha válida`,
  isArray: (args) => `El campo ${args.property} debe ser un arreglo`,
  isEnum: (args) => {
    const allowed = Array.isArray(args.constraints)
      ? args.constraints.join(', ')
      : String(args.constraints ?? '');
    return `El campo ${args.property} debe ser uno de los siguientes valores: ${allowed}`;
  },
  minLength: (args) =>
    `El campo ${args.property} debe tener al menos ${String(args.constraints)} caracteres`,
  maxLength: (args) =>
    `El campo ${args.property} no debe exceder ${String(args.constraints)} caracteres`,
  min: (args) =>
    `El campo ${args.property} debe ser mayor o igual a ${String(args.constraints)}`,
  max: (args) =>
    `El campo ${args.property} debe ser menor o igual a ${String(args.constraints)}`,
  arrayMinSize: (args) =>
    `El campo ${args.property} debe contener al menos ${String(args.constraints)} elementos`,
  arrayMaxSize: (args) =>
    `El campo ${args.property} no debe contener más de ${String(args.constraints)} elementos`,
  matches: (args) => `El campo ${args.property} no tiene un formato válido`,
  isEmail: (args) =>
    `El campo ${args.property} debe ser un correo electrónico válido`,
  isPositive: (args) => `El campo ${args.property} debe ser un número positivo`,
  isNegative: (args) => `El campo ${args.property} debe ser un número negativo`,
};

function getDefaultMessage(constraintName: string, property: string): string {
  return `El campo ${property} no cumple con la validación (${constraintName})`;
}

function buildFieldPath(
  parentPath: string,
  property: string,
  index?: number,
): string {
  if (index !== undefined) {
    return `${parentPath}[${index}]`;
  }
  if (parentPath) {
    return `${parentPath}.${property}`;
  }
  return property;
}

function extractErrors(
  errors: import('class-validator').ValidationError[],
  parentPath = '',
): Array<{ field: string; message: string; code: string }> {
  const result: Array<{ field: string; message: string; code: string }> = [];

  for (const error of errors) {
    const fieldPath = buildFieldPath(parentPath, error.property);

    if (error.constraints) {
      for (const [constraintName, constraintValue] of Object.entries(
        error.constraints,
      )) {
        const formatter = CONSTRAINT_MESSAGES[constraintName];
        const message = formatter
          ? formatter({ property: fieldPath, constraints: constraintValue })
          : getDefaultMessage(constraintName, fieldPath);

        result.push({
          field: fieldPath,
          message,
          code: constraintName
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .toUpperCase(),
        });
      }
    }

    if (error.children?.length) {
      result.push(...extractErrors(error.children, fieldPath));
    }
  }

  return result;
}

export function buildValidationErrors(
  errors: import('class-validator').ValidationError[],
): ValidationException {
  const errorDetails = extractErrors(errors);
  return new ValidationException(errorDetails);
}
