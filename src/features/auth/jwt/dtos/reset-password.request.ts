import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { MatchField } from '../decorators/match-field.decorator';

export class ResetPasswordRequest {
  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  newPassword!: string;

  @IsString()
  @MatchField('newPassword')
  confirmPassword!: string;
}
