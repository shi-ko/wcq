<template lang="">
  <div>
    <el-row>
      <el-col :span='2'>
        商品编号
      </el-col>
      <el-col :span='3'>
        商品名称
      </el-col>
      <el-col :span='3'>
        商品价格
      </el-col>
      <el-col :span='2'>
        市场价格
      </el-col>
      <el-col :span='4'>
        图片
      </el-col>
      <el-col :span='2'>
        是否新品
      </el-col>
      <el-col :span='2'>
        是否热卖
      </el-col>
      <el-col :span='2'>
        状态
      </el-col>
      <el-col :span='2'>
        操作
      </el-col>
    </el-row>

    <el-row v-for="(item, index) in list" :key="index">
      <el-col :span='2'>
        {{item.id}}
      </el-col>
      <el-col :span='3'>
        {{item.goodsname}}
      </el-col>
      <el-col :span='3'>
        {{item.price}}
      </el-col>
      <el-col :span='2'>
        {{item.market_price}}

      </el-col>
      <el-col :span='4' class="goodsImg">
        <img :src="'/api'+item.img" alt="">
      </el-col>
      <el-col :span='2'>
        {{item.ishot}}
        <el-switch v-model="item.ishot" active-value='1' inactive-value='2'></el-switch>
      </el-col>
      <el-col :span='2'>
        {{item.isnew}}
        <el-switch v-model="item.isnew" active-value='1' inactive-value='2'></el-switch>

      </el-col>
      <el-col :span='2'>
        <el-button v-if='item.status==1' type="primary" plain @click='open(item.id)'>禁用</el-button>
        <el-button v-else type="primary" plain @click='open(item.id)'>启用</el-button>
      </el-col>
      <el-col :span='4'>
        <router-link to="/goods/add?isEdit=true">
          <el-button type="primary" plain @click='edit(item.id)'>编辑</el-button>
        </router-link>
        <el-button type="danger" plain @click='del(item.id)'>删除</el-button>
      </el-col>
    </el-row>

    <div class="block">
      <el-pagination :page-size="3" layout="total, prev, pager, next" :total="total"
        @current-change="handleCurrentChange" :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import {
        goodscount,
        goodslist,
        goodsedit,
        goodsinfo,
        goodsdelete
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
                total: null,
                list: null,
                currentPage: 1
            }
        },
        mounted() {
            goodscount().then((req) => {
                this.total = req.data.list[0].total
            })
            goodslist({
                size: 3,
                page: 1
            }).then((req) => {
                this.list = req.data.list
            })
        },
        computed: {
            ...mapState,

        },
        methods: {
            ...mapActions({
                'reqList': 'goods/reqList',
                'reqItem': 'goods/reqItem',
            }),
            handleCurrentChange(val) {
                goodslist({
                    size: 3,
                    page: val
                }).then((req) => {
                    this.list = req.data.list
                })
            },
            open(n) {
                goodsinfo({
                    id: n
                }).then((req, res) => {
                    let obj = req.data.list
                    obj.status == 1 ? obj.status = 2 : obj.status = 1
                    obj.id = n
                    goodsedit(obj).then((req, res) => {
                        goodslist({
                            size: 3,
                            page: this.currentPage
                        }).then((req) => {
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
                goodsdelete({
                    id: n
                }).then(req => {
                    console.log(req);
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
    .goodsImg img {
        width: 100px;
        height: 100px;
    }
</style>