<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="!flex items-center justify-center flex-col bg-img">
      <div class="font-bold text-5xl text-light-50 mb-4 select-none">商城后台系统</div>
      <div class="text-2xl text-light-blue-400 mb-2">
        《基于 Vite + Vue3.x + Element Plus + Windi css + pinia 等技术开发》
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="bg-light-50 !flex items-center justify-center flex-col">
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
      >
        <!-- logo -->
        <el-row style="text-align: center">
          <el-col>
            <el-form-item style="display: inline-block">
              <img alt="" class="w-20" src="@/assets/logo.png">
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              clearable
              placeholder="请输入用户名"
              prefix-icon="i-ep-avatar"
              style="width: 250px" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              clearable
              placeholder="请输入密码"
              prefix-icon="i-ep-lock"
              show-password
              style="width: 250px" />
        </el-form-item>
        <!-- 同意协议 -->
        <el-form-item prop="agree">
          <el-checkbox
              v-model="loginForm.agree">
            我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button :loading="loading" class="w-full" type="primary" @click="onSubmit(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import type {FormInstance, FormRules} from "element-plus"
import type {loginFormType} from '@/utils/ums/admin'

const router = useRouter()

const loginFormRef = ref<FormInstance>()

const loginForm: loginFormType = reactive<loginFormType>({
  username: 'admin', // 用户名
  password: '123456', // 密码
  agree: true // 是否同意协议
})

// 自定义验证规则
const validateAgree = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('同意协议没有选中'))
  } else {
    callback()
  }
}

// 验证规则
const loginRules = reactive<FormRules>({
  username: [
    {
      required: true, message: '用户名为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  password: [
    {
      required: true, message: '密码为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  agree: [
    {
      validator: validateAgree, trigger: 'change'
    }
  ]
})

// 处理登录
const loading = ref<boolean>(false)

const onSubmit = async (formEl: FormInstance | undefined) => {
  // 如果没有传递 ref ，就返回 false
  if (!formEl) {
    return false
  }
  // 进行表单验证
  await formEl.validate(async valid => {
    if (!valid) { // 如果表单验证失败，就返回 false
      return false
    } else {
      // 开启 loading 效果
      loading.value = true
      try {
        // 触发登录动作
        // store.dispatch('user/login', loginForm)
        // 关闭 loading 效果
        router.push('/')
        loading.value = false
      } catch (e) {
        // 关闭 loading 效果
        loading.value = false
      }
    }
  })
}

</script>

<style lang="scss" scoped>

.login-container {
  @apply min-h-screen;
}

.bg-img {
  background: url("@/assets/login_bg.jpg") no-repeat;
}
</style>
