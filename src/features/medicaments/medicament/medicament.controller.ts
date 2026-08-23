import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
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
import { NormalizeQueryPipe } from '@common/pipes/normalize-query.pipe';
import { medicamentToResponse } from './medicament.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Medicaments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('medicaments')
export class MedicamentController {
  constructor(private medicamentService: MedicamentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear medicamento' })
  @ApiResponse({ status: 201, description: 'Medicamento creado' })
  @ApiResponse({ status: 409, description: 'El medicamento ya existe' })
  async create(@Body() dto: CreateCompleteMedicamentRequest) {
    const medicament = await this.medicamentService.create(dto);
    return medicamentToResponse(medicament);
  }

  @Get()
  @ApiOperation({ summary: 'Listar medicamentos' })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Búsqueda por nombre',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de medicamentos' })
  async findAll(
    @Query('q', new NormalizeQueryPipe()) q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    const result = await this.medicamentService.findAll({ q, page, limit });
    return {
      data: result.data.map(medicamentToResponse),
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener medicamento por ID' })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 200, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const medicament = await this.medicamentService.findOne(id);
    return medicamentToResponse(medicament);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar medicamento' })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 200, description: 'Medicamento actualizado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteMedicamentRequest,
  ) {
    const medicament = await this.medicamentService.update(id, dto);
    return medicamentToResponse(medicament);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar medicamento' })
  @ApiParam({ name: 'id', description: 'ID del medicamento' })
  @ApiResponse({ status: 204, description: 'Medicamento eliminado' })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.medicamentService.remove(id);
  }
}
