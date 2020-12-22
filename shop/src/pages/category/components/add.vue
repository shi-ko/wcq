<template lang="">
  <div class="warp">
    <el-dialog title="提示" :visible.sync="flag" width="30%" :close-on-click-modal=false :show-close=false>
      <!-- :before-close="handleClose" -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
      <em><span>*</span>
        上级分类
        <el-select v-model="newData.pid">
          <el-option label="--请选择--" :value="-1" disabled></el-option>
          <el-option v-for="(item, index) in getList" :key="index" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </em>
      <em>
        <span>*</span>
        分类名称
        <el-input v-model="newData.catename"></el-input>

      </em>
      <em>
        图片
        <el-upload class="avatar-uploader" action="#" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </em>
      <em>
        状态
        <el-switch v-model="newData.status" :active-value=1 :inactive-value=2></el-switch>
      </em>
      <em>
      <el-upload action="/api" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success='handleSuccess'>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </em>
    </el-dialog>

  </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'

    import {
        addCategory,
        reqCategoryItem,
        updataCategoryItem,
        delCategory
    } from '../../../utils/request'
    import {
        successAlert,
        warningAlert
    } from '../../../utils/alert';

    export default {
        props: ['flag', 'getList'],
        data() {
            return {
                isShow: true,
                imageUrl: '',
                newData: {
                    pid: -1,
                    catename: '',
                    img: '',
                    status: 1
                },
                isEdit: false,

                dialogImageUrl: '',
                dialogVisible: false

            }
        },
        computed: {
            ...mapState('category', ['item']),
        },
        methods: {
            ...mapActions({

            }),
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                this.newData.img = file.raw

            },
            cancel: function() {
                this.newData = {
                    pid: -1,
                    catename: '',
                    img: '',
                    status: 1
                }
                this.$emit('close')
            },
            confirm: function() {
                console.log(this.isEdit);
                if (!this.isEdit) {
                    addCategory(this.newData).then((req, res) => {
                        if (req.data.code == 200) {
                            successAlert(req.data.msg)
                            this.newData = {
                                pid: -1,
                                catename: '',
                                img: '',
                                status: 1
                            }

                        } else {
                            warningAlert(req.data.msg)

                        }

                    })
                } else {
                    updataCategoryItem(this.newData).then(req => {
                        if (req.data.code == 200) {
                            successAlert(req.data.msg)
                            this.newData = {
                                pid: -1,
                                catename: '',
                                img: '',
                                status: 1
                            }

                        } else {
                            warningAlert(req.data.msg)

                        }
                    })
                }

                this.$emit('close')
            },

        },
        watch: {
            item: function() {
                this.newData = this.item
                console.log(this.item);
            }
        },
        mounted() {},
    }
</script>
<style lang="" scoped>
    .el-input {
        width: 312px;
        vertical-align: middle;
    }
    
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    
    em {
        display: block;
    }
</style>