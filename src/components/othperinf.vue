<template>
    <div>
        <img src="/imagine/title.png" alt="" width="50%">
    <div class="profile-container">
      <header class="profile-header">
        <h1>{{ User.username }}的个人主页</h1>
      </header>
      <section class="profile-content">
        <div class="profile-item">
          <label>账号ID:</label>
          <span>{{ User.id }}</span>
        </div>
        <div class="profile-item">
          <label>性别:</label>
          <span>{{ User.sex }}</span>
        </div>
        <div class="profile-item">
          <label>年龄:</label>
          <span>{{ User.age }}</span>
        </div>
        <div class="profile-item">
          <label>电话:</label>
          <span>{{ User.phone }}</span>
        </div>
        <div class="profile-item">
          <label>邮箱:</label>
          <span>{{ User.email }}</span>
        </div>
        <div class="profile-item">
          <label>QQ:</label>
          <span>{{ User.qq }}</span>
        </div>
        <div class="profile-item">
          <label>任务完成次数:</label>
          <span>{{ User.finishNumNum }}</span>
        </div>
        <div class="profile-item">
          <label>接取任务次数:</label>
          <span>{{ User.takeNum }}</span>
        </div>
        <div class="profile-item">
          <label>发布帖子总数:</label>
          <span>{{ User.publishNum }}</span>
        </div>
        <div class="profile-item">
          <label>点赞数:</label>
          <span>{{ User.likeCount }}</span>
        </div>
        <div class="profile-item">
          <label>等级:</label>
          <span>{{ User.level }}</span>
        </div>
      </section>
    </div>
</div>
  </template>
<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.profile-header {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.profile-header h1 {
  margin: 0;
  font-size: 2em;
}
.profile-content {
  display: flex;
  flex-direction: column;
}
.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.profile-item:last-child {
  border-bottom: none;
}
.profile-item label {
  font-weight: bold;
}
.profile-item span {
  color: #666;
}
</style>
<script>
import axios from 'axios';
import { Header } from 'element-ui';

export default {
    methods: {
        getuser() {
            setTimeout(
                () => {
                    const jwt = localStorage.getItem('cqu-project-jwt')
                    console.log('[perinf组件]' + '获取到的jwt为' + jwt)
                    const config = { headers: { 'Authorization': jwt } }

                    axios.get("/user/"+this.othperinfid,  config)
                        .then((res) => {
                             console.log(res.data);
                            this.User=res.data.data;
                            //console.log(res.data.data.realName);
                            
                        })
                        .catch((error) => {
                            console.error("请求失败:", error);
                        })

                }, 500);
        }
    },
    created() {
        this.getuser();
    },
    data() {
        return {
            User: {
                id:'',
                username:'',
                sex:'',
                age:'',
                accCrtTime:'',
                
                level:'',
                likeCount:'',
                
                address:'',
                
                takeNum:'',
                publishNum:'',
                qq:'',
                email:'',
                phone:'',
                finishNum:'',
                
            }
        };
    },
}
</script>