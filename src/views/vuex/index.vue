<template>
  <div>
    <h2>父亲：{{ parentName }}</h2>
    <p @click="change">儿子:{{ sonName }}</p>
    <p>num:{{ store.state.buy.buyNum }}</p>
    <p>妻子：{{ store.getters['test/wife']('李梅') }}</p>
    <el-button @click="store.dispatch('buy/objCommit')">加购数量</el-button>
    <el-button @click="store.dispatch('globalAction', { name: '全局李四' })">全局action</el-button>
    <el-input v-model="broName" style="width: 30%"></el-input>
  </div>
</template>

<script setup>
const store = useStore()
const parentName = computed(() => {
  return store.state.test.testName
})
const sonName = computed(() => {
  return store.getters['test/son']
})
// v-model绑定state时，改变状态必须通过mutations
const broName = computed({
  get: () => {
    return store.state.test.broName
  },
  set: value => {
    store.commit('test/changeBro', { name: value })
  }
})
// console.log('store', store)
const change = () => {
  store.dispatch('buy/addAsync')
  // store.commit('test/handleName', '李四改' + Math.random())
}
</script>

<style lang="scss" scoped>
p {
  cursor: pointer;
}
</style>
