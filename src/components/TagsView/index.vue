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
        @click="onClick(tag)"
        @close="onCloseClick(tag)"
    >
      <span class="content">{{ tag.meta.title }}</span>
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
const onClick = (tag: TagViewType) => {
  const fullPath = tag.fullPath
  if (fullPath) {
    router.push(fullPath)
  }
}

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (tag: TagViewType) => {
  tagsViewList.value.splice(tagsViewList.value.map(tags => tags.path).indexOf(tag.path), 1)
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
