<template>
  <div class="auth-container">
    <h2 v-if="isLogin">登录</h2>
    <h2 v-else>注册</h2>

    <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
      <div v-if="isLogin" class="login-container">
        <input type="text" class="usernameinput" v-model="loginData.username" placeholder="用户名" required />
        <input type="password" v-model="loginData.password" placeholder="密码" required />
        <button type="submit" class="login-button">登录</button>
      </div>

      <div v-else class="register-container">
        <!-- Registration Form -->
        <div>
          <label>用户名 <span class="required">*</span></label>
          <input type="text" class="yonghuming" v-model="registerData.username" placeholder="用户名" required />
        </div>
        <div>
          <label>密码 <span class="required">*</span></label>
          <input type="password" class="yonghuming" v-model="registerData.password" placeholder="密码" required />
        </div>
        <div>
          <label>确认密码 <span class="required">*</span></label>
          <input type="password" class="yonghuming" v-model="registerData.confirmPassword" placeholder="确认密码" @input="validatePasswords"
            required />
          <span v-if="passwordMismatch" class="error">密码不一致</span>
        </div>
        <div>
          <label>性别 <span class="required">*</span></label>
          <select v-model="registerData.sex" required>
            <option value="">请选择性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div>
          <label>年龄</label>
          <input type="number" class="yonghuming" v-model="registerData.age" placeholder="年龄" />
        </div>
        <div>
          <label>学号 <span class="required">*</span></label>
          <input type="text" class="yonghuming" v-model="registerData.stuId" placeholder="学号" required />
        </div>
        <div>
          <label>真实姓名 <span class="required">*</span></label>
          <input type="text" class="yonghuming" v-model="registerData.realName" placeholder="真实姓名" required />
        </div>
        <div>
          <label>住址</label>
          <input type="text" class="yonghuming" v-model="registerData.address" placeholder="住址" />
        </div>
        <div>
          <label>QQ号</label>
          <input type="text" class="yonghuming"  v-model="registerData.qq" placeholder="QQ号" />
        </div>
        <div>
          <label>邮箱 <span class="required">*</span></label>
          <input type="email" class="yonghuming" v-model="registerData.email" placeholder="邮箱" required />
          <button type="button" class="fasong" @click="sendVerificationCode">发送验证码</button>

        </div>
        <div>
          <label>验证码 <span class="required">*</span></label>
          <input type="text" class="yonghuming" v-model="registerData.verificationCode" placeholder="验证码" required />
        </div>
        <button type="submit">注册</button>
      </div>
    </form>

    <div class="auth-links" v-if="isLogin">
      <a href="#" @click.prevent="isLogin = false">注册</a>
      <a href="#" @click.prevent="forgotPassword()">忘记密码</a>
    </div>

    <button v-else @click="isLogin = true" class="back-to-login">返回登录</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLogin: true, // 控制显示登录或注册表单
      passwordMismatch: false, // 用于检查密码是否匹配
      loginData: {
        username: '',
        password: '' ,
       confirmPassword: '',
      },
      registerData: {
        username: '',
        password: '',
        
        sex: '',
        age: '',
        stuId: '',
        realName: '',
        address: '',
        qq: '',
        email: '',
        verificationCode: ''
      }
    };
  },
  methods: {

    validatePasswords() {
      this.passwordMismatch = this.registerData.password !== this.registerData.confirmPassword;
    },
    sendVerificationCode() {
      axios.get('http://localhost:8088/sendEmailRegister/' + this.registerData.email)
        .then((res) => {
            console.log(res);
            alert(res.data.msg)
        })
        .catch((error) => {
          console.error('注册失败:', error);
          alert("发送邮件失败！")
        });
    },
    handleLogin() {
      // 处理登录逻辑
      this.login();
    },
    handleRegister() {
      // 处理注册逻辑，检查密码匹配后再发送请求
      if (!this.passwordMismatch) {
        this.register();
      }
    },
    login() {
      axios.post("/login", this.loginData)
        .then((res) => {
          const jwt = res?.data?.msg; // 登陆时保存返回的jwt
          localStorage.setItem('cqu-project-jwt', jwt);
          if (jwt == '账号或密码错误!') {
            alert("账号或密码错误！")
          }else{
            this.$router.push({ path: '/Home' });
          }
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
    register() {
      axios.post("/register", this.registerData)
        .then((res) => {
          console.log(res)
          if (res.data.msg == "成功") {
            alert("注册成功！")
            this.isLogin = true
          } else {
            alert(res.data.msg)
          }
        })
        .catch((error) => {

          console.error("请求失败:", error);
        });

    },
    forgotPassword() {
      this.$router.push('/findbackpassword');
    }

  }
};
</script>
<style scoped>
.yonghuming{
  width: 80%;

}
.fasong{
  width: 120rpx;
  margin: auto;
}

.login-container {
  display: flex;
  flex-direction: column;
  /* 将子元素垂直排列 */
  align-items: center;
  /* 水平居中对齐 */
  justify-content: center;
  /* 垂直居中对齐 */
  height: 50vh;
  /* 让容器的高度占满整个视口 */
  margin: auto;
  width: 25%;

}

.usernameinput,
input[type="password"],
button {
  width: 300px;
  /* 调整输入框和按钮的宽度 */

}
.login-button {
  width: 20%; 
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #ff5e00;
  color: white;
  border: none;
  border-radius: 5px;
}


button {
  cursor: pointer;
  background-color: #007BFF;
  /* 按钮的背景色 */
  color: white;
  /* 按钮文字颜色 */
  border: none;
  /* 去除按钮边框 */
  border-radius: 5px;
  /* 按钮的圆角 */
}

.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.auth-links a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.auth-links a:hover {
  text-decoration: underline;
}

form div {
  margin-bottom: 15px;
}

form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.required {
  color: red;
}

.error {
  color: red;
  font-size: 12px;
}

form input,
form select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

form button[type="button"] {
  margin-top: 10px;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  border: none;
}

.back-to-login {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>