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
import { NormalizeQueryPipe } from '@common/pipes/normalize-query.pipe';
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
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Búsqueda por código CIE-10 o descripción',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de diagnosticos' })
  async findAll(
    @Query('q', new NormalizeQueryPipe()) q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    const result = await this.diagnosisService.findAll({ q, page, limit });
    return {
      data: result.data.map(diagnosisToResponse),
      meta: result.meta,
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
