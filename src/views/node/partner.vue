<template>
  <div class="partner">
    <!-- 搜索区域 -->
    <div class="search">
      <el-form :inline="true">
        <el-form-item class="text" label="合作商搜索">
          <el-input v-model="page.name" class="ipt" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPartnerList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <!-- 按钮 -->
      <el-button class="btn" type="warning" icon="el-icon-circle-plus-outline" @click="isShowPartner=true">新建</el-button>
      <propup
        ref="propup"
        :is-show-partner.sync="isShowPartner"
        :is-show-emit-partner.sync="isShowEmitPartner"
        :is-show-detail-partner.sync="isShowDetailPartner"
      />
      <!-- 表格区域 -->
      <el-table :cell-style="tdCss" style="width: 100%" :data="partnerList">
        <el-table-column type="index" label="序号" width="75" />
        <el-table-column prop="name" label="合作商名称" width="200" />
        <el-table-column prop="account" label="账号" width="190" />
        <el-table-column prop="vmCount" label="设备数量" width="200" />
        <el-table-column label="分成比例" width="200">
          <template slot-scope="{row}">{{ row.ratio }}%</template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="190" />
        <el-table-column prop="mobile" label="联系电话" width="200" />
        <el-table-column prop="" label="操作">
          <template slot-scope="{row}">
            <el-button type="text">重置密码</el-button>
            <el-button type="text" @click="detailPartner(row)">查看详情</el-button>
            <el-button type="text" @click="emitPartner(row)">修改</el-button>
            <el-button type="text" @click="delPartner(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import propup from './components/propup.vue'
import { getPartnerListAPI, delPartnerAPI } from '@/api'
export default {
  name: 'Partner',
  components: { propup },
  data() {
    return {
      input: '',
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pageSize: 1000,
        name: ''
      },
      partnerList: [],
      // 清除表格内边距
      tdCss: {
        padding: 0
      },
      isShowPartner: false,
      isShowEmitPartner: false,
      isShowDetailPartner: false
    }
  },
  mounted() {
    this.getPartnerList()
  },
  methods: {
    emitPartner(row) {
      // this.$refs.propup.form = row直接赋值的话，地址一样，修改数据另一个也会跟着变动，可以用{ ...row }优化
      this.$refs.propup.form = { ...row }
      console.log(this.$refs.propup.form)
      this.isShowEmitPartner = true
    },
    detailPartner(row) {
      this.$refs.propup.form = { ...row }
      this.isShowDetailPartner = true
    },
    async getPartnerList() {
      const { data } = await getPartnerListAPI(this.page)
      this.partnerList = data.currentPageRecords
    },
    async delPartner(id) {
      try {
        // 删除提示弹窗
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        await delPartnerAPI(id)
        this.$message.success('删除成功')
        this.getPartnerList()
      } catch (error) {
        console.log(error)
      }
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
// .table-wrapper ::v-deep .el-table td{
//  border-bottom: 0px solid #dfe6ec !important;
// }
// .table-wrapper ::v-deep .el-table th{
//  border-bottom: 0px solid #dfe6ec !important;
// }
// .table-wrapper ::v-deep .el-table::before {
//  left: 0;
//  bottom: 0;
//  width: 100%;
//  height: 0px;
// }
</style>
