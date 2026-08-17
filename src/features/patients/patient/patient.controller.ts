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
import { PatientService } from './patient.service';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';
import {
  patientToResponse,
  patientToListResponse,
  patientToHistoriesResponse,
} from './patient.mapper';
import { AttentionService } from '@attentions/attention/attention.service';
import { attentionToListResponse } from '@attentions/attention/attention.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Doctor)
@Controller('patients')
export class PatientController {
  constructor(
    private patientService: PatientService,
    private attentionService: AttentionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear paciente' })
  @ApiResponse({ status: 201, description: 'Paciente creado' })
  @ApiResponse({ status: 409, description: 'El paciente ya existe' })
  create(@Body() dto: CreatePatientRequest) {
    return this.patientService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pacientes' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Busqueda por nombre o numero de documento',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de pacientes' })
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
  @ApiOperation({ summary: 'Obtener paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.findOne(id);
    return patientToResponse(patient);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar paciente' })
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
  @ApiOperation({ summary: 'Listar atenciones de un paciente' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
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
  @ApiOperation({ summary: 'Obtener historias clinicas del paciente' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Historias del paciente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async findHistories(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.findWithHistories(id);
    return patientToHistoriesResponse(patient);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar paciente' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 204, description: 'Paciente eliminado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.patientService.remove(id);
  }
}
