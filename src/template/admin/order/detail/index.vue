<template>
   <default-patient-layout  :footer="showFooter">
        <div class="main-section">
              <section class="msection">
                <van-row>
                    <van-col span="8"><div class="van-doc-demo-block__title">订单状态</div></van-col>
                    <van-col span="16" style="text-align:right;padding-right:15px;"> 
                        <select class="status-select" v-model="order_status" @change="getOrderStatusSelected" >
                            <option value="0">--请选择--</option>
                            <option 
                            v-for="item in orderStatusList"
                            :key="item.id"
                            :title="item.id"
                            :value="item.value"
                        >{{item.text}}</option>
                        </select>
                    </van-col>    
                </van-row>
                <title-component title="陪诊姓名:">
                     <template slot="value">
                        
                         <div v-if="orderInfo.AccompanistUserId>0">
                            {{orderInfo.accompanist_realname}}
                            <van-tag type="success"   @click="jump">修改</van-tag>
                         </div>
                         <div v-if="orderInfo.AccompanistUserId<=0">
                            <span style="color:#008000" @click="jump">邀请接单</span>
                         </div>
                    </template>
                </title-component>
               
                <title-component title="专科医生:">
                     <template slot="value">
                          <div v-if="orderInfo.DoctorUserId>0">
                            {{orderInfo.doctor_realname}}
                         </div>
                         <div v-if="orderInfo.DoctorUserId<=0">
                            <span >待陪诊接单</span>
                         </div>
                     </template>
                </title-component>
                
               <van-cell-group>
                <van-field
                    v-model="amount"
                    label="价格(元)"
                    placeholder="请输入订单价格"
                    error
                    @blur="onMoneyBlur"
                />
                </van-cell-group>
            
                <div style="text-align:center;margin:10px 0;padding:0 10px 0 10px;">
                    <!-- <van-button plain type="default" size="small">修改</van-button> -->
                    <van-button  type="info" size="small" @click="updateOrder">保存</van-button>
                </div>
                </section>

             

               <section class="van-doc-demo-section">
                <van-cell-group>
                  <van-cell title="病人姓名:" class="patient" :value="orderInfo.patient_realname" />
                  <van-cell title="年龄:" :value="orderInfo.patient_age" />
                  <van-cell title="性别:" :value="orderInfo.patient_sex" />
                  <van-cell title="需求描述:" :value="orderInfo.disease_desc"/>
                  <requirement-component :dataList="orderInfo.requirement_desc"></requirement-component>
                </van-cell-group>
             
              </section>

                 <chat-body-component
                    ref="myScroll" 
                    :on-pull="getChatList" 
                    :scroll-state="scrollState"

                    :data="chatList"
                    :showShade="false"
                    :showLinkAvatar="false"
                    :showNickname="true"
                 ></chat-body-component>

        </div>


        <chat-send-component
        :orderId="order_id"
        :toUid="to_uid"
        @sendSuccess="sendSuccess"
        ></chat-send-component>

  </default-patient-layout>
</template>

<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import RequirementComponent from '@/components/order/requirement.vue'
import ChatSendComponent from '@/components/chat/send.vue'
import ChatBodyComponent from '@/components/chat/body.vue'
import TitleComponent from '@/components/item/title.vue'


import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,RequirementComponent,ChatBodyComponent,ChatSendComponent,TitleComponent },
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
      orderStatusList: [
        { text: '未确认', value: 1 },
        { text: '已确认,待支付', value: 2 },
        { text: '已就诊', value: 4 }
      ],
    }
  },
   methods: {
            jump(){
                this.$router.push({path:'/invite/accompanist',query:{order_id:this.order_id}}); 
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
                let form_data={}
                form_data["source_page"]="user_center"
                api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                        t.userInfo=res.result.info;
                    }
                });
                
                t.order_id=parseInt(url.getQueryString('order_id'));
                t.to_uid=parseInt(url.getQueryString('to_uid'));
                t.getAdminOrderInit();
                t.getChatList();
            },
            getAdminOrderInit(){
                let form_data={}
                form_data["order_id"]=parseInt(this.order_id)
                return api.AdminOrderInit(JSON.stringify(form_data)).then( res => {
                        if(res.error ==api.ERR_OK){
                            this.orderInfo=res.result.info;
                            if(this.orderInfo.amount>0){
                                this.amount=this.orderInfo.amount;
                            }
                            this.order_status=this.orderInfo.status
                        }else{
                          Toast(res.error_description);
                        }
                });
            },
            getChatList(){
                //设置加载状态
                let _this = this;
                _this.$refs.myScroll.setState(1)

                let form_data={}
                form_data["order_id"]=parseInt(this.order_id)
                form_data["page"]=parseInt(_this.page)
                form_data["page_size"]=parseInt(_this.pageSize)
                return api.AdminOrderChat(JSON.stringify(form_data)).then( res => {
                        if(res.error ==api.ERR_OK){
                            let datList= res.result.list;//聊天记录
                            if(datList.length > 0 && !_this.loaded){
                                if (_this.page == 1) {
                                    _this.chatList =datList
                                } else {
                                    _this.chatList.push(...datList)
                                }
                                _this.page++
                                _this.$refs.myScroll.setState(2)
                            }else{
                              if (_this.page == 1) {
                                  _this.chatList = []
                              }
                               _this.loaded = true
                               _this.$refs.myScroll.setState(3)
                            }
                              
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
                    chat["from_wechat_avatar"]=this.userInfo.avatar
                    chat["from_wechat_nickname"]=this.userInfo.nickname
                    chat["content"]=mess_content
                    chat["ctime"]=new Date().toLocaleString()
                    _this.chatList.push(chat)
                }else if(mess_type=="image"){
                    let chat={}
                    chat["chat_type"]="image"
                    chat["status"]=1
                    chat["direction"]=2
                    chat["from_wechat_avatar"]=this.userInfo.avatar
                    chat["from_wechat_nickname"]=this.userInfo.nickname
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

<style scoped>
body{
    background: #F5F5F5
}
.main-section{
    box-sizing: border-box;
    background: #fff;
    margin-bottom:68px;
}
.msection {
    box-sizing: border-box;
    background: #fff;
    width:100%;
}


.section-order{
  padding: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 8px;
  background: #fff;
}

.order-status-one{
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}

.van-doc-demo-block__title {
    margin: 0;
    padding: 15px 15px 15px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
}

div>>>.msg {
    margin-left: 16px;
    font-weight: normal;
    font-size: 14px;
}


.title {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}


.content {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}

.patient>.van-cell__value span{
    color:#008000;
    font-size:14px;
    font-weight: 400;
}

.status-select{
    height:25px;
    margin-top:15px;
    text-align: right;
}
</style>