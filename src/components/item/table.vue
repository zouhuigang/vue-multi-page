<template>
    <div class="zhg-item">
        <div class="title">{{mytitle}}</div>
        <div class="value"><slot name="value"></slot></div>
    </div>
</template>

<script>
// import { ImagePreview   } from 'vant';  @click="getImg(item.content,0)"
export default {
  name: 'TableComponent',
  props: {
      dataList: {
        type: Array,
        default:()=>[]
      },
      title:{
          type:String,
          default:""
      }
  },
  data(){
    return {
      mydataList:this.dataList,
      mytitle:this.title
    }
  },
  methods:{
      jump(){
          window.location.href="/user/order/detail?order_id="+this.mydata.id
      }
  },
  watch:{
      dataList:{
        handler:function(val,oldval){
          this.mydataList=val;
        },
        deep:true//对象内部的属性监听，也叫深度监听
      }
  }
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
}

.zhg-item {
    height: 50px;
    border-bottom: 0 solid #ebedf0;
    border-width: 1px
}

</style>