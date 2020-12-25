<template lang="">
  <div>
    <el-row>
      <el-col :span='2'>
        编号
      </el-col>
      <el-col :span='3'>
        轮播图标题
      </el-col>
      <el-col :span='13'>
        图片
      </el-col>
      <el-col :span='2'>
        状态
      </el-col>
      <el-col :span='4'>
        操作
      </el-col>
    </el-row>

    <el-row v-for="(item, index) in list" :key="index">
      <el-col :span='2'>
        {{item.id}}
      </el-col>
      <el-col :span='3'>
        {{item.title}}
      </el-col>
      <el-col :span='13'>
        
        <img :src="'api/'+item.img" alt="" class="small">
      </el-col>
      <el-col :span='2'>
        <el-button v-if='item.status==1' type="primary" plain @click='open(item.id)'>禁用</el-button>
        <el-button v-else type="primary" plain @click='open(item.id)'>启用</el-button>
      </el-col>
      <el-col :span='4'>
        <router-link to="/banner/add?isEdit=true">
          <el-button type="primary" plain @click='edit(item.id)'>编辑</el-button>
        </router-link>
        <el-button type="danger" plain @click='del(item.id)'>删除</el-button>
      </el-col>
    </el-row>

    
  </div>
</template>
<script>
    import {
        bannerlist,
        banneredit,
        bannerinfo,
        bannerdelete
    } from '../../../utils/request.js'
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'

    import {
        successAlert,
        warningAlert
    } from '../../../utils/alert';


    export default {
        data() {
            return {
                list: null,
            }
        },
        mounted() {

            bannerlist().then((req) => {
                this.list = req.data.list
            })
        },
        computed: {},
        methods: {
            ...mapActions({
                'reqList': 'banner/reqList',
                'reqItem': 'banner/reqItem',
            }),

            open(n) {
                bannerinfo({
                    id: n
                }).then((req, res) => {
                    let obj = req.data.list
                    obj.status == 1 ? obj.status = 2 : obj.status = 1
                    obj.id = n
                    banneredit(obj).then((req, res) => {
                        bannerlist().then((req) => {
                            this.list = req.data.list
                        })
                    })
                })
            },
            edit(n) {
                this.$emit('add')
                this.reqItem(n)

            },
            del(n) {
                bannerdelete({
                    id: n
                }).then(req => {
                    if (req.data.code == 200) {
                        successAlert(req.data.msg)
                        this.reqList()

                    } else {
                        warningAlert(req.data.msg)
                    }
                })

            }
        },
    }
</script>
<style lang="" scoped>
    .small {
        width: 100px;
        height: 100px;
    }
</style>