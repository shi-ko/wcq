<template>
  <el-container>
  <el-aside width="150px">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" :unique-opened="true" router>
       <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
<el-menu-item index="/menu">菜单管理</el-menu-item>
<el-menu-item index="/role">角色管理</el-menu-item>
<el-menu-item index="/manager">管理员管理</el-menu-item>
</el-submenu>
<el-submenu index="2">
    <template slot="title">
          <i class="el-icon-location"></i>
          <span>商城管理</span>
        </template>
    <el-menu-item index="/category">商品分类</el-menu-item>
    <el-menu-item index="/specs">商品规格</el-menu-item>
    <el-menu-item index="/goods">商品管理</el-menu-item>
    <el-menu-item index="/member">会员管理</el-menu-item>
    <el-menu-item index="/banner">轮播管理</el-menu-item>
    <el-menu-item index="/seckill">秒杀活动</el-menu-item>
</el-submenu>
</el-menu>
</el-aside>
<el-container>
    <el-header height="80px">
        <span>admin</span>
        <el-button type="primary">退出</el-button>
    </el-header>
    <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
    </el-main>
</el-container>
</el-container>
</template>

<script>
    export default {}
</script>

<style scoped>
    .el-aside {
        height: 100vh;
        background: #333;
        color: white;
    }
    
    .el-header {
        /* height: 80px; */
        background: #B3C0D1;
        text-align: right;
        line-height: 80px;
    }
    
    .el-breadcrumb {
        margin-bottom: 20px;
    }
</style>