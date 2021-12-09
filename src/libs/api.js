import axios from 'axios';
//错误码
const ERR_OK = 200;
const API_PRE = "/api/reset/"

//拦截请求
axios.interceptors.request.use((config) => {
	// 请求头信息ajax
	config.headers = {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json;charset=UTF-8',
		"BX-UID": '1'
	}
	return config
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
	//https://c3.yyang.net.cn/api/reset/Qwq/getSignPackage?url=111
	shareWeiXinSign(url) {
		return fetch(API_PRE + 'Qwq/getSignPackage?url=' + url)
	},
	submitId(params) {
		return fetch(API_PRE + 'Qwq/submitid', params)
	},
	getList(params) {
		return fetch(API_PRE + 'Qwq/getList', params)
	}
}
