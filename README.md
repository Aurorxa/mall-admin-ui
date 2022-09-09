# 第一章：国际化

## 1.1 国际化原理

* 需求：
  * 有一个变量 msg ，但是这个 msg 有且只能有两个值：
    * ① hello world 
    * ② 你好，世界
  * 要求根据需要切换 msg 的值。



* 示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Title</title>
</head>
<body>
    <script>
        // ① 定义 msg 值的数据源
        const message = {
            en: {
                msg: 'hello world'
            },
            zh: {
                msg: '你好，世界'
            }
        }

        // ② 定义切换变量
        let locale = 'en'

        // ③ 定义赋值函数
        function t(key){
            return message[locale][key]
        }

        // ④ 为 msg 赋值
        const result = t('msg');
        console.log(result)

    </script>
</body>
</html>
```

## 1.2 vue-i18n

* Vue 3.x 的 vue-i18n 的适配版本是 9.x 。


* 下载：

```shell
yarn add vue-i18n@9
```

* 使用步骤：
  * ① 创建 messages 数据源。
  * ② 创建 locale 语言变量。
  * ③ 初始化 i18n 实例。
  * ④ 注册 i18n 实例。


* 示例：
* 在 i18n 目录中新建 lang 目录，并新建 zh.ts 和 en.ts ：

```tsx
// zh.ts
export default {
    login: {
        title: '用户登录',
        loginBtn: '登录'
    },
    app: {
        title: '商城后台系统'
    }
}
```

```tsx
// en.ts
export default {
    login: {
        title: 'User Login',
        loginBtn: 'Login'
    },
    app: {
        title: 'Mall Back System'
    }
}
```

* 在 i18n/index.ts 中创建 message 数据源，创建 locale 语言变量，初始化 i18n 实例：

```tsx
import {createI18n} from 'vue-i18n'
import ZH from "@/i18n/lang/zh"
import EN from "@/i18n/lang/en"

// 创建 message 数据源
const messages = {
    en: {
        message: {
            ...EN
        }
    },
    zh: {
        message: {
            ...ZH
        }
    }
}

// 创建 locale 语言变量
const locale = 'zh'

// 初始化 i18n 实例
const i18n = createI18n({
    legacy: false, // 使用 Composition API
    globalInjection: true, // 全局使用 t 函数
    locale,
    messages
})

export default i18n
```

* 在 main.ts 中注册 i18n 实例：

```tsx
import {App as Application, createApp} from 'vue'

import App from '@/App.vue'

import i18n from "@/i18n";

const app: Application = createApp(App)
// 注册 i18n 实例
app.use(i18n)
app.mount('#app')
```

* 在 Login.vue 中的使用：

```vue
<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="!flex items-center justify-center flex-col bg-img">
      <div class="font-bold text-5xl text-light-50 mb-4 select-none">{{ APP_TITLE }}</div>
      <div class="text-2xl text-light-blue-400 mb-2">
        《基于 Vite + Vue3.x + Element Plus + Windi css + pinia 等技术》
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
          <el-button class="w-full" :loading="loading" type="primary" @click="onSubmit()">
            <!-- 模板中使用国际化 -->  
            {{ $t('message.login.loginBtn') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import type {FormInstance, FormRules} from "element-plus"
import {ElMessage} from 'element-plus'
import {useAdminStore} from "@/store/ums/admin"
import {LoginFormType} from "@/types/ums/admin"
import {onBeforeUnmount} from "vue"
import {useI18n} from 'vue-i18n'

const APP_TITLE = import.meta.env.VITE_APP_TITLE
const router = useRouter()
const adminStore = useAdminStore()

const {locale, t} = useI18n()

console.log('locale', locale)


const loginFormRef = ref<FormInstance>()

const loginForm: LoginFormType = reactive<LoginFormType>({
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

const onSubmit = () => {
  // 进行表单验证
  loginFormRef.value?.validate(async valid => {
    if (!valid) { // 如果表单验证失败，就返回 false
      return false
    } else {
      try {
        loading.value = true
        // 触发登录操作
        await adminStore.login(loginForm)
        // 提示登录成功
        ElMessage({
          message: '登录成功',
          type: 'success',
          center: true,
          duration: 1000
        })
        loading.value = false
        // 跳转到首页
        await router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }
  })
}

// 键盘事件
const onKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    onSubmit()
  }
}

// 钩子函数，添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})

</script>

<style lang="scss" scoped>

.login-container {
  @apply min-h-screen;
}

.bg-img {
  background: url("@/assets/login_bg.jpg") no-repeat;
}
</style>

```

* 在 Vue 组件中的 script 标签中使用国际化：

```vue

<script setup lang="ts">
...
import {useI18n} from 'vue-i18n'

const {locale, t} = useI18n()

const {language} = storeToRefs(languageStore)

const handleCommand = (command: string) => {
  // 中文或英文
  if (command === 'zh' || command === 'en') {

    locale.value = language.value

  }
}

</script>
```

## 1.2 基于 vue-i18n 实现国际化



