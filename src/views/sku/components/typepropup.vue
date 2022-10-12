<template>
  <div id="from">
    <el-dialog :title="formData.skuId?'修改设备类型':'新增设备类型'" :visible="isShowSkuPropup" @close="cloes">
      <el-form ref="newForm" :model="formData" :rules="rules">
        <div class="character">
          <el-form-item label="商品名称:" label-width="130px" prop="skuName">
            <el-input
              v-model="formData.skuName"
              autocomplete="off"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="品牌:" label-width="130px" prop="brandName">
            <el-input
              v-model="formData.brandName"
              autocomplete="off"
              maxlength="15"
              show-word-limit
              placeholder="请输入（限制数字、字母、中划线、下划线）"
            />
          </el-form-item>
          <el-form-item label="商品价格（元）:" label-width="130px" prop="price">
            <el-input-number
              v-model="formData.price"
              placeholder="请输入"
              controls-position="right"
              show-word-limit

              :min="0"
              :max="10"
            />
          </el-form-item>

          <el-form-item label="商品类型" prop="classId" label-width="130px">
            <el-select v-model="formData.classId" placeholder="请选择">
              <el-option
                v-for="item in goodsList"
                :key="item.classId"
                :label="item.className"
                :value="item.className"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="规格:" label-width="130px" prop="unit">
            <el-input
              v-model="formData.unit"
              autocomplete="off"
              maxlength="15"
              show-word-limit
              placeholder="请输入（限制数字、字母、中划线、下划线）"
            />
          </el-form-item>

          <el-form-item label="商品图片:" label-width="130px" prop="skuImage">
            <el-upload
              class="avatar-uploader"
              action="#"
              :http-request="updates"
              :show-file-list="false"
              :limit="1"
              :on-exceed="delFirstImage"
            >
              <img v-if="formData.skuImage" style="width:80px;height:80px" :src="formData.skuImage" width="87px" height="87px">
              <i v-else class="el-icon-upload2 avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">
                支持扩展名：jpg、png，文件不得大于100kb
              </div>
            </el-upload>
          </el-form-item>
        </div></el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="cloes">取 消</el-button>
        <el-button type="primary" class="exactly" @click="addGoodsListType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadIMGAPI } from '@/api/vm'
import { getGoodsListAPI, addGoodslistTypeAPI, editGoodslistTypeAPI } from '@/api/sku'
// import { addfileUpload, addnewvmType, modifyvmType } from '@/api'
export default {
  props: {
    isShowSkuPropup: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 100000
      },
      formData: {
        skuName: '',
        brandName: '',
        price: undefined,
        unit: undefined,
        classId: undefined,
        skuImage: ''
      },
      rules: {
        skuName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        classId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        skuImage: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      },
      goodsList: [],
      skuId: 0
    }
  },
  created() {
    // console.log(this.row);
    // console.log(this.from);
    this.getGoodsList()
  },
  methods: {
    // 获得商品类型列表
    async getGoodsList() {
      const { data } = await getGoodsListAPI(this.page)
      console.log(11111, data)
      this.goodsList = data.currentPageRecords
    },
    // 确定提交按钮
    async addGoodsListType() {
      try {
        console.log(123123, this.goodsList)
        await this.$refs.newForm.validate()
        await this.goodsList.forEach(item => {
          if (item.className === this.formData.classId) this.formData.classId = item.classId
        })
        this.skuId ? await editGoodslistTypeAPI(this.formData, this.skuId) : await addGoodslistTypeAPI(this.formData)
        this.$parent.deviceList()
        this.cloes()
        this.$message.success(this.formData.skuId ? '修改成功' : '添加成功')
      } catch (error) {
        // console.log(error)
        this.$success.error(error.response?.data)
      }
    },
    // 关闭窗口
    cloes() {
      this.$emit('update:isShowSkuPropup', false)
      this.$refs.newForm.resetFields()
      this.formData = {
        skuName: '',
        brandName: '',
        price: undefined,
        unit: undefined,
        classId: undefined,
        skuImage: ''
      }
      this.skuId = ''
    },
    // 切换图片2
    delFirstImage(file) {
      // console.log(77777, file[0])
      this.formData.skuImage = ''
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
        console.log(999, file)
        const { data } = await uploadIMGAPI(files)
        console.log(data)
        const isImageKB = file.size / 1024 < 100
        isImageKB ? this.formData.skuImage = data : this.$message.error('图片大于100kb')
      } catch (error) {
        console.log(error)
      }
    }
    // 添加机器类型
    // async addGoodsListType() {
    //   try {
    //     // 判断正则规则是否全通过
    //     await this.$refs.newForm.validate()
    //     if (this.formData.typeId) {
    //       // 编辑
    //       await editMachineTypeAPI(this.formData)
    //     } else {
    //       // 新增
    //       await addGoodslistTypeAPI(this.formData)
    //     }
    //     this.$message.success(this.formData.typeId ? '修改成功' : '新增成功')
    //     this.$parent.deviceList()
    //     this.cloes()
    //   } catch (error) {
    //     console.log(error.response)
    //     this.$message.error(error.response?.data)
    //   }
    // }

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
