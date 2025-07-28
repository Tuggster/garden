import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyLevelMap, CreateApiKeyPayload } from './types';
import { PrismaService } from '../prisma/prisma.service';
import { api_key_level } from 'generated/prisma';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async getKeyPermissions(id: string): Promise<api_key_level> {
    const apiKey = await this.prismaService.api_key.findFirstOrThrow({
      where: {
        id,
      },
    });

    const highestPermission = apiKey.permissions
      .sort((a, b) => {
        return ApiKeyLevelMap[b] - ApiKeyLevelMap[a];
      })
      .at(0);

    if (!highestPermission) {
      throw new Error('No permissions for given key');
    }

    return highestPermission;
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
