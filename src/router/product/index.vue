<template>
  <div class="page product">
    <cmp-table v-bind="option" ref="rtable" @callback="callback">
      <tr slot="head">
        <td @click="clkOrder('name')">商品</td>
        <td @click="clkOrder('unit')">购买单位</td>
        <td @click="clkOrder('price')">单价</td>
        <td @click="clkOrder('rebate')">折扣</td>
        <td @click="clkOrder('stock')">库存</td>
        <td @click="clkOrder('pplace')">产地</td>
        <td @click="clkOrder('status')">操作</td>
      </tr>
      <tr slot="body" slot-scope="props">
        <td><img class="pic" :src="props.item.pic">{{props.item.name}}</td>
        <td>{{props.item.unit}}</td>
        <td>{{props.item.price}}</td>
        <td>{{props.item.rebate}}</td>
        <td>{{props.item.stock}}</td>
        <td>{{props.item.pplace}}</td>
        <td>
          <cmp-button theme="line" @click="clk_item(props.item)">修改</cmp-button>
          <cmp-button v-if="props.item.status===2" @click="clk_item(props.item)">上架</cmp-button>
          <cmp-button v-if="props.item.status===1" theme="warning" @click="clk_item(props.item)">下架</cmp-button>
          <cmp-button theme="red" @click="clk_del(props.item)">删除</cmp-button>
        </td>
      </tr>
    </cmp-table>
    <cmp-pagebar v-bind="pboption" v-model="pboption.index" @callback="cbkPagebar"></cmp-pagebar>
  </div>
</template>

<script>
  import {Table, Button, Pagebarpagesize} from 'web-base-ui';
  import {ajaxGetGoods} from '~root/data/ajax.js';
  
  export default {
    name: 'Product',
    components: {
      'cmpTable': Table,
      'cmpButton': Button,
      'cmpPagebar': Pagebarpagesize
    },
    data () {
      return {
        keyworld: '',
        option: {
          data: [],
          order: true
        },
        pboption: {
          theme: 'simple',
          // 当期页
          index: 1,
          // 总页数
          totalPage: 1,
          pagesizes: [
            30, 50, 100
          ],
          pagesize: 10,
          totalSize: 0
        }
      };
    },
    watch: {},
    mounted () {
      this.getDataList();
    },
    methods: {
      cbkPagebar (data) {
        this.pboption.pagesize = data.pagesize;
        this.pboption.index = data.currentPage;
        this.getDataList();
      },
      getDataList () {
        let _this = this;

        ajaxGetGoods({name: _this.keyworld, page: _this.pboption.index, size: _this.pboption.pagesize}, function (data) {
          _this.$set(_this.option, 'data', data.result);
          _this.$set(_this.pboption, 'totalSize', data.total);
          _this.$set(_this.pboption, 'totalPage', parseInt((data.total - 1) / _this.pboption.pagesize) + 1);
          console.log(_this.pboption);
        });
      }
    }
  };
</script>

<style lang="scss">
  .product {
    .wrapper-pagebar-pagesize .wrap-menu {
      top: calc(-100% - 50px) !important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .page {
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 0px 10px #e8e8e8;
    overflow: hidden;

    .wrap-table {
      height: calc(100% - 50px);
    }

    .pic {
      margin-right: 5px;
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    .button {
      margin-right: 5px;
      background-color: $theme;
    }

    .wrapper-pagebar-pagesize {
      padding: 10px;
    }
  }
</style>