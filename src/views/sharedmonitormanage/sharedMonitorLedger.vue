<template>
  <com-table ref="child" :form="form">
    <template #formItem>
      <el-form-item label="机构名称:" prop="jgmc">
        <el-input v-model.trim="form.jgmc" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="申请时间:" prop="sqsj">
        <el-date-picker v-model="form.sqsj" value-format="YYYY-MM-DD" type="daterange" range-separator="至" size="default" :shortcuts="shortcuts" />
      </el-form-item>
      <el-form-item label="共享状态:" prop="ly">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="共享事项:" prop="jgmc">
        <el-input v-model.trim="form.gxsx" placeholder="" type="text" />
      </el-form-item>
      <el-form-item label="共享方式:" prop="jgmc">
        <el-input v-model.trim="form.gxfs" placeholder="" type="text" />
      </el-form-item>
    </template>
    <template #state>
      <div class="state">
        <span>共享正常</span>
        <span>共享异常</span>
        <span>共享终止</span>
      </div>
    </template>
    <template #tableColumn>
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="jyjls" label="申请时间" width="100" />
      <el-table-column prop="jgmc" label="共享事项" :show-overflow-tooltip="true" />
      <el-table-column prop="bmc" label="申请机构" width="150" />
      <el-table-column prop="bzwm" label="服务系统" width="150" />
      <el-table-column prop="tjsj" label="联系人" width="100" />
      <el-table-column prop="jyjls" label="状态" width="70" />
      <el-table-column prop="jgmc" label="共享数据内容" :show-overflow-tooltip="true" width="300">
        <template v-slot:default="{ row }">
          <el-link type="primary" :underline="false" @click="goFormDetail">{{ row.jgmc }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="jyjls" label="处理方式" width="100" />
      <el-table-column prop="jyjls" label="备注" width="100" />
    </template>
  </com-table>
</template>

<script setup>
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]
const form = reactive({
  jgmc: '',
  sqsj: '',
  state: '',
  gxsx: '',
  gxfs: ''
})
const stateOptions = ref([
  {
    label: '全部',
    value: '0'
  },
  {
    label: '正常',
    value: '1'
  },
  {
    label: '异常',
    value: '2'
  },
  {
    label: '终止',
    value: '3'
  }
])
// 查看共享表单情况
const router = useRouter()
function goFormDetail() {
  router.push({ name: 'sharedForm' })
}
</script>

<style lang="scss" scoped>
.state {
  padding: 0px 10px 10px;
  text-align: left;
  span {
    font-size: 14px;
    margin-right: 15px;
    padding: 2px 4px;
  }
  & span:first-child {
    border: 1px solid #333;
  }
  & span:nth-child(2) {
    background-color: red;
    color: #fff;
  }
  & span:last-child {
    background-color: #aaaaaa;
    color: #fff;
  }
}
</style>
