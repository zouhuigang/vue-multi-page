<template>
  <div class="wrapper">
     <div class="wrapper-content ivu-article">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import HeaderComponent from 'components/header.vue'
import FooterComponent from 'components/footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
      HeaderComponent,
      FooterComponent
  },
  data () {
    return {
      msg: 'VUE多页面脚手架_这是组件里面的内容'
    }
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
