import z from 'zod';

export const RegisterSensorPayloadSchema = z.object({
  deviceId: z.string(),
  readingSchemaUrl: z.url(),
  info: z.any(),
  infoSchemaUrl: z.url(),
});

export type RegisterSensorPayload = z.infer<typeof RegisterSensorPayloadSchema>;

export const RegisterSensorReadingSchema = z.object({
  sensorId: z.string(),
  data: z.any(),
});

export type RegisterSensorReadingPayload = z.infer<
  typeof RegisterSensorReadingSchema
>;
