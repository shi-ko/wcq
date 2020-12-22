import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';

Vue.use(Router)


function fun(url) {
    if (store.state.user) {
        return store.state.user.menus_url.some(i => i == url)

    }
    return false
}

export default new Router({
    routes: [

        {
            path: '/login',
            component: () =>
                import ('../pages/login/login.vue')
        },
        {
            path: '/',
            component: () =>
                import ('../pages/index/index.vue'),
            children: [{
                    path: 'menu',
                    name: '菜单',
                    component: () =>
                        import ('../pages/menu/menu.vue'),
                    beforeEnter(to, from, next) {
                        fun('/menu') ? next() : next('/')
                    }
                },
                {
                    path: 'home',
                    name: '首页',
                    component: () =>
                        import ('../pages/home/home.vue'),
                },
                {
                    path: 'role',
                    name: '角色',
                    component: () =>
                        import ('../pages/role/role.vue'),
                    beforeEnter(to, from, next) {
                        fun('/role') ? next() : next('/')
                    }
                },
                {
                    path: 'manager',
                    name: '管理员',
                    component: () =>
                        import ('../pages/manager/manager.vue'),
                    // beforeEnter(to, from, next) {
                    //     fun('/manager') ? next() : next('/')
                    // }
                }, {
                    path: 'category',
                    name: '商品分类',
                    component: () =>
                        import ('../pages/category/category.vue'),
                    beforeEnter(to, from, next) {
                        fun('/category') ? next() : next('/')
                    },
                }, {
                    path: 'specs',
                    component: () =>
                        import ('../pages/specs/specs.vue'),

                    beforeEnter(to, from, next) {
                        fun('/specs') ? next() : next('/')
                    },
                    children: [{
                        path: 'add',
                        name: '商品规格添加',
                        component: () =>
                            import ('../pages/specs/components/add.vue'),

                    }, {
                        path: '',
                        name: '商品规格列表',
                        component: () =>
                            import ('../pages/specs/components/list.vue'),
                    }]
                }, {
                    path: 'goods',
                    component: () =>
                        import ('../pages/goods/goods.vue'),

                    beforeEnter(to, from, next) {
                        fun('/goods') ? next() : next('/')
                    },
                    children: [{
                        path: 'add',
                        name: '商品规格添加',
                        component: () =>
                            import ('../pages/goods/components/add.vue'),

                    }, {
                        path: '',
                        name: '商品规格列表',
                        component: () =>
                            import ('../pages/goods/components/list.vue'),
                    }]
                }, {
                    path: 'seckill',
                    component: () =>
                        import ('../pages/seck/seck.vue'),

                    beforeEnter(to, from, next) {
                        fun('/seckill') ? next() : next('/')
                    },
                    children: [{
                        path: 'add',
                        name: '活动添加',
                        component: () =>
                            import ('../pages/seck/components/add.vue'),

                    }, {
                        path: '',
                        name: '活动列表',
                        component: () =>
                            import ('../pages/seck/components/list.vue'),
                    }]
                },
                {
                    path: '',
                    redirect: 'home',
                }
            ]
        }, {
            path: '*',
            redirect: 'login',
        }
    ]
})