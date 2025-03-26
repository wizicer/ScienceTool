<script setup lang="ts">
import { ref, computed } from 'vue'
import { csvToArray } from '@/utils/csv'

const filter = ref(localStorage.getItem('ccf_filter') || '')
const categoryCsv = await fetch('/data/category.csv')
const originCategory = csvToArray(await categoryCsv.text())
  .map((_) => ({
    id: _[0],
    icon: _[1],
    category: _[2],
    url: _[3],
  }))
  .slice(1)
const catedic = Object.assign(
  {},
  ...originCategory.map((x) => ({
    [x.id]: x,
  }))
)
const ccfCsv = await fetch('/data/ccf2022.csv')
const ccfpubs = csvToArray(await ccfCsv.text())
  .map((_) => ({
    pubshort: _[0],
    publication: _[1],
    publisher: _[2],
    url: _[3],
    level: _[4],
    type: _[5],
    category: _[6],
  }))
  .slice(1)

const category = catedic

const selectedCategory = ref('')
const levels: { [key: string]: string } = {
  A: '🅰️',
  B: '🅱️',
  C: '©️',
}
const types: { [key: string]: string } = {
  Conference: '👥️️',
  Journal: '️📑',
}
// function process() {}

const filterpubs = computed(() => {
  if (!ccfpubs || ccfpubs.length == 0) return []

  localStorage.setItem('ccf_filter', filter.value)

  const lfilter = filter.value.toLowerCase()

  function standardize(str: string) {
    return str.toLowerCase()
  }
  return ccfpubs.filter(
    (_) =>
      (standardize(_.pubshort).indexOf(lfilter) > -1 ||
        standardize(_.publisher).indexOf(lfilter) > -1 ||
        standardize(_.publication).indexOf(lfilter) > -1) &&
      (!selectedCategory.value || _.category == selectedCategory.value)
  )
})
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold my-6">CCF</h1>
    <p class="text-gray-500 mb-3">
      根据<a
        target="_blank"
        href="https://www.ccf.org.cn/Academic_Evaluation/By_category/2023-03-08/787209.shtml"
        >《中国计算机学会推荐国际学术会议和期刊目录（2022）》</a
      >整理
    </p>

    <input
      v-model="filter"
      type="text"
      placeholder="search"
      class="input input-bordered w-full max-w-xs"
    />
    <select v-model="selectedCategory" class="select select-bordered">
      <option value="">-</option>
      <option v-for="(c, id) in category" :key="id" :value="id">
        {{ c.icon }} {{ c.category }}
      </option>
    </select>

    <div class="mt-5">
      <ul
        class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
      >
        <li v-for="(pub, id) in filterpubs" :key="id">
          {{ levels[pub.level] }}
          <a
            target="_blank"
            class="pub-icon"
            :title="category[pub.category].category"
            :href="category[pub.category].url"
            >{{ category[pub.category].icon }}</a
          >
          <span :title="pub.type">
            {{ types[pub.type] }}
          </span>
          <span>{{ pub.pubshort }}</span
          >, <a target="_blank" :href="pub.url">{{ pub.publication }}</a
          >,
          {{ pub.publisher }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
