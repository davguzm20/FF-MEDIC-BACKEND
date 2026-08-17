import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { HttpStatus, HttpException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { envConfig } from './config/env.config';
import { scalarConfig } from './config/scalar.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => {
        const messages = errors.map((e) =>
          Object.values(e.constraints ?? {}).join('; '),
        );
        return new HttpException(
          {
            title: 'Validation Error',
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            detail: messages.join('; '),
            errorCode: 'VALIDATION_ERROR',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      },
    }),
  );

  const { port } = envConfig();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('F&F-MEDIC API')
    .setDescription('API del Sistema de Consultorio Médico F&F-MEDIC')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Swagger UI
  SwaggerModule.setup('api/docs/swaggerui', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      filter: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      defaultModelRendering: 'model',
    },
    customSiteTitle: 'F&F-MEDIC API Docs',
  });

  // Scalar
  app.use('/api/docs/scalar', apiReference(scalarConfig(document)));

  await app.listen(port);
}
bootstrap().catch(console.error);
