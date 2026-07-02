import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';
import { diagnosisToResponse } from './diagnosis.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('diagnoses')
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Post()
  create(@Body() dto: CreateDiagnosisRequest) {
    return this.diagnosisService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.diagnosisService
        .search(search)
        .then((diagnoses) => diagnoses.map(diagnosisToResponse));
    }

    return this.diagnosisService
      .findAll()
      .then((diagnoses) => diagnoses.map(diagnosisToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const diagnosis = await this.diagnosisService.findOne(id);
    return diagnosisToResponse(diagnosis);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDiagnosisRequest,
  ) {
    return this.diagnosisService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosisService.remove(id);
  }
}
