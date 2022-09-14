<template>
  <el-row>
    <el-tag
        v-for="(tag,index) in tagsViewList"
        :key="index"
        size="large"
        closable
        :round="false"
        color="#fff"
        :class="{active:currentTagIndex === index}"
        :disable-transitions="false"
        @click="onHandleClick(tag)"
        @close="onHandleClose(tag)"
    >
      <el-dropdown @command="handleCommand" trigger="contextmenu" placement="bottom-end">
        <span class="el-dropdown-link">
            <span class="content" :class="{active:currentTagIndex === index}">{{ tag.meta.title }}</span>
         </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="{command: 'refresh'}">
              刷新
            </el-dropdown-item>
            <el-dropdown-item :command="{command: 'closeRight',tag: tag}">
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item :command="{command: 'closeAll'}">
              关闭所有
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
import {RouteLocationMatched, RouteLocationNormalizedLoaded, useRoute, useRouter} from "vue-router"

const router = useRouter()

const route: RouteLocationNormalizedLoaded = useRoute()

const tagsViewStore = useTagsViewStore()

const {tagsViewList, currentTagIndex} = storeToRefs(tagsViewStore)

/**
 * 点击跳转事件
 */
const onHandleClick = (tag: TagViewType) => {
  const fullPath = tag.fullPath
  if (fullPath) {
    tagsViewStore.setCurrentTagIndex(tag)
    router.push(fullPath)
  }
}

/**
 * 关闭 tag 的点击事件
 */
const onHandleClose = (tag: TagViewType) => {
  tagsViewStore.removeTag(tag)
}


// 监视 route 中的 matched 的变化
watch(() => route.matched, (newValue: RouteLocationMatched[]) => {
}, {immediate: true})

// 处理刷新等逻辑
type CommandType = {
  command: string,
  tag: TagViewType
}
const handleCommand = (commandObj: CommandType) => {
  const {command, tag} = commandObj;
  // 刷新
  if (command === 'refresh') {
    router.go(0)
  }
  // 关闭其他
  if (command === 'closeRight') {
    tagsViewStore.removeRightTag(tag)
  }
  // 关闭所有
  if (command === 'closeAll') {
    tagsViewStore.clearAllTag()
  }
}


</script>

<style scoped lang="scss">

.el-tag {
  cursor: pointer;
}

.active {
  background-color: #434a50 !important;
  color: #ffd04b;
}


</style>
