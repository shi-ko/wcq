<template lang="">
  <div class="warp">
        <el-card>
            <h1>登陆</h1>
      <el-input placeholder="请输入用户名" v-model="user" clearable>
      </el-input>

      <el-input placeholder="请输入密码" v-model="pass" clearable>
      </el-input>
      <br>
      <el-button type="primary" @click='login'>登陆</el-button>
     </el-card>

  </div>
</template>
<script>
    import {
        userlogin,
        useradd
    } from '../utils/request.js'
    export default {
        data() {
            return {
                user: null,
                pass: null

            }
        },
        methods: {
            login: function() {
                let obj = {
                    username: this.user,
                    password: this.pass
                }
                userlogin(obj).then(req => {
                    console.log(req);
                })
                this.$router.push('/home')
                    // let obj = {
                    //     roleid: 9,
                    //     username: 'wcq',
                    //     password: '123',
                    //     status: 1
                    // }
                    // useradd(obj).then(req => {
                    //     console.log(req);
                    // })

            }
        },
    }
</script>
<style lang="" scoped>
    .warp {
        width: 100%;
        height: 110%;
        margin-top: -70px;
        position: fixed;
        background: linear-gradient(to left, #2f3d5f, #563443);
    }
    
    .el-card {
        width: 500px;
        height: 300px;
        margin: 15% auto;
        text-align: center;
    }
    
    h1 {
        font-size: 29px;
        margin: 25px 0 10px;
    }
    
    .el-input,
    .el-button {
        width: 322px;
        height: 40px;
        margin: 9px;
    }
</style>