import { Injectable } from '@nestjs/common';
import TasksRepository from './tasks.repository';
import Task from './task.entity';
import CreateTaskDto from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import GetTasksFilterDto from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export default class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status, user);
  }
}
