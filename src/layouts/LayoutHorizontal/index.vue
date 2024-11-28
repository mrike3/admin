<script setup>
import Header from '../components/header/index.vue'
import Main from '../components/main/index.vue'

import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'
const MStore = mainStore()
const TStore = themStore()
</script>

<template>
  <el-container id="layout-vertical">
    <el-container>
      <el-header class="header" height="auto">
        <Header :is-menu="true" :is-mx="false" />
      </el-header>
      <el-main class="main">
        <Main />
      </el-main>
      <el-footer v-if="MStore.showFooter" height="auto" class="footer">Copyright © {{TStore.copyrightdate}}&nbsp;{{TStore.copyrightname}}</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@use "index.scss";

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  width: 0;
}
</style>