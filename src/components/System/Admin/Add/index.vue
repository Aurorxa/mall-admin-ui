<template>
  <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addFormRules"
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
    <el-form-item label="头像" prop="avatar">
      <el-upload
          class="avatar-uploader"
          :action="baseUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <div v-else class="avatar-uploader-icon">
          <el-icon :class="['i-ep-plus']"></el-icon>
        </div>
      </el-upload>
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
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="addForm.sort" :min="0" placeholder="请输入排序字段" :value-on-clear="0" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
// 上传
import type {FormInstance, FormRules, UploadProps} from 'element-plus'
import {adminAddApi} from "@/api/ums/admin";
import {AddFormType} from "@/types/ums/admin"
import {ResponseData, ResponseDataCodeEnum} from "@/utils/global"

const baseUrl = import.meta.env.VITE_APP_BASE_URL + '/oss/upload'

const addFormRef = ref<FormInstance>()
const addForm = reactive<AddFormType>({
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


// 验证规则
const addFormRules = reactive<FormRules>({
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
  realName: [
    {
      required: true, message: '真实姓名为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  nickName: [
    {
      required: true, message: '昵称为必填项', trigger: 'change'
    },
    {
      min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
    }
  ],
  phone: [
    {
      required: true, message: '手机号码为必填项', trigger: 'change'
    },
    {
      pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号码格式不正确', trigger: 'change'
    }
  ],
  email: [
    {
      required: true, message: '邮箱为必填项', trigger: 'change'
    },
    {
      pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '邮箱格式不正确',
      trigger: 'change'
    }
  ],
  avatar: [
    {
      required: true, message: '头像为必填项', trigger: 'change'
    },
  ],

})


// 上传头像
const imageUrl = ref<string>('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response: any,
    uploadFile: { raw: Blob | MediaSource; }
) => {
  const {code, data, msg} = response
  if (code === ResponseDataCodeEnum.SUCCESS_CODE) {
    imageUrl.value = data.completeAvatarUrl
    addForm.avatar = data.completeAvatarUrl
  } else {
    ElMessage.error(msg)
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: { type: string; size: number; }) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片只能是 jpeg 格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像超过2MB!')
    return false
  }
  return true
}

// 提交
const submitForm = () => {
  // 进行表单验证
  return addFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) { // 如果表单验证失败，就返回 false
      return false
    } else {
      try {
        const result: ResponseData<null> = await adminAddApi(addForm)
        ElMessage.success(result.msg)
      } catch (e) {
        console.log(e)
      }
    }
  })
}

// 重置
const resetForm = () => {
  return addFormRef.value?.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})

</script>

<style scoped lang="scss">

.avatar-uploader {
  border: 1px dashed var(--el-border-color) !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  transition: var(--el-transition-duration-fast) !important;

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  &:hover {
    border-color: var(--el-color-primary) !important;
  }
}
</style>

