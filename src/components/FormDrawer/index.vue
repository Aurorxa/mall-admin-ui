<template>
  <el-drawer
      v-model="showDrawer"
      :title="title"
      direction="rtl"
      :size="size"
      :destroy-on-close="destroyOnClose"
      :close-on-click-modal="false">
    <div class="formDrawer">
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <el-button type="primary" :loading="loading" @click="submit">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">{{ cancelText }}</el-button>
      </div>
    </div>

  </el-drawer>
</template>

<script setup lang="ts">
// 控制 抽屉 的打开和关闭
const showDrawer = ref<boolean>(false)

const loading = ref<boolean>(false)

const showLoading = () => {
  loading.value = true
}

const closeLoading = () => {
  loading.value = false
}


// 打开抽屉
const open = () => {
  showDrawer.value = true
}

// 关闭抽屉
const close = () => {
  showDrawer.value = false
}

// 提交的事件
const submit = () => {
  emit('submit')
}

const emit = defineEmits<{
  (e: 'submit'): void
}>()

// 向父组件暴露方法
defineExpose({
  open,
  close,
  showLoading,
  closeLoading
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
