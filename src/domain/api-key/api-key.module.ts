import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyService } from './api-key.service';

@Module({
  providers: [PrismaService, ApiKeyService],
})
export class ApiKeyModule {}
