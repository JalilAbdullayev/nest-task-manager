import { DataSource, Repository } from 'typeorm';
import Task from './task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
