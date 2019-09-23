<template>
    <div class="container" style="margin-top: 60px">

        <!-- <input hidden type="text" id="prepay_id" value={{.prepay_id}}>
        <input hidden type="text" id="appId" value={{.appId}}>
        <input hidden type="text" id="configtimeStamp" value={{.configtimeStamp}}>
        <input hidden type="text" id="timeStamp" value={{.timeStamp}}>
        <input hidden type="text" id="nonceStr" value={{.nonceStr}}>
        <input hidden type="text" id="paySign" value={{.paySign}}>
        <input hidden type="text" id="signature" value={{.signature}}> -->


        <div class="center-block" style="width: 70%;margin-top: 10%">
            <p  style="font-size: 18px;color: #2CB618"> 微信交易请求申请 </p>
            <p style="font-size: 16px;margin-top: 30px">正在提起微信订单</p>
            <p  style="font-size: 16px;color:#7d7d7d;margin-top: 20px">请勿关闭该页面</p>
        </div>

    </div>

</template>


<script>
import api from '@/libs/api.js';
export default {
   name: 'testPay',
   methods: {
        wxInit() {
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
        }
    }, 
    computed:{
    },
    created(){
    },
    mounted(){//获取微信配置
        this.wxInit();
    }
}
</script>