<template>
  <div class="page order">
    <div class="wrap-operation">
      今日订单|订单状态|下单时间
      <!-- <cmp-button></cmp-button> -->
    </div>
    <div class="wrap-main">
      <!-- 订单管理<br>
      ID|姓名|手机|总价|配送地址|备注<br>
      详情展示 -->
      <div class="wrap-empty center-hv"><i class="iconfont iconwushuju"></i>暂无订单~</div>
    </div>
  </div>
</template>

<script>
  import {Button} from 'web-base-ui';
  
  export default {
    name: 'Index',
    components: {
      cmpButton: Button
    },
    data () {
      return {};
    },
    watch: {},
    beforeDestroy () {
      // 
    },
    mounted () {
      // 
    },
    methods: {}
  };
</script>

<style lang="scss"></style>
<style scoped lang="scss">
  @import '~@/style/theme.scss';

  .page {
    > .wrap-operation {}

    > .wrap-main {}
  }
</style>