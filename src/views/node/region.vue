<template>
  <div class="region">
    <!-- 搜索区域 -->
    <search :title="title">111</search>
    <!-- 主题区域 -->
    <mains :table-th="tableTh" :region-list="regionList">111</mains>
  </div>
</template>

<script>
import { getRegionListAPI } from '@/api'
import mains from './components/main.vue'
import search from './components/search.vue'
export default {
  name: 'Region',
  components: { search, mains },
  data() {
    return {
      title: '区域搜索:',
      tableTh: {
        id: '序号',
        address: '区域名称',
        point: '点位数',
        remarks: '备注说明',
        operation: '操作'
      },
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pagesize: 10
      },
      regionList: []
    }
  },
  mounted() {
    this.getRegionList()
  },
  methods: {
    async getRegionList() {
      const { data } = await getRegionListAPI(this.page)
      this.regionList = data.currentPageRecords
      console.log(111, this.regionList)
    }
  }
}
</script>

<style>
.region{
  width: 1580px;
}
</style>
