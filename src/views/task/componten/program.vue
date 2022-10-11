<template>
  <el-dialog title="补货详情" :visible.sync="dialogFormVisibles" :before-close="hanleClose">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </el-dialog>
</template>

<script>

export default {
  components: { },
  props: {
    dialogFormVisibles: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '120px'
    }
  },
  mounted() {

  },
  methods: {
    hanleClose() {
      this.$emit('update:dialogFormVisibles', false)
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
