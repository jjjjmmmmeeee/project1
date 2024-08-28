<template>
  <div id="app">
    <UserInfo v-if="$route.path !== '/'"/>
    <div class="app-header">
      <!-- 按钮容器 -->
      <div class="button-group">
        <!-- 退出登录按钮 -->
        <el-button v-if="$route.path !== '/'" type="default" class="logout-button" @click="goout">
          退出登录
        </el-button>
        
        <!-- 首页按钮 -->
        <el-button v-if="$route.path !== '/'" type="default" class="home-button" @click="goBack">
          首页
        </el-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue';
export default {
  components: {
    UserInfo
  },
  methods: {
    goout() {
      this.$router.push('/'); // 返回首页
    },
    goBack() {
      this.$router.push('/Home'); // 返回首页
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-header {
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  /* Ensure header is on top of other content */
}

.button-group {
  display: flex;
  gap: 10px; /* Space between buttons */
}

.logout-button {
  background-color: #f56c6c; /* Red for logout */
  color: white;
}

.logout-button:hover {
  background-color: #d43f3a; /* Darker red on hover */
}

.home-button {
  background-color: #409EFF; /* Blue for home */
  color: white;
}

.home-button:hover {
  background-color: #66b1ff; /* Lighter blue on hover */
}
</style>
