<script setup lang="ts">
import HeaderBanner from './components/HeaderBanner.vue'
</script>

<template>
  <div class="app-container">
    <div class="header-fixed">
      <HeaderBanner />
    </div>
    <main class="main-content">
      <router-view />
    </main>

    <div class="footer">
      <span class="more-link">
        更多 >
      </span>
      <div class="footer-right">
        <span class="message-link">
          <i class="icon icon-message"></i>
          站内消息
        </span>
        <span class="divider">|</span>
        <span class="message-link">
          <i class="icon icon-feedback"></i>
          功能反馈
        </span>
      </div>
    </div>
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

.footer {
  height: 26px;
  min-height: 26px;
  flex-shrink: 0;
  /* 防止footer被压缩 */
  background-color: #ebf5ff;
  border-top: 1px solid #d9e8f8;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.footer-right {
  padding-right: 15px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  background-image: url(data:image/png;base64,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);
  height: 26px;
  padding-left: 24px;
  padding-right: 15px;
  border-top-left-radius: 15px;
}

.more-link {
  cursor: pointer;
  margin-right: 4px;
  color: #555;
  font-size: 13px;
  display: flex;
  align-items: center;
  /* position: absolute; */
  left: 10px;
  height: 26px;
}

.divider {
  margin: 0 8px;
  color: white;
}

.message-link {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.more-link:hover,
.message-link:hover {
  text-decoration: underline;
}

/* 图标样式 */
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.icon-more {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'/%3E%3C/svg%3E");
}

.icon-message {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'/%3E%3C/svg%3E");
}

.icon-feedback {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z'/%3E%3C/svg%3E");
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