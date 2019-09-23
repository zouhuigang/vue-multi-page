<template>
   <default-patient-layout  :footer="showFooter">
        <div>
            <van-search
            v-model="keys"
            placeholder="请输入陪诊人员名称、联系方式"
            show-action
            @search="onChange"
            @cancel="onCancel"
            >
            </van-search>
            <van-card
                v-for="(item,index) in list"
                :key="item.id"
                :tag="item.WechatNickname"
                :thumb="item.WechatAvatar"
            >
                <div slot="title">
                    <strong>{{item.RealName}}</strong>
                    <van-tag plain type="danger">{{item.Mobile}}</van-tag>
                    <van-tag plain type="success">{{item.Sex}}</van-tag>
                </div>
                <div slot="desc">
                     <p>&nbsp;</p>
                     <van-button size="small" type="primary"  :disabled="!item.invite_enable" @click="invitationHandle(item.Id,index)" :ref="`inviteButton${index}`">{{item.msg}}</van-button>
                </div>
            </van-card>
        </div>
  </default-patient-layout>
</template>

<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import RequirementComponent from '@/components/order/requirement.vue'
// import ChatSendComponent from '@/components/chat/send.vue'
import ChatBodyComponent from '@/components/chat/body.vue'
import TitleComponent from '@/components/item/title.vue'


import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,RequirementComponent,ChatBodyComponent,TitleComponent },
  data(){
    return {
      userInfo:{},
      orderInfo:{},
      showFooter:false,
      contactAvatarUrl:"",
      ownerAvatarUrl:"",
      chatList: [],
      to_uid:0,
      order_id:0,
      scrollState: true, // 是否可以滑动
      loaded: false,//分页加载
      page: 1,
      pageSize:15,
      status:1,
      amount:0,
      order_status:0,
      list: [],
      keys:""
    }
  },
   methods: {
            invitationHandle(uid,index){
                let _t=this;
                let curButton=_t.$refs[`inviteButton`+index];
     
                let form_data={}
                form_data["id"]=parseInt(this.order_id)
                form_data["uid"]=parseInt(uid)
                return api.InvitationToOrder(JSON.stringify(form_data)).then( res => {
                        if(res.error ==api.ERR_OK){
                            Toast("分配成功");
                            curButton.disabled=true
                            curButton.style.opacity =  0.5;
                            curButton.innerText ="已分配成功"
                        }else{
                          Toast(res.error_description);
                        }
                });
            },
            onChange(){
                //console.info("搜索",this.keys);
                this.getAdminAccompanistList();
            },
            onCancel(){
                this.$router.push({path:'/'}); 
            },
            getOrderStatusSelected(){
                console.log(this.order_status)
            },
            updateOrder(){
                let form_data={}
                form_data["id"]=parseInt(this.order_id)
                form_data["amount"]=parseFloat(this.amount)
                form_data["status"]=parseInt(this.order_status)
                form_data["action"]="update"
                return api.AdminUpdateOrder(JSON.stringify(form_data)).then( res => {
                        if(res.error ==api.ERR_OK){
                            Toast("修改成功");
                        }else{
                          Toast(res.error_description);
                        }
                });
            },
             onMoneyBlur(){
                if(!/^[0-9]+(\.?(?=[0-9])[0-9]{0,2})?$/.test(this.amount)){
                    this.amount = 0;
                    return;
                }
            },
            init(){
                var t=this;
                t.order_id=parseInt(url.getQueryString('order_id'));
                console.info("订单"+t.order_id);
                this.getAdminAccompanistList();
            },
            getAdminAccompanistList(){
                let form_data={}
                form_data["id"]=parseInt(this.order_id)
                form_data["keys"]=this.keys
                return api.AdminAccompanistList(JSON.stringify(form_data)).then( res => {
                        if(res.error ==api.ERR_OK){
                            this.list=res.result.list;
                          
                        }else{
                          Toast(res.error_description);
                        }
                });
            },
            sendSuccess(mess_type,mess_content,preview_url){
                let _this=this;
                console.info(mess_type,mess_content);
                if(mess_type=="text"){
                    let chat={}
                    chat["chat_type"]="text"
                    chat["status"]=1
                    chat["direction"]=2
                    chat["content"]=mess_content
                    chat["ctime"]=new Date().toLocaleString()
                    _this.chatList.push(chat)
                }else if(mess_type=="image"){
                    let chat={}
                    chat["chat_type"]="image"
                    chat["status"]=1
                    chat["direction"]=2
                    chat["content"]=preview_url
                    chat["ctime"]=new Date().toLocaleString()
                    _this.chatList.push(chat)
                }
                
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
          //http://localhost:8080/chat?order_id=4&to_uid=2
    },
    mounted(){//验证本地存储的token是否合法
        this.init();
        console.info("token",this.token);
    }
}
</script>
