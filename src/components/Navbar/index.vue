<template>
  <el-row align="middle" style="height: 100%">
    <el-col :span="1">
      <el-icon :size="22" style="cursor: pointer" :class="icon"></el-icon>
    </el-col>
    <el-col :span="20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/Home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>
          <div class="no-redirect">活动详情</div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="1">
      <el-icon class="i-ep-full-screen" :size="20" style="cursor: pointer"></el-icon>
    </el-col>
    <el-col :span="2">
      <!-- 头像 -->
      <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <span class="el-dropdown-link" style="display: flex;justify-content: center;align-items: center">
          <el-avatar :size="50" shape="circle"
                     src="https://avatars.githubusercontent.com/u/25677587?s=400&u=49a02118ee2c72d9200af201976fcd2c95766455&v=4" />
          <div style="margin-left: 10px">许大仙</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="settings">
              <el-icon class="i-ep-setting"></el-icon>
              个人设置
            </el-dropdown-item>
            <el-dropdown-item command="changePassword">
              <el-icon class="i-ep-unlock"></el-icon>
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <el-icon class="i-ep-switch-button"></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {useAdminStore} from "@/store/ums/admin"
import {useRouter} from 'vue-router'
import {ElMessageBox} from "element-plus";

const router = useRouter()

const adminStore = useAdminStore()
// 处理个人设置、修改密码、退出登录等逻辑
const icon = false ? 'i-ep-expand' : 'i-ep-fold'
const handleCommand = (command: string) => {
  // 个人设置
  if (command === 'settings') {
    // TODO 个人设置逻辑还没有写
  }
  // 修改密码
  if (command === 'changePassword') {
    // TODO 修改密码逻辑还没有写
  }
  // 退出登录
  if (command === 'logout') {
    ElMessageBox.confirm('确认退出登录吗？', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      autofocus: false
    }).then(async () => {
      // 触发退出登录操作
      await adminStore.logout()
      await router.push('/login')
    }).catch(() => {

    })
  }
}

</script>

<style>

</style>
