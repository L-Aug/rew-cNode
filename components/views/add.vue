<template>
	<div class="add">
	    <div class="content">
	    	<mu-select-field v-model="tab" label="选择分类" @input="setErrorText" labelFloat fullWidth>
			    <mu-menu-item value="share" title="分享"/>
			    <mu-menu-item value="ask" title="问答"/>
			    <mu-menu-item value="job" title="招聘"/>
			   
			</mu-select-field>
			<mu-text-field label="标题，字数10字以上" v-model="title" :errorText="errorTxt" @input="setErrorText(1)" labelFloat fullWidth/>
			<mu-text-field label="" @input="setErrorText" v-model="content" multiLine :rows="10" :rowsMax="6" :maxLength="500" labelFloat fullWidth/>
			<mu-raised-button label="确认" class="demo-raised-button" @click="sub" :disabled="disabled" fullWidth primary/>
	    </div>
	    <mu-snackbar v-if="toast" :message="successTxt"/>
	</div>
</template>

<script>
	export default {
		name: 'add',
		data () {
		    return {
		      	tab:"",
		      	title:"",
		      	content :"",
		      	errorTxt:"",
		      	disabled:true,
		      	accesstoken:'',
		      	successTxt:'',
	        	toast: false
		    }
		},
		mounted () {
			this.accesstoken=this.$store.state.user.userInfo.token
	    },
		methods: {
		   	sub(){
		   		$.ajax({
	                type: 'POST',
	                url: 'https://cnodejs.org/api/v1/topics',
	                data: {
	                	accesstoken:this.accesstoken,
	                	title:this.title,
	                	tab:this.tab,
	                	content:this.content
	                },
	                dataType: 'json',
	                success: (res) => {
	                    if (res.success) {
	                    	this.toast = true;
			                this.successTxt="发布成功，即将跳转";
			                if (this.toastTimer) clearTimeout(this.toastTimer)
			                this.toastTimer = setTimeout(() => { 
			                  	this.toast = false;
				                this.$router.push({
		                            name: 'list'
		                        });
			                }, 2000);
	                        
	                    }
	                },
	                error: (res) => {
	                    let error = JSON.parse(res.responseText);
			            this.toast = true;
			            this.successTxt=error.error_msg;
			            if (this.toastTimer) clearTimeout(this.toastTimer)
			            this.toastTimer = setTimeout(() => { 
			                this.toast = false;
			                history.go(0);
			            }, 2000)
	                }
	            });
		   	},
		   	setErrorText(i){
		   		if(this.title.length>=10&&this.tab&&this.content){
		   			this.errorTxt="";
		   			this.disabled=false;
		   		}
		   		if(this.title.length<10&&i==1){
		   			this.errorTxt="标题的字数在10字以上！";
		   		}
		   	}
		}
	}
</script>

<style scoped lang="scss">
	.add .content{
		padding: 60px 10px 0;
	}
</style>
