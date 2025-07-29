import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';
import { SensorController } from './sensor.controller';

@Module({
  controllers: [SensorController],
  providers: [SensorService, PrismaService, ApiKeyService],
})
export class SensorModule {}
