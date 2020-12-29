import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Todo} from '../../state/todo/todo.model';
import {TodoQuery} from '../../state/todo/todo.query';
import {TodoService} from '../../state/todo/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  todos$: Observable<Todo[]>;

  constructor(
    private fb: FormBuilder,
    private readonly todoQuery: TodoQuery,
    private readonly todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['']
    });
    this.todos$ = this.todoQuery.selectAll();
    this.todoService.get().subscribe();
  }

  onSubmit(): void {
    this.todoService.add(this.todoForm.value).subscribe();
    this.todoForm.reset();
  }

  onDeleteClick(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe();
  }
}
