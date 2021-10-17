import { Todo } from './todo.model'
import { Injectable } from '@angular/core'
import { NgEntityService } from '@datorama/akita-ng-entity-service'
import { TodoSocket } from './todo.socket'
import { TodoState, TodoStore } from './todo.store'

@Injectable({
  providedIn: 'root',
})
export class TodoService extends NgEntityService<TodoState> {

  constructor(
    protected store: TodoStore,
    private readonly todoSocket: TodoSocket,
  ) {
    super(store)
    this.todoSocket.on('onAdd', (event: { todo: Todo }) => this.store.add(event.todo))
    this.todoSocket.on('onRemove', (event: { todo: Todo }) => this.store.remove(event.todo.id))
  }
}
