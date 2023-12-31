<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import AlertInfo from '@/components/Alerts/AlertInfo.vue'
import { ref } from 'vue'
import TodoCreate from './TodoCreate.vue'
import TodoItem from './TodoItem.vue'
import PlusIcon from '../icons/PlusIcon.vue'
const { todos } = useTodosStore()
const createNewTodo = ref<boolean>(false)
</script>

<template>
  <main class="card shadow-xl bg-neutral">
    <div class="card-body">
      <TodoItem v-for="(todo, index) in todos" :todo="todo" :id="index" v-bind:key="index" />
      <TodoCreate v-if="createNewTodo" :create-done="() => (createNewTodo = false)" />
      <AlertInfo v-else-if="todos.length <= 0">
        You don't have anything todo yet.
        <template v-slot:btn>
          <button @click="createNewTodo = true" class="btn btn-primary">Create new</button>
        </template>
      </AlertInfo>
      <button
        @click="createNewTodo = true"
        class="btn text-xl"
        v-if="!createNewTodo && todos.length > 0"
      >
        <PlusIcon />
        Create new
      </button>
    </div>
  </main>
</template>
