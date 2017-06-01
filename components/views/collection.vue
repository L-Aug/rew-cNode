<template>
	<div class="collection">
		<div class="pt56" v-if="success">
			<mu-list v-if="collect.length>0">
					<router-link v-for="item in collect" :to="{name:'details',params:{id:item.id}}">
					    <mu-list-item :title="item.title" :describeText="item.author.loginname">
					      	<mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
					      	<div class="time">{{item.last_reply_at|getTimeStr}}</div>
					    </mu-list-item>
					   	<mu-divider/>
					</router-link>
				</mu-list>
				<div class="noInfo" v-if="collect.length==0">暂无</div>
			
		</div>
		<div v-if="!success" class="error"><img src="../../assets/imgs/0.jpg" alt=""></div>
	</div>
</template>

<script>
	import {getTimeStr} from '../../filters';
  	export default {
    	name: 'collection',
    	filters :{
    		getTimeStr(time){
    			return getTimeStr(time);
    		}
    	},
    	data () {
	      	return {
	      		success:false,
	      		loginname:this.$store.state.user.userInfo.loginname,
	      		collect:[]

	      	}
    	},
	    mounted () {
	    	$.get('https://cnodejs.org/api/v1/topic_collect/' + this.loginname, (res) => {
	            	if(res && res.data){
	            		this.collect=res.data;
	            		this.success=true;
	            	}
	            });
	    },
	    methods:{
			
	    },
	    watch:{
	    	
	    }
  	}
</script>

<style lang="scss">
	.collection{
		.time{
			float: right;
			margin-top: -20px;
			color: #03A9F4;
		}
		.noInfo{
			text-align: center;
			line-height: 50px
		}
		.mu-item-title{
			overflow: hidden;
	  		text-overflow: ellipsis;
	  		white-space: nowrap;
	  		line-height: 20px;
		}
	}
	
</style>

