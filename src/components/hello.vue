<template>
  <default-layout>
      <swiper-component></swiper-component>
      <div style="width: 90%;margin:10px auto;">
          <Input prefix="ios-search" placeholder="请输入岗位名称或任务名称查找"  />
      </div>

      <div class="item-content">
        <Row class="item" v-for="data in dataList">
            <Row style="height:35px;line-height:35px;width:96%;margin:0 auto;margin-top:5px;">
                <Col span="16" class="item-title">公司资料信息录入员</Col>
                <Col span="8" style="text-align:right"><strong class="font">500</strong> 积分/天</Col>
                <Col span="24" class="msg"><svg class="icon" aria-hidden="true"><use xlink:href="#iconlocation"></use></svg>北京市北京市</Col>
                <Col span="24" class="msg"><svg class="icon" aria-hidden="true"><use xlink:href="#iconmt-icon-time"></use></svg>2019-01-27 15:14 早9:00-晚17:00</Col>
                
                <Col span="16" style="margin-bottom:15px;"><svg class="icon" aria-hidden="true"><use xlink:href="#iconfabu_huaban"></use></svg>发布时间:6月27日</Col>
                <Col span="8" style="margin-bottom:15px;text-align:right"><Button class="ibutton">申请任务</Button></Col>
            </Row>
        </Row>

      </div>
  </default-layout>
</template>

<script>
import SwiperComponent from 'components/swiper.vue'
import DefaultLayout from '@/layout/default.vue'
export default {
  name: 'hello',
  components: {
      DefaultLayout,
      SwiperComponent
  },
  data () {
    return {
      dataList: [
        { name: 'Runoob' },
        { name: 'Google' },
        { name: 'Taobao' },
        { name: 'Taobao' }
      ]
    }
  }
}
</script>

<style  scoped>
.icon {
  width: 16px; 
  height: 16px;
  fill: currentColor;
  overflow: hidden;
  margin-right:5px;
  padding-top:5px;
}
.item-content{
  width:100%;
  margin-bottom:70px;
}

.item{
  width:100%;
  background: #fff;
  margin-bottom:10px;
}
.font{
  color:#f30;
  font-size:18px;
}
.item-title{
  font-size:16px;
  font-weight: bold;
}
.ibutton{
  border:1px solid #008000;
  color:#008000;
}
.msg{
  line-height:25px;
  height:25px;
}
</style>
