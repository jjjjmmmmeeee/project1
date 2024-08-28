<template>
    <div class="edit-profile-container">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="form.address" placeholder="请输入住址"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入QQ"></el-input>
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input type="textarea" v-model="form.signature" placeholder="请输入个性签名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          age: '',
          address: '',
          qq: '',
          email: '',
          phone: '',
          signature: '',
        },
      };
    },
    methods: {
      onSubmit() {
        const jwt = localStorage.getItem('cqu-project-jwt');
        const config = { headers: { 'Authorization': jwt } };
  
        axios.post('/user/setting', this.form, config)
          .then((response) => {
            if (response.data === true) {
              this.$message.success('个人信息更新成功');
              this.$router.push('/perinf');  // 更新成功后跳转到个人主页
            } else {
              this.$message.error('更新失败，请重试');
            }
          })
          .catch((error) => {
            console.error('更新个人信息失败:', error);
            this.$message.error('更新失败，请重试');
          });
      },
      onCancel() {
        this.$router.push('/perinf');  // 取消更新，返回个人主页
      },
      loadUserData() {
        const jwt = localStorage.getItem('cqu-project-jwt');
        const config = { headers: { 'Authorization': jwt } };
  
        axios.get('/user', config)
          .then((response) => {
            const user = response.data.data;
            this.form.age = user.age;
            this.form.address = user.address;
            this.form.qq = user.qq;
            this.form.email = user.email;
            this.form.phone = user.phone;
            this.form.signature = user.signature;
          })
          .catch((error) => {
            console.error('加载用户信息失败:', error);
          });
      }
    },
    created() {
      this.loadUserData();  // 页面加载时，填充表单数据
    },
  };
  </script>
  
  <style scoped>
  .edit-profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  