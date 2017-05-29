<template>
	<div class="topic">
		<div class="pt56" v-if="success">
			<h2 class="topic-title padding" v-text="topic.title"></h2>
			<mu-flexbox class="padding">
				<mu-flexbox-item grow="1" class="flex-demo">
					<router-link :to="{name:'user',params:{loginname:topic.author.loginname}}">
						<mu-avatar :src="topic.author.avatar_url" />
					</router-link>
				</mu-flexbox-item>
				<mu-flexbox-item grow="7" class="flex-demo">
					<mu-flexbox>
						<mu-flexbox-item grow="1" class="flex-demo">
							{{topic.author.loginname}}
						</mu-flexbox-item>
						<mu-flexbox-item grow="1" class="flex-demo tab" :title="getTabInfo(topic.tab,topic.good,topic.top,true)">

						</mu-flexbox-item>
					</mu-flexbox>
					<mu-flexbox>
						<mu-flexbox-item grow="1" class="flex-demo">
							发布于 {{topic.create_at | getTimeStr}}
						</mu-flexbox-item>
						<mu-flexbox-item grow="1" class="flex-demo">
							{{topic.visit_count}}次浏览
						</mu-flexbox-item>
					</mu-flexbox>
				</mu-flexbox-item>
			</mu-flexbox>
			<section class='padding content' v-html="topic.content">
			</section>
			<mu-divider />
			<section class="allRepies padding">
				共 <span class="blue">{{topic.reply_count}} </span> 人回复
			</section>
			<mu-divider />
			<section class="reply ">

				<template v-for="reply in topic.replies">
					<mu-flexbox class="padding">
						<mu-flexbox-item grow="1" class="flex-demo">
							<router-link :to="{name:'user',params:{loginname:reply.author.loginname}}">
								<mu-avatar :src="reply.author.avatar_url" />
							</router-link>
						</mu-flexbox-item>
						<mu-flexbox-item grow="7" class="flex-demo">
							<mu-flexbox>
								<mu-flexbox-item grow="2" class="flex-demo">
									{{reply.author.loginname}} 发布于 {{reply.create_at|getTimeStr}}
								</mu-flexbox-item>
								<mu-flexbox-item grow="1" class="flex-demo">
									<span class="right" @click="replyTo(reply)">
                    <mu-icon slot="left" value="reply"/>
                  </span>
									<span class="right">{{reply.ups.length}}</span>
									<span class="right" @click="upTo(reply)" :class="{'uped':isUped(reply.ups)}">
                    <mu-icon slot="left" value="thumb_up"/>
                  </span>
								</mu-flexbox-item>
							</mu-flexbox>
						</mu-flexbox-item>
					</mu-flexbox>
					<div class="paddinglf" v-html="reply.content"></div>

					<section class="padding" v-show="userId && curReplyId === reply.id">
						<mu-text-field v-model="replyContTo" multiLine :rows="6" :rowsMax="6" :maxLength="500" fullWidth />
						<mu-raised-button label="确认" class="demo-raised-button" @click="replyAct" fullWidth primary/>
					</section>

					<mu-divider />
				</template>

			</section>

			<section class="padding" v-if="userId">
				<mu-text-field hintText="回复内容" v-model="replyCont" multiLine :rows="6" :rowsMax="6" :maxLength="500" fullWidth />
				<mu-raised-button label="确认" class="demo-raised-button" @click="replyAct" fullWidth primary/>
			</section>
			<totop page="topic"></totop>
		</div>
		<div class="error" v-if="!success">
			<img src="../../assets/imgs/0.jpg" alt="">
		</div>
		<mu-snackbar v-if="toast" :message="successTxt" />

	</div>

</template>

<script>
	import totop from '../toTop.vue';
	import { getTabInfo, getTimeStr } from '../../filters';

	export default {
		name: 'app',
		components: {
			totop
		},
		filters: {
			getTimeStr(time) {
				return getTimeStr(time);
			}
		},
		data() {
			return {
				topicId: '',
				topic: {},
				success: false,
				userId: '',
				curReplyId: '',
				replyCont: '',
				replyContTo: '',
				token: '',
				successTxt: '',
				toast: false,
			}
		},
		mounted() {
			// get url params
			this.topicId = this.$route.params.id;
			this.userId = this.$store.state.user.userInfo.userId;
			this.token = this.$store.state.user.userInfo.token;
			// loading topic data
			$.get('https://cnodejs.org/api/v1/topic/' + this.topicId, (d) => {
				if(d && d.data) {
					this.topic = d.data;
					this.success = true;
				}
			});
			let loginname = this.$store.state.user.userInfo.loginname;
			//get collected topics
			if(loginname) {
				$.get('https://cnodejs.org/api/v1/topic_collect/' + loginname, (res) => {
					if(res && res.data) {
						let arr = []
						for(let i = 0; i < res.data.length; i++) {
							arr.push(res.data[i].id)
						}
						if($.inArray(this.topicId, arr) > -1) {
							this.collected = true
						}
					}
				});
			}

		},
		methods: {
			getTabInfo(tab, good, top, isClass) {
				return getTabInfo(tab, good, top, isClass);
			},
			replyTo(reply) {
				if(!this.userId) {
					this.$router.push({
						name: 'login',
						params: {
							redirect: encodeURIComponent(this.$route.path)
						}
					});
				} else {
					this.curReplyId = reply.id;
					this.replyContTo = `@${reply.author.loginname} `;
				}
			},
			replyAct() {
				let postData = {
					accesstoken: this.token
				}
				let htmlText = this.authorTxt;
				if(this.curReplyId) {
					postData.reply_id = this.curReplyId;
					postData.content = this.replyContTo + `     ` + htmlText;
				} else {
					postData.content = this.replyCont + `     ` + htmlText;
				}
				// return
				$.ajax({
					type: 'POST',
					url: `https://cnodejs.org/api/v1/topic/${this.topicId}/replies`,
					data: postData,
					dataType: 'json',
					success: (res) => {
						if(res.success) {
							this.toast = true;
							this.successTxt = "回复成功，即将跳转";
							if(this.toastTimer) clearTimeout(this.toastTimer)
							this.toastTimer = setTimeout(() => {
								this.toast = false;
								this.$router.go(0)
							}, 2000)
						}
					},
					error: (res) => {
						let error = JSON.parse(res.responseText);
						this.toast = true;
						this.successTxt = error.error_msg;
						if(this.toastTimer) clearTimeout(this.toastTimer)
						this.toastTimer = setTimeout(() => {
							this.toast = false;
							history.go(0)
						}, 2000)
					}
				});
			},
			upTo(reply) {
				if(!this.userId) {
					this.$router.push({
						name: 'login',
						params: {
							redirect: encodeURIComponent(this.$route.path)
						}
					});
				} else {
					$.ajax({
						type: 'POST',
						url: `https://cnodejs.org/api/v1/reply/${reply.id}/ups`,
						data: { accesstoken: this.token },
						dataType: 'json',
						success: (res) => {
							if(res.success) {
								if(res.action === 'down') {
									let index = $.inArray(this.userId, reply.ups);
									reply.ups.splice(index, 1);
								} else {
									reply.ups.push(this.userId);
								}
							}
						},
						error: (res) => {
							let error = JSON.parse(res.responseText);
							alert(error.error_msg);
							return false;
						}
					});
				}
			},
			isUped(ups) {
				return $.inArray(this.userId, ups) >= 0;
			},
		}
	}
</script>

<style lang="scss">
	.topic {
		font-family: 'microsoft yahei';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		.right {
			float: right;
			margin-right: 5px;
		}
		.padding {
			padding: 8px;
		}
		.paddinglf {
			padding: 0 8px;
		}
		.tab:before {
			width: 50px;
			display: inline-block;
			border-radius: 2px;
			text-align: center;
		}
		.content blockquote {
			margin-left: 10px;
			color: #777;
			padding: 0px 15px;
			border-left: 4px solid #ddd;
		}
		.content a {
			text-decoration: underline;
			word-break: break-all;
			display: inline-block;
		}
		img {
			width: 100%;
		}
		.error img {
			width: 400px;
			height: 300px;
		}
		.reply .mu-icon {
			font-size: 20px;
		}
		.uped {
			color: #03A9F4;
		}
		.tab {
			color: #fff;
		}
		.mu-raised-button-primary {
			background-color: rgb(87, 194, 151);
		}
	}
</style>