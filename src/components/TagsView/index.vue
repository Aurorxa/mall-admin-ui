<template>
  <el-row>
    <el-col :span="24">
      <el-tag
          v-for="tag in tagsViewList"
          :key="tag.fullPath"
          size="large"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="onCloseClick(tag)"
      >
        {{ tag.meta.title }}
      </el-tag>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useTagsViewStore} from '@/store/tagsview'
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router"

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const tagsViewList = ref(tagsViewStore.tagsViewList);

/**
 * 是否被选中
 * @param tag
 */
const isActive = (tag: RouteLocationNormalizedLoaded) => tag.path === route.path

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (tag: RouteLocationNormalizedLoaded) => {
  tagsViewList.value.splice(tagsViewList.value.map(tags => tags.path).indexOf(tag.path), 1)
}
</script>

<style scoped lang="scss">
.tags-view-container {
  .tags-view-item {

  }

  .active {

  }
}
</style>
