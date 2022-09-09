<template>
  <el-breadcrumb separator="/">
    <!--<el-breadcrumb-item :to="{ path:'/'}">首页</el-breadcrumb-item>-->
    <el-breadcrumb-item v-for="(item,index) in BreadCrumbDataArr" :key="index">
      <!-- 不可点击项 -->
      <span class="no-redirect" v-if="index == BreadCrumbDataArr.length -1">{{ item.title }}</span>
      <!-- 可点击项 -->
      <span class="redirect" v-else @click="onLinkClick(item)">{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import {RouteLocationMatched, useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

// 动态面包屑数据类型
type BreadCrumbDataType = {
  title: string,
  path: string
}
// 动态面包屑数据
let BreadCrumbDataArr = ref<BreadCrumbDataType[]>([])

const getBreadCrumbDataArr = (newValue: RouteLocationMatched[]) => {
  BreadCrumbDataArr.value = newValue.filter(item => item.meta && item.meta.title).map((value: RouteLocationMatched) => {
    return {
      title: value.meta.title as string,
      path: value.path
    }
  })
}
// 监视 route 中的 matched 的变化
watch(() => route.matched, (newValue: RouteLocationMatched[]) => {
  getBreadCrumbDataArr(newValue)
}, {immediate: true})

// 跳转的点击事件
const onLinkClick = (item: BreadCrumbDataType) => {
  router.push(item.path)
}

</script>

<style lang="scss" scoped>

.redirect {
  cursor: pointer;
  color: #545c64;
  font-weight: bold;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
