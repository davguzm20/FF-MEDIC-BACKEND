import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginRequest {
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  username!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(250)
  password!: string;
}
