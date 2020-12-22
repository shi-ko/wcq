<template lang="">
  <div>
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
        商品名称
        <el-input v-model="newData.goodsname">
        </el-input>
      </p>
    </h5>
    <h5>
      <p>
        价格
        <el-input v-model="newData.price">
        </el-input>
      </p>
    </h5>
    <h5>
      <p>
        市场价格
        <el-input v-model="newData.market_price">
        </el-input>
      </p>
    </h5>
    <h5>
      <p>
        图片
        <!-- <el-input>
        </el-input> -->
      </p>
    </h5>
    <h5>
      <p>
        商品规格
        <el-select v-model="newData.specsid">
          <el-option v-for="(item,index) in specList" :key="item.index" :label="item.specsname" :value="item.id">
          </el-option>
        </el-select>
      </p>
    </h5>
    <h5>
      <p>
        规格属性
        <el-select v-model="newData.specsattr">

          <el-option v-for="(item,index) in nowAttr" :key="index" :label="item" :value="index">
          </el-option>
        </el-select>
      </p>
    </h5>
    <h5>
      <p>
        是否新品
        <el-radio v-model="newData.isnew" :label="1">是</el-radio>
        <el-radio v-model="newData.isnew" :label="2">否</el-radio>
      </p>
    </h5>
    </h5>
    <h5>
      <p>
        是否热卖
        <el-radio v-model="newData.ishot" :label="1">是</el-radio>
        <el-radio v-model="newData.ishot" :label="2">否</el-radio>
      </p>
    </h5>
    </h5>
    <h5>
      <p>
        状态
        <el-switch v-model="newData.status"></el-switch>
      </p>
    </h5>
    <h5>
      <router-link to="/goods">
      <el-button type="primary" @click='add'>添加</el-button>
      </router-link>
    </h5>
  </div>
</template>
<script>
    import {
        goodsadd,
        goodsedit
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
                    description: "",
                    first_cateid: null,
                    goodsname: "",
                    img: "",
                    ishot: null,
                    isnew: null,
                    market_price: null,
                    price: null,
                    second_cateid: null,
                    specsattr: "",
                    specsid: null,
                    status: null
                },

            }
        },
        mounted() {
            this.reqCateList()
            this.reqSpecList()

        },

        computed: {
            ...mapState('goods', ['item']),

            ...mapGetters({
                'cateList': 'category/getList',
                'cateItem': 'category/getItem',
                'specList': 'specs/getList',
                'specItem': 'specs/getItem',
                'goodsItem': 'goods/getItem'
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
            nowAttr: function() {
                if (this.newData.specsid !== null) {
                    for (let n in this.specList) {
                        if (this.specList[n].id == this.newData.specsid) {
                            return this.specList[n].attrs
                        }
                    }
                }
                return
            }
        },
        methods: {
            //获取一级分类 下拉框
            ...mapActions({
                'reqCateList': 'category/reqList',
                'reqCateItem': 'category/reqItem',
                'reqSpecList': 'specs/reqList',
                'reqSpecItem': 'specs/reqItem',
                'reqGoodsItem': 'goods/reqItem'
            }),
            //根据一级分类获取二级分类


            //获取属性  下拉框


            // 根据属性 获取规格 下拉框

            add: function() {

                if (this.$route.query.isEdit == 'true') {
                    goodsedit(this.newData)

                } else {
                    goodsadd(this.newData)

                }
                this.$emit('add')
            },




        },
        watch: {
            item: function() {
                if (this.$route.query.isEdit == 'true') {
                    this.newData = this.item
                    console.log(this.item);

                }
            }
        },

    }
</script>
<style lang="" scoped>
    .small {
        margin: 4px;
    }
</style>