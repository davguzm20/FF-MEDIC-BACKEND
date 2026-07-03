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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { DosageFormService } from './dosage-form.service';
import { CreateDosageFormRequest } from './dtos/create-dosage-form.request';
import { UpdateDosageFormRequest } from './dtos/update-dosage-form.request';
import { dosageFormToResponse } from './dosage-form.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Dosage Forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('dosage-forms')
export class DosageFormController {
  constructor(private dosageFormService: DosageFormService) {}

  @Post()
  @ApiOperation({ summary: 'Crear forma farmaceutica — Roles: Admin' })
  @ApiResponse({ status: 201, description: 'Forma farmaceutica creada' })
  @ApiResponse({ status: 409, description: 'La forma farmaceutica ya existe' })
  create(@Body() dto: CreateDosageFormRequest) {
    return this.dosageFormService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar formas farmaceuticas — Roles: Admin' })
  @ApiResponse({ status: 200, description: 'Lista de formas farmaceuticas' })
  findAll() {
    return this.dosageFormService
      .findAll()
      .then((dosageForms) => dosageForms.map(dosageFormToResponse));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener forma farmaceutica por ID — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 200, description: 'Forma farmaceutica encontrada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const dosageForm = await this.dosageFormService.findOne(id);
    return dosageFormToResponse(dosageForm);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar forma farmaceutica — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 200, description: 'Forma farmaceutica actualizada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDosageFormRequest,
  ) {
    return this.dosageFormService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar forma farmaceutica — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 200, description: 'Forma farmaceutica eliminada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dosageFormService.remove(id);
  }
}
