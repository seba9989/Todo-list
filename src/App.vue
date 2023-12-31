<script setup lang="ts">
import HeaderTitle from './components/Header/HeaderTitle.vue'
import TodoList from './components/TodoList/TodoList.vue'
</script>

<template>
  <main class="flex flex-col items-center m-auto py-4 gap-4">
    <HeaderTitle />
    <TodoList />
  </main>
</template>

<style scoped>
main {
  max-width: calc(100% - 2rem);
  width: 800px;
}
</style>
