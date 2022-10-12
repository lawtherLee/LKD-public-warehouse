<template>
  <div class="node">
    <!-- 搜索区域 -->
    <div class="search">
      <el-form :inline="true">
        <el-form-item class="text" label="点位搜索">
          <el-input v-model="page.name" class="ipt" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRegionList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <!-- 按钮 -->
      <el-button class="btn" type="warning" icon="el-icon-circle-plus-outline" @click="isShowAddRegion=true">新建</el-button>
      <regionPopup :is-show-add-region.sync="isShowAddRegion" />
      <!-- 表格区域 -->
      <el-table :cell-style="tdCss" style="width: 100%" :data="regionList">
        <el-table-column label="序号" width="75" :formatter="formatterFn" />
        <el-table-column prop="name" label="区域名称" width="300" />
        <el-table-column prop="nodeCount" label="点位数" width="300" />
        <el-table-column prop="name" label="备注说明" width="400" />
        <el-table-column prop="" label="操作">
          <template slot-scope="{row}">
            <el-button type="text">查看详情</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text" @click="delRegion(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="spantext">共{{ totalCount }}条记录 第{{ page.pageIndex }}/{{ totalPage }}页</span>
        <el-row type="flex" justify="end" align="middle">
          <el-col :span="10" class="pageBtn">
            <el-button class="prepage" @click="lastPage">上一页</el-button>
            <el-button class="nextpage" @click="nextPage">下一页</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
import { getRegionListAPI, delRegionAPI } from '@/api'
import regionPopup from './components/regionPopup.vue'
export default {
  name: 'Region',
  components: { regionPopup },
  data() {
    return {
      title: '区域搜索:',
      // 清除表格内边距
      tdCss: {
        padding: 0
      },
      tableTh: {
        id: '序号',
        address: '区域名称',
        point: '点位数',
        remarks: '备注说明',
        operation: '操作'
      },
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pagesize: 10,
        name: ''
      },
      regionList: [],
      totalCount: 0,
      totalPage: 0,
      isShowAddRegion: false
    }
  },
  mounted() {
    this.getRegionList()
  },
  methods: {
    formatterFn(row, column, cellValue, index) {
      return index + (this.page.pageIndex - 1) * 10 + 1
    },
    nextPage() {
      this.page.pageIndex++
      this.getRegionList()
    },
    lastPage() {
      this.page.pageIndex--
      this.getRegionList()
    },
    async getRegionList() {
      const { data } = await getRegionListAPI(this.page)
      this.regionList = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      // console.log(111, data)
    },
    async delRegion(id) {
      await delRegionAPI(id)
      this.getRegionList()
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
.spantext {
 color: #999;
 display: block;
 margin-top: 20px;
 margin-left: 36px;
}
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
