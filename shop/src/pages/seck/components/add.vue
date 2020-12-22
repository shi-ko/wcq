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
        <el-select  v-model="newData.goodsid">
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
      <router-link to="/specs">
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
                    begintime: 1592582400000,
                    endtime: 1592665200000,
                    first_cateid: null,
                    second_cateid: null,
                    goodsid: null,
                    status: null
                },
            }
        },
        mounted() {
            this.reqCateList()

        },

        computed: {
            // ...mapState('seck', ['item']),
            ...mapGetters({
                'cateList': 'category/getList',
                'cateItem': 'category/getItem',
                'goodsItem': 'goods/getItem'
            }),
            value1: function() {
                let arr = []
                arr.push(new Date(this.newData.begintime))
                arr.push(new Date(this.newData.endtime))
                return arr
            },
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
                if (this.$route.query.isEdit == 'true') {
                    seckedit(this.newData)

                } else {
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
                this.newData = this.item
            },
            nowCate: function() {
                goodsinfo({
                    id: this.newData.second_cateid
                }).then(req => {
                    console.log(req);
                })
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