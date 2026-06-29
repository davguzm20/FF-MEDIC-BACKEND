import { IsEmail, MaxLength } from 'class-validator';

export class ForgotPasswordRequest {
  @IsEmail()
  @MaxLength(254)
  email!: string;
}
