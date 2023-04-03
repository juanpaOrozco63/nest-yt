import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV.trim()}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}