<template>
    <div class="forgot-password">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          <el-button @click="sendCode" :disabled="isSendingCode">
            {{ isSendingCode ? `${timeLeft}s后重试` : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="form.verificationCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请再次输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="goBack">返回登录</el-button>
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
          email: '',
          verificationCode: '',
          password: '',
        },
        isSendingCode: false,
        timeLeft: 60,
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: this.validateConfirmPassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      sendCode() {
        this.isSendingCode = true;
        this.timeLeft = 60;
        const timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.isSendingCode = false;
            clearInterval(timer);
          }
        }, 1000);
  
        // 发送验证码到邮箱的逻辑
        axios.get('http://localhost:8088/sendEmail/' + this.form.email)
        .then((res) => {

        })
        .catch((error) => {
          console.error('发送失败:', error);
        });
      },
      validateConfirmPassword(rule, value, callback) {
        if (value !== this.form.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            axios.post('/login/findPassword', this.form)
              .then(response => {
                this.$message.success('密码重置成功');
                this.goBack();
              })
              .catch(error => {
                this.$message.error('密码重置失败');
                alert("密码重置失败")
              });
          }
        });
      },
      goBack() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .forgot-password {
    width: 400px;
    margin: 100px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  