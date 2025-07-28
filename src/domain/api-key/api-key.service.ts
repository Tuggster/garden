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

  public async getKeyPermissions(
    id: string,
    projectId: string,
  ): Promise<api_key_level[]> {
    const apiKey = await this.prismaService.api_key.findFirstOrThrow({
      where: {
        id,
      },
    });

    if (apiKey.projectId !== projectId) {
      throw new Error('Key invalid for given project.');
    }

    return apiKey.permissions;
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
