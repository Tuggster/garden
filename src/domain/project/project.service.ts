import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { ApiKeyService } from '../api-key/api-key.service';
import { api_key_level } from 'generated/prisma';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(ApiKeyService)
    private readonly apiKeyService: ApiKeyService,
  ) {}

  public async createProject(payload: CreateProjectPayload) {
    const results = await this.prismaService.project.create({
      data: {
        id: randomUUID(),
        name: payload.name,
      },
    });

    const apiKey = await this.apiKeyService.createApiKey({
      projectId: results.id,
      permissions: [
        api_key_level.READ,
        api_key_level.WRITE,
        api_key_level.MANAGE,
      ],
    });

    return { ...results, apiKey: apiKey.id };
  }
}
