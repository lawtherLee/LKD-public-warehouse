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
        <!--        占位-->
        <el-col :span="16" />
      </el-row>
    </div>

    <!--  /搜索区域-->

    <!--  列表区域-->
    <div class="list" />
    <!--  /列表区域-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss">
.app-main {
  width: 88% !important;
  min-height: calc(100vh - 20px) !important;
  padding-top: 60px !important;
  margin-right: 0;
  background-color: #f4f6fa;

  .main {
    padding: 20px;

    .search {
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
  }
}

</style>
