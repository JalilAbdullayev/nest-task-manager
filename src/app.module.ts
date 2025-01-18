import { Module } from '@nestjs/common';
import TasksModule from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest-task-manager',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export default class AppModule {}
