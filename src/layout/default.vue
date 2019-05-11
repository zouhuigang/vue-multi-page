<template>
  <div class="wrapper">
    <header-component></header-component>
     <div class="wrapper-container">
                    <Row>
                        <!--左侧菜单 -->
                        <i-col span="4" class="wrapper-navigate">
                            <!-- <Navigate :type="activeKey"></Navigate> -->
                        </i-col>
                        <!--中间菜单 -->
                        <i-col span="17">
                            <div class="wrapper-content ivu-article">
                                <slot></slot>
                            </div>
                        </i-col>
                        <!-- 右侧菜单 -->
                        <i-col span="3">
                            <template>
                                <a  href="javascript:;"  class="wrapper-aside wrapper-aside-no-padding">
                                <img src="../images/ad/an_2.png">
                                </a>
                            </template>
                        </i-col>
                    </Row>
      </div>
    <footer-component></footer-component>
    <BackTop :height="100" :bottom="50">
        <div class="top">返回顶端</div>
    </BackTop>
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
  .top{
        padding: 10px;
        background: #2d8cf0;
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
