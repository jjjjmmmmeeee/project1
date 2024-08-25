<template>
  <!-- <h1>任务详情</h1> -->
  <div>
    <ul>
      <li v-for="item in tableData" :key="item.id">
        <h1>标题：{{ item.title }}</h1>
        <p>描述：{{ item.description }}</p>
        <p>截止时间：{{ item.dueTime }}</p>
        <p>任务状态：{{ item.state }}</p>
        <p>校区：{{ item.campus }}</p>
        <p>任务开始地点：{{ item.startAddress }}</p>
        <p>任务结束地点：{{ item.endAddress }}</p>
        <div class="info">发布者昵称：{{ item.publisherUsername }}</div>
        <div class="info">发布者id：{{ item.publisherId }}</div>
        <div class="info">发布者性别：{{ item.publisherSex }} </div>
        <div class="info">发布者电话：{{ item.publisherPhone }} </div>
        <div class="info">发布者等级：{{ item.publisherLevel }}</div><br>
        <div class="info">接单人昵称：{{ item.takerUsername }}</div>
        <div class="info">接单人id：{{ item.takerId }}</div>
        <div class="info">接单人性别：{{ item.takerSex }}</div>
        <div class="info">接单人电话：{{ item.takerPhone }}</div>
        <div class="info">接单人等级：{{ item.takerLevel }}</div>



        <p>发布时间：{{ item.publishTime }}</p>

        <p>接取时间：{{ item.taketime }}</p>
        <p>报酬：{{ item.reward }}</p>




      </li>


    </ul>
    <button class="button">接单</button>
  </div>
</template>

<style>
.info {
  display: inline-block;
  margin-right: 20px;
  /* 设置信息之间的间隔 */
}

.info:last-child {
  margin-right: 0;
  /* 最后一项不需要间隔 */
}

.button {
  padding: 20px 40px;
  /* 增加按钮的内边距 */
  font-size: 18px;
  /* 增大字体 */
  background-color: #007bff;
  /* 按钮背景色 */
  color: white;
  /* 按钮文字颜色 */
  border: none;
  border-radius: 5px;
  /* 圆角边框 */
  cursor: pointer;
  /* 鼠标悬停时显示为手形 */
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
  /* 鼠标悬停时的背景色 */
}
</style>
<!-- <style>
 .background {
  background-image: url('/src/assets/背景.jpg'); /* 更新为你的图片路径 */
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中对齐 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  padding: 20px; /* 根据需要调整内边距 */
  min-height: 100vh; /* 确保容器的最小高度为视口高度 */
}

ul {
  list-style-type: none; /* 去掉列表项的默认样式 */
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}

li, p {
  color: white; /* 根据背景图调整文字颜色 */
} 
</style> -->


<script>
import axios from "axios";

export default {
  // methods: {
  //   tableRowClassName({row, rowIndex}) {
  //     if (rowIndex === 1) {
  //       return 'warning-row';
  //     } else if (rowIndex === 3) {
  //       return 'success-row';
  //     }
  //     return '';
  //   },

  // },
  handleCurrentChange: function () {
    this.page = currentPage;
  },
  created: function () {
    axios.get("http://localhost:8088/taskinformation/4").then((response) => {
      // this.tableData=response.data
      // v-for="(item,index)"
      console.log(response.data.taskInformation[0].title);
      this.title = response.data.taskInformation[0].title
      this.tableData = response.data.taskInformation
      console.log(this.tableData)
    });
  },
  data() {
    return {
      tableData: [],
      sites: [2, 3, 4],
      title: ''

    };
  },
  // methods:{
  //   // getfirstitle(){
  //   //   return this.tableData[title];
  //   // }
  //   async mwfs() {
  //       // Wfs 对象已经存在，可以进行后续操作
  //       if (Wfs.isSupported()) {
  //         // 循环遍历设备列表
  //         //发送请求获取当前设备列表
  //         this.tableData = await this.getEquipmentTemp()
  //         for (let i = 0; i < this.tableData.length; i++) {
  //           const item = this.tableData[i];
  //           // // 发送同步请求获取当前温度信息
  //           // const res = await EquipTemp(item);
  //           // this.equipmentTempList.push(res.data)
  //           // 使用异步操作加载视频源
  //           await new Promise(async resolve => { // 将 Promise 函数添加 async 关键字标识
  //             //保证获取最新的DOM元素
  //             this.$nextTick(() => {
  //               const videoRef = this.$refs[`videoRef_${i}`][0];
  //               console.log(videoRef)
  //               const wfs = new Wfs();
  //               wfs.attachMedia(videoRef, item.id);
  //               this.videos.push(wfs)
  //               wfs.on(Wfs.Events.MEDIA_ATTACHED, () => {
  //                 videoRef.play();
  //                 resolve();
  //               });
  //             });
  //           });
  //         }
  //     }
  //   },
  // }
};
</script>
