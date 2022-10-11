<template>
  <div>
    <div class="userTask-container">
      <div class="userTask-text">
        <el-row>
          <el-col :span="18">
            <!-- 工单统计部分区域 -->
            <el-col :span="13" class="col">
              <div class="user-gongdan">
                <div class="user-gongdan-main">
                  <div class="header">
                    <p>运营员人员(当天)</p>
                    <span />
                  </div>
                  <div class="body">
                    <div class="item">
                      {{ reportInfoList.total }}
                      <span>工单总数(个)</span>
                    </div>
                    <div class="item">
                      {{ reportInfoList.completedTotal }}
                      <span>完成工单(个)</span>
                    </div>
                    <div class="item">
                      {{ reportInfoList.cancelTotal }}

                      <span>拒绝工单(个)</span>
                    </div>
                    <div class="item">
                      {{ reportInfoList.workerCount }}

                      <span>运营人员数(个)</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <!-- 销售统计部分 -->
            <el-col :span="11" class="col">
              <div class="user-gongdan right">
                <div class="user-gongdan-main">
                  <div class="header">
                    <p>运维人员(当天)</p>
                    <span />
                  </div>
                  <div class="body">
                    <div class="item right-item" style="margin-right:80px">
                      {{ reportInfoLists.total }}
                      <span>工单总数(个)</span>
                    </div>
                    <div class="item right-item" style="margin-right:80px">
                      {{ reportInfoLists.completedTotal }}

                      <span>完成工单(个)</span>
                    </div>
                    <div class="item right-item" style="margin-right:80px">
                      {{ reportInfoLists.cancelTotal }}

                      <span>拒绝工单(个)</span>
                    </div>
                    <div class="item right-item" style="margin-right:80px">
                      {{ reportInfoLists.workerCount }}

                      <span>运营人员数(个)</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col style="width:80%">
          <div class="user-task-status">
            <div class="header">
              <div class="title">工单状态</div>
              <div class="block">
                <span class="demonstration" />
                <el-date-picker
                  v-model="time"
                  end-placeholder="结束日期"
                  range-separator="~"
                  start-placeholder="开始日期"
                  type="daterange"
                />
                <el-radio-group v-model="tabPosition" class="btnGroup">
                  <el-radio-button ref="week" label="week" @click.native="weekBtn">周</el-radio-button>
                  <el-radio-button ref="moonth" label="moonth" @click.native="moonthBtn">月</el-radio-button>
                  <el-radio-button ref="year" label="yaer" @click.native="yearBtn">年</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div v-if="!statusList.length" class="empty">
              <img alt="" src="@/assets/common/empty.png">
              <div class="tips">暂无数据</div>
            </div>
            <div v-else>有数据了！</div>
          </div>
        </el-col>
        <el-col style="width:20%">
          <div class="user-task-rank">
            <div class="title">
              <span style="margin-right:20px">人效排名(月度)</span>
              <el-select v-model="value" placeholder="全部" style="width:100px">
                <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
            <el-radio-group v-model="tabPositions" class="btnGroups">
              <el-radio-button ref="operating" label="operating" @click.native="operatingUser">运营人员
              </el-radio-button>
              <el-radio-button ref="operations" label="operations" @click.native="operationsUser">运维人员
              </el-radio-button>
            </el-radio-group>
            <div v-if="!statusList.length" class="empty">
              <img alt="" src="@/assets/common/empty.png">
              <div class="tips">暂无数据</div>
            </div>
            <div v-else>有数据了！</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      reportInfoList: [],
      reportInfoLists: [],
      start: this.dayjs(new Date()).startOf('date').format('YYYY-MM-DD HH:mm:ss'),
      end: this.dayjs(new Date()).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      collectStart1: this.dayjs().startOf('week').format('YYYY-MM-DD'),
      collectStart: this.dayjs().startOf('month').format('YYYY-MM-DD'),
      collectStart2: this.dayjs().startOf('year').format('YYYY-MM-DD'),
      collectEnd: this.dayjs(new Date()).format('YYYY-MM-DD'),
      time: [],
      tabPosition: 'week',
      statusList: [],
      areaList: [],
      pageIndex: 1,
      pageSize: 100000,
      value: '',
      tabPositions: 'operating',
      isRepair: '',
      regionId: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.userTask {
  // &-container {
  //   margin: 30px;
  // }
  &-text {
    font-size: 30px;
    line-height: 50px;
  }
}

.col {
  padding: 0 10px 0 10px;
}

.el-col-18 {
  width: 100%;
}

.user-gongdan {
  background: #e9f3ff;
  background-image: url('~@/assets/common/circle.png'), url('~@/assets/common/car.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
  border-radius: 20px;
  height: 190px;

  .user-gongdan-main {
    padding: 20px;

    .header {
      display: flex;

      p {
        margin: 0;
        color: #333;
        font-size: 16px;
        font-weight: 600;
      }

      span {
        color: #999;
        font-size: 12px;
        margin-left: 10px;
      }
    }

    .body {
      display: flex;

      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        color: #072074;
        text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
        font-weight: 600;
        font-size: 36px;

        span {
          font-size: 12px;
          margin-top: -10px;
          color: #91a7dc;
          text-shadow: none;
          font-weight: normal;
        }

      }

      .goods-item {
        width: 100%;
      }
    }
  }
}

.right {
  background: #fbefe8 url('~@/assets/common/operation.png') no-repeat calc(100% - 12px) 100%;

  .right-item {
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
    color: #ff5757 !important;

    span {
      color: #de9690 !important;
    }
  }
}

.user-sale {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(40vh - 68px);
  min-height: 352px;
  margin-top: 20px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
}

.user-task-status {
  display: flex;
  border-radius: 20px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(75vh - 90px);
  min-height: 542px;
  margin-top: 20px;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.title {
  // flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  align-items: center;
  margin-left: 20px;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
}

.btnGroup {
  width: 129px;
  height: 34px;
  background: rgba(233, 243, 255, .37);
  border-radius: 10px;
  padding: 5px;
  padding-left: 9px;
  margin-right: 20px;
  margin-left: 20px;

  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%) !important;
    border-radius: 7px;
    font-weight: 600;
    color: #333;
    border: none;
  }

  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border: none;
  }

  ::v-deep .el-radio-button__inner {
    padding: 5px 10px;
    background: transparent;
    border: none;
    color: #9ca3b4;
    width: 37px;
    height: 25px;
    font-size: 14px;
    text-align: center;
  }

  ::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }

}

.empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-task-rank {
  border-radius: 20px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(75vh - 90px);
  min-height: 542px;
  margin-top: 20px;
  background: #fff;
  margin-left: 30px;
}

.title {
  display: flex;
  margin-top: 20px;
}

.btnGroups {
  width: 200px;
  height: 30px;
  background: rgba(233, 243, 255, .37);
  border-radius: 10px;
  padding: 5px;
  padding-left: 16px;
  margin-right: 22px;
  margin-left: 20px;

  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%) !important;
    border-radius: 7px;
    font-weight: 600;
    color: #333;
    border: none;
  }

  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border: none;
  }

  ::v-deep .el-radio-button__inner {
    padding: 5px 10px;
    background: transparent;
    border: none;
    color: #9ca3b4;
    // width: 60px;
    height: 25px;
    font-size: 17px;
    text-align: center;
  }

  ::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }
}
</style>
