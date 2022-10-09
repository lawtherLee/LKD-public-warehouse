<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <!--显示输入框-->
      <el-form-item v-show="labelFirst" :label="labelFirst">
        <slot name="first">
          <el-input v-model="formInline.left" clearable palceholder="请输入" style="width: 210px" />
        </slot>
      </el-form-item>
      <!--/显示输入框-->

      <!--      显示下拉菜单-->
      <el-form-item v-show="labelSecond" :label="labelSecond">
        <slot name="second">
          <el-select v-model="formInline.right" clearable placeholder="请选择" style="width: 210px">
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </slot>
      </el-form-item>
      <!--      /显示下拉菜单-->

      <!--      按钮部分-->
      <el-form-item>
        <el-button size="small" @click="onSubmit">
          <span class="el-icon-search" style="font-size: 16px" />
          查询
        </el-button>
      </el-form-item>
      <!--      /按钮部分-->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'InputSearchTwo',
  props: {
    labelFirst: {
      type: String,
      default: ''
    },
    labelSecond: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formInline: {
        left: '',
        right: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  padding-top: 25px;
}

.el-button {
  background: #5f84ff;
  color: #fff;
}

::v-deep .el-form-item__label {
  font-weight: normal;
}
</style>
