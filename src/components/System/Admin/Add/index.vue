<template>
  <el-form
      ref="ruleFormRef"
      :model="addForm"
      :rules="rules"
      status-icon
      label-width="100px" class="m-5"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username" clearable placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password" show-password clearable placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="addForm.realName" clearable placeholder="请输入真实姓名" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="addForm.nickName" clearable placeholder="请输入昵称" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="addForm.gender">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="addForm.phone" clearable placeholder="请输入手机号码" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email" clearable placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch
                 v-model="addForm.status"
                 class="ml-2"
                 active-text="启用"
                 inactive-text="禁用"
                 :active-value="1"
                 :inactive-value="0"
                 style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="排序字段" prop="sort">
      <el-input v-model="addForm.sort" clearable placeholder="请输入排序字段" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
      >Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const addForm = reactive({
  username: '',
  password: '',
  realName: '',
  nickName: '',
  gender: '男',
  phone: '',
  email: '',
  status: 1,
  avatar: '',
  sort: 0
})

const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'change'},
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'},
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log('Admin---------@@@@@@@@@@@@')
  // if (!formEl) return
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped>

</style>
