<template>
  <div>商品类型</div>
</template>

<script>
export default {

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
