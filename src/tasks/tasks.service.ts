import { Injectable } from '@nestjs/common';
import TasksRepository from './tasks.repository';
import Task from './task.entity';
import CreateTaskDto from './dto/create-task.dto';

@Injectable()
export default class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }
}
