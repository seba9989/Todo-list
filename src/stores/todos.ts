import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Todo = {
  title: string
  body: string
  isDone: boolean
}

export type NewTodo = Pick<Todo, 'title' | 'body'>

export type TodoErr = {
  title: boolean
  body: boolean
}

export const useTodosStore = defineStore(
  'todos',
  () => {
    // state
    const todos = ref<Todo[]>([])

    // actions
    function doneTodo(id: number) {
      todos.value[id].isDone = !todos.value[id].isDone
    }
    function createTodo(todo: NewTodo) {
      const err: TodoErr = {
        title: todo.title.length < 3,
        body: todo.body.length < 3
      }
      if (err.title || err.body) return err

      todos.value.push({
        ...todo,
        isDone: false
      })
    }
    function removeTodo(id: number) {
      todos.value.splice(id, 1)
    }
    function editTodo(id: number, todo: Todo) {
      const err: TodoErr = {
        title: todo.title.length < 3,
        body: todo.body.length < 3
      }
      if (err.title || err.body) return err

      todos.value[id] = todo
    }

    return { todos, doneTodo, createTodo, removeTodo, editTodo }
  },
  { persist: true }
)
