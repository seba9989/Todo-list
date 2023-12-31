<script setup lang="ts">
import type { Todo, TodoErr } from '@/stores/todos'
import { useTodosStore } from '@/stores/todos'
import { ref } from 'vue'

const { doneTodo, removeTodo, editTodo } = useTodosStore()

const { todo, id } = defineProps<{ todo: Todo; id: number }>()

let editingTodo = ref<Todo>({
  title: '',
  body: '',
  isDone: false
})
let isEditing = ref<boolean>(false)
let err = ref<TodoErr>()

const startEditing = () => {
  editingTodo.value = todo
  isEditing.value = true
}

const save = () => {
  err.value = editTodo(id, editingTodo.value)
  if (err.value === undefined) isEditing.value = false
}
</script>

<template>
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="todo" />
    <div class="collapse-title text-xl font-medium decoration-2 flex">
      <input
        type="text"
        class="input input-bordered w-1/2 z-10"
        :class="err?.title && 'input-error'"
        v-if="isEditing"
        v-model="editingTodo.title"
      />
      <p :class="todo.isDone && 'line-through'" v-else>
        {{ todo.title }}
      </p>
    </div>
    <div class="collapse-content flex flex-col gap-3">
      <textarea
        class="textarea textarea-bordered"
        :class="err?.body && 'textarea-error'"
        v-if="isEditing"
        v-model="editingTodo.body"
      />
      <p :class="todo.isDone && 'line-through'" v-else>{{ todo.body }}</p>

      <button @click="save()" class="btn btn-primary" v-if="isEditing">Save</button>
      <div class="gap-4 grid grid-flow-row sm:flex sm:justify-end" v-else>
        <button @click="doneTodo(id)" class="btn btn-success">Done</button>
        <button @click="removeTodo(id)" class="btn btn-error">Delete</button>
        <button @click="startEditing()" class="btn btn-primary w-m">Edit</button>
      </div>
    </div>
  </div>
</template>
