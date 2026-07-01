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
import { PatientService } from './patient.service';
import { CreateCompletePatientRequest } from './dtos/create-complete-patient.request';
import { UpdateCompletePatientRequest } from './dtos/update-complete-patient.request';
import { patientToResponse } from './patient.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  create(@Body() dto: CreateCompletePatientRequest) {
    return this.patientService.create(dto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll()
      .then((patients) => patients.map(patientToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.findOne(id);
    return patientToResponse(patient);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompletePatientRequest,
  ) {
    return this.patientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}
