<template>
  <el-row>
    <el-tag
        v-for="(tag,index) in tagsViewList"
        :key="index"
        size="large"
        closable
        :round="false"
        color="#545c64"
        :disable-transitions="false"
        @click="onHandleClick(tag)"
        @close="onHandleClose(tag)"
    >
      <el-dropdown @command="handleCommand" trigger="contextmenu" placement="bottom-end">
        <span class="el-dropdown-link">
            <span class="content">{{ tag.meta.title }}</span>
         </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="refresh">
              刷新
            </el-dropdown-item>
            <el-dropdown-item command="closeRight">
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item command="closeOther">
              关闭其他
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tag>
  </el-row>
</template>

<script lang="ts" setup>
import {useTagsViewStore} from '@/store/tagsview'
import {TagViewType} from "@/types/tagsview"
import {useRouter} from "vue-router"

const router = useRouter()

const tagsViewStore = useTagsViewStore()

const {tagsViewList} = storeToRefs(tagsViewStore)

/**
 * 点击跳转事件
 */
const onHandleClick = (tag: TagViewType) => {
  const fullPath = tag.fullPath
  if (fullPath) {
    router.push(fullPath)
  }
}

/**
 * 关闭 tag 的点击事件
 */
const onHandleClose = (tag: TagViewType) => {
  tagsViewStore.removeTag(tag)
}

// 处理刷新等逻辑
const handleCommand = (command: string) => {
  // 刷新
  if (command === 'refresh') {

  }
  // 关闭右侧
  if (command === 'closeRight') {

  }
  // 关闭其他
  if (command === 'closeOther') {

  }
}

</script>

<style scoped lang="scss">

.el-tag {
  cursor: pointer;

  .content {
    color: #fff !important;
  }

}


</style>
