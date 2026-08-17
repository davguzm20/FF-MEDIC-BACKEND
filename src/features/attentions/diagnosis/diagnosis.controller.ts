import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
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
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';
import { diagnosisToResponse } from './diagnosis.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Diagnoses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('diagnoses')
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Post()
  @ApiOperation({ summary: 'Crear diagnostico' })
  @ApiResponse({ status: 201, description: 'Diagnostico creado' })
  @ApiResponse({ status: 409, description: 'El diagnostico ya existe' })
  create(@Body() dto: CreateDiagnosisRequest) {
    return this.diagnosisService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Listar diagnosticos' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por pagina',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de diagnosticos' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.diagnosisService.findAll({ page, limit });
    return {
      data: result.data.map(diagnosisToResponse),
      meta: result.meta,
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get('search')
  @ApiOperation({ summary: 'Buscar diagnosticos por texto' })
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'Texto de busqueda',
  })
  @ApiResponse({ status: 200, description: 'Resultados de busqueda' })
  async search(@Query('search') search: string) {
    const results = await this.diagnosisService.search(search);
    return {
      data: results.map(diagnosisToResponse),
      meta: { total: results.length, limit: 5 },
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener diagnostico por ID' })
  @ApiParam({ name: 'id', description: 'ID del diagnostico' })
  @ApiResponse({ status: 200, description: 'Diagnostico encontrado' })
  @ApiResponse({ status: 404, description: 'Diagnostico no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const diagnosis = await this.diagnosisService.findOne(id);
    return diagnosisToResponse(diagnosis);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar diagnostico' })
  @ApiParam({ name: 'id', description: 'ID del diagnostico' })
  @ApiResponse({ status: 200, description: 'Diagnostico actualizado' })
  @ApiResponse({ status: 404, description: 'Diagnostico no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDiagnosisRequest,
  ) {
    return this.diagnosisService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar diagnostico' })
  @ApiParam({ name: 'id', description: 'ID del diagnostico' })
  @ApiResponse({ status: 204, description: 'Diagnostico eliminado' })
  @ApiResponse({ status: 404, description: 'Diagnostico no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.diagnosisService.remove(id);
  }
}
