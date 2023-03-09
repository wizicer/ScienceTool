<script setup lang="ts">
import { Ref, ref } from 'vue'
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold my-6">Deadlines</h1>
    <article class="prose">
      <h2>SIGMOD 2024</h2>

      <ul class="steps steps-vertical">
        <li class="step">CYCLE 1: 2023-01-15 ~ 2023-05-23</li>
        <li class="step">CYCLE 2: 2023-04-15 ~ 2023-08-23</li>
        <li class="step">CYCLE 3: 2023-07-15 ~ 2023-11-23</li>
        <li class="step">CYCLE 4: 2023-10-15 ~ 2024-02-23</li>
      </ul>
      <h2>ICDE 2023: (2024的日程还没有出来，只能作为参考)</h2>
      <ul class="steps steps-vertical">
        <li class="step">CYCLE 1: 2022-04-25 ~ 2022-08-25</li>
        <li class="step">CYCLE 2: 2022-07-08 ~ 2022-11-08</li>
        <li class="step">CYCLE 3: 2022-10-08 ~ 2023-02-08</li>
      </ul>
      <h2>VLDB</h2>
      <p>
        一般一个半月，1号投，下月15号出
        <br />
        PS：第二个时间是最终拒绝/接收的时间。
      </p>
    </article>
  </div>
</template>

<style scoped></style>
