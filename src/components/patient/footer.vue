<template>
        <van-tabbar v-model="myactive">
          <van-tabbar-item name="home" icon="home-o" url="/">我的预约</van-tabbar-item>
          <van-tabbar-item name="personal_doctor" icon="like-o" url="/user/personal/doctor">私人医生</van-tabbar-item>
          <van-tabbar-item name="user_center" icon="friends-o"  url="/user/center">我的信息</van-tabbar-item>
        </van-tabbar>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
      active: {
        type: String,
        'default': "" 
      }
  },
  data(){
    return {
      myactive:this.active
    }
  },
  methods:{
  }
}
</script>
