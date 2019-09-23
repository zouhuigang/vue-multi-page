import axios from 'axios';
// import {router} from '../router/index';
import store from '../store';//管理cookie
//错误码
const ERR_OK = 0;
const ERR_TOKEN=9;
const ERR_IMPERFECT=12;
//普通用户接口路由
const API_PRE_AUTH="/restricted/api/"
//不限制
const API_PRE="/api/"
//管理员接口路由
const API_ADMIN_AUTH="/restricted/api/admin/"

//拦截请求
axios.interceptors.request.use((config) => {
  // 请求头信息ajax
  config.headers={'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/json;charset=UTF-8'}
  //读取token
  let token = store.state.user.token;
  if(token){  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.info("state token",token);

  return config
}, (error) => {
  return Promise.reject(error)
})


//拦截返回
//https://github.com/1iSON/zt_mobileShop/blob/6e1d81f1876a5f1773e5d5ccd2a784f32d5b3878/src/assets/js/httpres.js
//https://github.com/superman66/vue-axios-github/blob/master/src/login.vue
//https://www.jianshu.com/p/269ac710fa81
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    switch (res.data.error) {
      case ERR_IMPERFECT:
           //未完善资料
          //console.info("未完善资料",res.data.result);
          if(res.data.result.next_url){
            window.location.href=res.data.result.next_url+'?redirect='+window.location.href;
          }
          return res
      case ERR_TOKEN:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit("logout");
          // router.replace({
          //   path: '/user/login',
          //   query: {redirect: router.currentRoute.fullPath}
          // });
          //window.location.href='/user/login?redirect='+window.location.href;
          window.location.href='/user/oauth?redirect='+encodeURIComponent(window.location.href);
    }

    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  ERR_OK,
  /**
   * 获取广告信息
   */
  getLogin (params) {
    return fetch('/api/v1.0/user/signin', params)
  },
  UserUpdate(params) {
    return fetch(API_PRE_AUTH+'user/update', params)
  },
  signOut(){//通知服务器,token过期
    return fetch(API_PRE_AUTH+'user/signout')
  },
  getUserInfo(params){//获取用户信息，同时验证token是否有效
    return fetch(API_PRE_AUTH+'user/info',params)
  },
  AuthUrl(params){//微信授权链接
    return fetch(API_PRE+'weixin/snsapi_base/page1',params)
  },
  AuthCode(params){
    return fetch(API_PRE+'weixin/snsapi_base/page2',params)
  },
  sendMobileVerCode(params){
    return fetch(API_PRE_AUTH+'user/send/sms',params)
  },
  uploadImageHandle(params){
    return fetch(API_PRE_AUTH+'user/upload/image',params)
  },
  StorySubmit(params) {
    return fetch(API_PRE_AUTH+'user/story/submit', params)
  },
  MyOrderList(params){
    return fetch(API_PRE_AUTH+'user/myorder/list', params)
  },
  MyOrderInfo(params){
    return fetch(API_PRE_AUTH+'user/myorder/info', params)
  },
  ChatList(params){
    return fetch(API_PRE_AUTH+'chat/list', params)
  },
  ChatSend(params){
    return fetch(API_PRE_AUTH+'chat/send', params)
  },
  ChatPageInit(params){
    return fetch(API_PRE_AUTH+'chat/page/init', params)
  },
  MenuList(params){
    return fetch(API_PRE_AUTH+'user/menu/list', params)
  },
  InviteList(){
    return fetch(API_PRE_AUTH+'user/invite')
  },
  ShareSign(params){
    return fetch(API_PRE+'weixin/share/sign',params)
  },
  PayWeixin(params){
    return fetch(API_PRE_AUTH+'payment/pay/weixin',params)
  },
  AdminOrderList(params){
    return fetch(API_ADMIN_AUTH+'order/list',params)
  },
  AdminOrderInit(params){
    return fetch(API_ADMIN_AUTH+'order/init',params)
  },
  AdminOrderChat(params){
    return fetch(API_ADMIN_AUTH+'chat/list',params)
  },
  AdminUpdateOrder(params){
    return fetch(API_ADMIN_AUTH+'order/update',params)
  },
  AdminAccompanistList(params){
    return fetch(API_ADMIN_AUTH+'accompanist/list',params)
  },
  InvitationToOrder(params){
    return fetch(API_ADMIN_AUTH+'accompanist/invitation/order',params)
  }
}