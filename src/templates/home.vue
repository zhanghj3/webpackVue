<template>
  <div>
    <div style="width: 100%; margin-top: 200px; text-align: center;color:red">
      <h1>我是home.vue</h1>
      <!-- <router-link  to="/app" >去todo主页</router-link> -->
      <h1 @click="toapp">去todo主页</h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toapp(){
      // 不带参数
      // this.$router.push({path:'/app'})
      // query带参数,可以使用path，也可以使用name
      // this.$router.push({path:'/app',query: {id:'3'}})
      // params带参数,只能使用name
      this.$router.push({name:'app',params: {id:'4'}})
    }
  },
};
</script>
<style>
</style>