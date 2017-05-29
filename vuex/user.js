const user={
	state:{
		userInfo:{}
	},
	getters:{
		getUserInfo(state){
			return state.userInfo;
		}
	},
	mutations:{
		setUserInfo(state,userInfo){
			state.userInfo=userInfo;
		}
	},
	actions:{
		setUserInfo({commit},user){
			commit('setUserInfo',user);
		}
	}
}
export default user;