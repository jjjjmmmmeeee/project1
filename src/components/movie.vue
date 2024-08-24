<template>
  <div>
    <el-select v-model="value" placeholder="请选择校区">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="username" label="名字" width="80">
      </el-table-column>
      <el-table-column prop="startAddress" label="开始地点" width="180">
      </el-table-column>
      <el-table-column prop="endAddress" label="结束地点" width="180">
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间"> </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="this.Filter.page" :page-sizes="[5, 10, 15, 20]"
      :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<style>
.rating {
  unicode-bidi: bidi-override;
  direction: rtl;
}

.rating>span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}

.rating>span:hover:before,
.rating>span:hover~span:before {
  content: "\2605";
  position: absolute;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import request from "@/utils/request";
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
    fetchData() {
      axios.post("/availabletask/task", this.Filter).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
  },
  created: function () {
    this.fetchData();
  },
  data() {
    return {
      tableData: [],
      Filter: {
        campus: "",
        sex: "",
        sortOrder: "publish_time",
        page: 1,
        isDesc: false,
      },
      total: 0,
      options: [{
          value: '选项1',
          label: 'A'
        }, {
          value: '选项2',
          label: 'B'
        }, {
          value: '选项3',
          label: 'C'
        }, {
          value: '选项4',
          label: 'D'
        }],
         value: ''
    };
  },
};
</script>