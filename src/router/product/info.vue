<template>
  <cmp-sidebar v-model="show">
    <template slot="title">
      <div class="avater">
        <img :src="dataInfo.pic">
        <cmp-button :fileoption="fileOption" @cbk_file="cbkHeaderFile" />
      </div>
      <span>{{dataInfo.name}}</span>
    </template>
    <template slot="content">
      <nav>
        <a :class="{'active':active===0}" @click="active=0">基本信息</a>
        <a :class="{'active':active===1}" @click="active=1">预览</a>
      </nav>
      <div class="wrap-form" v-if="active===0">
        <div class="form-layer">
          <label class="star">轮播图:</label>
          <span class="f-dom">
            <img v-for="(url,index) in dataInfo.covers" :key="'lbt-'+index" :src="url" @click="clkDelCovers(url,index)">
            <cmp-button theme="line" v-if="dataInfo.covers&&dataInfo.covers.length<config.lenBanner" :fileoption="fileOption" @cbk_file="cbkCovers">+</cmp-button>
          </span>
        </div>
        <div class="form-layer">
          <label class="star">产品名称:</label>
          <cmp-input class="f-dom" maxlength="20" placeholder="请输入产品名称" v-model="dataInfo.name"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产品描述:</label>
          <cmp-input class="f-dom" maxlength="50" placeholder="请输入产品描述" v-model="dataInfo.desc"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产品单位:</label>
          <cmp-input class="f-dom" maxlength="20" placeholder="请输入购买单位，如：1kg-1.5kg/份" v-model="dataInfo.unit"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产品单价:</label>
          <cmp-input class="f-dom" maxlength="10" placeholder="请输入产品单价，如：10.5" v-model="dataInfo.price"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产品折扣:</label>
          <cmp-input class="f-dom" maxlength="5" placeholder="请输入产品折扣，如：9.5 即表示95折" v-model="dataInfo.rebate"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">折后价:</label>
          <cmp-input class="f-dom" readonly="true" v-model="dataInfo.rprice"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产品库存:</label>
          <cmp-input class="f-dom" maxlength="5" rule="number" placeholder="请输入产品库存" v-model="dataInfo.stock"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产地:</label>
          <cmp-input class="f-dom" maxlength="10" placeholder="请输入产品源产地" v-model="dataInfo.pplace"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">标签:</label>
          <span class="f-dom">
            <cmp-add-label v-model="dataInfo.label" lablength="3" maxlength="4" btnName="添加" :hisrecord="allLables"></cmp-add-label>
          </span>
        </div>
        <div class="form-layer">
          <label class="star">产品详情:</label>
          <span class="f-dom">
            <img v-for="(url,index) in dataInfo.dtlpics" :key="'cpxq-'+index" :src="url" @click="clkDelDtlpics(url,index)">
            <cmp-button theme="line" v-if="dataInfo.dtlpics&&dataInfo.dtlpics.length<config.lenDetailImg" :fileoption="fileOption" @cbk_file="cbkDtlpics">+</cmp-button>
          </span>
        </div>
      </div>
      <div class="wrap-preview" v-else>
        <div class="banner">
          <cmp-banner :nav="dataInfo.covers" navType="point" direction="hor">
            <img slot="page" class="page" v-for="(url,index) in dataInfo.covers" :key="'pv-lbt-'+index" :src="url">
          </cmp-banner>
        </div>
        <p class="name">{{dataInfo.name}}</p>
        <p class="desc">{{dataInfo.desc}}</p>
        <p class="wrap-price">
          <span class="rprice">￥{{dataInfo.rprice}}</span>
          <span class="price">￥{{dataInfo.price}}</span>
        </p>
        <div class="other"></div>
        <div class="wrap-detail">
          <header>商品详情</header>
          <img v-for="(url,index) in dataInfo.dtlpics" :key="'pv-cpxq-'+index" :src="url">
        </div>
      </div>
    </template>
    <template slot="footer">
      <cmp-button theme="line" @click="show=false">取消</cmp-button>
      <cmp-button theme="#2b8aff">保存</cmp-button>
    </template>
  </cmp-sidebar>
</template>

<script>
  import {Button, Input, Sidebar, Addlabel, Banner} from 'web-base-ui';
  import {mapState} from 'vuex';
  import {ajaxUploadImg, ajaxDelImg} from '~root/data/ajax.js';
  
  export default {
    name: 'Info',
    components: {
      'cmpButton': Button,
      'cmpInput': Input,
      'cmpSidebar': Sidebar,
      'cmpAddLabel': Addlabel,
      'cmpBanner': Banner
    },
    props: {
      value: {
        default: false
      },
      data: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data () {
      return {
        show: this.value,
        active: 0,
        dataInfo: this.data,
        fileOption: {
          accept: 'image/png, image/jpeg'
        },
        allLables: [{text: 'name-1', bgcolor: 'green'}, {text: 'name-2', bgcolor: 'purple'}, {text: 'name-3', bgcolor: 'blue'}],
        arr: [{text: 'name-1', bgcolor: 'green'}]
      };
    },
    computed: {
      ...mapState(['config'])
    },
    watch: {
      value (val) {
        this.show = val;
      },
      data (val) {
        this.dataInfo = val;
      },
      show (val) {
        this.$emit('input', val);
      },
      'dataInfo.price': {
        deep: true,
        handler: function (val) {
          this.countRprice();
        }
      },
      'dataInfo.rebate': {
        deep: true,
        handler: function (val) {
          this.countRprice();
        }
      }
    },
    beforeDestroy () {
      // 
    },
    mounted () {
      // 
    },
    methods: {
      clkHeader () {
        alert(1);
      },
      cbkHeaderFile (data) {
        this.$set(this.dataInfo, 'pic', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg');
      },
      // 上传产品轮播图
      cbkCovers (files) {
        let _this = this;

        if (_this.dataInfo.covers.length < _this.$store.state.config.lenBanner) {
          ajaxUploadImg(files[0], function (data) {
            _this.dataInfo.covers.push(data.result);
          });
        } else {
          _this.$tip({ show: true, text: '无法上传更多图片', theme: 'warning' });
        }
      },
      // 删除 产品轮播图
      clkDelCovers (url, index) {
        let _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提示',
          content: ' 确定删除该图片？',
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
              ajaxDelImg({url: url}, function () {
                _this.dataInfo.covers.splice(index, 1);
              }, function () {
                _this.dataInfo.covers.splice(index, 1);
              });
            }
          }
        });
      },
      // 上传产品详情图片
      cbkDtlpics (files) {
        let _this = this;

        if (_this.dataInfo.dtlpics.length < _this.$store.state.config.lenDetailImg) {
          ajaxUploadImg(files[0], function (data) {
            _this.dataInfo.dtlpics.push(data.result);
          });
        } else {
          _this.$tip({ show: true, text: '无法上传更多图片', theme: 'warning' });
        }
      },
      // 删除 上传产品详情图片
      clkDelDtlpics (url, index) {
        let _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提示',
          content: ' 确定删除该图片？',
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
              ajaxDelImg({url: url}, function () {
                _this.dataInfo.dtlpics.splice(index, 1);
              }, function () {
                _this.dataInfo.dtlpics.splice(index, 1);
              });
            }
          }
        });
      },
      // 计算折后价格
      countRprice () {
        let rprice = '';

        try {
          rprice = this.dataInfo.rebate / 10 * this.dataInfo.price;
          rprice = rprice.toFixed(2);
        } catch (error) {
          // 
        }
        this.$set(this.dataInfo, 'rprice', rprice);
      }
    }
  };
</script>

<style lang="scss">
  @import '~@/style/theme.scss';

  .wrap-aside {
    > header {
      position: relative;
      padding: 0 20px;
      height: 120px!important;
      line-height: 120px!important;
      overflow: hidden;
      border-bottom: 0!important;
      background-color: rgba(43, 138, 255, 0.03);

      > .avater {
        position: relative;
        display: inline-block;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        vertical-align: middle;
        cursor: pointer;
        overflow: hidden;

        > img {
          display: block;
          width: 100%;
          height: 100%;
        }

        > .button {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          opacity: 0;
        }
        > .button:hover,
        > .button:active  {
          opacity: 0!important;
        }
      }
    }
    > header:before,
    > header:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-color: rgba(43, 138, 255, 0.04);
    }
    > header:after {
      bottom: unset;
      top: 0px;
      right: -150px;
      background-color: rgba(43, 138, 255, 0.05);
    }

    > section {
      height: calc(100% - 120px - 60px)!important;

      > nav {
        display: flex;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border-bottom: solid 1px #f4f6f8;

        > a {
          position: relative;
          flex: 1;
          width: 0px;
          cursor: pointer;
        }
        > a.active {
          color: $theme;
        }
        > a.active:after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 100px;
          height: 2px;
          background-color: $theme;
        }
      }

      > .wrap-form {
        padding: 10px 20px;

        > .form-layer {
          margin-top: 10px;

          > label {
            color: #888;
          }

          > .f-dom {

            > input {
              padding-left: 0;
            }

            > img, > .button {
              display: inline-block;
              margin-right: 5px;
              margin-bottom: 5px;
              padding: 0!important;
              width: 80px;
              height: 80px;
              line-height: 80px!important;
              vertical-align: top;
              font-size: 40px;
              color: #ddd!important;
            }
          }

          

          
        }
      }

      > .wrap-preview {
        text-align: center;

        > .banner {
          margin-bottom: 5px;
          height: 300px;
          background-color: red;
        }

        > .name,
        > .desc,
        > .wrap-price {
          padding: 0 10px;
          line-height: 26px;
        }

        > .name {
          font-size: 18px;
        }

        > .wrap-price {
          > .rprice {
            font-size: 18px;
            color: #ff9000;
          }

          > .price {
            text-decoration: line-through;
          }
        }

        > .wrap-detail {
          > header {
            position: relative;
            margin-bottom: 2px;
            padding: 10px 0;
            color: $theme;
            border-bottom: solid 1px #f4f6f8;
          }
          > header:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 100px;
            height: 2px;
            background-color: $theme;
          }

          > img {
            display: block;
            margin-bottom: 5px;
            width: 100%;
          }
        }

      }
    }

    > footer .button {
      margin-right: 10px;
      padding: 0 15px!important;
      height: 32px;
      line-height: 32px!important;
    }
  }
</style>
<style scoped lang="scss">
  

  .wrap-aside {

  }
</style>