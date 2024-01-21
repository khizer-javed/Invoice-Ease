import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { PORT } from './constants';

async function main() {
  console.log('STRIPE_KEY', process.env.STRIPE_KEY);
  console.log('DB_HOST', process.env.DB_HOST);
  console.log('DB_USERNAME', process.env.DB_USERNAME);
  console.log('DB_PASSWORD', process.env.DB_PASSWORD);
  console.log('DB_DATABASE', process.env.DB_DATABASE);
  console.log('DB_DIALECT', process.env.DB_DIALECT);
  console.log('DB_PORT', process.env.DB_PORT);
  console.log('DB_CLIENT', process.env.DB_CLIENT);

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use('/', express.static(join(__dirname, '..', 'public')));
  app.enableCors();
  await app.listen(PORT);
}
main();
