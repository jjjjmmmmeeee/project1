<template>
    <div class="auth-container">
      <div class="auth-toggle">
        <button @click="isLogin = true" :class="{ active: isLogin }">登录</button>
        <button @click="isLogin = false" :class="{ active: !isLogin }">注册</button>
      </div>
  
      <div v-if="isLogin">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
          <input type="text" v-model="loginData.username" placeholder="用户名" required />
          <input type="password" v-model="loginData.password" placeholder="密码" required />
          <button type="submit">登录</button>
        </form>
      </div>
  
      <div v-else>
        <h2>注册</h2>
        <form @submit.prevent="handleRegister">
          <input type="text" v-model="registerData.username" placeholder="用户名" required />
          <input type="password" v-model="registerData.password" placeholder="密码" required />
          <input type="email" v-model="registerData.email" placeholder="电子邮件" required />
          <button type="submit">注册</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLogin: true, // 控制显示登录或注册表单
        loginData: {
          username: '',
          password: ''
        },
        registerData: {
          username: '',
          password: '',
          email: ''
        }
      };
    },
    methods: {
      handleLogin() {
        // 处理登录逻辑
        console.log("登录数据: ", this.loginData);
        // 在这里添加你的API请求代码
      },
      handleRegister() {
        // 处理注册逻辑
        console.log("注册数据: ", this.registerData);
        // 在这里添加你的API请求代码
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .auth-toggle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .auth-toggle button {
    width: 48%;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .auth-toggle button.active {
    background-color: #007bff;
    color: #fff;
  }
  
  form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  form button {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  </style>
  