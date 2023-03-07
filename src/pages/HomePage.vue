<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  HOMEPAGE
  <h1 class="text-4xl font-bold my-6">{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>



  <button
    class="bg-white hover:bg-gray-50 py-2 px-4 border border-gray-200 rounded shadow-sm"
    type="button"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
p {
  @apply my-4;
}

a {
  @apply text-link;
}

code {
  @apply bg-code py-0.5 px-1 text-code text-sm;
}
</style>
