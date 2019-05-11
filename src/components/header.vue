<style>
    .wrapper-header-nav .ivu-menu-item i{
        margin-right: 6px;
    }
    .wrapper-header .ivu-menu{
        z-index: 901;
        box-shadow: 0 1px 1px rgba(0,0,0,.08);
    }
    .member {
        width: 12px;
        height: 12px;
        vertical-align: middle;
    }
    .wrapper {
    background: #eee;
    padding: 1px
}

.wrapper-header {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 1000
}

.wrapper-header .ivu-menu-horizontal {
    height: 65px;
    line-height: 65px
}

.wrapper-header .ivu-menu-horizontal:after {
    display: none!important
}

.wrapper-header-nav {
    width: 95%;
    height: 65px;
    margin: 0 auto
}

.wrapper-header-nav-list {
    height: inherit;
    float: right
}

.wrapper-header-nav-list:after {
    content: "";
    display: block;
    clear: both
}

.wrapper-header-nav-logo {
    height: 50px;
    margin-top: 8px;
    float: left
}

.wrapper-header-nav-logo img {
    height: 100%
}

.wrapper-header-nav-search {
    float: left;
    margin-left: 22px;
    position: relative;
    padding-left: 22px
}

.wrapper-header-nav-search .ivu-select {
    width: 165px;
    font-size: 14px
}

.wrapper-header-nav-search .ivu-select-selection {
    border: 0
}

.wrapper-header-nav-search .ivu-select-visible .ivu-select-selection {
    box-shadow: none
}

.wrapper-header-nav-search .ivu-select-arrow {
    display: none!important
}

.wrapper-header-nav-search .ivu-select-input {
    font-size: 14px
}

.wrapper-header-nav-search:after {
    content: "";
    display: block;
    width: 1px;
    height: 24px;
    background: #ebedee;
    position: absolute;
    top: 20px;
    left: 0
}

.wrapper-container {
    background: #fff;
    margin: 80px auto 15px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1)
}

.wrapper-content {
    padding: 20px 25px;
    position: relative
}

.wrapper-content h1,.wrapper-content h2,.wrapper-content h3,.wrapper-content h4,.wrapper-content h5,.wrapper-content h6 {
    display: inline-block
}

.wrapper-content blockquote,.wrapper-content h1,.wrapper-content h2 {
    margin: 12px 0
}

.wrapper-content h3 {
    margin: 8px 0
}

.wrapper-content:after {
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px
}

.wrapper-aside {
    display: block;
    width: calc(100% - 2px);
    border: 1px solid #e8eaec;
    border-radius: 3px;
    margin: 10px 0;
    cursor: pointer
}

.wrapper-aside-no-padding {
    padding: 0;
    border: 1px solid transparent
}

.wrapper-aside img {
    width: 100%;
    border-radius: 3px;
    opacity: .8;
    transition: opacity .2s ease-in-out
}

.wrapper-aside img:hover {
    opacity: 1
}

</style>
<template>
<div class="wrapper-header">
    <Menu mode="horizontal" :active-name="currentActiveKey" @on-select="handleSelect">
        <div class="wrapper-header-nav">
            <a href="index.html"  class="wrapper-header-nav-logo">
                <img src="../images/logo/matougr.svg">
            </a>
            <div class="wrapper-header-nav-search">

            </div>
            <div class="wrapper-header-nav-list">
                <a href="index.html">
                    <Menu-item name="guide">
                        <Icon type="ios-build" />
                        在线服务
                    </Menu-item>
                </a>
                <Menu-item name="img_list">
                    <!-- 图标 -->
                    <Icon type="md-images" />
                    <!-- 文字 -->
                    图片专区
                </Menu-item>
                <Menu-item name="dev" to="//www.anooc.com/wall" target="_blank">
                    <Icon type="ios-copy-outline" />
                     留言墙
                    <Badge status="error" />
                </Menu-item>

               
                <Submenu name="ecosystem" v-if="!username">
                    <template slot="title">
                        <Icon type="ios-infinite"></Icon>
                        登录注册
                    </template>
                    <Menu-item name="login">
                        <Icon type="ios-log-in" />
                        登录
                    </Menu-item>
                    <Menu-item name="register">
                        <Icon type="md-heart-outline" />
                        注册
                    </Menu-item>
                </Submenu>
                <!-- 登录成功后显示 -->
                <Submenu name="ecosystem" v-else>
                    <template slot="title">
                        <img class="member" src="../images/member/regular.png">
                        {{ username }}
                    </template>
                    <Menu-item name="download_list">
                        <Icon type="ios-code-download" />
                        下载列表
                    </Menu-item>
                    <Menu-item name="signOut">
                        <Icon type="ios-log-out" />
                       退出登录
                    </Menu-item>
                </Submenu>
            </div>
        </div>
    </Menu>
</div>
</template>
<script type="application/javascript">

    export default {
        name: 'FooterComponent',
        props: {
            activeKey: String
        },
        data () {
            return {
                search: '',
                liveDot: false,
                currentActiveKey: this.activeKey,
                searchText: '搜索服务',
                notFoundText: '没有找到相关信息',
                lang: this.$lang
            };
        },
        watch: {
            activeKey (val) {
                this.currentActiveKey = val;
            },
            currentActiveKey (val) {
                this.$emit('on-change', val);
            }
        },
        computed:{
            username(){
                return '';
            }
        },
        methods: {
            handleSearch (path) {
                // console.info("点击跳转:"+path);
                //被动弹出会被浏览器拦截window.open('http://www.anooc.com'+path);
                window.location.href='http://www.anooc.com'+path;
                // if (this.lang === 'en-US') path += '-en';
                // this.search = '';
                // this.$refs.select.setQuery('');
                // this.$nextTick(() => {
                //     setTimeout(() => {
                //         this.$router.push(path);
                //     }, 300);
                // });
            },
            handleSelect (type) {
                if (type === 'dev') return;
                const pathSuffix = this.lang === 'zh-CN' ? '' : '-en';
                console.info("选择的菜单",type);
                if (type === 'donate') {
                } else if (type === 'img_list') {
                    this.$router.push(navigate.imgList[0].path + pathSuffix);
                }else if (type === 'component') {
                    this.$router.push(navigate.beforeComponents[0].path + pathSuffix);
                } else if (type === 'practice') {
                    this.$router.push(navigate.practice[0].path + pathSuffix);
                } else if (type === 'cli') {
                    this.$router.push('/cli' + pathSuffix);
                } else if (type === 'live') {
                    this.$router.push('/live');
                } else if (type === 'login') {
                    //this.$router.push('/docs/guide/iview-loader' + pathSuffix);
                    this.$router.push('/user/login');
                } else if (type === 'register') {
                    this.$router.push('/user/register');
                } else if (type === 'download_list') {
                    this.$router.push('/user/download/list');
                } else if(type === 'signOut'){
                     // 退出登录
                    this.$store.commit('logout', this);
                    this.$router.push({
                        name: 'welcome_index'
                    });
                }else if (type === 'iview-area') {
                    window.open('https://github.com/iview/iview-area');
                } else if (type === 'iview-editor') {
                    window.open('https://github.com/iview/iview-editor');
                }
                this.$nextTick(() => {
                    this.updateActiveNav();
                });
            },
            updateActiveNav () {
                const componentList = [
                    '/docs/guide/install',
                    '/docs/guide/start',
                    '/docs/guide/i18n',
                    '/docs/guide/theme',
                    '/docs/guide/iview-loader',
                    '/overview',
                    '/docs/guide/update'
                ];

                const route = this.$route.path;
                if (route.indexOf('img') > -1 || componentList.indexOf(route) > -1) {
                    this.currentActiveKey = 'img_list';
                } else if (route.indexOf('practice') > -1) {
                    this.currentActiveKey = 'practice';
                } else if (route.indexOf('live') > -1) {
                    this.currentActiveKey = 'live';
                } else {
                    this.currentActiveKey = 'guide';
                }
            },
            handleChangeLang () {
                const lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN';
                const path = this.$route.path.indexOf('-en') > -1 ? this.$route.path.split('-en')[0] : this.$route.path + '-en';
            },
            handleVersion (v) {
                if (v == 1) {
                    window.location.href = 'http://v1.iviewui.com';
                }
                if (v == 2) {
                    window.location.href = 'http://v2.iviewui.com';
                }
            },
            handleGoToGitHub () {
                _hmt.push(['_trackEvent', 'menu-go-github', 'click']);
                window.open('https://github.com/iview/iview');
            },
            handleGoToTwitter () {
                _hmt.push(['_trackEvent', 'menu-go-twitter', 'click']);
                window.open('https://twitter.com/iViewUI');
            },
            handleGoToMenu (name) {
                if (this.lang === 'zh-CN') {
                    return name;
                } else {
                    return name + '-en';
                }
            },
            handleToggleSetting () {
                this.app.handleOpenSetting();
            }
        },
        created () {
            // 设置直播 dot
            const liveDotVersion = window.localStorage.getItem('liveVersion');
            if (liveDotVersion) {
                this.liveDot = liveDotVersion < 1;
            } else {
                this.liveDot = true;
            }
        }
    };
</script>