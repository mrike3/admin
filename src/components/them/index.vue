<script setup>
import Appearance from './components/appearance/index.vue'
import Layout from './components/layout/index.vue'
import ShortCutKey from './components/shortcutkey/index.vue'
import General from './components/general/index.vue'

import {themStore} from '/src/stores/theme.js'
const TStore = themStore()

function detectDevice() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 常见的手机浏览器标识
  var mobile = /mobile|tablet|ip(ad|hone|od)|android/i;
  // 检测是否为手机或平板设备
  if (mobile.test(userAgent)) {
    return '100%';
  } else {
    return '30%';
  }
}
const device = detectDevice();
</script>

<template>
  <el-button @click="TStore.drawerShow=true" type="primary" class="them-btn">
    <template #icon>
      <icon-setting-two theme="outline" size="33"/>
    </template>
  </el-button>
  <el-drawer class="theme-drawer" v-model="TStore.drawerShow"  :size="device" :title="$t('theme.title')" :show-close="true">
    <template #default>
      <el-tabs class="aaa">
        <el-tab-pane :label="$t('theme.appearance.title')">
          <Appearance />
        </el-tab-pane>
        <el-tab-pane :label="$t('theme.layout.title')">
          <Layout />
        </el-tab-pane>
        <el-tab-pane :label="$t('theme.shortcut.title')">
          <ShortCutKey />
        </el-tab-pane>
        <el-tab-pane :label="$t('theme.general.title')">
          <General />
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
@use "index";
</style>