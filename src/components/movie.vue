<template>
  <div class="container">
    <!-- 左边选择器 -->
    <el-form class="filters">
      <!-- 校区选择器 -->
      <el-form-item label="校区：">
        <el-select v-model="Filter.campus" placeholder="请选择校区" @change="handleCampusChange" class="filter-selector">
          <el-option v-for="item in campusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 性别选择器 -->
      <el-form-item label="发布者所在宿舍（男/女）：">
        <el-select v-model="Filter.sex" placeholder="请选择男/女宿舍订单" @change="handleSexChange" class="filter-selector">
          <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 搜索框 -->
      <el-form-item label="搜索关键词：">
        <el-input v-model="Filter.keyword" placeholder="标题/发布人/地点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 右边表格和分页 -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <!-- 表格列 -->
        <el-table-column prop="title" label="标题" width="150">
          <template slot="header">
            <span>标题</span>
          </template>
        </el-table-column>
        <el-table-column prop="startAddress" label="开始地点" width="200">
          <template slot="header">
            <span>开始地点</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="endAddress" label="结束地点" width="200">
          <template slot="header">
            <span>结束地点</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户昵称" width="300">
          <template slot="header">
            <span>用户昵称</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="publishTime" label="发布时间">
          <template slot="header">
            <span>发布时间</span>
            <el-button @click="handleSort('publish_time')" size="mini" type="text">
              <i :class="['el-icon-d-caret']"></i>
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="dueTime" label="截止时间">
          <template slot="header">
            <span>截止时间</span>
            <el-button @click="handleSort('publish_time')" size="mini" type="text">
              <i :class="['el-icon-d-caret']"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="reward" label="报酬/元">
          <template slot="header">
            <span>报酬/元</span>
            <el-button @click="handleSort('reward')" size="mini" type="text">
              <i :class="['el-icon-d-caret']"></i>
            </el-button>
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

      <el-pagination @current-change="handleCurrentChange" :current-page="Filter.page" :page-sizes="[5, 10, 15, 20]"
        :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleCurrentChange(val) {
      this.Filter.page = val;
      this.fetchData();
    },
    handleCampusChange() {
      this.Filter.page = 1;
      this.fetchData();
    },
    handleSexChange() {
      this.Filter.page = 1;
      this.fetchData();
    },
    handleSort(property) {
      if (this.Filter.sortOrder === property) {
        this.Filter.isDesc = !this.Filter.isDesc;
      } else {
        this.Filter.sortOrder = property;
        this.Filter.isDesc = false;
      }
      this.Filter.page = 1; // 每次排序时重置页码为1
      this.fetchData();
    },
    fetchData() {
      axios.post("/availableTask", this.Filter)
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
    SeacherData() {
      axios.post("/availableTask/search", this.Filter)
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          console.log(this.tableData[0]);
          
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
    goToTaskDetail(taskId) {
      this.$router.push({ path: '/TaskInformation', query: { taskId: taskId } });
    },
    handleSearch() {
      this.Filter.page = 1; // 每次搜索时重置页码为1
      this.SeacherData();
    },
  },
  created() {
    this.fetchData();
    this.SeacherData();
  },
  data() {
    return {
      tableData: [],
      Filter: {
        campus: "", // 校区筛选条件
        sex: "", // 性别筛选条件
        sortOrder: "reward", // 排序属性
        page: 1,
        isDesc: true, // 是否降序
        keyword:"",
        
      },
      total: 0,
      taskId: '',
      campusOptions: [
        { value: "", label: "全部" },
        { value: "A", label: "校区A" },
        { value: "B", label: "校区B" },
        { value: "C", label: "校区C" },
        { value: "D", label: "校区D" },
      ],
      sexOptions: [
        { value: "", label: "全部" },
        { value: "male", label: "男" },
        { value: "female", label: "女" },
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

.table-container {
  flex-grow: 1;
}
</style>
