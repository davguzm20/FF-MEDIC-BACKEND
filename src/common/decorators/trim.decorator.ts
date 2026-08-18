import { Transform } from 'class-transformer';

export function Trim() {
  return Transform(({ value }: { value: unknown }): unknown => {
    if (typeof value === 'string') return value.trim() || undefined;
    return value;
  });
}
