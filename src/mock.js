import Mock from 'mockjs';

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
});

// 获取商品详情
// Mock.mock(/(\/admin\/product\/)/, {
//   'msg': '',
//   'code': 200,
//   'result': {
//     'id': '@id()',
//     'avatar': "@image(80x80)",
//     // 广告图片
//     'cover|1-2': ['https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'],
//     // 商品名称
//     'name|1': '@ctitle(3, 8)',
//     // 商品描述
//     'desc': '@ctitle(10, 50)',
//     // 购买单位
//     // 'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
//     // 单价
//     // 'price|1': [3.5, 5, 11, 12.5, 22.3],
//     // 折扣
//     'rebate|1': [9.5, 8.5, 10, 5, 4.5],
//     // 真实单价|折后单价
//     // 'rprice|1': [3.5, 5, 11, 12.5, 22.3],
//     // 库存
//     // 'stock|1': [10, 5, '', 50],
//     'specs|1-3': [{
//       'name': '@ctitle(3, 8)',
//       'price|1': [3.5, 5, 11, 12.5, 22.3],
//       'stock|1': [10, 5, '', 50]
//     }],
//     // 标签
//     'label|0-3': [
//       { 
//         'text|1': ['折扣', '清仓', '极鲜'], 
//         'bgcolor|1': ['#bf2058', '#ced642', '#fbb519'], 
//         'color': '#000'
//       }
//     ],
//     // 产地
//     'origin_place|1': ['福建', '连江', '苔箓', '北郊'],
//     // 商品详情图片
//     'detail|1-5': ["@image(200x280)"],
//     // 1: 已上架 2: 已下架 3: 已删除
//     'status|1': [1, 2],
//     // 是否推荐商品
//     'recommend|1': [true, false]
//   }
// });

// 获取商品列表
// Mock.mock(/(\/admin\/product)/, {
//   'msg': '',
//   'code': 200,
//   'result': {
//     // 总记录数
//     'total': 32,
//     'list|30': [{
//       'id': '@id()',
//       'avatar': "@image(80x80)",
//       // 商品名称
//       'name|1': '@ctitle(3, 8)',
//       // 购买单位
//       // 'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
//       // 单价
//       // 'price|1': [3.5, 5, 11, 12.5, 22.3],
//       // 折扣
//       'rebate|1': [9.5, 8.5, 10, 5, 4.5],
//       // 真实单价|折后单价
//       // 'rprice|1': [3.5, 5, 11, 12.5, 22.3],
//       // 库存
//       // 'stock|1': [10, 5, '', 50],
//       'specs|1-3': [{
//         'name': '@ctitle(3, 8)',
//         'price|1': [3.5, 5, 11, 12.5, 22.3],
//         'stock|1': [10, 5, '', 50]
//       }],
//       // 产地
//       'origin_place|1': ['福建', '连江', '苔箓', '北郊'],
//       // 1: 已上架 2: 已下架 3: 已删除
//       'status|1': [1, 2],
//       // 是否推荐商品
//       'recommend|1': [true, false]
//     }]
//   }
// });

// 商品上架
Mock.mock(/(\/admin\/goods\/uppershelf)/, {
  'msg': '',
  'code': 200,
  'result': true
});

// 商品下架
Mock.mock(/(\/admin\/goods\/lowershelf)/, {
  'msg': '',
  'code': 200,
  'result': true
});

// 商品删除
Mock.mock(/(\/admin\/goods\/delete)/, {
  'msg': '',
  'code': 200,
  'result': true
});

// 商品设置推荐状态
Mock.mock(/(\/admin\/goods\/recommend)/, {
  'msg': '',
  'code': 200,
  'result': true
});

// 上传图片
// Mock.mock(/(\/admin\/upload\/img)/, {
//   'msg': '',
//   'code': 200,
//   'result|1': ['https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg', 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg']
// });

// 删除上传的图片
// Mock.mock(/(\/admin\/upload\/delete)/, {
//   'msg': '',
//   'code': 200,
//   'result': true
// });

// 新增，编辑商品信息
// Mock.mock(/(\/admin\/product\/save)/, {
//   'msg': '',
//   'code': 200,
//   'result': '@id()'
// });

// 获取订单详情
Mock.mock(/(\/admin\/orders\/info)/, {
  'msg': '',
  'code': 200,
  'result': {
    'id': '@id()',
    // 订单状态 1：待接单，2：备货中，3：配送中，4：已完成
    'status|1': [1, 2, 3, 4],
    // 总数量
    'count': 10,
    // 金额
    'money': 100,
    'orderTime': '@date()',
    'remark': '@string()',
    // 商品列表
    'goods|1-5': [{
      'id': '@id()',
      'pic': "@image(80x80)",
      'name': '@ctitle(3, 8)',
      'unit|1': ['1kg-1.5kg/份', '2-2.5g/个', '3.5元/斤'],
      'count|1': [1, 2, 3],
      // 订购价格|折后价格
      'rprice|1': [3.5, 5, 11, 12.5, 22.3],
      // 最新价格
      'nprice|1': ['', 5, 11, 12.5, 22.3]
      // // 商品总价
      // 'money': 123,
      //  重量
      // 'weight': ''
    }],
    // 收货人名称
    'name': '@name()',
    // 收货人电话
    'mobile': /^1[385][1-9]\d{8}/,
    // 收货地址
    'address': '@ctitle(10, 20)',
    // 收货门牌地址
    'doorAddress': '@ctitle(5, 10)'
  }
});

// 获取订单列表
Mock.mock(/(\/admin\/orders)/, {
  'msg': '',
  'code': 200,
  // 总记录数
  'total': 132,
  'result|30': [{
    'id': '@id()',
    // 订单状态 1：待接单，2：备货中，3：配送中，4：已完成
    'status|1': [1, 2, 3, 4],
    // 总数量
    'count': 10,
    // 金额
    'money': 100,
    'orderTime': '@date()',
    'remark': '@string()'
  }]
});