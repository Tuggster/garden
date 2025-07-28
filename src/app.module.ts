import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './domain/prisma/prisma.service';
import { ProjectModule } from './domain/project/project.module';
import { ApiKeyModule } from './domain/api-key/api-key.module';

@Module({
  imports: [ProjectModule, ApiKeyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
