var $ = require('jquery');
window.$ = require('jquery')
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './vuex/store'
import timeago from 'timeago.js'
Vue.use(MuseUI)
var index = require("./components/views/index.vue")
var details = require("./components/views/details.vue")
var login = require("./components/views/login.vue")
var user = require("./components/views/user.vue")
var add = require("./components/views/add.vue")
import top from "./components/index/top.vue";
var router = new VueRouter({
	routes: [{
		path: "/index",
		component: index,
		name:'index'
	},{
		path: "/details/:id",
		name:'details',
		component: details
	},{
		path: "/",
		name:'index',
		redirect: "/index"
	},{
		path: "/login",
		name:'login',
		component: login
	},{
		path: "/user/:loginname",
		name:'user',
		component: user
	}]
})
$.ajaxSettings.crossDomain = true;

if (window.sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}
if (window.sessionStorage.info) {
    store.dispatch('setNotiNum', window.sessionStorage.info);
}
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user.userInfo.userId) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});
new Vue({
	el: '#app',
	template: `
		<div>
			<top></top>
			<router-view></router-view>
		</div>
			`,
	components: {
		top,

	},
	router,
	store,
	data: {
		name: 'August'
	}
})