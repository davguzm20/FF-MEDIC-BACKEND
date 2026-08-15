import { OpenAPIObject } from '@nestjs/swagger';
import { ApiReferenceOptions } from '@scalar/nestjs-api-reference';

export function scalarConfig(document: OpenAPIObject): ApiReferenceOptions & {
  orderSchemaPropertiesBy: 'preserve';
  orderRequiredPropertiesFirst: false;
} {
  return {
    spec: { content: document },
    orderSchemaPropertiesBy: 'preserve',
    orderRequiredPropertiesFirst: false,
  };
}
