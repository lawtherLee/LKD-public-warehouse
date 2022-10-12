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
        <!-- 新建按钮 -->
        <el-row>
          <el-button type="danger" @click="isShowPropup=true">
            <span class="el-icon-circle-plus-outline" />新建
          </el-button>
          <!-- 编辑策略 -->
          <el-button @click="editStrategy">批量操作</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData.currentPageRecords"
          style="width: 100%"
          :cell-style="tdCss"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="序号"
            width="80"
            :formatter="formatter"
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
            prop="node.ownerName"
            label="合作商"
            show-overflow-tooltip
          />
          <el-table-column
            prop="mvStatus"
            label="设备状态"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">{{ mvStatus[row.vmStatus] }}</template></el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">
              <el-button type="text" @click="CargoChannel(row)">货道</el-button>
              <el-button type="text" @click="queryStrategy(row)">策略</el-button>
              <el-button type="text" @click="editModify(row)">修改</el-button>
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
          </el-button-group></div>
      </el-card>
    </div>
    <propup
      v-if="isShowPropup||isshowStrategy||isshowModify||isshowCargoChannel"
      :isshow-click-strategy.sync="isshowClickStrategy"
      :checked-table-list="checkedTableList"
      :isshow-strategy.sync="isshowStrategy"

      :isshow-cargo-channel.sync="isshowCargoChannel"
      :is-show-propup.sync="isShowPropup"
      :click-this-strategy="clickThisStrategy"
      :isshow-modify.sync="isshowModify"
      :clickedit-modify="clickeditModify"
    />
  </div>
</template>

<script>
import { deviceListAPI, getThisClickStrategyAPI } from '@/api/vm'
import propup from './components/propup.vue'
// import SearchFrom from './components/SearchFrom.vue'
export default {
  components: {
    // SearchFrom
    propup
  },
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
        padding: '0'
      },
      // table的loading
      loading: false,
      // 按钮的loading
      // loadings: false,
      isShowPropup: false,
      isshowStrategy: false,
      isshowClickStrategy: false,
      // 货道修改框
      isshowCargoChannel: false,

      // 修改的弹框
      isshowModify: false,
      // 被选中的单选框数据
      checkedTableList: [],
      // 点击的那个策略
      clickThisStrategy: {},
      // 点击修改的那一个
      clickeditModify: {}
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
    // 货道
    CargoChannel(row) {
      this.isshowCargoChannel = true
      this.clickeditModify = row
    },
    // 修改索引前边
    formatter(row, colom, cellValue, index) {
      // console.log(index * (this.params.pageIndex - 1) * 10)
      return index + (this.params.pageIndex - 1) * 10 + 1
    },
    // 修改点位低点
    editModify(row) {
      this.isshowModify = true
      this.clickeditModify = row
    },
    // 点击策略查询策略
    async  queryStrategy({ innerCode }) {
      const { data } = await getThisClickStrategyAPI(innerCode)
      this.isshowStrategy = true
      if (data) {
        this.clickThisStrategy = data
        // 策略propup的状态
        this.isshowClickStrategy = true
      } else {
        this.checkedTableList.push(innerCode)
      }
    },
    // 编辑策略
    editStrategy() {
      if (this.checkedTableList.length === 0) {
        return this.$message({
          message: '未选中数据',
          type: 'warning'
        })
      }
      this.isshowStrategy = true
      console.log(this.checkedTableList)
      console.log(111)
    },
    handleSelectionChange(value) {
      if (!value.length) this.checkedTableList = []
      value.forEach(item => {
        this.checkedTableList.push(item.innerCode)
      })
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
        console.log(111)
        this.tableData = data
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

</style>
