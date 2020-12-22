<template lang="">
  <div class="warp">
    <el-row>
      <el-col :span='2'>分类编号</el-col>
      <el-col :span='6'>分类名称</el-col>
      <el-col :span='6'>图片</el-col>
      <el-col :span='5'>状态</el-col>
      <el-col :span='5'>操作</el-col>
    </el-row>

    <template v-for="(item, index) in getList">

      <el-row :name="index" :key="index">
        <el-col :span='2'>
          <div @click='isShow()'>
            {{item.id}}&nbsp;&nbsp;&nbsp; &nbsp;
            <i v-if='item.children' class="el-icon-arrow-down"></i>
          </div>
        </el-col>
        <el-col :span='6'>{{item.catename}}</el-col>
        <el-col :span='6'>
          <img :src="item.img" alt="">
        </el-col>
        <el-col :span='5'>
          <el-button v-if='item.status==1' type="primary" plain @click='open(item.id)'>禁用</el-button>
          <el-button v-else type="primary" plain @click='open(item.id)'>启用</el-button>
        </el-col>
        <el-col :span='5'>
          <el-button type="primary" plain @click='edit(item.id)'>编辑</el-button>
          <el-button type="danger" plain @click='del(item.id)'>删除</el-button>
        </el-col>
        <br>
        <el-row v-if='item.children' v-for="(i, n) in item.children" :key="n">
          <el-collapse-transition>
            <p>
              <span>{{i.id}}</span>
              <span>{{i.catename}}</span>
              <span> <img :src="'/api'+i.img" alt="">
              </span> 
              <span>
                <el-button v-if='i.status==1' type="primary" plain @click='open(i.id)'>禁用</el-button>
                <el-button v-else type="primary" plain @click='open(i.id)'>启用</el-button>
              </span>
              <span>
                <el-button type="primary" plain @click='edit(i.id)'>编辑</el-button>
                <el-button type="danger" plain @click='del(i.id)'>删除</el-button>
              </span>
            </p>
          </el-collapse-transition>
        </el-row>
      </el-row>
    </template>

</div>
</template>
<script>
    import {
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'
    import {
        reqCategory,
        reqCategoryItem,
        updataCategoryItem,
        delCategory
    } from '../../../utils/request';
    import {
        successAlert,
        warningAlert
    } from '../../../utils/alert';
    export default {
        props: ['getList', ],
        methods: {
            ...mapActions({
                'reqList': 'category/reqList',
                'reqItem': 'category/reqItem'
            }),
            isShow(ev) {
                var ev = event
                var target = ev.target || ev.srcElement
                let col = $(target).parentsUntil('.warp')[2]
                if (target.nodeName == 'I') {
                    $(target).toggleClass('el-icon-arrow-up')
                    $(target).toggleClass('el-icon-arrow-down')
                }
                $(col).find('p').fadeToggle()
            },
            open(n) {
                reqCategoryItem({
                    id: n
                }).then((req, res) => {
                    let obj = req.data.list
                    obj.id = n
                    obj.status == 1 ? obj.status = 2 : obj.status = 1
                    updataCategoryItem(obj).then((req, res) => {
                        this.reqList()
                    })
                })
            },
            edit(n) {
                this.$emit('edit')
                this.reqItem(n)


            },
            del(n) {
                delCategory({
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
    div {
        font-size: 16px;
        overflow: hidden;
    }
    
    div .el-col {
        padding: 10px;
        margin-left: -1px;
    }
    
    div .el-row {
        width: 100%;
    }
    
    p {
        display: grid;
        grid-template-columns: 56px 175px 562px 79px 526px
    }
    
    p span {
        justify-self: center;
    }
</style>