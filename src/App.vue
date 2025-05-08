<script setup lang="ts">
import HeaderBanner from './components/HeaderBanner.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="app-container">
    <div class="header-fixed">
      <HeaderBanner />
    </div>
    <main class="main-content">
      <router-view />
    </main>

    <FooterBar />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #f5f5f5;
  overflow: hidden;
  /* 防止页面整体出现滚动条 */
}

.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-fixed {
  top: 0;
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  /* 只在内容区域显示滚动条 */
  padding: 20px;
  background-color: #f5f5f5;
  width: 100%;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
</style>