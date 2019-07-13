<template>
  <div class="page order-weight">
    <aside>
      <p v-for="(item,index) in orderList" :key="'item_'+index" :class="{'active':active===index}" @click="clkOrderItem(index,item)">订单 - {{item._id}}</p>
    </aside>
    <div>
      <cmp-table v-bind="option">
        <tr slot="head">
          <td>品名</td>
          <td>规格</td>
          <td>单价</td>
          <td>重量(公斤)</td>
          <td>操作</td>
        </tr>
        <tr slot="body" slot-scope="props" @click="clkLine(props.item)">
          <td>{{props.item.name}}</td>
          <td>{{props.item.specs_name}}</td>
          <td>{{props.item.rprice}}</td>
          <td><cmp-input clear="false" v-model="props.item.weight"></cmp-input></td>
          <td @click.stop>
            <cmp-button theme="line" @click="clkDybq(props.item)">打印标签</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <footer>
        <cmp-button @click="clkBack">退出</cmp-button>
        <cmp-button>暂存</cmp-button>
        <cmp-button @click="clkDyqd">打印清单</cmp-button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {Button, Table, Input} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetOrders, ajaxGetOrderInfo, ajaxUpdateOrderSpecs, ajaxSetOrderWaitfordelivery} from '~root/data/ajax.js';
  
  export default {
    name: 'OrderWeight',
    components: {
      cmpButton: Button,
      cmpTable: Table,
      cmpInput: Input
    },
    data () {
      return {
        active: '',
        orderList: [],
        // 配送信息
        consignees: {},
        option: {
          data: []
        }
      };
    },
    computed: {
      // 
    },
    watch: {
      // 
    },
    beforeDestroy () {
      // 
    },
    mounted () {
      this.getDataList();
    },
    methods: {
      clkOrderItem (index, info) {
        this.active = index;
        let _this = this;

        ajaxGetOrderInfo(info, function (data) {
          _this.consignees = data.result.order_consignees;
          let _data = data.result.order_product;

          _data.forEach(item => {
            item.weight = item.weight || '00.000';
          });
          _this.$set(_this.option, 'data', _data);
        });
      },
      // 行点击 调出称重器
      clkLine (data) {
        let weight = window.external.getWeight('R0001').toString();

        if (weight) {
          weight = JSON.parse(weight);
          this.$set(data, 'weight', weight[1].weight);
        }
      },
      // 打印标签
      clkDybq (good) {
        let _this = this;

        if (!parseInt(good.weight)) {
          this.$tip({ show: true, text: '请先点击行，对商品进行称重', theme: 'warning' });
        } else {
          good.money = (good.rprice * good.weight).toFixed(2);
          let jsonData = {
            PM: good.name, 
            GG: good.specs_name, 
            ZL: good.weight + '',
            CZY: '快鱼活鲜',
            SJ: dataFormat(new Date(), 'yyyy-MM-dd hh:mm')
          };
          
          window.external.printLable('lable.report', '1', JSON.stringify(jsonData));
          // 保存重量到数据库
          ajaxUpdateOrderSpecs(good, function (ret) {
            _this.$tip({ show: true, text: '重量保存成功', theme: 'success' });
          });
        }
      },
      // 打印清单
      clkDyqd () {
        let _this = this;
        let arr = this.option.data;
        let result = true;

        for (let i = 0;i < arr.length;i++) {
          if (!parseInt(arr[i].weight)) {
            result = false;
            break;
          }
        }
        if (arr.length > 0 && result) {
          // 商品都已经实称完成
          // 打印清单
          let m = [];
          let ssje = 0;

          arr.forEach(item => {
            let je = item.rprice * item.weight;

            m.push({
              PM: item.name, 
              DJ: item.rprice, 
              ZL: item.weight, 
              JE: je.toFixed(2)
            });
            ssje += je;
          });

          let jsonData = {
            DDH: arr[0].order_id,
            CKC: '1号',
            CZY: '快鱼活鲜',
            CKRQ: dataFormat(new Date(), 'yyyy-MM-dd hh:mm'),
            XDR: this.consignees.name,
            SJH: this.consignees.mobile,
            SSJE: ssje.toFixed(2),
            M: m
          };

          window.external.printPOS('pos.report', '1', JSON.stringify(jsonData));
          // 改变订单状态为待发货
          ajaxSetOrderWaitfordelivery([arr[0].order_id], ret => {
            _this.active = '';
            _this.option.data = [];
            _this.consignees = [];
            _this.getDataList();
          });
        } else if (!arr || arr.length === 0) {
          this.$tip({ show: true, text: '请先从左侧选择订单', theme: 'warning' });
        } else {
          this.$tip({ show: true, text: '还有商品未完成称重，请检查', theme: 'warning' });
        }
      },
      // 退出
      clkBack () {
        window.external.closeWindow();
      },
      getDataList () {
        let _this = this;

        ajaxGetOrders({status: 4, page: 1, size: 1000}, function (data) {
          _this.orderList = data.result.list;
        });
      }
    }
  };
</script>

<style lang="scss">
  .order-weight {
    .wrap-table td {
      height: 50px;
    }
    input {
      // line-height: 40px;
      border: 0!important;
      text-align: center;
      background-color: #fbfbfb;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';
  .page { 
    height: 100%;

    > aside {
      float: left;
      width: 300px;
      height: 100%;
      border-right: solid 1px #ddd;
      overflow-y: auto;
      background-color: #fbfbfb;
      user-select: none;

      > p {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: solid 1px #f4f6f8;
        cursor: pointer;
      }
      > p:not(.theme-b):hover {
        background-color: #f7f7f7;
      }
      > p.active {
        color: #2b8aff;
      }
    }

    > div {
      float: left;
      width: calc(100% - 300px);
      height: 100%;
      
      > .wrap-table {
        height: calc(100% - 100px);
        
        .input {
          width: 120px;
          font-size: 20px;
        }
      }
      > footer {
        display: flex;
        flex-shrink: 0;
        height: 100px;
        
        > .button {
          flex: 1;
          border-radius: 0;
          font-size: 30px;
        }
      }
    }
  }
</style>