<template>
  <div class="wrapper">
     <div class="wrapper-content ivu-article">
          <slot></slot>
      </div>
    <footer-patient-component v-if="!forceCloseFooter && myfooter" :active="myactive"></footer-patient-component>
  </div>
</template>

<script>
//import HeaderPatientComponent from 'components/patient/header.vue'
import FooterPatientComponent from 'components/patient/footer.vue'
export default {
  name: 'DefaultPatientLayout',
  components: {
      //HeaderPatientComponent,
      FooterPatientComponent
  },
  props: {
    active: {
      type: String,
      'default': "" 
    },
    footer:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      myfooter:this.footer,
      myactive:this.active,
      forceCloseFooter:false,
    }
  },
  methods:{
    init(){
      if(this.isWeiXin()){
        this.forceCloseFooter=true;
      }
    },
    isWeiXin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          console.info("是微信服务器");
          return true;
      }else{
          console.info("不是微信服务器");
          return false;
      }
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style scoped>
.wrapper-content{
  padding:0px;
}
  .top{
        padding: 10px;
        background: #2d8cf0;
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
