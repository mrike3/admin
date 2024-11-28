<script setup>
import { mainStore } from '/src/stores/main.js'
import { useRouter } from 'vue-router'

const MStore = mainStore()
const router = useRouter()

if(MStore.currentTab.isKeepAlive){
  MStore.KeepAliveNames.push(MStore.currentTab.KeepName)
}

router.replace({path: MStore.activeTabName})


</script>

<template>

</template>

<style scoped lang="scss">

</style>