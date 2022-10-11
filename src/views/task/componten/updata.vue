<template>

  <el-dialog title="新增工单" round :visible.sync="dislogVisible" :before-close="hanleClose" width="40%">
    <el-form ref="updata" :model="form" :rules="rules" size="small">
      <el-form-item
        prop="name"
        label="设备编号:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger:'blur'
        }]"
      >
        <el-input
          v-model="form.name"
          autocomplete="off"
          maxlength="15"
          show-word-limit
          style="width: 90%;"
        />
      </el-form-item>
      <el-form-item
        label="工单类型:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger:'blur'
        }]"
      >
        <el-select
          v-model="form.regions"
          prop="trigger"
          placeholder="请选择"
          style="width: 90%;"
        >
          <el-option label="投放工单" value="投放工单" />
          <el-option label="维修工单" value="维修工单" />
          <el-option label="撤机工单" value="补货工单" />

        </el-select>
      </el-form-item>

      <!--  -->
      <el-form-item
        label="运营人员:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger:'blur'
        }]"
      >
        <el-select
          v-model="form.people"
          prop="trigger"
          placeholder="请选择"
          style="width: 90%;"
        >
          <el-option label="暂无数据" value="暂无数据" />
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item
        prop="desc"
        label="备注:"
        :label-width="formLabelWidth"
        :rules="[{required: true, message:'请输入',trigger:'blur'
        }]"
      >

        <el-input
          v-model="form.desc"
          type="textarea"

          maxlength="40"
          show-word-limit
          style="width: 90%;"
          placeholder="请输入备注(不超过40字)"
        />

        <el-form-item />
      </el-form-item></el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="edit" @click="hanleClose">取 消</el-button>
      <el-button class="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    dislogVisible: {
      type: Boolean,
      required: true
    }

  },
  data() {
    return {

      form: {
        name: '',
        regions: '',
        people: '',
        desc: ''

      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        regions: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    hanleClose() {
      this.$refs.updata.resetFields()
      this.$emit('update:dislog-visible', false)
      this.form = {
        name: '',
        region: ''

      }
    }
  }
}

</script>

<style scoped >
.blue{
  color: #7394ff;
}
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
