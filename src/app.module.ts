import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './domain/prisma/prisma.service';
import { ProjectModule } from './domain/project/project.module';
import { ApiKeyModule } from './domain/api-key/api-key.module';
import { DeviceModule } from './domain/device/device.module';

@Module({
  imports: [ProjectModule, ApiKeyModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
