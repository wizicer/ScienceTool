<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { styleAbstract, punctuation } from '@/utils/abstractStyler'
import { decodeAsync } from '@msgpack/msgpack'
import { pubTargets, DefaultKeywords } from '@/data/pubdata'

interface CriteriaItem {
  name: string
  keywords: string[]
}

interface PaperInfoItem {
  title?: string
  key?: string
  type?: string
  year?: string
  doi?: string
  publisher?: string
  authors?: string[]
}

interface PaperItem {
  Info: PaperInfoItem
  Abstract?: string
  Keywords?: string[]
  Track?: string
  PdfLink?: string
  VideoLink?: string
  VideoSize?: string
  Citation?: string
  Download?: string
  Badges?: string[]
}

interface ExtendPaperItem extends PaperItem {
  index: number
  topic: string
}

interface TempExtendPaperItem extends PaperItem {
  index?: number
  topic?: string
}

interface TopicData {
  name: string
  papers: ExtendPaperItem[]
  others: ExtendPaperItem[]
}

const passCheck = ref(false)
const convertAbstract = ref(true)

const keywords = ref(
  localStorage.getItem('ccf_pub_keywords') || DefaultKeywords
)
const topics: Ref<TopicData[]> = ref([])
const criterias: Ref<CriteriaItem[]> = ref([])
const selectedTarget = ref(
  localStorage.getItem('ccf_pub_selected') || 'sigmod2022'
)
const targets = pubTargets
function checkSyntax(): void {
  localStorage.setItem('ccf_pub_keywords', keywords.value)
  const kw = keywords.value
  const lines = kw.split('\n')
  let cs = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const pos = line.indexOf(':')
    if (pos == -1) {
      passCheck.value = false
      return
    }
    const name = line.slice(0, pos)
    const keywords = line
      .slice(pos + 1, line.length)
      .split(',')
      .map((_) => _.trim())
      .filter((_) => _)
    if (keywords.length > 0)
      cs.push({
        name,
        keywords: keywords,
      })
  }

  criterias.value = cs
  passCheck.value = true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(selectedTarget, (newValue: string, _oldValue: string) => {
  topics.value = []
  localStorage.setItem('ccf_pub_selected', newValue)
})
function reset() {
  keywords.value = targets[selectedTarget.value].keywords
}
function genLink(id: string): string {
  // const tb = location.toString() // location.hash
  // const bs = tb
  // const q = tb.indexOf('#')
  // return bs.substring(0, q > -1 ? q : bs.length) + '#' + id
  return '#' + id
}
async function process() {
  const presp = await fetch(targets[selectedTarget.value].path)
  if (!presp.body) {
    return
  }

  let papers: TempExtendPaperItem[] = (await decodeAsync(
    presp.body
  )) as PaperItem[]
  // let papers: PaperItem[] = await presp.json()
  // papers = papers.slice(0, 10)
  const allpapers = papers
  if (!papers || papers.length == 0) return

  let count = 1
  topics.value = criterias.value.map((c) => generatePage(c))

  function filterPaper(p: PaperItem, criteria: CriteriaItem) {
    const all = `${p.Info.title} ${p.Abstract} ${(p.Keywords ?? []).join(
      ' '
    )}`.toLowerCase()
    const cs = all.split(punctuation).join(' ')
    return criteria.keywords.some((k) => cs.indexOf(k) > -1)
  }

  function convertTempToExtend(
    items: TempExtendPaperItem[]
  ): ExtendPaperItem[] {
    return items.map((_) =>
      Object.assign({}, _, { topic: _.topic ?? '', index: _.index ?? -1 })
    )
  }

  function generatePage(criteria: CriteriaItem): TopicData {
    const curps = !criteria.keywords
      ? papers
      : papers.filter((p) => filterPaper(p, criteria))
    const allps = !criteria.keywords
      ? []
      : allpapers.filter((p) => filterPaper(p, criteria))

    papers = papers.filter((p) => curps.indexOf(p) == -1)

    const otherPapers = allps.filter((p) => curps.indexOf(p) == -1)
    otherPapers.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    curps.forEach((p) => {
      p.topic = criteria.name
      p.index = count++
    })

    return {
      name: criteria.name,
      papers: convertTempToExtend(curps),
      others: convertTempToExtend(otherPapers),
    }
  }

  // this.topics = topics;
  document.title = targets[selectedTarget.value].title
}
function standardize(id?: string): string {
  if (!id) return ''
  return id.replace(/[^0-9a-zA-Z]+/g, '-')
}
checkSyntax()
</script>

<template>
  <div class="container mx-auto control-panel">
    <h1 class="text-4xl font-bold my-6">出版物生成器</h1>

    <textarea
      v-model="keywords"
      placeholder="Topics, separate by comma(,)"
      spellcheck="false"
      class="textarea textarea-bordered w-full block"
      rows="8"
      @blur="checkSyntax()"
    ></textarea>
    <button
      class="btn btn-primary mt-3 mx-1"
      :disabled="!passCheck"
      @click="process()"
    >
      生成摘要集
    </button>
    <button class="btn mx-1" @click="reset()">重置分类</button>
    <select v-model="selectedTarget" class="select select-bordered mx-1">
      <option v-for="(item, name) in targets" :key="name" :value="name">
        {{ targets[name].title }}
      </option>
    </select>
    <div class="form-control inline-block">
      <label class="label cursor-pointer">
        <input v-model="convertAbstract" type="checkbox" class="checkbox" />
        <span class="label-text mx-1">美化摘要显示</span>
      </label>
    </div>
    <span v-if="passCheck">✅ 分类规则检查通过</span>
    <span v-else>❌ 分类规则发现错误</span>
  </div>

  <div v-if="topics && topics.length > 0" class="output-text container mx-auto">
    <article class="prose">
      <h1 class="text-4xl font-bold my-6">
        {{ targets[selectedTarget].title }}
      </h1>
      <p>
        Total Papers: {{ topics.reduce((pv, cv) => pv + cv.papers.length, 0) }}
      </p>
      <h1 id="toc">ToC</h1>
      <ul
        class="topic-toc space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
      >
        <li v-for="(topic, i) in topics" :key="i">
          <a :href="genLink(standardize(topic.name))">
            {{ topic.name }}
          </a>
          <span> [{{ topic.papers.length }}+{{ topic.others.length }}] </span>
        </li>
      </ul>
    </article>

    <template v-for="(topic, i) in topics" :key="'topic' + i">
      <article class="prose max-w-full">
        <h1 :id="standardize(topic.name)">{{ topic.name }}</h1>
        <ul
          class="toc space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
        >
          <li
            v-for="(paper, j) in [topic.papers, topic.others].flatMap((_) => _)"
            :key="j"
          >
            <span v-if="topic.name != paper.topic" class="index-number">
              <a :href="genLink(standardize(paper.topic))">{{ paper.topic }}</a>
            </span>
            <a :href="genLink(standardize(paper.Info.key))">
              <span class="index-number">{{ paper.index }}</span>
              <span v-if="paper.Track" class="track badge badge-outline">{{
                paper.Track
              }}</span>
              {{ paper.Info.title }}
              <span v-for="(badge, k) in paper.Badges" :key="k" class="badges">
                <span
                  v-if="badge.toLowerCase() == 'best paper'"
                  class=""
                  :title="badge"
                  >🌟</span
                >
                <span
                  v-else-if="badge.toLowerCase() == 'best industry paper'"
                  class=""
                  :title="badge"
                  >🌟</span
                >
                <span
                  v-else-if="badge.toLowerCase() == 'honorable mention'"
                  class=""
                  :title="badge"
                  >🌠</span
                >
                <span v-else class="" :title="badge">🗒️</span>
              </span>
            </a>
          </li>
        </ul>
        <a :href="genLink('toc')" class="control-panel">⟰</a>
      </article>

      <article
        v-for="(paper, j) in topic.papers"
        :key="j"
        class="prose max-w-full"
      >
        <h2 :id="standardize(paper.Info.key)">
          <span class="index-number">{{ paper.index }}</span
          >{{ paper.Info.title }}
        </h2>
        <blockquote>
          <span
            v-for="(author, k) in paper.Info.authors"
            :key="k"
            class="author badge badge-outline badge-primary mx-1"
            >{{ author }}</span
          >
          <br />
          <span v-if="paper.Track" class="track badge mx-1">{{
            paper.Track
          }}</span>
          <span class="publisher badge badge-outline badge-primary mx-1">{{
            paper.Info.publisher
          }}</span>
          <span class="year badge badge-outline badge-primary mx-1">{{
            paper.Info.year
          }}</span>
          <span class="type badge badge-outline badge-secondary mx-1">{{
            paper.Info.type
          }}</span>
          <br />
          <span v-if="paper.PdfLink"
            ><a
              target="_blank"
              :href="paper.PdfLink"
              class="btn btn-xs btn-primary mx-1"
              >PDF</a
            ></span
          >
          <span v-if="paper.VideoLink"
            ><a
              target="_blank"
              :href="paper.VideoLink"
              class="btn btn-xs btn-outline btn-info mx-1"
              >VIDEO[{{ paper.VideoSize }}]</a
            ></span
          >
          <span v-if="paper.Info.doi"
            ><a
              target="_blank"
              :href="paper.Info.doi"
              class="btn btn-xs btn-outline btn-secondary mx-1"
              >DOI</a
            ></span
          >
          <span class="badge badge-outline badge-info badge-sm mx-1"
            >Cite: {{ paper.Citation }}</span
          >
          <span class="badge badge-outline badge-info badge-sm mx-1"
            >Down: {{ paper.Download }}</span
          >
          <template v-if="paper.Keywords && paper.Keywords.length > 0">
            <br />
            <span>Keywords:</span>
            <ul class="keywords">
              <li
                v-for="(keyword, k) in paper.Keywords"
                :key="k"
                class="keyword"
              >
                {{ keyword }}
              </li>
            </ul>
          </template>
        </blockquote>
        <b>Abstract:</b>
        <div class="abstract">
          <p v-if="!convertAbstract">{{ paper.Abstract }}</p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-else v-html="styleAbstract(paper.Abstract ?? '')"></p>
        </div>
        <a :href="genLink('toc')" class="control-panel">⟰</a>
      </article>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  @import '@/styles/abstract.scss';
}
</style>

<style scoped>
ul.toc > li > a {
  text-decoration: none;
  color: inherit;
  font-weight: inherit;
}

.author {
  padding-right: 0.5em;
}

.track {
  text-transform: uppercase;
  quotes: '[' ']';
}

.keywords {
  display: inline;
  list-style: none;
  padding: 0px;
}

.keywords li {
  display: inline;
}

.keywords li::after {
  content: ', ';
}

.keywords li:last-child::after {
  content: '';
}

.author:after:not(:last-child) {
  content: ',';
}

.abstract {
  font-size: 1.05em;
}

.index-number {
  padding: 0px 4px;
  text-align: center;
  border-radius: 5px;
  margin-right: 0.4rem;
  box-shadow: 0px 0px 0px 1px black inset;
}

@media print {
  article {
    break-inside: avoid;
    page-break-before: always;
    display: block;
    min-height: 90vh;
  }

  .control-panel {
    display: none;
  }
}
</style>
<style>
@media print {
  .navbar {
    display: none !important;
  }
}
</style>
