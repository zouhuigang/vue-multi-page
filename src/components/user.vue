<template>
  <default-layout>
      <div class="item-content">
          <img src="../images/ad/center.jpg"  class="demo">
      </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'
export default {
  name: 'hello',
  components: {
      DefaultLayout
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
.demo{
    width:100%;
}
</style>
