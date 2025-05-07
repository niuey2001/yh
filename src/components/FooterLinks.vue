<script setup lang="ts">
// 定义链接分类
const linkCategories = [
    {
        title: '系统功能',
        links: [
            { text: '用户管理', url: '/users' },
            { text: '报表查询', url: '/reports' },
            { text: '开奖历史', url: '/history' },
            { text: '即时订单', url: '/orders' }
        ]
    },
    {
        title: '帮助与支持',
        links: [
            { text: '操作指南', url: '#' },
            { text: '常见问题', url: '#' },
            { text: '联系客服', url: '#' },
            { text: '意见反馈', url: '#' }
        ]
    },
    {
        title: '相关资源',
        links: [
            { text: '开奖公告', url: '#' },
            { text: '最新活动', url: '#' },
            { text: '系统公告', url: '#' },
            { text: '资料下载', url: '#' }
        ]
    }
]
</script>

<template>
    <div class="footer-links">
        <div v-for="(category, index) in linkCategories" :key="index" class="link-category">
            <h3 class="category-title">{{ category.title }}</h3>
            <ul class="links-list">
                <li v-for="(link, linkIndex) in category.links" :key="linkIndex">
                    <a :href="link.url">{{ link.text }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 0.5rem;
}

.link-category {
    min-width: 120px;
}

.category-title {
    font-size: 13px;
    color: #555;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.links-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.links-list li {
    margin-bottom: 0.4rem;
}

.links-list a {
    color: #666;
    text-decoration: none;
    font-size: 12px;
    transition: color 0.2s;
    display: block;
}

.links-list a:hover {
    color: #0078d7;
}

@media (max-width: 768px) {
    .footer-links {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>