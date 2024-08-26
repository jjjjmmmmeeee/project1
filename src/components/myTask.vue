<template>
    <div class="container">
      <el-form class="filters">
        <!-- 任务状态选择器 -->
        <el-form-item label="状态：">
          <el-select v-model="MyTaskDTO.state" placeholder="请选择想要查询的任务状态" @change="handleSataeChange" class="filter-selector">
            <el-option v-for="item in StateOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
 
       <!-- 搜索框 -->
       <el-form-item label="搜索关键词：">
        <el-input v-model="MyTaskDTO.keyword" placeholder="标题/接单人/地点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
      <!-- 右边表格和分页 -->
      <div class="table-container">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <!-- 表格列 -->
          <el-table-column prop="title" label="任务标题" width="80">
            <template slot="header">
              <span>任务标题</span>
            </template>
          </el-table-column>

          <!-- 格式化后的发布时间列 -->
          <el-table-column prop="publishTime" label="发布时间">
            <template slot="header">
              <span>发布时间</span>
              <el-button @click="handleSort('publish_time')" size="mini" type="text">
                <i :class="['el-icon-d-caret']"></i>
              </el-button>
            </template>
            <template slot-scope="scope">
            {{ formatDateTime(scope.row.publishTime) }}
          </template>
          </el-table-column>
          
          <el-table-column prop="username" label="接单人">
            <template slot="header">
              <span>接单人</span>
            </template>
          </el-table-column>

        <!-- 格式化后的接取时间列 -->
        <el-table-column label="接取时间">
          <template slot-scope="scope">
            {{ formatDateTime(scope.row.takeTime) }}
          </template>
        </el-table-column>

          <!-- 格式化后的完成时间列 -->
        <el-table-column label="完成时间">
          <template slot-scope="scope">
            {{ formatDateTime(scope.row.finishTime) }}
          </template>
        </el-table-column>

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="goToTaskDetail(scope.row.taskId)" size="mini" type="text">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page="MyTaskDTO.page" :page-sizes="[5, 10, 15, 20]"
          :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    methods: {
      formatDateTime(timestamp) {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = ('0' + (date.getMonth() + 1)).slice(-2);
    const D = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const m = ('0' + date.getMinutes()).slice(-2);
    const s = ('0' + date.getSeconds()).slice(-2);
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return "warning-row";
        } else if (rowIndex === 3) {
          return "success-row";
        }
        return "";
      },
      handleCurrentChange(val) {
        this.MyTaskDTO.page = val;
        this.gettasks();
      },
      handleSataeChange() {
        this.MyTaskDTO.page = 1;
        this.gettasks();
      },
      handleSort(property) {
        if (this.MyTaskDTO.sortRule === property) {
          this.MyTaskDTO.isDesc = !this.MyTaskDTO.isDesc;
        } else {
          this.MyTaskDTO.sortRule = property;
          this.MyTaskDTO.isDesc = false;
        }
        this.MyTaskDTO.page = 1; // 每次排序时重置页码为1
        this.gettasks();
      },
      gettasks() {
            setTimeout(
                () => {
                    const jwt = localStorage.getItem('cqu-project-jwt')
                    console.log('[myTask组件]' + '获取到的jwt为' + jwt)
                    const config = { headers: { 'Authorization': jwt } }

                    axios.post("/myPublishingTask", this.MyTaskDTO, config)
                        .then((res) => {
                            console.log(res);
                            this.tableData=res.data.records
                            this.total=res.data.total
                        })
                        .catch((error) => {
                            console.error("请求失败:", error);
                        })

                }, 500);
        },
        searchtasks() {
            setTimeout(
                () => {
                    const jwt = localStorage.getItem('cqu-project-jwt')
                    console.log('[myTask组件]' + '获取到的jwt为' + jwt)
                    const config = { headers: { 'Authorization': jwt } }

                    axios.post("/myPublishingTask/search", this.MyTaskDTO, config)
                        .then((res) => {
                            console.log(res);
                            this.tableData=res.data.records
                            this.total=res.data.total
                        })
                        .catch((error) => {
                            console.error("请求失败:", error);
                        })

                }, 500);
        },
      goToTaskDetail(taskId) {
        this.$router.push({ path: '/TaskIfo', query: { taskId: taskId } });
      },
      handleSearch() {
      this.MyTaskDTO.page = 1; // 每次搜索时重置页码为1
      this.searchtasks();
    },
    },
    created() {
      this.gettasks();
      this.searchtasks();
    },
    
    data() {
      return {
        tableData: [],
        MyTaskDTO: {
          state: "un-taken", // 状态筛选条件
          sortRule: "exp", // 排序属性
          page: 1,
          isDesc: true, // 是否降序
          keyword:""
        },
        total: 0,
        taskId: '',
        StateOptions: [
          { value: "un-taken", label: "未被接单" },
          { value: "incomplete", label: "进行中" },
          { value: "complete", label: "已完成" },
          { value: "timeout", label: "已超时" },
        ],
       
      };
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    align-items: flex-start;
  }
  
  .filters {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  
  .filter-selector {
    margin-bottom: 20px;
    width: 200px;
  }
  .search-input {
  margin-bottom: 20px;
  width: 200px;
}
  .table-container {
    flex-grow: 1;
  }
  </style>
  