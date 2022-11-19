<template>
  <div id="from">
    <!-- 新增合作商弹窗 -->
    <el-dialog title="新增合作商" :visible="isShowPartner" @close="close">
      <el-form ref="newForm" :model="form" :rules="rules">
        <div class="character">
          <el-form-item label="合作商名称:" label-width="130px" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="联系人:" label-width="130px" prop="contact">
            <el-input
              v-model="form.contact"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="联系电话:" label-width="130px" prop="mobile">
            <el-input
              v-model="form.mobile"
              maxlength="11"
              show-word-limit
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="分成比例(%):" label-width="130px" prop="ratio">
            <el-input-number
              v-model="form.ratio"
              placeholder="请输入"
              controls-position="right"
              :min="null"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="账号:" label-width="130px" prop="account">
            <el-input
              v-model="form.account"
              placeholder="请输入"
              maxlength="18"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="密码:" label-width="130px" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="close">取 消</el-button>
        <el-button type="primary" class="exactly" @click="addPartnerList">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改合作商弹窗 -->
    <el-dialog title="修改合作商" :visible="isShowEmitPartner" @close="emitClose">
      <el-form ref="editForm" :model="form" :rules="rules">
        <div class="character">
          <el-form-item label="合作商名称:" label-width="130px" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="联系人:" label-width="130px" prop="contact">
            <el-input
              v-model="form.contact"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="联系电话:" label-width="130px" prop="mobile">
            <el-input
              v-model="form.mobile"
              maxlength="11"
              show-word-limit
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="分成比例(%):" label-width="130px" prop="ratio">
            <el-input-number
              v-model="form.ratio"
              placeholder="请输入"
              controls-position="right"
              :min="null"
              :max="100"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="emitClose">取 消</el-button>
        <el-button type="primary" class="exactly" @click="emitPartner">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 合作商详情 -->
    <div />
    <el-dialog title="合作商详情" :visible="isShowDetailPartner" @close="detailClose">
      <el-form ref="detailForm" :model="form">
        <div class="character">
          <el-form-item label="合作商名称:" label-width="130px">{{ form.name }}</el-form-item>
          <el-form-item label="联系人:" label-width="130px">{{ form.contact }}</el-form-item>
          <el-form-item label="联系电话:" label-width="130px">{{ form.mobile }}</el-form-item>
          <el-form-item label="分成比例:" label-width="130px">{{ form.ratio }}%</el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addPartnerListAPI, emitPartnerAPI } from '@/api'
export default {
  props: {
    isShowPartner: {
      type: Boolean,
      default: false
    },
    isShowEmitPartner: {
      type: Boolean,
      default: false
    },
    isShowDetailPartner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        contact: '',
        mobile: '',
        ratio: 0,
        account: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '名称必填' }],
        contact: [{ required: true, message: '联系人必填' }],
        mobile: [{ required: true, message: '联系电话必填' }],
        ratio: [{ required: true, message: '分成比例必填' }],
        account: [{ required: true, message: '账号必填' }],
        password: [{ required: true, message: '密码必填' }]
      }
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$refs.newForm.resetFields()
      this.$emit('update:isShowPartner', false)
    },
    emitClose() {
      this.$refs.editForm.resetFields()
      this.$emit('update:isShowEmitPartner', false)
    },
    detailClose() {
      this.$refs.detailForm.resetFields()
      this.$emit('update:isShowDetailPartner', false)
    },
    async addPartnerList() {
      try {
        // 校验表单规则
        await this.$refs.newForm.validate()
        // 调用新增接口，给新增的接口传数据
        await addPartnerListAPI(this.form)
        // 新增成功提示
        this.$message.success('新增成功')
        // 重新渲染界面，调用渲染列表
        this.$parent.getPartnerList()
        // 关闭弹窗
        this.close()
      } catch (error) {
        console.log(error)
      }
    },
    async emitPartner() {
      try {
        // 校验表单规则
        await this.$refs.editForm.validate()
        await emitPartnerAPI(this.form)
        this.$message.success('修改成功')
        this.$parent.getPartnerList()
        this.emitClose()
      } catch (error) {
        console.log(error)
      }
    }
  }}
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
