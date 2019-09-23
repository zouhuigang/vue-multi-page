<template>
    <div>
        <!-- <i-Button :disabled="disabled || time > 0" long>{{ text }}</i-Button> -->
          <van-button :disabled="disabled || time > 0" slot="button" size="small" type="primary">{{ text }}</van-button>
    </div>
</template>

<script>
// http://www.cnblogs.com/gaomanito/p/9505816.html
import { Button } from 'vant';
export default {
   name:"timerBtn",
    data () {
        return {
             time:0
        }
    },
    props: {
      second: {
        type: Number,
        'default': 60 
      },
      disabled: {
        type: Boolean,
        'default': false
      }
  },
  methods: {
    run: function() {
      this.time = this.second;
      this.timer();
    },
    stop: function(){
         this.time = 0;
         this.disabled = false;
    },
    timer: function() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    }
  },
  computed: {
    text: function() {
      return this.time > 0 ? this.time + 's再获取' : '获取验证码';
    }
  }
}
</script>

<style>
</style>