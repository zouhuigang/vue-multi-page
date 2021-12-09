<template>
	<div style="margin:15px auto;width:90%;">
		<Alert>管理端</Alert>
		<div v-if="showAdd">
			<Button @click="confirm" type="primary">关闭</Button>
			<Add :propformItem="item" @on-result-change="ControlModalChange"></Add>
		</div>

		<div v-if="!showAdd">
			<Row style="margin-top:20px">
				<RadioGroup v-model="formItem.selectStatus" @on-change="selectStatusChange" type="button" size="large">
					<Radio label="待审核"></Radio>
					<Radio label="不通过"></Radio>
					<Radio label="通过"></Radio>
				</RadioGroup>
			</Row>
			<Table style="margin:15px 0;" :columns="columns1" :data="data1"></Table>
		</div>
	</div>
</template>


<script>
	import api from '@/libs/api.js';
	import Add from "./add.vue";
	import { Tag,Row  } from 'zantui';

	export default {
		name: 'app',
		components: {
			Add
		},
		data() {
			return {
				formItem: {
					token: '',
					selectStatus:'待审核'
				},
				showAdd: false,
				columns1: [
					{
						title: '姓名',
						key: 'realname',
						width:100
					},
					{
						title: '手机号',
						key: 'mobile'
					},
					{
						title: "操作",
						align: "center",
						key: "handle",
						render: (h, params) => {
							let mobile=params.row.mobile;
							let s_status=params.row.s_status;
							let html='';
							if(s_status == '未审核'){
								html=(<span style="margin-right:5px">
									<i-button icon="md-settings"   type="primary" nativeOnClick={this.ControlShow.bind(this,params.row)}>审核</i-button>
									</span>);
							}else if(s_status == '不通过'){
								html=(<span>
									<i-button icon="md-eye"   type="primary" nativeOnClick={this.ControlShow.bind(this,params.row)}>审核</i-button>
									</span>);
							}else{
								html=(<span>
									<i-button icon="md-eye"   type="success" nativeOnClick={this.ControlShow.bind(this,params.row)}>查看</i-button>
									</span>);
							}

							return (<div>{html}</div>);
						}
					}
				],
				data1: [],
				item:{
					realname: '',
					mobile: '',
					idfont: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png',
					idback: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png',
					idhand: 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp',
					bank: 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg',
					city: '',
					openid: ''
				}
			}
		},
		methods: {
			selectStatusChange(v){
				this.formItem.selectStatus = v;
				this.loadList();
			},
			confirm() {
				this.item = {
					realname: '',
					mobile: '',
					idfont: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png',
					idback: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png',
					idhand: 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp',
					bank: 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg',
					city: '',
					openid: ''
				};
				this.showAdd = !this.showAdd;
			},
			ControlShow(item) {
				this.item = item;
				this.showAdd = true;
			},
			ControlModalChange(val) {
				this.showAdd = false;
				this.loadList();
			},
			getRequest(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return r[2];
				return "";
			},
			jumpPage(nextPage) {
				this.curpage = nextPage;
				this.search();
			},
			jump(errLink, target) {
				if (target == '_blank') {
					window.open(errLink, '_blank')
				} else {
					window.location.href = errLink;
				}

			},
			loadList() {
				let __this = this;
				api.getList(JSON.stringify(__this.formItem)).then(res => {
					__this.LoadingShow = false;
					if (res.status == api.ERR_OK) {
						__this.data1 = res.data;
					}

				})
			}
		},
		created: function () {
			this.formItem.token = this.getRequest("token");
			if (!this.formItem.token) {
				this.$Modal.error({
					title: "秘钥不能为空",
					content: "获取秘钥，请关闭页面重新进入"
				});
			}
			this.loadList();
		},
		mounted() {
			// this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>

<style scoped>
	.iw-video-box {
		width: 100%;
		margin: 0 auto;
		position: relative;
		top: 40%;
		left: 0;
	}

	.demo-carousel {
		width: 100%;
		height: 100%;
		min-height: 100%;
	}

	.demo-carousel img {
		width: 100%;
		border: 0;
		height: 100%;
	}

	div >>> .ivu-carousel-arrow {
		top: auto;
		background-color: rgba(31, 45, 61, .5);
		bottom: 10px;
	}

	.bg {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url("https://cdn-oss.yyang.net.cn/static/wishyoung/13.png?x-oss-process=style/img_ys");
	}

	.video-box {
		width: 80%;
		top: 52%;
		margin: 0 auto;
	}

	div >>> .ivu-modal-body {
		padding: 0px;
	}

	.id-wrap:before {
		content: "点击选择";
		text-align: center;
		vertical-align: middle;
		position: absolute;
		z-index: 99;
		width: 264.67px;
		height: 55.67px;
		line-height: 55.67px;
		margin: 55.67px 0;
		background: #006801;
		opacity: 0.7;
		font-size: 24px;
		color: #fff;
	}

	.id-wrap.filled:before {
		display: none;
	}

	.id-sample-img {
		width: auto;
		position: relative;
		height: 167px;
	}

	label {
		margin-top: 15px;
		display: inline-block;
		max-width: 100%;
		margin-bottom: 5px;
		font-weight: bold;
		font-size: 14px;
		color: #474747;
	}
</style>
