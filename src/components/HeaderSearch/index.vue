<template>
  <div class="header-search" :class="{show: isShow}">
    <el-icon class="i-ep-search search-icon" @click.stop="onShowClick"></el-icon>
    <el-select
        ref="headerSearchSelectRef"
        v-model="search"
        class="m-2 header-search-select"
        placeholder="search"
        :filterable="true"
        :default-first-option="true"
        :remote-method="querySearch"
        @change="onSelectChange"
        :remote="true">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
// 控制 Search 展示
import {ElSelect} from "element-plus";

const isShow = ref<boolean>(false)

// 搜索的内容
const search = ref<string>('')
const loading = ref<boolean>(false)
// el-select 实例
const headerSearchSelectRef = ref<typeof ElSelect>()
const onShowClick = () => {
  isShow.value = !isShow.value
  if(headerSearchSelectRef.value) {
    headerSearchSelectRef.value.focus()
  }
}

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  }
]

// 搜索的方法
const querySearch = (query: string) => {
  console.log('@@@')
}

// 选中回调
const onSelectChange = () => {
  console.log('@')
}

</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}

</style>
