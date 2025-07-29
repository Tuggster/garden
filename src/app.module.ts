import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './domain/prisma/prisma.service';
import { ProjectModule } from './domain/project/project.module';
import { ApiKeyModule } from './domain/api-key/api-key.module';
import { DeviceModule } from './domain/device/device.module';
import { SchemaValidationModule } from './domain/schema-validation/schema-validation.module';
import { SensorModule } from './domain/sensor/sensor.module';

@Module({
  imports: [
    ProjectModule,
    ApiKeyModule,
    DeviceModule,
    SchemaValidationModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
