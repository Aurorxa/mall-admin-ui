<template>
  <div class="sidebar-header-container" :style="{width: sidebarOpened ? '64px':'200px'}">
    <img alt="" src="@/assets/logo.png">
    <h1 v-show="!sidebarOpened">{{ $t('message.app.title') }}</h1>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useSidebarStore} from "@/store/sidebar"

const {locale, t} = useI18n()

const sidebarStore = useSidebarStore()
const {sidebarOpened} = storeToRefs(sidebarStore)

</script>

<style scoped lang="scss">
.sidebar-header-container {
  background-color: #334154;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
  }

  h1 {
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
  }
}

</style>
