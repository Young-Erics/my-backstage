<template>
  <!-- 采集需求计划 -->
  <com-table ref="child" :form="form">
    <template #formItem>
      <el-form-item label="数据源名称:" prop="jgmc" label-width="90px">
        <el-input v-model.trim="form.jgmc" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="状态:" prop="ly" label-width="90px">
        <el-input v-model.trim="form.jgmc" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="采集:" prop="" label-width="90px">
        <el-select v-model="form.orgcd" placeholder="">
          <el-option v-for="item in collectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属地:" prop="ly" label-width="90px">
        <el-input v-model.trim="form.jgmc" placeholder="" type="text" />
      </el-form-item>
    </template>
    <template #rightFigure>
      <div class="right">
        <div class="text">
          <div class="top-text"><span class="orange-plan">良好的</span><span class="red-plan">采集需求计划</span></div>
          <div class="orange-plan">是实施监控管理的先决条件</div>
        </div>
        <div class="write-icon">
          <icon-system-write class="custom-icon" />
        </div>
      </div>
    </template>
    <template #tableColumn>
      <el-table-column prop="jgmc" label="编号" width="50" />
      <el-table-column prop="bmc" label="归属" width="50" />
      <el-table-column prop="bzwm" label="数据源机构名称" width="120" :show-overflow-tooltip="true" />
      <el-table-column prop="tjsj" label="测评等级" width="80" />
      <el-table-column prop="jyjls" label="电子病历级别" width="100" />
      <el-table-column prop="cjxq" label="采集需求" :show-overflow-tooltip="true">
        <template v-slot:default="{ row }">
          <el-link type="primary" :underline="false" @click="goDetail(row)">
            {{ row.cjxq }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="jyjls" label="最早业务时间" width="100" />
      <el-table-column prop="jyjls" label="采集时间" width="100" />
      <el-table-column prop="jyjls" label="状态" width="80" />
    </template>
  </com-table>
</template>

<script setup>
// import { queryDemandPlan } from '@/api/mock.js'
const router = useRouter()
const form = reactive({
  jgmc: '',
  state: ''
})
const collectOptions = ref([
  {
    label: 'T+1',
    value: '0'
  },
  {
    label: '实时',
    value: '1'
  },
  {
    label: '每月',
    value: '2'
  },
  {
    label: '每周',
    value: '3'
  }
])
// 去详情页
function goDetail(row) {
  router.push({
    name: 'collectionDetail',
    query: {
      row: JSON.stringify(row)
    }
  })
}
</script>

<style lang="scss" scoped>
:deep {
  .form-card {
    padding: 10px;
    display: flex;
    .el-form {
      flex: 7;
      .el-form-item__label {
        padding: 0 !important;
      }
      .el-form-item__content {
        width: 200px !important;
      }
      .el-select {
        width: 100% !important;
      }
    }
    .right {
      display: flex;
      flex: 3;
      align-items: center;
      .text {
        margin-right: 20px;
        .top-text {
          margin-bottom: 5px;
        }
        .orange-plan {
          font-style: italic;
          font-size: 18px;
          text-shadow: 1px 2px 1px #f8d1d6;
          font-weight: 700;
          color: #f6a032;
        }
        .red-plan {
          font-style: italic;
          font-size: 18px;
          text-shadow: 1px 1px 1px #f8d1d6;
          text-decoration: underline;
          font-weight: 700;
          color: red;
        }
      }
      .custom-icon {
        height: 5em;
      }
    }
  }
}
</style>
