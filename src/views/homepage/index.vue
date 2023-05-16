<template>
  <div class="card-box">
    <div class="card-layer card-layer1">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-notice class="custom-icon" />
            </div>
            <span>公告</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="card-layer card-layer2">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-notice class="custom-icon" />
            </div>
            <span>通知</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="card-layer card-layer3">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-collect class="custom-icon" />
            </div>
            <span>待办任务</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="card-layer card-layer4">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-statistic class="custom-icon" />
            </div>
            <span>数据源端情况统计</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="card-layer card-layer5">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-statistic class="custom-icon" />
            </div>
            <span>中心库数据情况统计</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="card-layer card-layer6">
      <div class="card">
        <div class="header">
          <div class="header-left">
            <div class="notice">
              <icon-home-statistic class="custom-icon" />
            </div>
            <span>数据共享情况统计</span>
          </div>
          <div class="header-right">更多</div>
        </div>
        <div class="body">
          <el-empty description="暂无数据" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// arr.value = []
// const modules = import.meta.glob('@/views/*/*.vue') // 导入
// console.log('modules', modules)
// let a = ref('sss')
</script>

<style lang="scss" scoped>
.card-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .card-layer {
    width: 33.3%;
    background-color: var(--system-container-background);
  }
  .card-layer1 {
    padding: 10px;
  }
  .card-layer2 {
    padding: 10px 10px 10px 0;
  }
  .card-layer3 {
    padding: 10px 10px 10px 0;
  }
  .card-layer4 {
    padding: 0 10px 10px 10px;
  }
  .card-layer5 {
    padding: 0 10px 10px 0;
  }
  .card-layer6 {
    padding: 0 10px 10px 0;
  }
  .card {
    background-color: #fff;
    .header {
      display: flex;
      justify-content: space-between;
      height: 38px;
      line-height: 38px;
      border-bottom: 1px solid #f0f0f0;
      .header-left {
        position: relative;
        display: flex;
        & ::before {
          content: '';
          display: inline-block;
          height: 30px;
          width: 3px;
          background-color: #1890ff;
          margin-right: 5px;
          position: absolute;
          left: 0;
          top: 3px;
        }
        .notice {
          vertical-align: middle;
          margin: 0 10px 0 15px;
        }
      }
      .header-right {
        color: #6ea3ff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .body {
      min-height: 200px;
    }
  }
}
</style>
