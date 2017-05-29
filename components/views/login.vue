<template>
  	<div class="login">
	    <div class="content">
	    	<div class="model">
		    	<mu-text-field label="Access Token" v-model="accesstoken" :errorText="errorText" @input="setErrorText" fullWidth labelFloat/>
		    	<mu-raised-button label="确认" @click="login" :disabled="disabled" fullWidth primary/>
		    	<mu-dialog :open="dialog" title="提示">
				    {{alert}}
				    <mu-flat-button label="确定" slot="actions" primary @click="close"/>
				</mu-dialog>
	    	</div>
	    </div>
			<div v-if="success" class="loading"><mu-circular-progress :size="40"/></div>
			<mu-snackbar v-if="toast" :message="successTxt"/>
  	</div>
</template>

<script>
  	export default {
    	name: 'login',
    	components: {
    	},
    	filters :{
    		
    	},
    	data () {
	      	return {
	      		accesstoken:"",
	      		dialog: false,
	      		alert:"",
	      		errorText:"",
	      		disabled:true,
	      		success:false,
	      		successTxt:'',
        		toast: false
	      	}
    	},
	    mounted () {
	      	
	    },
	    methods:{
	    	login(){
	    		this.success=true;
	    		//get user information
	    		$.ajax({
	    			type:"POST",
	    			url:"https://cnodejs.org/api/v1/accesstoken",
	    			data:{accesstoken:this.accesstoken},
	    			dataType: 'json',
	    			success:(res)=>{
	    				let user={
	    					loginname: res.loginname,
                            avatar_url: res.avatar_url,
                            userId: res.id,
                            token: this.accesstoken
	    				};
		                let info=0;
		                //get notifictions number
		                $.get('https://cnodejs.org/api/v1/messages?accesstoken=' + this.accesstoken, (d) => {
			                if (d && d.data) {
			                    info=d.data.hasnot_read_messages.length;
			                    this.success=false;
			    				this.toast = true;
				                this.successTxt="登陆成功，即将跳转";
				                if (this.toastTimer) clearTimeout(this.toastTimer);
				                this.toastTimer = setTimeout(() => { 
					                this.toast = false;
					                window.window.sessionStorage.user = JSON.stringify(user);
					                window.window.sessionStorage.info = info;
				    				//vuex store
				    				this.$store.dispatch('setUserInfo',user);
				    				this.$store.dispatch('setNotiNum',info);
				    				//redirect
				    				let redirect = decodeURIComponent(this.$route.query.redirect || '/index');
			                        this.$router.push({
			                            path: redirect
			                        });
				                }, 2000)
			                }
			            });
	    			},
	    			error:(res)=>{
	    				let error=JSON.parse(res.responseText);
	    				this.alert=error.error_msg;
	    				this.dialog = true;
	    			}
	        	})
	    	},
	    	close(){
	    		this.dialog = false;
	    	},
	    	setErrorText(){
	    		if(this.accesstoken.length==36){
	    			this.errorText="";
	    			this.disabled=false;
	    		}else{
	    			this.errorText="Access Token应为36位的字符串！"
	    		}
	    	}
	    },
	    watch:{
	    	
	    }
  	}
</script>

<style lang="scss">
	
	.login{ 
		.loading{
			width: 100vw;
			height: 100vh;
			display: -webkit-flex;
		  	display: flex;
		  	justify-content: center;
		  	align-items: center;
		  	position: absolute;
		  	top: 0;
		  	left: 0;
		  	background: rgba(0,0,0,.2);
		}
		.content{
			padding:180px 10px 20px;
		}
		.mu-appbar-title{
			text-align: center
		}
	}
	.mu-raised-button-primary {
    background-color: rgb(87, 194, 151);
}

</style>
