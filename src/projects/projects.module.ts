import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpCustomService } from 'src/providers/http/http.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsEntity } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectsEntity,UsersProjectsEntity]),
ProvidersModule],
  providers: [ProjectsService,UsersService,HttpCustomService],
  controllers: [ProjectsController]
})
export class ProjectsModule {
    
}
