<template>
  <div id="app">
    <div class="app-header">
      <!-- 返回按钮 -->
      <el-button 
        v-if="$route.path !== '/'" 
        type="default" 
        class="back-button" 
        @click="goBack"
      >
        返回
      </el-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
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
.back-button {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000; /* 确保按钮在其他内容之上 */
}
</style>
