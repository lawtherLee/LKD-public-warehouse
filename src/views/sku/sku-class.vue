<template>
  <div id="sku" style="vm-box">
    <!-- 搜索区域 -->
    <el-card
      body-style="padding:20px;"
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="设备编号" style="margin: 0px;margin-right:15px">
          <el-input v-model.trim="page.className" size="medium " label-width="350px" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium " @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form></el-card>
    <!-- 内容主题区域 -->
    <div class="main">
      <el-card
        body-style="padding:20px;"
      >
        <!-- 新建按钮 -->
        <el-row>
          <el-button type="danger" @click="isShowPropup=true">
            <span class="el-icon-circle-plus-outline" />新建
          </el-button>
        </el-row>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData.currentPageRecords"
          style="width: 100%"
          :cell-style="tdCss"
        >

          <el-table-column
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column

            prop="className"
            label="商品类型名称"
            width="1200"
          />
          <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">                        <!--  设备详情 -->
              <el-button type="text" @click="editequipmentdetails(row)">修改</el-button>
              <el-button type="text" style="color:red" @click="delequipmentdetails">删除</el-button>
            </template></el-table-column>
        </el-table>
        <div v-if="tableData.totalCount>10" class="switchBtn">
          <!-- 总页码2和分页 -->
          <span class="pageNum">共{{ tableData.totalCount }}条 第{{ page.pageIndex }} / {{ tableData.totalPage }}页</span>
          <!-- 切换页码 -->
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              :disabled="page.pageIndex<=1"
              style="margin-right:20px"
              icon="el-icon-arrow-left"
              @click="getOnPage"
            >上一页</el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="tableData.currentPageRecords&&showNextbtn"
              @click="getDownPage"
            >下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </el-button-group>
        </div>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <div v-if="isShowPropup">
      <el-dialog :title="fromData.classId?'编辑商品类型':'新增商品类型'" :visible="isShowPropup" @close="handleClose">
        <el-form>
          <el-form-item label="活动形式" label-width="100px">
            <el-input
              v-model.trim="fromData.className"
              type="text"
              placeholder="请输入内容"
              maxlength="10"
              show-word-limit
            /></el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addGoods">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { getGoodsListAPI, addGoodslistAPI, editGoodslistAPI } from '@/api/sku'
export default {

  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        className: ''
      },
      fromData: {
        className: ''
      },
      tdCss: {
        height: 30 + 'px', lineHeight: 30 + 'px', padding: '0!important'
      },
      loading: false,
      isShowPropup: false
    }
  },
  computed: {
    showNextbtn() {
      const pagesizBtn = this.page.pageIndex * this.page.pageSize
      return (pagesizBtn >= this.tableData.totalCount)
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 商品列表
    async getGoodsList() {
      try {
        this.loading = true
        const { data } = await getGoodsListAPI(this.page)
        this.tableData = data
      } finally {
        this.loading = false
      }
    },
    // 新增列表和编辑
    async addGoods() {
      try {
        this.loading = true
        if (!this.fromData.className) return this.$message.error('请输入新增商品名称')
        this.fromData.classId ? await editGoodslistAPI(this.fromData) : await addGoodslistAPI(this.fromData.className)

        this.handleClose()
        this.getGoodsList()
        this.$message.success('新增成功')
      } catch (error) {
        console.log(error.response)
        this.$message.error(error.response.data)
      } finally {
        this.loading = false
      }
    },
    // 关闭弹窗
    handleClose() {
      this.isShowPropup = false
      this.fromData = {
        className: ''
      }
    },
    // 搜索列表
    onSubmit() {
      this.page.pageIndex = 1
      this.getGoodsList()
      //   const { data } = await searchListAPI(this.params)
      //   console.log(data)
    },
    // 编辑功能
    editequipmentdetails(row) {
      this.isShowPropup = true
      this.fromData = { ...row }
    },
    // 删除功能
    delequipmentdetails() {
      this.$notify({
        title: '警告',
        message: '系统演示,不支持此操作',
        type: 'warning'
      })
    },
    // 上一页数据
    getOnPage() {
      this.page.pageIndex--
      this.getGoodsList()
    },
    getDownPage() {
      this.page.pageIndex++
      this.getGoodsList()
    }
  }
}

</script>

  <style lang="scss" scoped>
   .vm-box{
      padding: 20px;
    background-color: #f8fafb;
    }
  .switchBtn {
    display: flex;
    justify-content: space-between;
    margin:20px 50px;
    .pageNum {
      color:#ccc;
      font-size: 18px;
    }
  }
  .main {
    margin-top: 20px;
  }
  .el-dialog__header {
  background-color: #fff;
  }
  .sales {
    display:flex;
    justify-content: space-around;
    height: 55px;
    padding: 15px 0;
    background-color: #f4f6f9;
  }
  </style>

<style  scoped>
  #sku /deep/ .el-dialog__header{
    background-color: #fff;
  }

  #sku /deep/ .el-dialog__title{
      color: #000;
    }

  #sku /deep/ .el-dialog{
      border-radius: 20px;
    }
    #sku /deep/ .el-dialog__header{
      border-radius: 20px;
    }
    #sku /deep/  .el-dialog__close::before {
      color: red;
    }
    #sku  :deep(.el-button+.el-button) {
      border: 0;
      background-color: #ff6c50;
    }
  </style>
