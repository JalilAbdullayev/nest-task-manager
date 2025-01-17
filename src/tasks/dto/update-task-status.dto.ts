import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';

export default class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
