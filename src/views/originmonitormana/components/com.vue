<template>
  <!-- 数据源端总数 -->
  <div class="page-container">
    <header>
      <div>
        2023年1月15日:共有2163个数据源。 源端正常
        <span>1772</span>个， 异常<span>393</span>个， 已停用<span>2</span>个。
      </div>
      <div>
        <span>源端正常</span>
        <span>源端异常</span>
        <span>源端已停用</span>
        <span>每两小时更新状态</span>
      </div>
    </header>
    <!-- 医疗服务部分 -->
    <section class="medical-service" v-for="(item, index) in section.list" :key="index">
      <div class="left-title">
        <div>{{ item.leftTitle }}</div>
        <div>共<span>2162</span>个源端</div>
      </div>
      <div class="right-content">
        <div class="" v-for="(val, ind) in item.child" :key="ind">
          <div class="right-header">
            <span>
              <icon-system-double-arrow class="custom-icon" />
            </span>
            <span>{{ val.rightSmallTitle }}</span>
            <span>共有<span>91</span>个数据源, 源端正常<span>88</span>个， 异常<span>2</span>个， 已停用<span>1</span>个 </span>
          </div>
          <div class="right-body">
            <span v-for="val in 70">市人民医院</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { section } = defineProps({
  section: {
    default: reactive({
      list: [
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
      ]
    })
  }
})
</script>

<style lang="scss" scoped>
header {
  width: 98%;
  margin: 15px auto 25px;
  padding-left: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:first-child {
    color: #9a9a9a;
    font-size: 14px;
    & > span:first-child {
      color: #92c73e;
    }
    & > span:nth-child(2) {
      color: #e03349;
    }
    & > span:nth-child(3) {
      color: #a6a6a6;
    }
  }
  & > div:nth-child(2) {
    span {
      margin-right: 15px;
      padding: 3px 12px;
      color: #fff;
      font-size: 13px;
    }
    & > span:first-child {
      background-color: #70b603;
    }
    & > span:nth-child(2) {
      background-color: #d7001a;
    }
    & > span:nth-child(3) {
      background-color: #aaaaaa;
    }
    & > span:last-child {
      color: #dbdbdb;
    }
  }
}
// 医疗服务
.medical-service {
  width: 98%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left-title {
    margin-right: 30px;
    width: 6em;
    text-align: center;
    & > div:first-child {
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
    }
    & > div:last-child {
      color: #aaaaaa;
      font-size: 14px;
    }
  }
  .right-content {
    flex: 1;
    .right-header {
      text-align: left;
      & > span:first-child {
        background-color: #2caae0;
        margin-right: 2px;
        width: 40px;
        display: inline-block;
      }
      & > span:nth-child(2) {
        padding: 0px 20px;
        background-color: #2eaae0;
        color: #fff;
        height: 21px;
        display: inline-block;
        margin-right: 6px;
      }
      & > span:last-child {
        color: #808080;
        font-size: 14px;
      }
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
</style>
