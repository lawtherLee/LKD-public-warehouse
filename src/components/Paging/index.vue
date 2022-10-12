<template>
  <div v-if="total !== 0" class="pagination-container">
    <div class="myPagination">
      <div class="total">
        共{{ total }}条记录 第{{ pageSize }}/{{ count }}页
      </div>
      <div>
        <button :disabled="pageSize === 1" style="cursor:pointer" @click="changePage(-1)">上一页</button>
        <button :disabled="pageSize === count" style="cursor:pointer" @click="changePage(1)">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 1
    },
    currentPage: {
      type: [Number, String],
      default: 10
    },
    show: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  computed: {
    count() {
      return Math.ceil(this.total / this.currentPage)
    }
  },
  methods: {
    // 点击切换上下页
    changePage(val) {
      this.$emit('changePage', +this.pageSize + val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;

  .myPagination {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 0;

    button {
      width: 70px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
      outline: none;
      border: none;
      color: #606266;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
    }

    button:disabled {
      background: #edf0f9;
      color: #d8dde3;
      cursor: no-drop;
    }

    .total {
      margin-right: 10px;
      font-weight: 400;
      color: #dbdfe5;
      height: 32px;
      line-height: 32px;

    }
  }
}
</style>
