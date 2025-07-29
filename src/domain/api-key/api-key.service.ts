import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyLevelMap, CreateApiKeyPayload } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async getKeyPermissions(id: string) {
    const apiKey = await this.prismaService.api_key.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { permissions: apiKey.permissions, projectId: apiKey.projectId };
  }

  public createApiKey(payload: CreateApiKeyPayload) {
    return this.prismaService.api_key.create({
      data: {
        projectId: payload.projectId,
        permissions: payload.permissions,
      },
    });
  }
}
