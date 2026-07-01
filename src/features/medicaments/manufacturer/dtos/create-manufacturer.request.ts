import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateManufacturerRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;
}
