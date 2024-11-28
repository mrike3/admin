<script setup>
import {asideStore} from '/src/stores/aside.js'
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'
import menuList from '/src/assets/json/menuList.json'
import Recursion from './components/recursion.vue'

const AStore=asideStore()
const MStore=mainStore()
const TStore=themStore()

</script>

<template>
  <el-row class="aside2-container">
    <div class="one-menu" v-bind:class="TStore.sideBarIsDark?'one-menu-dark':''">
      <div class="menu-logo">
        <el-image src="/src/assets/icons/icon2.png" style="width: 38px;" />
      </div>
      <div class="menu-item" v-bind:class="AStore.menuParentIndex===index?'menu-item-active':''" v-for="(item,index) in menuList.data" :key="index" @click="AStore.toggleAside(index)">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <el-text :truncated="true" v-bind:style="TStore.sideBarIsDark?{color: '#fff'}:''" size="small">{{$t(item.meta.title)}}</el-text>
      </div>
    </div>
    <div class="tow-menu">
      <el-container v-bind:class="TStore.sideBarIsDark?'aside-container-dark':'aside-container'">
        <el-header style="padding: 0"  v-if="!AStore.menuCollapsed">
          <el-row justify="center" align="middle" style="width: 100%;height: 100%;">
            <h1>VFIRE ADMIN</h1>
          </el-row>
        </el-header>
        <el-main style="padding: 0;" >
          <el-menu class="aside2-menu" v-bind:style="AStore.menuCollapsed?'':{width: '222px'}" :collapse-transition="false" router  unique-opened="true" :default-active="MStore.activeTabName" :collapse="AStore.menuCollapsed">
            <Recursion :children="menuList.data[AStore.menuParentIndex].children"  />
          </el-menu>
        </el-main>
        <el-footer style="padding: 0;">
          <el-row style="height: 100%;" justify="center" align="middle">
            <el-button size="small" circle @click="AStore.menuCollapsed = !AStore.menuCollapsed">
              <template #icon>
                <el-icon v-if="!AStore.menuCollapsed"><DArrowLeft /></el-icon>
                <el-icon v-if="AStore.menuCollapsed"><DArrowRight /></el-icon>
              </template>
            </el-button>
          </el-row>
        </el-footer>
      </el-container>
    </div>
  </el-row>

</template>

<style scoped lang="scss">
@use "/src/styles/my" as my;
@use "index";
.aside2-container{
  @include my.d-flex($wrap: nowrap);
  width: auto;
  height: 100%;
}
.one-menu{
  border-right: 1px solid var(--el-border-color);
  @include my.d-flex($direction:column,$jc:start);
  padding: 0 8px;
  height: 100%;
  .menu-logo{
    margin-top: 8px;
  }
  .menu-item{
    transition: all 0.3s ease;
    margin-top: 8px;
    @include my.d-flex($direction:column);
    width: 64px;
    padding: 8px 0;
    border-radius: 5px;
    line-height: 25px;
    ::v-deep(.el-icon){
      font-size: 20px;
    }
    &:hover{
      ::v-deep(.el-text){
        color: white;
      }
      cursor: pointer;
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
  .menu-item-active{
    ::v-deep(.el-text){
      color: white;
    }
    background-color: var(--el-color-primary);
    color: #fff;
  }
}
.one-menu-dark{
  background-color: black;
  color: #fff;
}
.tow-menu{
  height: 100%;
}
</style>