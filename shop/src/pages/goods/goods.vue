<template lang="">
  <div>
    <router-link to="/goods/add?isEdit=false">
      <el-button type="primary" @click='add' v-show="flag">
        添加
      </el-button>
    </router-link>

    <router-view @add='add' ref="reference"></router-view>

  </div>
</template>
<script>
    import vList from './components/list.vue'
    export default {
        data() {
            return {
                flag: true,

            }
        },

        mounted() {

        },
        components: {
            vList: vList
        },
        methods: {
            add: function() {
                this.flag = !this.flag

            },

        },
    }
</script>
<style lang="">

</style>