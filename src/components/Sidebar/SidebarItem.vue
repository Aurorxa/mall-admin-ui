<template>
  <!-- 有子菜单 -->
  <el-sub-menu index="1" v-if="menu.children && menu.children.length > 0">
    <template #title>
      <el-icon :class="menu.icon"></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <SidebarItem v-for="item in menu.children" :menu="item"></SidebarItem>
  </el-sub-menu>
  <!-- 具体菜单项 -->
  <el-menu-item :index="menu.path" v-else>
    <el-icon :class="menu.icon"></el-icon>
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
const props = defineProps(['menu'])
</script>

<style>

</style>
