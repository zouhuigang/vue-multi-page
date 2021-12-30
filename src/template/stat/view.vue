<template>
	<div style="margin:15px auto;width:96%;">
		<Table style="margin:15px 0;" :columns="columns1" :data="data1"></Table>
	</div>
</template>


<script>
	import api from '@/libs/api.js';
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
	export default {
		name: 'ViewE',
		props: {
			propformItem: {
				type: Object,
				default: {
					date: JSON.stringify([(new Date()).Format("yyyy-MM-dd")]),
					city:'',
					openid:''
				}
			},
		},
		data() {
			return {
				formItem: this.propformItem,
				columns1: [
					{
						title: '姓名',
						key: 'realname',
						width: 100
					},
					{
						title: '手机号',
						key: 'mobile',
						width: 150
					},
					{
						title: '原因',
						key: 'memo'
					},
				],
				data1: []
			}
		},
		methods: {
			getRequest(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return r[2];
				return "";
			},
			loadList() {
				let __this = this;
				__this.data1 = [];
				api.getStatView(JSON.stringify(__this.formItem)).then(res => {
					__this.LoadingShow = false;
					if (res.status == api.ERR_OK) {
						__this.data1 = res.data;
					}

				})
			}
		},
		created: function () {
			this.loadList();
		},
		mounted() {
			// this.uploadList = this.$refs.upload.fileList;
		},
		watch: {
			propformItem(val) {
				this.formItem = val;
				this.loadList();
			}
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
		font-weight: bold;
	}
	div>>>.ivu-form-item-content{
		font-size: 16px;
	}
	div>>>.ivu-form-item{
		margin-bottom: 12px;
	}
</style>
