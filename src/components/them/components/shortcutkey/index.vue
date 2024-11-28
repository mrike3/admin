<script setup>
import {themStore} from '/src/stores/theme.js'
const TStore = themStore()
</script>

<template>
  <h4>{{ $t('theme.shortcut.title') }}</h4>
  <el-row class="key-row">
    <el-col :span="24" class="key-col">
      {{ $t('theme.shortcut.global.list.globalsearch') }}
      <div class="key-switch">
        <span class="key-text">Alt + K</span>&nbsp;
        <el-switch v-model="TStore.altk" />
      </div>
    </el-col>
    <el-col :span="24" class="key-col">
      {{ $t('theme.shortcut.global.list.logout') }}
      <div class="key-switch">
        <span class="key-text">Alt + Q</span> &nbsp;
        <el-switch v-model="TStore.altq" />
      </div>
    </el-col>
    <el-col :span="24" class="key-col">
      {{ $t('theme.shortcut.global.list.lock') }}
      <div class="key-switch">
        <span class="key-text">Alt + L</span> &nbsp;
        <el-switch v-model="TStore.altl" />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use "/src/styles/my" as my;

.key-row {
  line-height: 2.5;
  width: 100%;
  flex-direction: column;
  .key-col {
    @include my.d-flex($jc:start);
    font-size: 14px;
    color: var(--el-text-color);
    .key-switch {
      position: absolute;
      right: 0;
      .key-text {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>