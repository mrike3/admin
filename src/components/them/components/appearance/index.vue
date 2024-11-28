<script setup>
import themeColors from '/src/assets/json/theme.json'
import {themStore} from '/src/stores/theme.js'
import {headerStore} from '/src/stores/header.js'
import {ref} from 'vue'

const TStore = themStore()
const HStore = headerStore()

function a(){
  document.getElementById('colorInput').click()
}
</script>

<template>
<!--  主题-->
  <h4>{{$t('theme.appearance.theme.title')}}</h4>
  <el-row style="width: 100%;" justify="space-around" align="middle">
    <el-col :span="7" class="theme-col">
      <div class="theme-item" v-bind:class="HStore.isDark? '': 'theme-item-active'" @click="HStore.changeTheme(false)">
        <icon-sun theme="filled" size="18"  />
      </div>
      <span class="theme-text">{{$t('theme.appearance.theme.list.light')}}</span>
    </el-col>
    <el-col :span="7" class="theme-col">
      <div class="theme-item" v-bind:class="HStore.isDark?'theme-item-active':''" @click="HStore.changeTheme(true)">
        <icon-moon theme="outline" size="18"/>
      </div>
      <span class="theme-text">{{$t('theme.appearance.theme.list.dark')}}</span>
    </el-col>
    <el-col :span="7" class="theme-col">
      <div class="theme-item">
        <icon-dark-mode theme="outline" size="18"/>
      </div>
      <span class="theme-text">{{$t('theme.appearance.theme.list.System')}}</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24" class="dark-col" style="margin-top: 25px;">
      {{ $t('theme.appearance.darksidebar') }}
      <el-switch class="dark-switch" v-model="TStore.sideBarIsDark" @change="TStore.changeSideBarIsDark()" />
    </el-col>
    <el-col :span="24" class="dark-col" style="margin-top: 20px;">
      {{ $t('theme.appearance.darktopbar') }}
      <el-switch class="dark-switch" v-model="TStore.topBarIsDark" @change="TStore.changeTopBarIsDark()" />
    </el-col>
  </el-row>

  <h4>{{$t('theme.appearance.builtin.title')}}</h4>
  <el-row style="width: 100%;flex-direction: column" justify="center" align="middle">
    <div class="theme-row">
      <el-col :span="7" :xs="5" class="theme-col" v-for="(item, index) in themeColors" :key="index" @click="TStore.toggleThemeColor(item.color)">
        <div class="theme-item" v-bind:class="TStore.themeColor==item.color? 'theme-item-active': ''">
          <div style="border-radius:5px;width: 20px;height: 20px;" v-bind:style="{backgroundColor: item.color}"></div>
        </div>
        <span class="theme-text">{{$t(item.title)}}</span>
      </el-col>
      <el-col :span="7" :xs="5" class="theme-col" @click="a">
        <div class="theme-item">
          <icon-background-color theme="outline" size="18" />
          <el-input type="color" v-model="TStore.themeColor" style="width: 0;height: 0;opacity: 0" @change="TStore.changeThemeColor()" id="colorInput"  />
        </div>
        <span class="theme-text">{{$t('theme.appearance.builtin.list.customize')}}</span>
      </el-col>
    </div>
  </el-row>

  <h4>{{$t('theme.appearance.other.title')}}</h4>
  <el-row>
    <el-col :span="24" class="dark-col">
      {{ $t('theme.appearance.other.list.weakmode') }}
      <el-switch class="dark-switch" v-model="TStore.isInvert" @change="TStore.toggleInvert()" />
    </el-col>
    <el-col :span="24" class="dark-col" style="margin-top: 20px;">
      {{ $t('theme.appearance.other.list.graymode') }}
      <el-switch class="dark-switch" v-model="TStore.isGray" @change="TStore.toggleGray" />
    </el-col>
  </el-row>


</template>

<style scoped lang="scss">
@use "index";
</style>