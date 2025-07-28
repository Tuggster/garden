import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDevicePayload, SensorPayload } from './types';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async createDevice(
    payload: CreateDevicePayload,
    sensorIds?: string[],
  ) {
    const results = await this.prismaService.device.create({
      data: {
        projectId: payload.projectId,
      },
    });

    return results;
  }
}
