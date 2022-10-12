<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">

        <p class="title">日销统计</p>
        <div class="content">
          <span>
            <p class="num">{{ dayNUm }}</p>
            <span>当日销售（元）</span>
          </span>
          <span>
            <p class="num">0</p>
            <span> 当日销售额（元）</span>
          </span>
          <span>
            <p class="num">0</p>
            <span>   当日分成（元）</span>
          </span>

        </div>
      </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light ">
        <p class="title">月销统计</p>
        <div class="content">
          <span>
            <p class="num red">{{ mSales }}</p>
            <span>当月销售（元）</span>
          </span>
          <span>
            <p class="num red">{{ SalesHas }}</p>
            <span> 当月销售额（元）</span>
          </span>
          <span>
            <p class="num red">{{ Dividedinto }}</p>
            <span>   当月分成（元）</span>
          </span>

        </div>
      </div></el-col>
    </el-row>
    <!-- 表单日期· -->
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="合作商">
        <el-select
          v-model="formData.partnerName"
          style="width:80%"
          placeholder="请选择"
          @focus="getPartnersList"
        >
          <el-option
            v-for="item in partnersList.currentPageRecords"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="days"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-mm-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="margin:20px 0"> 笔数统计： <span class="reds">{{ mSales }}个</span> &nbsp;&nbsp;&nbsp;&nbsp;
      收入统计： <span class="reds">{{ SalesHas }}元</span> &nbsp;&nbsp;
      分成统计： <span class="reds">{{ Dividedinto }}元</span></div>

    <!-- 表格2 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="订单日期"
        width="180"
      />
      <el-table-column
        prop="ownerName"
        label="合作商"
        width="180"
      />
      <el-table-column
        prop="address"
        label="分成比例"
      >
        <template slot-scope="{row}">
          {{ row.ratio }}%
        </template></el-table-column>
      <el-table-column
        prop="address"
        label="收入（元）"
      >
        <template slot-scope="{row}">
          + {{ (row.orderTotalMoney/100).toFixed(2) }}
        </template></el-table-column>
      <el-table-column
        prop="orderCount"
        label="笔数"
      />
      <el-table-column
        prop="address"
        label="分成金额（元）"
      >
        <template slot-scope="{row}">
          + {{ row.totalBill/100 }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 销售额 销售额度
import { getSalesAPI, getSalesHasAPI, getDividedintoAPI, getPartnersMoneyListAPI, getdaySalesAPI, getPartnersListAPI } from '@/api/vm'
import dayjs from '@/utils/dayjs'

export default {

  data() {
    return {
      mSales: 0,
      // 销售额
      SalesHas: 0,
      // 分成
      Dividedinto: 0,
      partnersList: [],
      params: {
        start: dayjs(new Date()).format('YYYY-MM') + '-01 00:00:00',
        end: dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      },
      formData: {
        partnerName: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      days: [dayjs(new Date()).format('YYYY-MM') + '-01', dayjs(new Date()).format('YYYY-MM-DD')],

      // 表格
      tableData: [],
      dayNUm: 0
    }
  },
  created() {
    this.getSales()
    this.getSalesHas()
    this.getDividedinto()
    this.getPartnersMoneyList()
    this.getdaySales()
  },
  methods: {
    async getdaySales() {
      const params = {
        start: dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
        end: dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      }
      const { data } = await getdaySalesAPI(params)
      this.dayNUm = data
      console.log(1)
    },

    // 提交
    onSubmit() {
      this.getPartnersMoneyList()
    },
    // 销售个数
    async getSales() {
      const { data } = await getSalesAPI(this.params)
      this.mSales = data
    },
    // 销售额
    async getSalesHas() {
      const { data } = await getSalesHasAPI(this.params)
      this.SalesHas = (data / 10000 / 100).toFixed(2)
    },
    // 销售分成
    async getDividedinto() {
      const { data } = await getDividedintoAPI(this.params)
      this.Dividedinto = data / 100
    },
    // 合作商列表
    async getPartnersList() {
      const params = {
        pageIndex: 1,
        pageSize: 1000
      }
      const { data } = await getPartnersListAPI(params)
      this.partnersList = data
      console.log(this.partnersList)
    },
    // 获取一定日期范围之内的合作商分成汇总数据
    async getPartnersMoneyList() {
      const times = {
        start: this.days[0],
        end: this.days[1]
      }
      const { data } = await getPartnersMoneyListAPI({ ...this.formData, ...times })
      this.tableData = data.currentPageRecords
      // console.log(this.tableData)
    }
  }
}
</script>

<style lang="scss" scoped>
.reds{
  color: red;
  margin:0  40px 0 10px;
  font-size: 20px;
  font-weight: 500;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 20px;
  }
  .bg-purple-dark {
    background:url('~@/assets/common/task.png') right bottom #99a9bf;

  }
  .bg-purple {
    background: #e7f3fe url('~@/assets/common/task.png') right bottom no-repeat;
  }
  .bg-purple-light {
    background: #ffefe3 url('~@/assets/common/task.png') right bottom no-repeat;
  }
  .grid-content {
    padding: 20px;
    border-radius: 20px;

    min-height: 195px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .content{
    display: flex;
    justify-content: space-around;
  }
  .title,p {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  .num {
    margin: 20px 0;
    font-size: 40px;
    color: #0c2078;
    font-weight: 700;
    text-shadow: rgb(85 132 255 / 50%) 2px 4px 7px
  }
  .red {
    color:red
  }
</style>
