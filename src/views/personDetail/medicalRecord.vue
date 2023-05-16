<template>
  <!-- 查看电子病历 -->
  <div class="page-container">
    <div class="form-card">
      <div class="left-info">
        <span>张三</span>
        <span>入院日期: </span>
        <span>入院流水号:</span>
        <span>入院诊断:</span>
      </div>
      <div class="right-info">
        <span>有数据</span>
        <span>应传无数据</span>
        <span>非应传表单</span>
        <span>点击可查看详细字段内容</span>
      </div>
    </div>
    <div class="chart-card">
      <!-- 医疗服务部分 -->
      <section class="medical-service" v-for="(item, index) in list" :key="index">
        <div class="right-content">
          <div class="" v-for="(val, ind) in item.child" :key="ind">
            <div class="right-header">
              <span>
                <icon-system-double-arrow class="custom-icon" />
              </span>
              <span>{{ val.rightSmallTitle }}</span>
              <!-- <span>共有<span>91</span>个数据源, 源端正常<span>88</span>个， 异常<span>2</span>个， 已停用<span>1</span>个 </span> -->
            </div>
            <div class="right-body">
              <span v-for="val in 70">市人民医院</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <el-button type="primary" plain @click="back">返回</el-button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const list = ref([
  {
    leftTitle: '医疗服务部分',
    child: [
      {
        rightSmallTitle: '医院'
      },
      {
        rightSmallTitle: '杜康服务中心'
      },
      {
        rightSmallTitle: '诊所、门诊部'
      }
    ]
  }
])
// 返回按钮
function back() {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-container {
  & > div:last-child {
    height: 35px;
    .el-button {
      width: 6em;
    }
  }
}
.form-card {
  // margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    margin-right: 30px;
  }
  .left-info {
    padding-left: 20px;
  }
  .right-info {
    span {
      color: #fff;
      padding: 3px 15px;
    }
    & span:first-child {
      background-color: #70b603;
    }
    & span:nth-child(2) {
      background-color: #d7001a;
    }
    & span:nth-child(3) {
      background-color: #aaaaaa;
    }
    & span:last-child {
      color: #d7d7d7;
    }
  }
}
.chart-card {
  height: calc(100% - 40px);
  background-color: #fff;
  padding: 10px 10px 0;
  .medical-service {
    width: 98%;
    margin: 0 auto;

    .right-content {
      flex: 1;
      .right-header {
        text-align: left;
        & > span:first-child {
          background-color: #2caae0;
          margin-right: 2px;
          width: 40px;
          height: 20px;
          display: inline-block;
        }
        & > span:nth-child(2) {
          padding: 0px 20px;
          background-color: #2eaae0;
          color: #fff;
          height: 20px;
          display: inline-block;
          margin-right: 6px;
        }
        // & > span:last-child {
        //   color: #808080;
        //   font-size: 14px;
        // }
      }
      .right-body {
        margin: 10px 0 25px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        & > span {
          border: 1px solid #74786f;
          margin-left: -1px;
          margin-bottom: -1px;
          background-color: #70b603;
          padding: 5px 15px;
          color: #fff;
        }
      }
    }
  }
}
</style>
