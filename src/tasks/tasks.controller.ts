import { Controller, Get, Param } from '@nestjs/common';
import TasksService from './tasks.service';
import Task from './task.entity';

@Controller('tasks')
export default class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
}
