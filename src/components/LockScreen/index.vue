<script setup>
import {ref} from 'vue';
import {themStore} from '/src/stores/theme.js'

const time = ref(getNowTime());
const date = ref(getNowDate());
const TStore = themStore();

function openLock() {
  TStore.lockScreen = false;
  sessionStorage.setItem('lockScreen', '');
}

function getNowTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  return `${hour}:${minute<10?'0'+minute:minute}:${second<10?'0'+second:second}`;
}
function getNowDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  // 获取星期
  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let day = week[now.getDay()];

  return `${year}年${month<10?'0'+month:month}月${date<10?'0'+date:date}日 ${day}`;
}
setInterval(() => {
  time.value = getNowTime();
}, 1000)
</script>

<template>
  <el-row class="lock-container" justify="center" align="middle">
    <video
        class="lock-bg-video"
        loop autoplay muted
        src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/2253a3fece562937f104eab6aeee4e07_preview.mp4" />
    <div class="lock-content">
<!--      <img src="/src/assets/avatar.jpg"  style="width: 120px;height: 120px;border-radius: 50%" />-->
      <font class="lock-time">{{time}}</font>
      <h1>{{date}}</h1>
      <el-button type="primary" @click="openLock">
        <template #icon>
          <el-icon><Right /></el-icon>
        </template>
      </el-button>
    </div>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";
</style>