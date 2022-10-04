<template>
  <div class="node">
    <!-- 搜索区域 -->
    <div class="search">
      <el-form :inline="true">
        <el-form-item class="text" label="点位搜索">
          <el-input v-model="input" class="ipt" placeholder="请输入" />
        </el-form-item>
        <el-form-item class="text" label="区域搜索">
          <el-input v-model="input" class="ipt" placeholder="请选择" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <!-- 按钮 -->
      <el-button class="btn" type="warning" icon="el-icon-circle-plus-outline">新建</el-button>
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="nodeList">
        <el-table-column type="index" label="序号" width="75" />
        <el-table-column prop="name" label="点位名称" width="250" />
        <el-table-column prop="region.name" label="所在区域" width="240" />
        <el-table-column prop="businessType.name" label="商圈类型" width="250" />
        <el-table-column prop="ownerName" label="合作商" width="240" />
        <el-table-column prop="name" label="详细地址" width="250" />
        <el-table-column prop="" label="操作" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getNodeListAPI } from '@/api'
export default {
  name: 'Region',
  data() {
    return {
      input: '',
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pagesize: 10
      },
      nodeList: []
    }
  },
  mounted() {
    this.getNodeList()
  },
  methods: {
    async getNodeList() {
      const { data } = await getNodeListAPI(this.page)
      this.nodeList = data.currentPageRecords
      console.log(111222, data.currentPageRecords)
    }
  }
}
</script>

<style>
.node{
  width: 1580px;
}
.search{
  width: 1540px;
  height: 64px;
  margin: 20px;
  padding: 14px 20px;
  background-color: #fff;
}
.ipt{
    width: 206px;
    height: 36px;
  }
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
