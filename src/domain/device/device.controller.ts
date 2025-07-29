import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiKeyService } from '../api-key/api-key.service';
import { getApiKey } from '../utils/getApiKey';
import { api_key_level } from '@prisma/client';

@Controller('device')
export class DeviceController {
  constructor(
    @Inject(DeviceService)
    private readonly deviceService: DeviceService,
    @Inject(ApiKeyService)
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @Get('/forProject')
  public async getDevicesForProject(@Req() request) {
    const apiKey = getApiKey(request);
    const { permissions, projectId } =
      await this.apiKeyService.getKeyPermissions(apiKey);

    if (!permissions.includes(api_key_level.READ)) {
      throw new Error('Not authorized to create device on this project.');
    }

    return this.deviceService.getDevicesForProject(projectId);
  }

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
