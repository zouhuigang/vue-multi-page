<template>
	<div style="margin:15px auto;width:96%;">
		<Form :model="formItem" :label-width="100">

			<Alert type="error" v-if="formItem.s_status == '不通过'">不通过理由: {{formItem.memo}}</Alert>


			<FormItem label="姓名：">
				<Input v-model="formItem.realname" placeholder="请输入真实姓名"></Input>
			</FormItem>

			<FormItem label="手机号：">
				<Input v-model="formItem.mobile" placeholder="请输入用户手机号"></Input>
			</FormItem>

			<!--			https://gxwlexpress.com/upload-id-->
			<!--			http://www.gd-copyright.cn/gdbq/applicant/newRegister-->
			<!--			https://www.nihaobank.com/newdirectbank/RegistNewUploadIdentityPre.do?_locale=zh_CN&BankId=9998&LoginType=P&tp=1-->
			<!--			https://creditcard.ecitic.com/shenqing/-->
			<label class="control-label">上传身份证照片</label>


			<Upload
					type="drag"
					:before-upload="beforeUploadIdfont"
					:format="['jpg','jpeg','png']"
					action="">
				<div class="id-wrap"
				     :class="formItem.idfont == 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png'? 'front':'filled'">
					<img :src="formItem.idfont" class="id-sample-img">
				</div>
			</Upload>

			<Upload
					type="drag"
					:before-upload="beforeUploadIdback"
					:format="['jpg','jpeg','png']"
					action="">
				<div class="id-wrap"
				     :class="formItem.idback == 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png'? 'back':'filled'">
					<img :src="formItem.idback" class="id-sample-img">
				</div>
			</Upload>

			<label class="control-label">上传手持身份证半身照片</label>
			<Upload
					type="drag"
					:before-upload="beforeUploadIdhand"
					:format="['jpg','jpeg','png']"
					action="">
				<div class="id-wrap"
				     :class="formItem.idhand == 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp'? 'back':'filled'">
					<img :src="formItem.idhand" class="id-sample-img">
				</div>
			</Upload>


			<label class="control-label">上传银行卡正面照</label>
			<Upload
					type="drag"
					:before-upload="beforeUploadbank"
					:format="['jpg','jpeg','png']"
					action="">
				<div class="id-wrap"
				     :class="formItem.bank == 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg'? 'back':'filled'">
					<img :src="formItem.bank" class="id-sample-img">
				</div>
			</Upload>

			<div style="width:100%;text-align: center;">
				<Button type="primary" :loading="LoadingShow" @click="submitHandle"
				        style="background-color:#006801;width:70%;font-size: 24px;color: #fff;height:55.67px;margin:20px auto;">
					<span v-if="!LoadingShow">提交</span>
					<span v-else>提交中...</span>
				</Button>
			</div>
		</Form>
	</div>
</template>


<script>
	import api from '@/libs/api.js';

	export default {
		name: 'Add',
		props: {
			propformItem: {
				type: Object,
				default: {
					realname: '',
					nickname: '',
					mobile: '',
					idfont: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png',
					idback: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png',
					idhand: 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp',
					bank: 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg',
					city: '',
					openid: ''
				}
			},
		},
		data() {
			return {
				formItem: this.propformItem,
				defaultList: [
					{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png'
					},
					{
						'name': 'bc7521e033abdd1e92222d733590f104',
						'url': 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png'
					}
				],
				imgName: '',
				visible: false,
				LoadingShow:false,
				uploadList: []
			}
		},
		methods: {
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
			//https://segmentfault.com/q/1010000018176022/a-1020000018185160
			beforeUploadIdfont(file) {
				let __this = this;
				//限制文件大小
				const isLt2M = file.size / 1024 / 1024 < 15
				if (!isLt2M) {
					__this.$Message.error('上传文件大小不能超过 15MB!');
					return false;
				}
				let reader = new FileReader();

				reader.readAsDataURL(file)
				reader.onload = e => {
					// let _file = e.target.result;
					__this.formItem.idfont = reader.result;
				}
				return false // 阻止Upload的默认上传
			},
			beforeUploadIdback(file) {
				let __this = this;
				//限制文件大小
				const isLt2M = file.size / 1024 / 1024 < 15
				if (!isLt2M) {
					__this.$Message.error('上传文件大小不能超过 15MB!');
					return false;
				}
				let reader = new FileReader();

				reader.readAsDataURL(file)
				reader.onload = e => {
					// let _file = e.target.result;
					__this.formItem.idback = reader.result;
				}
				return false // 阻止Upload的默认上传
			},
			beforeUploadIdhand(file) {
				let __this = this;
				//限制文件大小
				const isLt2M = file.size / 1024 / 1024 < 15
				if (!isLt2M) {
					__this.$Message.error('上传文件大小不能超过 15MB!');
					return false;
				}
				let reader = new FileReader();

				reader.readAsDataURL(file)
				reader.onload = e => {
					// let _file = e.target.result;
					__this.formItem.idhand = reader.result;
				}
				return false // 阻止Upload的默认上传
			},
			beforeUploadbank(file) {
				let __this = this;
				//限制文件大小
				const isLt2M = file.size / 1024 / 1024 < 15
				if (!isLt2M) {
					__this.$Message.error('上传文件大小不能超过 15MB!');
					return false;
				}
				let reader = new FileReader();

				reader.readAsDataURL(file)
				reader.onload = e => {
					// let _file = e.target.result;
					__this.formItem.bank = reader.result;
				}
				return false // 阻止Upload的默认上传
			},
			submitHandle() {
				let __this = this;

				if (!__this.formItem.realname) {
					__this.$Message.error('请填写姓名!');
					return false;
				}
				if (!__this.formItem.mobile) {
					__this.$Message.error('请填写手机号!');
					return false;
				}
				if (!__this.formItem.idfont || __this.formItem.idfont === 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-font.png') {
					__this.$Message.error('请上传身份证正面照!');
					return false;
				}

				if (!__this.formItem.idback || __this.formItem.idback === 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png') {
					__this.$Message.error('请上传身份证反面照!');
					return false;
				}

				if (!__this.formItem.idhand || __this.formItem.idhand === 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp') {
					__this.$Message.error('请上传手持身份证照!');
					return false;
				}

				if (!__this.formItem.bank || __this.formItem.bank === 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg') {
					__this.$Message.error('请上传银行卡正面照!');
					return false;
				}
				if (__this.LoadingShow) {
					__this.$Message.error('正在提交中..!');
					return false;
				}

				__this.LoadingShow = true;

				api.submitId(JSON.stringify(__this.formItem)).then(res => {
					__this.LoadingShow = false;
					if (res.status == api.ERR_OK) {
						__this.$Message.success("提交成功，请等待审核");
						this.$emit("on-result-change", __this.mobile);
					} else {
						__this.$Message.error(res.info);
					}

				})
			}
		},
		created: function () {
			this.formItem.city = this.getRequest("city");
			this.formItem.openid = this.getRequest("openid");
			this.formItem.nickname = decodeURIComponent(this.getRequest("nickname"));
			if (!this.formItem.city) {
				this.$Modal.error({
					title: "获取城市码失败",
					content: "获取城市码失败，请关闭页面重新进入"
				});
			}
			if (!this.formItem.openid) {
				this.jump("http://c3.yyang.net.cn/api/reset/Qwq/auth?city=" + this.formItem.city);
			}
		},
		mounted() {
			// this.uploadList = this.$refs.upload.fileList;
		},
		watch: {
			propformItem(val) {
				this.formItem = val;
				console.info(val);
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
		font-weight: bold;
	}
	div>>> .ivu-spin-fix{
		height:200%;
		background-color:rgba(0,0,0,0.5)
	}
</style>
