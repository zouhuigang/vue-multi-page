<template>
    <div id="app">
        <default-patient-layout>
             <div class="loading-mask" v-if="loadingShow">
                <van-loading color="#1989fa" />
            </div>
            <van-cell-group>
              <van-field
                v-model="formCustom.mobile"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
              />

               <van-field
                  v-model="formCustom.code"
                  center
                  required
                  clearable
                  label="短信验证码"
                  placeholder="请输入短信验证码"
                >
                 <timer-btn slot="button" @click.native="sendCode()" :disabled="disabled" ref="btn" :second="60"></timer-btn>
               </van-field>

                <div v-if="inviterInfo">
                    <van-field
                        v-model="formCustom.realname"
                        required
                        label="姓名"
                    />
                    
                    <van-field
                        :value="inviterInfo.inviter_realname"
                        label="推荐人"
                        disabled
                    />
                </div>
               
            </van-cell-group>

            <van-row type="flex" justify="center"  style="margin-top:15px;">
              
              <van-col span="8"> 
                  <van-button  plain  size="small" type="primary" style="width:100%" @click="handleGoLogin">注册</van-button>
              </van-col>
            </van-row>

        </default-patient-layout>
    </div>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import timerBtn from '@/components/timer-btn.vue';
import { Toast } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,timerBtn },
  data(){
    return {
      formCustom:{
         inviter:0,
         role:0,
         realname:"",
         mobile:"",
         code:""
      },
      loadingShow:false,
      disabled:false,
      userInfo:{},
      inviter:0,
      role:0,
      inviterInfo:{}
    }
  },
   methods: {
            handleGoLogin () {
                this.loadingShow=true;
                var form_data = this.formCustom; // 这里才是你的表单数据
                form_data["inviter"]=parseInt(this.inviter)
                form_data["role"]=parseInt(this.role)
                  return api.UserUpdate(JSON.stringify(form_data)).then((res)=>{
                          this.loadingShow=false;
                          if(res.error ==api.ERR_OK){
                              //设置本地存储
                              Toast("操作成功");
                              let next_url=res.result.next_url;
                              let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                              window.location.href=next_url+"?redirect="+encodeURIComponent(redirect)
                          }else{
                              Toast(res.error_description);
                          }
                  })
                        
            },
            getUserInfo(){
                let form_data={}
                form_data["source_page"]="user_signup_one"
                form_data["inviter"]=parseInt(this.inviter)
                form_data["role"]=parseInt(this.role)
                api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                        this.userInfo=res.result.info;
                        this.inviterInfo=res.result.inviter;
                    }
                });
            },
            sendCode(){
                let mobile=this.formCustom.mobile;
                if(!mobile){
                    Toast("手机号不能为空");
                    return false;
                }
                //var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                var reg=/^1[345789]\d{9}$/;
                if(!reg.test(mobile)){
                    Toast("请输入有效手机号");
                    return false;
                }
                let form_data={
                    'mobile':mobile
                }
                this.disabled=true;
                return api.sendMobileVerCode(form_data).then((res)=>{
                                if(res.error ==api.ERR_OK){
                                    this.$refs.btn.run(); //启动倒计时
                                    this.disabled = false;
                                }else{
                                    Toast(res.error_description);
                                    this.disabled = false;
                                }
                });
            }
   }, 
   computed:{
        token(){
            return store.state.user.token;
        },
        username(){
            return store.state.user.username;
        }
    },
    created(){
          var t=this;
          this.appid=url.getQueryString('appid');
          this.return_to=url.getQueryString('returnto');

          this.role=url.getQueryString('role');
          this.inviter=url.getQueryString('inviter');
               
    },
    mounted(){//验证本地存储的token是否合法
        //this.token && this.getUserInfo();
        this.getUserInfo();
        console.info("token",this.token);
    }
}
</script>

<style scoped>
.loading-mask {
    background: rgba(50, 50, 51, 0.1);
    height: 12%;
    width: 22%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    z-index: 10000;
    text-align: center;
    display: flex;
    border-radius: 10px;
}
.van-loading {
    justify-content: center;
    margin: auto;
    color:#fff;
}
</style>
