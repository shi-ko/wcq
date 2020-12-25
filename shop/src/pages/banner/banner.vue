<template lang="">
  <div>
    <router-link to="/banner/add?isEdit=false">
      <el-button type="primary" @click='add' v-show="flag">
        添加
      </el-button>
    </router-link>

    <router-view @add='add'></router-view>

  </div>
</template>
<script>
    export default {
        data() {
            return {
                flag: true,

            }
        },

        mounted() {

        },
        methods: {
            add: function() {
                console.log(111);
                this.flag = !this.flag

            },

        },
    }
</script>
<style lang="">

</style>