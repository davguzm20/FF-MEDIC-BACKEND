import { NormalizeQueryPipe } from '@common/pipes/normalize-query.pipe';

describe('NormalizeQueryPipe', () => {
  const pipe = new NormalizeQueryPipe();

  it('debe aplicar trim y eliminar acentos', () => {
    expect(pipe.transform('  ácido  ')).toBe('acido');
    expect(pipe.transform(' José María ')).toBe('Jose Maria');
  });

  it('debe retornar undefined si el valor queda vacio', () => {
    expect(pipe.transform('   ')).toBeUndefined();
  });

  it('debe retornar undefined si no recibe valor', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
