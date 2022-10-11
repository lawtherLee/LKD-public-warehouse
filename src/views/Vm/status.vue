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
          <el-input v-model.trim="params.innerCode" size="medium " label-width="350px" placeholder="请输入" />
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
            prop="innerCode"
            label="设备编号"
            width="120"
          />
          <el-table-column
            prop="type.name"
            label="设备型号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="node.addr"
            label="详细地址"
            show-overflow-tooltip
          />
          <el-table-column
            prop="mvStatus"
            label="运营状态"
            show-overflow-tooltip
            width="100"
          >
            <template slot-scope="{row}">{{ mvStatus[row.vmStatus] }}</template></el-table-column>
          <el-table-column
            prop="node.ownerName"
            label="设备状态"
            show-overflow-tooltip
            width="260"
          >
            <template>
              <el-button size="mini" type="warning" round>离线</el-button>
              <el-button size="mini" type="success" round>货道</el-button>
              <el-button size="mini" type="success" round>传动轴</el-button>
            </template></el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">                        <!--  设备详情 -->
              <el-button type="text" @click="equipmentdetails(row)">查看详情</el-button>
            </template></el-table-column>
        </el-table>
        <div class="switchBtn">
          <!-- 总页码2和分页 -->
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
    <!-- 弹窗 -->
    <div v-if="isShowPropup">
      <el-dialog title="设备详情" :visible="isShowPropup" @close="handleClose">
        <div class="sales">
          <span>销售量 : {{ GoosvolumeL.GoosvolumeL.data }} 个</span>
          <span>销售额 : {{ GoosvolumeL.GoosvolumeE.data }} 元 </span>
          <span>补偿次数 : {{ GoosvolumeL.GoosvolumeAdd.data }} 次</span>
          <span>维修次数 : {{ GoosvolumeL.GoosvolumeLX.data }} 次</span>
        </div>
        <p>商品销售量(月)</p>

        <div v-if="GoosvolumeLIst.length" style="max-height: 2000px;min-height: 50px;clear: both;">
          <span
            v-for="item in GoosvolumeLIst"
            :key="item.id"
            style="padding-left:10px;float: left;width:25%;height:50px;line-height:50px;border:1px solid #ccc"
          >{{ item.skuName +':'+ item.count }}</span>
        </div>
        <div v-else style="text-align:center;padding:10px 0">暂时没有数据</div>
        <div style="clear:both" />
      </el-dialog>
    </div>
  </div>

</template>

<script>
import dayjs from '@/utils/dayjs'
import { deviceListAPI, getGoosvolumeAPI, getGoosvolumeLAPI, getGoosvolumeEAPI, getGoosvolumeAddAPI, getGoosvolumeXAPI } from '@/api/vm'
// import SearchFrom from './components/SearchFrom.vue'
export default {

  data() {
    return {
      tableData: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        innerCode: ''
      },
      mvStatus: ['未投放', '运营', '', '随机'],
      tdCss: {
        height: 30 + 'px', lineHeight: 30 + 'px', padding: '0!important'
      },
      loading: false,
      isShowPropup: false,
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

    // 关闭弹窗
    handleClose() {
      this.isShowPropup = false
    },
    // 查看详情点击的设备
    async  equipmentdetails(row) {
      this.isShowPropup = true
      console.log(row)
      // 商品销售
      const params = {
        innerCode: row.innerCode,
        start: dayjs(new Date()).format('YYYY-MM') + '-01',
        end: dayjs(new Date()).format('YYYY-MM-DD')
      }
      const paramss = {
        innerCode: row.innerCode,
        start: dayjs(new Date()).format('YYYY-MM') + '-01 00:00:00',
        end: dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      }
      console.log(params.start, params.end)
      const { data } = await getGoosvolumeAPI(params)
      const GoosvolumeL = await getGoosvolumeLAPI(paramss)
      const GoosvolumeE = await getGoosvolumeEAPI(paramss)
      const GoosvolumeAdd = await getGoosvolumeAddAPI(params)
      const GoosvolumeLX = await getGoosvolumeXAPI(params)
      this.GoosvolumeLIst = data
      this.GoosvolumeL = {
        GoosvolumeL, GoosvolumeE, GoosvolumeAdd, GoosvolumeLX
      }
      console.log(1231, this.GoosvolumeLIst, GoosvolumeL, GoosvolumeE, GoosvolumeAdd, GoosvolumeLX)
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
        const { data } = await deviceListAPI(this.params)
        this.tableData = data
        console.log(2, data)
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
