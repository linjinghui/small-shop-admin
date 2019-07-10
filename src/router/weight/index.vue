<template>
  <div class="page weight">
    <header>
      <div><p><span>皮重</span><span>公斤</span><span>kg</span></p><cmp-input clear="false" v-model="weight_pz"></cmp-input></div>
      <div><p><span>重量</span><span>公斤</span><span>kg</span></p><cmp-input clear="false" v-model="weight"></cmp-input></div>
      <div><p><span>定量</span><span>公斤</span><span>kg</span></p><cmp-input clear="false" v-model="weight_dl" @focus="weight='00.000'"></cmp-input></div>
      <cmp-button @click="clkDybq">标签<br>打印</cmp-button>
    </header>
    <section>
      <ul>
        <li v-for="(item,index) in 30" :key="item" :style="{'height':liHeight+'px'}" :class="{'active':active===index}" @click="active=index">
          <img src="https://hcbeng.com/api/public/uploads/23bc-a998-ae6a.jpg">
          <p class="center-hv">比目鱼</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import {Button, Input} from 'web-base-ui';
  
  export default {
    name: 'Weight',
    components: {
      cmpButton: Button,
      cmpInput: Input
    },
    data () {
      return {
        active: '',
        weight_pz: '00.000',
        weight: '00.000',
        weight_dl: '00.000'
      };
    },
    computed: {
      liHeight: function () {
        return document.body.clientWidth / 7;
      }
    },
    watch: {
      weight () {
        this.weight_dl = '00.000';
      }
      // weight_dl () {
      //   this.weight = '00.000';
      // }
    },
    beforeDestroy () {
      // 
    },
    mounted () {
      // 
    },
    methods: {
      clkDybq () {
        let weight = parseFloat(this.weight);
        let weightDl = parseFloat(this.weight_dl);

        // alert(this.weight + ':' + weight + ';' + this.weight_dl + ';' + weightDl);
        if (this.active === '') {
          this.$tip({ show: true, text: '请选择需要称重的产品', theme: 'warning' });
        } else if (weight === 0 && weightDl === 0) {
          this.$tip({ show: true, text: '请把实物放入称重, 或者使用定量称重', theme: 'warning' });
        } else if (weight) {
          this.$tip({ show: true, text: '实称标签打印', theme: 'success' });
        } else if (weightDl) {
          this.$tip({ show: true, text: '定量标签打印', theme: 'success' });
        }
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
          font-size: 60px;
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
      background-color: antiquewhite;

      li {
        position: relative;
        float: left;
        width: 14.28%;
        height: 120px;
        cursor: pointer;

        > img {
          width: 100%;
          height: 100%;
        }

        > p {
          top: unset;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
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
  }
</style>