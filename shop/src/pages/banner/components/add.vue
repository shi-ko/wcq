<template lang="">
  <div>
    <h5>
      <p>
        <span>*</span>
        标题
        <el-input v-model="newData.title"></el-input>
      </p>
    </h5>
    <h5>
      <p>
       图片
       <img v-if='$route.query.isEdit == "true" && newData.img!=""' :src="'api/'+newData.img" alt="" class="small"> 
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
      状态<el-switch v-model="newData.status" active-value='1' inactive-value='2'>
      </el-switch>
    </h5>
    <h5>
      <router-link to="/banner">
        <el-button type="primary" @click='add'>添加</el-button>
      </router-link>
    </h5>
  </div>
</template>
<script>
    import {
        banneradd,
        banneredit
    } from '../../../utils/request.js'

    import {
        mapState,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                value: true,
                imageUrl: '',
                newData: {
                    title: '',
                    img: '',
                    status: '1'
                },
                dialogImageUrl: '',
                dialogVisible: false

            }
        },
        mounted() {},

        computed: {
            ...mapState('banner', ['item']),
            ...mapGetters('banner', ['getItem']),
        },
        methods: {
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                this.newData.img = file.raw

            },
            add: function() {
                if (this.$route.query.isEdit == 'true') {
                    banneredit(this.newData)

                } else {
                    banneradd(this.newData)

                }

                this.$emit('add')
            },

        },
        watch: {
            item: function() {
                console.log(this.item);
                this.newData = this.item
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