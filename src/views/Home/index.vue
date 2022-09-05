<template>
  {{ $store.state.count }}
  <el-button @click="add">点我+1</el-button>
</template>

<script setup lang="ts">
const store = useStore()
const add = () => {
  store.commit('setCount', ++store.state.count)
}

</script>

<style>

</style>
