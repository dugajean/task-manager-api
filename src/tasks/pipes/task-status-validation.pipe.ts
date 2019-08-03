import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException('Invalid status provided.');
    }

    return value;
  }

  private isStatusValid(status: any) {
    return Object.values(TaskStatus).includes(status);
  }
}
