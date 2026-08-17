import { IsArray, ArrayMinSize, IsInt } from 'class-validator';
import { UpdateMedicamentRequest } from './update-medicament.request';

export class UpdateCompleteMedicamentRequest extends UpdateMedicamentRequest {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  activeIngredientIds!: number[];
}
