<template>
	<div>
		<mu-appbar title="cNode" class='top'>
			<mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
			<mu-icon-button icon="expand_more" slot="right" />
		</mu-appbar>
		<router-link :to="{'name':'add'}" style="width:50px;height:50px;position:absolute;right:0;top:0;z-index:555">
		</router-link>
		<mu-drawer :open="open" :docked="docked" @close="toggle()">
			<mu-list @itemClick="docked ? '' : toggle()">
				<router-link :to="{'name':'login'}" @click.native="open = false" v-if="!userInfo.loginname">
					<mu-list-item title="登陆">
						<mu-icon slot="left" value="person_outline" />
					</mu-list-item>
				</router-link>
				<template v-if="userInfo.loginname">
					<router-link :to="{'name':'user',params: { loginname: userInfo.loginname }}" @click.native="open = false">
						<div class="portrait">
							<img :src="userInfo.avatar_url" />
						</div>
						<mu-list-item :title="userInfo.loginname">
							<mu-icon slot="left" value="person" />
						</mu-list-item>
					</router-link>
					<router-link :to="{'name':'info'}" @click.native="open = false">
						<mu-list-item title="消息">
							<mu-icon slot="left" value="warning" />
						</mu-list-item>
					</router-link>
					<router-link :to="{'name':'collection'}" @click.native="open = false">
						<mu-list-item title="收藏">
							<mu-icon slot="left" value="grade" />
						</mu-list-item>
					</router-link>
					<mu-list-item title="退出" @click="loginOut">
						<mu-icon slot="left" value="undo" />
					</mu-list-item>
				</template>
				<mu-divider />
				<router-link :to="{'name':'index',query:{tab:'all'}}" @click.native="open = false">
					<mu-list-item title="全部">
						<mu-icon slot="left" value="list" />
					</mu-list-item>
				</router-link>
				<router-link :to="{'name':'index',query:{tab:'good'}}" @click.native="open = false">
					<mu-list-item title="精华">
						<mu-icon slot="left" value="thumb_up" />
					</mu-list-item>
				</router-link>
				<router-link :to="{'name':'index',query:{tab:'share'}}" @click.native="open = false">
					<mu-list-item title="分享">
						<mu-icon slot="left" value="share" />
					</mu-list-item>
				</router-link>
				<router-link :to="{'name':'index',query:{tab:'ask'}}" @click.native="open = false">
					<mu-list-item title="问答">
						<mu-icon slot="left" value="live_help" />
					</mu-list-item>
				</router-link>
				<router-link :to="{'name':'index',query:{tab:'job'}}" @click.native="open = false">
					<mu-icon slot="left" value="local_mall" />
					<mu-list-item title="招聘">
						<mu-icon slot="left" value="local_mall" />
					</mu-list-item>
				</router-link>
			</mu-list>
		</mu-drawer>
	</div>
</template>

menu
<script>
	export default {
		data() {
			return {
				open: false,
				docked: true,
				userInfo: {}
			}
		},
		mounted() {
			if(this.$store.state.user.userInfo) this.userInfo = this.$store.state.user.userInfo;
		},
		methods: {
			toggle(flag) {
				this.open = !this.open
				this.docked = !flag
			},
			loginOut() {
				this.docked = false;
				window.window.sessionStorage.removeItem("user");
				window.window.sessionStorage.removeItem("info");
				setTimeout(() => {
					history.go(0);
				}, 200)
			}
		}
	}
</script>
<style lang="less">
	.icon img {
		width: 20px;
		height: 20px;
	}
	
	.mu-drawer {
		background: #f7f3f5;
		opacity: .8;
	}
	
	.top {
		position: fixed;
		top: 0;
	}
	
	.portrait {
		text-align: center;
	}
	
	.portrait img {
		width: 150px;
		height: 150px;
		border: 2px #ccc solid;
		border-radius: 75px;
	}
	
	.appbar-search-field {
		color: #FFF;
		margin-bottom: 0;
		&.focus-state {
			color: #FFF;
		}
		.mu-text-field-hint {
			color: fade(#FFF, 54%);
		}
		.mu-text-field-input {
			color: #FFF;
		}
		.mu-text-field-focus-line {
			background-color: #FFF;
		}
	}
	
	.mu-appbar {
		width: 100%;
		overflow-y: auto;
	}
	
	.mu-appbar {
		height: 49px;
		overflow-y: hidden !important;
		background-color: rgb(87, 194, 151);
	}
</style>