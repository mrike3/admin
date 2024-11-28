<script setup>
import Recursion from './components/recursion.vue'
import menuList from '/src/assets/json/menuList.json'

import {asideStore} from '/src/stores/aside.js'
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'

const AStore = asideStore()
const MStore = mainStore()
const TStore = themStore()

</script>

<template>
  <el-container class="aside-container" v-bind:class="TStore.sideBarIsDark?'aside-container-dark':''">
    <el-main class="aside-main">
      <el-menu class="aside-menu" v-bind:style="AStore.menuCollapsed?'':{width: '222px'}" :collapse-transition="false" router  unique-opened="true" :default-active="MStore.activeTabName" :collapse="AStore.menuCollapsed">
        <Recursion :children="menuList.data[AStore.menuParentIndex].children"  />
      </el-menu>
    </el-main>
    <el-footer>
      <el-row style="height: 100%;" justify="end" align="middle">
        <el-button size="small" circle @click="AStore.menuCollapsed = !AStore.menuCollapsed">
          <template #icon>
            <el-icon v-if="!AStore.menuCollapsed"><DArrowLeft /></el-icon>
            <el-icon v-if="AStore.menuCollapsed"><DArrowRight /></el-icon>
          </template>
        </el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
@use "index";
</style>