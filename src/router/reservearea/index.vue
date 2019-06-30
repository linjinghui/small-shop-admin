<template>
  <div class="page reservearea">
    <!-- <div class="wrap-empty center-hv"><i class="iconfont iconwushuju"></i>暂无订单~</div> -->
    <div class="wrap left">
      <cmp-table v-bind="option">
        <tr slot="head">
          <td class="no-order">
            <cmp-checkbox v-model="selectFull" @click="clkCheckFull">订单号</cmp-checkbox>
          </td>
          <td class="no-order">数量</td>
          <td class="no-order">状态</td>
          <td class="no-order">下单时间</td>
          <td class="no-order">备注</td>
        </tr>
        <tr slot="body" slot-scope="props" :class="{'active':option.activeId===props.item._id}" @click="clkItem(props.item)">
          <td><cmp-checkbox v-model="props.item.checked" @click="clkCheck(props.item)">{{props.item._id}}</cmp-checkbox></td>
          <td>{{props.item.count}}</td>
          <td>{{props.item.status===2?'待备货':props.item.status===3?'备货中':'-'}}</td>
          <td>{{utlDateStr(props.item.time)}}</td>
          <td>{{props.item.remark || '-'}}</td>
        </tr>
      </cmp-table>
      <cmp-pagebar v-bind="pboption" v-model="pboption.index" @callback="cbkPagebar"></cmp-pagebar>
    </div>
    <div class="wrap right">
      <div class="wrap-empty center-hv" v-if="chooseData.length===0"><i class="iconfont iconwushuju"></i>请从左侧选择订单~</div>
      <section id="prtzoom" v-if="chooseData.length>0">
        <p style="padding:20px 0;text-align:center;font-size:20px;">备货单</p>
        <table style="width:100%;text-align:center;">
          <tr style="height:40px;border-bottom:solid 1px #ddd;">
            <td>序号</td><td>商品</td><td>名称</td><td>规格</td><td>数量</td>
          </tr>
          <tr style="height:50px;border-bottom:solid 1px #ddd;" v-for="(item,index) in chooseData" :key="item">
            <td>{{index+1}}</td>
            <td>
              <img width="34px" :src="item.avatar">
            </td>
            <td>{{item.name}}</td>
            <td>{{item.specs_name}}</td>
            <td>{{item.count}}</td>
          </tr>
        </table>
      </section>
      <footer v-if="chooseData.length>0">
        <cmp-button prnt="#prtzoom" @click="clkBh">备货</cmp-button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {Table, Button, Checkbox, Pagebarpagesize} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetReserveOrders} from '~root/data/ajax.js';
  
  export default {
    name: 'Reservearea',
    components: {
      cmpTable: Table,
      cmpPagebar: Pagebarpagesize,
      cmpCheckbox: Checkbox,
      cmpButton: Button
    },
    data () {
      return {
        selectFull: false,
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
      chooseData () {
        let _arr = [];
        let obj = {};
        let arr = this.option.data;

        arr.forEach(item => {
          if (item.checked) {
            item.order_product.forEach(opitem => {
              let _key = opitem.specs_id;
              let _value = obj[_key];

              if (_value) {
                // 已在, 更新数量
                _value.count += opitem.count;
                obj[_key] = _value;
              } else {
                obj[_key] = JSON.parse(JSON.stringify(opitem));
              }
              
            });
          }
        });
        for (const key in obj) {
          _arr.push(obj[key]);
        }
        console.log(_arr);
        return _arr;
      }
    },
    watch: {},
    beforeDestroy () {
      // 
    },
    mounted () {
      this.getDataList();
    },
    methods: {
      clkCheckFull () {
        this.utlSetCheck(this.option.data, this.selectFull);
      },
      clkCheck (data) {
        if (data.checked) {
          let ret = JSON.stringify(this.option.data).match(/"checked":true/g);

          if (ret && ret.length === this.option.data.length) {
            this.selectFull = true;
          }
        } else {
          this.selectFull = false;
        }
      },
      cbkPagebar (data) {
        this.pboption.pagesize = data.pagesize;
        this.pboption.index = data.currentPage;
        this.getDataList();
      },
      clkBh () {
        alert(1);
      },
      getDataList () {
        let _this = this;

        ajaxGetReserveOrders({page: _this.pboption.index, size: _this.pboption.pagesize}, function (data) {
          _this.$set(_this.option, 'data', _this.utlSetCheck(data.result.list, false));
          _this.$set(_this.pboption, 'totalSize', data.result.total);
        }, () => {
          _this.$set(_this.option, 'data', []);
          _this.$set(_this.pboption, 'totalSize', 0);
        });
      },
      utlDateStr (date, formatStr) {
        return dataFormat(new Date(date), formatStr || 'yyyy-MM-dd hh:mm');
      },
      utlSetCheck (obj, checked) {
        if (typeof checked === 'undefined') {
          checked = false;
        }
        if (obj instanceof Array) {
          obj.forEach(item => {
            item.checked = checked;
          });
        } else {
          obj.checked = checked;
        }
        return obj;
      }
    }
  };
</script>

<style lang="scss">
  .reservearea {
    .wrapper-pagebar-pagesize .wrap-menu {
      top: calc(-100% - 50px) !important;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';
  .page {
    > .wrap {
      float: left;
      height: 100%;
      background-color: #ffffff;
    }
    > .wrap.left {
      width: 60%;      
      
      > .wrap-table {
        height: calc(100% - 50px);

        tr.active {
          background-color: rgba(43, 138, 255, 0.4);
        }
        td:nth-of-type(1) {
          width: 34%;
        }
      }

      > .wrapper-pagebar-pagesize {
        padding: 10px;
      }
    }
    > .wrap.right {
      width: 40%;
      background-color: #fbfbfb;

      > section {
        height: calc(100% - 50px);
        overflow: auto;
      }
      > footer {
        padding: 0 10px;
        height: 50px;
        text-align: right;

        > .button {
          margin-top: 10px;
        }
      }
    }
  }
</style>