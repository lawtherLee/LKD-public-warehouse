<template>
  <div id="app">
    <div v-if="isShowPropup">
      <el-dialog title="收货地址" width="40%" style="border-redios: 20px" :visible="isShowPropup" @close="closePropup">
        <el-form ref="formData" :model="form" :rules="rules">
          <el-form-item label="设备编号" :label-width="formLabelWidth">
            <span>系统自动生成</span>
          </el-form-item>
          <el-form-item label="选择型号" :label-width="formLabelWidth" prop="name">
            <el-select v-model="form.name" placeholder="请选择活动区域">
              <el-option
                v-for="item in vmTypeLists"
                :key="item.typeId"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择点位" :label-width="formLabelWidth" prop="region">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option
                v-for="item in vmNodeLists"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closePropup">取 消</el-button>
          <el-button type="primary" @click="adddeviceList">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 策略的弹出框 -->
    <div>
      <div v-if="isshowClickStrategy">
        <el-dialog title="策略管理" :visible="isshowStrategy" @close="closePropup">
          <el-form :model="form">
            <el-form-item label="机器编号" :label-width="formLabelWidth">
              <span>{{ clickThisStrategy.innerCode }}</span>
            </el-form-item>
            <el-form-item label="策略名称" :label-width="formLabelWidth">
              <span>{{ clickThisStrategy.policyName }}</span>
            </el-form-item>
            <el-form-item label="策略方案" :label-width="formLabelWidth">
              <span>{{ clickThisStrategy.discount }} %</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="delStrategy">取消策略</el-button>
          </div>
        </el-dialog>
      </div>
      <div v-else>
        <el-dialog title="批量策略管理" :visible="isshowStrategy" @close="closePropup">
          <el-form :model="form">
            <el-form-item label="选择策略" :label-width="formLabelWidth">
              <el-select v-model="editStrategyValue" placeholder="请选择">
                <el-option
                  v-for="item in editStrategyList"
                  :key="item.id"
                  :label="item.policyName"
                  :value="item.policyName"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closePropup">取 消</el-button>
            <el-button type="primary" @click="changeStrategy">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- 修改的弹框 -->
    <div v-if="isshowModify">
      <el-dialog title="批量策略管理" :visible="isshowModify" @close="closePropup">
        <el-form :model="form">
          <el-form-item label="机器编号:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.innerCode }} </span>
          </el-form-item>
          <el-form-item label="供货时间:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.createTime }} </span>
          </el-form-item>
          <el-form-item label="设备类型:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.type.name }} </span>
          </el-form-item>
          <el-form-item label="设备容量:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.type.channelMaxCapacity }} </span>
          </el-form-item>
          <el-form-item label="选择策略:" :label-width="formLabelWidth">
            <el-select v-model="editStrategyValue" :placeholder="clickeditModify.node.name">
              <el-option
                v-for="item in vmNodeLists"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>       </el-form-item>
          <el-form-item label="合作上:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.ownerName }} </span>
          </el-form-item>
          <el-form-item label="所属地区:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.region.name }} </span>
          </el-form-item>
          <el-form-item label="设备地址:" :label-width="formLabelWidth">
            <span>{{ clickeditModify.ownerName }} </span>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closePropup">取 消</el-button>
          <el-button type="primary" @click="editModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改的弹框 -->
    <div v-if="isshowCargoChannel" style="height:550px">
      <el-dialog title="批量策略管理" :visible="isshowCargoChannel" @close="closePropup">
        <div class="CargoChanne-Box">  <div v-for="item in CargoChannellist" :key="item.id" class="channBox">
          <div class="photo">
            <img src="" alt="">
            <p />
          </div>
          <span />
        </div></div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 点位跟机器列表
import {
  vmTypeListApi, vmNodeListApi,
  adddeviceListAPI, editStrategyAPI,
  changeStrategyAPI, DelThisClickStrategyAPI,
  editClickModifyAPI, getchannelAPI
} from '@/api/vm'
export default {
  props: {
    isshowCargoChannel: {
      type: Boolean,
      required: false
    },
    // 添加弹窗
    isShowPropup: {
      type: Boolean,
      default: false
    },
    isshowStrategy: {
      type: Boolean,
      default: false
    },
    checkedTableList: {
      type: Array,
      required: true
    },
    // 当钱策略弹窗的状态
    isshowClickStrategy: {
      type: Boolean,
      default: false
    },
    // 点击当前的策略数据
    clickThisStrategy: {
      type: Object,
      required: true
    },
    // 修改的弹窗状态
    isshowModify: {
      type: Boolean,
      default: false
    },
    // 修改修改的数据
    clickeditModify: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: ''
      },
      // 编辑策略的值
      editStrategyValue: '',
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '输入内容不能为空', trigger: 'submit' }],
        region: [{ required: true, message: '输入内容不能为空', trigger: 'submit' }]
      },
      params: {
        pageIndex: 1,
        pageSize: 100000
      },
      vmTypeLists: [],
      vmNodeLists: [],
      CargoChannellist: [],
      data: {
        vmType: 1,
        nodeId: 1,
        createUserId: 1
      },
      editStrategyList: [],
      // 策略id
      policyId: 1

    }
  },
  created() {
    this.vmTypeList()
    this.vmNodeList()
    this.editStrategy()
    this.getchannel()
  },
  methods: {
    async getchannel() {
      const { data } = await getchannelAPI(this.clickeditModify)
      console.log(data)
      this.CargoChannellist = data
    },
    // 编辑这个点位
    async editModify() {
      try {
        if (!this.editStrategyValue) this.editStrategyValue = this.clickeditModify.node.name
        let nodeId
        this.vmNodeLists.forEach(item => {
          if (item.name === this.editStrategyValue) nodeId = item.id
        })
        const params = {
          id: this.clickeditModify.id,
          nodeId
        }
        await editClickModifyAPI(params)
        // 重置并渲染列表
        this.$message.success('修改点位成功')
        this.$parent.deviceList()
        this.closePropup()
        console.log(11)
      } catch (error) {
        this.$message.error(error.response.data)
      }
    },
    // 删除策略
    async delStrategy() {
      console.log(9000, this.clickThisStrategy)
      const params = {
        innerCode: this.clickThisStrategy.innerCode,
        policyId: this.clickThisStrategy.policyId
      }
      await DelThisClickStrategyAPI(params)
      this.closePropup()
    },
    // 点击确定改变策略
    async changeStrategy() {
      // console.log(1100, this.editStrategyList)
      if (!this.editStrategyValue) return this.$message('输入不能为空')
      // 拿到策略值对应的id
      let policyId
      this.editStrategyList.forEach(item => {
        if (item.policyName === this.editStrategyValue) policyId = item.policyId
      })
      const data = {
        innerCodeList: this.checkedTableList,
        policyId
      }
      // console.log(this.policyId)
      await changeStrategyAPI(data)
      this.$message.success('更改策略成功')
      this.closePropup()
      this.$parent.deviceList()
    },
    // 关闭弹窗
    closePropup() {
      this.form = {
        name: '',
        region: ''
      }
      this.editStrategyValue = ''
      // this.$parent.$refs.multipleTable['select-on-indeterminate'] = false
      this.$parent.checkedTableList = []
      this.$emit('update:isShowPropup', false)
      this.$emit('update:isshowStrategy', false)
      this.$emit('update:isshowClickStrategy', false)
      this.$emit('update:isshowModify', false)
      this.$emit('update:isshowCargoChannel', false)
    },
    // 机器·列表
    async vmTypeList() {
      const { data } = await vmTypeListApi(this.params)
      this.vmTypeLists = data.currentPageRecords
    },
    // 点位列表
    async vmNodeList() {
      const { data } = await vmNodeListApi(this.params)
      this.vmNodeLists = data.currentPageRecords
    },
    // 获得策略所有策略
    async editStrategy() {
      const { data } = await editStrategyAPI()
      this.editStrategyList = data
    },
    // 点击确定添加首页列表
    async adddeviceList() {
      if (this.form.name === '' || this.form.region === '') return this.$message('输入内容不能为空')
      try {
        await adddeviceListAPI(this.data)
        this.closePropup()
        this.$parent.deviceList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.channBox{
  height:180px;
  width: 20%;
  padding: 0 5px;
  background-color: red;
  float: left;
}
.CargoChanne-Box{
    height: calc(550px - 54px - 75px);
    overflow: auto;
    // display:flex
    // overflow: hidden;
  }
</style>

<style  scoped>
  #app /deep/ .el-dialog__header{
    background-color: #fff;
  }

  #app /deep/ .el-dialog__title{
      color: #000;
    }

  #app /deep/ .el-dialog{
      border-radius: 20px;
    }
    #app /deep/ .el-dialog__header{
      border-radius: 20px;
    }
    #app /deep/  .el-dialog__close::before {
      color: red;
    }
    #app  :deep(.el-button+.el-button) {
      border: 0;
      background-color: #ff6c50;
    }
  </style>
