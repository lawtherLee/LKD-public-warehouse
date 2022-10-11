<template>
  <div>
    <inputSearchTwo :label-first="labelFirst" :label-second="labelSecond" :list="list" @onSubmit="onSubmit" />
    <FormList
      :form-list="formList"
      :page-size="pageSize"
      :table-data="tableData"
      :total="total"
      button1="查看详情"
      @buttonOne="buttonOne"
      @changePage="changePage"
    />
    <el-dialog :before-close="handleClose" :visible.sync="formDialog" style="width:100%" title="人员详情">
      <el-row class="user-info">
        <div>人员名称：{{ dialogData.userName }}</div>
        <div>角色:{{ dialogData.roleName }}</div>
        <div>联系电话:{{ dialogData.mobile }}</div>
        <div>负责区域:{{ dialogData.regionName }}</div>
      </el-row>
      <el-table
        :data="[dialogTable,dialogTableMonth,dialogTableYear]"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          width="180"
        />
        <el-table-column
          label="总工单数"
          prop="total"
          width="180"
        />
        <el-table-column
          label="拒绝工单"
          prop="cancelCount"
        />
        <el-table-column
          label="完成工单"
          prop="workCount"
        />
        <el-table-column
          label="进行中工单"
          prop="progressTotal"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import InputSearchTwo from '@/components/InputSearchTwo'
import FormList from '@/components/FormList'
import { getUserWorksAPI, getWorkloadListAPI, userInfoAPI } from '@/api'

export default {
  name: 'Index',
  components: { InputSearchTwo, FormList },
  data() {
    return {
      labelFirst: '人员搜索',
      labelSecond: '角色',
      formList: [
        {
          label: '人员名称',
          prop: 'userName'
        },
        {
          label: '角色',
          prop: 'roleName'
        },
        {
          label: '联系电话',
          prop: 'mobile'
        },
        {
          label: '完成工单(本月)',
          prop: 'workCount'
        },
        {
          label: '进行中工单',
          prop: 'progressTotal'
        },
        {
          label: '拒绝工单(本月)',
          prop: 'total'
        }
      ],
      tableData: [],
      total: 0,
      pageSize: 1,
      userName: '',
      list: [{ name: '运营员', id: false },
        { name: '维修员', id: true }
      ],
      isRepair: '',
      formDialog: false,
      dialogData: [],
      dialogTable: [],
      dialogTableMonth: [],
      dialogTableYear: [],
      name: '',
      start1: this.dayjs().startOf('week').format('YYYY-MM-DD HH:mm:ss'),
      start2: this.dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      start3: this.dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
      end: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    this.getWorkLoadList()
  },
  methods: {
    async getWorkLoadList() {
      const { data } = await getWorkloadListAPI({
        pageIndex: this.pageSize, userName: this.userName, isRepair:
        this.isRepair
      })
      this.tableData = data.currentPageRecords
      this.total = data.totalCount
      this.pageSize = +data.pageIndex
    },
    changePage(val) {
      this.pageSize = val
      this.getWorkLoadList()
    },
    async buttonOne(val) {
      this.formDialog = true
      this.dialogData = await userInfoAPI(val.userId)
      this.dialogTable = await getUserWorksAPI({ start: this.start1, end: this.end, userId: val.userId })
      this.dialogTable.name = '本周'
      this.dialogTable = await getUserWorksAPI({ start: this.start2, end: this.end, userId: val.userId })
      this.dialogTable.name = '本月'
      this.dialogTable = await getUserWorksAPI({ start: this.start3, end: this.end, userId: val.userId })
      this.dialogTable.name = '本日'
    },
    handleClose() {
      this.formDialog = false
    },
    onSubmit(val) {
      this.userName = val.left
      this.isRepair = val.right
      this.getWorkLoadList()
    }
  }

}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: space-between;
  height: 86px;
  padding: 19px 19px 0;
  background: #f3f6fb;
  font-size: 20px;
}

::v-deep .el-row {
  display: none;
}
</style>
