import {$http, $tip} from './constant.js';
import {Base64} from 'web-js-tool/libs/base64.js';
// import {ssgGetData, ssgSaveData, ssgDeleteData} from 'web-js-tool';

const URL = '/api';
// ===================================================[DEMO]===================================================

/**
 * 获取图形验证码
 * @param {function} callback - 回调函数 
 */
export function ajaxGetCaptcha (type) {
  return URL + '/captcha?type=' + type + '&t=' + new Date().getTime();
}

/**
 * 登录
 * @param {function} callback - 回调函数 
 */
export function ajaxLogin (pms, callback, fail) {
  let params = {
    account: pms.account || '',
    pwd: pms.pwd ? (new Base64().doEncode(pms.pwd)) : '',
    vcode: pms.vcode || ''
  };
  
  if (!params.account) {
    $tip({ show: true, text: '请输入帐号', theme: 'warning' });
  } else if (!params.pwd) {
    $tip({ show: true, text: '请输入密码', theme: 'warning' });
  } else if (!params.vcode) {
    $tip({ show: true, text: '请输入验证码', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/login',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(successData.body);
      } else {
        $tip({ show: true, text: successData.body.msg, theme: 'danger' });
      }
    });
  }
}

/**
 * 注册
 * @param {function} callback - 回调函数 
 */
export function ajaxRegist (pms, callback, fail) {
  let params = {
    account: pms.account || '',
    name: pms.name || '',
    pwd: pms.pwd || '',
    vcode: pms.vcode || ''
  };
  
  if (!params.account) {
    $tip({ show: true, text: '请输入帐号', theme: 'warning' });
  } else if (!params.pwd) {
    $tip({ show: true, text: '请输入密码', theme: 'warning' });
  } else if (!params.vcode) {
    $tip({ show: true, text: '请输入验证码', theme: 'warning' });
  } else if (pms.pwd !== pms.cpwd) {
    $tip({ show: true, text: '两次输入密码不一致', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/regist',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(successData.body);
      } else {
        $tip({ show: true, text: successData.body.msg, theme: 'danger' });
      }
    });
  }
}

/**
 * 获取商品列表
 * @param {string} pms.name - 商品名称
 * @param {function} callback - 回调函数 
 */
export function ajaxGetGoods (pms, callback, fail) {
  let params = {
    name: pms.name || '',
		page: pms.page || 1,
		size: pms.size || 10
	};
  
  $http({
    method: 'GET',
    url: URL + '/admin/product',
    params: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 获取商品详情
 * @param {string} pms.id - 商品ID
 * @param {function} callback - 回调函数 
 */
export function ajaxGetGoodInfo (pms, callback, fail) {
  let params = {
    id: pms._id
	};
  
  $http({
    method: 'GET',
    url: URL + '/admin/product/' + params.id
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 商品上架
 * @param {string} pms.name - 商品名称
 * @param {function} callback - 回调函数 
 */
export function ajaxUpperShelf (pms, callback, fail) {
  let params = {
    id: pms.id
  };
  
  if (!pms.stock || pms.stock <= 0) {
    $tip({ show: true, text: '商品库存不足，无法上架', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/admin/goods/uppershelf',
      body: params
    }).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(successData.body);
      } else {
        $tip({ show: true, text: successData.body.msg, theme: 'danger' });
      }
    });
  }
}

/**
 * 商品下架
 * @param {string} pms.name - 商品名称
 * @param {function} callback - 回调函数 
 */
export function ajaxLowerShelf (pms, callback, fail) {
  let params = {
    id: pms.id
  };
  
  $http({
    method: 'POST',
    url: URL + '/admin/goods/lowershelf',
    body: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 商品删除
 * @param {string} pms.name - 商品名称
 * @param {function} callback - 回调函数 
 */
export function ajaxGoodDel (pms, callback, fail) {
  let params = {
    id: pms.id
  };
  
  $http({
    method: 'POST',
    url: URL + '/admin/goods/delete',
    body: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 商品设置推荐状态
 * @param {boolean} pms.recommend - 推荐状态
 * @param {function} callback - 回调函数 
 */
export function ajaxGoodRecommend (pms, callback, fail) {
  let params = {
    id: pms.id,
    recommend: pms.recommend
  };
  
  $http({
    method: 'POST',
    url: URL + '/admin/goods/recommend',
    body: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
* 上传图片
* @param {object} pms - 请求参数
* @param {string} pms.file - 文件对象
*/
export function ajaxUploadImg (pms, callback, fail) {
  let _vue = new Vue();
  let formData = new FormData();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  let maxSize = _vue.$store.state.config.imgSize;

  if (pms.type.indexOf('image') < 0) {
    $tip({ show: true, text: '请选择图片格式的文件上传', theme: 'danger' });
  } else if (maxSize && pms.size > maxSize) {
    $tip({ show: true, text: '图片大小不能超过' + (maxSize / 1024 + 'kb'), theme: 'danger' });
  } else {
    formData.append('datafile', pms.file);
    $http.post(URL + '/admin/upload/img', formData, config).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(successData.body);
      } else {
        $tip({ show: true, text: successData.body.msg, theme: 'danger' });
      }
    });
  }
  _vue = null;
}

/**
* 删除上传的图片
* @param {object} pms - 请求参数
* @param {string} pms.url - 图片地址
*/
export function ajaxDelImg (pms, callback, fail) {
  let params = {
    url: pms.url
  };
  
  $http({
    method: 'POST',
    url: URL + '/admin/upload/delete',
    body: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 新增，编辑商品信息
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveGood (pms, callback, fail) {
  let params = pms;

  if (!params.avatar) {
    $tip({ show: true, text: '请上传商品图片', theme: 'warning' });
  } else if (!params.cover || params.cover.length === 0) {
    $tip({ show: true, text: '请上传商品轮播图', theme: 'warning' });
  } else if (!params.name) {
    $tip({ show: true, text: '请输入商品名称', theme: 'warning' });
  } else if (!params.desc) {
    $tip({ show: true, text: '请输入商品描述', theme: 'warning' });
  } else if (!params.specs || params.specs.length === 0) {
    $tip({ show: true, text: '请添加商品规格', theme: 'warning' });
  } else if (!params.origin_place) {
    $tip({ show: true, text: '请输入商品产地', theme: 'warning' });
  } else if (!params.detail || params.detail.length === 0) {
    $tip({ show: true, text: '请上传商品详情图片', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/admin/product/save',
      body: params
    }).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(successData.body);
      } else {
        $tip({ show: true, text: successData.body.msg, theme: 'danger' });
      }
    });
  }
}

/**
 * 获取订单列表
 * @param {string} pms.id - 订单号
 * @param {number} pms.status - 订单状态 1：待接单，2：备货中，3：配送中，4：已完成
 * @param {function} callback - 回调函数 
 */
export function ajaxGetOrders (pms, callback, fail) {
  let params = {
    id: pms.id || '',
    status: pms.status || '',
    startTime: pms.startTime || '',
    endTime: pms.endTime || '',
		page: pms.page || 1,
		size: pms.size || 10
  };
  console.log(params);
  
  $http({
    method: 'GET',
    url: URL + '/admin/orders',
    params: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * 获取订单详情
 * @param {string} pms.id - 订单号
 * @param {function} callback - 回调函数 
 */
export function ajaxGetOrderInfo (pms, callback, fail) {
  let params = {
    id: pms.id || ''
  };
  
  $http({
    method: 'GET',
    url: URL + '/admin/orders/info',
    params: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(successData.body);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
}

/**
 * demo-post
 * @param {string} pms.name - 名字 
 * @param {function} callback - 回调函数 
 */
export function ajaxPost (pms, callback) {
  let params = {
    name: pms.name
  };
  
  console.log(params);

  $http({
    method: 'POST',
    url: URL + '/portal/widget',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
    if (successData.body.msgCode !== 200) {
      $tip({ show: true, text: successData.body.msgDesc, theme: 'danger' });
    }
  });
}
