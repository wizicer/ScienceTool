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
const ccf2019Csv = await fetch('/data/ccf2019.csv')
const ccf2019 = csvToArray(await ccf2019Csv.text())
  .map((_) => ({
    id: _[0],
    pubshort: _[1],
    publication: _[2],
    publisher: _[3],
    url: _[4],
    level: _[5],
    type: _[6],
    category: _[7],
  }))
  .slice(1)

const ccfpubs = ccf2019
const category = catedic

const selectedCategory = ref('')
const levels: { [key: string]: string } = {
  A: '🅰️',
  B: '🅱️',
  C: '©️',
}
const types: { [key: string]: string } = {
  Meeting: '👥️️',
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
      <ul class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li v-for="pub in filterpubs" :key="pub.id">
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
          <span :title="pub.id">{{ pub.pubshort }}</span
          >, <a target="_blank" :href="pub.url">{{ pub.publication }}</a
          >,
          {{ pub.publisher }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
