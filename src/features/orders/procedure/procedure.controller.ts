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
import { ProcedureService } from './procedure.service';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';
import { procedureToResponse } from './procedure.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Procedures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('procedures')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}

  @Post()
  @ApiOperation({ summary: 'Crear procedimiento' })
  @ApiResponse({ status: 201, description: 'Procedimiento creado' })
  @ApiResponse({ status: 409, description: 'El procedimiento ya existe' })
  create(@Body() dto: CreateProcedureRequest) {
    return this.procedureService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Buscar procedimientos por texto' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Texto de busqueda',
  })
  @ApiResponse({ status: 200, description: 'Resultados de busqueda' })
  findAll(@Query('search') search?: string) {
    if (!search) return [];

    return this.procedureService
      .search(search)
      .then((procedures) => procedures.map(procedureToResponse));
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener procedimiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del procedimiento' })
  @ApiResponse({ status: 200, description: 'Procedimiento encontrado' })
  @ApiResponse({ status: 404, description: 'Procedimiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const procedure = await this.procedureService.findOne(id);
    return procedureToResponse(procedure);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar procedimiento' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar procedimiento' })
  @ApiParam({ name: 'id', description: 'ID del procedimiento' })
  @ApiResponse({ status: 204, description: 'Procedimiento eliminado' })
  @ApiResponse({ status: 404, description: 'Procedimiento no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.procedureService.remove(id);
  }
}
