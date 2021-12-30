<template>
	<div style="margin:15px auto;width:96%;">

		<div v-if="showAdd">
			<Button @click="confirm" type="primary" class="lg">关闭</Button>
			<ViewE :propformItem="formItem" @on-result-change="ControlModalChange"></ViewE>
		</div>

		<div v-if="!showAdd">
			<label>日期：<Input v-model="formItem.date" placeholder="选择日期" readonly @on-focus="selectDate" style="width: 250px" /></label>

			<calendar
					:minDate="minDate"
					:maxDate="maxDate"
					:show.sync="show"
					:defaultDate="defaultDate"
					mode="during"
					@change="onChange"/>
			<Table style="margin:15px 0;" :columns="columns1" :data="data1"></Table>
		</div>
	</div>
</template>


<script>
	Date.prototype.Format = function (fmt) { //author: meizz
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	import api from '@/libs/api.js';
	import ViewE from "./view.vue";

	export default {
		name: 'app',
		components: {
			ViewE
		},
		data() {
			return {
				formItem: {
					date: JSON.stringify([(new Date()).Format("yyyy-MM-dd")]),
					city:'',
					openid:''
				},
				showAdd: false,
				minDate: new Date('2021/1/1'),
				maxDate: new Date(),//设置过期时间为当天
				show: false,
				defaultDate: new Date(),
				columns1: [
					{
						title: '微信',
						key: 'nickname',
						width: 100,
						render: (h, params) => {
							let nickname = params.row.nickname;
							return (<a onClick={this.ControlShow.bind(this,params.row)} nativeOnClick="this.ControlShow.bind(this,params.row)">{nickname}</a>)
						}
					},
					{
						title: '城市',
						key: 'city',
					},
					{
						title: '统计',
						key: 'count0',
						width: 150,
						render: (h, params) => {
							let count0 = params.row.count0;
							let count1 = params.row.count1;
							let count2 = params.row.count2;
							let html = '';
							return (<div><p> 审核中:<strong style="color:#fc5531">{count0}</strong></p>
							<p>不通过:{count1}</p> 通过:<strong style="color:#008000">{count2}</strong></div>)
						}
					},
				],
				data1: []
			}
		},
		methods: {
			selectStatusChange(v) {
				this.formItem.selectStatus = v;
				this.loadList();
			},
			selectDate() {
				this.show = true;
			},
			onChange(date) {
				this.formItem.date = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
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
					nickname: '',
				};
				this.showAdd = !this.showAdd;
			},
			ControlShow(item) {
				this.formItem.openid = item.openid;
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
				api.getStat(JSON.stringify(__this.formItem)).then(res => {
					__this.LoadingShow = false;
					if (res.status == api.ERR_OK) {
						__this.data1 = res.data;
					}

				})
			}
		},
		created: function () {
			this.formItem.city = decodeURIComponent(this.getRequest("city"));

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

	div >>> .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
		font-size: 18px;
	}

	div >>> .ivu-table-cell {
		font-size: 16px;
	}

	div >>> .ivu-btn-primary, div >>> .ivu-btn-success {
		font-size: 16px;
	}

	div >>> .ivu-form .ivu-form-item-label {
		font-size: 16px;
	}
	div>>>.ivu-input{
		font-size:18px;
	}
</style>
