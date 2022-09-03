<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
  >
    <SidebarMenuItem />
  </el-menu>
</template>

<script setup lang="ts">
import SidebarMenuItem from '@/components/Sidebar/MenuItem/index.vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 菜单数据
const menuList = reactive([
  {
    path: '/dashboard',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'i-ep-s-Home',
      roles: ''
    }
  }
])

</script>

<style lang="scss">
.el-menu {
  height: 100%;
  border-right: 0;
  overflow: hidden;
}
</style>
