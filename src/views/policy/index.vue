<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="策略搜索">
        <el-input v-model="formInline.policyName" clearable placeholder="请输入" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!--  -->
    <div class="btn">
      <el-button icon="el-icon-circle-plus-outline" class="new" @click="updataRoles">新建</el-button>

    </div>

    <!--  -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
      />
      <el-table-column
        prop="policyName"
        label="策略名称"
        width="550"
      />
      <el-table-column
        prop="discount"
        label="策略方案"
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

        <template slot-scope="{row}">
          <span class="xq" @click="details(row)">查看详情</span>
          <span class="xq" @click="edit(row)">修改</span>
          <span class="xg" @click="del(row.policyId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <new-rold ref="editRole" :dialog-form-visible.sync="dialogFormVisible" />
    <lookRold ref="lookRole" :dislog-visible.sync="dislogVisible" :value="detailsData" :policy-name1="policyName1" />
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
import newRold from './componten/newRold.vue'
import lookRold from './componten/lookRold.vue'
import { SeacherAPI, delpolicyAPI, vmListAPI } from '@/api/policy'
export default {
  components: { newRold, lookRold },
  data() {
    return {
      dialogFormVisible: false,
      dislogVisible: false,
      formInline: {
        user: '',
        region: '',
        policyName: '',
        discount: 0,
        pageSize: 10,
        pageIndex: 1 // 每页条数

      },
      form: {
        pageSize: 10,
        pageIndex: 1 // 每页条数
      },
      loading: false,
      totalCount: 0,
      totalPage: 0,
      tableData: [],
      detailsData: [],
      policyName1: ''
    }
  },
  mounted() {
    this.SeacherAPI()
    this.onSubmit()
  },
  methods: {
    async  SeacherAPI() {
      const { data } = await SeacherAPI(this.formInline)
      console.log(data)
      this.tableData = data.currentPageRecords
    },
    // 点击查询
    async onSubmit() {
      try {
        this.loading = true
        const { data } = await SeacherAPI(this.formInline)
        this.tableData = data.currentPageRecords
        this.totalPage = data.totalPage
        this.totalCount = data.totalCount
        // console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 控制弹窗
    updataRoles() {
      this.dialogFormVisible = true
    },
    async details(row) {
      const { data } = await vmListAPI(row.policyId, this.form)
      // console.log(111, data)
      this.detailsData = data.currentPageRecords
      // console.log(row)
      this.policyName1 = row.policyName
      this.dislogVisible = true
    },
    // 点击上一页
    nextBtn() {
      // 当前页面+1
      this.formInline.pageIndex++
      this.onSubmit()
    },
    // 点击下一页
    preBtn() {
      if (this.formInline.pageIndex > 1) {
        this.formInline.pageIndex--

        this.onSubmit()
      } else {
        return
      }
    },
    // 删除
    async del(policyId) {
      try {
        await this.$confirm('确定删除该角色', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        // console.log('success')
        await delpolicyAPI(policyId)
        // console.log(policyId)
        // 刷新列表
        this.SeacherAPI()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log('error')
      }
    },
    edit(row) {
      this.$refs.editRole.form = { ...row }

      this.dialogFormVisible = true
    }

  }
}
</script>

<style scoped>
.demo-form-inline{
  background-color: #fff;
}
.btn {
  margin-top: 10px;
  background-color: #fff;
  height: 60px;
}
.new{
  padding-left: 15px;
  color: #fff;
  width: 80px;
  height: 36px;
  background-color: #ff7931;
}
.xq{
  margin-left: 5px;
  color: #5f84ff;
   cursor:pointer

}
.xg{
   margin-left: 10px;
   color: red;
   cursor:pointer
}
.table-wrapper ::v-deep .el-table td{
  border-bottom: 0px solid #dfe6ec !important;
}
.table-wrapper ::v-deep .el-table th{
  border-bottom: 0px solid #dfe6ec !important;
}
.spantext {
  color: #999;
  display: block;
  margin-top: 20px;
  margin-left: 36px;
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
