<template>
  <div class="sidebar-header-container">
    <img alt="" src="@/assets/logo.png">
    <h1>{{ $t('message.app.title') }}</h1>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

const {locale, t} = useI18n()
</script>

<style scoped lang="scss">
.sidebar-header-container {
  background-color: #545c64;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
  }

  h1 {
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
  }
}

</style>
