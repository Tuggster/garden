import { api_key_level } from 'generated/prisma';

export type CreateApiKeyPayload = {
  projectId: string;
  permissions: api_key_level[];
};

export const ApiKeyLevelMap = {
  [api_key_level.READ]: 0,
  [api_key_level.WRITE]: 0,
  [api_key_level.MANAGE]: 1,
} as const;
