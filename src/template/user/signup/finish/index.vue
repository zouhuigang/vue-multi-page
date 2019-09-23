<template>
    <div id="app">
        <default-patient-layout>
             <section class="van-doc-demo-block">
                <h2 class="van-doc-demo-block__title">注册完成</h2>
                <van-divider />
                <p class="msg">
                您的信息已经递交，平台将在1个工作日之内与您取得电话联系，初步了解您的具体情况与需求，为您匹配合适的服务。
                <br/><br/>请保持电话畅通，您将收到13866668888的电话</p>
            </section>
            



        </default-patient-layout>
    </div>
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
    return {}
  },
   methods: {
   }, 
   computed:{
    },
    created(){

    },
    mounted(){
    }
}
</script>

<style scoped>
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

div>>>.msg {
    margin-left: 16px;
    font-weight: normal;
    font-size: 14px;
}



</style>
