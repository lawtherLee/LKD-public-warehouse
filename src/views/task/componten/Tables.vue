<template>
  <div class="table-wrapper">

    <el-table
      size="small"
      :data="tableData"
      style="width: 100%"
    >

      <el-table-column
        type="index"
        label="序号"
        width="100"
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
      />
      <el-table-column

        label="操作"
      ><span class="xq">查看详情</span> </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { SeacherTaskAPI } from '@/api/task'
export default {
  // components: { addRold },
  // props: {
  //   lists: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  data() {
    return {
      createType: '',
      formInline: {
        taskCode: '',
        region: '',
        page: 1, // 当前页
        pageSize: 10,
        pageIndex: 1, // 每页条数
        status: '',
        isRepair: true
      },
      tableData: [],
      task: [],
      Searchtask: []

    }
  },
  created() {
    this.SeacherTaskAPIrrr()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    // async taskAPI() {
    //   try {
    //     const { data } = await taskAPI(this.taskId)
    //     // console.log(data)
    //     this.task = data
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    async SeacherTaskAPIrrr() {
      const { data } = await SeacherTaskAPI(this.formInline)
      // console.log(1111, data)
      this.tableData = data.currentPageRecords

      // if (this.list) {
      //   this.tableData = this.list.currentPageRecords
      // }
      // this.lists.totalPage ? this.tableData = this.lists.currentPageRecords :
      // this.$emit('list', this.tableData)
      // console.log(this.tableData)
    }

  }
}

</script>

<style scoped>
.result{
      padding: 20px 15px 19px 17px;
    background-color: #fff;
}
/* .btn {
  background-color: #fff;
}
.new{
  padding-left: 15px;
  color: #fff;
  width: 80px;
  height: 36px;
  background-color: #ff7931;
}
.gd{
    padding-left: 15px;
   width: 80px;
  height: 36px;
  color: #655b56;
  font-size: 14px;
   background-color: #fbf4f0;
}
.xq{
  color: #5f84ff;
   cursor:pointer
} */
.xq{
  color: #5f84ff;
   cursor:pointer
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
</style>
