<template>
  <div class="page order-weight">
    <aside>
      <p v-for="(item,index) in 24" :key="'item_'+index" :class="{'theme-b':active===index}" @click="active=index">订单{{index}}</p>
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
        <tr slot="body" slot-scope="props">
          <td>{{props.item.name}}</td>
          <td>{{props.item.specsName}}</td>
          <td>{{props.item.specsPrice}}</td>
          <td><cmp-input clear="false" v-model="props.item.weight"></cmp-input></td>
          <td>
            <cmp-button theme="line">打印标签</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <footer>
        <cmp-button>退出</cmp-button>
        <cmp-button>暂存</cmp-button>
        <cmp-button>打印清单</cmp-button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {Button, Table, Input} from 'web-base-ui';
  
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
        option: {
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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
      // 
    },
    methods: {
      // 
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