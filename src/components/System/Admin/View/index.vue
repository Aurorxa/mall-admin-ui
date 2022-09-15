<template>
  <el-form label-width="100px" class="m-5">
    <el-form-item label="用户名">
      <el-input v-model="data.username" />
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="data.realName" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="data.nickName" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="data.gender" />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="data.phone" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="data.email" />
    </el-form-item>
    <el-form-item label="状态">
      <el-switch
          v-model="data.status"
          class="ml-2"
          active-text="启用"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="头像">
      <el-avatar :size="25" shape="circle"
                 :src="data.avatar" />
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="data.sort" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {adminView} from "@/api/ums/admin"
import {ViewReturnType} from "@/types/ums/admin"
import {ResponseData} from "@/utils/global";

let data = ref<ViewReturnType>({
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

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

watchEffect(async () => {
  const result: ResponseData<ViewReturnType> = await adminView(props.id)
  data.value = result.data
})

</script>

<style>

</style>
