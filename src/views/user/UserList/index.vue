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
  </div>
</template>

<script>
import InputSearchTwo from '@/components/InputSearchTwo'
import FormList from '@/components/FormList'
import { PersonnelListAPI } from '@/api'

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
      formDialog: false
    }
  },
  created() {
    this.PersonnelList()
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
    delBtn() {

    },
    // 修改人员信息
    buttonOne() {
    }
  }

}
</script>
<!--<style lang="scss">
.app-main {
  width: 89.5% !important;
  min-height: calc(100vh - 20px) !important;
  padding-top: 60px !important;
  margin-right: 0;
  margin-left: 182px !important;
  background-color: #f4f6fa;

  .main {
    padding: 20px;

    .search {
      margin-bottom: 20px;
      padding: 14px;
      width: 100%;
      height: 64px;
      background-color: #fff;
      border-radius: 6px;

      .search_the_title {
        font-size: 14px;
        color: #666666;
      }

      .el-input__inner {
        height: 36px;
      }

      .search_button {
        border-radius: 4px;
        width: 80px;
        height: 36px;
        line-height: 12px;
        background-color: #6783f7;

        el-button {
          height: 100%;
        }

        .el-button&#45;&#45;primary {
          border: 0;
        }
      }
    }

    .list {
      padding: 20px 15px 19px 17px;
      width: 100%;
      background-color: #fff;
      border-radius: 6px;
      //新增按钮
      .the_new_button {
        width: 80px;
        height: 36px;
        border: 0;
        color: white;
        background: linear-gradient(135deg, #ff9743, #ff5e20);
        padding: 0;
        margin-bottom: 20px;

        .el-icon-circle-plus-outline {
          font-size: 18px;
          vertical-align: -8%;
        }
      }

      .el-table {
        .el-table__header-wrapper {
          border-radius: 6px !important;
        }

        thead {
          color: #fff;
          font-weight: 500;
          background: linear-gradient(to right, #6fa3fe, #4cdafe) !important;

          & th {
            background-color: inherit !important;
          }

          & tr {
            background-color: inherit !important;
          }
        }
      }
    }
  }
}
</style>-->
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
