import {Injectable} from '@nestjs/common';
import uuid from 'uuid';
import {TodoGateway} from './todo.gateway';

export class Todo {
  id: string;
  name: string;
}

type NullableTodo = Todo | null;

@Injectable()
export class TodoService {

  private todos: Todo[] = [];

  constructor(
    private readonly todoGateway: TodoGateway
  ) {
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }

  addTodo(todo: Partial<Todo>): Todo {
    const newTodo = {id: uuid.v4(), name: todo.name};
    this.todos.push(newTodo);
    this.todoGateway.onAddTodo(newTodo);
    return newTodo;
  }

  removeTodo(id: string): NullableTodo {
    const index = this.todos.findIndex((todo: Todo) => todo.id === id);

    if (index !== -1) {
      const todo = this.todos.splice(index, 1).pop();
      this.todoGateway.onRemoveTodo(todo);
      return todo;
    }

    return null;
  }
}
