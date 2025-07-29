import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDevicePayload } from './types';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async getDevicesForProject(projectId: string) {
    return this.prismaService.device.findMany({
      where: {
        projectId,
      },
      include: {
        sensors: true,
      },
    });
  }

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
