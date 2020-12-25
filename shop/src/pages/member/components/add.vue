<template lang="">
    <div>
      <h5>
        <p>
          <span>*</span>
          手机号
          <el-input v-model="newData.phone"></el-input>
        </p>
      </h5>
      <h5>
        <p>
          <span>*</span>
          昵称
          <el-input v-model="newData.nickname">
          </el-input>
        </p>
      </h5>
      <h5>
        <p>
          <span>*</span>
          密码
          <el-input v-model="newData.password">
          </el-input>
        </p>
      </h5>
      <h5>
        状态<el-switch v-model="newData.status" active-value='1' inactive-value='2'>
        </el-switch>
      </h5>
      <h5>
        <router-link to="/member">
          <el-button type="primary" @click='add'>修改</el-button>
        </router-link>
      </h5>
    </div>
  </template>
<script>
    import {
        memberedit
    } from '../../../utils/request.js'

    import {
        mapState,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                newData: {
                    nickname: '',
                    phone: '',
                    password: '',
                    status: '1'
                },

            }
        },
        mounted() {},

        computed: {
            ...mapState('member', ['item']),
            ...mapGetters('member', ['getItem']),
        },
        methods: {
            add: function() {
                if (this.$route.query.isEdit == 'true') {
                    memberedit(this.newData)
                }
                this.$emit('add')
            },


        },
        watch: {
            item: function() {
                this.newData = this.item
            }
        },

    }
</script>
<style lang="" scoped>
    .small {
        /* background: #66b1ff;
          border-color: #66b1ff;
          color: #FFF; */
        margin: 4px;
    }
</style>