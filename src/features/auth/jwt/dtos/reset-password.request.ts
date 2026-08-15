import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Length,
} from 'class-validator';
import { MatchField } from '../decorators/match-field.decorator';

export class ResetPasswordRequest {
  @IsString()
  @Length(8, 8)
  code!: string;

  /** Mínimo 12 caracteres, con mayúscula, minúscula y número */
  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  newPassword!: string;

  @IsString()
  @MatchField('newPassword')
  confirmPassword!: string;
}
