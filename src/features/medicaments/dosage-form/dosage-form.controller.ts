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
import { DosageFormService } from './dosage-form.service';
import { CreateDosageFormRequest } from './dtos/create-dosage-form.request';
import { UpdateDosageFormRequest } from './dtos/update-dosage-form.request';
import { dosageFormToResponse } from './dosage-form.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Dosage Forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('dosage-forms')
export class DosageFormController {
  constructor(private dosageFormService: DosageFormService) {}

  @Post()
  @ApiOperation({ summary: 'Crear forma farmaceutica' })
  @ApiResponse({ status: 201, description: 'Forma farmaceutica creada' })
  @ApiResponse({ status: 409, description: 'La forma farmaceutica ya existe' })
  create(@Body() dto: CreateDosageFormRequest) {
    return this.dosageFormService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Listar formas farmaceuticas' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de formas farmaceuticas',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.dosageFormService.findAll({ page, limit });
    return {
      data: result.data.map(dosageFormToResponse),
      meta: result.meta,
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener forma farmaceutica por ID' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 200, description: 'Forma farmaceutica encontrada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const dosageForm = await this.dosageFormService.findOne(id);
    return dosageFormToResponse(dosageForm);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar forma farmaceutica' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 200, description: 'Forma farmaceutica actualizada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDosageFormRequest,
  ) {
    return this.dosageFormService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar forma farmaceutica' })
  @ApiParam({ name: 'id', description: 'ID de la forma farmaceutica' })
  @ApiResponse({ status: 204, description: 'Forma farmaceutica eliminada' })
  @ApiResponse({ status: 404, description: 'Forma farmaceutica no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.dosageFormService.remove(id);
  }
}
