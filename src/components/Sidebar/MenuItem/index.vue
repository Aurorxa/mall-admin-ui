<template>
  <el-sub-menu index="1">
    <template #title>
      <el-icon class="i-ep-location"></el-icon>
      <span>Navigator One</span>
    </template>
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-sub-menu index="13">
      <template #title>
        <el-icon class="i-ep-location"></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <el-menu-item index="2">
    <el-icon class="i-ep-menu"></el-icon>
    <span>Navigator Two</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <el-icon class="i-ep-document"></el-icon>
    <span>Navigator Three</span>
  </el-menu-item>
  <el-menu-item index="4">
    <el-icon class="i-ep-setting"></el-icon>
    <span>Navigator Four</span>
  </el-menu-item>
</template>

<script setup lang="ts">

</script>

<style>

</style>
