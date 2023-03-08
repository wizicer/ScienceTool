<script setup lang="ts">
import { themeChange } from 'theme-change'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
themeChange(false)
</script>

<template>
  <div class="drawer">
    <input id="drawer-input" type="checkbox" class="drawer-toggle" />
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <NavBar />
      <Suspense>
        <router-view></router-view>

        <template #fallback> Loading... </template>
      </Suspense>
    </div>
    <SideBar />
  </div>
</template>

<style></style>
