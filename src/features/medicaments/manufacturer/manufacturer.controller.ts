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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerRequest } from './dtos/create-manufacturer.request';
import { UpdateManufacturerRequest } from './dtos/update-manufacturer.request';
import { manufacturerToResponse } from './manufacturer.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Manufacturers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear fabricante' })
  @ApiResponse({ status: 201, description: 'Fabricante creado' })
  @ApiResponse({ status: 409, description: 'El fabricante ya existe' })
  create(@Body() dto: CreateManufacturerRequest) {
    return this.manufacturerService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Listar fabricantes' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de fabricantes' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.manufacturerService.findAll({ page, limit });
    return {
      data: result.data.map(manufacturerToResponse),
      meta: result.meta,
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener fabricante por ID' })
  @ApiParam({ name: 'id', description: 'ID del fabricante' })
  @ApiResponse({ status: 200, description: 'Fabricante encontrado' })
  @ApiResponse({ status: 404, description: 'Fabricante no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const manufacturer = await this.manufacturerService.findOne(id);
    return manufacturerToResponse(manufacturer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar fabricante' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar fabricante' })
  @ApiParam({ name: 'id', description: 'ID del fabricante' })
  @ApiResponse({ status: 204, description: 'Fabricante eliminado' })
  @ApiResponse({ status: 404, description: 'Fabricante no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.manufacturerService.remove(id);
  }
}
