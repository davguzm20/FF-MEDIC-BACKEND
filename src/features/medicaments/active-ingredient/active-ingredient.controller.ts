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

@ApiTags('Active Ingredients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
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

  @Roles('Admin', 'Doctor')
  @Get()
  @ApiOperation({ summary: 'Buscar principios activos por texto' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Texto de busqueda',
  })
  @ApiResponse({ status: 200, description: 'Resultados de busqueda' })
  findAll(@Query('search') search?: string) {
    if (!search) return [];

    return this.activeIngredientService
      .search(search)
      .then((ingredients) => ingredients.map(activeIngredientToResponse));
  }

  @Roles('Admin', 'Doctor')
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
  @ApiOperation({ summary: 'Eliminar principio activo' })
  @ApiParam({ name: 'id', description: 'ID del principio activo' })
  @ApiResponse({ status: 200, description: 'Principio activo eliminado' })
  @ApiResponse({ status: 404, description: 'Principio activo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activeIngredientService.remove(id);
  }
}
