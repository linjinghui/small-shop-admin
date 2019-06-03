import {$http, $tip} from './constant.js';
// import {ssgGetData, ssgSaveData, ssgDeleteData} from 'web-js-tool';

const URL = '/api';
// ===================================================[DEMO]===================================================
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
    url: URL + '/admin/goods',
    params: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(data);
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
    id: pms.id
	};
  
  $http({
    method: 'GET',
    url: URL + '/admin/goods/info',
    params: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(data);
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
    $tip({ show: true, text: '商品库存不足，无法上架', theme: 'warn' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/admin/goods/uppershelf',
      body: params
    }).then(function (successData) {
      if (successData.body.code === 200) {
        callback && callback(successData.body);
      } else if (fail) {
        fail(data);
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
      fail(data);
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
      fail(data);
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
      fail(data);
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
  let formData = new FormData();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  formData.append('datafile', pms.file);
  $http.post(URL + '/admin/file/upload', formData, config).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(data);
    } else {
      $tip({ show: true, text: successData.body.msg, theme: 'danger' });
    }
  });
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
    url: URL + '/admin/file/delete',
    body: params
  }).then(function (successData) {
    if (successData.body.code === 200) {
      callback && callback(successData.body);
    } else if (fail) {
      fail(data);
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
