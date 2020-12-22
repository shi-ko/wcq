// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next()
        var tokenStr = window.sessionStorage.getItem('user')
    }
    if (tokenStr === null) {
        next('/login')
    } else {
        next()
    }
})

//1.引入重置的css样式
import './assets/css/reset.css'

//2.引入全局公共组件
import commonComponents from './components';
for (let i in commonComponents) {
    Vue.component(i, commonComponents[i])
}

//3.引入全局过滤器
import filters from './filters';
for (let i in filters) {
    Vue.filter(i, filters[i])
}

//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/index';
//index.js 文件名可以省略


//引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//引入echarts
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
// import 'echarts-gl'
// 注册组件后即可使用
Vue.component('v-chart', ECharts)

import $ from 'jquery'


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    render: h => h(App),
    store: store,
})