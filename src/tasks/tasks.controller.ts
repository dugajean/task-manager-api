import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // index(@Query(ValidationPipe) filterDto: FilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.filter(filterDto);
  //   }

  //   return this.tasksService.all;
  // }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // create(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.addNew(createTaskDto);
  // }

  // @Patch(':id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateStatus(id, status);
  // }

  // @Delete(':id')
  // destroy(@Param('id') id: string): void {
  //   this.tasksService.deleteById(id);
  // }
}
