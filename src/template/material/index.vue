<template>
	<div style="margin:15px auto;width:96%;">

		<div v-if="showAdd">
			<Button @click="confirm" type="primary" class="lg">关闭</Button>
			<ViewE v-if="item.s_status == '通过'" :propformItem="item" @on-result-change="ControlModalChange"></ViewE>
			<Add v-if="item.s_status != '通过'"  :propformItem="item" @on-result-change="ControlModalChange"></Add>
		</div>

		<div v-if="!showAdd">
			<Button @click="confirm" type="primary" class="lg">添加</Button>

			<Row style="margin-top:20px">
				<RadioGroup v-model="formItem.selectStatus" @on-change="selectStatusChange" type="button" size="large">
					<Radio  class="lg" label="待审核"></Radio>
					<Radio  class="lg" label="不通过"></Radio>
					<Radio  class="lg" label="通过"></Radio>
				</RadioGroup>
			</Row>
			<Table style="margin:15px 0;" :columns="columns1" :data="data1"></Table>
		</div>
	</div>
</template>


<script>
	import api from '@/libs/api.js';
	import Add from "./add.vue";
	import ViewE from "./view.vue";
	import {Tag, Row} from 'zantui';
	import store from '@/store';//管理cookie

	export default {
		name: 'app',
		components: {
			Add,
			ViewE
		},
		data() {
			return {
				formItem: {
					city: '',
					nickname:'',
					openid: '',
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
						key: 'mobile',
						width:150
					},
					{
						title: "操作",
						align: "center",
						key: "handle",
						render: (h, params) => {
							let mobile = params.row.mobile;
							let index = params.row._index;
							let s_status = params.row.s_status;
							let html = '';
							if (s_status == '未审核') {
								html = ( <span>
									<i-button
								type = "primary"
								label="small"
								class="lg"
								nativeOnClick = {this.ControlShow.bind(this, params.row)} > 编辑 </i-button>
									< /span>);
							}else if (s_status == '不通过') {
								html = ( <span>
									<i-button
								type = "error"
							class="lg"
								nativeOnClick = {this.ControlShow.bind(this, params.row)} > 修改 </i-button>
									< /span>);
							}  else {
								html = ( <span>
									<i-button
									class="lg"
								type = "success"
								nativeOnClick = {this.ControlShow.bind(this, params.row)} > 查看 </i-button>
									< /span>);
							}

							return ( <div> {html} </div>);
						}
					}
				],
				data1: [],
				item: {
					realname: '',
					mobile: '',
					idfont: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png',
					idback: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png',
					idhand: 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp',
					bank: 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg',
					city: '',
					openid: '',
					status:'未审核',
					nickname:''
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
					openid: '',
					nickname:'',
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
				__this.data1 = [];
				api.getList(JSON.stringify(__this.formItem)).then(res => {
					__this.LoadingShow = false;
					if (res.status == api.ERR_OK) {
						__this.data1 = res.data;
					}

				})
			},
			getCookie(cname){
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					var c = ca[i].trim();
					if (c.indexOf(name)==0) return c.substring(name.length,c.length);
				}
				return "";
			}
		},
		created: function () {
			this.formItem.city = this.getRequest("id");
			this.formItem.openid = this.getRequest("openid");
			this.formItem.nickname = this.getRequest("nickname");
			let sid = store.state.user.sid;
			if (!this.formItem.city) {
				this.$Modal.error({
					title: "获取城市码失败",
					content: "获取城市码失败，请关闭页面重新进入"
				});
			}


			if (!this.formItem.openid || this.formItem.openid != sid) {
				this.jump("http://c3.yyang.net.cn/api/reset/Yqzc/auth?city=" + this.formItem.city);
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
		font-size: 18px;
		color: #474747;
	}

	.lg {
		font-size: 18px;
	}
	div>>>.ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper{
		font-size: 18px;
	}
	div>>>.ivu-table-cell{
		font-size: 16px;
	}
	div>>>.ivu-btn-primary,div>>>.ivu-btn-success{
		font-size: 16px;
	}
	div>>>.ivu-form .ivu-form-item-label{
		font-size: 16px;
	}
</style>
