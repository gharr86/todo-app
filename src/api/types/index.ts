export interface ToDoData {
  id: string
  title: string
  isDone: boolean
}

export interface AppData {
  data: ToDoData[]
}
