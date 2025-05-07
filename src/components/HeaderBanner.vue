<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('首页')

const tabs = [
    { name: '首页', path: '/' },
    { name: '即时注单', path: '/orders' },
    { name: '用户管理', path: '/users' },
    { name: '报表查询', path: '/reports' },
    { name: '内部管理', path: '/internal' },
    { name: '公告管理', path: '/notices' },
    { name: '开奖历史', path: '/history' },
    { name: '开奖网', path: '/lottery' }
]

const switchTab = (tab: { name: string, path: string }) => {
    activeTab.value = tab.name
    router.push(tab.path)
}
</script>

<template>
    <header class="banner-container">
        <div class="banner-top">
            <div class="logo">
                <img src="/images/logo.png" alt="壹号系统" width="24" height="24" style="border-radius: 4px;" />
                <span class="logo-text">壹号系统</span>
            </div>
            <div class="user-info">
                <div class="color-blocks">
                    <div class="color-block checked"></div>
                    <div class="color-block yellow"></div>
                    <div class="color-block red"></div>
                    <div class="color-block blue"></div>
                    <div class="color-block green"></div>
                </div>
                <span class="online-status">在线 1/0</span>
                <span class="time">当前 19:11</span>
            </div>
        </div>
        <nav class="banner-tabs">
            <div v-for="tab in tabs" :key="tab.name" class="tab-item" :class="{ active: activeTab === tab.name }"
                @click="switchTab(tab)">
                {{ tab.name }}
            </div>
        </nav>
    </header>
</template>

<style scoped>
.banner-container {
    width: 100%;
    font-family: "Microsoft YaHei", Arial, sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-top {
    height: 50px;
    background: linear-gradient(to right, #1e90ff, #0078d7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: white;
}

.logo {
    display: flex;
    align-items: center;
}

.logo-text {
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
    letter-spacing: 1px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 13px;
}

.color-blocks {
    display: flex;
    align-items: center;
}

.color-block {
    width: 16px;
    height: 16px;
    margin-left: 3px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: transform 0.2s;
}

.color-block:hover {
    transform: scale(1.1);
}

.color-block.checked {
    background-color: transparent;
    position: relative;
}

.color-block.checked::before {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 10px;
}

.color-block.yellow {
    background-color: #ffcc00;
}

.color-block.red {
    background-color: #ff4444;
}

.color-block.blue {
    background-color: #2196f3;
}

.color-block.green {
    background-color: #4caf50;
}

.banner-tabs {
    background-color: #d5e9ff;
    display: flex;
    height: 45px;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #e0e0e0;
    justify-content: center;
}

.tab-item {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #555;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
    position: relative;
}

.tab-item:hover {
    color: #0078d7;
    background-color: rgba(0, 120, 215, 0.05);
}

.tab-item.active {
    color: #0078d7;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #0078d7;
}

@media (max-width: 768px) {
    .tab-item {
        padding: 0 15px;
        font-size: 13px;
    }

    .user-info {
        gap: 10px;
    }
}
</style>