<template>
  <div class="task-container">
    <ul class="task-list">
      <li v-for="item in tableData" :key="item.id" class="task-item">
        <h2 class="task-title">{{ item.title }}</h2>
        <div class="task-details">
          <p><strong>描述：</strong>{{ item.description }}</p>
          <p><strong>截止时间：</strong>{{ item.dueTime }}</p>
          <p><strong>任务状态：</strong><span :class="getStateClass(item.state)">{{ item.state }}</span></p>
          <p><strong>校区：</strong>{{ item.campus }}</p>
          <p><strong>任务开始地点：</strong>{{ item.startAddress }}</p>
          <p><strong>任务结束地点：</strong>{{ item.endAddress }}</p>
        </div>
        <div class="info-group">
          <p><strong>发布者：</strong>{{ item.publisherUsername }} <span class="user-id">(ID: {{ item.publisherId }})</span></p>
          <p><strong>性别：</strong>{{ item.publisherSex }}</p>
          <p><strong>电话：</strong>{{ item.publisherPhone }}</p>
          <p><strong>等级：</strong>{{ item.publisherLevel }}</p>
        </div>
        <!-- <div class="info-group">
          <p><strong>接单人：</strong>{{ item.takerUsername }} <span class="user-id">(ID: {{ item.takerId }})</span></p>
          <p><strong>性别：</strong>{{ item.takerSex }}</p>
          <p><strong>电话：</strong>{{ item.takerPhone }}</p>
          <p><strong>等级：</strong>{{ item.takerLevel }}</p>
        </div> -->
        <div class="task-meta">
          <p><strong>发布时间：</strong>{{ item.publishTime }}</p>
          <p><strong>接取时间：</strong>{{ item.taketime }}</p>
          <p><strong>报酬：</strong><span class="reward">{{ item.reward }}</span></p>
        </div>
      </li>
    </ul>
    <button class="button">接单</button>
  </div>
</template>

<style scoped>
.task-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.task-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.task-title {
  font-size: 26px;
  margin-bottom: 15px;
  color: #2c3e50;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.task-details p {
  margin: 10px 0;
  font-size: 16px;
  color: #34495e;
}

.state-pending {
  color: #e67e22;
}

.state-completed {
  color: #27ae60;
}

.state-cancelled {
  color: #c0392b;
}

.info-group {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.info-group p {
  margin: 8px 0;
}

.user-id {
  color: #7f8c8d;
  font-size: 14px;
}

.task-meta {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #bdc3c7;
}

.task-meta p {
  font-size: 14px;
  color: #7f8c8d;
}

.reward {
  font-size: 20px;
  color: #e74c3c;
  font-weight: bold;
}

.button {
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

.button:active {
  background-color: #1f618d;
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
      myId: "3",
    };
  },
  mounted() {
   this.myId = this.$route.query.taskId;
   console.log(this.$route.query);
   
   this.getInfo();
  },
  methods: {
    getStateClass(state) {
      if (state === 'Pending') {
        return 'state-pending';
      } else if (state === 'Completed') {
        return 'state-completed';
      } else if (state === 'Cancelled') {
        return 'state-cancelled';
      }
      return '';
    },
    getInfo() {
      axios.get('http://localhost:8088/taskInformation/' + this.myId).then((response) => {
        this.title = response.data.taskInformation[0].title;
        this.tableData = response.data.taskInformation;
      });
    }
  }
};
</script>
