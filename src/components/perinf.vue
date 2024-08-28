<template>
  <div class="profile-container">
    <header class="profile-header">
      <!-- 显示头像，并支持点击上传新头像 -->
      <div class="avatar-container">
        <el-avatar :size="60" :src="avatarUrl" @click.native="openUploadDialog" @error="errorHandler">
          <img src= />
        </el-avatar>
      </div>
      <h5 class="signature">我的签名：{{ User.signature }}</h5>
      <!-- 添加修改信息按钮 -->
      <el-button type="primary" class="edit-button" @click="goToEditPage">修改信息</el-button>
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
      <el-image
        v-for="photo in photoWall"
        :key="photo.id"
        :src="photo.photoPath"
        :preview-src-list="photoPaths"
        class="photo-item"
        @contextmenu.prevent="openDeleteDialog(photo.id)"
      ></el-image>
      <!-- 添加照片按钮 -->
      <div class="add-photo-container" @click="openFileDialog">
          <img src="/image/9EEAC01D46F144782DB5869D7DCD6936.png" alt="添加照片" class="add-photo-icon" />
        </div>
    </div>
  </section>
    <!-- 上传头像的对话框 -->
    <el-dialog :visible.sync="uploadavaDialogVisible" title="上传头像">
      <input type="file" @change="handleAvatarUpload" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadavaDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAvatar">提交</el-button>
      </span>
    </el-dialog>
    <!-- 删除确认对话框 -->
  <el-dialog :visible.sync="deleteDialogVisible" title="确认删除">
    <span>你确定要删除这张照片吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="deletePhoto">删除</el-button>
    </span>
  </el-dialog>
  <!-- 上传照片的对话框 -->
  <el-dialog :visible.sync="uploadDialogVisible" title="上传照片">
    <input type="file" @change="handleFileChange" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="uploadPhoto">上传</el-button>
    </span>
  </el-dialog>
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

.edit-button {
  position: absolute;
  top: 10px;
  right: 0;
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
.add-photo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
}
.add-photo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 255px;
  height: 255px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.add-photo-icon {
  width: 260px; /* 调整图标大小 */
  height: 260px;
}
</style>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      User: {},
      avatarUrl: '',
      uploadavaDialogVisible: false, // 控制上传对话框的显示
      selectedFile: null, // 用于存储上传的文件
      userInfo: {},
      photoWall: [], // 照片墙数据
      photoPaths: [], // 用于预览的图片路径数组
      deleteDialogVisible: false, // 控制删除对话框的显示
      selectedPhotoId: null, // 要删除的照片ID
      uploadDialogVisible:false
    };
  },
  methods: {
    getuser() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.get("/user", config)
        .then((res) => {
          this.User = res.data.data;
          this.avatarUrl = "http://localhost:8088" + res.data.data.avatarPath
          console.log(this.User);

          this.populateUserInfo();
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },

    populateUserInfo() {
      this.userInfo = {
        昵称:this.User.username,
        真实姓名: this.User.realName,
        账号ID: this.User.id,
        性别: this.User.sex,
        年龄: this.User.age,
        住址: this.User.address,
        电话: this.User.phone,
        邮箱: this.User.email,
        QQ: this.User.qq,
        学号: this.User.stuId,
        余额: this.User.balance,
        任务完成次数: this.User.finishNumNum,
        接取任务次数: this.User.takeNum,
        点赞数: this.User.likeCount,
        等级: this.User.level
      };
    },
    goToEditPage() {
      this.$router.push('/edit-profile');
    },
    errorHandler() {
      this.avatarUrl = 'path-to-default-avatar.jpg'; // 设置默认头像
    },
    openUploadDialog() {
      this.uploadavaDialogVisible = true; // 打开上传对话框
    },
    handleAvatarUpload(event) {
      this.selectedFile = event.target.files[0]; // 存储选中的文件
    },
    submitAvatar() {
      if (this.selectedFile) {
        // 创建 FormData 对象并将文件添加到其中
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        // 从 localStorage 获取 JWT
        const jwt = localStorage.getItem('cqu-project-jwt');
        const config = {
          headers: {
            'Authorization': jwt,
            'Content-Type': 'multipart/form-data'
          }
        };

        // 发送 POST 请求上传头像
        axios.post('/changeAvatar', formData, config)
          .then(response => {
            console.log(response);
            // 更新头像 URL
            this.avatarUrl = "http://localhost:8088" + response.data.data.avatarPath;

            this.uploadavaDialogVisible = false; // 关闭对话框
            this.getuser();
          })
          .catch(error => {
            console.error('请求失败:', error);
          });
      } else {
        console.warn('请选择一个文件进行上传');
      }
    },
    getPhotoWall() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.get('/user/photowall', config)
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
    openDeleteDialog(photoId) {
      this.selectedPhotoId = photoId;
      this.deleteDialogVisible = true;
    },
    deletePhoto() {
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };

      axios.delete(`/user/setting/deletePhotoWall/${this.selectedPhotoId}`, config)
        .then((response) => {
          console.log(response.data);
          // 移除已删除的照片
          this.photoWall = this.photoWall.filter(photo => photo.id !== this.selectedPhotoId);
          this.photoPaths = this.photoWall.map(photo => photo.photoPath);
          this.deleteDialogVisible = false;
        })
        .catch((error) => {
          console.error('删除照片失败:', error);
        });
    },
    openFileDialog() {
      this.uploadDialogVisible = true; // 打开上传对话框
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // 存储选中的文件
    },
    uploadPhoto() {
      if (this.selectedFile) {
        // 创建 FormData 对象并将文件添加到其中
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        // 从 localStorage 获取 JWT
        const jwt = localStorage.getItem('cqu-project-jwt');
        const config = {
          headers: {
            'Authorization': jwt,
            'Content-Type': 'multipart/form-data'
          }
        };

        // 发送 POST 请求上传照片
        axios.post('/user/setting/updatePhotoWall', formData, config)
          .then(response => {
            console.log(response.data);
           
            this.uploadDialogVisible = false; // 关闭对话框
            this.getPhotoWall(); // 更新照片墙数据
          })
          .catch(error => {
            console.error('上传照片失败:', error);
          });
      } else {
        console.warn('请选择一个文件进行上传');
      }
    },
  },
  created() {
    this.getuser();
    this.getPhotoWall();
  }
}
</script>
