<script setup>
import LayoutMain from './components/layoutMain.vue'

import {asideStore} from '/src/stores/aside.js'
import {headerStore} from '/src/stores/header.js'
import {mainStore} from '/src/stores/main.js'
import {themStore} from '/src/stores/theme.js'

const AStore = asideStore()
const HStore = headerStore()
const MStore = mainStore()
const TStore = themStore()
</script>

<template>
  <h4>{{ $t('theme.layout.layout.title') }}</h4>
  <el-row class="layout-row" justify="space-between" align="middle">
<!--    垂直布局-->
    <el-col class="layout-col" :span="7" >
      <div class="layout-item" v-bind:class="TStore.layoutType==0?'layout-item-active':''" @click="TStore.setLayoutType(0)">
        <div class="layout-box">
          <aside class="layout-vertical-aside">
            <el-avatar :shape="'square'"></el-avatar>
            <span/><span/><span/><span/>
          </aside>
          <main class="layout-vertical-main">
            <header>
              <el-col :span="12">
                <span class="item" />
              </el-col>
              <el-col :span="12" style="display: flex;justify-content: end;">
                <span class="item" />
                <span class="item" style="margin-right: 2px " />
              </el-col>
            </header>
            <main style="display: flex;flex-grow: 1;width: 100%;margin-top: 3px">
              <LayoutMain />
            </main>
          </main>
        </div>
      </div>
      <span>{{ $t('theme.layout.layout.list.vertical') }}</span>
    </el-col>

<!--    双列菜单-->
    <el-col class="layout-col" :span="7" >
      <div class="layout-item" v-bind:class="TStore.layoutType=='1'?'layout-item-active':''" @click="TStore.setLayoutType(1)">
        <div class="layout-box">
          <aside style="height: 100%;width: 30%">
            <el-row justify="space-around" align="middle"  style="flex-direction: column;width: 60%;height: 100%;background-color: var(--el-color-primary);float: left">
              <span style="height: 5px;width: 5px;background-color: white;" />
              <span style="background-color: white;width: 5px;height: 2px" />
              <span style="background-color: white;width: 5px;height: 2px" />
              <span style="background-color: white;width: 5px;height: 2px" />
              <span style="background-color: white;width: 5px;height: 2px" />
            </el-row>
            <div style="background-color: #E4E4E7;width: 40%;height: 100%;float: left"/>
          </aside>
          <main class="layout-vertical-main">
            <header>
              <el-col :span="12">
                <span class="item" />
              </el-col>
              <el-col :span="12" style="display: flex;justify-content: end;">
                <span class="item" />
                <span class="item" style="margin-right: 2px " />
              </el-col>
            </header>
            <main style="display: flex;flex-grow: 1;width: 100%;margin-top: 3px">
              <LayoutMain />
            </main>
          </main>
        </div>
      </div>
      <span>{{ $t('theme.layout.layout.list.towcolumns') }}</span>
    </el-col>

<!--    水平布局-->
    <el-col class="layout-col" :span="7" >
      <div class="layout-item" v-bind:class="TStore.layoutType==2?'layout-item-active':''" @click="TStore.setLayoutType(2)">
        <div class="layout-box" style="flex-direction: column">
          <header class="layout-level-header">
            <span style="width: 5px;height: 5px;background-color: white;" />
            <span class="item" /><span class="item" /><span class="item" /><span class="item" />
          </header>
          <main style="display: flex;flex-grow: 1;margin-top: 3px">
            <LayoutMain />
          </main>
        </div>
      </div>
      <span>{{ $t('theme.layout.layout.list.horizontal') }}</span>
    </el-col>

<!--    混合菜单-->
    <el-col class="layout-col" :span="7">
      <div class="layout-item" v-bind:class="TStore.layoutType=='3'?'layout-item-active':''" @click="TStore.setLayoutType(3)">
        <div class="layout-box" style="flex-direction: column">
          <header class="layout-level-header">
            <span style="width: 5px;height: 5px;background-color: white;" />
            <span class="item" /><span class="item" /><span class="item" /><span class="item" />
          </header>
          <main style="display: flex;flex-grow: 1;margin-top: 3px">
            <aside style="height: 100%;background-color: #E4E4E7;width: 15px">
              <el-row style="width: 100%;height: 100%;flex-direction: column" justify="space-around" align="middle">
                <span style="background-color: white;width: 10px;height: 3px" />
                <span style="background-color: white;width: 10px;height: 3px" />
                <span style="background-color: white;width: 10px;height: 3px" />
                <span style="background-color: white;width: 10px;height: 3px" />
              </el-row>
            </aside>
            <mian style="display: flex;flex-grow: 1;margin-left: 3px"><LayoutMain /></mian>
          </main>
        </div>
      </div>
      <span>{{ $t('theme.layout.layout.list.mixedmenu') }}</span>
    </el-col>

<!--     全屏内容 -->
    <el-col class="layout-col" :span="7" >
      <div class="layout-item" v-bind:class="TStore.layoutType=='4'?'layout-item-active':''" @click="TStore.setLayoutType(4)">
        <div class="layout-box">
          <LayoutMain />
        </div>
      </div>
      <span>{{ $t('theme.layout.layout.list.fullcontent') }}</span>
    </el-col>


  </el-row>

  <h4>{{ $t('theme.layout.sidebar.title') }}</h4>
  <el-row class="sidebar-row" justify="start" align="middle">
    <el-col class="sidebar-col">
      {{ $t('theme.layout.sidebar.list.showsidebar') }}
      <el-switch v-model="AStore.showAside" />
    </el-col>
    <el-col class="sidebar-col" style="margin-top: 20px">
      {{ $t('theme.layout.sidebar.list.collpasesidebar') }}
      <el-switch v-model="AStore.menuCollapsed" />
    </el-col>
  </el-row>

  <h4>{{ $t('theme.layout.topbar.title') }}</h4>
  <el-row class="sidebar-row" justify="start" align="middle">
    <el-col class="sidebar-col">
      {{ $t('theme.layout.topbar.list.showtopbar') }}
      <el-switch v-model="HStore.isShow" />
    </el-col>
  </el-row>

  <h4>{{ $t('theme.layout.copyright.title') }}</h4>
  <el-row class="sidebar-row" justify="start" align="middle">
    <el-col class="sidebar-col">
      {{ $t('theme.layout.copyright.list.open') }}
      <el-switch v-model="MStore.showFooter" />
    </el-col>
    <el-row style="width: 100%;margin-top: 20px;font-size: 14px;color: var(--el-text-color)">
      <el-col :span="12">
        {{$t('theme.layout.copyright.list.name')}}：
      </el-col>
      <el-col :span="12">
        <el-input v-model="TStore.copyrightname" />
      </el-col>
    </el-row>
    <el-row style="width: 100%;margin-top: 10px;font-size: 14px;color: var(--el-text-color)">
      <el-col :span="12">
        {{$t('theme.layout.copyright.list.date')}}：
      </el-col>
      <el-col :span="12">
        <el-input v-model="TStore.copyrightdate" />
      </el-col>
    </el-row>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";

</style>