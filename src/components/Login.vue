<template>
  <div class="auth-container">
    <div class="auth-toggle">
      <button @click="isLogin = true" :class="{ active: isLogin }">登录</button>
      <button @click="isLogin = false" :class="{ active: !isLogin }">注册</button>
    </div>

    <div v-if="isLogin">
      <h2>登录</h2>
      <form>
        <input type="text" v-model="loginData.username" placeholder="用户名" required />
        <input type="password" v-model="loginData.password" placeholder="密码" required />
        <button type="submit" @click="handleLogin">登录</button>
      </form>
    </div>

    <div v-else>
      <h2>注册</h2>
      <form @submit.prevent="handleRegister">
        <input type="text" v-model="registerData.username" placeholder="用户名" required />
        <input type="password" v-model="registerData.password" placeholder="密码" required />
        <button type="submit">注册</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      }
    };
  },
  methods: {
    handleLogin() {
      // 处理登录逻辑
      console.log("登录数据: ", this.loginData);
      this.login();



    },
    handleRegister() {
      // 处理注册逻辑
      console.log("注册数据: ", this.registerData);
      // 在这里添加你的API请求代码
    },
    login() {
      axios.post("/login", this.loginData)
        .then((res) => {
          console.log(res);
          const jwt = res?.data?.msg//登陆时保存返回的jwt
          console.log('登录后保存的jwt数据为' + jwt)
          localStorage.setItem('cqu-project-jwt', jwt)
          console.log('login函数被调用')
          

          if (jwt === '账号或密码错误!') {
            return
          }
          this.$router.push({ path: '/mytask' });



        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    }
  },
  created() {

  },
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