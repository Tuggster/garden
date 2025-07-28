import { Module } from '@nestjs/common';
import { SchemaValidationService } from './schema-validation.service';

@Module({
  providers: [SchemaValidationService],
})
export class SchemaValidationModule {}
