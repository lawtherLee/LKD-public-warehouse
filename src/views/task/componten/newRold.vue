<template>
  <el-dialog title="工单详情" :visible.sync="construction" :before-close="hanleClose">
    <el-dialog
      width="30%"
      title="补货详情"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-table
        :data="tableData"

        style="width: 100%"
      >
        <el-table-column
          prop="channelCode"
          label="货道编号"
          width="180"
        />
        <el-table-column
          prop="skuName"
          label="商品"
          width="180"
        />
        <el-table-column
          prop="expectCapacity"
          label="补货数量"
        />
      </el-table>

    </el-dialog>

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">设备编号:{{ value.innerCode }}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">创建日期:{{ value.createTime | formatDate }}</div></el-col>

    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">取消日期:{{ value.updateTime | formatDate }}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">运营人员 {{ value.userName }}</div></el-col>

    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">工单类型:{{ value.taskType && value.taskType.typeName }}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">补货数量:
        <span class="xq" @click="program">补货详情</span></div></el-col>

    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">工单方式:手动</div>

      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">取消原因:</div></el-col>

    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="anew">重新创建</el-button>

    </div>
    <addRold :dislog-visible.sync="dislogVisible" />
  </el-dialog>
</template>

<script>
import { taskDetailsAPI } from '@/api/task'
import addRold from './addRold.vue'
export default {
  components: { addRold },
  props: {
    construction: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    },
    rowss: {
      type: String, Number,
      required: true
    }

  },
  data() {
    return {
      innerVisible: false,
      dislogVisible: false,
      formLabelWidth: '120px',
      tableData: []
    }
  },
  mounted() {
    console.log(111, this.value)
  },
  methods: {
    hanleClose() {
      this.$emit('update:construction', false)
    },
    async program() {
      this.innerVisible = true

      const { data } = await taskDetailsAPI(this.rowss)
      this.tableData = data
      // console.log(data)
    },
    async anew() {
      this.dislogVisible = true
    }
  }
}
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;

  }
   .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .xq{
    color:#7c9bff;
    cursor: pointer;
  }
</style>
