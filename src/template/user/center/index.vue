<template>
   <default-patient-layout :active="active">
    <section class="user-poster">

        <van-row  type="flex" class="user-info">
            <van-col span="8" style="text-align: center;">
                <van-image
                    round
                    width="68px"
                    height="68px"
                    :src="userInfo.avatar"
                    />
            </van-col>
            <van-col span="16"><h2>{{userInfo.nickname}}</h2><br/>{{userInfo.mobile}}</van-col>
        </van-row>

    </section>
    
    <!-- <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row> -->

    <!-- <van-cell-group class="user-group">
      <van-cell icon="records" title="账单" is-link />
    </van-cell-group> -->

    <van-cell-group>
      <!-- <van-cell icon="user-o" title="家庭成员" is-link />
      <van-cell icon="bookmark-o" title="需求记录" is-link />
      <van-cell icon="gem-o" title="推荐链接" is-link /> -->
      <van-cell 
        v-for="(item,index) in menuList"
        :key="index"
        :title="item.title"
        :icon="item.icon" 
        :url="item.url" 
        is-link />
      <van-cell 
      icon="info-o" 
      title="测试退出" 
      @click="logout" />
    </van-cell-group>
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
      userInfo:{},
      active:"user_center",
      menuList:[]
    }
  },
   methods: {
            getMenuList () {
                let form_data={}
                form_data["source_page"]="user_center"
                return api.MenuList(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                        this.menuList=res.result.list;
                    }
                });       
            },
            getUserInfo(){
                let form_data={}
                form_data["source_page"]="user_center"
                return api.getUserInfo(JSON.stringify(form_data)).then( res => {
                     if(res.error ==api.ERR_OK){
                        this.userInfo=res.result.info;
                    }
                });
            },
            init(){
                this.getUserInfo();
                this.getMenuList();
            },
            logout (file) {
                Toast("清空本地token成功");
                store.commit("logout");
                return false; // 阻止Upload的默认上传
            },
            
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
        this.init();
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