import { Controller, Inject, Post, Req } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiKeyService } from '../api-key/api-key.service';
import { getApiKey } from '../utils/getApiKey';
import { api_key_level } from 'generated/prisma';

@Controller('device')
export class DeviceController {
  constructor(
    @Inject(DeviceService)
    private readonly deviceService: DeviceService,
    @Inject(ApiKeyService)
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @Post('/create')
  public async createDevice(@Req() request) {
    const apiKey = getApiKey(request);
    const { sensors } = request.body;

    const { permissions, projectId } =
      await this.apiKeyService.getKeyPermissions(apiKey);

    if (!permissions.includes(api_key_level.MANAGE)) {
      throw new Error('Not authorized to create device on this project.');
    }

    return this.deviceService.createDevice({
      projectId,
    });
  }
}
