<template lang="">
    <div>
      <el-row>
        <el-col :span='2'>
          规格编号
        </el-col>
        <el-col :span='3'>
          规格名称
        </el-col>
        <el-col :span='13'>
          规格属性
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
          {{item.specsname}}
        </el-col>
        <el-col :span='13' v-if='item.attrs.length!=0'>
          <el-tag v-for="(i, n) in item.attrs" :key="n">{{i}}</el-tag>
        </el-col>
        <el-col :span='13' v-else>
          暂无数据
        </el-col>
        <el-col :span='2'>
          <el-button v-if='item.status==1' type="primary" plain @click='open(item.id)'>禁用</el-button>
          <el-button v-else type="primary" plain @click='open(item.id)'>启用</el-button>
        </el-col>
        <el-col :span='4'>
          <router-link to="/specs/add?isEdit=true">
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
        specscount,
        specslist,
        specsedit,
        specsinfo,
        specsdelete
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
            specscount().then((req) => {
                this.total = req.data.list[0].total
            })
            specslist({
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
                'reqList': 'specs/reqList',
                'reqItem': 'specs/reqItem',
            }),
            handleCurrentChange(val) {
                specslist({
                    size: 3,
                    page: val
                }).then((req) => {
                    this.list = req.data.list
                })
            },
            open(n) {
                specsinfo({
                    id: n
                }).then((req, res) => {
                    let obj = req.data.list[0]
                    obj.status == 1 ? obj.status = 2 : obj.status = 1
                    specsedit(obj).then((req, res) => {
                        specslist({
                            size: 3,
                            page: this.currentPage
                        }).then((req) => {
                            this.list = req.data.list
                        })
                    })
                })
            },
            edit(n) {
                this.$emit('isEdit')
                this.reqItem(n)

            },
            del(n) {
                specsdelete({
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
<style lang="">

</style>