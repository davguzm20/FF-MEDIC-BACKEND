import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsPersonName } from '@common/validators/is-person-name.validator';

class TestDto {
  @IsPersonName()
  name!: string;
}

const make = (name: string) => plainToInstance(TestDto, { name });

describe('IsPersonName validator', () => {
  it('debe aceptar nombre con letras y espacios', async () => {
    const errors = await validate(make('Juan Carlos'));
    expect(errors.length).toBe(0);
  });

  it('debe aceptar nombre con tildes y ñ', async () => {
    const errors = await validate(make('María José'));
    expect(errors.length).toBe(0);
  });

  it('debe aceptar nombre con apóstrofe', async () => {
    const errors = await validate(make("O'Neil"));
    expect(errors.length).toBe(0);
  });

  it('debe aceptar nombre con guión', async () => {
    const errors = await validate(make('María-Luz'));
    expect(errors.length).toBe(0);
  });

  it('debe rechazar nombre con números', async () => {
    const errors = await validate(make('32132451251'));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('debe rechazar nombre con caracteres especiales', async () => {
    const errors = await validate(make('Juan@Carlos'));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('debe rechazar string vacío', async () => {
    const errors = await validate(make(''));
    expect(errors.length).toBeGreaterThan(0);
  });
});
