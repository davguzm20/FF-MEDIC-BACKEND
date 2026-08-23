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
import { ServiceService } from './service.service';
import { CreateServiceRequest } from './dtos/create-service.request';
import { UpdateServiceRequest } from './dtos/update-service.request';
import { NormalizeQueryPipe } from '@common/pipes/normalize-query.pipe';
import { serviceToResponse } from './service.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Crear servicio' })
  @ApiResponse({ status: 201, description: 'Servicio creado' })
  @ApiResponse({ status: 409, description: 'El servicio ya existe' })
  create(@Body() dto: CreateServiceRequest) {
    return this.serviceService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Listar servicios' })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Búsqueda por nombre',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de servicios' })
  async findAll(
    @Query('q', new NormalizeQueryPipe()) q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    const result = await this.serviceService.findAll({ q, page, limit });
    return {
      data: result.data.map(serviceToResponse),
      meta: result.meta,
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener servicio por ID' })
  @ApiParam({ name: 'id', description: 'ID del servicio' })
  @ApiResponse({ status: 200, description: 'Servicio encontrado' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const service = await this.serviceService.findOne(id);
    return serviceToResponse(service);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar servicio' })
  @ApiParam({ name: 'id', description: 'ID del servicio' })
  @ApiResponse({ status: 200, description: 'Servicio actualizado' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceRequest,
  ) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar servicio' })
  @ApiParam({ name: 'id', description: 'ID del servicio' })
  @ApiResponse({ status: 204, description: 'Servicio eliminado' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.serviceService.remove(id);
  }
}
