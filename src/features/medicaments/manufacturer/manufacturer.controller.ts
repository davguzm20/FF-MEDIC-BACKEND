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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerRequest } from './dtos/create-manufacturer.request';
import { UpdateManufacturerRequest } from './dtos/update-manufacturer.request';
import { manufacturerToResponse } from './manufacturer.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Post()
  create(@Body() dto: CreateManufacturerRequest) {
    return this.manufacturerService.create(dto);
  }

  @Get()
  findAll() {
    return this.manufacturerService
      .findAll()
      .then((manufacturers) => manufacturers.map(manufacturerToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const manufacturer = await this.manufacturerService.findOne(id);
    return manufacturerToResponse(manufacturer);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateManufacturerRequest,
  ) {
    return this.manufacturerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.manufacturerService.remove(id);
  }
}
