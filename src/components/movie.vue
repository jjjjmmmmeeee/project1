<template>
  <div class="container">
    <!-- 左边选择器 -->
    <el-form class="filters">
      <!-- 校区选择器 -->
      <el-form-item label="校区：">
        <el-select
          v-model="Filter.campus"
          placeholder="请选择校区"
          @change="handleCampusChange"
          class="filter-selector">
          <el-option
            v-for="item in campusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 性别选择器 -->
      <el-form-item label="发布者所在宿舍（男/女）：">
        <el-select
          v-model="Filter.sex"
          placeholder="请选择男/女宿舍订单"
          @change="handleSexChange"
          class="filter-selector">
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 右边表格和分页 -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column
          prop="username"
          label="名字"
          width="80">
          <template slot="header">
            <span>名字</span>
          
          </template>
        </el-table-column>
        <el-table-column
          prop="startAddress"
          label="开始地点"
          width="180">
          <template slot="header">
            <span>开始地点</span>
            
          </template>
        </el-table-column>
        <el-table-column
          prop="endAddress"
          label="结束地点"
          width="180">
          <template slot="header">
            <span>结束地点</span>
           
          </template>
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间">
          <template slot="header">
            <span>发布时间</span>
            <el-button @click="handleSort('publish_time')" size="mini" type="text">

              <i :class="['el-icon-d-caret', iconClass]"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="reward"
          label="报酬/元">
          <template slot="header">
            <span>报酬/元</span>
            <el-button @click="handleSort('reward')" size="mini" type="text">
              <i :class="['el-icon-d-caret', iconClass]"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template >
            <el-button
              @click="goToTaskDetail"
              size="mini"
              type="text">
              查看详情
            </el-button>
            <!-- <a href="/src/components/movie1.vue">查看详情</a> -->
            
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="Filter.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
  
</template>
<style>
.container {
  display: flex;
  align-items: flex-start;
}

.filters {
  display: flex;
  flex-direction: column; /* 垂直排列选择器 */
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
<script>
import axios from "axios";
import movie1 from "./movie1.vue";

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
      // 如果当前排序属性与点击的列相同，切换升序/降序
      if (this.Filter.sortOrder === property) {
        this.Filter.isDesc = !this.Filter.isDesc;
      } else {
        // 否则，设置新的排序属性，默认升序
        this.Filter.sortOrder = property;
        this.Filter.isDesc = false;
      }
      this.Filter.page = 1; // 每次排序时重置页码为1
      this.fetchData();
    },
    fetchData() {
      axios.post("/availableTask",  this.Filter )
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
  },
  created() {
    this.fetchData();
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
      },
      total: 0,
      id:1,
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
