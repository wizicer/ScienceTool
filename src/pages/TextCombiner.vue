<script setup lang="ts">
import { toLatex } from '@/utils/latex'
import { copy } from '@/utils/clipboard'
import { ref, computed } from 'vue'

const input = ref(localStorage.getItem('combine_text') || '')
const convertLatex = ref(true)
const output = computed(function () {
  function median(numbers: number[]) {
    const sorted = numbers.slice().sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2
    }

    return sorted[middle]
  }

  let inp = input.value
  localStorage.setItem('combine_text', inp)
  // eslint-disable-next-line vue/no-parsing-error
  inp = inp.replaceAll('', '')
  if (convertLatex.value) {
    inp = toLatex(inp)
  }
  let olines = []
  let oline = ''

  const lines = inp.split('\n')
  const m = median(lines.map((_) => _.length))
  const min = m - Math.ceil(m * 0.2)
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.length >= min) {
      oline += ' ' + line
    } else {
      oline += ' ' + line
      oline = oline.trim()
      olines.push(oline)
      oline = ''
    }
  }

  oline = oline.trim()
  if (oline) olines.push(oline)

  return olines.map((_) => _.trim()).join('\n\n')
})
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold my-6">文字合并</h1>
    <textarea
      v-model="input"
      class="textarea textarea-bordered w-full block"
      rows="8"
      placeholder="Text"
    ></textarea>
    <a
      target="_blank"
      class="btn btn-primary mt-3"
      :href="
        'https://translate.google.com/?sl=en&tl=zh-CN&text=' +
        encodeURIComponent(output)
      "
      >Translate</a
    >
    <a
      href="javascript:void(0)"
      class="btn btn-outline btn-secondary ml-2"
      @click="copy(output)"
      >Copy</a
    >
    <div class="form-control inline-block">
      <label class="label cursor-pointer">
        <input v-model="convertLatex" type="checkbox" class="checkbox" />
        <span class="label-text mx-1">Convert Latex</span>
      </label>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="output.replaceAll('\n\n', '<br/><br/>')"></p>
  </div>
</template>

<style scoped></style>
