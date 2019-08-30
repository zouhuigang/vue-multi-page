<template>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide><img src="../images/ad/sport1.jpg" class="demo"></swiper-slide>
        <swiper-slide><img src="../images/ad/sport2.jpg"  class="demo"></swiper-slide>
        <swiper-slide><img src="../images/ad/sport3.jpg"  class="demo"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    }
  }
</script>

<style scoped>
.demo{
  width:100%;
  height:200px;
}
</style>
