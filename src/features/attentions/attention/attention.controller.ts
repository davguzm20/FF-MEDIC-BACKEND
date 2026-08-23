import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AttentionService } from './attention.service';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';
import {
  attentionToResponse,
  attentionToCompleteResponse,
} from './attention.mapper';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { Role } from '@auth/role/role.enum';
import { CurrentUser } from '@auth/jwt/decorators/current-user.decorator';

@ApiTags('Attentions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Doctor)
@Controller('attentions')
export class AttentionController {
  constructor(private attentionService: AttentionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear atencion medica' })
  @ApiResponse({ status: 201, description: 'Atencion creada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 404, description: 'Referencia no encontrada' })
  @ApiResponse({ status: 409, description: 'Conflicto de datos' })
  async create(
    @Body() dto: CreateCompleteAttentionRequest,
    @CurrentUser() currentUser: { userId: number },
  ) {
    const attention = await this.attentionService.create(
      dto,
      currentUser.userId,
    );
    return attentionToCompleteResponse(attention);
  }

  @Get()
  @ApiOperation({ summary: 'Listar atenciones' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Registros por página',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de atenciones' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.attentionService.findAll({ page, limit });
    return {
      data: result.data.map(attentionToResponse),
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener atencion por ID' })
  @ApiParam({ name: 'id', description: 'ID de la atencion' })
  @ApiResponse({ status: 200, description: 'Atencion encontrada' })
  @ApiResponse({ status: 404, description: 'Atencion no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const attention = await this.attentionService.findOne(id);
    return attentionToCompleteResponse(attention);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar atencion medica' })
  @ApiParam({ name: 'id', description: 'ID de la atencion' })
  @ApiResponse({ status: 200, description: 'Atencion actualizada' })
  @ApiResponse({ status: 404, description: 'Atencion no encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteAttentionRequest,
  ) {
    const attention = await this.attentionService.update(id, dto);
    return attentionToCompleteResponse(attention);
  }
}
