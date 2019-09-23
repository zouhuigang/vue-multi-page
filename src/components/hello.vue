<template>
    <div id="app">
        <default-patient-layout :active="active">
            <div class="main-section">
              <section class="msection">
                
                <van-row>
                  <van-col span="8"><h2 class="van-doc-demo-block__title">我的预约</h2></van-col>
                  <van-col span="8"  offset="8" style="text-align:right;padding: 8px 10px 8px 0;"><van-button icon="add-o"  size="small" type="primary" @click="jump">新建预约</van-button></van-col>
              </van-row>
              </section>

               <section class="van-doc-demo-section">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                    <section 
                    v-for="item in list"
                    :key="item.id"
                    :title="item.id"
                    class="section-order"
                    > 
                      <!-- 我的预约 -->
                      <order-one-component v-if="item.status>1" :data="item" :dataOne="userInfo.realname"></order-one-component>
                      <order-two-component v-if="item.status==OrderUnConfirmed" :data="item" :dataOne="userInfo.realname"></order-two-component>
                    </section>
                </van-list>
              </section>


           </div>
        </default-patient-layout>
    </div>
</template>


<script>
import DefaultPatientLayout from '@/layout/patient/default.vue'
import OrderOneComponent from '@/components/order/one.vue'
import OrderTwoComponent from '@/components/order/two.vue'
import { Toast  } from 'vant';
import api from '@/libs/api.js';
import store from '@/store';
import url from '@/libs/url';
export default {
  name: 'app',
  components: { DefaultPatientLayout,OrderOneComponent,OrderTwoComponent },
  data(){
    return {
      active:"home",
      list: [],
      loading: false,
      finished: false,
      userInfo:{},
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
                form_data["source_page"]="user_myorder_list"
                return api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                          this.userInfo=res.result.info;
                    }
                });
            },
      onLoad() {
            let form_data={}
            return api.MyOrderList(JSON.stringify(form_data)).then((res)=>{
                    // 加载状态结束
                    this.loading = false;
                    if(res.error ==api.ERR_OK){
                        
                        if(res.result.list.length>0){
                            this.list=res.result.list;
                            this.finished = true;
                            // for (let i = 0; i < this.fileList.length; i++) { 
                            //     let rd={}
                            //     rd["type"]="image";
                            //     rd["content"]=this.fileList[i].image;
                            //     this.list.push(rd);
                            // }
                          
                        }else{
                          // 数据全部加载完成
                          this.finished = true;
                        }
                    }else{
                        Toast(res.error_description);
                    }
            })
    },
    jump(){
      window.location.href="/user/story/submit"
    }
   }, 
   computed:{
    },
    created(){

    },
    mounted(){//验证本地存储的token是否合法
        this.getUserInfo();
    }
}
</script>

<style scoped>

.main-section{
    box-sizing: border-box;
    min-height: 100vh;
    background: #f0f0f0;
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



</style>
