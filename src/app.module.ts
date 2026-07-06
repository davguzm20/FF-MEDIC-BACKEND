import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './features/auth/auth.module';
import { PatientsModule } from './features/patients/patients.module';
import { MedicamentsModule } from './features/medicaments/medicaments.module';
import { AttentionsModule } from './features/attentions/attentions.module';
import { OrdersModule } from './features/orders/orders.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    AuthModule,
    PatientsModule,
    MedicamentsModule,
    AttentionsModule,
    OrdersModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
