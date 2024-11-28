<script setup>
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'

import Tabs from '../Tabs/index.vue'

const MStore = mainStore()
const TStore = themStore()

</script>

<template>
  <el-row class="main-container">
    <div class="tab-container">
      <Tabs />
    </div>
    <div class="content-container">
      <transition :name="TStore.openAnimate?TStore.animateType:''">
        <router-view v-slot="{ Component }">
          <keep-alive :include="MStore.KeepAliveNames">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </transition>
    </div>
  </el-row>
</template>

<style lang="scss" scoped>
@use "index";
</style>