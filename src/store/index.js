// import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({  
	state: {
		// 主题色 v
		theme: '#2b8aff',
		borderColor: '#f4f6f8',
		// 主题色 ∧
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