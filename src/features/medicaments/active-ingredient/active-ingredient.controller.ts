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
import { ActiveIngredientService } from './active-ingredient.service';
import { CreateActiveIngredientRequest } from './dtos/create-active-ingredient.request';
import { UpdateActiveIngredientRequest } from './dtos/update-active-ingredient.request';
import { activeIngredientToResponse } from './active-ingredient.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';

@ApiTags('Active Ingredients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('active-ingredients')
export class ActiveIngredientController {
  constructor(private activeIngredientService: ActiveIngredientService) {}

  @Post()
  @ApiOperation({ summary: 'Crear principio activo' })
  @ApiResponse({ status: 201, description: 'Principio activo creado' })
  @ApiResponse({ status: 409, description: 'El principio activo ya existe' })
  create(@Body() dto: CreateActiveIngredientRequest) {
    return this.activeIngredientService.create(dto);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get()
  @ApiOperation({ summary: 'Listar principios activos' })
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
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de principios activos',
  })
  async findAll(
    @Query('q') q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    const result = await this.activeIngredientService.findAll({
      q,
      page,
      limit,
    });
    return {
      data: result.data.map(activeIngredientToResponse),
      meta: result.meta,
    };
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener principio activo por ID' })
  @ApiParam({ name: 'id', description: 'ID del principio activo' })
  @ApiResponse({ status: 200, description: 'Principio activo encontrado' })
  @ApiResponse({ status: 404, description: 'Principio activo no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const ingredient = await this.activeIngredientService.findOne(id);
    return activeIngredientToResponse(ingredient);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar principio activo' })
  @ApiParam({ name: 'id', description: 'ID del principio activo' })
  @ApiResponse({ status: 200, description: 'Principio activo actualizado' })
  @ApiResponse({ status: 404, description: 'Principio activo no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActiveIngredientRequest,
  ) {
    return this.activeIngredientService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar principio activo' })
  @ApiParam({ name: 'id', description: 'ID del principio activo' })
  @ApiResponse({ status: 204, description: 'Principio activo eliminado' })
  @ApiResponse({ status: 404, description: 'Principio activo no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.activeIngredientService.remove(id);
  }
}
