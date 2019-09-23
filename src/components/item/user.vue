<template>
<div :style="{padding:padding}">
    <div class="zhg-item">
        <div class="zli image"><img class="box" :src="myimage"/></div>
        <div class="zli title">{{mytitle}}</div>
        <div class="zli value"><slot name="value">{{myvalue}}</slot></div>
    </div>
    <div class="dataList">
        <div class="data" v-if="data1">{{data1}}</div>
        <div class="data" v-if="data2">{{data2}}</div>
        <div class="data" v-if="data3">{{data3}}</div>
    </div>
</div>
</template>

<script>
// import { ImagePreview   } from 'vant';  @click="getImg(item.content,0)"
export default {
  name: 'UserComponent',
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
      },
      padding:{
          type:String,
          default:"0px"
      },
      data1:{
          type:String,
          default:""
      },
      data2:{
          type:String,
          default:""
      },
      data3:{
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
<style lang="less" scoped>
@width:40px;
@logoWidth:@width+26;
@height:@width;
@padding:10px 16px;
@color:#fff;
@dataHeight:25px;

.box{
    width:@width;
    height:@height;
}

.title {
    box-sizing: border-box;
    padding: 10px 0;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: @color;
    float: left;
    width: calc(~"50% - @{logoWidth}");
}

.value{
    box-sizing: border-box;
    padding: @padding;
    overflow: hidden;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    background: @color;
    width:50%;
}

.zhg-item {
    height: 51px;
    border-bottom: 0 solid #ebedf0;
    border-width: 1px;
}

.zli{
    float: left;
    height: 50px;
}

.image{
  padding: 5px 5px 5px 16px;
  width:@logoWidth;
  background-color: @color;
}

.dataList{
    padding: @padding;
    background-color: @color;
}

.data{
    height: @dataHeight;
    line-height: @dataHeight;
}

</style>