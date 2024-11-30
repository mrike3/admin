<script setup>
import Main from '../components/main/index.vue'

import {mainStore} from '@/stores/main.js'
import {themStore} from '@/stores/theme.js'

const MStore = mainStore()
const TStore = themStore()
</script>

<template>
  <el-container id="full-content">
    <el-main class="full-main">
      <Main />
    </el-main>
    <el-footer v-if="MStore.showFooter" height="auto" class="full-footer">Copyright © {{TStore.copyrightdate}}&nbsp;{{TStore.copyrightname}}</el-footer>
  </el-container>
</template>

<style scoped lang="scss">
@use "@/styles/my" as my;

#full-content {
  width: 100%;
  height: 100vh;
  .full-main{
    padding: 0;
  }
  .full-footer {
    @include my.d-flex();
    font-size: 13px;
    color: var(--el-text-color-disabled);
  }
}
</style>