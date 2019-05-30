<template>
  <div class="page index">
    <header></header>
    <aside>
      <div class="log"></div>
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg">
      <p class="name">张厚啊</p>
      <ul>
        <li v-for="(item,index) in nav.data" :key="'item-'+index" :class="{'active':nav.index===index}" @click="clkNav(index,item)">{{item.name}}</li>
      </ul>
      <p class="copyright">© copyright 2019</p>
    </aside>
    <section>123</section>
  </div>
</template>

<script>
  // import {Button} from 'web-base-ui';
  
  export default {
    name: 'Index',
    components: {
      // cmpButton: Button
    },
    data () {
      return {
        nav: {
          index: 0,
          data: [
            {name: '产品库管理', urlType: 2},
            {name: '订单管理'},
            {name: '备货区'},
            {name: '送货区'}
          ]
        }
      };
    },
    watch: {},
    mounted () {
      // 
    },
    methods: {
      clkNav (index, info) {
        this.$set(this.nav, 'index', index);
        this.$root.toPage('', info.urlType);
      }
    }
  };
</script>

<style lang="scss"></style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .page {
    height: 100%;
    background-color: #f9f9f9;

    > header {
      height: 50px;
      border-bottom: solid 1px #f4f6f8;
      background-color: #fff;
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
          padding: 14px 20px 14px 16px;
          border-left-style: solid;
          border-left-width: 4px;
          border-left-color: transparent;
          border-top: solid 1px #f4f6f8;
          cursor: pointer;
          user-select: none;
        }
        > li.active {
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