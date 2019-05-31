<template>
  <div class="page index">
    <header>
      <cmp-input v-model="account" maxlength="50" placeholder="输入内容，按enter键进行搜索" class="search center-hv">
        <i class="cicon-search-cpt-chr center-v" slot="left"></i>
      </cmp-input>
      <div class="right">
        <a class="wrap-icon point"><i class="iconfont iconxiaoxi center-hv"></i></a>
        <a class="wrap-icon"><i class="iconfont icontuichu center-hv"></i></a>
      </div>
    </header>
    <aside>
      <div class="log"></div>
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg">
      <p class="name">张厚啊</p>
      <ul>
        <li v-for="(item,index) in nav.data" :key="'item-'+index" :class="{'active':nav.index===index}" @click="clkNav(index)">
          <i class="iconfont" :class="item.icon"></i>{{item.name}}
        </li>
      </ul>
      <p class="copyright">© copyright 2019</p>
    </aside>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import {Input} from 'web-base-ui';
  
  export default {
    name: 'Index',
    components: {
      cmpInput: Input
    },
    data () {
      return {
        nav: {
          index: '',
          data: [
            {name: '产品库管理', icon: 'iconchanpinguanli1', urlType: 2},
            {name: '订单管理', icon: 'icondingdan'},
            {name: '备货区', icon: 'iconRectangleCopy'},
            {name: '送货区', icon: 'iconsonghuo'}
          ]
        }
      };
    },
    watch: {},
    mounted () {
      this.clkNav(0);
    },
    methods: {
      clkNav (index) {
        this.$set(this.nav, 'index', index);
        this.$root.toPage('', this.nav.data[index].urlType);
      }
    }
  };
</script>

<style lang="scss">
  .page {
    .search > input {
      border: solid 1px #eee!important;
      border-radius: 20px!important;
    }
    .search > input:focus {
      border-color: #eee!important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .page {
    height: 100%;
    background-color: #f9f9f9;

    > header {
      position: relative;
      height: 50px;
      border-bottom: solid 1px #f4f6f8;
      color: #999;
      background-color: #fff;

      > .search {
        position: absolute!important;
        width: 340px;

        .cicon-search-cpt-chr {
          font-size: 20px;
          color: inherit;
          background-color: transparent;
        }
      }

      > .right {
        float: right;
        padding: 0 10px;
        width: calc(50% - 340px / 2 - 100px);
        height: 100%;
        text-align: right;

        > .wrap-icon {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 100%;
          cursor: pointer;

          > .iconfont {
            width: 24px;
            height: 24px;
            font-size: 24px;
          }
        }

        > .wrap-icon.point:after {
          content: '';
          position: absolute;
          bottom: 14px;
          right: 14px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: $theme;
        }

        > .wrap-icon:hover {
          background-color: #f4f6f8;
        }
      }
    }

    > aside {
      float: left;
      width: 200px;
      height: calc(100% - 50px);
      color: #999;
      background-color: #fff;
      box-shadow: 2px 4px 10px #e8e8e8;

      > .log {
        height: 80px;
        background-image: url('../../../static/favicon.png');
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
      }

      > img {
        display: block;
        margin: 10px auto;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      > .name {
        text-align: center;
        font-size: 16px;
        color: #333;
      }

      > ul {
        position: relative;
        margin-top: 40px;
        width: 100%;
        height: calc(100% - 80px - 70px - 20px - 22px - 40px - 40px);
        overflow: auto;

        > li {
          padding: 14px 20px 14px 10px;
          border-left-style: solid;
          border-left-width: 4px;
          border-left-color: transparent;
          border-top: solid 1px #f4f6f8;
          cursor: pointer;
          user-select: none;

          > .iconfont {
            display: inline-block;
            margin-right: 10px;
            font-size: 20px;
            vertical-align: middle;
          }
        }
        > li.active {
          color: $theme;
          border-left-color: $theme;
        }
      }

      > .copyright {
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }

    > section {
      float: left;
      padding: 20px;
      width: calc(100% - 200px);
      height: calc(100% - 50px);
      overflow: hidden;
    }
  }
</style>