import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filter/http.exception-filter';
import {
  ENV_DB_SCHEMA_KEY,
  ENV_SERVER_PORT_KEY,
  ENV_SYNCHRONIZE_KEY,
  ENV_KEEPCONNECTIONALIVE_KEY,
  SERVER_DESC_KEY,
  //LOGGING,
} from './common/const/env-keys.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env[ENV_SERVER_PORT_KEY];
  const SCHEMA = process.env[ENV_DB_SCHEMA_KEY];
  const SYNCHRONIZE = process.env[ENV_SYNCHRONIZE_KEY];
  const KEEPCONNECTIONALIVE = process.env[ENV_KEEPCONNECTIONALIVE_KEY];
  const SERVERDESC = process.env[SERVER_DESC_KEY];
  //const LOGGING = process.env[LOGGING];

  await app.listen(PORT);
  const text =
    'PORT: ' +
    PORT +
    ' / ' +
    'SCHEMA: ' +
    SCHEMA +
    ' / ' +
    // 'LOGGING: ' +
    // LOGGING +
    ' / ' +
    'SYNCHRONIZE: ' +
    SYNCHRONIZE +
    ' / ' +
    'KEEPCONNECTIONALIVE: ' +
    KEEPCONNECTIONALIVE +
    ' / ' +
    'SERVERDESC: ' +
    SERVERDESC +
    ' / ';

  console.log(
    '*********************************************************************************************************',
  );
  console.log(text);
  console.log(
    '*********************************************************************************************************',
  );
}
bootstrap();
