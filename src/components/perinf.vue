<template>
  <div>
    
    <div class="profile-container" v-if="User.length > 0">
      <header class="profile-header">
        <!-- 显示头像 -->
        <img :src="avatarUrl" alt="头像" class="avatar" />
        <h1>{{ User[0].username }}的个人主页</h1>
      </header>
      <section class="profile-content">
        <div class="profile-item">
          <label>真实姓名:</label>
          <span>{{ User[0].realName }}</span>
        </div>
        <div class="profile-item">
          <label>账号ID:</label>
          <span>{{ User[0].id }}</span>
        </div>
        <div class="profile-item">
          <label>性别:</label>
          <span>{{ User[0].sex }}</span>
        </div>
        <div class="profile-item">
          <label>年龄:</label>
          <span>{{ User[0].age }}</span>
        </div>
        <div class="profile-item">
          <label>住址:</label>
          <span>{{ User[0].address }}</span>
        </div>
        <div class="profile-item">
          <label>电话:</label>
          <span>{{ User[0].phone }}</span>
        </div>
        <div class="profile-item">
          <label>邮箱:</label>
          <span>{{ User[0].email }}</span>
        </div>
        <div class="profile-item">
          <label>QQ:</label>
          <span>{{ User[0].qq }}</span>
        </div>
        <div class="profile-item">
          <label>学号:</label>
          <span>{{ User[0].stuId }}</span>
        </div>
        <div class="profile-item">
          <label>余额:</label>
          <span>{{ User[0].balance }}</span>
        </div>
        <div class="profile-item">
          <label>任务完成次数:</label>
          <span>{{ User[0].finishNumNum }}</span>
        </div>
        <div class="profile-item">
          <label>接取任务次数:</label>
          <span>{{ User[0].takeNum }}</span>
        </div>
        <div class="profile-item">
          <label>点赞数:</label>
          <span>{{ User[0].likeCount }}</span>
        </div>
        <div class="profile-item">
          <label>等级:</label>
          <span>{{ User[0].level }}</span>
        </div>
      </section>

      <!-- <section class="photo-wall">
        <h2>照片墙</h2>
        <div class="photos">
          <img v-for="(item, index) in photoUrls" :key="index" :src="item" alt="照片" />
        </div>
      </section> -->
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
.photo-wall {
  margin-top: 20px;
}
.photos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.photos img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<script>
import axios from 'axios';

export default {
    methods: {
        getuser() {
            const jwt = localStorage.getItem('cqu-project-jwt');
            console.log('[perinf组件]' + '获取到的jwt为' + jwt);
            const config = { headers: { 'Authorization': jwt } };
            
            axios.get("/user", config)
                .then((res) => {
                  console.log(res);
                  
                    this.User = res.data.data;
                    console.log(this.User[0].avatar); // 打印 avatar 数据
                    // 将头像 byte[] 转换为 Blob 并生成 URL
                    this.avatarUrl = this.convertByteArrayToUrl(this.User[0].avatar);
                    console.log(this.avatarUrl); // 打印生成的 URL
                    // 将照片墙的每张图片转换为 Blob 并生成 URL
                    // this.photoUrls = this.User.map(item => this.convertByteArrayToUrl(item.photo));
                })
                .catch((error) => {
                    console.error("请求失败:", error);
                });
        },
        convertByteArrayToUrl(byteArray) {
            // 将 byte[] 转换为 ArrayBuffer
            const arrayBuffer = new Uint8Array(byteArray).buffer;

            // 创建 Blob 对象
            const blob = new Blob([arrayBuffer], { type: 'image/*' });

            // 生成指向 Blob 的 URL
            return URL.createObjectURL(blob);
        }
    },
    created() {
        this.getuser();
    },
    data() {
        return {
            User: [],
            avatarUrl:'',
        };
    }
}
</script>
