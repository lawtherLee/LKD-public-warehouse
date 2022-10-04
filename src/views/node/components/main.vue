<template>
  <div class="main">
    <!-- 按钮 -->
    <el-button class="btn" type="warning" icon="el-icon-circle-plus-outline">新建</el-button>
    <!-- 表格区域 -->
    <el-table style="width: 100%" :data="regionList">
      <el-table-column type="index" :label="tableTh.id" width="80" />
      <el-table-column prop="name" :label="tableTh.address" width="400" />
      <el-table-column prop="nodeCount" :label="tableTh.point" width="420" />
      <el-table-column prop="remark" :label="tableTh.remarks" width="400" />
      <el-table-column prop="operation" :label="tableTh.operation" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    tableTh: {
      type: Object,
      required: true
    },
    regionList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.main{
    width: 1540px;
    min-height: 600px;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
}
.btn{
    margin: 0px 0px 20px;
}
</style>
