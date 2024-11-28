<script setup>
import {mainStore} from '/src/stores/main.js'
import {useRouter} from 'vue-router'

const MStore = mainStore()

const router = useRouter()

//刷新页面
function refresh() {
  if(MStore.currentTab.isKeepAlive){
    const currentPageKeepName = MStore.currentTab.KeepName
    MStore.KeepAliveNames=MStore.KeepAliveNames.filter(item => item!==currentPageKeepName)
  }
  router.replace({path:'/admin/blankpage'})
}
//关闭当前标签
function closeCurrent() {
  const currentTab=MStore.currentTab
  if(currentTab.isKeepAlive){
    MStore.KeepAliveNames=MStore.KeepAliveNames.filter(item => item!= currentTab.KeepName)
  }
  MStore.tabList = MStore.tabList.filter(item => item.name!== currentTab.name)
  MStore.activeTabName = MStore.tabList[MStore.tabList.length - 1].name
  MStore.router.push(MStore.activeTabName)
}
//关闭其它标签
function closeOthers() {
  MStore.tabList=MStore.tabList.filter(item => item.name== '/admin/home'||item.name==MStore.activeTabName)
  if(!MStore.currentTab.isKeepAlive){
    MStore.KeepAliveNames=[]
  }else{
    MStore.KeepAliveNames=MStore.KeepAliveNames.filter(item => item==MStore.currentTab.KeepName)
  }
}
//关闭所有标签
function closeAll(){
  MStore.tabList=MStore.tabList.filter(item => item.name== '/admin/home')
  MStore.KeepAliveNames=[]
  MStore.activeTabName='/admin/home'
  MStore.router.push('/admin/home')
}
//关闭左侧标签
function closeLeft() {
  const tabs= MStore.tabList.splice(1,MStore.tabList.findIndex(item => item.name === MStore.currentTab.name)-1)
  tabs.forEach(item => {
    if(item.isKeepAlive){
      MStore.KeepAliveNames=MStore.KeepAliveNames.filter(item1 => item1!=item.KeepName)
    }
  })
}
//关闭右侧标签
function closeRight() {
  const tabs= MStore.tabList.splice(MStore.tabList.findIndex(item => item.name === MStore.currentTab.name)+1,MStore.tabList.length-1)
  tabs.forEach(item => {
    if(item.isKeepAlive){
      MStore.KeepAliveNames=MStore.KeepAliveNames.filter(item1 => item1!=item.KeepName)
    }
  })
}
</script>

<template>
  <el-dropdown trigger="click">
    <el-button type="text" icon="ArrowDown" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="Refresh" @click="refresh">
          {{ $t('moreBtn.refresh') }}
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu>
        <el-dropdown-item icon="Remove" v-bind:disabled="MStore.activeTabName=='/admin/home'" @click="closeCurrent">
          {{ $t('moreBtn.closeCurrent') }}
        </el-dropdown-item>
        <el-dropdown-item icon="DArrowLeft" @click="closeLeft">
          {{ $t('moreBtn.closeLeft') }}
        </el-dropdown-item>
        <el-dropdown-item icon="DArrowRight" @click="closeRight">
          {{ $t('moreBtn.closeRight') }}
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu>
        <el-dropdown-item icon="CircleClose" @click="closeOthers">
          {{ $t('moreBtn.closeOthers') }}
        </el-dropdown-item>
        <el-dropdown-item icon="FolderDelete" @click="closeAll">
          {{ $t('moreBtn.closeAll') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
@use "index";
</style>