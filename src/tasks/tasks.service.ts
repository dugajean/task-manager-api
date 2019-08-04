import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  tasks(filterDto: FilterDto): Promise<Task[]> {
    return this.taskRepository.getFiltered(filterDto);
  }

  async getById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  addNew(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createOne(createTaskDto);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id);
    task.status = status;
    await task.save();

    return task;
  }

  async deleteById(id: number): Promise<Task> {
    const task: Task = await this.getById(id);
    await this.taskRepository.remove(task);

    return task;
  }
}
