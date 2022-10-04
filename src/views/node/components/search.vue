<template>
  <div class="search">
    <el-form :inline="true">
      <el-form-item class="text" :label="title">
        <el-input v-model="input" class="ipt" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: ''
    }
  }

}
</script>

<style scoped lang="scss">
.search{
  width: 1540px;
  height: 64px;
  margin: 20px;
  padding: 14px 20px;
  background-color: #fff;
}

.ipt{
    width: 206px;
    height: 36px;
  }

</style>
