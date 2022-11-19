<template>
  <div>
    <input-search-two :label-first="labelFirst" :on-submit="onSubmit" />
    <form-list
      :create.sync="formDialog"
      :form-list="formList"
      :page-size="pageSize"
      :table-data="tableData"
      :total="total"
      button1="修改"
      del="删除"
      @buttonOne="buttonOne"
      @changePage="changePage"
      @delBtn="delBtn"
    />

    <el-dialog
      :before-close="handleClose"
      :title="`${addRoleForm.id ? '编辑' : '新增'}人员`"
      :visible.sync="formDialog"
    >
      <el-form ref="rolesForm" :model="addRoleForm" :rules="rules" label-width="120px">
        <el-form-item label="人员名称" prop="userName">
          <el-input
            v-model="addRoleForm.userName"
            maxlength="5"
            placeholder="请输入"
            show-word-limit
            style="width: 80%"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="addRoleForm.roleId" placeholder="请选择" style="width: 80%">
            <el-option v-for="item in rolesName" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="addRoleForm.mobile" placeholder="请输入" style="width: 80%" />
        </el-form-item>
        <el-form-item label="负责区域" prop="regionName">
          <el-select v-model="addRoleForm.regionName" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
              @click.native="addRoleForm.regionId=item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="头像" prop="image">
          <input v-model="addRoleForm.image" style="display: none" type="text">
          <el-upload
            :class="`${fileList.length === 1 ? 'hideCard' : ''}`"
            :file-list="fileList"
            :http-request="upload"
            :limit="limit"
            :on-change="onChange"
            :on-remove="onRemove"
            action="#"
            list-type="picture-card"
          >
            <i v-if="addRoleForm.image === ''" class="el-icon-upload" />
            <img v-else :src="addRoleForm.image" alt="" style="width: 100%">
          </el-upload>
          <span style="color: #ccc">支持扩展名:jpg、png，文件不得大于100kb</span>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="handleClose">取消</el-button>
          <el-button type="warning" @click="addRoles">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InputSearchTwo from '@/components/InputSearchTwo'
import FormList from '@/components/FormList'
import { addUserAPI, deleteUserAPI, editUserAPI, getAreasAPI, getRoleAPI, PersonnelListAPI, upDatePhotoAPI } from '@/api'

export default {
  name: 'UserList',
  components: { InputSearchTwo, FormList },
  data() {
    return {
      labelFirst: '人员搜索',
      formList: [
        {
          label: '人员名称',
          prop: 'userName'
        },
        {
          label: '区域归属',
          prop: 'regionName'
        },
        {
          label: '角色',
          prop: 'role.roleName'
        },
        {
          label: '联系电话',
          prop: 'mobile'
        }
      ],
      tableData: [],
      total: 0,
      pageSize: 1,
      rolesName: [],
      areaPageIndex: 1,
      areaPagesize: 10000,
      areaList: [],
      limit: 1,
      userName: '',
      id: '',
      formDialog: false,
      addRoleForm: {
        userName: '',
        roleId: '',
        mobile: '',
        regionName: '',
        image: '',
        status: '',
        regionId: ''
      },
      rules: {
        name: [{
          required: true, message: '请输入', trigger: 'blur'
        }],
        rules: [{
          required: true, message: '选择', trigger: 'blur'
        }],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, trigger: 'blur' }
        ],
        areas: [{
          required: true, trigger: 'blur'
        }],
        photo: [{
          required: true, message: '请上传', trigger: 'blur'
        }]
      },
      fileList: []
    }
  },
  created() {
    this.PersonnelList()
    this.getAreas()
    this.getRole()
  },
  methods: {
    async PersonnelList() {
      const { data } = await PersonnelListAPI({ pageIndex: this.pageSize, userName: this.userName })
      this.tableData = data.currentPageRecords
      this.total = data.totalCount
      this.pageSize = +data.pageIndex
      this.id = data.currentPageRecords.id
    },
    async onSubmit(val) {
      this.userName = val.left
      await this.PersonnelList()
    },
    // 下一页
    changePage(val) {
      this.pageSize = val
      this.PersonnelList()
    },
    // 删除人员
    async delBtn(val) {
      try {
        await this.$confirm('确认删除？', '提示', { type: 'warning' })
        this.id = val
        await deleteUserAPI(this.id.id)
        await this.PersonnelList()
        this.$message.success('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    // 修改人员信息
    buttonOne(val) {
      this.formDialog = true
      this.addRoleForm = { ...val }
    },
    // 关闭弹窗
    handleClose() {
      this.formDialog = false
      this.addRoleForm = {
        userName: '',
        roleId: '',
        mobile: '',
        regionName: '',
        image: '',
        status: '',
        regionId: ''
      }
      this.fileList = []
    },
    // 上传图片
    async upload(data) {
      try {
        this.addRoleForm.image = await upDatePhotoAPI(data.file)
        return true
      } catch (e) {
        return false
      }
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 新建
    async addRoles() {
      try {
        await this.$refs.rolesForm.validate()
        this.addRoleForm.id ? await editUserAPI(this.addRoleForm) : await addUserAPI(this.addRoleForm)
        await this.PersonnelList()
        this.$message.success(`${this.addRoleForm.id ? '修改' : '添加'}成功`)
        this.handleClose()
      } catch (e) {
        console.log(e)
      }
    },
    // 获取下拉框角色
    async getRole() {
      const { data } = await getRoleAPI()
      this.rolesName = data
    },
    // 获取区域列表
    async getAreas() {
      const res = await getAreasAPI({
        pageSize: this.areaPagesize,
        pageIndex: this.areaPageIndex
      })
      this.areaList = res.data.currentPageRecords
    }
  }

}
</script>
<!--        :header-row-style="{background:'#eef1f6',color:'#606266',borderRadius:'4px'}"-->
<style lang="scss">
.el-dialog {
  width: 630px;
  border-radius: 10px
}

.hideCard {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
