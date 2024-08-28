<!-- src/components/UserInfo.vue -->
<template>
    <div class="user-info">
      <img :src="avatarUrl" alt="User Avatar" class="user-avatar" @click="goToProfile" />
      <div class="user-details">
        <span class="user-name">{{ user.username }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserInfo',
    data() {
      return {
        user: {
          username: '',
        },
        avatarUrl: ''
      };
    },
    methods: {
      goToProfile() {
        this.$router.push('/perinf');
      },
      fetchUserInfo() {
        const jwt = localStorage.getItem('cqu-project-jwt');
        const config = { headers: { 'Authorization': jwt } };
  
        axios.get("/user", config)
          .then((res) => {
            this.user = res.data.data;
            this.avatarUrl = "http://localhost:8088" + res.data.data.avatarPath;
          })
          .catch((error) => {
            console.error("请求失败:", error);
          });
      },
    },
    created() {
      this.fetchUserInfo();
    }
  };
  </script>
  
  <style scoped>
  .user-info {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 10px;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  