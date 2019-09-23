<template>
    <div class="zhg-item">
        <!-- <div class="zli image"><img :src="myimage"/></div> -->
        <div class="zli title">{{mytitle}}</div>
        <div class="zli value"><slot name="value">{{myvalue}}</slot></div>
    </div>
</template>

<script>
// import { ImagePreview   } from 'vant';  @click="getImg(item.content,0)"
export default {
  name: 'TitleComponent',
  props: {
      title:{
          type:String,
          default:""
      },
      value:{
        type:String,
        default:""
      },
      image:{
        type:String,
        default:""
      }
  },
  data(){
    return {
      mytitle:this.title,
      myvalue:this.value,
      myimage:this.image
    }
  },
  methods:{
      jump(){
          window.location.href="/user/order/detail?order_id="+this.mydata.id
      }
  },
  // watch:{
  //     dataList:{
  //       handler:function(val,oldval){
  //         this.mydataList=val;
  //       },
  //       deep:true//对象内部的属性监听，也叫深度监听
  //     }
  // }
}
</script>
<style scoped>

.title {
    box-sizing: border-box;
    width: 50%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    float: left;
    height: 50px;
}

.value{
    box-sizing: border-box;
    width: 50%;
    padding: 10px 16px;
    overflow: hidden;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    float: left;
    text-align: right;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    height: 50px;
}

.zhg-item {
    height: 51px;
    border-bottom: 0 solid #ebedf0;
    border-width: 1px;
}

.zli{

}

.image img{
  width:68px;
  height:68px;
}

</style>