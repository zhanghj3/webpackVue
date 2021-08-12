import Vue from 'vue'
// ./src/app就是./src/app.vue
import App from './src/app'
import '@assets/styles/global.css'

// 把app.vue挂在到index.html中id为app的节点下
new Vue({
    render: h => h(App)
}).$mount('#app')