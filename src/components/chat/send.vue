<template>
    <footer class="chat-footer">
         <div class="chat-inp-wrap">
                <input type="text" @blur="blur" placeholder="快来和我聊聊天吧"  class="inp-text" v-model="message"> 
                <div class="active"  v-if="message" id="sendMessage" @click="sendMessage">发送</div>	
                <div class="inp-text-btn"  v-if="!message" id="more" @click="more">+</div>	
          </div>
          <div class="more" v-if="showMore">
             <ul>
               <li>
                  <input type="file" @change="selectImgs()" accept="image/*" ref="file" style="display:none"  />
                 <div class="showIcon" @click="uploadImage"><img src="@/images/chat/image.png" width="20px" height="20px"/></div>
                 <div class="showDesc">图片</div>
                </li>
             </ul>
          </div>
    </footer>
</template>

<script>
import lrz from "lrz";
import api from '@/libs/api.js';
import { Toast  } from 'vant';
export default {
  name: 'ChatSendComponent',
  props: {
      orderId: {
        type: Number,
        default:0
      },
      toUid: {
        type: Number,
        default:0
      }
  },
  data(){
    return {
      myOrderId:this.orderId,
      myToUid:this.toUid,
      message:"",
      showMore:false
    }
  },
  methods:{
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
    //选择图片
    selectImgs() {
      var __this=this;  //this指向vue 
      let fileList = this.$refs.file.files
      //图片压缩
      lrz(fileList[0])
            .then(function (rst) {
                // 处理成功会执行
                var file = __this.dataURLtoFile(rst.base64, rst.origin.name);
                __this.onRead(file,rst.origin.name);
            })
            .catch(function (err) {
                // 处理失败会执行
                console.info(err);
                Toast('图片压缩失败，请重试!'+err);
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
    },
    uploadImage(){
      this.$refs.file.click();
    },
    blur(){
      this.showMore=false;
    },
    more(){
      this.showMore=!this.showMore;
    },
    onRead (file,filename) {
                let __this=this;
                let formData = new FormData();  
                formData.append('uploadfile',file,filename);
                return api.uploadImageHandle(formData).then( res => {
                     if(res.error ==api.ERR_OK){
                            let image=res.result.image;
                            let preview=res.result.preview;
                            let imageMessage="[chat][image]("+image+")";
                            __this.realSendMessage("image",imageMessage,preview);
                    }else{
                        Toast(res.error_description);
                    }
                   
                })
      },
    sendMessage(){
            let _this=this;
            let message = this.message;
            if(message.length<1){
                Toast("不能发送空内容！");
                return false;
            }
            return _this.realSendMessage("text",message,"")
			
    },
    realSendMessage(mess_type,mess_content,preview_url){
        let _this=this;
        //发送消息
        let form_data={}
        form_data["order_id"]=this.myOrderId
        form_data["to_userid"]=this.myToUid
        form_data["content"]=mess_content
        return api.ChatSend(JSON.stringify(form_data)).then( res => {
                if(res.error ==api.ERR_OK){
                    Toast("发送成功");
                    _this.$emit('sendSuccess',mess_type,mess_content,preview_url)
                    _this.message="";
                    _this.showMore=false;
                }else{
                    Toast(res.error_description);
                }
        });
    }
  },
  watch: {
      orderId(val) {
        this.myOrderId = this.orderId;
      },
      toUid(val) {
        this.myToUid = this.toUid;
      }
  }
}
</script>
<style scoped>


.chat-footer {
    width: 100%;
    margin:0 auto;
    max-width: 750px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    background: #f5f5f7;
    border-top: 1px solid #ccc;
}

footer .chat-inp-wrap {
    width:100%;
    margin:0 auto;
    max-width: 750px;
    height: 60px;
    background-color: #f0f3f6;
    -webkit-box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50);
    -moz-box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50);
    box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50)
}

footer .inp-text {
    float: left;
    width: 80%;
    height: 60px;
    line-height: 60px;
    border: 0;
    padding: 0;
    font-size: 16px;
    color: #333;
    text-indent: 20px;
    background: rgba(0,0,0,0)
}
/* #3089dc; */
footer .active {
    float: right;
    height: 40px;
    width: 16%;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    background:#3eb94e; 
    color:#fff;
    margin: 10px 2%;
    border-radius: 10px;
}

footer .inp-text:focus {
    background: #fff
}

footer .inp-text-btn {
    display: inline-block;
    width: 20%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    font-size: 0;
    background: url("~@/images/chat/add.png") no-repeat  center;
    /*background-size: contain;*/
    background-size:30px 30px;
    cursor: pointer;
}
 /* #3089dc; */
footer .active {
    float: right;
    height: 40px;
    width: 16%;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    background:#3eb94e;
    color: #fff;
    margin: 10px 2%;
    border-radius: 10px;
}


.ivu-article ul:not([class^=ivu-]) {
    padding-left: 0;
    list-style-type: disc;
}
.more ul{
  list-style: none; /*去掉小圆点*/
  width:100%;
  height:68px;
}
.more ul li{
  float:left;
  width:25%;
  height:68px;
  text-align: center;
}
.showIcon{
  margin-top:5px;
  padding:10px;
  background: #fff;
  width:40px;
  height:40px;
  border-radius: 5px;
  display: inline-block
}
.showDesc{
    margin-top:3px;
    font-size: 10px;
    color:#333;
}
</style>