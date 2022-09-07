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
  <el-drawer
      v-model="showDrawer"
      title="修改密码"
      direction="rtl"
      size="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="bg-light-50 !flex items-center justify-center"
  >
    <!--  class="bg-light-50 !flex items-center justify-center flex-col" -->
    <el-form
        ref="changePasswordFormRef"
        :model="changePasswordForm"
        :rules="changePasswordRules"
        :label-position="right"
        label-width="120px"
    >
      <!-- 原密码 -->
      <el-form-item prop="oldPassword" label="原密码">
        <el-input
            v-model="changePasswordForm.oldPassword"
            clearable
            placeholder="请输入原密码"
            show-password
        />
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item prop="newPassword" label="新密码">
        <el-input
            v-model="changePasswordForm.newPassword"
            clearable
            placeholder="请输入新密码"
            show-password
        />
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="confirmPassword" label="确认密码">
        <el-input
            v-model="changePasswordForm.confirmPassword"
            clearable
            placeholder="请输入确认密码"
            show-password
        />
      </el-form-item>
      <!-- 登录 -->
      <el-form-item>
        <!-- class="w-full" -->
        <el-button :loading="loading" type="primary" @click="onSubmit()">确认</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import {useAdminStore} from "@/store/ums/admin"
import {useFullscreen} from '@vueuse/core'
import {useRouter} from 'vue-router'
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus"
import {ChangePasswordFormType} from "@/types/ums/admin";

const router = useRouter()
const {isFullscreen, toggle} = useFullscreen()
const adminStore = useAdminStore()


const showDrawer = ref<boolean>(false)

const changePasswordFormRef = ref<FormInstance>()

const changePasswordForm: ChangePasswordFormType = reactive<ChangePasswordFormType>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码为必填项'))
  } else if (value !== changePasswordForm.newPassword) {
    callback(new Error("新密码和确认密码需要一样"))
  } else {
    callback()
  }
}

// 验证规则
const changePasswordRules = reactive<FormRules>({
  oldPassword: [
    {
      required: true, message: '原密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  newPassword: [
    {
      required: true, message: '新密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  confirmPassword: [
    {
      required: true, message: '确认密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    },
    {
      validator: validateConfirmPassword, trigger: 'blur'
    }
  ],
})

// 处理修改密码
const loading = ref<boolean>(false)

const onSubmit = () => {
  // 进行表单验证
  changePasswordFormRef.value?.validate(async valid => {
    if (!valid) { // 如果表单验证失败，就返回 false
      return false
    } else {
      try {
        loading.value = true
        // 触发修改密码动作
        // 提示登录成功
        ElMessage({
          message: '修改密码成功',
          type: 'success',
          center: true,
          duration: 1000
        })
        loading.value = false
        // 触发退出登录操作
        await adminStore.logout()
        await router.push('/login')
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }
  })
}


// 处理个人设置、修改密码、退出登录等逻辑
const icon = false ? 'i-ep-expand' : 'i-ep-fold'
const handleCommand = (command: string) => {
  // 个人设置
  if (command === 'settings') {
    // TODO 个人设置逻辑还没有写
  }
  // 修改密码
  if (command === 'changePassword') {
    showDrawer.value = true


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
