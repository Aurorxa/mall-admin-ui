<template>
  <el-config-provider :locale="zhCn" :z-index="10000">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import {ElConfigProvider} from "element-plus"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

</script>

<style>
</style>
