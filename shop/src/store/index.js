import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import menu from './modules/menu';
import category from './modules/category';
import role from './modules/role';
import manager from './modules/manager';
import specs from './modules/specs';
import goods from './modules/goods'
import seck from './modules/seck'
import member from './modules/member'
import banner from './modules/banner'

import { state, mutations, getters } from './mutations.js';
import actions from './actions.js';
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menu,
        category,
        manager,
        role,
        specs,
        goods,
        seck,
        member,
        banner
    }
})