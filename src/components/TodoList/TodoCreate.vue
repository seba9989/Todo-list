<script setup lang="ts">
import { useTodosStore, type NewTodo, type TodoErr } from '@/stores/todos'
import { ref } from 'vue'

const { createDone } = defineProps<{ createDone(): void }>()

const { createTodo } = useTodosStore()

let err = ref<TodoErr>()
let newTodo = ref<NewTodo>({
  title: '',
  body: ''
})

const create = () => {
  err.value = createTodo(newTodo.value)

  if (!err.value?.title && !err.value?.body) createDone()
}
</script>

<template>
  <main class="card shadow-xl bg-base-200">
    <div class="card-body">
      <div class="flex justify-between card-title items-center w-full">
        <input
          type="text"
          class="input input-bordered max-w-full w-full sm:w-auto"
          :class="err?.title && 'input-error'"
          placeholder="Title..."
          v-model="newTodo.title"
        />
        <button @click="create()" class="btn btn-primary sm:flex hidden">Save</button>
      </div>
      <textarea
        class="textarea w-full textarea-bordered"
        :class="err?.body && 'textarea-error'"
        placeholder="Body..."
        v-model="newTodo.body"
      ></textarea>
      <button @click="create()" class="btn btn-primary flex sm:hidden">Save</button>
    </div>
  </main>
</template>
