// 引入vue、vue路由和相关vue文件
import Vue from 'vue'
import VueRouter from 'vue-router'
// @templates之前在webpack.config.js里面配置过，代表./src/components这个路径的简写
// @templates/home 就是home.vue
import Home from '@templates/home'

Vue.use(VueRouter)
    // 防止路由跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 导出路由
export default new VueRouter({
    routes: [{
            path: '/',
            component: Home
        },
        // 重定向 所以是访问/home的时候重定向到上面的/路径去
        {
            path: '/home',
            redirect: '/'
        }
    ]
})