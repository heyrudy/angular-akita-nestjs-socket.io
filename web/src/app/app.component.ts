import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { Todo } from './examples/state/todo/todo.model'
import { TodoQuery } from './examples/state/todo/todo.query'
import { TodoService } from './examples/state/todo/todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  readonly todos$: Observable<Todo[]>
  readonly todoForm

  constructor(
    fb: FormBuilder,
    private readonly todoService: TodoService,
    private readonly todoQuery: TodoQuery,
  ) {
    this.todos$ = this.todoQuery.selectAll()
    this.todoForm = fb.group({
      name: [''],
    })
  }

  ngOnInit(): void {
    this.todoService.get().subscribe()
  }

  onSubmit(): void {
    this.todoService.add(this.todoForm.value).subscribe()
    this.todoForm.reset()
  }

  onDeleteClick(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe()
  }
}
