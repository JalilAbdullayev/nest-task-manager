import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import Task from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import GetTasksFilterDto from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export default class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query: SelectQueryBuilder<Task> = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  async getTaskById(id: string): Promise<Task> {
    const found: Task = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    task.status = status;
    await this.save(task);
    return task;
  }
}
