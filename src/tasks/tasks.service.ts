import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  tasks(filterDto: FilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getFiltered(filterDto, user);
  }

  async getById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  addNew(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createOne(createTaskDto, user);
  }

  async updateStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getById(id, user);
    task.status = status;
    await task.save();

    return task;
  }

  async deleteById(id: number, user: User): Promise<Task> {
    const task: Task = await this.getById(id, user);
    await this.taskRepository.remove(task);

    return task;
  }
}
