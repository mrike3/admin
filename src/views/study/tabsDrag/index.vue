<script setup>
import {ref,onMounted} from 'vue'
import Sortable from 'sortablejs'

const tabs = ref([
    {label: 'A', name: '田正荣'},
    {label: 'B', name: '邓彩林'},
    {label: 'C', name: '陈派'},
    {label: 'D', name: '熊豪'},
    {label: 'E', name: '李京'},
])
onMounted(() => {
  const el = document.querySelector('.tabs-box .el-tabs__nav')
  Sortable.create(el,{
    animation: 150,
    onEnd({newIndex, oldIndex}){
      const currRow = tabs.value.splice(oldIndex, 1)[0];
      tabs.value.splice(newIndex, 0, currRow);
    }
  })
})

</script>

<template>
  <el-row class="tabs-container" justify="center" align="top">
    <el-tabs class="tabs-box" type="border-card">
      <el-tab-pane :label="tab.label" v-for="tab in tabs" :key="tab.label">
        <pre>
          {{ tabs }}
        </pre>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<style scoped lang="scss">
@use "index";
</style>