<script setup>
import rightTool from './components/righttool/index.vue'
import leftTool from './components/lefttool/index.vue'
import tabs from '../Tabs/index.vue'
import Recursion from '../aside/components/recursion.vue'
import menuList from '/src/assets/json/menuList.json'

import {defineProps} from 'vue'
import {useRouter} from 'vue-router'

import {themStore} from '/src/stores/theme.js'
import {headerStore} from '/src/stores/header.js'
import {mainStore} from '/src/stores/main.js'
import {asideStore} from '/src/stores/aside.js'
const TStore = themStore()
const HStore = headerStore()
const MStore = mainStore()
const AStore = asideStore()
const router = useRouter()

function flushRouter() {
  router.go(0)
}

const props = defineProps({
  isMenu: Boolean,
  isMx: Boolean,
})
</script>

<template>
  <el-row class="header-container">
    <transition>
      <el-row v-bind:class="TStore.topBarIsDark?'header-tools-container-dark':'header-tools-container'" v-show="HStore.isShow">
        <el-col :span="12" :xs="12" class="header-left" v-if="!isMenu">
          <leftTool />
        </el-col>
        <el-col :span="4" :xs="12" class="header-left" style="justify-content: space-around" v-if="isMenu">
          <el-row justify="center" align="middle">
            <el-image src="/admin/src/assets/icons/icon2.png" style="width: 38px;" />&nbsp;&nbsp;
            <font style="font-size: 20px;">VFIRE ADMIN</font>
          </el-row>
          <el-button circle @click="flushRouter()">
            <template #icon><el-icon size="18"><RefreshRight /></el-icon></template>
          </el-button>
        </el-col>
        <el-col :span="14" :xs="12" class="header-center" v-if="isMenu">
          <el-menu v-if="!isMx" mode="horizontal" v-bind:class="TStore.topBarIsDark?'header-menu':'header-menu-dark'" router :default-active="MStore.activeTabName" style="border: none;width: 100%;">
            <Recursion :children="menuList.data" />
          </el-menu>
          <div v-if="isMx" class="header-pMenu-container">
            <div class="header-pMenu" v-bind:class="AStore.menuParentIndex==index?'header-pMenu-active':''" v-for="(item, index) in menuList.data" :key="index" @click="AStore.toggleAside(index)">
              <el-icon>
                <component :is="item.meta.icon" />
              </el-icon>
              <el-text v-bind:style="TStore.topBarIsDark?{color:'white'}:''">{{$t(item.meta.title)}}</el-text>
            </div>
          </div>
        </el-col>
        <el-col :span="isMenu?6:12" :xs="12" class="header-right">
          <rightTool />
        </el-col>
      </el-row>
    </transition>
    <el-row class="header-tabs-container">
      <el-col :span="24"  class="header-tabs">
        <tabs />
      </el-col>
    </el-row>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>