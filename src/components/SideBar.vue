<template>
  <div class="drawer-side">
    <label for="drawer-input" class="drawer-overlay"></label>
    <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/cart">
          Cart
          <div class="badge ml-2 badge-outline" v-text="count"></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const count = 1
</script>
