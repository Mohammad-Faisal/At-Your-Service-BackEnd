import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './middlewares/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn'],
  });

  const configService = app.get(ConfigService);


  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('')
    .setVersion('1.0')
    //.addTag('rokkhi-home')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true}));
  app.enableCors();


  console.log('the port is   ' , configService.get('PORT'))

  await app.listen(configService.get('PORT'));
}

function initializeFirebaseAdmin (configService) {

  const adminConfig: ServiceAccount = {
    "projectId": configService.get('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    "clientEmail": configService.get('FIREBASE_CLIENT_EMAIL'),
  }

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: configService.get('FIREBASE_DATABASE_URL')
  });
}

bootstrap();
