import { Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { SensorService } from './sensor.service';
import {
  GetSensorReadingsPayloadSchema,
  RegisterSensorPayloadSchema,
  RegisterSensorReadingSchema,
} from './types';
import { getApiKey } from '../utils/getApiKey';
import { ApiKeyService } from '../api-key/api-key.service';
import { api_key_level } from '@prisma/client';

@Controller('sensor')
export class SensorController {
  constructor(
    @Inject(SensorService)
    private readonly sensorService: SensorService,
    @Inject(ApiKeyService)
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @Post('/create')
  public async registerSensor(@Req() req) {
    const payload = RegisterSensorPayloadSchema.parse(req.body);
    const apiKey = getApiKey(req);
    const { permissions, projectId } =
      await this.apiKeyService.getKeyPermissions(apiKey);

    if (!permissions.includes(api_key_level.MANAGE)) {
      throw new Error('Not authorized.');
    }

    return this.sensorService.registerSensorForDevice({
      ...payload,
      projectId,
    });
  }

  @Get('readings')
  public async getSensorReadings(
    @Req() req,
    @Query() query: Record<string, string>,
  ) {
    const apiKey = getApiKey(req);
    const payload = GetSensorReadingsPayloadSchema.parse(query);
    const sensor = await this.sensorService.getSensorById(payload.sensorId);
    const sensorProjectId = sensor.parentDevice.projectId;

    const { permissions, projectId: keyProjectId } =
      await this.apiKeyService.getKeyPermissions(apiKey);

    if (sensorProjectId !== keyProjectId) {
      throw new Error('API Key not valid for this sensors project');
    }

    if (!permissions.includes(api_key_level.READ)) {
      throw new Error('No read permissions');
    }

    return this.sensorService.getReadingsForSensor(sensor.id);
  }

  @Post('addReading')
  public async addSensorReading(@Req() req) {
    const apiKey = getApiKey(req);
    const payload = RegisterSensorReadingSchema.parse(req.body);
    const sensor = await this.sensorService.getSensorById(payload.sensorId);
    const sensorProjectId = sensor.parentDevice.projectId;

    const { permissions, projectId: keyProjectId } =
      await this.apiKeyService.getKeyPermissions(apiKey);

    if (sensorProjectId !== keyProjectId) {
      throw new Error('API Key not valid for this sensors project');
    }

    if (!permissions.includes(api_key_level.WRITE)) {
      throw new Error('No write permissions');
    }

    // TODO: Validate schema.
    return this.sensorService.addSensorReading(payload);
  }
}
