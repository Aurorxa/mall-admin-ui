<template>
  <SidebarHeader />
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="activeMenu"
      router
      :collapse-transition="false"
      text-color="#fff">
    <SidebarItem v-for="item in menuList" :menu="item" :key="item.id" />
  </el-menu>
</template>

<script setup lang="ts">
import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
import SidebarHeader from '@/components/SidebarHeader/index.vue'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
// 测试数据
const menuList = reactive([
  {
    id: '001',
    title: '首页',
    icon: 'i-ep-home-filled',
    path: '/',
    children: []
  },
  {
    id: '100',
    title: '系统设置',
    icon: 'i-ep-menu',
    path: '',
    children: [
      {
        id: '200',
        title: '用户管理',
        icon: 'i-ep-user',
        path: '',
        children: [
          {
            id: '201',
            title: '用户管理1',
            icon: 'i-ep-user',
            path: '/admin1',
          },
          {
            id: '202',
            title: '用户管理2',
            icon: 'i-ep-user',
            path: '/admin2',
          }
        ]
      },
      {
        id: '300',
        title: '角色管理',
        icon: 'i-ep-user',
        path: '/role'
      },
      {
        id: '400',
        title: '菜单管理',
        icon: 'i-ep-user',
        path: '/menu'
      },
    ]
  }
])
// 测试数据
const activeMenu = computed(() => {
  let {path} = useRoute()
  if (path === '/') {
    path = '/'
  }
  return path
})
</script>

<style lang="scss">
.el-menu {
  height: 100%;
  border-right: 0;
  overflow: hidden;
}
</style>
