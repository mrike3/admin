<script setup>
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'

const MStore = mainStore()
const TStore = themStore()

</script>

<template>
  <transition :name="TStore.openAnimate?TStore.animateType:''">
    <router-view v-slot="{ Component }">
      <keep-alive :include="MStore.KeepAliveNames">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </transition>
</template>

<style lang="scss" scoped>
@use "index";
</style>