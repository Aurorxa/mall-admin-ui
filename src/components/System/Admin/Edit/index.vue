<template>
  <el-form
      ref="editFormRef"
      :rules="editFormRules"
      :model="editForm"
      status-icon
      label-width="100px"
      class="m-5">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editForm.username" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="editForm.realName" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="editForm.nickName" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="editForm.gender" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="editForm.phone" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-tooltip :content="editForm.status ? '启用' : '禁用'" placement="top">
        <el-switch
            v-model="editForm.status"
            class="ml-2"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
        </el-switch>
      </el-tooltip>
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
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="editForm.sort" :min="0" placeholder="请输入排序字段" :value-on-clear="editForm.sort" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {adminEditApi, adminViewApi} from "@/api/ums/admin"
import {EditFormType, ViewReturnType} from "@/types/ums/admin"
import {ResponseData, ResponseDataCodeEnum} from "@/utils/global"
import {ElMessage, FormInstance, FormRules, UploadProps} from "element-plus"
import go from 'await-handler-ts'

const baseUrl = import.meta.env.VITE_APP_BASE_URL + '/oss/upload'

const editFormRef = ref<FormInstance>()

let editForm = reactive<ViewReturnType | EditFormType>({
  username: '',
  realName: '',
  nickName: '',
  gender: '',
  phone: '',
  email: '',
  status: 0,
  avatar: '',
  sort: 0
})

// 验证规则
const editFormRules = reactive<FormRules>({
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

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

// 上传头像
const imageUrl = ref<string>('')

watchEffect(async () => {
  const result: ResponseData<ViewReturnType> = await adminViewApi(props.id)
  Object.assign(editForm, result.data)
  imageUrl.value = result.data?.avatar
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response: any,
    uploadFile: { raw: Blob | MediaSource; }
) => {
  const {code, data, msg} = response
  if (code === ResponseDataCodeEnum.SUCCESS_CODE) {
    imageUrl.value = data.completeAvatarUrl
    editForm.avatar = data.completeAvatarUrl
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
const submitForm = async () => {
  // 进行表单验证
  const validateForm = new Promise<boolean>((resolve, reject) => {
    editFormRef.value?.validate((valid: boolean) => {
      resolve(valid)
    })
  })
  let validateResult: boolean = await validateForm
  if (!validateResult) {
    throw new Error("表单验证失败");
  } else {
    return await adminEditApi(editForm, props.id);
  }
}

// 重置
const resetForm = () => {
  return editFormRef.value?.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})

</script>

<style lang="scss" scoped>
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
