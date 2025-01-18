import { Injectable } from '@nestjs/common';
import TasksRepository from './tasks.repository';
import Task from './task.entity';
import CreateTaskDto from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import GetTasksFilterDto from './dto/get-tasks-filter.dto';

@Injectable()
export default class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status);
  }
}
