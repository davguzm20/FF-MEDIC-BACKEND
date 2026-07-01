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
import { ActiveIngredientService } from './active-ingredient.service';
import { CreateActiveIngredientRequest } from './dtos/create-active-ingredient.request';
import { UpdateActiveIngredientRequest } from './dtos/update-active-ingredient.request';
import { activeIngredientToResponse } from './active-ingredient.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('active-ingredients')
export class ActiveIngredientController {
  constructor(private activeIngredientService: ActiveIngredientService) {}

  @Post()
  create(@Body() dto: CreateActiveIngredientRequest) {
    return this.activeIngredientService.create(dto);
  }

  @Get()
  findAll() {
    return this.activeIngredientService
      .findAll()
      .then((ingredients) => ingredients.map(activeIngredientToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const ingredient = await this.activeIngredientService.findOne(id);
    return activeIngredientToResponse(ingredient);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActiveIngredientRequest,
  ) {
    return this.activeIngredientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activeIngredientService.remove(id);
  }
}
