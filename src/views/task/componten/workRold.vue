<template>
  <el-dialog title="工单配置" :visible.sync="dialogFormVisible " :before-close="hanleClose">
    <el-form :model="form" :rules="rules">
      <el-form-item
        prop="name"
        label="补货警戒线："
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger: 'blur'
        }]"
      >
        <el-input-number v-model="num" controls-position="right" :min="1" style="width:80%" @change="handleChange">{{ num }}</el-input-number>

      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="edit" @click="hanleClose">取 消</el-button>
      <el-button class="add" @click="handleChange">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { supplyAPI } from '@/api/supply'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      num: '',
      form: {
        name: ''

      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() { this.supplyAPI() },
  methods: {
    async supplyAPI() {
      const { data } = await supplyAPI()
      console.log(data)
      this.num = data
    },
    hanleClose() {
      this.$emit('update:dialog-form-visible', false)
    },
    async handleChange() {
      await supplyAPI()
      this.hanleClose()
    }
  }
}
</script>

<style scoped>
.edit{
  color: #000;
  background-color: #fbf4f0;
  width: 80px;
  height: 36px;
  line-height: 13px;
}
.add{
  color: #fff;
  background-color: #ff6e2a;
   width: 80px;
  height: 36px;
  line-height: 13px;
}
</style>
