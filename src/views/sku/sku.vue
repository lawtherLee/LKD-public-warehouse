<template>
  <div style="vm-box">
    <!-- 搜索区域 -->
    <el-card
      body-style="padding:20px;"
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="设备编号" style="margin: 0px;margin-right:15px">
          <el-input v-model.trim="params.name" size="medium " label-width="350px" placeholder="请输入" />
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
        <el-row>
          <el-button type="danger" @click="isShowSkuPropup=true">
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
            label="序号"
            width="80"
            :formatter="formatter"
          />
          <el-table-column
            prop="skuName"
            label="商品名称"
            width="120"
          />

          <el-table-column
            prop="skuImage"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">
              <img style="width: 25px;height: 25px;border-radius: 50%;" :src="row.skuImage" alt="">
            </template></el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
            show-overflow-tooltip
            width="100"
          />

          <el-table-column
            prop="unit"
            label="规格"
            show-overflow-tooltip
          />
          <el-table-column
            prop="channelMaxCapacity"
            label="商品价格"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">
              {{ row.price/100 }}元
            </template>
          </el-table-column>
          <el-table-column
            prop="skuClass.className"
            label="商品类型"
            show-overflow-tooltip
          />
          <el-table-column
            prop="createTime"
            label="创建日期"
            show-overflow-tooltip
            :formatter="formatterTime"
          />
          <el-table-column

            label="操作"
            show-overflow-tooltip
            width="260"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" round @click="editGoodsType(row)">修改</el-button>
            </template></el-table-column>

        </el-table>
        <div class="switchBtn">
          <!-- 总页码和分页 -->
          <span class="pageNum">共{{ tableData.totalCount }}条 第{{ params.pageIndex }} / {{ tableData.totalPage }}页</span>
          <!-- 切换页码 -->
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              :disabled="params.pageIndex<=1"
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
    <typepropup ref="typePropup" :is-show-sku-propup.sync="isShowSkuPropup" /></div>

</template>

<script>
import dayjs from '@/utils/dayjs'
import { getSkuGoodsListAPI } from '@/api/sku'
import typepropup from './components/typepropup.vue'
// import SearchFrom from './components/SearchFrom.vue'
export default {
  components: {
    typepropup
  },
  data() {
    return {
      tableData: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      mvStatus: ['未投放', '运营', '', '随机'],
      tdCss: {
        padding: 5 + 'px'
      },
      loading: false,
      isShowSkuPropup: false,
      GoosvolumeLIst: [],
      // 销售数据
      GoosvolumeL: {}
    }
  },
  computed: {
    showNextbtn() {
      const pagesizBtn = this.params.pageIndex * this.params.pageSize
      return (pagesizBtn >= this.tableData.totalCount)
    }
  },
  created() {
    this.deviceList()
  },
  methods: {
    // 修改时间=
    formatterTime(row, colom, cellValue, index) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    // 修改索引前边
    formatter(row, colom, cellValue, index) {
      // console.log(index * (this.params.pageIndex - 1) * 10)
      return index + (this.params.pageIndex - 1) * 10 + 1
    },
    // 编辑类型
    editGoodsType(row) {
      this.isShowSkuPropup = true
      console.log(6, row)
      row.classId = row.skuClass.className
      const data = {
        skuName: row.skuName,
        skuImage: row.skuImage,
        price: row.price,
        classId: row.classId,
        unit: row.unit,
        brandName: row.brandName
      }
      this.$refs.typePropup.formData = data
      this.$refs.typePropup.skuId = row.skuId
      console.log(124, this.$refs.typePropup.formData, this.$refs.typePropup.skuId)
    },
    // 点击删除
    delEquipment() {
      this.$notify({
        title: '警告',
        message: '不支持删除操作',
        type: 'warning'
      })
    },
    // 关闭弹窗
    handleClose() {
      this.isShowSkuPropup = false
    },
    // 搜索列表
    onSubmit() {
      this.params.pageIndex = 1
      this.deviceList()
    //   const { data } = await searchListAPI(this.params)
    //   console.log(data)
    },
    // 获取页面数据
    async deviceList() {
      this.loading = true
      try {
        const { data } = await getSkuGoodsListAPI(this.params)
        this.tableData = data
        // console.log(1232, this.tableData)
      } finally {
        this.loading = false
      }
    },
    // 上一页数据
    getOnPage() {
      this.params.pageIndex--
      this.deviceList()
    },
    getDownPage() {
      this.params.pageIndex++
      this.deviceList()
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
