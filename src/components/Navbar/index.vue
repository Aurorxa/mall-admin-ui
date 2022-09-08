<template>
  <el-row align="middle" style="height: 100%">
    <el-col :span="1">
      <el-icon :size="22" style="cursor: pointer" :class="icon"></el-icon>
    </el-col>
    <el-col :span="20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/'}">首页</el-breadcrumb-item>
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
      <el-tooltip
          class="box-item"
          effect="dark"
          content="全屏"
          placement="bottom"
      >
        <el-icon :class="[!isFullscreen ?'i-ep-full-screen':'i-ep-aim']" :size="20"
                 style="cursor: pointer" @click="toggle"></el-icon>
      </el-tooltip>
    </el-col>
    <el-col :span="2">
      <!-- 头像 -->
      <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <span class="el-dropdown-link" style="display: flex;justify-content: center;align-items: center">
          <el-avatar :size="50" shape="circle"
                     src="https://avatars.githubusercontent.com/u/25677587?s=400&u=49a02118ee2c72d9200af201976fcd2c95766455&v=4" />
          <span style="margin-left: 10px">许大仙</span>
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
  <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form
        ref="changePasswordFormRef"
        :model="changePasswordForm"
        :rules="changePasswordRules"
        label-width="120px"
    >
      <el-form-item prop="oldPassword" label="原密码">
        <el-input
            v-model="changePasswordForm.oldPassword"
            clearable
            placeholder="请输入原密码"
            show-password
        />
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input
            v-model="changePasswordForm.newPassword"
            clearable
            placeholder="请输入新密码"
            show-password
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认密码">
        <el-input
            v-model="changePasswordForm.confirmPassword"
            clearable
            placeholder="请输入确认密码"
            show-password
        />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup lang="ts">
import {useAdminStore} from "@/store/ums/admin"
import {useFullscreen} from '@vueuse/core'
import {useRoute, useRouter} from 'vue-router'
import {ElMessageBox} from "element-plus"
import {changePassword} from "@/api/ums/admin";
import UseChangePassword from '@/hooks/changePassword'

const {isFullscreen, toggle} = useFullscreen()
const adminStore = useAdminStore()
const router = useRouter()
const route = useRoute()
console.log('route.matched@@@', route.matched);

const {formDrawerRef, changePasswordForm, changePasswordFormRef, changePasswordRules, onSubmit} = UseChangePassword()

// 处理个人设置、修改密码、退出登录等逻辑
const icon = false ? 'i-ep-expand' : 'i-ep-fold'
const handleCommand = (command: string) => {
  // 个人设置
  if (command === 'settings') {
    // TODO 个人设置逻辑还没有写
  }
  // 修改密码
  if (command === 'changePassword') {
    formDrawerRef.value.open();
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
      // 跳转到登录页面
      await router.push('/login')

    }).catch(() => {

    })
  }
}


</script>

<style>

</style>
