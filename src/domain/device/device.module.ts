import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService, ApiKeyService],
})
export class DeviceModule {}
