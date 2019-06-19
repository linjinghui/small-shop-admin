<template>
  <div class="page login">
    <div class="main center-hv" @click="showHelp=false">
      <div class="left">
        <!-- 导航 -->
        <div class="nav" >
          <span v-for="(info,index) in nav.data" :key="'ln-'+index" :class="{'active':nav.active===index}" @click="clkNav(index)">{{info}}</span>
        </div>
        <!-- 登录表单 -->
        <div class="login wrap-form" v-if="nav.active===0">
          <div class="form-layer">
            <cmp-input v-model="login.account" maxlength="30" placeholder="请输入帐号" autofocus="true">
              <i class="iconfont iconzhanghao center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer">
            <cmp-input v-model="login.pwd" maxlength="50" type="password" placeholder="请输入密码">
              <i class="iconfont iconwebicon204 center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer vcode">
            <cmp-input v-model="login.vcode" maxlength="6" placeholder="请输入验证码" @enter="clkLogin">
              <i class="iconfont iconyanzhengma center-v" slot="left"></i>
            </cmp-input>
            <img class="img center-hv" :src="login.vcodeUrl" @click="getCaptcha(1)"/>
          </div>
          <cmp-button @click="clkLogin">立即登录</cmp-button>
        </div>
        <!-- 注册表单 -->
        <div class="regist wrap-form" v-if="nav.active===1">
          <div class="form-layer">
            <cmp-input v-model="regist.account" maxlength="30" placeholder="输入注册帐号" autofocus="true">
              <i class="iconfont iconzhanghao center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer">
            <cmp-input v-model="regist.name" maxlength="10" placeholder="输入店铺名称">
              <i class="iconfont iconcard center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer">
            <cmp-input v-model="regist.pwd" maxlength="50" type="password" placeholder="输入密码">
              <i class="iconfont iconwebicon204 center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer">
            <cmp-input v-model="regist.cpwd" maxlength="50" type="password" placeholder="确认密码">
              <i class="iconfont iconwebicon204 center-v" slot="left"></i>
            </cmp-input>
          </div>
          <div class="form-layer vcode">
            <cmp-input v-model="regist.vcode" maxlength="6" placeholder="输入验证码">
              <i class="iconfont iconyanzhengma center-v" slot="left"></i>
            </cmp-input>
            <img class="img center-hv" :src="regist.vcodeUrl" @click="getCaptcha(2)"/>
          </div>          
          <cmp-button @click="clkRegist">注册</cmp-button>
        </div>
      </div>
      <div class="right center-hv" v-if="showHelp" @click.stop>
        <p>微信扫码添加</p>
        <img src="../../images/dev.jpg">
        <small>请使用微信扫码添加开发为好友，进行咨询</small>
      </div>
      <small class="help center-hv">如需帮助，请<a @click.stop="showHelp=!showHelp">联系开发</a></small>
    </div>
  </div>
</template>

<script>
  import {Input, Button} from 'web-base-ui';
  import {ajaxGetCaptcha, ajaxLogin, ajaxRegist} from '~root/data/ajax.js';
  
  export default {
    name: 'Login',
    components: {
      cmpButton: Button,
      cmpInput: Input
    },
    data () {
      return {
        nav: {
          active: '',
          data: ['登录']
          // data: ['登录', '注册']
        },
        showHelp: false,
        login: {
          account: '',
          pwd: '',
          vcode: '',
          vcodeUrl: ''
        },
        regist: {
          account: '',
          pwd: '',
          cpwd: '',
          vcode: '',
          vcodeUrl: ''
        }
      };
    },
    computed: {},
    mounted: function () {
      this.clkNav(0);
    },
    methods: {
      getCaptcha: function (type) {
        if (type === 1) {
          this.$set(this.login, 'vcodeUrl', ajaxGetCaptcha(type));
        } else {
          this.$set(this.regist, 'vcodeUrl', ajaxGetCaptcha(type));
        }
      },
      clkNav (index) {
        this.$set(this.nav, 'active', index);
        this.getCaptcha(index + 1);
      },
      clkLogin: function () {
        let _this = this;

        ajaxLogin(this.login, res => {
          _this.$root.toPage('', 1);
        }, res => {
          _this.$tip({ show: true, text: res.msg, theme: 'danger' });
          (res.code === 400) && _this.getCaptcha(1);
        });
      },
      clkRegist: function () {
        let _this = this;

        ajaxRegist(this.regist, res => {
          _this.$tip({ show: true, text: '注册成功', theme: 'success' });
          setTimeout(() => {
            _this.regist = {};
            _this.clkNav(0);
          }, 1000);
        });
      },
      // ===============
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
      line-height: 32px;
      font-size: 20px !important;
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
          > .img {
            left: inherit;
            width: 100px;
            height: 32px;
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
