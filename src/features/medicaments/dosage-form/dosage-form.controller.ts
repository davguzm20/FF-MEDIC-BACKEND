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
import { DosageFormService } from './dosage-form.service';
import { CreateDosageFormRequest } from './dtos/create-dosage-form.request';
import { UpdateDosageFormRequest } from './dtos/update-dosage-form.request';
import { dosageFormToResponse } from './dosage-form.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('dosage-forms')
export class DosageFormController {
  constructor(private dosageFormService: DosageFormService) {}

  @Post()
  create(@Body() dto: CreateDosageFormRequest) {
    return this.dosageFormService.create(dto);
  }

  @Get()
  findAll() {
    return this.dosageFormService
      .findAll()
      .then((dosageForms) => dosageForms.map(dosageFormToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const dosageForm = await this.dosageFormService.findOne(id);
    return dosageFormToResponse(dosageForm);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDosageFormRequest,
  ) {
    return this.dosageFormService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dosageFormService.remove(id);
  }
}
