<template>
  <div class="page weight">
    <header>
      <div><p><span>皮重</span><span>公斤</span><span>kg</span></p><cmp-input class="numfont" placeholder="00.000" clear="false" rule="float" v-model="weight_pz"></cmp-input></div>
      <div><p><span>重量</span><span>公斤</span><span>kg</span></p><cmp-input class="numfont" placeholder="00.000" clear="false" rule="float" @focus="focusWeight" v-model="weight"></cmp-input></div>
      <div><p><span>定量</span><span>公斤</span><span>kg</span></p><cmp-input class="numfont" placeholder="00.000" clear="false" rule="float" @focus="focusWeightDl" v-model="weight_dl"></cmp-input></div>
      <cmp-button @click="clkDybq">标签<br>打印</cmp-button>
    </header>
    <section>
      <ul>
        <li v-for="(item,index) in goods" :key="item" :style="{'height':(liHeight+44)+'px'}" :class="{'active':active===index}" @click="clkGoodItem(index)">
          <div :style="'height:'+liHeight+'px;'">
            <img :src="item.avatar">
          </div>
          <p>{{item.name}}|{{item.specsInfo.name}}</p>
        </li>
      </ul>
    </section>
    <cmp-button class="btn-back" @click="clkBack">返回</cmp-button>
  </div>
</template>

<script>
  import {Button, Input} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetGoods, ajaxLogin, ajaxGetCaptchaBya} from '~root/data/ajax.js';
  
  export default {
    name: 'Weight',
    components: {
      cmpButton: Button,
      cmpInput: Input
    },
    data () {
      return {
        login: {
          account: 'kyhx',
          pwd: '888888',
          vcode: 'loginweight'
        },
        active: '',
        weight_pz: '',
        weight: '',
        weight_dl: '',
        goods: []
      };
    },
    computed: {
      liHeight: function () {
        return document.body.clientWidth / 7;
      }
    },
    beforeDestroy () {
      // 
    },
    mounted () {
      this.clkLogin();
    },
    methods: {
      focusWeight () {
        if (this.active === '') {
          this.$tip({ show: true, text: '请选择需要称重的产品', theme: 'warning' });
        } else {
          this.weight_dl = '';
          // 调用称重器
          let weight = window.external.getWeight('R0001').toString();

          if (weight) {
            weight = JSON.parse(weight);
            this.weight = weight[1].weight;
            this.weight_dl = '';
          }
        }
      },
      focusWeightDl () {
        this.weight = '';
      },
      // 点击产品调出称重器
      clkGoodItem (index) {
        this.active = index;
        // let weight = window.external.getWeight('R0001').toString();

        // if (weight) {
        //   weight = JSON.parse(weight);
        //   this.weight = weight[1].weight;
        //   this.weight_dl = '';
        // }
      },
      clkDybq () {
        let weight = parseFloat(this.weight);
        let weightDl = parseFloat(this.weight_dl);
        
        console.log(isNaN(this.weight), isNaN(this.weight_dl));
        if (this.active === '') {
          this.$tip({ show: true, text: '请选择需要称重的产品', theme: 'warning' });
        } else if (!this.weight && !this.weight_dl) {
          this.$tip({ show: true, text: '请把实物放入称重, 或者使用定量称重', theme: 'warning' });
        } else {
          let opName = '快鱼活鲜';
          let good = this.goods[this.active];
          let jsonData = {
            PM: good.name, 
            GG: good.specsInfo.name, 
            ZL: (weightDl || weight) + '',
            CZY: opName,
            SJ: dataFormat(new Date(), 'yyyy-MM-dd hh:mm')
          };
          
          window.external.printLable('lable.report', '1', JSON.stringify(jsonData));
        }
        
      },
      getDataList () {
        let _this = this;

        ajaxGetGoods({name: '', page: 1, size: 1000}, function (data) {
          let arr = data.result.list;
          let _arr = [];

          for (let i = 0;i < arr.length;i++) {
            arr[i].specs.forEach(item => {
              let info = JSON.parse(JSON.stringify(arr[i]));
              
              info.specsInfo = item;
              _arr.push(info);
            });
          }
          _this.goods = _arr;
        });
      },
      clkLogin () {
        let _this = this;

        ajaxGetCaptchaBya(1, () => {

          ajaxLogin(this.login, res => {
            _this.getDataList();
          }, res => {
            _this.$tip({ show: true, text: res.msg, theme: 'danger' });
          });

        });
      },
      clkBack () {
        window.external.closeWindow();
      }
    }
  };
</script>

<style lang="scss">
  .weight {
    input {
      line-height: 60px;
      border: 0!important;
      text-align: center;
      background-color: transparent;
    }
  }
</style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';
  .page {
    height: 100%;
    
    > header {
      display: flex;
      flex-shrink: 0;
      height: 100px;
      color: #fff;
      background-color: #333;

      > div {
        flex: calc((100% - 14.28%) / 3);

        > p {
          display: flex;
          padding: 5px;
          text-align: center;

          > span {
            flex: 1;
          } 
          > span:first-of-type {
            color: red;
            text-align: left;
          }
          > span:last-of-type {
            text-align: right;
          }
        }
        > .input {
          height: 60px;
          font-size: 50px;
        }
      }
      > .button {
        flex: 14.28%;
        font-size: 30px;
        color: red;
      }
    }
    > section {
      height: calc(100% - 100px);
      overflow-y: auto;
      user-select: none;

      li {
        position: relative;
        float: left;
        width: 14.28%;
        height: 120px;
        cursor: pointer;

        > div {
          width:100%;
          background-color: #000;

          > img {
            width: 100%;
            height: 100%;
          }
        }

        > p {
          top: unset;
          height: 44px;
          // line-height: 30px;
          text-align: center;
          color: #fff;
          // background-color: rgba(0, 0, 0, 0.5);
          background-color: #000;
        }
      }
      li.active > p {
        color: red;
        background-color: rgba(0, 0, 0, 0.6);
      }
      // li:not(.active):after {
      //   content: '';
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      //   background-color: rgba(0, 0, 0, 0.3);
      // }
    }
    > .btn-back {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 100px;
    }
  }
</style>