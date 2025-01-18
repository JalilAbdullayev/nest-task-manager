import { Injectable, NotFoundException } from '@nestjs/common';
import TasksRepository from './tasks.repository';
import Task from './task.entity';

@Injectable()
export default class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const found: Task = await this.tasksRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Task with ID "${id}" not found`);
    return found;
  }
}
