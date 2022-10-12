<template>
  <div id="from">
    <el-dialog :title="formData.typeId?'修改设备类型':'新增设备类型'" :visible="isShowPropup" @close="cloes">
      <el-form ref="newForm" :model="formData" :rules="rules">
        <div class="character">
          <el-form-item label="型号名称:" label-width="130px" prop="name">
            <el-input
              v-model="formData.name"
              autocomplete="off"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="型号编码:" label-width="130px" prop="model">
            <el-input
              v-model="formData.model"
              autocomplete="off"
              maxlength="15"
              show-word-limit
              placeholder="请输入（限制数字、字母、中划线、下划线）"
            />
          </el-form-item>
          <el-form-item label="货道行数:" label-width="130px" prop="vmRow">
            <el-input-number
              v-model="formData.vmRow"
              placeholder="请输入"
              controls-position="right"
              show-word-limit

              :min="0"
              :max="10"
            />
          </el-form-item>
          <el-form-item label="货道列数:" label-width="130px" prop="vmCol">
            <el-input-number
              v-model="formData.vmCol"
              controls-position="right"
              show-word-limit

              :min="0"
              :max="10"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="货道容量:" label-width="130px" prop="channelMaxCapacity">
            <el-input-number
              v-model="formData.channelMaxCapacity"
              controls-position="right"
              :min="0"
              :max="10"
              placeholder="请输入"
              show-word-limit
            />
          </el-form-item>
        </div>

        <el-form-item label="设备图片:" label-width="130px" prop="name">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="updates"
            :show-file-list="false"
            :limit="1"
            :on-exceed="delFirstImage"
          >
            <img v-if="formData.image" style="width:80px;height:80px" :src="formData.image" width="87px" height="87px">
            <i v-else class="el-icon-upload2 avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              支持扩展名：jpg、png，文件不得大于100kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="cloes">取 消</el-button>
        <el-button type="primary" class="exactly" @click="addEquipmentType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadIMGAPI, addVendingMachineAPI, editMachineTypeAPI } from '@/api/vm'
// import { addfileUpload, addnewvmType, modifyvmType } from '@/api'
export default {
  props: {
    isShowPropup: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      formData: {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        vmRow: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        vmCol: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        channelMaxCapacity: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '必填', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    // console.log(this.row);
    // console.log(this.from);
  },
  methods: {
    // 确定提交按钮

    // 关闭窗口
    cloes() {
      this.$emit('update:isShowPropup', false)
      this.$refs.newForm.resetFields()
      this.formData = {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      }
    },
    // 切换图片2
    delFirstImage(file) {
      // console.log(77777, file[0])
      this.formData.image = ''
      // 调用上传图片
      this.updates(file[0])
    },
    // 上传图片
    async updates(file) {
      try {
        // this.form.image = ''
      // 找到file跟file.file
        let files = null
        file.file ? files = file.file : files = file
        // console.log(999, file)
        const { data } = await uploadIMGAPI(files)
        // console.log(data)
        const isImageKB = file.size / 1024 < 100
        isImageKB ? this.formData.image = data : this.$message.error('图片大于100kb')
      } catch (error) {
        console.log(error)
        console.log(11)
      }
    },
    // 添加机器类型
    async addEquipmentType() {
      try {
        // 判断正则规则是否全通过
        await this.$refs.newForm.validate()
        if (this.formData.typeId) {
          // 编辑
          await editMachineTypeAPI(this.formData)
        } else {
          // 新增
          await addVendingMachineAPI(this.formData)
        }
        this.$message.success(this.formData.typeId ? '修改成功' : '新增成功')
        this.$parent.deviceList()
        this.cloes()
      } catch (error) {
        console.log(error.response)
        this.$message.error(error.response?.data)
      }
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
    #from /deep/  .el-dialog__close::before {
      color: red;
    }
    #from /deep/ .el-button+.el-button {
      border: 0;
      background-color: #ff6c50;
    }
#from /deep/ .el-dialog__body {
    padding: 10px 20px 0px;
    color: #666;
}

#from /deep/ .el-dialog__title {
    font-size: 16px;
    color: #333;
    font-weight: 700;
}

#from /deep/ .el-dialog {
    width: 630px;
    height: 580px;
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
