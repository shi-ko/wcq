<template lang="">
  <div>
    <h5>
      <p>
        <span>*</span>
        规格名称
        <el-input v-model="newData.specsname"></el-input>
      </p>
    </h5>
    <h5>
      <p>
        <span>*</span>
        规格属性
        <el-input v-model="newSpecs">
          <el-button slot="append" type="primary" @click='newOne'>新增规格属性</el-button>
        </el-input>
      </p>
    </h5>
    <h5>
      <p>
        <span>*</span>
        规格属性
        <el-input>
          <el-tag v-for="(item, index) in arr" :key="index" slot="prepend" class="small" closable
            @close="handleClose(index)">
            {{item}}
          </el-tag>

          <el-button slot="append" type='danger' @click='toNull'>清空</el-button>
        </el-input>
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
        addSpecs,
        specsedit
    } from '../../../utils/request.js'

    import {
        mapState,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                value: true,
                newData: {
                    specsname: '',
                    attrs: '',
                    status: '1'
                },

                newSpecs: '',
                arr: []
            }
        },
        mounted() {},

        computed: {
            ...mapState('specs', ['item']),
            ...mapGetters('specs', ['getItem']),
        },
        methods: {
            add: function() {
                let str = JSON.stringify(this.arr)
                this.newData.attrs = str.slice(1, -1)

                if (this.$route.query.isEdit == 'true') {
                    specsedit(this.newData)

                } else {
                    addSpecs(this.newData)

                }

                this.$emit('add')
            },
            newOne: function() {
                this.arr.push(this.newSpecs)
                this.newSpecs = ''
            },
            handleClose: function(n) {
                this.arr.splice(n, 1)
            },
            toNull: function() {
                this.arr = []
            },

        },
        watch: {
            item: function() {
                console.log(this.item);
                this.newData = this.item
                this.arr = this.item.attrs.slice(1, -1).split(',')
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