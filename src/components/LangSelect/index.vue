<template>
  <el-tooltip
      class="box-item"
      effect="dark"
      content="中文/英文"
      placement="bottom"
  >
    <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <span class="el-dropdown-link" style="display: flex;justify-content: center;align-items: center">
          <el-avatar :size="50" shape="circle"
                     src="https://avatars.githubusercontent.com/u/25677587?s=400&u=49a02118ee2c72d9200af201976fcd2c95766455&v=4" />
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">
            中文
          </el-dropdown-item>
          <el-dropdown-item command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>

</template>

<script setup lang="ts">

const handleCommand = (command: string) => {
  // 中文
  if (command === 'zh') {
  }
  // 英文
  if (command === 'en') {
  }
}

</script>

<style>

</style>
