import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterSensorPayload, RegisterSensorReadingPayload } from './types';
import { SchemaValidationService } from '../schema-validation/schema-validation.service';

type AddSensorReadingArgs = {
  sensorId: string;
  data: object;
};

@Injectable()
export class SensorService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async registerSensorForDevice(
    payload: RegisterSensorPayload & { projectId: string },
  ) {
    const results = this.prismaService.sensor.create({
      data: {
        parentDeviceId: payload.deviceId,
        info: payload.info,
        infoSchemaUrl: payload.infoSchemaUrl,
        readingSchemaUrl: payload.readingSchemaUrl,
      },
    });

    return results;
  }

  public async getSensorById(id: string) {
    return this.prismaService.sensor.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        parentDevice: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  public async addSensorReading(payload: AddSensorReadingArgs) {
    console.log(payload);

    return this.prismaService.reading.create({
      data: {
        data: payload.data,
        sensorId: payload.sensorId,
      },
    });
  }
}
