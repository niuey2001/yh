<script setup lang="ts">
import { ref, computed } from 'vue'

interface Message {
    id: number
    title: string
    content: string
    date: string
    read: boolean
}

const messages = ref<Message[]>([
    {
        id: 1,
        title: '系统更新通知',
        content: '系统将于2023年10月15日凌晨2点至4点进行维护升级，请安排好使用时间。',
        date: '2023-10-10',
        read: false
    },
    {
        id: 2,
        title: '账户安全提醒',
        content: '您的账户近期有异常登录，请尽快修改密码并开启双重认证。',
        date: '2023-10-09',
        read: false
    },
    {
        id: 3,
        title: '节日活动公告',
        content: '国庆期间系统推出多项优惠活动，详情请查看活动页面。',
        date: '2023-10-01',
        read: false
    }
])

const showMessageModal = ref(false)
const selectedMessage = ref<Message | null>(null)

const openMessage = (message: Message) => {
    selectedMessage.value = message
    showMessageModal.value = true
    // 标记为已读
    message.read = true
}

const closeMessage = () => {
    showMessageModal.value = false
}

const unreadCount = computed(() => {
    return messages.value.filter(m => !m.read).length
})
</script>

<template>
    <div class="message-center">
        <div class="message-header">
            <h3>站内消息 <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span></h3>
            <button class="all-read-btn" v-if="unreadCount > 0" @click="messages.forEach(m => m.read = true)">
                全部标为已读
            </button>
        </div>

        <div class="message-list" v-if="messages.length > 0">
            <div v-for="message in messages" :key="message.id" class="message-item" :class="{ 'unread': !message.read }"
                @click="openMessage(message)">
                <div class="message-info">
                    <span class="message-title">{{ message.title }}</span>
                    <span class="message-date">{{ message.date }}</span>
                </div>
                <div class="message-preview">{{ message.content.substring(0, 40) }}...</div>
            </div>
        </div>
        <div v-else class="no-messages">
            暂无消息
        </div>

        <!-- 消息详情弹窗 -->
        <div class="message-modal" v-if="showMessageModal && selectedMessage">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>{{ selectedMessage.title }}</h3>
                    <button class="close-btn" @click="closeMessage">×</button>
                </div>
                <div class="modal-body">
                    <div class="message-date-full">{{ selectedMessage.date }}</div>
                    <div class="message-content">{{ selectedMessage.content }}</div>
                </div>
                <div class="modal-footer">
                    <button @click="closeMessage">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.message-center {
    width: 100%;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.message-header h3 {
    color: #0078d7;
    margin: 0;
    position: relative;
}

.badge {
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    position: relative;
    top: -1px;
    margin-left: 5px;
}

.all-read-btn {
    background: none;
    border: 1px solid #0078d7;
    color: #0078d7;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
}

.all-read-btn:hover {
    background-color: #f0f7fd;
}

.message-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 4px;
}

.message-item {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
}

.message-item:last-child {
    border-bottom: none;
}

.message-item:hover {
    background-color: #f5f5f5;
}

.message-item.unread {
    background-color: #f0f7fd;
    position: relative;
}

.message-item.unread::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: #0078d7;
}

.message-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.message-title {
    font-weight: 600;
    color: #333;
}

.message-date {
    font-size: 0.8rem;
    color: #888;
}

.message-preview {
    font-size: 0.9rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.no-messages {
    text-align: center;
    padding: 2rem;
    color: #888;
    font-style: italic;
}

/* 弹窗样式 */
.message-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 6px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    color: #0078d7;
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
}

.modal-body {
    padding: 1rem;
}

.message-date-full {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.message-content {
    line-height: 1.6;
}

.modal-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
}

.modal-footer button {
    background-color: #0078d7;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.modal-footer button:hover {
    background-color: #0069be;
}
</style>