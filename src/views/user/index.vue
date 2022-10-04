<template>
  <div class="main">
    <!--  搜索区域-->
    <div class="search">
      <el-row align="middle" justify="start" type="flex">
        <el-col :span="8">
          <el-row align="middle" gutter="16" type="flex">
            <el-col :span="4"><span class="search_the_title">人员搜索:</span></el-col>
            <el-col :span="12" class="search_box">
              <el-input v-model="input" placeholder="请输入内容" />
            </el-col>
            <el-col :span="1" class="search_button" style="padding: 0">
              <el-button class="search_button" icon="el-icon-search" type="primary"><i class="iconfont" />查询
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--  /搜索区域-->

    <!--  列表区域-->
    <div class="list">
      <!--      新增按钮-->
      <el-row align="middle" type="flex">
        <el-col>
          <el-button class="the_new_button" icon="el-icon-circle-plus-outline">
            新建
          </el-button>
        </el-col>
      </el-row>
      <!--      /新增按钮-->
      <!--表格-->
      <el-table
        :data="tableData"
        class="t-header"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          prop="date"
          type="index"
          width="80"
        />
        <el-table-column
          label="人员名称"
          prop="name"
          width="180"
        />
        <el-table-column
          label="归属区域"
          prop="address"
        />
        <el-table-column
          label="角色"
          prop="address"
        />
        <el-table-column
          label="联系电话"
          prop="address"
        />
        <el-table-column
          label="操作"
          prop="address"
        />
      </el-table>
      <!--/表格-->
    </div>
    <!--  /列表区域-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="scss">
.app-main {
  width: 89.5% !important;
  min-height: calc(100vh - 20px) !important;
  padding-top: 60px !important;
  margin-right: 0;
  margin-left: 182px !important;
  background-color: #f4f6fa;

  .main {
    padding: 20px;

    .search {
      margin-bottom: 20px;
      padding: 14px;
      width: 100%;
      height: 64px;
      background-color: #fff;
      border-radius: 6px;

      .search_the_title {
        font-size: 14px;
        color: #666666;
      }

      .el-input__inner {
        height: 36px;
      }

      .search_button {
        border-radius: 4px;
        width: 80px;
        height: 36px;
        line-height: 12px;
        background-color: #6783f7;

        el-button {
          height: 100%;
        }

        .el-button--primary {
          border: 0;
        }
      }
    }

    .list {
      padding: 20px 15px 19px 17px;
      width: 100%;
      background-color: #fff;
      border-radius: 6px;
      //新增按钮
      .the_new_button {
        width: 80px;
        height: 36px;
        border: 0;
        color: white;
        background: linear-gradient(135deg, #ff9743, #ff5e20);
        padding: 0;
        margin-bottom: 20px;

        .el-icon-circle-plus-outline {
          font-size: 18px;
          vertical-align: -8%;
        }
      }

      .el-table {
        .el-table__header-wrapper {
          border-radius: 6px !important;
        }

        thead {
          color: #fff;
          font-weight: 500;
          background: linear-gradient(to right, #6fa3fe, #4cdafe) !important;

          & th {
            //inherit：规定应该从父元素继承 background-color 属性的设置。
            //transparent：默认。背景颜色为透明。
            background-color: inherit !important;
          }

          & tr {
            background-color: inherit !important;

          }
        }
      }

    }
  }
}

</style>
<!--        :header-row-style="{background:'#eef1f6',color:'#606266',borderRadius:'4px'}"-->
