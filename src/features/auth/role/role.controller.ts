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
import { RoleService } from './role.service';
import { CreateRoleRequest } from './dtos/create-role.request';
import { UpdateRoleRequest } from './dtos/update-role.request';
import { roleToResponse } from './role.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleRequest) {
    return this.roleService.create(dto);
  }

  @Get()
  findAll() {
    return this.roleService
      .findAll()
      .then((roles) => roles.map(roleToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.findOne(id);
    return roleToResponse(role);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleRequest,
  ) {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
