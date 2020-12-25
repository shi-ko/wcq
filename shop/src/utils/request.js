import axios from 'axios';
import qs from 'qs';
import store from '../store/index';

const baseUrl = "/api";

// 请求拦截
// 当用户登录进去之后,需要带着唯一个令牌(token),进行页面的访问
// 在请求拦截中设置token
axios.interceptors.request.use(config => {
    console.group("本地请求的路径为:", config.url)
        // 从store中取出的user里边的token
    console.log(store.state.user);
    if (config.url !== baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.user.token
    }
    return config
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.group("本次请求的路径为:" + res.config.url)
    console.log(res);
    return res
})

// 添加菜单
export const requestAddMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuadd',
        data: qs.stringify(data)
    })
}


// 菜单列表
export const requestMenuList = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menulist',
        params: params
    })
}

// 获取菜单详情
export const requestMenuOne = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menuinfo',
        params: params
    })
}

// 修改菜单
export const requestUpdateMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuedit',
        data: qs.stringify(data)
    })
}

// 删除菜单
export const requestDelMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menudelete',
        data: data
    })
}

//角色管理
//添加角色
export const requestAddRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleadd',
        data: qs.stringify(data)
    })
}

// 角色列表
export const requestRoleList = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/rolelist'
    })
}

// 获取角色详情
export const requestRoleOne = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/roleinfo',
        params: params
    })
}

// 修改角色
export const requestUpdateRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleedit',
        data: qs.stringify(data)
    })
}

// 删除角色
export const requestDelRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roledelete',
        data: qs.stringify(data)
    })
}

//添加管理员
export const requestAddManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useradd',
        data: qs.stringify(data)
    })
}


// 获取管理员总的记录数
export const requestCount = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/usercount'
    })
}


// 获取管理员列表数据
export const requestMangerList = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/userlist',
        params: params
    })
}

// 获取管理员详情
export const requestManagerOne = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/userinfo',
        params: params
    })
}

// 修改管理员
export const requestUpdateManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useredit',
        data: qs.stringify(data)
    })
}

// 删除管理员
export const requestDelManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/userdelete',
        data: qs.stringify(data)
    })
}


//
//商品分类管理
//商品分类获取
export const reqCategory = (params) => {
    return axios({
        url: baseUrl + '/api/catelist',
        params: params
    })
}

//商品分类添加
export const addCategory = (data) => {
    console.log('接口------');
    var form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/cateadd',
        data: form
    })
}


//商品分类获取（一条）
export const reqCategoryItem = (params) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        params: params
    })
}

//商品分类修改
export const updataCategoryItem = (data) => {
    var form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/cateedit',
        data: form
    })
}

//商品分类删除
export const delCategory = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/catedelete',
        data: data
    })
}

// =========================
//商品规格管理
//商品规格添加
export const addSpecs = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/specsadd',
        data: data
    })
}

//商品规格总数（用于计算分页）
export const specscount = (params) => {
    return axios({
        url: baseUrl + '/api/specscount',
        params: params
    })
}


//商品规格列表（分页）**
export const specslist = (params) => {
    return axios({
        url: baseUrl + '/api/specslist',
        params: params
    })
}


// 商品规格获取（一条）
export const specsinfo = (params) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        params: params
    })
}

//商品规格修改
export const specsedit = (data) => {
        return axios({
            method: 'post',
            url: baseUrl + '/api/specsedit',
            data: data
        })
    }
    //商品规格删除
export const specsdelete = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/specsdelete',
        data: data
    })
}

//商品管理
//商品添加
export const goodsadd = (data) => {
    var form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/goodsadd',
        data: data
    })
}


//商品总数
export const goodscount = (params) => {
    return axios({
        url: baseUrl + '/api/goodscount',
        params: params
    })
}

//商品列表（分页）** 
export const goodslist = (params) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        params: params
    })
}

//商品获取（一条）

export const goodsinfo = (params) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        params: params
    })
}



//商品修改
export const goodsedit = (data) => {
    var form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/goodsedit',
        data: form
    })
}

//商品删除
export const goodsdelete = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/goodsdelete',
        data: data
    })
}


//会员管理
//会员列表** 
export const memberlist = (params) => {
    return axios({
        url: baseUrl + '/api/memberlist',
        params: params
    })
}

//会员获取（一条）
export const memberinfo = (params) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        params: params
    })
}

//会员修改
export const memberedit = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/memberedit',
        data: data
    })
}

//轮播图管理
//轮播图添加** 
export const banneradd = (data) => {
    let form = new FormData
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/banneradd',
        data: form
    })
}

//轮播图列表** 
export const bannerlist = (params) => {
    return axios({
        url: baseUrl + '/api/bannerlist',
        params: params
    })
}


//轮播图获取（一条）

export const bannerinfo = (params) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        params: params
    })
}

//轮播图修改
export const banneredit = (data) => {
    let form = new FormData
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/banneredit',
        data: form
    })
}

//轮播图删除
export const bannerdelete = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/bannerdelete',
        data: data
    })
}

//## 限时秒杀管理
//限时秒杀添加
export const seckadd = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/seckadd',
        data: data
    })
}


//限时秒杀列表**
export const secklist = (params) => {
    return axios({
        url: baseUrl + '/api/secklist',
        params: params
    })
}

//限时秒杀获取（一条）
export const seckinfo = (params) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        params: params
    })
}

//限时秒杀修改
export const seckedit = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/seckedit',
        data: data
    })
}

//限时秒杀删除
export const seckdelete = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/seckdelete',
        data: data
    })
}

//管理员管理
//管理员登陆
export const userlogin = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/userlogin',
        data: data
    })
}

export const useradd = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useradd',
        data: data
    })
}