<script setup lang="ts">
import { ref, computed } from 'vue'

// 模拟数据
const orders = ref([
    { id: 1001, user: '用户A', amount: 1000, time: '2023-10-20 10:30:25', status: '已完成' },
    { id: 1002, user: '用户B', amount: 1500, time: '2023-10-20 11:15:42', status: '待处理' },
    { id: 1003, user: '用户C', amount: 800, time: '2023-10-20 12:05:18', status: '已取消' },
    { id: 1004, user: '用户D', amount: 2000, time: '2023-10-20 13:20:55', status: '处理中' },
    { id: 1005, user: '用户E', amount: 3500, time: '2023-10-20 14:45:30', status: '已完成' }
])

const searchQuery = ref('')
const statusFilter = ref('全部')

const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesSearch = order.user.includes(searchQuery.value) ||
            order.id.toString().includes(searchQuery.value);
        const matchesStatus = statusFilter.value === '全部' || order.status === statusFilter.value;
        return matchesSearch && matchesStatus;
    });
})

function getStatusClass(status: string) {
    switch (status) {
        case '已完成': return 'status-success';
        case '待处理': return 'status-pending';
        case '已取消': return 'status-cancelled';
        case '处理中': return 'status-processing';
        default: return '';
    }
}
</script>

<template>
    <div class="orders-container">
        <div class="page-header">
            <h1>即时订单</h1>
            <div class="header-actions">
                <div class="search-box">
                    <input type="text" v-model="searchQuery" placeholder="搜索用户或订单号" class="search-input" />
                    <button class="search-btn">搜索</button>
                </div>
                <div class="filter-box">
                    <select v-model="statusFilter" class="status-filter">
                        <option>全部</option>
                        <option>已完成</option>
                        <option>待处理</option>
                        <option>已取消</option>
                        <option>处理中</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="section-container">
            <div class="section-title">订单列表</div>
            <div class="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>订单ID</th>
                            <th>用户</th>
                            <th>金额</th>
                            <th>时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in filteredOrders" :key="order.id">
                            <td>{{ order.id }}</td>
                            <td>{{ order.user }}</td>
                            <td>¥{{ order.amount.toLocaleString() }}</td>
                            <td>{{ order.time }}</td>
                            <td>
                                <span class="status-badge" :class="getStatusClass(order.status)">
                                    {{ order.status }}
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="action-btn view">查看</button>
                                    <button class="action-btn edit">编辑</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pagination">
                <button class="page-btn prev">上一页</button>
                <div class="page-numbers">
                    <button class="page-number active">1</button>
                    <button class="page-number">2</button>
                    <button class="page-number">3</button>
                    <span class="page-ellipsis">...</span>
                    <button class="page-number">10</button>
                </div>
                <button class="page-btn next">下一页</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.orders-container {
    width: 100%;
    color: #333;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

h1 {
    color: #0078d7;
    font-size: 24px;
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 15px;
}

.search-box {
    display: flex;
}

.search-input {
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    padding: 8px 12px;
    width: 250px;
    font-size: 14px;
}

.search-btn {
    background-color: #0078d7;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
}

.search-btn:hover {
    background-color: #0069be;
}

.status-filter {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    min-width: 120px;
}

.section-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    font-weight: 500;
}

.orders-table {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: #f5f5f5;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    color: #555;
    border-bottom: 2px solid #e0e0e0;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
}

tr:hover {
    background-color: #f9f9f9;
}

.status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

.status-success {
    background-color: rgba(76, 217, 100, 0.1);
    color: #4cd964;
}

.status-pending {
    background-color: rgba(255, 204, 0, 0.1);
    color: #ffcc00;
}

.status-cancelled {
    background-color: rgba(255, 59, 48, 0.1);
    color: #ff3b30;
}

.status-processing {
    background-color: rgba(90, 200, 250, 0.1);
    color: #5ac8fa;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
}

.action-btn.view {
    background-color: #e7f3ff;
    color: #0078d7;
}

.action-btn.edit {
    background-color: #fff8e1;
    color: #ffc107;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
}

.page-btn {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
}

.page-btn:hover {
    background-color: #e9e9e9;
}

.page-numbers {
    display: flex;
    gap: 5px;
    align-items: center;
}

.page-number {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
}

.page-number.active {
    background-color: #0078d7;
    color: white;
    border-color: #0078d7;
}

.page-ellipsis {
    color: #999;
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .header-actions {
        width: 100%;
        flex-direction: column;
    }

    .search-input {
        width: 100%;
    }

    .status-filter {
        width: 100%;
    }
}
</style>