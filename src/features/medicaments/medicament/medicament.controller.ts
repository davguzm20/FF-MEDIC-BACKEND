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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MedicamentService } from './medicament.service';
import { CreateCompleteMedicamentRequest } from './dtos/create-complete-medicament.request';
import { UpdateCompleteMedicamentRequest } from './dtos/update-complete-medicament.request';
import { medicamentToResponse } from './medicament.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Medicaments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('medicaments')
export class MedicamentController {
  constructor(private medicamentService: MedicamentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear medicamento — Roles: Admin, Doctor' })
  @ApiResponse({ status: 201, description: 'Medicamento creado' })
  @ApiResponse({ status: 409, description: 'El medicamento ya existe' })
  create(@Body() dto: CreateCompleteMedicamentRequest) {
    return this.medicamentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar medicamentos — Roles: Admin, Doctor' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Busqueda por nombre, concentracion, fabricante o forma farmaceutica',
  })
  @ApiResponse({ status: 200, description: 'Lista de medicamentos (max 5 con search, vacio sin search)' })
  findAll(@Query('search') search?: string) {
    if (!search) return [];

    return this.medicamentService
      .search(search)
      .then((medicaments) => medicaments.map(medicamentToResponse));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener medicamento por ID — Roles: Admin, Doctor',
  })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 200, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
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
  @ApiOperation({ summary: 'Actualizar medicamento — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 200, description: 'Medicamento actualizado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteMedicamentRequest,
  ) {
    return this.medicamentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar medicamento — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 200, description: 'Medicamento eliminado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicamentService.remove(id);
  }
}
