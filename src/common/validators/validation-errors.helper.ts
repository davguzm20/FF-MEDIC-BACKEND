import { ValidationException } from './validation.exception';

interface ConstraintArgs {
  constraints: string | number | string[] | number[] | undefined;
}

const CONSTRAINT_MESSAGES: Record<string, (args: ConstraintArgs) => string> = {
  isNotEmpty: () => 'Es obligatorio',
  isPresent: () => 'Es obligatorio',
  isString: () => 'Debe ser un valor de texto',
  isNumber: () => 'Debe ser un número',
  isInt: () => 'Debe ser un número entero',
  isBoolean: () => 'Debe ser un valor verdadero o falso',
  isDateString: () => 'Debe ser una fecha válida',
  isArray: () => 'Debe ser un arreglo',
  isEnum: (args) => {
    const allowed = Array.isArray(args.constraints)
      ? args.constraints.join(', ')
      : String(args.constraints ?? '');
    return `Debe ser uno de los valores permitidos: ${allowed}`;
  },
  minLength: (args) => {
    if (typeof args.constraints === 'number') {
      return `Debe tener al menos ${args.constraints} caracteres`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/(\d+)/);
    return match
      ? `Debe tener al menos ${match[1]} caracteres`
      : `Debe tener una longitud mínima`;
  },
  maxLength: (args) => {
    if (typeof args.constraints === 'number') {
      return `No debe exceder ${args.constraints} caracteres`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/(\d+)/);
    return match
      ? `No debe exceder ${match[1]} caracteres`
      : `Debe tener una longitud máxima`;
  },
  min: (args) => {
    if (typeof args.constraints === 'number') {
      return `Debe ser mayor o igual a ${args.constraints}`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/not be less than (\d+)/);
    return match
      ? `Debe ser mayor o igual a ${match[1]}`
      : `Debe ser mayor o igual a ${str}`;
  },
  max: (args) => {
    if (typeof args.constraints === 'number') {
      return `Debe ser menor o igual a ${args.constraints}`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/not be greater than (\d+)/);
    return match
      ? `Debe ser menor o igual a ${match[1]}`
      : `Debe ser menor o igual a ${str}`;
  },
  arrayMinSize: (args) => {
    if (typeof args.constraints === 'number') {
      return `Debe contener al menos ${args.constraints} elementos`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/(\d+)/);
    return match
      ? `Debe contener al menos ${match[1]} elementos`
      : `Debe contener más elementos`;
  },
  arrayMaxSize: (args) => {
    if (typeof args.constraints === 'number') {
      return `No debe contener más de ${args.constraints} elementos`;
    }
    const str = String(args.constraints ?? '');
    const match = str.match(/(\d+)/);
    return match
      ? `No debe contener más de ${match[1]} elementos`
      : `Debe contener menos elementos`;
  },
  matches: () => 'No tiene un formato válido',
  isEmail: () => 'Debe ser un correo electrónico válido',
  isPositive: () => 'Debe ser un número positivo',
  isNegative: () => 'Debe ser un número negativo',
  isPhoneNumber: () => 'Debe ser un número de teléfono válido',
  whitelistValidation: () => 'Este campo no forma parte de esta solicitud',
};

function getDefaultMessage(): string {
  return 'No cumple con la validación requerida';
}

function buildFieldPath(parentPath: string, property: string): string {
  if (/^\d+$/.test(property)) {
    return `${parentPath}[${property}]`;
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
          ? formatter({ constraints: constraintValue })
          : getDefaultMessage();

        const code = constraintName
          .replace(/([a-z])([A-Z])/g, '$1_$2')
          .toUpperCase();

        result.push({ field: fieldPath, message, code });
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
