<script setup>
import Header from './components/header/index.vue'
import Main from './components/main/index.vue'
import Aside from './components/aside/index.vue'

import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'
import {asideStore} from '/src/stores/aside.js'
const MStore = mainStore()
const TStore = themStore()
const AStore = asideStore()
</script>

<template>
  <el-container id="layout-vertical">
    <el-container>
      <el-header class="header" height="auto">
        <Header :is-menu="true" :is-mx="true" />
      </el-header>
      <el-container>
        <el-aside class="aside" width="auto" v-show="AStore.showAside">
          <Aside />
        </el-aside>
        <el-container>
          <el-main class="main">
            <Main />
          </el-main>
          <el-footer v-if="MStore.showFooter" height="auto" class="footer">Copyright © {{TStore.copyrightdate}}&nbsp;{{TStore.copyrightname}}</el-footer>
        </el-container>
      </el-container>

    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@use "index.scss";

</style>