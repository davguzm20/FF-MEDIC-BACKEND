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

@ApiTags('Diagnoses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('diagnoses')
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Post()
  @ApiOperation({ summary: 'Crear diagnostico — Roles: Admin' })
  @ApiResponse({ status: 201, description: 'Diagnostico creado' })
  @ApiResponse({ status: 409, description: 'El diagnostico ya existe' })
  create(@Body() dto: CreateDiagnosisRequest) {
    return this.diagnosisService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  @ApiOperation({ summary: 'Listar diagnosticos — Roles: Admin, Doctor' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Busqueda por codigo o descripcion',
  })
  @ApiResponse({ status: 200, description: 'Lista de diagnosticos' })
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.diagnosisService
        .search(search)
        .then((diagnoses) => diagnoses.map(diagnosisToResponse));
    }

    return this.diagnosisService
      .findAll()
      .then((diagnoses) => diagnoses.map(diagnosisToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener diagnostico por ID — Roles: Admin, Doctor',
  })
  @ApiParam({ name: 'id', description: 'ID del diagnostico' })
  @ApiResponse({ status: 200, description: 'Diagnostico encontrado' })
  @ApiResponse({ status: 404, description: 'Diagnostico no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const diagnosis = await this.diagnosisService.findOne(id);
    return diagnosisToResponse(diagnosis);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar diagnostico — Roles: Admin' })
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
  @ApiOperation({ summary: 'Eliminar diagnostico — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del diagnostico' })
  @ApiResponse({ status: 200, description: 'Diagnostico eliminado' })
  @ApiResponse({ status: 404, description: 'Diagnostico no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosisService.remove(id);
  }
}
