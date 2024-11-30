<script setup>
import layoutVertical from './LayoutVertical/index.vue'
import fullContent from './FullContent/index.vue'
import layoutTwoColumns from './TowColumns/index.vue'
import layoutMixedMenu from './MixedMenu/index.vue'
import layoutHorizontal from './LayoutHorizontal/index.vue'
import lockScreen from '@/components/LockScreen/index.vue'

import theme from '@/components/them/index.vue'
import Mousetrap from 'mousetrap'
import { ref } from 'vue'

import {themStore} from '@/stores/theme.js'
import {headerStore} from '@/stores/header.js'
const TStore = themStore()
const HStore = headerStore()

const layout = ref([
    layoutVertical,
  layoutTwoColumns,
    layoutHorizontal,
  layoutMixedMenu,
    fullContent
])

Mousetrap.bind('alt+k', function() {
  if(TStore.altk){
    HStore.searchShow = true
  }
})
Mousetrap.bind('alt+l', function() {
  if(TStore.altl){
    TStore.lockScreen=true
    sessionStorage.setItem('lockScreen','true')
  }
})
Mousetrap.bind('alt+q', function() {
  if(TStore.altq){
    alert('alt+q')
  }
})
</script>

<template>
  <transition name="fade">
    <lock-screen class="fontall" style="position:absolute;top: 0;left: 0;z-index: 999" v-if="TStore.lockScreen" />
  </transition>

  <el-watermark :content="TStore.getWaterMark">
    <meting-js
        server="tencent"
        type="playlist"
        fixed="true"
        theme="var(--el-color-primary)"
        list-folded="false"
        list-max-height="500px"
        id="3508750947">
    </meting-js>
    <component :is="layout[TStore.layoutType]" class="fontall" />
    <theme />
  </el-watermark>

</template>

<style scoped>
.fontall {
  //font-family: "阿里妈妈刀隶体 Regular";
  font-family: "钉钉进步体 Regular";
}
</style>