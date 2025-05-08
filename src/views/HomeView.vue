<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useSystemDataStore } from '@/stores/systemData'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

// 注册必要的ECharts组件
use([PieChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent])

const systemData = useSystemDataStore()

const currentTimeStr = ref(formatTime(new Date()))
const statusFilter = ref('全部')
const activeTimeFilter = ref('week')
const chartInstance = ref<InstanceType<typeof VChart> | null>(null)

// 为ECharts图表准备数据
const pieOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: '投注占比',
      left: '50%'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: '60%',
      top: 'middle',
      data: ['PC端', 'H5端', 'APP端', '其他'],
      textStyle: {
        color: '#555'
      },
      formatter: function (name: string) {
        const value = systemData.deviceStats[name.replace('端', '').toLowerCase() as keyof typeof systemData.deviceStats]
        return `${name} (${value}%)`;
      }
    },
    series: [
      {
        name: '投注占比',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: systemData.deviceStats.pc, name: 'PC端', itemStyle: { color: '#4299e1' } },
          { value: systemData.deviceStats.h5, name: 'H5端', itemStyle: { color: '#fc8181' } },
          { value: systemData.deviceStats.app, name: 'APP端', itemStyle: { color: '#f6ad55' } },
          { value: systemData.deviceStats.other, name: '其他', itemStyle: { color: '#68d391' } }
        ]
      }
    ]
  };
});

function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

// 更新时间
setInterval(() => {
  currentTimeStr.value = formatTime(new Date())
}, 1000)

function resizeChart() {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
}

// 加载最新数据
onMounted(async () => {
  await systemData.fetchLatestData()

  // 等待DOM更新后执行图表初始化
  nextTick(() => {
    // 等待窗口加载完成，确保DOM尺寸已经计算
    window.addEventListener('load', () => {
      resizeChart();
    });
  });

  // 添加窗口大小改变的监听
  window.addEventListener('resize', resizeChart);
})
</script>

<template>
  <div class="home-container">
    <div class="section-title">
      实时数据 <span class="info-icon" title="最近24小时内的统计数据">?</span>
      <span class="update-time">更新时间: {{ new Date().toLocaleString() }}</span>
    </div>

    <div class="section-container">
      <div class="stats-container">
        <div class="stats-row">
          <div class="stats-card cyan">
            <div class="card-title">今日输赢</div>
            <div class="card-value">{{ systemData.statsData.todayOrders }}</div>
            <i class="card-icon1"></i>
          </div>

          <div class="stats-card purple">
            <div class="card-title">投注笔数</div>
            <div class="card-value">{{ systemData.statsData.bettingCount }}</div>
            <i class="card-icon2"></i>
          </div>

          <div class="stats-card coral">
            <div class="card-title">投注金额</div>
            <div class="card-value">¥{{ systemData.statsData.bettingAmount.toLocaleString() }}</div>
            <i class="card-icon3"></i>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-section">
            <div class="chart-content">
              <v-chart class="chart" :option="pieOption" autoresize ref="chartInstance" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="section-title">
        整体看板
        <div class="time-filter">
          <button class="time-btn" :class="{ active: activeTimeFilter === 'week' }"
            @click="activeTimeFilter = 'week'">本周</button>
          <button class="time-btn" :class="{ active: activeTimeFilter === 'lastWeek' }"
            @click="activeTimeFilter = 'lastWeek'">上周</button>
          <button class="time-btn" :class="{ active: activeTimeFilter === 'month' }"
            @click="activeTimeFilter = 'month'">本月</button>
        </div>
      </div>

      <div class="dashboard-stats">
        <div class="dashboard-card">
          <div class="dashboard-title">输赢金额</div>
          <div class="dashboard-value">¥{{ systemData.dashboardData.winAmount.toLocaleString() }}</div>
          <div class="dashboard-trend trend-up">+12.5%</div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-title">投注笔数</div>
          <div class="dashboard-value">{{ systemData.dashboardData.betCount.toLocaleString() }}</div>
          <div class="dashboard-trend trend-up">+8.3%</div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-title">投注金额</div>
          <div class="dashboard-value">¥{{ systemData.dashboardData.betAmount.toLocaleString() }}</div>
          <div class="dashboard-trend trend-down">-2.1%</div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-title">在线峰值</div>
          <div class="dashboard-value">{{ systemData.dashboardData.onlinePeak.toLocaleString() }}</div>
          <div class="dashboard-trend trend-up">+15.7%</div>
        </div>
      </div>

      <div class="chart-placeholder large">
        <div class="line-chart">
          <div class="chart-axis-y">
            <div class="axis-label">10k</div>
            <div class="axis-label">8k</div>
            <div class="axis-label">6k</div>
            <div class="axis-label">4k</div>
            <div class="axis-label">2k</div>
            <div class="axis-label">0</div>
          </div>
          <div class="chart-grid"></div>
          <div class="chart-axis-x">
            <div class="axis-label">周一</div>
            <div class="axis-label">周二</div>
            <div class="axis-label">周三</div>
            <div class="axis-label">周四</div>
            <div class="axis-label">周五</div>
            <div class="axis-label">周六</div>
            <div class="axis-label">周日</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="section-header">
        <div class="section-title">彩票排行榜</div>

        <div class="time-filter">
          <div class="tab-select-container">
            <select v-model="statusFilter" class="tab-select">
              <option value="全部">全部</option>
              <option value="Top10">Top10</option>
            </select>
          </div>

          <button class="time-btn" :class="{ active: activeTimeFilter === 'week' }"
            @click="activeTimeFilter = 'week'">本周</button>
          <button class="time-btn" :class="{ active: activeTimeFilter === 'lastWeek' }"
            @click="activeTimeFilter = 'lastWeek'">上周</button>
          <button class="time-btn" :class="{ active: activeTimeFilter === 'month' }"
            @click="activeTimeFilter = 'month'">本月</button>
        </div>
      </div>
      <div class="lottery-stats">彩票总数：<span class="stats-value">0</span></div>
      <div class="lottery-table">
        <table>
          <thead>
            <tr>
              <th class="column-rank">排名</th>
              <th class="column-name">彩种名称</th>
              <th class="column-count">投注笔数 <i class="sort-icon">▼</i></th>
              <th class="column-bet">投注金额 <i class="sort-icon">▼</i></th>
              <th class="column-win">输赢金额 <i class="sort-icon">▼</i></th>
            </tr>
          </thead>
          <tbody>
            <tr class="empty-data">
              <td colspan="5">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 0 120px;
  width: 100%;
  color: #333;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #e0e0e0;
}

.welcome-message {
  font-size: 16px;
  color: #555;
}

.user-highlight {
  color: #0078d7;
  font-weight: 600;
}

.current-time {
  background-color: #0078d7;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.section-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  color: #656b7b;
  margin-bottom: 15px;
  /* font-weight: 500; */
  display: flex;
  align-items: center;
  position: relative;
}

.info-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #999;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
}

.update-time {
  position: absolute;
  right: 0;
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

.stats-container {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.stats-row {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
}

.stats-card {
  border-radius: 8px;
  padding: 20px;
  color: white;
  position: relative;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-card.cyan {
  background: linear-gradient(135deg, #37b9d6, #2eccb0);
}

.stats-card.purple {
  background: linear-gradient(135deg, #876edd, #948fe3);
}

.stats-card.coral {
  background: linear-gradient(135deg, #f8836f, #ffa382);
}

.card-title {
  font-size: 14px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-trend {
  font-size: 12px;
  opacity: 0.8;
}

.trend-up {
  color: #4cd964;
}

.trend-down {
  color: #ff3b30;
}

.card-icon1 {
  position: absolute;
  height: 44px;
  width: 44px;
  right: 40px;
  top: 35px;
  font-size: 24px;
  opacity: 0.8;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAACQklEQVR42tXXO2gUQRjA8Tk0nq9CC3MRjG8kFomQzqBYxETluoApDDHGx4UQjBbpYiFYpdPOzsJKUZQgCYopA8IhAa0ENZdcIB4WIvEZk/tbuPft7N7Met6Oxc02s/vd92Nudl6rVM0WNtDPBHmKVF4+MfI39iQ5qilF9kSxGVaotjTZ2eMx2Nt2to5Z+dlzemhmf8XXtqhu6BN21O1oeOyxkw6sNFmWyJJWSjHvwd0OWL+kFctedWdsOKvBWSXVVGz4mwYvOYM5xep/aDFHA+2FtBOYVj6L8700KmLDHOSjKDf9xzFhdrMgxh0SFcO0M84ttluiDbwV4QFr9FAkzDnvXedpNUS38kryn7IuGIyAOa8Noa+cDkU380Ki02wMJ1thLoZ2kyLX/T4kyZREZthS3ioLTMa4Sd3/0zLWyuIFb6g39aIRZlBjRxjT6JfsIMFduZ+jMZB5hGmmaDHCDGnsVaWU4iw/5Mki96Re4ECATVAA4LUB5rLWvmF5epgPhl36UOj/15dCZTBXtMShQFIjMwH2C21lHZuywGS0MTBYlraJhxL/SYdxwljggrADxgmT4AYAy3RZZqIFznnspYjV4RjX2Gud4ha4gxyLnKl6pWuwvryY+0iqluHS+rXPCbyrNBiVHF+7nMDdnjavGPeqz5zAk572SNHr7lDIqFh9iiTvtO2ll6Z/OMb6VzM92sL/njqlFJ0xDt6mskK7v1usOmT15YBO5pyws5wId3ySCzxhgV9Vfj3lmaCf9bX7Qfob5ZzyCuDdCuAAAAAASUVORK5CYII=);
}

.card-icon2 {
  position: absolute;
  height: 44px;
  width: 44px;
  right: 40px;
  top: 35px;
  font-size: 24px;
  opacity: 0.8;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAABbklEQVR42u2XsWrCQBiAj6DiIF30CTq0pYMUCoLUrq76KF0LpaM4Fn2IQiftrDhInkBd2lJwMLqVigVF7NfBq3B6QXIXwSFftv/PfSF3/yX/CbEFZZqMCMYKjwZl4QcZWtjQIq3TphhgS4/krrhKGFS2tecsZKpDjrgIAA552nL0kqyarMuEiyMMIEZXGmpqoi/DBWEIhf95VsNTAOYkjMUJlgDM1PCaibCAyVoSiY9AzMWmCPWMKZmJX/ZuYM9M/LxXPDQTn+LyzdT3eqMYldsxiGcAfIQvXv+Y7kIXC8EVl0IcQKy5sci7pnq/eOXETjz03XEPdmLPV/xoJy4x1kh/6Wg7Ht/Fu+H6AIvHEwD34Yt/APiMvhWReKcqllZN4RyAqRruWbext9LQV8M1Ge4SM9I6uNJQVxNZ2d1Cm3ywrp44OTpy9IKz7XQllMNNdfe5yc08mzMgpXultPUBMuM/X2UaeKwCKkc01SPvH+GtNJ8+fQWEAAAAAElFTkSuQmCC);
}

.card-icon3 {
  position: absolute;
  height: 44px;
  width: 44px;
  right: 40px;
  top: 35px;
  font-size: 24px;
  opacity: 0.8;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAADZ0lEQVR4Aa3BXWjVZRwA4J/7MImoG5NCrSCWlJGBIamVOVMyuinWgqiryswKCVsWXVRXfUDRRV4ERikolgVJINFcgUxwsOgMzdmHQTaV5nQztXQunzjn9WzHnf/ZdqLniSwmudlT3rHNHr87btCgfr/bY5t3rTDbpKiOWsttcdR4+mx2r9qYCLVW6VGNHivVxtjcYo9ygw7ap1OnfQ4aVO4Hs6MydzthxClfWKvRdDVRQo0ZGq21zWkjBiyObK50TFGbB0yJcZjiQd8qOmpaZLFO0mNZVMFyhyTrIot98s5qiCqZZVDeT5HFP/J+jv/ALwoii6IVUSVPuiCyGLHRzJggM2wwLLIodc5nHnZ5jMHlmm11TonIotyQLuu1aLbQrRo0mGOhh7RYL2dImcgi+dNp1TrjpILIIsmZ6hU9Juq4N1zlc3mHIoskFxGhzj3e9r3zKjlnr/csUR8RYZbdfnJfZJHkooRLzdHsZW9aZ6PNPvSWNR4115SYKEku/m+SXEyIW7xgk05HnDTkpCM6bbbGnBhNkotxqPe0/SrrtkpdjJCccFmMwQ1yxtelIYoU7TA1KjDTIaWG9Npnt269hpQ6YkYkRvRa44rIYIOidi3mmxzDTDZfi3ZFGyNxsb9t9bgGtVHCH/L63RUVWWRAXl8ksg360Zfe85LZEZJjbo+KzHdcQSSSg9plO63BiDarzVUbw9Saa7VvDItE0hHhNh/pV+4Ro53VI2enLj3OGiUSSUcUqHOH123zq/OS30xTlUgkHTGKKa4x150ui5Actkdlex1WEImkI8YgaY1wrVU+tdN+x5z3lwN22uJ510fYoSASSUeMQdIaFzEpLmKHgkgknTEGSWeMyXcKInFA3lkNUZGiry1WE2XUWKzVBZH4QNKjMSpQasB2r1mpyTJNnvKa7fqViMTVBhR95X51UUZVoshSp4zo84lnLXWdmrhAVWKEebqVO6Pbt56IkLRr8pE/lOu3SbNdCqKUei0OyTZP0hoRYZKbNHrYc1611mOWuFFdRIQ2BTGaOk0+cdxo90paY0zaFEQ2teZZ4X077NXrlI/V65PXb1FUZJF+eb0xcTYoaveiBSbHMJdYoMUuRRti4kx3WKl/9NmvQ7ejhpQ6bGZUQ4Mu4+syK6qlzirdKvvRM+qj4F8tiG4MRX19vgAAAABJRU5ErkJggg==);
}

.chart-container {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
  height: 100%;
  min-height: 400px;
}

.chart-section {
  height: 100%;
}

.chart-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.chart-content {
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.chart {
  height: 100%;
  width: 100%;
  min-height: 300px;
}

.time-filter {
  display: flex;
  margin-left: auto;
}

.time-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  margin-left: -1px;
  transition: all 0.3s;
}

.time-btn:first-child {
  border-radius: 4px 0 0 4px;
}

.time-btn:last-child {
  border-radius: 0 4px 4px 0;
}

.time-btn:hover {
  background-color: #e9e9e9;
}

.time-btn.active {
  background-color: #0078d7;
  color: white;
  border-color: #0078d7;
}

.dashboard-stats {
  display: flex;
  margin-bottom: 20px;
  gap: 15px;
}

.dashboard-card {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.dashboard-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.dashboard-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.dashboard-trend {
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
}

.dashboard-trend.trend-up {
  background-color: rgba(76, 217, 100, 0.1);
  color: #4cd964;
}

.dashboard-trend.trend-down {
  background-color: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.chart-placeholder.large {
  height: 350px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-chart {
  width: 95%;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-bottom: 30px;
}

.chart-grid {
  flex: 1;
  background-image: linear-gradient(#eee 1px, transparent 1px),
    linear-gradient(90deg, #eee 1px, transparent 1px);
  background-size: calc(100% / 6) calc(100% / 5), calc(100% / 6) calc(100% / 5);
}

.chart-axis-y {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 30px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 10px;
}

.chart-axis-x {
  position: absolute;
  left: 40px;
  right: 0;
  bottom: 0;
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.axis-label {
  font-size: 12px;
  color: #999;
}

.announcement-container {
  border: 1px solid #eee;
  border-radius: 8px;
}

.announcement-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.announcement-title {
  font-weight: 600;
  color: #0078d7;
}

.announcement-date {
  font-size: 12px;
  color: #999;
}

.announcement-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }

  .dashboard-stats {
    flex-wrap: wrap;
  }

  .dashboard-card {
    flex: 1 0 40%;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.tabs-container {
  display: flex;
}

.tab {
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  border-radius: 3px;
}

.tab.active {
  background-color: #1e90ff;
  color: white;
}

.lottery-stats {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.stats-value {
  font-weight: bold;
  margin-left: 5px;
}

.lottery-table {
  width: 100%;
  overflow-x: auto;
}

.lottery-table table {
  width: 100%;
  border-collapse: collapse;
}

.lottery-table th {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: left;
  font-size: 13px;
  color: #333;
  border: 1px solid #e0e0e0;
}

.lottery-table td {
  padding: 10px;
  font-size: 13px;
  border: 1px solid #e0e0e0;
}

.column-rank {
  width: 80px;
}

.column-name {
  width: 30%;
}

.column-count,
.column-bet,
.column-win {
  width: 20%;
}

.sort-icon {
  font-size: 10px;
  margin-left: 5px;
  color: #999;
  font-style: normal;
}

.empty-data td {
  text-align: center;
  color: #999;
  padding: 30px 0;
}

.tab-select-container {
  position: relative;
  margin-right: 10px;
}

.tab-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f7f9fc;
  border: none;
  border-radius: 0;
  padding: 6px 20px 6px 12px;
  color: #606266;
  font-size: 13px;
  cursor: pointer;
  min-width: 80px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}


.tab-select:focus {
  outline: none;
}

.tab-select-container::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #909399;
  pointer-events: none;
}
</style>