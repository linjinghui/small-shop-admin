<template>
  <div class="page order">
    <div class="wrap-operation">
      <a @click="clkToday">今日订单</a>
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
          <td @click="clkOrder('time')">下单时间</td>
          <td @click="clkOrder('arriveTime')">送达时间</td>
          <td @click="clkOrder('remark')">备注</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props" :class="{'active':option.activeId===props.item._id}" @click="clkItem(props.item)">
          <td>{{props.item._id}}</td>
          <td>{{props.item.money}}</td>
          <td>{{props.item.count}}</td>
          <!-- // 订单状态 0: 已删除, 1：待确认，2：待备货，3：备货中，4：待分拣，5：待配送，6：配送中，7：已完成 -->
          <td>{{props.item.status===0?'已删除':props.item.status===1?'待确认':props.item.status===2?'待备货':props.item.status===3?'备货中':props.item.status===4?'待分拣':props.item.status===5?'待配送':props.item.status===6?'配送中':'已完成'}}</td>
          <td>{{utlDateStr(props.item.time)}}</td>
          <td>{{props.item.arriveTime}}</td>
          <td>{{props.item.remark || '-'}}</td>
          <td @click.stop>
            <cmp-button style="margin-right:10px;" v-if="props.item.status===1" @click="clkQr(props.item)">确认订单</cmp-button>
            <cmp-button theme="danger" @click="clkDel(props.item)">删除订单</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar v-bind="pboption" v-model="pboption.index" @callback="cbkPagebar"></cmp-pagebar>
    </div>
    <!-- 订单商品列表 -->
    <div class="wrap goods" v-if="pboption.totalSize>0">
      <div class="wrap-empty center-hv" v-if="!orderInfo._id"><i class="iconfont iconwushuju"></i></div>
      <template v-else>
        <ul>
          <li v-for="(info,index) in orderInfo.order_product" :key="'good-'+index">
            <div class="wrap good" :class="{'turn':info.edit}">
              <i class="iconfont iconbianji1" @click.stop="clkEdit(info)"></i>
              <img :src="info.avatar">
              <p>{{info.name}} <span style="font-weight:bold;">x{{info.count}}</span><br>{{info.specs_name}}<br><span>￥{{info.rprice}}</span></p>
              <span>
                <template v-if="info.money">{{info.money}}元</template>
                <template v-if="info.weight">/{{info.weight}}斤</template>
              </span>
                <!-- 100/500斤 -->
            </div>
            <div class="wrap wrap-form horiz center-hv">
              <i class="cicon-cross iconfont" @click.stop="info.edit=false"></i>
              <i class="cicon-tick iconfont" @click.stop="clkConfirm(info)"></i>
              <div class="form-layer">
                <label class="star">实称重量(斤):</label>
                <cmp-input class="f-dom" maxlength="10" rule="float" placeholder="请输入实称重量" v-model="info._weight" @keyup="changeWeight(info)"></cmp-input>
              </div>
              <div class="form-layer">
                <label class="star">实称价格:</label>
                <cmp-input class="f-dom" maxlength="10" rule="float" placeholder="请输入实称价格" v-model="info._money"></cmp-input>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>
    <!-- 订单配送信息 -->
    <div class="wrap user" v-if="pboption.totalSize>0">
      <div class="wrap-empty center-hv" v-if="!orderInfo._id"><i class="iconfont iconwushuju"></i></div>
      <template v-else>
        <p><label>收货人：</label><span>{{orderInfo.order_consignees.name}}</span></p>
        <p><label>联系电话：</label><span>{{orderInfo.order_consignees.mobile}}</span></p>
        <p><label>配送地址：</label><span>{{orderInfo.order_consignees.address}} {{orderInfo.order_consignees.doorAddress}}</span></p>
        <p><label>备注：</label><span>{{orderInfo.remark}}</span></p>
        <img class="qrcode" v-if="orderInfo.qrcodeUrl" :src="orderInfo.qrcodeUrl">
      </template>
    </div>
  </div>

</template>

<script>
  import {Table, Button, Pagebarpagesize, Dropmenu, Laydate, Input} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetOrders, ajaxGetOrderInfo, ajaxUpdateOrderSpecs, ajaxConfirmOrder, ajaxDelOrderInfo} from '~root/data/ajax.js';
  import QRCode from 'qrcode';
  
  export default {
    name: 'Order',
    components: {
      cmpTable: Table,
      cmpButton: Button,
      cmpPagebar: Pagebarpagesize,
      cmpDropMenu: Dropmenu,
      cmpLaydate: Laydate,
      cmpInput: Input
    },
    data () {
      return {
        name: '',
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
          pagesize: 30,
          totalSize: ''
        },
        // 订单状态下拉框
        mnstatus: {
          placeholder: '请选择',
          show: true,
          readonly: true,
          // 订单状态 0: 已删除, 1：待确认，2：待备货，3：备货中，4：待分拣，5：待配送，6：配送中，7：已完成 -->
          data: [{name: '全部', value: ''}, {name: '待确认', value: 1}, {name: '待备货', value: 2}, {name: '备货中', value: 3}, {name: '待分拣', value: 4}, {name: '待配送', value: 5}, {name: '配送中', value: 6}, {name: '已完成', value: 7}],
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
          let _data = data.result;
          
          //  设置激活项
          _this.$set(_this.option, 'activeId', info._id);
          _this.orderInfo = _data;
          // 生成二维码
          QRCode.toDataURL('http://www.baidu.com?id=' + info.id, function (a, url) {
            _this.$set(_this.orderInfo, 'qrcodeUrl', url);
          });
        });
      },
      clkQr (data) {
        let _this = this;

        ajaxConfirmOrder(data, function (ret) {
          _this.$tip({ show: true, text: '订单确认成功', theme: 'success' });
          // 已确认，待备货状态
          _this.$set(data, 'status', 2);
        }); 
      },
      clkDel (orderInfo) {
        let _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提示',
          content: ' 确定删除该订单？',
          type: 'warning',
          stl: {
            header: {'text-align': 'center'},
            section: {'text-align': 'center'},
            footer: {'text-align': 'center'}
          },
          buttons: [{text: '取消', theme: 'line'}, {text: '确定', theme: '#2b8aff'}],
          callback: function (data) {
            _this.$confirm({ show: false });
            if (data.text === '确定') {
              ajaxDelOrderInfo(orderInfo, function (ret) {
                _this.$tip({ show: true, text: '订单删除成功', theme: 'success' });
                _this.getDataList();
              }); 
            }
          }
        });
      },
      getDataList () {
        let _this = this;

        this.orderInfo = {};
        ajaxGetOrders(Object.assign(_this.search, {page: _this.pboption.index, size: _this.pboption.pagesize}), function (data) {
          _this.$set(_this.option, 'data', data.result.list);
          _this.$set(_this.pboption, 'totalSize', data.result.total);
        }, () => {
          _this.$set(_this.option, 'data', []);
          _this.$set(_this.pboption, 'totalSize', 0);
        });
      },
      clkToday () {
        this.search = {
          id: '',
          status: '',
          startTime: this.utlDateStr(new Date(), 'yyyy-MM-dd'),
          endTime: this.utlDateStr(new Date(), 'yyyy-MM-dd')
        };
        this.getDataList();
      },
      cbkMenu (data) {
        this.search.status = data[0].value;
        this.pboption.index = 1;
        this.getDataList();
      },
      clkEdit (data) {
        this.$set(data, 'edit', true);
      },
      clkConfirm (data) {
        let _this = this;
        
        if (data._money && data._weight) {
        
          this.$confirm({
            show: true,
            modal: true,
            heading: '提示',
            content: ' 确定要更新该订单商品价格？',
            type: 'warning',
            stl: {
              header: {'text-align': 'center'},
              section: {'text-align': 'center'},
              footer: {'text-align': 'center'}
            },
            buttons: [{text: '取消', theme: 'line'}, {text: '确定', theme: '#2b8aff'}],
            callback: function (ret) {
              _this.$confirm({ show: false });
              if (ret.text === '确定') {
                _this.$set(data, 'edit', false);
                _this.$set(data, 'money', data._money);
                _this.$set(data, 'weight', data._weight);
                ajaxUpdateOrderSpecs(data, function (ret) {
                  _this.$tip({ show: true, text: '价格变更成功', theme: 'success' });
                  _this.getDataList();
                }); 
              }
            }
          });
      
        } else {
          _this.$set(data, 'edit', false);
        }
      },
      changeWeight (data) {
        if (!isNaN(data._weight)) {
          this.$set(data, '_money', (data._weight * data.rprice).toFixed(2));
        }
      },
      countMoney (data) {
        return this.$root.countMoney({
          count: data.count, 
          price: data.rprice
        });
      },
      utlDateStr (date, formatStr) {
        return dataFormat(new Date(date), formatStr || 'yyyy-MM-dd hh:mm');
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
          position: relative;
          float: left;
          width: 50%;
          overflow: hidden;
          border: solid 1px #f4f6f8;

          > .wrap > .iconfont {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            text-align: center;
            color: #fff;
            background-color: #ddd;
            cursor: pointer;
            z-index: 3;
          }
          > .wrap > .cicon-cross {
            right: 26px;
          }
          > .wrap > .cicon-tick {
            background-color: $theme;

          }

          > .wrap.good {
            position: relative;
            padding: 5px;
            line-height: 24px;
            font-size: 0;
            transform-origin: left bottom;
            transition: transform .2s;
            background-color: #fff;
            z-index: 2;

            > img, > p, > span {
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
            }

            > img {
              width: 80px;
              height: 80px;
            }

            > p {
              padding: 5px 10px;
              width: calc(100% - 80px - 140px);
            }

            > span {
              width: 140px;
              text-align: center;
            }

          }
          > .wrap.good.turn {
            transform: rotate(-90deg);
          }
          > .wrap.wrap-form {
            padding: 5px;
            z-index: 1;

            > .form-layer {
              margin: 0 auto;
              margin-bottom: 5px;
              width: 300px;
            }
          }
        }
      }

      .price {
        color: $theme;
      }
      .price:before {
        content: '￥';
      }
      .price.del {
        color: #888;
        text-decoration: line-through;
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

  @keyframes rollIn {
    0%{
      opacity: 0;
      transform: translate3d(-100%, 0, 0) rotate(-120deg);
    }
    to{
      opacity: 1;
      transform: translateZ(0);
    }
  }
</style>