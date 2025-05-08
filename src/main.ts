import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/base.css'
import './assets/main.css'

// 引入ECharts相关
import VChart from 'vue-echarts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册ECharts组件
app.component('v-chart', VChart)

app.mount('#app') 