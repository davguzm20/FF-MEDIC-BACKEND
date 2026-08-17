import { IsArray, ArrayMinSize, IsInt } from 'class-validator';
import { CreateMedicamentRequest } from './create-medicament.request';

export class CreateCompleteMedicamentRequest extends CreateMedicamentRequest {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  activeIngredientIds!: number[];
}
