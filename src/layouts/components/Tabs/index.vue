<script setup>
import { mainStore } from '/src/stores/main.js'
import { asideStore} from '/src/stores/aside.js'
import {headerStore} from '/src/stores/header.js'
import {useRouter} from 'vue-router'
import menuList from '/src/assets/json/menuList.json'
import MoreBtn from './components/MoreBtn/index.vue'

const MStore = mainStore()
const AStore = asideStore()
const HStore = headerStore()
const router = useRouter()

MStore.router = router

let currentUrl=window.location.pathname
// 判断当前url是否为首页
if( currentUrl.indexOf('/admin/home')!==-1){
  router.push("/admin/home")
}else {
  getTab(menuList.data)
}

function getTab(menuArray){
  menuArray.forEach(item => {
    if(item.children!==undefined){
      getTab(item.children)
    }else {
      if(item.path===currentUrl && MStore.tabList.find((tab) => tab.name === item.path)===undefined){
        MStore.tabList.push({
          name: item.path,
          label: item.meta.title,
          icon: item.meta.icon,
          isKeepAlive: item.meta.isKeepAlive,
          KeepName:item.name,
          breadcrumb:item.breadcrumb
        })
        if(item.isKeepAlive){
          MStore.KeepAliveNames.push(item.name)
        }
        MStore.activeTabName = item.path
      }
    }
  })
}

</script>

<template>
  <el-row style="width: 100%;height: 100%;">
    <el-col :span="22" :xs="16">
      <el-tabs v-model="MStore.activeTabName" type="border-card" style="height: 100%;" closable @tab-remove="MStore.removeTab" @tab-click="MStore.toggleTab">
        <el-tab-pane v-for="(item) in MStore.tabList" :name="item.name" class="tab-pane" :key="item.name+item.flushIndex">
          <template #label>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            {{ $t(item.label) }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="1" :xs="4" class="moreBtn">
      <MoreBtn />
    </el-col>
    <el-col :span="1" :xs="4" class="moreBtn">
      <el-button type="text" @click="()=>{AStore.showAside=false;HStore.isShow=false;}" v-if="HStore.isShow">
        <el-icon>
          <FullScreen />
        </el-icon>
      </el-button>

      <el-button type="text" @click="()=>{AStore.showAside=true;HStore.isShow=true;}" v-if="!HStore.isShow">
        <el-icon>
          <icon-off-screen theme="outline"/>
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";
</style>