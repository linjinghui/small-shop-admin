import Mock from 'mockjs';

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
});

// 获取商品列表
Mock.mock(/(\/admin\/goods)/, {
  'msg': '',
  'code': 200,
  // 总记录数
  'total': 32,
  'result|30': [{
    'id': '@id()',
    'pic': "@image(80x80)",
    // 广告图片
    'covers|1-2': ['https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'],
    // 商品名称
    'name|1': '@ctitle(3, 8)',
    // 商品描述
    'desc': '@ctitle(10, 50)',
    // 购买单位
    'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
    // 单价
    'price|1': [3.5, 5, 11, 12.5, 22.3],
    // 折扣
    'rebate|1': [9.5, 8.5, 10, 5, 4.5],
    // 真实单价|折后单价
    'rprice|1': [3.5, 5, 11, 12.5, 22.3],
    // 库存
    'stock|1': [10, 5, '', 50],
    // 标签
    'label|0-3': [
      { 
        'text|1': ['折扣', '清仓', '极鲜'], 
        'bcolor|1': ['#bf2058', '#ced642', '#fbb519'], 
        'color': '#000'
      }
    ],
    // 产地
    'pplace|1': ['福建', '连江', '苔箓', '北郊'],
    // 商品详情图片
    'dtlpics|1-5': ["@image(200x280)"],
    // 1: 已上架 2: 已下架 3: 已删除
    'status|1': [1, 2]
  }]
});