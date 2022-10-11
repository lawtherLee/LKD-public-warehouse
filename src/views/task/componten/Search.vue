<template>

  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
    <el-form-item label="工单编号">
      <el-input v-model="formInline.taskCode" clearable placeholder="请输入" />
    </el-form-item>
    <el-form-item label="工单状态">
      <el-select v-model="formInline.region" placeholder="请选择" clearable>
        <el-option v-for="(item,index) in allTask" :key="index" :value="item.statusName">{{ item.statusName }}</el-option>

      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { allTaskAPI, SeacherTaskAPI } from '@/api/task'
export default {

  data() {
    return {
      formInline: {
        taskCode: '',
        region: '',
        page: 1, // 当前页
        pageSize: 10,
        pageIndex: 1, // 每页条数
        status: '',
        isRepair: ''

      },
      Searchhtask: {},
      allTask: []

    }
  },
  created() {
    this.allTaskAPI()
  },
  methods: {

    async allTaskAPI() {
      const { data } = await allTaskAPI()
      // console.log(data)
      this.allTask = data
    },
    async  onSubmit() {
      const { data } = await SeacherTaskAPI(this.formInline)
      this.Searchhtask = data.currentPageRecords
    }
  }
}
</script>

<style scoped>
/* .search{
  height: 64px;
  margin-bottom: 20px;
  padding-left: 17px;

background-color: #fff;
}
.ipt{
  width: 205px;
}
.el-button{
      border: 1px solid #fbf4f0;
  margin-left:10px;
  color: #fff;
  background-color: #5f84ff;
}
span{
  font-size: 14px;
  margin-left: 5px;
  color: #606266;
} */
.demo-form-inline{
  background-color: #fff;
  margin-bottom: 33px;
}
</style>
