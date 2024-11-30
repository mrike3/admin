<script setup>
import Header from '../components/header/index.vue'
import Aside from '../components/aside/index2.vue'
import Main from '../components/main/index.vue'

import {asideStore} from '@/stores/aside.js'
import {headerStore} from '@/stores/header.js'
import {mainStore} from '@/stores/main.js'
import {themStore} from '@/stores/theme.js'
const AStore = asideStore()
const HStore = headerStore()
const MStore = mainStore()
const TStore = themStore()
</script>

<template>
  <el-container id="layout-vertical">
    <transition name="slide-fade">
      <el-aside width="auto" v-show="AStore.showAside">
        <Aside />
      </el-aside>
    </transition>
    <el-container>
      <el-header class="header" height="auto">
        <Header :is-menu="false" />
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