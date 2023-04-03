import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // morgan es una libreria que nos permite logs al momento de consumir endpoints
  app.use(morgan('dev'))

  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  const configService = app.get(ConfigService);  

  // con esta propiedad se configura los cors del proyecto
  app.enableCors(CORS)
  // con esta propiedad se configura el proyecto para colocar el prefijo global de los endpoints
  app.setGlobalPrefix('api')
  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`);
  
}
bootstrap();
