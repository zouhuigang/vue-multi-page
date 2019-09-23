<template>
   <default-patient-layout :active="active">
     <section 
        class="common"
        v-for="(item,index) in inviteList"
        :key="index"
        :title="item.title"
        :icon="item.icon" 
        :url="item.url" 
     >
          <div style="margin-bottom:15px;"><h2>{{item.title}}</h2></div>
          <div class="mt">
             <div  class="desc">{{item.desc}}</div>
             <div  class="url">{{item.url}}</div>
             <div  class="qrcode"><img :src="item.qrcode"/></div>
          </div>
      
        <van-col span="8" offset="16" style="text-align:right"> <van-button size="small" type="danger" @click="show">复制并转发</van-button></van-col>
     </section>
  </default-patient-layout>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
import sdk from '@/libs/jssdk' //引入sdk.js
export default {
  name: 'app',
  components: { DefaultPatientLayout },
  data(){
    return {
      userInfo:{},
      active:"",
      inviteList:[]
    }
  },
   methods: {
          getUserInfo(){
                let form_data={}
                form_data["source_page"]="user_invite"
                return api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                        this.userInfo=res.result.info;
                    }
                });
          },
          getInviteList(){
                  return api.InviteList().then( res => {
                      if(res.error ==api.ERR_OK){
                          this.inviteList=res.result.list;
                    }
                  });
          },
          show(){
            var url = window.location.href
            var obj = {
              title: "多可德测试分享",		//分享标题
              desc: '分享内容',						//分享内容
              linkurl: location.protocol+"//"+location.host+'/dist/#/show?id=' + this.userInfo.Id,//分享链接
              img: "图片",				//分享内容显示的图片
            }
            sdk.getJSSDK(url, obj) 
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
    },
    mounted(){//验证本地存储的token是否合法
        //this.token && this.getUserInfo();
        this.getUserInfo();
        this.getInviteList();
    }
}
</script>

<style scoped>
.common{
  padding:15px 15px
}

.qrcode{
  width:100%;
  text-align: center
}
.qrcode img{
  width:100px;
  height:100px;
}
.mt{
  border:1px solid #008000;
  border-radius:5px;
  margin-bottom:10px;
  padding:15px;
}
.desc{
  font-size:12px;

}
.url{
  font-size:10px;
  height:30px;
}
</style>