<script setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const list = ref([
  {
    "name": "田正荣",
    "id": 1
  },
  {
    "name": "邓彩林",
    "id": 2
  },
  {
    "name": "陈派",
    "id": 3
  },
  {
    "name": "熊豪",
    "id": 4
  },
  {
    "name": "李京",
    "id": 5
  }
])
const onStart = (e) => {
  console.log('start', e)
}
const onUpdate = (e) => {
  console.log('update', e)
}
const onEnd = (e) => {
  console.log('end', e)
}

const el=ref(null)
</script>

<template>

  <el-row class="draggable-container" justify="center" align="middle">
    <el-row class="draggable-box" justify="center" align="middle">
      <VueDraggable v-model="list" ref="el"
                    :animation="150" :ghost-class="'drag-item-ghost'" :filter="'.fixed-item'"
                    :onStart="onStart" :onUpdate="onUpdate" :onEnd="onEnd"
      >
        <div v-for="(item,index) in list" :key="index" class="draggable-item" v-bind:class="item.name=='田正荣'?'fixed-item':''">
          {{ item.name }}
        </div>
      </VueDraggable>
    </el-row>
    <el-row class="Json-container" justify="center" align="middle">
      <div class="Json-box">
        <pre>
          {{ list }}
        </pre>
      </div>
    </el-row>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";
</style>