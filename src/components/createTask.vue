<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.native.prevent="onSubmit">
    <el-form-item label="报酬" prop="reward">
      <el-input v-model="form.reward"></el-input>
    </el-form-item>
    <el-form-item label="在哪取" prop="startAddress">
      <el-input v-model="form.startAddress"></el-input>
    </el-form-item>
    <el-form-item label="送到哪" prop="endAddress">
      <el-input v-model="form.endAddress"></el-input>
    </el-form-item>
    <el-form-item label="截至时间" prop="dueTime">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%;"
          @change="validateDueTime"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
          style="width: 100%;"
          @change="validateDueTime"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="所在校区" prop="campus">
      <el-select v-model="form.campus" placeholder="请选择校区">
        <el-option label="A校区" value="A"></el-option>
        <el-option label="B校区" value="B"></el-option>
        <el-option label="C校区" value="C"></el-option>
        <el-option label="虎溪校区" value="D"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="详细描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        reward: '',
        startAddress: '',
        endAddress: '',
        campus: '',
        title: '',
        description: '',
        date1: '',
        date2: '',
        dueTime: null, // 新增字段，用来存放时间戳
      },
      rules: {
        reward: [{ required: true, message: '请输入报酬', trigger: 'blur' }],
        startAddress: [{ required: true, message: '请输入取货地址', trigger: 'blur' }],
        endAddress: [{ required: true, message: '请输入送货地址', trigger: 'blur' }],
        dueTime: [{ required: true, message: '请选择日期和时间', trigger: 'change', validator: this.validateDueTime }],
        campus: [{ required: true, message: '请选择校区', trigger: 'change' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        description: [{ required: false }] // 详细描述不是必填项
      }
    }
  },
  methods: {
    validateDueTime(rule, value, callback) {
      if (!this.form.date1 || !this.form.date2) {
        callback(new Error('请选择日期和时间'));
      } else {
        callback();
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 合并 date1 和 date2 为一个完整的时间戳
          const date = new Date(this.form.date1);
          const time = new Date(this.form.date2);

          date.setHours(time.getHours());
          date.setMinutes(time.getMinutes());
          date.setSeconds(time.getSeconds());

          this.form.dueTime = date.getTime();

          console.log('提交的数据:', this.form);
          this.submitToBack();

        } else {
          alert('请填写所有必填项!');
          return false;
        }
      });
    },
    submitToBack() {
      setTimeout(() => {
        const jwt = localStorage.getItem('cqu-project-jwt');
        console.log('[myTask组件] 获取到的jwt为' + jwt);
        const config = { headers: { 'Authorization': jwt } };

        axios.post("/creatingTask", this.form, config)
          .then((res) => {
            console.log(res);
            this.$router.push({ path: '/mytask' });
          })
          .catch((error) => {
            console.error("请求失败:", error);
          });
      }, 500);

    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
  line-height: 32px;
}
.required-label:before {
  content: "*";
  color: red;
  margin-right: 4px;
}
</style>
