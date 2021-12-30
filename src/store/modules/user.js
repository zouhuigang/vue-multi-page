import Cookies from 'js-cookie';
//http://www.cnblogs.com/caimuqing/p/6743697.html
//https://www.jianshu.com/p/3ce5f84c92d3

const user = {
	state: {
		token: Cookies.get("token") || null,
	},
	mutations: {
		logout(state, data) {
			Cookies.remove('token');
			state.token = null
		},
		login(state, token) {
			//如果不设置过期时间，会默认关闭浏览器自动清除cookie,所以设置缓存90天
			Cookies.set("token", token, {expires: 90});
			state.token = token;
		}
	}
};

export default user;
