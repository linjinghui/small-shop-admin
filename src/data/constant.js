// import Vue from 'vue';
import VueResource from 'vue-resource';
// import Cookies from 'cookies';
// import {lsgGetData, lsgDeleteData, ssgGetData, ssgSaveData, ssgDeleteData} from '../../node_modules/web-js-tool/libs/js/util.js';

let _this = new Vue();
let $http = Vue.use(VueResource).http;
let $tip = _this.$tip;
const TIMEOUT = 15000;
const ERRORSERVICE = '服务异常，请稍后再试！';

function getCookie (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
       }
   }
  return "";
} 

$http.interceptors.push(function (request, next) {
  let token = '';
  // 设置超时
  let timeout = setTimeout(function () {
    request.abort();
    // 请求超时，请稍后再试！
    $tip({ show: true, text: '请求超时，请稍后再试！', theme: 'danger' });
  }, TIMEOUT);

  // 显示加载动画
  _this.$loading({show: true});
  // 设置请求头
  if (request.header) {
    for (var key in request.header) {
      request.headers.set(key, request.header[key]);
    }
  }
  // 设置csrfToken
  request.headers.set('x-csrf-token', getCookie('csrfToken'));
  
  // 拦截处理全局ajax回调
  next(function (response) {
    // 隐藏加载动画
    _this.$loading({show: false});
    if (response.status === 500 || response.status === 0) {
      $tip({ show: true, text: '系统异常，请检查网络并稍后再试!', theme: 'danger' });
    } else if (response.status === 404) {
      $tip({ show: true, text: '请求地址不存在：【' + response.url + '】', theme: 'danger' });
    } else if (response.body.code === 3) {
      window.location.href = '/#/login';
      $tip({ show: true, text: '身份认证已失效，请重新登录！', theme: 'danger' });
      return null;
    }
    //  else if ((response.status === 400 && token.length === 0) || response.status === 401 || response.body.code === 3) {
    //   // 身份认证已失效，请重新登录
    //   $tip({ show: true, text: '身份认证已失效，请重新登录！', theme: 'danger' });
    // }
    let body = response.body;
    if (typeof body === 'string' && body.indexOf('html') >= 0) {
      window.EVENTBUS.$emit('changeTip', {'display': true, 'theme': 'error', 'content': ERRORSERVICE});
    }
    clearTimeout(timeout);
    return response;
  });
});

export {$http, $tip};