<template>
  <div id="from">
    <!-- 新增点位弹窗 -->
    <el-dialog title="新增点位" :visible="isShowAddNode" @close="addNodeClose">
      <el-form ref="addNodeForm" :model="formData" :rules="rules">
        <div class="character">
          <el-form-item label="点位名称:" label-width="130px" prop="name">
            <el-input v-model="formData.name" placeholder="请输入" maxlength="10" show-word-limit />
          </el-form-item>
          <el-form-item label="所在区域:" label-width="130px" prop="regionId">
            <el-select v-model="formData.regionId" placeholder="请选择">
              <el-option v-for="item in addSelect.regionList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈:" label-width="130px" prop="businessId">
            <el-select v-model="formData.businessId" placeholder="请选择">
              <el-option v-for="item in businessList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商:" label-width="130px" prop="ownerName">
            <el-select ref="busiRef" v-model="formData.ownerName" placeholder="请选择">
              <el-option v-for="item in addSelect.partnerList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址:" label-width="130px" prop="areaCode">
            <el-select ref="detRef" v-model="formData.areaCode" placeholder="请选择">
              <el-option v-for="item in addSelect.regionList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注说明:" label-width="130px" prop="addr">
            <el-input v-model="formData.addr" placeholder="请输入" maxlength="40" type="textarea" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="addNodeClose">取 消</el-button>
        <el-button type="primary" class="exactly" @click="addNode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBusinessListAPI, addNodeAPI } from '@/api'
export default {
  props: {
    isShowAddNode: {
      type: Boolean,
      default: false
    },
    addSelect: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        addr: '',
        areaCode: 0,
        createUserId: 0,
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''
      },
      rules: {
        name: [{ required: true, message: '必填' }],
        regionId: [{ required: true, message: '必填' }],
        businessId: [{ required: true, message: '必填' }],
        ownerName: [{ required: true, message: '必填' }],
        areaCode: [{ required: true, message: '必填' }],
        addr: [{ required: true, message: '必填' }]
      },
      businessList: []
    }
  },
  mounted() {
    this.getBusinessList()
    console.log('zhang', this.addSelect)
  },
  methods: {
    addNodeClose() {
      this.$refs.addNodeForm.resetFields()
      this.$emit('update:isShowAddNode', false)
    },
    async getBusinessList() {
      const data = await getBusinessListAPI()
      this.businessList = data.data
      console.log(888, this.businessList)
    },
    async addNode() {
      this.formData.areaCode = this.$refs.detRef.selected.value
      this.formData.ownerId = this.$refs.busiRef.selected.value
      this.formData.ownerName = this.$refs.busiRef.selected.label
      const data = await addNodeAPI(this.formData)
      console.log(111222, data)
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
