import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  credential!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(250)
  password!: string;
}
