<template>
    <div class="wxchat-container" :style="{backgroundColor: wrapBg}"  ref="myScroll" @scroll.passive="onScroll($event)"  @touchmove="onScroll($event)">
        <div class="window" id="window-view-container">
            <!-- data is empty -->
            <div class="loading" v-if="dataArray && dataArray.length==0">
                <div style="margin-top: 300px;text-align:center; font-size: 16px;">
                    <span>未查找到聊天记录</span>
                </div>
            </div>

            <!-- loading -->
            <div class="loading" v-if="dataArray &&  dataArray.length==0">
                <div style="margin-top: 300px;">
                        <div>加载中...</div>
                </div>
            </div>

            <!-- main -->
            <div  class="container-main" v-if="dataArray && dataArray.length>0">
                <div class="message">
                    <ul>
                        <li v-for="(message, index) in dataArray" :key="message.id" :class="message.direction==2?'an-move-right':'an-move-left'">
                            <p class="time"> <span v-text="message.ctime"></span> </p>
                            <p class="time system" v-if="message.type==10000"> <span v-html="message.content"></span> </p>
                            <div :class="'main' + (message.direction==2?' self':'')" v-else>
                                <img class="avatar" width="45" height="45" v-if="showLinkAvatar" :src="message.direction==2? ownerAvatarUrl: contactAvatarUrl">
                                <img class="avatar" width="45" height="45" v-if="!showLinkAvatar" :src="message.from_wechat_avatar">
                                
                                <!-- 昵称 -->
                                <div class="nickname" v-if="showNickname">
                                    {{message.from_wechat_nickname}}
                                    <span class="from-type" v-if="message.from_role_type">({{message.from_role_type}})</span>
                                </div>
                                
                                <!-- 文本 -->
                                <div class="text"  v-if="message.chat_type=='text'">{{message.content}}</div>

                                <!-- 图片 -->
                                <div class="text" v-else-if="message.chat_type=='image'">
                                    <img :src="message.content" class="image" alt="聊天图片">
                                </div>

                                <!-- 其他 -->
                                <div class="text" v-else-if="message.chat_type=='other'" v-text="'[暂未支持的消息类型:'+ message.type +']\n\r' + message.content">
                                   
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
                <section class="scroll-bottom">
                    <div v-if="state==1">
                        <i><img :src="Load"/></i>
                        <p>加载中</p>
                        </div>
                    <div v-if="state==2">加载完成</div>
                    <div v-if="state==3">没有数据了</div>
                </section>

            </div>

        </div>

    

    </div>
</template>

<script>
// https://www.jb51.net/article/154116.htm
    import Load from '@/assets/loading/Load.gif'
    export default {
        name: "wxChat",
        props: {
             'onPull': { // 加载回调
                type: Function,
                require: true
            },
            'scrollState': {// 是否可滑动
                type: Boolean,
                require: true
            },
            contactNickname: {
                type: String,
                default: 'Mystic Faces'
            }, 
            data: {
                type: Array,
                default:()=>[],
                required: true
            },
            width: {
                type: Number,
                default: 450,
            },
            wrapBg: {
                type: String,
                default: '#efefef'
            },
            maxHeight: {
                type: Number,
                default: 700
            },
            contactAvatarUrl: {
                type: String,
            },
            ownerAvatarUrl: {
                type: String,
            },
            showLinkAvatar: {// 是否显示外部传过来的头像
                type: Boolean,
                default: true,
            },
            showNickname:{//显示昵称
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                Load,
                isUpperLaoding: false,
                isUnderLaoding: false,
                isRefreshedAll: false,
                isLoadedAll: false,
                
                dataArray: [],
                timeoutId: null,
                state: 0,
                myScroll: null
            }
        },
        created() {
 
            this.initData();
        },
        watch: {
            data:{
                  handler(val, oldVal){
                    this.dataArray = val;
                },
                deep:true
            }
        },
        mounted(){
            // //document.getElementsByTagName('body')[0].scrollTop=0;
            // this.minHeight = document.getElementById('window-view-container').offsetHeight;
            // this.maxHeight = document.getElementById('window-view-container').offsetHeight;
        },
        methods: {
            initData(){
                this.dataArray = this.dataArray.concat(this.data);
            },
             /*
			 * 加载中：1
			 * 加载完成：2
			 * 没有更多：3
			 */
            setState(index) { // 修改状态
                this.state = index
                // console.log(this.state)
            },
            onScroll(e) {
                const _this = this
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                // console.log(window.innerHeight + scrollTop, this.myScroll.offsetHeight)
                if (!this.loaded && window.innerHeight + scrollTop - 50 >= this.myScroll.offsetHeight) {
                    clearTimeout(this.timeoutId)
                    _this.timeoutId = setTimeout(() => {
                    _this.bottomCallback()
                    }, 100)
                }
            },
            bottomCallback() { // 加载回调
                // console.log('回调', new Date().getTime())
                if (this.state != 3) {
                    this.state = 1
                    this.onPull()
                }
            }
        },
         mounted() {
            this.myScroll = this.$refs.myScroll // 获取滑条dom
        }
    }
</script>
<style scoped>
    .ivu-article ul:not([class^=ivu-]) {
        padding: 0;
        list-style-type: disc
    }
    .wxchat-container{ width: 100%; overflow: hidden;}
    .shadow{ position: absolute; top:0; left: 0; z-index: 100; width: 100%; height: 100%; background: #000; opacity: .2; }
    .window {box-shadow: 1px 1px 20px -5px #000;width: 100%;background: #F5F5F5; margin: 0 auto; overflow: hidden; padding: 0;}
    button{border:0; background:none; border-radius: 0;text-align: center;}
    button{outline:none;}
    .w100{width: 100%;}
    .mt5{margin-top: 5px;}
    .mt10{margin-top: 10px;}
    .mt20{margin-top: 20px;}
    .mb10{margin-bottom: 10px;}
    .mb20{margin-bottom: 20px;}
    .fs0{font-size: 0}
    .loading,.no-more{text-align: center; color: #b0b0b0; line-height: 100px;}
    .no-more{line-height: 60px;}
    .pull-right{float: right;}
    .link-line{text-decoration: underline;}
    .message{
        /*height: 100%;*/
        padding: 10px 15px;
        /*overflow-y: scroll;*/
        background-color: #F5F5F5;
    }
    .message li {
        margin-bottom: 15px;
        left:0;
        position: relative;
        display: block;
    }
    .message .time {
        margin: 10px 0;
        text-align: center;
    }
    .message .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: calc(100% - 75px);
        min-height: 35px;
        line-height: 2.1;
        font-size: 15px;
        padding: 6px 10px;
        text-align: left;
        word-break: break-all;
        background-color: #fff;
        color: #000;
        border-radius: 4px;
        box-shadow: 0px 1px 7px -5px #000;
    }
    .message .avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
        background: #fff;
    }
    .message .time>span {
        display: inline-block;
        padding: 0 5px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #DADADA;
    }
    .message .system>span{
        padding: 4px 9px;
        text-align: left;
    }
    .message .text:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fff;
    }
    .message .self {
        text-align: right;
    }
    .message .self .avatar {
        float: right;
        margin: 0 0 0 10px;
    }
    .message .self .text {
        background-color: #9EEA6A;
    }
    .message .self .text:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #9EEA6A;
    }
    .message .image{
        max-width: 200px;
    }
    img.static-emotion-gif, img.static-emotion {
        vertical-align: middle !important;
    }
    .an-move-left{
        left: 0;
        animation: moveLeft .7s ease;
        -webkit-animation:moveLeft .7s ease; 
    }
    .an-move-right{
        left: 0;
        animation: moveRight .7s ease;
        -webkit-animation:moveRight .7s ease; 
    }
    .bgnone{
        background: none;
    }
    @keyframes moveRight{
        0%{left:-20px; opacity: 0};
        100%{left:0; opacity: 1}
    }
    @-webkit-keyframes moveRight
    {
        0%{left:-20px; opacity: 0};
        100%{left:0px; opacity: 1}
    }
    @keyframes moveLeft{
        0%{left:20px; opacity: 0};
        100%{left:0px; opacity: 1}
    }
    @-webkit-keyframes moveLeft
    {
        0%{left:20px; opacity: 0};
        100%{left:0px; opacity: 1}
    }
    @media (max-width: 367px){
        .fzDInfo{width:82%;}
    }
    .scroll-bottom{
        text-align: center;
    }
    .scroll-bottom img{
        height:50px;
    }
    .nickname{
        margin-bottom:5px;
        font-size:12px;
    }
    .from-type{
        color:red
    }
</style>