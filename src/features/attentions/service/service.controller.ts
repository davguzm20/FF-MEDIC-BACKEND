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
import { ServiceService } from './service.service';
import { CreateServiceRequest } from './dtos/create-service.request';
import { UpdateServiceRequest } from './dtos/update-service.request';
import { serviceToResponse } from './service.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  create(@Body() dto: CreateServiceRequest) {
    return this.serviceService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  findAll() {
    return this.serviceService
      .findAll()
      .then((services) => services.map(serviceToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const service = await this.serviceService.findOne(id);
    return serviceToResponse(service);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceRequest,
  ) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.remove(id);
  }
}
