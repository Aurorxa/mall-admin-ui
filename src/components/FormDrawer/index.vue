<template>
  <el-drawer
      v-model="showDrawer"
      :title="title"
      direction="rtl"
      :size="size"
      :destroy-on-close="destroyOnClose"
      :close-on-click-modal="false"
  >
    <div class="formDrawer">
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <el-button type="primary">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">{{ cancelText }}</el-button>
      </div>
    </div>
    <!-- <el-form
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
       <el-form-item>
         <el-button :loading="loading" type="primary" @click="onSubmit()">确认</el-button>
       </el-form-item>
     </el-form>-->
  </el-drawer>
</template>

<script setup lang="ts">
import {ElMessage, FormInstance, FormRules} from "element-plus"
import {ChangePasswordFormType} from "@/types/ums/admin"
import router from "@/router"
import {useAdminStore} from "@/store/ums/admin"

const adminStore = useAdminStore()

// 控制 抽屉 的打开和关闭
const showDrawer = ref<boolean>(false)

// 打开抽屉
const open = () => {
  showDrawer.value = true
}

// 关闭抽屉
const close = () => {
  showDrawer.value = false
}

// 向父组件暴露方法
defineExpose({
  open,
  close
})

interface Props {
  title?: string
  size?: string,
  destroyOnClose?: boolean,
  confirmText?: string,
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '45%',
  destroyOnClose: false,
  confirmText: '提交',
  cancelText: '取消'
})

const changePasswordFormRef = ref<FormInstance>()

const changePasswordForm: ChangePasswordFormType = reactive<ChangePasswordFormType>({
  oldPassword: '123456',
  newPassword: '123456',
  confirmPassword: '123456'
})

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码为必填项'))
  } else if (value !== changePasswordForm.newPassword) {
    callback(new Error("新密码和确认密码需要一样~"))
  } else {
    callback()
  }
}

// 验证规则
const changePasswordRules: FormRules = reactive<FormRules>({
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
</script>

<style lang="scss" scoped>
.formDrawer {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;

  .content {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }

  .footer {
    height: 50px;
    margin-top: auto;
    display: flex;
  }
}
</style>
