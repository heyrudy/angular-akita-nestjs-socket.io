import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { Todo, TodoService } from './todo.service'

@Controller(
  'todos',
)
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
  ) {
  }

  @Get()
  getAll() {
    return this.todoService.getTodos()
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.addTodo(createTodoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Todo {
    return this.todoService.removeTodo(id)
  }
}
