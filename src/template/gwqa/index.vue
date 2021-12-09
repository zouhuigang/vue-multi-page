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
        <div class="demo-carousel bg">
             <video ref="videoPlayer" class="video-js video-box"
              loop 
              preload="auto"
              x-webkit-airplay="allow"
              playsinline
              webkit-playsinline>
                <source
                    src="https://cdn-oss.yyang.net.cn/static/wishyoung/1630997736197444.mp4"
                    type="video/mp4"
                />
                </video>
        </div>
      </div>
       <!-- <div class="section">
            <div class="iw-video-box">
                        <video width="100%"  controls>
                            <source src="https://cdn-oss.yyang.net.cn/static/wishyoung/1630997736197444.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
            </div>
      </div> -->
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/6.jpg">
        </div>
      </div>
       <div class="section">
        <div class="demo-carousel">
             <!-- <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/7.jpg"  usemap="#mymap1"> -->
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/11.png">
        </div>
          <!-- <map name="mymap1" id="mymap1" >
            <area shape="rect"  :coords="coords1"  :href="shareUrl" target="_blank" >
        </map> -->
      </div>
       <div class="section">
        <div class="demo-carousel">
             <!-- <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/8.jpg"  usemap="#mymap2"> -->
              <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/12.png">
        </div>
          <!-- <map name="mymap2" id="mymap2" >
            <area shape="rect"  :coords="coords2"  :href="shareUrl" target="_blank" >
        </map> -->
      </div>
       <div class="section">
        <div class="demo-carousel">
             <img src="https://cdn-oss.yyang.net.cn/static/wishyoung/9.jpg">
        </div>
      </div>
    </full-page>

 
  <!-- <Modal v-model="showVideo" footer-hide :closable="false" @on-cancel="cancel">
          <video ref="videoPlayer" class="video-js" webkit-playsinline>
            <source
                src="https://cdn-oss.yyang.net.cn/static/wishyoung/1630997736197444.mp4"
                type="video/mp4"
            />
            </video>
    </Modal> -->
</div>
</template>


<script>
    import { Poptip,Row  } from 'zantui';
    import api from '@/libs/api.js';
    import wxapi from './wxShare';
    export default {
        name: 'app',
        data() {
            return {
                player: null,
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
          afterLoad(origin, destination, direction) {
            if(destination.index == 4 && this.player){
              let __this = this;
              //为防止干扰用户,需要等待一段时间播放
               setTimeout(function() {
                  __this.player.play();
                  __this.player.options_.muted = false;
                  console.info(__this.player.options_.muted);
              }, 100);
            }else if(this.player){
              this.player.pause();
            }
            // console.info(origin.index,destination);
            //console.log("Emitted 'after load' event.",origin, destination, direction);
          },
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
            cancel () {
                 if (this.player) {
                        this.player.pause()
                    }
            },
               //分享前的验证签名，因为Android和IOS在进入微信后路由变化的逻辑是不同的，所以要判断一下，IOS只能分享第一次进来时候的路由地址（IOS待验证，后面来填坑）
            checkSign(){
                // window.__wxjs_is_wkwebview为true 时 为 IOS 设备 false时 为 安卓 设备
                if (window.__wxjs_is_wkwebview) {  // IOS
                if (window.entryUrl == '' || window.entryUrl == undefined) {
                    var url = location.href.split('#')[0]
                    window.entryUrl = url    // 将后面的参数去除
                }
                    wxapi.wxRegister(location.href.split('#')[0],'ios');
                }else {       // 安卓
                setTimeout(function () {
                    wxapi.wxRegister(location.href.split('#')[0],'android');
                }, 500);
                }
            },
            csChange() {
                this.showVideo = true;
                 if (this.player) {
                        this.player.play()
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
        mounted() {
    // 播放参数
    let options = {
      controls: true, // 是否显示底部控制栏
      preload: "auto", // 加载<video>标签后是否加载视频
      autoplay: "autoplay", // muted 静音播放
      // playbackRates: [0.5, 1, 1.5, 2],// 倍速播放
      width: "100%",
      height: "180",
      controlBar: {
        // 自定义按钮的位置
        children: [
          {
            name: "playToggle"
          },
          {
            name: "progressControl"
          },
          {
            name: "currentTimeDisplay"
          },
          {
            name: "timeDivider"
          },
          {
            name: "durationDisplay"
          },

          {
            name: "volumePanel", // 音量调整方式横线条变为竖线条
            inline: false
          },
          {
            name: "pictureInPictureToggle" //画中画播放模式
          },
          {
            name: "fullscreenToggle"
          }
        ]
      }
    };
    this.player = this.$video(this.$refs.videoPlayer, options,function onPlayerReady() {
      console.log('onPlayerReady', this);
    });

    this.clientHeight =   `${document.documentElement.clientHeight}`
            let that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.clientHeight = window.screenWidth
                })()
                }
    //微信分享
    //据说Android手机端会有延时，就加了500的延时，看情况你们加不加都可以
    setTimeout(()=>{
        this.checkSign();
    },500)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
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
    .bg{
      width:100%;
      height:100%;
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
      background-image: url("https://cdn-oss.yyang.net.cn/static/wishyoung/13.png?x-oss-process=style/img_ys");
    }
    .video-box{
      width:80%;
      top: 52%;
      margin: 0 auto;
    }
    div >>> .ivu-modal-body{
        padding:0px;
    }
</style>
