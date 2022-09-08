<template>
  <el-tooltip
      class="box-item"
      effect="dark"
      content="中文/英文"
      placement="bottom"
  >
    <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
      <el-icon class="i-ant-design-google-circle-filled" :size="20"
               style="cursor: pointer"></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="language ==='zh'">
            中文
          </el-dropdown-item>
          <el-dropdown-item command="en" :disabled="language ==='en'">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>

</template>

<script setup lang="ts">
import {useLanguageStore} from '@/store/lang'

const languageStore = useLanguageStore();

const {language} = storeToRefs(languageStore)

const handleCommand = (command: string) => {
  // 中文
  if (command === 'zh') {
    languageStore.setLanguage('zh')
  }
  // 英文
  if (command === 'en') {
    languageStore.setLanguage('en')
  }
}

</script>

<style>

</style>
