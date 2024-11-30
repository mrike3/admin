<!--递归菜单-->
<script setup>
import {defineProps} from 'vue'
import {mainStore} from '@/stores/main.js'
import {headerStore} from '@/stores/header.js'

const MStore = mainStore()
const HStore = headerStore()

const props = defineProps({
  children: Array,
})

// 点击菜单操作
function ClickMenuItem(menu){
  if(menu.path=='/home'){
    MStore.activeTabName='/home'
    return
  }
  const tab={
    icon:menu.meta.icon,
    name:menu.path,
    label:menu.meta.title,
    isKeepAlive:menu.meta.isKeepAlive,
    KeepName:menu.name,
    breadcrumb:menu.breadcrumb
  }
  if(MStore.tabList.findIndex(tab=>tab.name===menu.path)==-1){
    MStore.tabList.push(tab)
    // 判断是否需要缓存
    if(tab.isKeepAlive){
      // 添加缓存名称
      MStore.KeepAliveNames.push(menu.name)
    }
  }
  MStore.activeTabName=menu.path
  HStore.breadcrumb=menu.breadcrumb
}
</script>

<template>
  <template v-for="(menu) in children">
    <el-sub-menu  v-if="menu.children !== undefined" :index="menu.path">
      <template #title>
        <el-icon>
          <component  :is="menu.meta.icon"  />
        </el-icon>
        <span>{{ $t(menu.meta.title) }}</span>
      </template>
      <template #default>
        <recursion :children="menu.children" />
      </template>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" @click="ClickMenuItem(menu)">
      <template #title>
        {{ $t(menu.meta.title) }}
      </template>
      <template #default>
        <el-icon>
          <component  :is="menu.meta.icon"/>
        </el-icon>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">

</style>