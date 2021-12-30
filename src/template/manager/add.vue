<template>
	<div style="margin:15px auto;width:96%;">
		<Form :model="formItem" :label-width="100">

			<!--			<FormItem label="城市：">-->
			<!--				<div>{{formItem.city}}</div>-->
			<!--			</FormItem>-->

			<FormItem label="姓名：">
				<div>{{formItem.realname}}</div>
			</FormItem>

			<FormItem label="手机号：">
				<div>{{formItem.mobile}}</div>
			</FormItem>


			<!--			https://gxwlexpress.com/upload-id-->
			<!--			http://www.gd-copyright.cn/gdbq/applicant/newRegister-->
			<!--			https://www.nihaobank.com/newdirectbank/RegistNewUploadIdentityPre.do?_locale=zh_CN&BankId=9998&LoginType=P&tp=1-->
			<!--			https://creditcard.ecitic.com/shenqing/-->
			<label class="control-label">身份证照片</label>
			<div class="id-wrap"
			     :class="formItem.idfont == 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png'? 'front':'filled'">
				<img :src="formItem.idfont" class="id-sample-img">
			</div>
			<div class="id-wrap"
			     :class="formItem.idback == 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png'? 'back':'filled'">
				<img :src="formItem.idback" class="id-sample-img">
			</div>

			<label class="control-label">手持身份证半身照片</label>
			<div class="id-wrap"
			     :class="formItem.idhand == 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp'? 'back':'filled'">
				<img :src="formItem.idhand" class="id-sample-img">
			</div>


			<!--			<label class="control-label">银行卡正面照</label>-->
			<!--			<div class="id-wrap"-->
			<!--			     :class="formItem.bank == 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg'? 'back':'filled'">-->
			<!--				<img :src="formItem.bank" class="id-sample-img">-->
			<!--			</div>-->

			<FormItem label="理由" style="margin-top:50px;" v-if="s_status !='通过'">
				<Input v-model="memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
				       placeholder="请填写不通过理由"></Input>
			</FormItem>

			<div style="width:100%;text-align: center;padding-bottom:20px;padding-right:15px;" v-if="s_status !='通过'">
				<Button type="success" @click="submitHandle('通过')">通过</Button>
				<Button type="error" @click="submitHandle('不通过')">不通过</Button>
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
					id: 0,
					realname: '',
					mobile: '',
					idfont: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-front.png',
					idback: 'https://cdn-oss.yyang.net.cn/static/wishyoung/id-back.png',
					idhand: 'https://cdn-oss.yyang.net.cn/static/wishyoung/img-hand-held-new.webp',
					bank: 'https://cdn-oss.yyang.net.cn/static/wishyoung/biaozhunic_b.jpg',
					city: '',
					token: '1b1c922d71ce796d',
					memo: '',
					s_status: '未审核'
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
				uploadList: [],
				memo: this.propformItem.memo,
				token: '1b1c922d71ce796d',
				s_status: this.propformItem.s_status
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
			submitHandle(s_status) {
				let __this = this;
				if (!s_status) {
					__this.$Message.error('请选择!');
					return false;
				}

				if (s_status == "不通过" && !this.memo) {
					__this.$Message.error('请填写不通过理由!');
					return false;
				}

				__this.LoadingShow = true;
				api.submitId({
					"s_status": s_status,
					"memo": this.memo,
					"token": this.token,
					"id": this.formItem.id,
					"mobile": this.formItem.mobile
				}).then(res => {
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
		},
		mounted() {
			// this.uploadList = this.$refs.upload.fileList;
		},
		watch: {
			propformItem(val) {
				this.formItem = val;
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

	div >>> .ivu-form-item-content {
		font-size: 16px;
	}

	div >>> .ivu-form-item {
		margin-bottom: 12px;
	}
</style>
