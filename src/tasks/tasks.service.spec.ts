import TasksService from './tasks.service';
import TasksRepository from './tasks.repository';
import { Test, TestingModule } from '@nestjs/testing';
import Task from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser: User = {
  id: 'someId',
  username: 'user',
  password: 'password',
  tasks: [],
};

describe('TasksService', (): void => {
  let tasksService: TasksService;
  let tasksRepository: jest.Mocked<TasksRepository>;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', (): void => {
    it('calls TasksRepository.getTasks and returns the result', async (): Promise<void> => {
      tasksRepository.getTasks.mockResolvedValue([]);
      const result: Task[] = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual([]);
    });
  });

  describe('getTaskById', (): void => {
    it('calls TasksRepository.findOne and returns the result', async (): Promise<void> => {
      const mockTask: Task = {
        id: 'someId',
        title: 'Test',
        description: 'Test',
        status: TaskStatus.OPEN,
        user: mockUser,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result: Task = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.findOne and handles an error', async (): Promise<void> => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).toBeUndefined();
    });
  });
});
