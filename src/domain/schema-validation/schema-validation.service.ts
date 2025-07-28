import { Injectable } from '@nestjs/common';
import Ajv, { ValidateFunction } from 'ajv';

@Injectable()
export class SchemaValidationService {
  private static validatorCache = new Map<string, ValidateFunction>();
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv();
  }

  public async getValidatorForSchemaByUrl(
    url: string,
  ): Promise<ValidateFunction> {
    const cachedValue = SchemaValidationService.validatorCache.get(url);

    if (cachedValue) {
      return cachedValue;
    }

    const response = await fetch(url);
    const validator = this.ajv.compile(response);

    SchemaValidationService.validatorCache.set(url, validator);
    return validator;
  }
}
