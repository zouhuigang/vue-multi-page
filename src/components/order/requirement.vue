<template>
    <div>
        <div class="title">病情描述:</div>
        
        <van-row class="item-content">
          <div class="item"  
              v-for="item in mydataList"
              :key="item.id"
              :title="item.id"
          >
            <van-col v-if="item.type=='text'"  span="24" style="margin:5px 0;">{{item.content}}</van-col>
            <van-col v-if="item.type=='image'" span="8"><van-image width="100" height="100" :src="item.content" /></van-col>
          </div>
        </van-row>
    </div>
</template>

<script>
// import { ImagePreview   } from 'vant';  @click="getImg(item.content,0)"
export default {
  name: 'RequirementComponent',
  props: {
      dataList: {
        type: Array,
        default:()=>[]
      }
  },
  data(){
    return {
      mydataList:this.dataList
    }
  },
  methods:{
    // getImg(item,index){
    //   let images=[item]
    //   ImagePreview({
    //       images:images,
    //       showIndex:true,
    //       loop:false,
    //       startPosition:index
    //   })
    // },
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
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}

.item-content{
  padding:10px 15px;
}
.item{
    box-sizing: border-box;
}


</style>