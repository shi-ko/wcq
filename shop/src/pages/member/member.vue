<template lang="">
    <div>
      <router-view @add='add' ></router-view>
  
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