<template>
  <div class="main-page">
    <!-- 用户信息部分 -->
    <div class="user-info">
      <!-- <img :src="userAvatar" alt="User Avatar" class="user-avatar" @click="goToProfile" /> -->
      <img src="/image/lunbo2.jpg" alt="6666" class="user-avatar" @click="goToProfile" />
    </div>


    <!-- 按钮部分 -->
    <div class="button-container">
      <button class="btn btn-publish" @click="navigateTo('mytask')">我的发布</button>
      <button class="btn btn-order" @click="navigateTo('myTakingtask')">我的接单</button>
      <button class="btn btn-market" @click="navigateTo('availableTask')">任务市场</button>
    </div>
  </div>
</template>

<style scoped>
/* Main page styling */
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/public/image/lunbo5.jpg') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

/* User info styling */
.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
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
export default {
  
  methods: {
    goToProfile() {
      // 跳转到个人主页
      this.$router.push('/perinf');
    },
    navigateTo(page) {
      // 跳转到指定页面
      this.$router.push(`/${page}`);
    },
    getuser() {
            setTimeout(
                () => {
                    const jwt = localStorage.getItem('cqu-project-jwt')
                    console.log('[perinf组件]' + '获取到的jwt为' + jwt)
                    const config = { headers: { 'Authorization': jwt } }

                    axios.get("/user",  config)
                        .then((res) => {
                             console.log(res.data);
                            this.User=res.data.data;
                            //console.log(res.data.data.realName);
                            
                        })
                        .catch((error) => {
                            console.error("请求失败:", error);
                        })

                }, 500);
        },
        created() {
        this.getuser();
    },
    data() {
        return {
            User: {
                username:'',
            }
        };
    },
  }
};
</script>