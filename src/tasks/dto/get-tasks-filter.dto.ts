import { TaskStatus } from '../task.model';

export default class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
