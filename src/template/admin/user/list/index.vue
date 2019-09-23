<template>
   <default-patient-layout  :footer="showFooter">
       <user-component 
            padding="5px 0" 
            title="哈哈哈" 
            value="新用户" 
            image="http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLBM5g8qAPVD7GbHOqOljPTS6HD0L74BHdbRxZ5JCsh2py4nIUguYOjZIjYs21ibBC7UB16GyGkq5rg/132"
            data1="推荐人:陪诊1号"
            data2="注册时间:2019-09-23 11:23:56"
            data3="sdasdsadsadas"
       />
  
   </default-patient-layout>
</template>

<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import UserComponent from '@/components/item/user.vue'


import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,UserComponent },
  data(){
    return {
      userInfo:{},
      showFooter:false
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