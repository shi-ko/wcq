<template lang="">
  <div>
    <el-row>
      <el-col :span='2'>
        用户编号
      </el-col>
      <el-col :span='3'>
        昵称
      </el-col>
      <el-col :span='13'>
        手机号
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
        {{item.nickname}}
      </el-col>
      <el-col :span='13'>
        {{item.phone}}
      </el-col>
      <el-col :span='2'>
        <el-button v-if='item.status==1' type="primary" plain @click='open(item.id)'>禁用</el-button>
        <el-button v-else type="primary" plain @click='open(item.id)'>启用</el-button>
      </el-col>
      <el-col :span='4'>
        <router-link to="/member/add?isEdit=true">
          <el-button type="primary" plain @click='edit(item.id)'>编辑</el-button>
        </router-link>
      </el-col>
    </el-row>

   
  </div>
</template>
<script>
    import {
        memberlist,
        memberedit,
        memberinfo,
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
            memberlist().then((req) => {
                this.list = req.data.list
            })
        },
        computed: {
            ...mapState,

        },
        methods: {
            ...mapActions({
                'reqList': 'member/reqList',
                'reqItem': 'member/reqItem',
            }),

            open(n) {
                memberinfo({
                    id: n
                }).then((req, res) => {
                    let obj = req.data.list[0]
                    obj.status == 1 ? obj.status = 2 : obj.status = 1
                    memberedit(obj).then((req, res) => {
                        memberlist().then((req) => {
                            this.list = req.data.list
                        })
                    })
                })
            },
            edit(n) {
                this.$emit('add')
                this.reqItem(n)

            },

        },
    }
</script>
<style lang="">

</style>