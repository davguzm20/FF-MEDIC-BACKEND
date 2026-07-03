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
import { ExamTypeService } from './exam-type.service';
import { CreateExamTypeRequest } from './dtos/create-exam-type.request';
import { UpdateExamTypeRequest } from './dtos/update-exam-type.request';
import { examTypeToResponse } from './exam-type.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin')
@Controller('exam-types')
export class ExamTypeController {
  constructor(private examTypeService: ExamTypeService) {}

  @Post()
  create(@Body() dto: CreateExamTypeRequest) {
    return this.examTypeService.create(dto);
  }

  @Roles('Admin', 'Doctor')
  @Get()
  findAll() {
    return this.examTypeService
      .findAll()
      .then((examTypes) => examTypes.map(examTypeToResponse));
  }

  @Roles('Admin', 'Doctor')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const examType = await this.examTypeService.findOne(id);
    return examTypeToResponse(examType);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExamTypeRequest,
  ) {
    return this.examTypeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examTypeService.remove(id);
  }
}
