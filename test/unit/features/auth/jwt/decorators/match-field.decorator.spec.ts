import { validate } from 'class-validator';
import { MatchField } from '../../../../../../src/features/auth/jwt/decorators/match-field.decorator';

class TestDto {
  password!: string;

  @MatchField('password')
  confirmPassword!: string;
}

describe('MatchFieldDecorator', () => {
  it('debe pasar si los campos coinciden', async () => {
    const dto = new TestDto();
    dto.password = 'Secret123!';
    dto.confirmPassword = 'Secret123!';

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('debe fallar si los campos no coinciden', async () => {
    const dto = new TestDto();
    dto.password = 'Secret123!';
    dto.confirmPassword = 'Different456!';

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('MatchField');
  });
});
