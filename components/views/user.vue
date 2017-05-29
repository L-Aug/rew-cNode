<template>
	<div class="user">
		<div class="pt56" v-if="success">
			<div class="gridlist-demo-container">
				<mu-grid-list class="gridlist-demo" :cols="1" :cellHeight="200" :padding="0">
					<mu-grid-tile titlePosition="bottom" actionPosition="left" :cols="1" :rows="1">
						<img :src="user.avatar_url" />
						<span slot="title">创建于 {{user.create_at|sliceStr}}</span>
						<span slot="subTitle">积分 <b>{{user.score}}</b></span>
						<mu-icon-button icon="person" slot="action" />
					</mu-grid-tile>

				</mu-grid-list>
			</div>
			<mu-tabs :value="activeTab" @change="handleTabChange" :lineClass="line">
				<mu-tab value="tab1" title="最近回复" />
				<mu-tab value="tab2" title="最新发布" />
			</mu-tabs>
			<div v-if="activeTab === 'tab1'">
				<mu-list v-if="user.recent_replies.length>0">
					<router-link v-for="item in user.recent_replies" :to="{name:'details',params:{id:item.id}}">
						<mu-list-item :title="item.title" :describeText="item.author.loginname">
							<mu-avatar :src="item.author.avatar_url" slot="leftAvatar" />
							<div class="time">{{item.last_reply_at|getTimeStr}}</div>
						</mu-list-item>
						<mu-divider/>
					</router-link>
				</mu-list>
				<div class="noInfo" v-if="user.recent_replies.length==0">暂无</div>
			</div>
			<div v-if="activeTab === 'tab2'">
				<mu-list v-if="user.recent_topics.length>0">
					<router-link v-for="item in user.recent_topics" :to="{name:'details',params:{id:item.id}}">
						<mu-list-item :title="item.title" :describeText="item.author.loginname">
							<mu-avatar :src="item.author.avatar_url" slot="leftAvatar" />
							<div class="time">{{item.last_reply_at|getTimeStr}}</div>
						</mu-list-item>
						<mu-divider/>
					</router-link>
				</mu-list>
				<div class="noInfo" v-if="user.recent_topics.length==0">暂无</div>
			</div>

		</div>
		<div class="error" v-if="!success">
			<img src="../../assets/imgs/0.jpg" alt="">
		</div>
	</div>
</template>

<script>
	import { getTimeStr } from '../../filters';
	export default {
		name: 'user',
		filters: {
			getTimeStr(time) {
				return getTimeStr(time);
			},
			sliceStr(str) {
				return str.slice(0, 19).replace(/T/, " ")
			}
		},
		data() {
			return {
				loginname: "",
				user: {},
				success: false,
				activeTab: 'tab1',
				line: 'lineClass'
			}
		},
		mounted() {
			this.loginname = this.$route.params.loginname;
			this.getUser();
		},
		methods: {
			getUser() {
				$.get('https://cnodejs.org/api/v1/user/' + this.loginname, (res) => {
					if(res && res.data) {
						this.success = true;
						this.user = res.data;
					}
				});
			},
			handleTabChange(val) {
				this.activeTab = val
			}
		}
	}
</script>
<style lang="scss">
	.pt56 {
		padding-top: 0 !important;
	}
	
	.user {
		.gridlist-demo-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
		.gridlist-demo {
			width: 100%;
			background: url(../../assets/imgs/u0.jpg) 0 40%;
			background-size: cover;
		}
		.mu-tabs {
			background: #eee;
			color: #03A9F4;
		}
		.mu-tab-link {
			color: #999;
		}
		.mu-tab-active {
			font-weight: 900;
			color: #03A9F4;
		}
		.mu-item-title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			line-height: 20px;
		}
		.time {
			float: right;
			margin-top: -20px;
			color: #03A9F4;
		}
		.noInfo {
			text-align: center;
			line-height: 50px
		}
		.lineClass {
			background: #03A9F4;
		}
		.mu-grid-tile>img {
			width: 80px;
			border-radius: 50%;
			height: 40%;
			margin-top: 20px;
			border: 2px solid #fff;
		}
		
		.error>img {
		width: 400px !important;
		height: 300px !important;
	}
	}
</style>