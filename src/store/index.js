import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';

Vue.use(Vuex);

/*
state的值刷新后会没了，而localStorage/cookie的值不能响应式地变化。
https://www.jianshu.com/p/3ce5f84c92d3
*/
const store = new Vuex.Store({
	state: {
		//
	},
	mutations: {
		//
	},
	actions: {

	},
	modules: {
		user
	}
});

export default store;
