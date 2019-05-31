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
