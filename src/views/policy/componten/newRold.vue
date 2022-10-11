<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible " :before-close="hanleClose">
    <el-form ref="updata" :model="form" :rules="rules">
      <el-form-item
        prop="policyName"
        label="设备编号:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger:'blur'
        }]"
      >
        <el-input
          v-model="form.policyName"
          autocomplete="off"
          maxlength="15"
          show-word-limit
          placeholder="请输入"
          style="width: 80%;"
        />
      </el-form-item>
      <el-form-item
        prop="discount"
        label="策略方案:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger: 'blur'
        }]"
      >
        <el-input-number
          v-model="form.discount"
          controls-position="right"
          :min=" null"
          style="width:80%"
          placeholder="请输入"
        />

      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="edit" @click="hanleClose">取 消</el-button>
      <el-button class="add" @click="handleChange">确 定</el-button>
    </div></el-dialog>
</template>

<script>
import { policyAPI, editpolicyAPI } from '@/api/policy'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {

      form: {
        name: '',
        policyId: '',
        policyName: '',
        discount: 0,
        createTime: ''
      },
      formLabelWidth: '120px',
      rules: {
        policyName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.form.policyId ? '修改策略' : '新增策略'
    }
  },
  mounted() { },
  methods: {

    hanleClose() {
      this.$refs.updata.resetFields()
      this.$emit('update:dialog-form-visible', false)
    },
    async handleChange() {
      await this.$refs.updata.validate()
      this.form.policyId ? await editpolicyAPI(this.form) : await policyAPI(this.form)
      this.$message.success(this.form.policyId ? '修改成功' : '新增成功')
      this.$parent.SeacherAPI()
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
