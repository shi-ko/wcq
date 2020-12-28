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
        <el-upload action="/api" list-type="picture-card"
        :on-preview="handlePictureCardPreview"  :on-success='handleSuccess'>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
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
    <div id="demo1"></div>
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
    import wangEditor from 'wangeditor'
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


                editor: null,


                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        mounted() {
            this.reqCateList()
            this.reqSpecList()

            //
            const editor = new wangEditor(`#demo1`)
                // 配置 onchange 回调函数，将数据同步到 vue 中
            editor.config.onchange = (newHtml) => {
                    this.newData.description = newHtml
                }
                // 创建编辑器
            editor.create()
            this.editor = editor
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

            add: function() {

                if (this.$route.query.isEdit == 'true') {
                    goodsedit(this.newData)

                } else {
                    goodsadd(this.newData)

                }
                this.$emit('add')
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                this.newData.img = file.raw

            },

        },
        beforeDestroy() {
            // 调用销毁 API 对当前编辑器实例进行销毁
            this.editor.destroy()
            this.editor = null
        },
        watch: {
            item: function() {
                if (this.$route.query.isEdit == 'true') {
                    this.newData = this.item
                }
            },
        },

    }
</script>
<style lang="" scoped>
    .small {
        margin: 4px;
    }
</style>