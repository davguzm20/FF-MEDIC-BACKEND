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
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ExamTypeService } from './exam-type.service';
import { CreateExamTypeRequest } from './dtos/create-exam-type.request';
import { UpdateExamTypeRequest } from './dtos/update-exam-type.request';
import { examTypeToResponse } from './exam-type.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Exam Types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('exam-types')
export class ExamTypeController {
  constructor(private examTypeService: ExamTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de examen — Roles: Admin' })
  @ApiResponse({ status: 201, description: 'Tipo de examen creado' })
  @ApiResponse({ status: 409, description: 'El tipo de examen ya existe' })
  create(@Body() dto: CreateExamTypeRequest) {
    return this.examTypeService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  @ApiOperation({ summary: 'Listar tipos de examen — Roles: Admin, Doctor' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de examen' })
  findAll() {
    return this.examTypeService
      .findAll()
      .then((examTypes) => examTypes.map(examTypeToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de examen por ID — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID del tipo de examen' })
  @ApiResponse({ status: 200, description: 'Tipo de examen encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo de examen no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const examType = await this.examTypeService.findOne(id);
    return examTypeToResponse(examType);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de examen — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del tipo de examen' })
  @ApiResponse({ status: 200, description: 'Tipo de examen actualizado' })
  @ApiResponse({ status: 404, description: 'Tipo de examen no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExamTypeRequest,
  ) {
    return this.examTypeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de examen — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del tipo de examen' })
  @ApiResponse({ status: 200, description: 'Tipo de examen eliminado' })
  @ApiResponse({ status: 404, description: 'Tipo de examen no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examTypeService.remove(id);
  }
}
