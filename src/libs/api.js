import axios from 'axios';
import store from '../store';//管理cookie
//错误码
const ERR_OK = 200;
const ERR_TOKEN = 9;
const API_PRE = "/api/reset/"

//拦截请求
axios.interceptors.request.use((config) => {
	// 请求头信息ajax
	config.headers = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json;charset=UTF-8'}
	//读取token
	let token = store.state.user.token;
	if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
		config.headers.Authorization = `Bearer ${token}`;
	}
	console.info("state token", token);

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
		switch (res.data.status) {
			case ERR_TOKEN:
				// 返回 401 清除token信息并跳转到登录页面
				store.commit("logout");
				// router.replace({
				//   path: '/user/login',
				//   query: {redirect: router.currentRoute.fullPath}
				// });
				window.location.href = '/p/yqzc/login.html';
		}

		return res
	} else {
		return Promise.reject(res)
	}
}, (error) => {
	return Promise.reject(error)
})


export function fetch(url, params) {
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
	similarCount(id, type, params) {
		return fetch(API_PRE + 'collections/' + id + '/count/' + type, params)
	},
	getLogin(params){
		return fetch(API_PRE + 'Yqzc/login', params)
	},
	//https://c3.yyang.net.cn/api/reset/Qwq/getSignPackage?url=111
	shareWeiXinSign(url) {
		return fetch(API_PRE + 'Yqzc/getSignPackage?url=' + url)
	},
	submitId(params) {
		return fetch(API_PRE + 'Yqzc/submitid', params)
	},
	getList(params) {
		return fetch(API_PRE + 'Yqzc/getList', params)
	},
	getStat(params) {
		return fetch(API_PRE + 'Yqzc/getStat', params)
	},
	getStatView(params) {
		return fetch(API_PRE + 'Yqzc/getStatView', params)
	},

}
