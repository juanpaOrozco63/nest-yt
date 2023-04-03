import { ConfigService } from '@nestjs/config/dist';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // morgan es una libreria que nos permite logs al momento de consumir endpoints
  app.use(morgan('dev'))

  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  // Esto me permite implementar la libreria de class transform
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  const configService = app.get(ConfigService);  

  // con esta propiedad se configura los cors del proyecto
  app.enableCors(CORS)
  // con esta propiedad se configura el proyecto para colocar el prefijo global de los endpoints
  app.setGlobalPrefix('api')
  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`);
  
}
bootstrap();
