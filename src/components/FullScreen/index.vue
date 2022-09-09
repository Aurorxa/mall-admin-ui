<template>
  <el-tooltip
      class="box-item"
      effect="dark"
      content="全屏"
      placement="bottom"
  >
    <el-icon :class="[!isFullscreen ?'i-ant-design-expand-outlined':'i-ant-design-expand-alt-outlined']" :size="20"
             style="cursor: pointer" @click="toggle"></el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import {useFullscreen} from "@vueuse/core";

const {isFullscreen, toggle} = useFullscreen()
</script>

<style>

</style>
