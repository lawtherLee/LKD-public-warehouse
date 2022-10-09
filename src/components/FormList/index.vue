<template>
  <div class="main">
    <el-row style="height: 60px">
      <el-button class="left" size="small" @click="create">
        <span class="el-icon-circle-plus-outline" />
        新建
      </el-button>
      <el-button v-show="title" class="right" @click="selfBtn">{{ title }}</el-button>
    </el-row>

    <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="checkouts" :show-overflow-tooltip="true" type="selection" width="55" />
      <el-table-column :index="indexMethod" label="序号" type="index" width="80" />
      <el-table-column v-for="(item,index) in formList" :key="index" :label="item.label" :prop="item.prop" />

      <el-table-column v-if="labelQzl" :label="labelQzl" width="200px">
        <template slot-scope="scope">
          <div class="qzl-row">
            <div :class="scope.row.status[10001] === '在线'?'qzl-true':'qzl-false'">{{ scope.row.status[10001] }}</div>
            <div :class="scope.row.status[10002] === '货道'?'qzl-true':'qzl-false'">{{ scope.row.status[10002] }}</div>
            <div :class="scope.row.status[10003] === '传动轴'?'qzl-true':'qzl-false'">
              {{ scope.row.status[10003] }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            v-show="button1"
            size="medium"
            style="color: #5f84ff"
            type="text"
            @click="buttonOne(scope.row)"
          >{{ button1 }}
          </el-button>
          <el-button
            v-show="button2"
            size="medium"
            style="color: #5f84ff"
            type="text"
            @click="buttonTwo(scope.row)"
          >{{ button2 }}
          </el-button>
          <el-button
            v-show="button3"
            size="medium"
            style="color: #5f84ff"
            type="text"
            @click="buttonThree(scope.row)"
          >{{ button3 }}
          </el-button>
          <el-button
            v-show="del"
            size="medium"
            style="color:#ff5a5a"
            type="text"
            @click="delBtn(scope.row)"
          >{{ del }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页-->
    <paging :page-size="pageSize" :total="total" @changePage="changePage" />
  </div>
</template>

<script>
import Paging from '@/components/Paging'

export default {
  name: 'FormList',
  components: { Paging },
  props: {
    title: {
      type: String,
      default: ''
    },
    button1: {
      type: String,
      default: ''
    },
    button2: {
      type: String,
      default: ''
    },
    button3: {
      type: String,
      default: ''
    },
    del: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    },
    formList: {
      type: Array,
      default: () => []
    },
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 1
    },
    checkouts: {
      type: Boolean,
      default: false
    },
    labelQzl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    buttonOne(val) {
      this.$emit('buttonOne', val)
      console.log(val)
    },
    buttonTwo(val) {
      this.$emit('buttonTwo', val)
      console.log(val)
    },
    buttonThree(val) {
      this.$emit('buttonThree', val)
      console.log(val)
    },
    delBtn(val) {
      this.$emit('delBtn', val)
      console.log(val)
    },
    // 改变第几页
    changePage(val) {
      this.$emit('changePage', val)
    },
    // 序号
    indexMethod(i) {
      // index加1，加上当前页-1乘以每页显条数
      return i + 1 + (this.pageSize - 1) * 10
    },
    // 新增
    create() {
      this.$emit('update:create', true)
    },
    // 右边按钮
    selfBtn() {
      this.$emit('selfBtn')
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  ::v-deep .has-gutter {
    color: #666;

    tr {
      height: 44px;

      th {
        background-color: rgb(243, 246, 251);
        font-weight: 500;
      }
    }
  }

  ::v-deep .el-table td {
    border: none;
    padding: 4px 0;
  }

  .el-table::before {
    height: 0;
  }
}

::v-deep .has-gutter .cell {
  margin-left: 4px;
}
</style>
