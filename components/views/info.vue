<template>
	<div class="info">
		<div class="pt56">
			<mu-tabs :value="activeTab" @change="handleTabChange" :lineClass="line">
				<mu-tab value="tab1" title="已读消息"/>
				<mu-tab value="tab2" @active="markAll" title="未读消息">
					<mu-badge circle secondary v-show="this.$store.state.info.notiNum>0" />
				</mu-tab>
			</mu-tabs>

			<div v-if="success">
				<div v-if="activeTab === 'tab1'">
			    	<mu-list v-if="hasRead.length>0">
						<router-link v-for="item in hasRead" :to="{name:'details',params:{id:item.topic.id}}">
						    <mu-list-item :title="item.topic.title" :describeText="item.author.loginname">
						      	<mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
						      	<div class="time">{{item.create_at|getTimeStr}}</div>
						      	<div v-html="item.reply.content"></div>
						    </mu-list-item>
						   	<mu-divider/>
						</router-link>
					</mu-list>
					<div class="noInfo" v-if="hasRead.length==0">暂无</div>
				</div>
				<div v-if="activeTab === 'tab2'">
					<mu-list v-if="hasNotRead.length>0">
						<router-link v-for="item in hasNotRead" :to="{name:'details',params:{id:item.topic.id}}">
						    <mu-list-item :title="item.topic.title" :describeText="item.author.loginname">
						      	<mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
						      	<div class="time">{{item.create_at|getTimeStr}}</div>
						      	<div v-html="item.reply.content"></div>
						    </mu-list-item>
						   	<mu-divider/>
						</router-link>
					</mu-list>
					<div class="noInfo" v-if="hasNotRead.length==0">暂无</div>
				</div>
				
			</div>

			<div v-if="!success" class="loading"><mu-circular-progress :size="40"/></div>
			
		</div>
	</div>
</template>

<script>
	import {getTimeStr} from '../../filters';
  	export default {
    	name: 'info',
    	filters :{
    		getTimeStr(time){
    			return getTimeStr(time);
    		}
    	},
    	data () {
	      	return {
	      		activeTab: 'tab1',
		      	line:'lineClass',
		      	accesstoken:this.$store.state.user.userInfo.token,
		      	hasRead:[],
		      	hasNotRead:[],
		      	success:false
	      	}
    	},
	    mounted () {
	   		$.get('https://cnodejs.org/api/v1/messages?accesstoken=' + this.accesstoken, (d) => {
                if (d && d.data) {
                    this.hasRead=d.data.has_read_messages;
                    this.hasNotRead=d.data.hasnot_read_messages;
                    this.success=true;
                }
            });
	    },
	    methods:{
			handleTabChange (val) {
		      	this.activeTab = val;
		    },
		    markAll(){
		    	$.ajax({
	    			type:"POST",
	    			url:"https://cnodejs.org/api/v1/message/mark_all",
	    			data:{accesstoken:this.accesstoken},
	    			dataType: 'json',
	    			success:(res)=>{
	    				if(res.success){
		    				window.window.sessionStorage.info = 0;
		    				this.$store.dispatch('setNotiNum',0);
	    				}
	    			}
	    		})
		    }
	    },
	    watch:{
	    	
	    }
  	}
</script>

<style lang="scss">
	.info{
		.lineClass{
			background: #03A9F4;
		}
		.mu-tabs{
			background: #eee;
			color: #03A9F4;
		}
		.mu-tab-link{
			color: #999;
		}
		.mu-tab-active{
			font-weight: 900;
			color: #03A9F4;
		}
		.time{
			float: right;
			margin-top: -20px;
			color: #03A9F4;
		}
		.mu-item-title{
			overflow: hidden;
	  		text-overflow: ellipsis;
	  		white-space: nowrap;
	  		line-height: 20px;
		}
		.mu-item-text{
			margin-top: 8px;
		}
		p{
			margin: 5px 0 0;
		}
		.loading{
			width: 100%;
			height: calc( 100vh - 104px);
			display: -webkit-flex;
		  	display: flex;
		  	justify-content: center;
		  	align-items: center;
		}
		.noInfo{
			text-align: center;
			line-height: 50px
		}
		.mu-tabs .mu-badge-container{
			position: absolute;
			left: calc(50% + 28px );
			top: 12px;
		}
		.mu-tabs .mu-badge-circle{
			width: 6px;
			height: 6px;
		}
	}
</style>

