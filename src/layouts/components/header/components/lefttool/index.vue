<script setup>
import {asideStore} from '@/stores/aside.js'
import {mainStore} from '@/stores/main.js'

import {useRouter} from 'vue-router'

const AStore = asideStore()
const MStore = mainStore()
const router = useRouter()

// 刷新页面
function flushRouter() {
  router.go(0)
}
</script>

<template>
  <el-button circle @click="AStore.showAside =!AStore.showAside">
    <template #icon>
      <icon-hamburger-button theme="filled" size="33" class="icon1"/>{{breadcrumb}}
    </template>
  </el-button>
  <el-button circle @click="flushRouter()">
    <template #icon><el-icon size="18"><RefreshRight /></el-icon></template>
  </el-button>
  <el-breadcrumb style="margin-left: 20px" :separator-icon="'ArrowRight'">
    <el-breadcrumb-item v-for="(item) in MStore.currentTab.breadcrumb" class="breadcrumb-item">
      {{ $t(item) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">

</style>