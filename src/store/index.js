// import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({  
	state: {
		// 系统配置
		config: {
			// 产品banner长度
			lenBanner: 3,
			// 产品详情图片长度
			lenDetailImg: 3
		},
		user: {
			age: 18
		}
	},  
	getters: {},
  mutations: {
		setAge (state) {
			state.user.age = 10;
		}
	}  
});