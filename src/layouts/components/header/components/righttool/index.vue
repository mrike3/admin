<script setup>
import {headerStore} from '@/stores/header.js'
import {mainStore} from '@/stores/main.js'
import { useRouter} from 'vue-router'

const HStore = headerStore()
const MStore = mainStore()
const router = useRouter()

function ClickSearchItem(menu){

  if(menu.path=='/home'){
    MStore.activeTabName='/home'
  }else {
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
  }
  HStore.searchShow=false
  HStore.searchValue=''
  MStore.activeTabName=menu.path
  HStore.breadcrumb=menu.breadcrumb
  router.push(menu.path)
}

function dropdownClick(command){
  window.open(command, '_blank')
}
</script>

<template>
<!--  搜索框-->
  <el-dialog :draggable="true" v-model="HStore.searchShow" :width="600" :show-close="false" top="10vh" style="padding: 0;">
    <el-row style="padding: 15px;">
      <el-input
          v-model="HStore.searchValue"
          :placeholder="$t('header.SearchPlaceholder') "
          size="large"
          clearable
          :prefix-icon="'Search'"
      />
    </el-row>
    <el-row style="width: 100%; padding: 10px" v-if="HStore.SearchList.length > 0">
      <div class="search-item" v-for="(item, index) in HStore.SearchList" :key="index"  @click="ClickSearchItem(item)">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>&nbsp;{{ $t(item.meta.title) }}
        <el-icon style="right: 25px;position: absolute">
          <icon-return theme="outline" class="icon1"/>
        </el-icon>
      </div>
    </el-row>
    <el-empty v-else style="margin: 20px" :image-size="100" :description="$t('header.SearchNull')" />
    <el-row class="Search-btn" align="middle" >
      <div class="btn-item">
        <el-icon class="btn-icon">
          <icon-return theme="outline" class="icon1"/>
        </el-icon>
        {{ $t('header.SearchBtn.choose') }}
      </div>
      <div class="btn-item">
        <el-icon class="btn-icon">
          <Top />
        </el-icon>
        <el-icon class="btn-icon">
          <Bottom />
        </el-icon>
        {{ $t('header.SearchBtn.tab') }}
      </div>
      <div class="btn-item">
        <el-icon class="btn-icon">
          <el-text style="font-size: 10px;">
            ESC
          </el-text>
        </el-icon>
        {{ $t('header.SearchBtn.esc') }}
      </div>
      <el-tag type="warning" style="position: absolute;right: 10px">
        No Function
      </el-tag>
    </el-row>
  </el-dialog>

  <el-button circle @click="HStore.searchShow = true">
    <template #icon>
      <icon-search theme="outline" class="icon1" />
    </template>
  </el-button>
  <!--      全屏切换-->
  <el-button circle @click="HStore.FullScreen">
    <template #icon>
      <el-icon v-if="!HStore.isFullScreen" size="18"><FullScreen /></el-icon>
      <icon-off-screen v-if="HStore.isFullScreen" theme="outline" class="icon1"/>
    </template>
  </el-button>

  <el-button circle>
    <template #icon>
      <icon-remind theme="outline" class="icon1"/>
    </template>
  </el-button>
  <!--      主题切换-->
  <el-button circle @click="HStore.toggleTheme">
    <template #icon>
      <icon-sun-one v-if="!HStore.isDark" theme="outline" class="icon1"/>
      <icon-moon v-if="HStore.isDark" theme="outline" class="icon1" />
    </template>
  </el-button>
  <!--      语言切换-->
  <el-dropdown style="margin-left: 10px" trigger="click" @command="HStore.toggleLanguage">
    <el-button circle>
      <icon-translate theme="filled" size="18" class="icon1"/>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" v-bind:disabled="HStore.isZh">简体中文</el-dropdown-item>
        <el-dropdown-item command="en" v-bind:disabled="!HStore.isZh">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dropdown style="margin-left: 10px; margin-right: 10px" trigger="click" @command="dropdownClick">
    <el-avatar src="/admin/img/avatar.jpg" shape="square" size="small" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item disabled>
          <el-row align="middle" justify="start" style="flex-wrap: nowrap;">
            <el-avatar src="/admin/img/avatar.jpg" shape="square"/>
            <el-row style="flex-direction: column; margin-left: 10px;" justify="space-around" align="top">
              <span>Mrike<el-tag>Pro</el-tag> </span>
              <span>3136675549@qq.com</span>
            </el-row>
          </el-row>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <icon-book-open theme="outline" class="icon1"/>&nbsp;
          {{ $t('header.document') }}
        </el-dropdown-item>
        <el-dropdown-item command="https://github.com/mrike3/admin">
          <icon-github theme="outline" class="icon1"/>&nbsp;
          Github
        </el-dropdown-item>
        <el-dropdown-item>
          <icon-help theme="outline" class="icon1"/>&nbsp;
          {{ $t('header.help') }}
        </el-dropdown-item>
        <el-dropdown-item divided>
          <icon-logout theme="outline" class="icon1"/>&nbsp;
          {{ $t('header.logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
@use "index";
</style>