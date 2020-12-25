<template lang="">
  <div>
    <h5>
      <p>
        <span>*</span>
        活动名称
        <el-input v-model="newData.title"></el-input>
      </p>
    </h5>
    <h5>
      <p>
      <div class="block">
        <span class="demonstration">活动期限</span>
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </p>
    </h5>
    <h5>
      <p>
        <span>*</span>
        一级分类
        <el-select v-model="newData.first_cateid">
          <el-option v-for="(item,index) in cateList" :key="item.index" :label="item.catename" :value="item.id">
          </el-option>

        </el-select>
      </p>
    </h5>
    <h5>
      <p>
        <span>*</span>
        二级分类
        <el-select v-model="newData.second_cateid">
          <el-option v-for="(item,index) in nowCate" :key="item.index" :label="item.catename" :value="item.id">
          </el-option>
        </el-select>
      </p>
    </h5>
    <h5>
      <p>
        <span>*</span>
        商品
        <el-select v-model="newData.goodsid">
          <el-option v-for="(item,index) in nowCate" :key="item.index" :label="item.catename" :value="item.id">
          </el-option>

        </el-select>
      </p>
    </h5>
    <h5>
      状态<el-switch v-model="newData.status" active-value='1' inactive-value='2'>
      </el-switch>
    </h5>
    <h5>
      <router-link to="/seckill">
        <el-button type="primary" @click='add'>添加</el-button>
      </router-link>
    </h5>
  </div>
</template>
<script>
    import {
        seckadd,
        seckedit,
        goodsinfo
    } from '../../../utils/request.js'

    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                newData: {
                    title: '',
                    begintime: 1592582400001,
                    endtime: 1592665200001,
                    first_cateid: null,
                    second_cateid: null,
                    goodsid: null,
                    status: null
                },
                value1: []
            }
        },
        mounted() {
            this.reqCateList()

        },

        computed: {
            ...mapState('seck', ['item']),
            ...mapGetters({
                'cateList': 'category/getList',
                'cateItem': 'category/getItem',
            }),

            nowCate: function() {
                if (this.newData.first_cateid !== null) {
                    for (let n in this.cateList) {
                        if (this.cateList[n].id == this.newData.first_cateid) {
                            return this.cateList[n].children
                        }
                    }
                }
                return
            },
        },
        methods: {
            add: function() {
                this.newData.begintime = this.value1[0].getTime()
                this.newData.endtime = this.value1[1].getTime()

                if (this.$route.query.isEdit == 'true') {

                    seckedit(this.newData)

                } else {
                    console.log(this.newData, '1111111111');

                    seckadd(this.newData)
                }

                this.$emit('add')
            },
            ...mapActions({
                'reqCateList': 'category/reqList',
                'reqCateItem': 'category/reqItem',
            }),

        },
        watch: {
            item: function() {
                if (this.$route.query.isEdit == 'true') {
                    this.newData = this.item
                }
            },
            //根据目录查对应商品
            nowCate: function() {
                // console.log(this.item);
                // goodsinfo({
                //     id: this.newData.second_cateid
                // }).then(req => {
                //     console.log(req);
                // })
            },
            'newData.begintime': function() {
                let arr = []
                arr.push(new Date(Number(this.newData.begintime)))
                arr.push(new Date(Number(this.newData.endtime)))
                this.value1 = arr
            }
        },

    }
</script>
<style lang="" scoped>

</style>