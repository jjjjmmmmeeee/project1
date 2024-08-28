<template>
  <div class="main-page">
    <!-- 用户信息部分 -->
    <div class="user-info">
      <!-- <img :src="userAvatar" alt="User Avatar" class="user-avatar" @click="goToProfile" /> -->
      <img :src="avatarUrl" alt="User Avatar" class="user-avatar" @click="goToProfile" />
    </div>

    <!-- 按钮部分 -->
    <div class="button-container">
      <button class="btn btn-publish" @click="navigateTo('mytask')">我的发布</button>
      <button class="btn btn-order" @click="navigateTo('myTakingtask')">我的接单</button>
      <button class="btn btn-market" @click="navigateTo('availableTask')">任务市场</button>
    </div>
    <button @click="gotochat">聊天</button>
  </div>
</template>

<style scoped>
/* Main page styling */
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0%;
  padding: 0%;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: url('/public/image/lunbo5.jpg') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

/* User info styling */
.user-info {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 10; /* Ensures the user info is above other elements */
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
}

/* Button container styling */
.button-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px; /* Set a max-width for better layout control */
  margin-top: 100px; /* Adjust spacing from the top */
}

/* General button styling */
.btn {
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

/* Specific button styles */
.btn-publish {
  background-color: #4CAF50;
}

.btn-publish:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.btn-order {
  background-color: #2196F3;
}

.btn-order:hover {
  background-color: #0b7dda;
  transform: scale(1.05);
}

.btn-market {
  background-color: #FF5722;
}

.btn-market:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      User: {
        username: '',
      },
      avatarUrl: ''
    };
  },
  methods: {
    gotochat(){
        this.$router.push('/chat')
    },
    goToProfile() {
      // 跳转到个人主页
      this.$router.push('/perinf');
    },
    navigateTo(page) {
      // 跳转到指定页面
      this.$router.push(`/${page}`);
    },
    getuser() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.get("/user", config)
        .then((res) => {
          this.User = res.data.data;
          this.avatarUrl = "http://localhost:8088" + res.data.data.avatarPath;
          console.log(this.User);
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
  },
  created() {
    this.getuser();
  }
};
</script>
