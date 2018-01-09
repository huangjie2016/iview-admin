<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    overflow:hidden;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .header-avator-con{
    float:right;
    font-size:16px;
    line-height:60px;
    margin-right:15px;
  }
  .txt{
    display:block;
    text-align:center;
    height:20px;
    line-height:20px;
    color:#000;
  }
  .txt:hover{
    color:#2b85e4;
  }
  .astyle{
    display:block;
    color:#fff;
  }
</style>
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            用户管理
          </template>
          <MenuItem name="1-1" ><a class="astyle" @click="test()">table1</a></MenuItem>
          <MenuItem name="1-2"><router-link to="/table">table2</router-link></MenuItem>
          <MenuItem name="1-3"><router-link to="/table">table3</router-link></MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            系统管理
          </template>
          <MenuItem name="2-1"><router-link to="/table">table4</router-link></MenuItem>
          <MenuItem name="2-2"><router-link to="/table">table5</router-link></MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            更多管理
          </template>
          <MenuItem name="3-1"><router-link to="/table">table6</router-link></MenuItem>
          <MenuItem name="3-2"><router-link to="/table">table7</router-link></MenuItem>
        </Submenu>
      </Menu>
      </Col>
      <Col :span="spanRight">
      <!--顶部导航-->
      <div class="layout-header">
        <Button type="text" style="float:left;width:50px;line-height:60px;" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
        <div style="float:left; font-size:16px;line-height:60px;">
          <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
        </div>
        <div class="header-avator-con" style="">
          <!--<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->
          <!--<lock-screen></lock-screen>-->
          <!--<message-tip v-model="mesCount"></message-tip>-->
          <!--<theme-switch></theme-switch>-->

          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <a class="txt">个人中心</a>
                  <a class="txt" @click="toLogin()">退出登录</a>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <!--路由导航-->
      <div class="tags-con">
        <bread-router :pageTagsList="pageTagsList"></bread-router>
      </div>
      <!--主体部分-->
      <div class="layout-content">
        <div class="layout-content-main">
          <!--<router-link to="/table">表格信息</router-link>-->
          <!--<router-link to="/user">用户信息</router-link>-->
          <router-view/>
        </div>
      </div>
      <div class="layout-copy">
        2017-2020 &copy; TalkingData
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import breadcrumbNav from '@/components/breadcrumb';
  import breadRouter from '@/components/breadrouter';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        spanLeft: 5,
        spanRight: 19,
        userName: 'admin',
        isFullScreen: false,
        routerList: '',  //路由集合
      }
    },
    components: {
      breadcrumbNav,
      breadRouter
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      },
      currentPath () {
        return this.$store.state.currentPath; // 当前面包屑数组
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList; // 打开的页面的页面对象
      },
      mesCount () {
        return this.$store.state.messageCount;
      },
      avatorPath () {
        return localStorage.avatorImgPath;
      },

    },
    mounted(){
      this.getToken();
    },
    methods: {
      test() {
        this.$store.commit('addPageOpenedList',
          {
            title: 'table',
            path: '/table',
            name: 'table'
          });
        this.$router.push({path: '/table'});
      },
      toLogin() {
        this.$router.push({path: '/login'});
      },
      getToken() {
        //console.log(Cookies.get('access'));
//        if(Cookies.get('access') != 0){
//          this.toLogin();
//        }
      },
      fullscreenChange (isFullScreen) {
        // console.log(isFullScreen);
      },
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index');
          this.$router.push({
            name: 'ownspace_index'
          });
        } else if (name === 'loginout') {
          // 退出登录
          this.$store.commit('logout', this);
          this.$store.commit('clearOpenedSubmenu');
          this.$router.push({
            name: 'login'
          });
        }
      },
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      }
    }
  }
</script>
