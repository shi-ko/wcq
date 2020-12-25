<template lang="">
  <div>
    <el-button type="primary" @click="add" >添加</el-button>
    <v-list :getList='getList' @edit='edit'></v-list>
    <v-add :flag='flag' @close='add' :getList='getList' ref="reference"></v-add>
   
  </div>
</template>
<script>
    import vAdd from './components/add.vue'
    import vList from './components/list.vue'
    import {
        successAlert
    } from '../../utils/alert';
    import {
        reqCategory
    } from '../../utils/request';

    import {
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'

    export default {
        components: {
            vAdd,
            vList
        },
        computed: {
            ...mapGetters({
                'getList': 'category/getList'
            })
        },
        mounted() {
            this.reqList()
        },
        methods: {
            ...mapActions({
                'reqList': 'category/reqList'
            }),

            ...mapMutations({
                'changeList': 'category/changeList'
            }),
            add: function(params) {
                this.flag = !this.flag
                this.reqList()
                this.$refs.reference.isEdit = false
            },
            edit: function(params) {
                this.flag = !this.flag
                console.log(this.$refs.reference);
                this.$refs.reference.isEdit = true
            }

        },
        data() {
            return {
                flag: false,
            }
        },


    }
</script>
<style lang="" scoped>
    .el-button {
        margin-bottom: 20px;
    }
</style>