import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from './user';
import info from './info';

const store=new Vuex.Store({
	modules:{
		user,info
	}
});

export default store;