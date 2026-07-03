import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './features/auth/auth.module';
import { PatientsModule } from './features/patients/patients.module';
import { MedicamentsModule } from './features/medicaments/medicaments.module';
import { AttentionsModule } from './features/attentions/attentions.module';
import { OrdersModule } from './features/orders/orders.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
