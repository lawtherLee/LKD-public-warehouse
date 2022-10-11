<template>
  <div>
    <el-form
      :inline="true"
      size="small"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="工单编号">
        <el-input
          v-model="formInline.taskCode"
          clearable
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="工单状态">
        <el-select
          v-model="formInline.status"
          placeholder="请选择"
          clearable
          @focus="allTaskAPIyy"
        >
          <el-option
            v-for="(item) in allTask"
            :key="item.statusId"
            :value="item.statusId"
            :label="item.statusName"
          >{{ item.statusName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onSubmit"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="new"
        @click="addRoles"
      >新建</el-button>
      <el-button class="gd" @click="updataRoles">工单配置</el-button>
    </div>
    <!-- <Tables /> -->

    <div class="table-wrapper">

      <el-table
        v-loading="loading"
        size="small"
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column

          label="序号"
          width="100"
          :formatter="formatterFn"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
          width="180"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
        />
        <el-table-column
          label="工单方式"
        >
          <template slot-scope="scope">{{ scope.row.createType===0?'自动':'手动' }}</template>
        </el-table-column>

        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"
        />
        <el-table-column
          prop="userName"
          label="运营人员"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
        > <template slot-scope="{row}">
          {{ row.createTime | formatDate }}
        </template></el-table-column>
        <el-table-column

          label="操作"
        >
          <template slot-scope="{row}"> <span class="xq" @click="newAdd(row)">查看详情</span></template>
        </el-table-column>

      </el-table>

    </div>

    <addRold ref="addRoless" :dislog-visible.sync="dislogVisible" />
    <workRold ref="addRole" :dialog-form-visible.sync="dialogFormVisible" />
    <newRolds ref="addRole" :construction.sync="construction" :value="newAddData" :rowss="rowss" />
    <!-- 分页 -->
    <div class="block">
      <span class="spantext">共{{ totalCount }}条记录 第{{ formInline.pageIndex }}/{{ totalPage }}页</span>

      <el-row type="flex" justify="end" align="middle">
        <el-col :span="10" class="pageBtn">
          <el-button class="prepage" @click="preBtn">上一页</el-button>
          <el-button class="nextpage" @click="nextBtn">下一页</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { taskIdAPI, ListTaskAPI, SeacherTaskAPI, allTaskAPI } from '@/api/task'

import addRold from './componten/addRold.vue'
import workRold from './componten/workRold.vue'
import newRolds from './componten/newRold.vue'
export default {
  components: { addRold, workRold, newRolds },
  data() {
    return {
      dislogVisible: false,
      dialogFormVisible: false,
      construction: false,
      formInline: {
        taskCode: '',
        region: '',
        page: 1, // 当前页
        pageSize: 10,
        pageIndex: 1, // 每页条数
        status: '',
        totalCount: '',

        isRepair: false
      },
      Searchhtask: {},
      allTask: [],
      tableData: [],
      newAddData: {},
      createTime: '',
      totalCount: 0,
      totalPage: 0,
      loading: false,
      rowss: ''
    }
  },
  created() {
    this.onSubmit()
  },
  mounted() {
    this.ListTaskAPI()
    this.allTaskAPIyy()
  },
  methods: {
    formatterFn(row, colum, cellValue, index) {
      return index + (this.formInline.pageIndex - 1) * 10 + 1
    },

    nextBtn() {
      // 当前页面+1
      if (this.formInline.pageIndex) {
        this.formInline.pageIndex++
        this.onSubmit()
      }
    },
    preBtn() {
      if (this.formInline.pageIndex > 1) {
        this.formInline.pageIndex--

        this.onSubmit()
      } else {
        return
      }
    },
    addRoles() {
      this.dislogVisible = true
    },
    // 新建

    async newAdd(row) {
      this.rowss = row.taskId
      const { data } = await taskIdAPI(row.taskId, this.formInline)
      console.log(111, data)
      this.newAddData = data

      this.construction = true
    },
    updataRoles() {
      this.dialogFormVisible = true
    },
    async ListTaskAPI() {
      const { data } = await ListTaskAPI()
      console.log(data)
    },
    async allTaskAPIyy() {
      const { data } = await allTaskAPI()
      // console.log('ooo', data)
      this.allTask = data
    },

    async onSubmit() {
      try {
        this.loading = true
        const { data } = await SeacherTaskAPI(this.formInline)
        // console.log(111, data)
        this.tableData = data.currentPageRecords
        this.totalPage = data.totalPage
        this.totalCount = data.totalCount
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped >
.btn {
  background-color: #fff;
}
.new {
  padding-left: 15px;
  color: #fff;
  width: 80px;
  height: 36px;
  background-color: #ff7931;
}
.gd {
  padding-left: 15px;
  width: 80px;
  height: 36px;
  color: #655b56;
  font-size: 14px;
  background-color: #fbf4f0;
}
.demo-form-inline {
  background-color: #fff;
  margin-bottom: 33px;
}
.spantext {
  color: #999;
  display: block;
  margin-top: 20px;
  margin-left: 36px;
}
.xq{
  color: #5f84ff;
   cursor:pointer
}
.result{
      padding: 20px 15px 19px 17px;
    background-color: #fff;
}
.table-wrapper ::v-deep .el-table td{
  border-bottom: 0px solid #dfe6ec !important;
}
.table-wrapper ::v-deep .el-table th{
  border-bottom: 0px solid #dfe6ec !important;
}
.table-wrapper ::v-deep .el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.bottom {
      margin-top: 15px;
      color: #66667e;
    }
    /* 分页控件btn */
    .pageBtn {
      display: flex;
      align-items: center;
      /* 分页按钮样式 */
    }
    .nextpage, .prepage{
        background-color: #d5ddf8;
           margin-right: -163px;
    margin-left: 239px;
    margin-top: -22px;
      }
</style>
