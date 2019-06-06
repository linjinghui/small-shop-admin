<template>
  <div class="page order">
    <div class="wrap-operation" v-if="pboption.totalSize>0">
      <a>今日订单</a>
      <span class="jg">|</span>
      <label>订单状态：</label>
      <cmp-drop-menu v-bind="mnstatus" v-model="mnstatus.result" @cbkClkItem="cbkMenu">
        <span slot="line" slot-scope="props">{{props.item.name}}</span>
      </cmp-drop-menu>
      <span class="jg"> </span>
      <label>起止时间：</label>
      <cmp-laydate v-model="search.startTime" :option="laydate" placeholder="开始时间"></cmp-laydate>
      <span class="jg">至</span>
      <cmp-laydate v-model="search.endTime" :option="laydate" placeholder="结束时间"></cmp-laydate>
    </div>
    <div class="wrap-empty center-hv" v-if="pboption.totalSize===0"><i class="iconfont iconwushuju"></i>暂无订单~</div>
    <div class="wrap main" v-if="pboption.totalSize>0">
      <cmp-table v-bind="option" ref="rtable" @callback="callback">
        <tr slot="head">
          <td class="no-order" @click="clkOrder('id')">订单号</td>
          <td @click="clkOrder('money')">金额</td>
          <td @click="clkOrder('count')">数量</td>
          <td @click="clkOrder('status')">状态</td>
          <td @click="clkOrder('orderTime')">下单时间</td>
          <td @click="clkOrder('remark')">备注</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props" :class="{'active':option.activeId===props.item.id}" @click="clkItem(props.item)">
          <td>{{props.item.id}}</td>
          <td>{{props.item.money}}</td>
          <td>{{props.item.count}}</td>
          <td>{{props.item.status===1?'待接单':props.item.status===2?'备货中':props.item.status===3?'配送中':'已完成'}}</td>
          <td>{{props.item.orderTime}}</td>
          <td>{{props.item.remark}}</td>
          <td @click.stop>
            <cmp-button v-if="props.item.status===1" @click="clkQr(props.item)">确认订单</cmp-button>
            <span v-else>-</span>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar v-bind="pboption" v-model="pboption.index" @callback="cbkPagebar"></cmp-pagebar>
    </div>
    <div class="wrap goods" v-if="pboption.totalSize>0">
      <div class="wrap-empty center-hv" v-if="!orderInfo.name"><i class="iconfont iconwushuju"></i></div>
      <template v-else>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </template>
    </div>
    <div class="wrap user" v-if="pboption.totalSize>0">
      <div class="wrap-empty center-hv" v-if="!orderInfo.name"><i class="iconfont iconwushuju"></i></div>
      <template v-else>
        <p><label>收货人：</label><span>{{orderInfo.name}}</span></p>
        <p><label>联系电话：</label><span>{{orderInfo.mobile}}</span></p>
        <p><label>配送地址：</label><span>{{orderInfo.address}} {{orderInfo.doorAddress}}</span></p>
        <p><label>备注：</label><span>{{orderInfo.remark}}</span></p>
        <img class="qrcode" v-if="orderInfo.qrcodeUrl" :src="orderInfo.qrcodeUrl">
      </template>
    </div>
  </div>

</template>

<script>
  import {Table, Button, Pagebarpagesize, Dropmenu, Laydate} from 'web-base-ui';
  import {ajaxGetOrders, ajaxGetOrderInfo} from '~root/data/ajax.js';
  import QRCode from 'qrcode';
  
  export default {
    name: 'Order',
    components: {
      cmpTable: Table,
      cmpButton: Button,
      cmpPagebar: Pagebarpagesize,
      cmpDropMenu: Dropmenu,
      cmpLaydate: Laydate
    },
    data () {
      return {
        search: {
          id: '',
          status: '',
          startTime: '',
          endTime: ''
        },
        // 表格
        option: {
          data: [],
          order: true,
          activeId: ''
        },
        // 分页
        pboption: {
          theme: 'simple',
          // 当期页
          index: 1,
          // 总页数
          // totalPage: 1,
          pagesizes: [
            30, 50, 100
          ],
          pagesize: 10,
          totalSize: ''
        },
        // 订单状态下拉框
        mnstatus: {
          placeholder: '请选择',
          show: true,
          readonly: true,
          data: [{name: '待确认', value: 1}, {name: '备货中', value: 2}, {name: '配送中', value: 3}, {name: '已完成', value: 4}],
          result: []
        },
        // 日期
        laydate: {
          // year month time date datetime
          type: 'date',
          // 范围选择
          range: false,
          // 日期匹配
          format: 'yyyy-MM-dd',
          // 自定义主题色
          theme: '#2b8aff'
        },
        // 订单信息
        orderInfo: {},
        // 二维码地址
        qrcodeUrl: ''
      };
    },
    watch: {
      'search.startTime' (val) {
        this.pboption.index = 1;
        this.getDataList();
      },
      'search.endTime' (val) {
        this.pboption.index = 1;
        this.getDataList();
      }
    },
    beforeDestroy () {
      window.EVENTBUS.$off('search', this.ckbSearch);
    },
    mounted () {
      this.getDataList();
      window.EVENTBUS.$on('search', this.ckbSearch);
    },
    methods: {
      cbkPagebar (data) {
        this.pboption.pagesize = data.pagesize;
        this.pboption.index = data.currentPage;
        this.getDataList();
      },
      ckbSearch (data) {
        this.search.id = data;
        this.pboption.index = 1;
        this.getDataList();
      },
      clkOrder (orderBy) {
        this.$refs.rtable.setOrder(this.option.data, orderBy);
      },
      clkItem (info) {
        let _this = this;

        ajaxGetOrderInfo(info, function (data) {
          _this.$set(_this.option, 'activeId', info.id);
          _this.orderInfo = data.result;
          // 生成二维码
          QRCode.toDataURL('http://www.baidu.com?id=' + info.id, function (a, url) {
            _this.$set(_this.orderInfo, 'qrcodeUrl', url);
          });
        });
      },
      clkQr (info) {
        alert(1);
      },
      getDataList () {
        let _this = this;

        ajaxGetOrders(Object.assign(_this.search, {page: _this.pboption.index, size: _this.pboption.pagesize}), function (data) {
          _this.$set(_this.option, 'data', data.result);
          _this.$set(_this.pboption, 'totalSize', data.total);
        });
      },
      cbkMenu (data) {
        this.search.status = data[0].value;
        this.pboption.index = 1;
        this.getDataList();
      }
    }
  };
</script>

<style lang="scss">
  .order {
    .wrapper-pagebar-pagesize .wrap-menu {
      top: calc(-100% - 50px) !important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .page {

    > .wrap-operation {
      padding: 0!important;
      user-select: none;

      > a {
        text-decoration: underline;
        cursor: pointer;
      }

      > label {
        color: #bbb;
      }
      > .jg {
        margin: 0 10px;
        color: #bbb;
      }
      > .wrap-drop-menu, > .input {
        display: inline-block;
        width: 150px;
      }
    }

    > .wrap.main {
      height: calc(100% - 40px - 5px - 300px - 10px);
    }

    > .wrap.goods {
      float: left;
      margin-top: 10px;
      width: calc(100% - 400px - 10px);
      height: 300px;

      > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        > li {
          flex: 50%;
          flex-shrink: 0;
          border: solid 1px;
        }
      }
    }

    > .wrap.user {
      position: relative;
      float: right;
      margin-top: 10px;
      margin-left: 10px;
      padding: 10px;
      width: 400px;
      height: 300px;

      > p {
        display: flex;
        margin-top: 10px;
        
        > label {
          flex: 80px;
          flex-shrink: 0;
          text-align: right;
          color: #888;
          vertical-align: middle;
        }

        > span {
          flex: calc(100% - 80px);
          flex-shrink: 0;
          vertical-align: middle;
        }
      }

      > .qrcode {
        display: block;
        margin: 0 auto;
        margin-top: 10px;
        width: 100px;
        height: 100px;
      }
    }

    .wrap-table {
      height: calc(100% - 50px);

      tr.active {
        background-color: rgba(43, 138, 255, 0.4);
      }
    }

    .wrapper-pagebar-pagesize {
      padding: 10px;
    }
  }
</style>