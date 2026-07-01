import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MedicamentService } from './medicament.service';
import { CreateCompleteMedicamentRequest } from './dtos/create-complete-medicament.request';
import { UpdateCompleteMedicamentRequest } from './dtos/update-complete-medicament.request';
import { medicamentToResponse } from './medicament.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('medicaments')
export class MedicamentController {
  constructor(private medicamentService: MedicamentService) {}

  @Post()
  create(@Body() dto: CreateCompleteMedicamentRequest) {
    return this.medicamentService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicamentService
      .findAll()
      .then((medicaments) => medicaments.map(medicamentToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const medicament = await this.medicamentService.findOne(id);
    const response = medicamentToResponse(medicament);

    if (medicament.activeIngredients) {
      response.activeIngredients = medicament.activeIngredients.map((mi) => ({
        activeIngredientId: mi.activeIngredient.activeIngredientId,
        name: mi.activeIngredient.name,
      }));
    }

    return response;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteMedicamentRequest,
  ) {
    return this.medicamentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicamentService.remove(id);
  }
}
