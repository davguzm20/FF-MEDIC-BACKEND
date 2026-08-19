export function isEmptyNestedObject(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  return Object.values(value).every(
    (v) => v === null || v === undefined || v === '' || v === 0,
  );
}
