import { applyDecorators } from '@nestjs/common';
import { IsOptional, ValidateNested } from 'class-validator';
import { Transform } from 'class-transformer';
import { isEmptyNestedObject } from './is-empty-object';

/**
 * Combina @Transform (convierte objetos vacíos a undefined) +
 * @IsOptional() + @ValidateNested().
 * Se debe usar junto con @Type(() => ClassName) de class-transformer.
 */
export function OptionalNestedObject(): PropertyDecorator {
  return applyDecorators(
    Transform(({ value }: { value: unknown }) =>
      isEmptyNestedObject(value) ? undefined : value,
    ),
    IsOptional(),
    ValidateNested(),
  );
}
