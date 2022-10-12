<template>
  <div class="node">
    <!-- 搜索区域 -->
    <div class="search">
      <el-form :inline="true">
        <el-form-item class="text" label="点位搜索">
          <el-input v-model="page.name" class="ipt" placeholder="请输入" />
        </el-form-item>
        <el-form-item class="text" label="区域搜索">
          <el-input v-model="input" class="ipt" placeholder="请选择" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getNodeList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <!-- 按钮 -->
      <el-button class="btn" type="warning" icon="el-icon-circle-plus-outline" @click="isShowAddNode=true">新建</el-button>
      <nodePopup :is-show-add-node.sync="isShowAddNode" :add-select="addSelect" />
      <!-- 表格区域 -->
      <el-table :cell-style="tdCss" style="width: 100%" :data="addSelect.nodeList">
        <el-table-column type="index" label="序号" width="75" />
        <el-table-column prop="name" label="点位名称" width="220" />
        <el-table-column prop="region.name" label="所在区域" width="240" />
        <el-table-column prop="businessType.name" label="商圈类型" width="220" />
        <el-table-column prop="ownerName" label="合作商" width="240" />
        <el-table-column prop="name" label="详细地址" width="250" />
        <el-table-column prop="" label="操作">
          <!-- <template slot-scope="{row}">
            <el-button type="text">重置密码</el-button>
            <el-button type="text" @click="detailNode(row)">查看详情</el-button>
            <el-button type="text" @click="emitNode(row)">修改</el-button>
            <el-button type="text" @click="delNode(row.id)">删除</el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import nodePopup from './components/nodePopup.vue'
import { getNodeListAPI, getRegionListAPI, getPartnerListAPI } from '@/api'
export default {
  name: 'Region',
  components: { nodePopup },
  data() {
    return {
      // 清除表格内边距
      tdCss: {
        padding: 5
      },
      input: '',
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      addSelect: {
        regionList: [],
        partnerList: [],
        nodeList: []
      },
      isShowAddNode: false
    }
  },
  mounted() {
    this.getNodeList()
    this.getRegionList()
    this.getPartnerList()
  },
  methods: {
    // 点位列表
    async getNodeList() {
      const { data } = await getNodeListAPI(this.page)
      this.addSelect.nodeList = data.currentPageRecords
      console.log(111222, data)
    },
    // 区域列表
    async  getRegionList() {
      const { data } = await getRegionListAPI(this.page)
      this.addSelect.regionList = data.currentPageRecords
      console.log(777, data)
    },
    // 合作商列表
    async getPartnerList() {
      const { data } = await getPartnerListAPI(this.page)
      this.addSelect.partnerList = data.currentPageRecords
      console.log(this.addSelect.partnerList)
    }
  }
}
</script>

<style scoped lang="scss">
.partner{
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
