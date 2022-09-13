<template>
  <el-row>
    <el-col :span="24">
      <el-tag
          v-for="(tag,index) in tagsViewList"
          :key="index"
          size="large"
          closable
          :round="false"
          color="#545c64"
          :disable-transitions="false"
          @close="onCloseClick(tag)"
      >
        <span class="content">{{ tag.meta.title }}</span>
      </el-tag>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {useTagsViewStore} from '@/store/tagsview'
import {TagViewType} from "@/types/tagsview";

const tagsViewStore = useTagsViewStore()

const {tagsViewList} = storeToRefs(tagsViewStore);

/**
 * 是否被选中
 * @param tag
 */

/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (tag: TagViewType) => {
  tagsViewList.value.splice(tagsViewList.value.map(tags => tags.path).indexOf(tag.path), 1)
}
</script>

<style scoped lang="scss">

.el-tag {

  .content {
    color: #fff !important;
  }

  .el-tag__close {
    color: #fff;
  }
}




</style>
