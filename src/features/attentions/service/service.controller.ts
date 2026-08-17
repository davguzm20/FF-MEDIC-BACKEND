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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceRequest } from './dtos/create-service.request';
import { UpdateServiceRequest } from './dtos/update-service.request';
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
  @ApiResponse({ status: 200, description: 'Lista de servicios' })
  findAll() {
    return this.serviceService
      .findAll()
      .then((services) => services.map(serviceToResponse));
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
