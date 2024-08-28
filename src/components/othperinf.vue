<template>
  <div class="profile-container">
    <header class="profile-header">
      <!-- 显示头像，并支持点击上传新头像 -->
      <div class="avatar-container">
        <el-avatar :size="60" :src="avatarUrl" @error="errorHandler">
          <img src= />
        </el-avatar>
      </div>
      <h5 class="signature">{{ User.username }}的签名：{{ User.signature }}</h5>
    </header>
    <section class="profile-content">
      <!-- 展示用户的详细信息 -->
      <div class="profile-item" v-for="(value, key) in userInfo" :key="key">
        <label>{{ key }}:</label>
        <span>{{ value }}</span>
      </div>
    </section>
    <section class="photo-wall">
      <h3>照片墙</h3>
      <div class="photo-wall-container">
        <el-image v-for="photo in photoWall" :key="photo.id" :src="photo.photoPath" :preview-src-list="photoPaths"
          class="photo-item"></el-image>
      </div>
    </section>
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
  position: relative;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.avatar-container {
  position: relative;
}

.signature {
  position: absolute;
  bottom: 0px;
  font-size: 0.8em;
  color: gray;
  margin-left: 10%;
}

.profile-header h1 {
  margin-left: 15px;
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
  margin-top: 30px;
}

.photo-wall-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-item {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}


</style>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      User: {},
      avatarUrl: '',
      userInfo: {},
      photoWall: [], // 照片墙数据
      photoPaths: [], // 用于预览的图片路径数组
      userId:'1'
     
    };
  },
  methods: {
    getuser() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.get("/user/"+this.userId, config)
        .then((res) => {
          console.log(res);
          
          this.User = res.data[0];
          this.avatarUrl = "http://localhost:8088" + res.data[0].avatarPath
          console.log(this.User);

          this.populateUserInfo();
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },

    populateUserInfo() {
      this.userInfo = {
        账号ID: this.User.id,
        用户名: this.User.username,
        性别: this.User.sex,
        年龄: this.User.age,
        学号: this.User.stuId,
        经验:this.User.exp,
        等级: this.User.level,
        点赞数: this.User.likeCount,
        // 发布任务次数: this.User.PublishNumNum,
        QQ: this.User.qq,
        邮箱: this.User.email,
        电话: this.User.phone,
        
        
      };
    },
    errorHandler() {
      this.avatarUrl = 'path-to-default-avatar.jpg'; // 设置默认头像
    },
    getPhotoWall() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.get('/user/'+this.userId+'/photowall', config)
        .then((res) => {
          this.photoWall = res.data.data.map(photo => ({
            id: photo.id,
            userId: photo.userId,
            photoPath: `http://localhost:8088${photo.photoPath}`
          }));
          this.photoPaths = this.photoWall.map(photo => photo.photoPath); // 提取所有图片路径用于预览
        })
        .catch((error) => {
          console.error('请求照片墙数据失败:', error);
        });
    },
  },
  created() {
    this.userId = this.$route.query.userId;
    this.getuser();
    this.getPhotoWall();
  }
}
</script>
