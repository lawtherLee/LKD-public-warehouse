<template>
  <div id="from">
    <!-- 新增区域弹窗 -->
    <el-dialog title="新增区域" :visible="isShowAddRegion" @close="addRegionClose">
      <el-form ref="addRegionForm" :model="formData" :rules="rules">
        <div class="character">
          <el-form-item label="区域名称:" label-width="130px" prop="regionName">
            <el-input v-model="formData.regionName" placeholder="请输入" maxlength="15" show-word-limit />
          </el-form-item>
          <el-form-item label="备注说明:" label-width="130px" prop="remark">
            <el-input v-model="formData.remark" placeholder="请输入" maxlength="40" type="textarea" show-word-limit />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="addRegionClose">取 消</el-button>
        <el-button type="primary" class="exactly" @click="addRegion">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRegionAPI } from '@/api'
export default {
  props: {
    isShowAddRegion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        regionName: '',
        remark: ''
      },
      rules: {
        regionName: [{ required: true, message: '必填' }],
        remark: [{ required: true, message: '必填' }]
      }

    }
  },
  mounted() {
  },
  methods: {
    addRegionClose() {
      this.$emit('update:isShowAddRegion', false)
      // 重置
      this.$refs.addRegionForm.resetFields()
    },
    async addRegion() {
      // 验证规则
      await this.$refs.addRegionForm.validate()
      await addRegionAPI(this.formData)
      // 成功提示信息
      this.$message.success('添加成功')
      this.$parent.getRegionList()
      // 关闭弹窗
      this.addRegionClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: center;
}
</style>

<style  scoped>

#from /deep/ .el-dialog__body {
    padding: 10px 20px 0px;
    color: #666;
}
#from /deep/ .el-dialog__header{
  background-color: #fff;
 }
 #from /deep/ .el-dialog__title{
  color: #000;
  }
 #from /deep/ .el-dialog{
  border-radius: 20px;
  }
  #from /deep/ .el-dialog__header{
 border-radius: 20px;
  }
 #from /deep/ .el-dialog__close::before {
 color: red;
}
#from /deep/ .el-button+.el-button {
  border: 0;
   background-color: #ff6c50;
  }
/* #from /deep/ .el-dialog__header {
    background-color: #fff;
    overflow: hidden;
} */
#from /deep/ .el-dialog__title {
    font-size: 16px;
    color: #333;
    font-weight: 700;
}

#from /deep/ .el-dialog {
    width: 630px;
    /* height: 580px; */
    border-radius: 20px;
}

#from /deep/ .el-input__inner {
    width: 396px;
    height: 36px;
}

#from /deep/ .el-input {
    width: 396px;
}

#from /deep/ .el-input-number {
    width: 396px;
    line-height: 36px;
}

#from /deep/ .el-input-number__increase {
    line-height: 16px
}

#from /deep/ .el-form-item__label {
    font-size: 14px;
    font-weight: 400;
    color: #606266;
}

#from /deep/.el-input-group__append {
    height: 39px;
}

#from /deep/.el-form-item__content {
    width: 396px;
}

#from /deep/.el-upload__tip {
    height: 20px;
}

.character /deep/ .el-form-item {
    margin-bottom: 20px;
    text-align: center;
}

.inputs /deep/ .el-input-group__append {
    padding: 0;
}

.el-upload__tip {
    font-size: 14px;
    color: #bac0cd;
}

.dialog-footer /deep/ .el-button--default {
    width: 80px;
    height: 36px;
    padding-top: 12px;
    background-color: #fbf4f0;
    margin-right: 30px;
    border: 0px;
}

.dialog-footer /deep/ .el-button--primary {
    width: 80px;
    height: 36px;
    padding-top: 12px;
    background-image: linear-gradient(to left, #ff6a27, #ff903f);
    margin-right: 30px;
    border: 0px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #bac0cd;
    width: 84px;
    height: 84px;
    line-height: 84px;
    border: 1px dashed #bac0cd;
    border-radius: 5px;
    background-color: #f3f6fb;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
