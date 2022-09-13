<template>
  <el-row align="middle" style="height: 100%">
    <el-col :span="1">
      <el-icon :size="22" style="cursor: pointer" :class="sidebarOpened? 'i-ep-expand': 'i-ep-fold'"
               @click="toggleCollapse"></el-icon>
    </el-col>
    <el-col :span="16">
      <BreadCrumb></BreadCrumb>
    </el-col>
    <el-col :span="7" style="display:flex;justify-content: space-evenly;align-items: center">
      <!-- Search -->
      <HeaderSearch/>
      <!-- 全屏 -->
      <Fullscreen />
      <!-- 消息提示 -->
      <Badge/>
      <!-- 头像 -->
      <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <span class="el-dropdown-link"
              style="display: flex;justify-content: center;align-items: center;cursor: pointer">
          <el-avatar :size="25" shape="circle"
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
      <!-- 语言切换 -->
      <LangSelect />
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
import {ElMessageBox} from "element-plus"
import {changePassword} from "@/api/ums/admin";
import UseChangePassword from '@/hooks/changePassword'
import LangSelect from '@/components/LangSelect/index.vue'
import Fullscreen from '@/components/FullScreen/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Badge from '@/components/Badge/index.vue'
import {useSidebarStore} from "@/store/sidebar"
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import {useRouter} from "vue-router"
import {useTagsViewStore} from '@/store/tagsview'

const router = useRouter()
const adminStore = useAdminStore()
const sidebarStore = useSidebarStore()
const tagsViewStore = useTagsViewStore()

// 处理侧边栏展开和收缩
const {sidebarOpened} = storeToRefs(sidebarStore)

const toggleCollapse = () => {
  sidebarStore.toggleSidebarOpened()
}

// 修改密码 hooks
const {formDrawerRef, changePasswordForm, changePasswordFormRef, changePasswordRules, onSubmit} = UseChangePassword()
// 处理个人设置、修改密码、退出登录等逻辑
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
      // 触发清空 tagsView 动作
      await tagsViewStore.clear()
          // 跳转到登录页面
      await router.push('/login')

    }).catch(() => {

    })
  }
}


</script>

<style>

</style>
