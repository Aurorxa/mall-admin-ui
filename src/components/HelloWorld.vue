<template>
  <div>{{ count }}</div>
  <button @click="add"> 点我+1 </button>
  <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import {useStore} from "vuex"

const store = useStore()

const count = ref(store.getters.getCount)

const add = () => {
  store.commit('setCount', ++count.value)
}

</script>

<style scoped>

</style>
