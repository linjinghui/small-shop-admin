<template>
  <div class="page delivery">
    <!-- <div class="wrap-empty center-hv"><i class="iconfont iconwushuju"></i>暂无订单~</div> -->
    <div class="wrap">
      <cmp-table v-bind="option">
        <tr slot="head">
          <td class="no-order">订单号</td>
          <td class="no-order">金额</td>
          <td class="no-order">数量</td>
          <td class="no-order">状态</td>
          <td class="no-order">下单时间</td>
          <td class="no-order">送达时间</td>
          <td class="no-order">备注</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props" :class="{'active':option.activeId===props.item._id}">
          <td>{{props.item._id}}</td>
          <td>{{props.item.money}}</td>
          <td>{{props.item.count}}</td>
          <!-- // 订单状态 0: 已删除, 1：待确认，2：待备货，3：备货中，4：待分拣，5：待配送，6：配送中，7：已完成 -->
          <td>{{props.item.status===0?'已删除':props.item.status===1?'待确认':props.item.status===2?'待备货':props.item.status===3?'备货中':props.item.status===4?'待分拣':props.item.status===5?'待配送':props.item.status===6?'配送中':'已完成'}}</td>
          <td>{{utlDateStr(props.item.time)}}</td>
          <td>{{props.item.arriveTime}}</td>
          <td>{{props.item.remark || '-'}}</td>
          <td @click.stop>
            <template v-if="props.item.status===5">
              <cmp-button @click="clkPs(props.item)">开始配送</cmp-button>
              <!-- <cmp-button theme="line" @click="clkQr(props.item)">打印送货单</cmp-button> -->
            </template>
            <span v-else>-</span>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar v-bind="pboption" v-model="pboption.index" @callback="cbkPagebar"></cmp-pagebar>
    </div>
  </div>
</template>

<script>
  import {Table, Button, Checkbox, Pagebarpagesize} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetOrders, ajaxSetOrderDelivering} from '~root/data/ajax.js';
  
  export default {
    name: 'Delivery',
    components: {
      cmpTable: Table,
      cmpPagebar: Pagebarpagesize,
      cmpCheckbox: Checkbox,
      cmpButton: Button
    },
    data () {
      return {
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
        }
      };
    },
    computed: {
      // 
    },
    watch: {},
    beforeDestroy () {
      // 
    },
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

        ajaxGetOrders({status: 5, page: _this.pboption.index, size: _this.pboption.pagesize}, function (data) {
          _this.$set(_this.option, 'data', data.result.list);
          _this.$set(_this.pboption, 'totalSize', data.result.total);
        }, () => {
          _this.$set(_this.option, 'data', []);
          _this.$set(_this.pboption, 'totalSize', 0);
        });
      },
      utlDateStr (date, formatStr) {
        return dataFormat(new Date(date), formatStr || 'yyyy-MM-dd hh:mm');
      },
      clkPs (data) {
        let _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提示',
          content: ' 确定开始配送该订单？',
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
              ajaxSetOrderDelivering([data._id], function (data) {
                _this.$tip({ show: true, text: '订单已设置为配送中，请尽快安排人员配送！', theme: 'success' });
                _this.getDataList();
              });
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .delivery {
    .wrapper-pagebar-pagesize .wrap-menu {
      top: calc(-100% - 50px) !important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';
  .page {

    > .wrap {

      height: 100%;
      background-color: #ffffff;
      
      > .wrap-table {
        height: calc(100% - 50px);

        td:nth-of-type(8) {
          width: 260px;
        }

        .button {
          margin-right: 10px;
        }
      }

      > .wrapper-pagebar-pagesize {
        padding: 10px;
      }
    }

  }
</style>