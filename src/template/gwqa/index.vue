<template>
<div>
<full-page :options="options" ref="page">
<!--      第一屏-->
      <div class="section">
            <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/1.jpg">
            </div>
      </div>
<!--      第二屏-->
      <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/2.jpg">
        </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/3.jpg">
        </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/4.jpg">
        </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/5.jpg">
        </div>
      </div>
       <div class="section">
            <div class="iw-video-box">
                        <video width="100%"  controls>
                            <source src="https://cdn-oss.yyang.net.cn/static/wishyoung/1630997736197444.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
            </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/6.jpg">
        </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/7.jpg"  usemap="#mymap1">
        </div>
          <map name="mymap1" id="mymap1" >
            <area shape="rect"  :coords="coords1"  :href="shareUrl" target="_blank" >
        </map>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/8.jpg"  usemap="#mymap2">
        </div>
          <map name="mymap2" id="mymap2" >
            <area shape="rect"  :coords="coords2"  :href="shareUrl" target="_blank" >
        </map>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/9.jpg">
        </div>
      </div>
    </full-page>
</div>
</template>


<script>
    import { Poptip,Row  } from 'zantui';
    import api from '@/libs/api.js';
    export default {
        name: 'app',
        data() {
            return {
                options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
          afterLoad: this.afterLoad,
          scrollOverflow: true,
          navigation: true,//是否显示导航，默认为false
          navigationPosition: 'right',//导航小圆点的位置
          scrollBar: false,
          keyboardScrolling: false,//是否可以使用键盘方向键导航，默认为true
          continuousVertical: false, /// 是否循环滚动，默认为false。如果设置为true，则页面会循环滚动，而不像loopTop或loopBottom那样出现跳动，注意这个属性和loopTop、loopBottom不兼容和，不要同时设置
          menu: '#menu',
          sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#000', '#2c3e4f', '#ba5be9', '#b4b8ab']
       
      },
                shareUrl:'',
                showVideo:false,
                value1: 0,
                clientHeight:"",
                coords1:"",
                coords2:""
            }
        },
        methods: {
            click() {
                // vue调用fullpapge的方法
                this.$refs.page.api.moveSectionDown();
                // moveSectionDown();
            },
            getRequest(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return r[2];
                    return "";
            },
            jumpPage(nextPage) {
                this.curpage = nextPage;
                this.search();
            },
            jump(errLink, target){
                if(target == '_blank') {
                    window.open(errLink,'_blank')
                }else{
                    window.location.href = errLink;
                }

            },
            csChange(oldValue, value) {
                console.info(oldValue, value);
                if(value === 4){
                    this.showVideo = true;
                }else{
                    this.showVideo = false;
                }

            }
        },
        created: function () {
            let t = this.getRequest("t");
            this.shareUrl = 'https://www.tv8081.cn/tongj/index_cy.html?partnerId='+t;
            this.coords1 = "0,300,828,1616";
            this.coords2 = "0,300,828,1616";
            console.info(this.coords1,this.clientHeight);
        },
        mounted(){
            this.clientHeight =   `${document.documentElement.clientHeight}`
            let that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.clientHeight = window.screenWidth
                })()
                }
        }
    }
</script>

<style scoped>
    .iw-video-box{
        width:100%;
        margin:0 auto; 
        position: relative;
        top: 40%;
        left:0;
    }
    .demo-carousel {
       width:100%;
       height:100%;
       min-height:100%;
    }
    .demo-carousel img {
        width:100%;
        border:0;
        height: 100%;
    }
    div >>> .ivu-carousel-arrow{
        top:auto;
        background-color: rgba(31,45,61,.5);
        bottom:10px;
    }
</style>
