<template>
  <el-dialog title="策略详情" :visible.sync="dislogVisible" :before-close="hanleClose">

    <span>策略名称:   {{ policyName1 }}</span>

    <div>策略方案：</div>

    <el-table
      :data="value"
      style="width: 100%"
    >

      <el-table-column
        type="index"
        label="序号"
        width="180"
      />
      <el-table-column
        prop="nodeName"
        label="点位名称"
        width="180"
      />
      <el-table-column
        prop="innerCode"
        label="设备编号"
      />
    </el-table>
  </el-dialog>
</template>

<script>
// import { vmListAPI } from '@/api/policy'
export default {
  name: 'LookRold',
  props: {
    dislogVisible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      required: true
    },
    policyName1: {
      type: String,

      default: ''
    }
  },

  data() {
    return {

      formLabelWidth: '120px'

    }
  },
  mounted() {
    // console.log(123, this.value)
  },
  methods: {
    hanleClose() {
      this.$emit('update:dislogVisible', false)
    }

  }
}
</script>

<style>

</style>
