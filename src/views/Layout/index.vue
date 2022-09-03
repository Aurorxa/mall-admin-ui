<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width="200px" class="aside">
      <SideBar />
    </el-aside>
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <Navbar />
      </el-header>
      <!-- 内容区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from '@/components/Sidebar/index.vue'
import Navbar from '@/components/Navbar/index.vue'</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;

  .aside {
    height: 100%;
    background-color: pink;
  }

  el-aside {
    height: 100%;
  }

  .header {
    border-bottom: 1px solid #ccc;
  }

  .main {
    //background-color: skyblue;
  }
}
</style>
