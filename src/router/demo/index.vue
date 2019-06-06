<template>
  <div class="page order">
    <div class="wrap-operation">
      <cmp-button>xxx</cmp-button>
    </div>
    <div class="wrap-empty center-hv"><i class="iconfont iconwushuju"></i>暂无订单~</div>
    <div class="wrap main"></div>
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

    > .wrap.main {}
  }
</style>