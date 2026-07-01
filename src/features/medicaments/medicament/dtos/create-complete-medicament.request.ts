import { IsArray, IsInt, Min } from 'class-validator';
import { CreateMedicamentRequest } from './create-medicament.request';

export class CreateCompleteMedicamentRequest extends CreateMedicamentRequest {
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  activeIngredientIds!: number[];
}
