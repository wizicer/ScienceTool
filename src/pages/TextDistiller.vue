<script setup lang="ts">
import { Ref, ref } from 'vue'
// import * as wa  from 'jieba-wasm/pkg/web/jieba_rs_wasm_bg.wasm'
import { cut } from 'jieba-wasm/pkg/web/jieba_rs_wasm'
import init from 'jieba-wasm/pkg/web/jieba_rs_wasm'

// const d = wa;
// console.log(d);

await init(new URL('/jieba_rs_wasm_bg.wasm', window.location.toString()))
// defineProps<{ msg: string }>()
const text = ref('')
const wordsList: Ref<{ word: string; count: number }[]> = ref([
  { word: 'test', count: 1 },
  { word: 'test2', count: 2 },
])
function process() {
  const array: string[] = cut(text.value, true)
  console.log(array)
  const dict: { [key: string]: number } = {}
  // const dict = wordsList.value
  for (let i = 0; i < array.length; i++) {
    const word = array[i]
    if (word.match(/[\d.-]/)) continue
    if (dict[word]) {
      dict[word]++
    } else {
      dict[word] = 1
    }
  }
  var items = Object.keys(dict).map((key) => ({ word: key, count: dict[key] }))
  items.sort((first, second) => {
    return first.count - second.count
  })
  wordsList.value = items
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold my-6">Text Distiller</h1>
    <textarea
      v-model="text"
      class="textarea textarea-bordered w-full block"
      rows="8"
      placeholder="Text"
    ></textarea>
    <button class="btn mt-3" @click="process()">Process</button>
    <div class="grid grid-cols-5">
      <template v-for="(word, i) in wordsList" :key="i">
        <h5 class="text-sm">
          {{ word.word }}
          <span class="badge badge-xs">{{ word.count }}</span>
        </h5>
      </template>
    </div>
  </div>
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
