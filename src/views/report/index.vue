<template>
  <div>对账统计</div>
</template>

<script>
export default {

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
