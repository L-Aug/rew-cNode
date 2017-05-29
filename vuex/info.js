const info={
	state:{
		notiNum:null
	},
	getters:{
		getNotiNum(state){
			return state.notiNum;
		}
	},
	mutations:{
		setNotiNum(state,notiNum){
			state.notiNum=notiNum;
		}
	},
	actions:{
		setNotiNum({commit},info){
			commit('setNotiNum',info)
		}
	}
}
export default info;