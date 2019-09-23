<template>
    <div id="app">
        <default-patient-layout>
             <div class="loading-mask" v-if="loadingShow">
                <van-loading color="#1989fa" />
            </div>
            <van-cell-group>
             
                <van-field
                  v-model="formCustom.realname"
                  required
                  clearable
                  label="病人姓名"
                  placeholder="请输入病人姓名"
                  :readonly="realnameReadonly"
                />
                <van-field
                  v-model="formCustom.idcard"
                  required
                  clearable
                  label="身份证"
                  placeholder="请输入身份证"
                  :readonly="idcardReadonly"
                />
            </van-cell-group>

              <van-field
                v-model="formCustom.disease_desc"
                required
                label="需求描述"
                type="textarea"
                placeholder="比如医院，医生对接，后续治疗需求等"
                rows="1"
                autosize
            />

            <van-field
                v-model="story_text"
                required
                label="病情描述"
                type="textarea"
                placeholder="简要描述病情，以及以往治疗"
                rows="1"
                autosize
            />

            <section class="van-doc-demo-block">
                <h2 class="van-doc-demo-block__title">检查报告,请上传原图或者高清大图</h2>
                <van-uploader  
                 v-model="fileList"
                 multiple 
                 :before-read="beforeUpload"
                 :accept="'image/*'"
                 :previewFullImage="previewFullImage"
                 :max-count="9" />
            </section>

            <van-row type="flex" justify="center"  style="margin-top:15px;">
              
              <van-col span="8"> 
                  <van-button  plain  size="small" type="primary" style="width:100%" @click="handleSubmit">下一步</van-button>
              </van-col>
            </van-row>

        </default-patient-layout>
    </div>
</template>


<script>
import lrz from "lrz";
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
      formCustom:{
         realname:"",
         idcard:"",
         disease_desc:"",
         requirement_desc:[]
      },
      realnameReadonly:false,
      idcardReadonly:false,
      story_text:'',
      loadingShow:false,
      disabled:false,
      fileList: [],
      previewFullImage:false,
    }
  },
   methods: {
            //将base64转换为blob
            dataURLtoBlob(dataurl) {
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },
            //将blob转换为file
            blobToFile(theBlob, fileName) {
                theBlob.lastModifiedDate = new Date()
                theBlob.name = fileName;
                return theBlob;
            },
            dataURLtoFile(dataurl, filename){
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                var blob = this.dataURLtoBlob(dataurl);
                return this.blobToFile(blob, filename);
             },
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
                              let redirect = decodeURIComponent(url.getQueryString('redirect') || '/');
                              window.location.href='/user/signup/finish?redirect='+redirect
                          }else{
                              Toast(res.error_description);
                          }
                  })
                        
            },
            getUserInfo(){
                let form_data={}
                form_data["source_page"]="user_story_submit"
                api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                            this.formCustom.idcard=res.result.info.idcard;
                            this.formCustom.realname=res.result.info.realname;
                            if(this.formCustom.realname){this.realnameReadonly=true;}
                            if(this.formCustom.idcard){this.idcardReadonly=true;}
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
                
                //图片压缩
                lrz(file)
                    .then(function (rst) {
                        // 处理成功会执行
                        console.info(rst,rst.origin.name);
                        // var blob = this.dataURLtoBlob(rst.base64)
                        // __this.onRead(rst.file,rst.origin.name);//发现上传的是原图
                        var file = __this.dataURLtoFile(rst.base64, rst.origin.name);
                        __this.onRead(file,rst.origin.name);
                    })
                    .catch(function (err) {
                        // 处理失败会执行
                        Toast('图片压缩失败，请重试!'+err);
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
                return false; // 阻止Upload的默认上传
            },
            onRead (file,filename) {
                let __this=this;
                __this.LoadingShow=true;

                let formData = new FormData();  
                formData.append('uploadfile',file,filename);
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
.van-doc-demo-section {
    margin-top: -56px;
    padding-top: 56px;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 20px;
}
.van-doc-demo-block__title {
    margin: 0;
    padding: 15px 15px 15px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
}
div>>>.van-uploader {
    margin-left: 16px;
}



</style>
