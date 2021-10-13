export interface ToDoData {
  id: string
  title: string
  isDone: boolean
}

export interface AddToDoModalSlice {
  isOpen: boolean
}

export interface ToDoListSlice {
  data: ToDoData[]
  status: 'idle' | 'fetching' | 'success' | 'error'
}

export interface State {
  toDoList: ToDoListSlice
  addToDoModal: AddToDoModalSlice
}
