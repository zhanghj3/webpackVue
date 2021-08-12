<template>
  <div id="index">
    <!-- 跟挂载点，然后启动后访问'/'，也就是跳转到home.vue，home.vue中不需要用<router-view>,直接使用this.$router.push({path:'/app'})，就可以跳转到app.vue了 -->
    <router-view></router-view>
  </div>
</template>