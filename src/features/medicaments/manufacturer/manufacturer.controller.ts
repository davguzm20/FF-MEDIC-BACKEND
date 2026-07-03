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
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerRequest } from './dtos/create-manufacturer.request';
import { UpdateManufacturerRequest } from './dtos/update-manufacturer.request';
import { manufacturerToResponse } from './manufacturer.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@ApiTags('Manufacturers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear fabricante — Roles: Admin' })
  @ApiResponse({ status: 201, description: 'Fabricante creado' })
  @ApiResponse({ status: 409, description: 'El fabricante ya existe' })
  create(@Body() dto: CreateManufacturerRequest) {
    return this.manufacturerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar fabricantes — Roles: Admin' })
  @ApiResponse({ status: 200, description: 'Lista de fabricantes' })
  findAll() {
    return this.manufacturerService
      .findAll()
      .then((manufacturers) => manufacturers.map(manufacturerToResponse));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener fabricante por ID — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del fabricante' })
  @ApiResponse({ status: 200, description: 'Fabricante encontrado' })
  @ApiResponse({ status: 404, description: 'Fabricante no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const manufacturer = await this.manufacturerService.findOne(id);
    return manufacturerToResponse(manufacturer);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar fabricante — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del fabricante' })
  @ApiResponse({ status: 200, description: 'Fabricante actualizado' })
  @ApiResponse({ status: 404, description: 'Fabricante no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateManufacturerRequest,
  ) {
    return this.manufacturerService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar fabricante — Roles: Admin' })
  @ApiParam({ name: 'id', description: 'ID del fabricante' })
  @ApiResponse({ status: 200, description: 'Fabricante eliminado' })
  @ApiResponse({ status: 404, description: 'Fabricante no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.manufacturerService.remove(id);
  }
}
