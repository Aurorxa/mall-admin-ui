<template>
  <router-view />
</template>

<script lang="ts" setup>
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router"
import {isTags} from "@/utils/tags"
import {useTagsViewStore} from '@/store/tagsview'

const tagsViewStore = useTagsViewStore()

const route: RouteLocationNormalizedLoaded = useRoute()

watch(route, (to: RouteLocationNormalizedLoaded) => {
  // 并不是所有的路由都需要保存，比如：登录页面的路由、404 的路由
  if (isTags(to.path)) {
    const {fullPath, meta, name, path, params, query} = to;
    if(to){
      tagsViewStore.addTagsViewList({
        fullPath,
        meta,
        name,
        path,
        params,
        query,
        title: meta.title as string
      })
    }
  }
}, {immediate: true})
</script>

<style scoped>

</style>
