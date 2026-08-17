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
import { medicamentToResponse } from './medicament.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Medicaments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Doctor)
@Controller('medicaments')
export class MedicamentController {
  constructor(private medicamentService: MedicamentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear medicamento' })
  @ApiResponse({ status: 201, description: 'Medicamento creado' })
  @ApiResponse({ status: 409, description: 'El medicamento ya existe' })
  create(@Body() dto: CreateCompleteMedicamentRequest) {
    return this.medicamentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar medicamentos' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por pagina',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de medicamentos' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.medicamentService.findAll({ page, limit });
    return {
      data: result.data.map(medicamentToResponse),
      meta: result.meta,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar medicamentos por texto' })
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'Texto de busqueda',
  })
  @ApiResponse({ status: 200, description: 'Resultados de busqueda' })
  async search(@Query('search') search: string) {
    const results = await this.medicamentService.search(search);
    return {
      data: results.map(medicamentToResponse),
      meta: { total: results.length, limit: 5 },
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteMedicamentRequest,
  ) {
    return this.medicamentService.update(id, dto);
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
