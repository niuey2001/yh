<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const captcha = ref('')
const captchaTimestamp = ref(new Date().getTime())

// 刷新验证码
const refreshCaptcha = () => {
    captchaTimestamp.value = new Date().getTime()
}

const handleLogin = () => {
    // 这里添加验证逻辑
    if (username.value && password.value && captcha.value) {
        router.push('/')
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-container">
            <!-- 左侧数据图表插图 -->
            <div class="login-left">
                <img src="/images/login-pic.png" alt="数据分析" class="login-image" />
            </div>

            <!-- 右侧登录表单 -->
            <div class="login-right">
                <div class="login-form-container">
                    <div class="login-title">
                        <img src="/images/login.png" alt="管理登录" class="title-image" />
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="username" class="login-input" placeholder="请输入账号">
                        <span class="input-icon user-icon"></span>
                    </div>

                    <div class="form-group">
                        <input type="password" v-model="password" class="login-input" placeholder="请输入密码">
                        <span class="input-icon password-icon"></span>
                    </div>

                    <div class="form-group captcha-group">
                        <input type="text" v-model="captcha" class="login-input captcha-input" placeholder="请输入验证码">
                        <span class="input-icon captcha-icon"></span>
                        <img :src="`http://ut55.82010.yh005yh.com/ana/captcha?t=${captchaTimestamp}`" alt="验证码"
                            class="captcha-image" @click="refreshCaptcha" title="点击刷新验证码">
                    </div>

                    <button class="login-button" @click="handleLogin">登录</button>
                </div>
            </div>
        </div>

        <div class="browser-tips">
            为了更好的使用体验，我们推荐使用Google、UC、Safari、火狐浏览器，以获得最佳的使用体验
        </div>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('/images/login-bg.png') no-repeat center center #00a651;
    background-size: cover;
    /* position: relative; */
}

.login-bot-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.login-container {
    display: flex;
    width: 100%;
    height: 520px;
    margin: 0;
    overflow: hidden;
    background-color: white;
    position: relative;
    z-index: 10;
}

.login-left {
    width: 50%;
    background-color: #00a651;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    overflow: hidden;
    position: relative;
}

.login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
}

.login-right {
    width: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form-container {
    width: 80%;
    max-width: 360px;
}

.login-title {
    text-align: center;
    margin-bottom: 40px;
}

.title-image {
    height: 40px;
}

.form-group {
    position: relative;
    margin-bottom: 24px;
}

.login-input {
    width: 100%;
    height: 50px;
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    padding: 0 20px 0 50px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.login-input:focus {
    border-color: #00a651;
    outline: none;
}

.input-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
}

.user-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
}

.password-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
}

.captcha-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='M12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z'/%3E%3C/svg%3E");
}

.captcha-group {
    display: flex;
    align-items: center;
}

.captcha-input {
    width: calc(100% - 120px);
}

.captcha-image {
    width: 110px;
    height: 44px;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
}

.login-button {
    width: 100%;
    height: 50px;
    background-color: #00a651;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.login-button:hover {
    background-color: #008d45;
}

.browser-tips {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    position: absolute;
    bottom: 20px;
    left: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
    .login-container {
        height: auto;
        flex-direction: column;
    }

    .login-left {
        width: 100%;
        height: 200px;
    }

    .login-right {
        width: 100%;
        padding: 30px 0;
    }
}
</style>