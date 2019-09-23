<template>
    <div @click="jump">
        <van-row style="border-bottom: 1px solid #e2e2e2;padding:5px 0;">
                <van-col span="16">
                <div  class="section-order-title">陪诊</div>
                </van-col>
                <van-col span="8" style="text-align:right">
                    {{mydata.status_txt}}
                </van-col>
        </van-row>
        <van-row style="margin:5px 0;">
            <van-col span="24" class="section-order-info">{{mydata.patient_realname}}</van-col>
            <van-col span="24" class="section-order-intro">下单时间: {{mydata.ctime}}</van-col>
            <van-col span="24" class="section-order-intro" v-if="mydata.amount>0">订单金额: <strong style="color:#f30">{{mydata.amount}}</strong>元</van-col>
            <van-col span="24" class="section-order-intro" v-if="mydata.amount<=0">订单金额: 未设置</van-col>
        </van-row>
    </div>
</template>

<script>
export default {
  name: 'OrderOneComponent',
  props: {
      data: {
        type: Object,
        'default': {} 
      },
      dataOne:{
          type:String,
          'default':""
      }
  },
  data(){
    return {
      mydata:this.data,
      mydataOne:this.dataOne
    }
  },
  methods:{
      jump(){
          window.location.href="/admin/order/detail?order_id="+this.mydata.id
      }
  },
   watch:{
      dataOne:{
        handler:function(val,oldval){
          this.mydataOne=val;
        }
      }
  }
}
</script>
<style scoped>



.section-order-name {
    padding-right: 5px;
    font-size: 15px;
    color: #323232;
}

.section-order-info {
    padding: 15px 12px 17px 18px;
    word-break: break-all;
}

.section-order-title {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    color: #323232;
}

.section-order-intro {
    padding-top: 6px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
    color: #969696;
}

.section-order-date {
    font-size: 12px;
    color: #bbb;
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