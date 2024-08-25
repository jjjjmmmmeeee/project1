<template>
    <div>
      <ul>
        <li v-for="item in tableData" :key="item.id" class="task-item">
          <h2 class="task-title">{{ item.title }}</h2>
          <p><strong>描述：</strong>{{ item.description }}</p>
          <p><strong>截止时间：</strong>{{ item.dueTime }}</p>
          <p><strong>任务状态：</strong>{{ item.state }}</p>
          <p><strong>校区：</strong>{{ item.campus }}</p>
          <p><strong>任务开始地点：</strong>{{ item.startAddress }}</p>
          <p><strong>任务结束地点：</strong>{{ item.endAddress }}</p>
          <div class="info-group">
            <p><strong>发布者：</strong>{{ item.publisherUsername }} (ID: {{ item.publisherId }})</p>
            <p><strong>性别：</strong>{{ item.publisherSex }}</p>
            <p><strong>电话：</strong>{{ item.publisherPhone }}</p>
            <p><strong>等级：</strong>{{ item.publisherLevel }}</p>
          </div>
          <div class="info-group">
            <p><strong>接单人：</strong>{{ item.takerUsername }} (ID: {{ item.takerId }})</p>
            <p><strong>性别：</strong>{{ item.takerSex }}</p>
            <p><strong>电话：</strong>{{ item.takerPhone }}</p>
            <p><strong>等级：</strong>{{ item.takerLevel }}</p>
          </div>
          <p><strong>发布时间：</strong>{{ item.publishTime }}</p>
          <p><strong>接取时间：</strong>{{ item.taketime }}</p>
          <p><strong>报酬：</strong>{{ item.reward }}</p>
        </li>
      </ul>
      <button class="button">接单</button>
    </div>
  </template>
  
  <style scoped>
  .task-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .task-title {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }
  .info-group {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
  }
  .info-group p {
    margin: 5px 0;
  }
  .button {
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
  }
  .button:hover {
    background-color: #0056b3;
  }
  </style>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        tableData: [],
        sites: [2, 3, 4],
        title: '',
        myId:"3",
      };
    },
    mounted(){
        //this.myId=this.$route.query.id;
       
    },
    created(){
        this.getInfo();
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleCurrentChange(currentPage) {
        this.page = currentPage;
      },
      getInfo(){
        axios.get('http://localhost:8088/taskInformation/'+this.myId).then((response) => {
        this.title = response.data.taskInformation[0].title;
        this.tableData = response.data.taskInformation;
      });
      }
    }
  };
  </script>
  