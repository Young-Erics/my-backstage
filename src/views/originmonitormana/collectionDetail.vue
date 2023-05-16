<template>
  <div class="page-container">
    <div class="table-box">
      <el-table
        :data="leftTableData"
        :border="true"
        header-cell-class-name="header-cell"
        cell-class-name="cell-class"
        style="width: 33%"
        size="small"
      >
        <el-table-column prop="bmc" label="表名称" :show-overflow-tooltip="true" />
        <el-table-column prop="bmc" label="是否需要采集" :show-overflow-tooltip="true" />
      </el-table>
      <el-table
        :data="middleTableData"
        :border="true"
        header-cell-class-name="header-cell"
        cell-class-name="cell-class"
        style="width: 33%"
        size="small"
      >
        <el-table-column prop="bmc" label="表名称" :show-overflow-tooltip="true" />
        <el-table-column prop="bmc" label="是否需要采集" :show-overflow-tooltip="true" />
      </el-table>
      <el-table
        :data="rightTableData"
        :border="true"
        header-cell-class-name="header-cell"
        cell-class-name="cell-class"
        style="width: 33%"
        size="small"
      >
        <el-table-column prop="bmc" label="表名称" :show-overflow-tooltip="true" />
        <el-table-column prop="bmc" label="是否需要采集" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="req.page"
      v-model:page-size="req.pagesize"
      :page-sizes="[10, 20, 30]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
const proxy = getCurrentInstance()?.proxy
const route = useRoute()
const leftTableData = ref([])
const middleTableData = ref([])
const rightTableData = ref([])

// 查询
const total = ref(0)
const req = reactive({
  pagesize: 20,
  page: 1
})
const queryData = async () => {
  let sendTime = proxy.$Long(new Date())
  let sign = proxy.$md5(req + sendTime)
  let bodyData = {
    req,
    sign,
    sendTime
  }
  // const { datas, totalcnt, tabheads } = await queryApi(bodyData)
}
// ----------分页逻辑----------
// 改变显示的条数
const handleSizeChange = val => {
  req.pagesize = val
  queryData(queryName)
}
// 改变页码
const handleCurrentChange = newPage => {
  req.page = newPage
  queryData(queryName)
}
</script>

<style lang="scss" scoped>
.page-container {
  height: calc(100vh - 130px);
  overflow: hidden;
  .table-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
    padding: 20px;
    margin: 0 auto;
    .el-table {
      height: 100%;
    }
  }

  .el-pagination {
    height: 10%;
    justify-content: center;
    align-items: center;
  }
}
:deep {
  .el-table__cell {
    text-align: center !important;
  }
}
</style>
