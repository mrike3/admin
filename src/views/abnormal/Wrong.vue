<template>
  <el-row style="flex-direction: column;width: 100%; height: 100%;" justify="center" align="middle">
    <div style="width: 30%;">
      <el-image src="/admin/img/500.png" fit="cover" />
    </div>
    <el-row style="flex-direction: column" justify="center" align="middle">
      <h1>{{ $t('Wrong.title') }}</h1>
      <p>{{ $t('Wrong.content') }}</p>
      <el-button type="primary" size="large" icon="Back" @click="MStore.activeTabName = '/home';$router.push('/home')">{{ $t('Wrong.btn') }}</el-button>
    </el-row>
  </el-row>
</template>

<script setup>
import { mainStore } from '@/stores/main.js'
const MStore = mainStore()
</script>

<style scoped>

</style>

