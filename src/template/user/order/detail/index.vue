<template>
    <div id="app">
        <default-patient-layout :active="active">
            <div class="main-section">
              <section class="msection">
                <h2 class="van-doc-demo-block__title">我的预约详情</h2>
              </section>

               <section class="van-doc-demo-section">
                <van-cell-group>
                  <van-cell title="病人姓名:" :value="orderInfo.patient_realname" />
                  <van-cell title="年龄:" :value="orderInfo.patient_age" />
                  <van-cell title="性别:" :value="orderInfo.patient_sex" />
                  <van-cell title="需求描述:" :value="orderInfo.disease_desc"/>
                  <requirement-component :dataList="orderInfo.requirement_desc"></requirement-component>
                </van-cell-group>
             
              </section>

              <section v-if="orderInfo.status==OrderUnConfirmed" class="order-status-one">
              您的信息已经递交，平台将在1个工作日之内与您取得电话联系，初步了解您的具体情况与需求，为您匹配合适的服务。<br/>
              请保持电话畅通，您将收到13866668888的电话
              </section>

              <section v-if="orderInfo.status==OrderConfirmed" class="order-status-one">
                <div class="title">沟通后整理需求:</div>
                <div class="content">
                  1、获得一个月私人医生服务。{{orderInfo.docker_realname}}医生将为您提供医疗分析建议，以及治疗规划服务<br/>
                  2、陪诊对接{{orderInfo.hosptial_name}}{{orderInfo.docker_realname}}医生，一次门诊陪诊
                </div>
             
               <div style="width:100%;margin:10px auto;text-align:center;"> <van-button round type="primary" style="width: 60%;" @click="goPay">支付<strong>{{orderInfo.amount}}</strong>元</van-button></div>
              </section>

              <section v-if="orderInfo.status==OrderPaymented" class="order-status-one">
               
               <div style="width:100%;margin:10px auto;text-align:center;"> <van-button  icon="user-o" color="#7232dd" round type="primary" style="width: 60%;" @click="jump">与陪诊聊天</van-button></div>
              </section>


           </div>
        </default-patient-layout>
    </div>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import RequirementComponent from '@/components/order/requirement.vue'
import wexinPay from '@/libs/jsapipay'
import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,RequirementComponent },
  data(){
    return {
      active:"",
      list: [],
      loading: false,
      finished: false,
      userInfo:{},
      orderInfo:{},
      order_id:0,
      OrderUnknown:0,
      OrderUnConfirmed:1,
      OrderConfirmed:2,
      OrderPaymented:3,
      OrderSeekedDoctor: 4,
      OrderApplyRefund:5,
      OrderRefunded:6,
    }
  },
   methods: {
     getUserInfo(){
        let form_data={}
        form_data["source_page"]="user_order_detail"
        return api.getUserInfo(JSON.stringify(form_data)).then( res => {
              if(res.error ==api.ERR_OK){
                this.userInfo=res.result.info;
              }
        });
      },
      getOrderInfo(){
          let form_data={}
          form_data["id"]=parseInt(this.order_id)
          return api.MyOrderInfo(JSON.stringify(form_data)).then( res => {
                if(res.error ==api.ERR_OK){
                      this.orderInfo=res.result.info;  
                }
          });
      },
      jump(){
        window.location.href="/chat?order_id="+parseInt(this.order_id)+"&to_uid="+this.orderInfo.AccompanistUserId
      },
      paySuccess(res){
        if (res.errMsg == "chooseWXPay:ok") {
						//支付成功
            Toast('支付成功');
            window.location.reload();
				} else {
						Toast(res.errMsg);
				}
      },
      payError(res){
        alert(res.errMsg);
      },
      goPay(){
          let form_data={}
          form_data["id"]=parseInt(this.order_id)
          return api.PayWeixin(JSON.stringify(form_data)).then( res => {
                if(res.error ==api.ERR_OK){
                    let payConfig=res.result.jsApiParam;
                    wexinPay(payConfig,this.paySuccess,this.payError)
                }else{
                  Toast(res.error_description);
                }
          });
      }
   }, 
   computed:{
    },
    created(){

    },
    mounted(){//验证本地存储的token是否合法
        var t=this;
        t.order_id=url.getQueryString('order_id');
        t.getUserInfo();
        t.getOrderInfo();
    }
}
</script>

<style scoped>

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


</style>
