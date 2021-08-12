import Vue from 'vue'
// ./src/index./src/index.vue
import index from './src/index'
import '@assets/styles/global.css'
import router from './router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// index.vue挂在到index.html中id为app的节点下
new Vue({
    router,
    render: h => h(index)
}).$mount('#app')