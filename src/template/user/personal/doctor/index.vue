<template>
   <default-patient-layout :active="active">
    什么是私人医生？
上海三甲医院医生服务，致力于打造围绕家庭健康管理，就诊规划，长期服务

私人医生服务包括的服务项目
-家庭健康主动式管理    -体检规划
-就诊规划                   -健康建议
  </default-patient-layout>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import timerBtn from '@/components/timer-btn.vue';
import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,timerBtn },
  data(){
    return {
      nickname:"",
      mobile:"",
      avatar:"",
      active:"personal_doctor"
    }
  },
   methods: {
            handleSubmit () {
                this.loadingShow=true;
                let form_data = this.formCustom; // 这里才是你的表单数据
                let requirement_desc=[];//病情描述
                if(!this.story_text){
                    Toast("请填写病情描述");
                    this.loadingShow=false;
                    return false;
                }

                if(this.story_text){
                    let rd={}
                    rd["type"]="text";
                    rd["content"]=this.story_text
                    requirement_desc.push(rd);
                }

                if(this.fileList.length>0){
                    for (let i = 0; i < this.fileList.length; i++) { 
                        let rd={}
                        rd["type"]="image";
                        rd["content"]=this.fileList[i].image;
                        requirement_desc.push(rd);
                    }
                   
                }

                    form_data.requirement_desc=requirement_desc;
                 
                  return api.StorySubmit(JSON.stringify(form_data)).then((res)=>{
                          this.loadingShow=false;
                          if(res.error ==api.ERR_OK){
                              Toast("操作成功");
                              //let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                              window.location.href='/user/signup/finish'
                          }else{
                              Toast(res.error_description);
                          }
                  })
                        
            },
            getUserInfo(){
                api.getUserInfo().then( res => {
                     if(res.error ==api.ERR_OK){
                            this.nickname=res.result.nickname;
                            this.mobile=res.result.mobile;
                            this.avatar=res.result.avatar;
                    }
                });
            },
            beforeUpload (file) {
                let __this=this;
                //限制文件大小
                const isLt2M = file.size / 1024 / 1024 < 10  
                if(!isLt2M) {
                    Toast('上传文件大小不能超过 10MB!');
                    return false;
                }
                __this.onRead(file);
                return false; // 阻止Upload的默认上传
            },
            onRead (file) {
                let __this=this;
                __this.LoadingShow=true;

                let formData = new FormData();  
                formData.append('uploadfile',file);
                // formData.append('name',this.name);

                api.uploadImageHandle(formData).then( res => {
                     __this.LoadingShow=false;
                     if(res.error ==api.ERR_OK){
                            let url=res.result.preview+"&t="+(new Date()).getTime();
                            let image=res.result.image;
                            let new_gif={
                                "image":image,
                                "url":url,
                                "preview-full-image":url,
                                "isImage":true
                            }
                            __this.fileList.push(new_gif);   
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
    mounted(){//验证本地存储的token是否合法
        //this.token && this.getUserInfo();
        this.getUserInfo();
        console.info("token",this.token);
    }
}
</script>

<style scoped>
.user-poster {
  width: 100%;
  height: 30vw;
  display: block;
  background:#eee
}
.user-group {
  margin-bottom: 15px;
}
.user-info{
  padding: 15px 0;
  font-size: 12px;
  background-color: #fff;
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.van-icon {
  display: block;
  font-size: 24px;
}
</style>