<template>
    <div id="app">
        <default-patient-layout>
             <div class="loading-mask" v-if="loadingShow">
                <van-loading color="#1989fa" />
            </div>
            微信授权登录
        </default-patient-layout>
    </div>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import { Toast } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout },
  data(){
    return {
      formCustom:{
         realname:"",
         mobile:"",
         code:""
      },
      loadingShow:false
     
    }
  },
   methods: {
            handleGoLogin () {
                this.loadingShow=true;
                var form_data = JSON.stringify(this.formCustom); // 这里才是你的表单数据
                  return api.UserUpdate(form_data).then((res)=>{
                          this.loadingShow=false;
                          if(res.error ==api.ERR_OK){
                              //设置本地存储
                              store.commit('login',{'username':this.formCustom.email,'token':res.result.token});
                              Toast("操作成功");
                              let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                              window.location.href=redirect
                          }else{
                              Toast(res.error_description);
                          }
                  })
                        
            },
            AuthUrl(){
                    let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                    let form_data={
                        "redirect":encodeURIComponent(redirect)
                    }
                    return api.AuthUrl(JSON.stringify(form_data)).then((res)=>{
                            this.loadingShow=false;
                            if(res.error ==api.ERR_OK){
                                window.location.href=res.result.next_url;
                            }else{
                                Toast(res.error_description);
                            }
                    })
            },
            AuthCode(code){
                   let form_data={
                        "code":code
                    }
                  return api.AuthCode(JSON.stringify(form_data)).then((res)=>{
                          this.loadingShow=false;
                          if(res.error ==api.ERR_OK){
                            store.commit('login',{'username':res.result.username,'token':res.result.token});
                            let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                            window.location.href=redirect
                          }else{
                              Toast(res.error_description);
                          }
                  })
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
               
    },
    //https://c3-health.yyang.net.cn/user/oauth?
    //redirect=https://c3-health.yyang.net.cn/user/oauth
    //&code=021Tit4e1kSmQz0DLT0e1Eqm4e1Tit49
    //&state=5daa46259d4adc5c309ac7ddfc2aadb0
    //http://127.0.0.1:8080/user/oauth?redirect=http://127.0.0.1:8080/user/signup&code=debug&state=5daa46259d4adc5c309ac7ddfc2aadb0
    mounted(){//验证本地存储的token是否合法
        let code = decodeURIComponent(url.getQueryString('code') || '');//微信回调过来的code
        console.info("code",code)

        if (!code|| code=='null'){
            this.AuthUrl();//微信认证
        }else{
            //根据code获取用户信息
            this.AuthCode(code);
            
        }
        
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
