import { IsArray, ArrayMinSize, IsInt, Min } from 'class-validator';
import { UpdateMedicamentRequest } from './update-medicament.request';

export class UpdateCompleteMedicamentRequest extends UpdateMedicamentRequest {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  activeIngredientIds!: number[];
}
