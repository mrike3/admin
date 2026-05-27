<script setup>
import { mainStore } from "/src/stores/main.js";
import { useRouter, useRoute } from "vue-router";

const MStore = mainStore();
const router = useRouter();
const route = useRoute();

if (MStore.currentTab.isKeepAlive) {
    MStore.KeepAliveNames.push(MStore.currentTab.KeepName);
}

const { params, query } = route;
const { path } = params;

router.replace({ path: "/" + path, query });
</script>

<template></template>

<style scoped lang="scss"></style>
