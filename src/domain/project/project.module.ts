import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ApiKeyService } from '../api-key/api-key.service';

@Module({
  controllers: [ProjectController],
  providers: [PrismaService, ProjectService, ApiKeyService],
})
export class ProjectModule {}
