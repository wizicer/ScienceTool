<template>
  <div class="navbar mb-2 shadow-lg bg-base-300">
    <!-- <div class="flex-none lg:hidden">
      <label for="drawer-input" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div> -->
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold">
        <router-link to="/">科研工具</router-link>
      </span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/pubgen">出版物</router-link></li>
        <li><router-link to="/ccf">CCF排名</router-link></li>
        <li><router-link to="/combiner">文字合并</router-link></li>
        <li tabindex="0">
          <a>
            实验
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </a>
          <ul class="p-2 bg-base-100">
            <li><router-link to="/distiller">文字蒸馏</router-link></li>
            <li><router-link to="/deadlines">截止日期</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex-1 lg:flex-none"></div>
  </div>
</template>
