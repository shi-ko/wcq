import { secklist, seckinfo } from '../../utils/request';

//初始化

const state = {
    list: null,
    item: null
}

const getters = {
    getList(state) {
        return state.list
    },
    getItem(state) {
        return state.item
    },
}

const mutations = {
    changeList(state, newList) {
        state.list = newList
    },
    changeItem(state, newItem) {
        state.item = newItem
    }
}

const actions = {
    reqList({ commit, state }) {
        secklist({ istree: true }).then((req, res) => {
            if (req.status == '200') {
                commit('changeList', req.data.list)
            }

        })
    },
    reqItem({ commit, state }, id) {
        seckinfo({ id: id }).then((req, res) => {
            if (req.status == '200') {
                console.log(req.data);
                let obj = req.data.list[0]
                commit('changeItem', obj)
            }

        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}