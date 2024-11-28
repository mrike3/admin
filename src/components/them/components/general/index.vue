<script setup>
import { ref } from 'vue'

import {themStore} from '/src/stores/theme.js'
import {headerStore} from '/src/stores/header.js'
const HStore = headerStore()
const TStore = themStore()

const animation = ref(true)
setInterval(() => {
  animation.value =!animation.value
}, 1200)
function changeWaterMark() {
  sessionStorage.setItem('openWaterMark',TStore.openWaterMark)
}
</script>

<template>
  <h4>{{ $t('theme.general.general.title') }}</h4>
  <el-row class="general-row">
    <el-col :span="24" class="general-col">
      {{ $t('theme.general.general.list.language') }}
      <div class="general-item">
        <el-select v-model="HStore.language">
          <el-option label="简体中文" value="zh" @click="HStore.toggleLanguage('zh')"></el-option>
          <el-option label="English" value="en" @click="HStore.toggleLanguage('en')"></el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="24" class="general-col">
      {{ $t('theme.general.general.list.wartermark') }}
      <el-switch v-model="TStore.openWaterMark" @change="changeWaterMark" />
    </el-col>
  </el-row>

  <h4>{{ $t('theme.general.animation.title') }}</h4>
  <el-row class="general-row">
    <el-col :span="24" class="general-col">
      {{ $t('theme.general.animation.list.open') }}
      <el-switch v-model="TStore.openAnimate" @change="TStore.changeOpenAnimate()" />
    </el-col>
  </el-row>
  <el-row class="animation-row" justify="space-around" align="middle" v-if="TStore.openAnimate">
    <el-col :span="6" class="animation-col">
      <div class="animation-item" v-bind:class="TStore.animateType === 'fade1'? 'animation-active' : ''" @click="TStore.toggleAnimate('fade1')">
        <transition name="fade1">
          <div class="animation-box" v-show="animation" />
        </transition>
      </div>
    </el-col>

    <el-col :span="6" class="animation-col">
      <div class="animation-item" v-bind:class="TStore.animateType === 'fade2'? 'animation-active' : ''" @click="TStore.toggleAnimate('fade2')">
        <transition name="fade2">
          <div class="animation-box" v-show="animation" />
        </transition>
      </div>
    </el-col>

    <el-col :span="6" class="animation-col">
      <div class="animation-item" v-bind:class="TStore.animateType === 'fade3'? 'animation-active' : ''" @click="TStore.toggleAnimate('fade3')">
        <transition name="fade3">
          <div class="animation-box" v-show="animation" />
        </transition>
      </div>
    </el-col>
    <el-col :span="6" class="animation-col">
      <div class="animation-item" v-bind:class="TStore.animateType === 'fade4'? 'animation-active' : ''" @click="TStore.toggleAnimate('fade4')">
        <transition name="fade4">
          <div class="animation-box" v-show="animation" />
        </transition>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";
</style>