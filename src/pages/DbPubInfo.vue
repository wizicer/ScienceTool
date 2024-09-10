<script setup lang="ts">
import { Ref, ref } from 'vue'
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold my-6">DB领域会议/期刊信息</h1>
    <table class="table">
      <thead>
        <tr>
          <th>会议/期刊</th>
          <th>会议日期/地点</th>
          <th>链接</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><abbr title="Conference on Management of Data">SIGMOD</abbr></td>
          <td>2025.6.22 Berlin, Germany</td>
          <td>
            <a href="https://2025.sigmod.org/" target="_blank">2025 官网</a>
            <a href="https://dl.acm.org/loi/pacmmod" target="_blank">论文集</a>
          </td>
          <td>
            <p>Round 1:</p>
            <ul>
              <li>Weds, Jan 10, 2024: Abstract Submission and Declaration of COIs</li>
              <li>Weds, Jan 17, 2024: Paper Submission</li>
            </ul>
            <p>Round 2:</p>
            <ul>
              <li>Weds, Apr 10, 2024: Abstract Submission and Declaration of COIs</li>
              <li>Weds, Apr 17, 2024: Paper Submission</li>
            </ul>
            <p>Round 3:</p>
            <ul>
              <li>Weds, Jul 10, 2024: Abstract Submission and Declaration of COIs</li>
              <li>Weds, Jul 17, 2024: Paper Submission</li>
            </ul>
            <p>Round 4:</p>
            <ul>
              <li>Thurs, Oct 10, 2024: Abstract Submission and Declaration of COIs</li>
              <li>Thurs, Oct 17, 2024: Paper Submission</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><abbr title="International Conference on Very Large Data Bases">VLDB</abbr></td>
          <td>TBC London, UK</td>
          <td><a href="https://vldb.org/2025/" target="_blank">2025 官网</a></td>
          <td>每月20~月底，2024.3~2025.3</td>
        </tr>
        <tr>
          <td><abbr title="International Conference on Data Engineering">ICDE</abbr></td>
          <td>2025.11.10 Wellington, New Zealand</td>
          <td><a href="https://www.icdeworldconference2025.com/" target="_blank">2025 官网</a></td>
          <td>
            <p>First Round:</p>
            <ul>
              <li>Submission due: August 2, 2024</li>
            </ul>
            <p>Second Round:</p>
            <ul>
              <li>Submission due: November 25, 2024</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><abbr title="International World Wide Web Conferences">WWW</abbr></td>
          <td>2025.4.28 Sydney, Australia</td>
          <td><a href="https://www2025.org/" target="_blank">2025 官网</a></td>
          <td>
            重要日期：
            <ul>
              <li>摘要提交截止日期：2024年10月7日</li>
              <li>全文提交截止日期：2024年10月14日</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped></style>
