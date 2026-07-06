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
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';
import { patientToResponse, patientToListResponse } from './patient.mapper';
import { AttentionService } from '@attentions/attention/attention.service';
import { attentionToListResponse } from '@attentions/attention/attention.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('patients')
export class PatientController {
  constructor(
    private patientService: PatientService,
    private attentionService: AttentionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear paciente — Roles: Admin, Doctor' })
  @ApiResponse({ status: 201, description: 'Paciente creado' })
  @ApiResponse({ status: 409, description: 'El paciente ya existe' })
  create(@Body() dto: CreatePatientRequest) {
    return this.patientService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pacientes — Roles: Admin, Doctor' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes paginada' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('search') search?: string,
  ) {
    const result = await this.patientService.findAll({ page, search });
    return {
      data: result.data.map(patientToListResponse),
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener paciente por ID — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.findOne(id);
    return patientToResponse(patient);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar paciente — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente actualizado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientRequest,
  ) {
    return this.patientService.update(id, dto);
  }

  @Get(':id/attentions')
  @ApiOperation({
    summary: 'Listar atenciones de un paciente — Roles: Admin, Doctor',
  })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Atenciones del paciente' })
  async findPatientAttentions(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const result = await this.attentionService.findByPatient(id, page);
    return {
      data: result.data.map(attentionToListResponse),
      meta: result.meta,
    };
  }

  @Get(':id/histories')
  @ApiOperation({
    summary: 'Obtener paciente con todas sus historias — Roles: Admin, Doctor',
  })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente con historias clinicas, alergias, RAMs, etc.' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async findHistories(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findWithHistories(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar paciente — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente eliminado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}
