<template>
  <div class="page login">
    <div class="main center-hv" @click="showHelp=false">
      <div class="left">
        <!-- 导航 -->
        <div class="nav" >
          <span v-for="(info,index) in nav.data" :key="'ln-'+index" :class="{'active':nav.active===index}" :style="{'border-color':nav.active===index&&theme}">{{info}}</span>
        </div>
        <!-- 登录表单 -->
        <div class="login wrap-form">
          <div class="form-layer">
            <cmp-input v-model="account" maxlength="30" placeholder="请输入帐号" autofocus="true">
              <i class="iconfont iconzhanghao center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer">
            <cmp-input v-model="pwd" maxlength="50" type="password" placeholder="请输入密码">
              <i class="iconfont iconwebicon204 center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer vcode">
            <cmp-input v-model="vcode" maxlength="6" placeholder="请输入验证码">
              <i class="iconfont iconyanzhengma center-v" slot="left"></i>
            </cmp-input>
            <img class="center-hv" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559131287523&di=2a7f8363295c8d25e950b51fcfde93d9&imgtype=0&src=http%3A%2F%2Fwww.xiaobaixitong.com%2Fd%2Ffile%2Fhelp%2F2018-08-06%2Ff15ce5d652d8da38e9e0e384f35b39d7.png">
          </div>
          
          <cmp-button :theme="theme" @click="login">立即登录</cmp-button>
        </div>
      </div>
      <div class="right center-hv" v-if="showHelp" @click.stop>
        <p :style="'border-bottom:solid 1px '+borderColor">微信扫码添加</p>
        <img src="../../images/dev.jpg">
        <small>请使用微信扫码添加开发为好友，进行咨询</small>
      </div>
      <small class="help center-hv">如需帮助，请<a @click.stop="showHelp=!showHelp">联系开发</a></small>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {Input, Button} from 'web-base-ui';
  
  export default {
    name: 'Login',
    components: {
      cmpButton: Button,
      cmpInput: Input
    },
    data () {
      return {
        nav: {
          active: 0,
          data: ['登录', '注册']
        },
        showHelp: false,
        account: '',
        pwd: '',
        vcode: '',
        optionBreadcrumbs: {
          list: [
            {name: 'nav1', disabled: true}, {name: 'nav2'}, {name: 'nav3', disabled: true}, {name: 'nav4'}
          ]
        }
      };
    },
    computed: {
      ...mapState(['theme', 'borderColor'])
    },
    mounted: function () {
      // let _this = this;

      // console.log(this.$store.state.user);      
      // setTimeout(() => {
      //   _this.$store.commit('setAge');
      // }, 3000);
    },
    methods: {
      login: function () {
        this.$root.toPage('', 1);
      },
      stip: function () {
        this.$tip({ show: true, text: '提示内容', theme: 'warning' });
      },
      sload: function () {
        this.$loading({ show: true, text: ' 加载中...', modal: true });
      },
      sconfirm: function () {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提示',
          content: ' 确定删除？',
          type: 'warning',
          stl: {
            header: {
              // left|center
              'text-align': 'left'
            },
            section: {
              // left|center|right
              'text-align': 'center'
            },
            footer: {
              // left|center|right
              'text-align': 'center'
            }
          },
          buttons: [{
            text: '取消1',
            theme: 'line'
          }, {
            text: '确定2',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
          }
        });
      },
      sprompt: function () {
        var _this = this;
        
        this.$prompt({
          show: true,
          modal: true,
          heading: '自定义标题1',
          placeholder: '请输入姓名',
          stl: {
            footer: {
              // left|center|right
              'text-align': 'right'
            }
          },
          buttons: [{
            text: '取消2',
            theme: 'line'
          }, {
            text: '确定3',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$prompt({ show: false });
            console.log('======Prompt callback22=====');
            console.log(data);
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .login {
    .input > .iconfont {
      font-size: 20px !important;;
      background-color: transparen !important;
    }
    .vcode .cicon-cross-crle-chr-cpt {
      right: inherit!important;
      left: 140px!important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .iconfont {
    color: inherit!important;
    background-color: transparent!important;
  }

  .page {
    height: 100%;
    background: radial-gradient(rgba(57, 93, 255, 0.2), #fff);

    

    > .main {
      width: 600px;
      height: 382px;
      background-image: url('../../images/login-1.png');
      background-repeat: no-repeat;
      background-position: right;

      > .left {
        position: relative;
        float: left;
        margin-top: 26px;
        padding: 20px;
        width: calc(100% - 285px);
        height: calc(100% - 26px);
        background-color: #fff;

        > .nav {
          margin-bottom: 20px;
          border-bottom: solid 1px #f4f6f8;
          > span {
            display: inline-block;
            padding: 5px 8px;
            cursor: pointer;
          }
          > span.active {
            font-weight: bold;
            border-bottom: solid 2px $theme;
          }
        }

        .form-layer {
          position: relative;
          margin-top: 10px;
        }

        .form-layer.vcode {
          > img {
            left: inherit;
            width: 100px;
            height: 24px;
            cursor: pointer;
          }
        }

        .button {
          margin-top: 20px;
          width: 100%;
          background: $theme;
        }
      }

      > .right {
        left: unset;
        right: 23px;
        width: 240px;
        height: 280px;
        background-color: #fff;

        > p {
          padding: 14px 10px;
          font-size: 16px;
          border: solid 1px #f4f6f8;
        }

        > img {
          display: block;
          margin: 0 auto;
          margin-top: 20px;
          width: 140px;
          height: 140px;
        }

        > small {
          display: block;
          margin: 0 auto;
          margin-top: 10px;
          width: 140px;
          text-align: center;
          color: #999;
        }
      }

      > .help {
        top: unset;
        left: unset;
        bottom: 10px;
        right: 75px;
        width: 130px;
        height: 20px;
        color: #ccc;

        > a {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }

    .cut-diamond { border-style: solid; border-top-color: transparent;border-right-color: transparent;border-left-color: transparent;border-bottom-color: inherit;border-width: 0 25px 25px 25px; height: 0; width: 50px; box-sizing: content-box; position: relative; } 
    .cut-diamond:after { content: ""; position: absolute; top: 25px; left: -25px; width: 0; height: 0; border-style: solid; color: inherit;border-right-color: transparent;border-left-color: transparent;border-bottom-color: transparent;border-width: 70px 50px 0 50px; }
  }

</style>
