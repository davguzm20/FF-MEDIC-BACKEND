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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProcedureService } from './procedure.service';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';
import { procedureToResponse } from './procedure.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Procedures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('procedures')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}

  @Post()
  @ApiOperation({ summary: 'Crear procedimiento — Roles: Admin' })
  @ApiResponse({ status: 201, description: 'Procedimiento creado' })
  @ApiResponse({ status: 409, description: 'El procedimiento ya existe' })
  create(@Body() dto: CreateProcedureRequest) {
    return this.procedureService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  @ApiOperation({ summary: 'Listar procedimientos — Roles: Admin, Doctor' })
  @ApiResponse({ status: 200, description: 'Lista de procedimientos' })
  findAll() {
    return this.procedureService
      .findAll()
      .then((procedures) => procedures.map(procedureToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener procedimiento por ID — Roles: Admin, Doctor',
  })
  @ApiParam({ name: 'id', description: 'ID del procedimiento' })
  @ApiResponse({ status: 200, description: 'Procedimiento encontrado' })
  @ApiResponse({ status: 404, description: 'Procedimiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const procedure = await this.procedureService.findOne(id);
    return procedureToResponse(procedure);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar procedimiento — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del procedimiento' })
  @ApiResponse({ status: 200, description: 'Procedimiento actualizado' })
  @ApiResponse({ status: 404, description: 'Procedimiento no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProcedureRequest,
  ) {
    return this.procedureService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar procedimiento — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del procedimiento' })
  @ApiResponse({ status: 200, description: 'Procedimiento eliminado' })
  @ApiResponse({ status: 404, description: 'Procedimiento no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.remove(id);
  }
}
