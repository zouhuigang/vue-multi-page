<style scoped>
	.form_wrp {
		border-right: 1px solid #e7e7eb;
	}

	.form_data {
		width: 96%;
	}

	div >>> .ivu-form .ivu-form-item-label {
		font-size: 18px;
	}
</style>
<template>
	<div style="margin:15px auto;width:96%;">
		<Row>
			<Col span="24" class="form_wrp">
				<div class="form_data">
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
						<FormItem label="登录用户名" prop="username">
							<Input v-model="formValidate.username" placeholder="请输入用户名" autocomplete="off" clearable>
								<Icon type="ios-person-outline" slot="prepend"></Icon>
							</Input>
						</FormItem>
						<FormItem label="登录密码" prop="passwd">
							<Input type="password" v-model="formValidate.passwd" placeholder="请输入密码" autocomplete="off"
							       clearable>
								<Icon type="ios-lock-outline" slot="prepend"></Icon>
							</Input>
						</FormItem>
						<FormItem>
							<Button type="primary" long @click="handleSubmit('formValidate')">登录</Button>
						</FormItem>
					</Form>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import api from '@/libs/api.js';
	import store from '@/store';

	export default {
		data() {
			return {
				formValidate: {
					username: '',
					passwd: '',
				},
				ruleValidate: {
					username: [
						{required: true, message: '登录用户名不能为空', trigger: 'blur'}
					],
					passwd: [
						{required: true, message: '密码不能为空', trigger: 'blur'},
						{type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						var form_data = JSON.stringify(this.formValidate); // 这里才是你的表单数据
						return api.getLogin(form_data).then((res) => {
							if (res.status == api.ERR_OK) {
								//设置本地存储
								store.commit('login', res.data.token);
								this.$Message.success('登录成功');
								window.location.href = res.data.redirect
							} else {
								this.$Message.error(res.info);
							}
						})

					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handleGoRegister() {
				window.location.href = '/user/register';
			}
		}
	}
</script>
