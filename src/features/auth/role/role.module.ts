import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
