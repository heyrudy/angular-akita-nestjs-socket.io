export interface Todo {
  id?: string;
  name: string;
}

export function createTodo(): Todo {
  return {
    name: '',
  }
}
