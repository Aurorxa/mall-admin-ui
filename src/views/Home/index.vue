<template>
  <el-button @click="add">点我+1</el-button>
  <p>{{ $t("message.test") }}</p>
</template>

<script lang="ts" setup>
import {test} from "@/api/ums/admin";

const add = async () => {
  await test()
}
</script>

<style>

</style>
