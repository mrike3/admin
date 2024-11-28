<script setup>
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {headerStore} from '/src/stores/header.js'
import {computed} from 'vue'

const HStore = headerStore()
const locale = computed(() => (HStore.isZh? zhCn : en))

</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped>

</style>
