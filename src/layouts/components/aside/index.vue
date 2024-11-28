<script setup>
import {asideStore} from '/src/stores/aside.js'
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'
import menuList from '/src/assets/json/menuList.json'
import Recursion from './components/recursion.vue'

const AStore=asideStore()
const MStore=mainStore()
const TStore=themStore()

</script>

<template>
  <el-container v-bind:class="TStore.sideBarIsDark?'aside-container-dark':'aside-container'">
    <el-header style="padding: 0">
      <el-row justify="center" align="middle" style="width: 100%;height: 100%;">
        <el-image src="/admin/src/assets/icons/icon2.png" style="width: 38px;" />&nbsp;&nbsp;
        <h1 v-if="!AStore.menuCollapsed">VFIRE ADMIN</h1>
      </el-row>
    </el-header>
    <el-main style="padding: 0;" >
      <el-menu class="aside-menu" router  unique-opened="true" :default-active="MStore.activeTabName" :collapse="AStore.menuCollapsed">
        <Recursion :children="menuList.data"  />
      </el-menu>
    </el-main>
    <el-footer style="border-top: 1px solid var(--el-menu-border-color);padding: 0;">
      <el-row style="height: 100%;" justify="center" align="middle">
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