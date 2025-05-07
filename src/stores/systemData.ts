import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemDataStore = defineStore('systemData', () => {
    // 系统数据
    const statsData = ref({
        todayOrders: 128,
        bettingCount: 1024,
        bettingAmount: 25600
    })

    // 设备统计数据
    const deviceStats = ref({
        pc: 45,
        h5: 30,
        app: 20,
        other: 5
    })

    // 系统公告
    const announcements = ref([
        {
            id: 1,
            title: '系统更新通知',
            content: '系统将于下周进行版本更新，新增功能：自定义报表、数据导出等',
            date: '2023-10-15'
        },
        {
            id: 2,
            title: '用户管理功能优化',
            content: '用户管理模块新增批量操作功能，欢迎试用并提供反馈',
            date: '2023-10-12'
        }
    ])

    // 整体看板数据
    const dashboardData = ref({
        winAmount: 15280,
        betCount: 8432,
        betAmount: 128650,
        onlinePeak: 1024
    })

    // 获取最新数据
    const fetchLatestData = async () => {
        try {
            // 这里应该是API请求逻辑
            // 模拟一个更新
            statsData.value.todayOrders += Math.floor(Math.random() * 10)
            statsData.value.bettingCount += Math.floor(Math.random() * 50)
            statsData.value.bettingAmount += Math.floor(Math.random() * 1000)

            return true
        } catch (error) {
            console.error('数据获取失败', error)
            return false
        }
    }

    // 更新设备统计
    const updateDeviceStats = (newStats: { pc: number, h5: number, app: number, other: number }) => {
        deviceStats.value = newStats
    }

    // 添加系统公告
    const addAnnouncement = (announcement: { title: string, content: string }) => {
        const newId = announcements.value.length > 0
            ? Math.max(...announcements.value.map(a => a.id)) + 1
            : 1

        announcements.value.unshift({
            id: newId,
            title: announcement.title,
            content: announcement.content,
            date: new Date().toISOString().split('T')[0]
        })
    }

    return {
        statsData,
        deviceStats,
        announcements,
        dashboardData,
        fetchLatestData,
        updateDeviceStats,
        addAnnouncement
    }
}) 