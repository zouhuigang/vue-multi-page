<style lang="less">
    @import "../styles/article.less";
</style>
<template>
    <div>
        <div class="wrapper">
            <div class="wrapper-header">
                <nav-menu :active-key="activeKey" @on-change="handleNavMenuChange"></nav-menu>
            </div>
            <div class="wrapper-container">
                <Row>
                    <!--左侧菜单 -->
                    <i-col span="4" class="wrapper-navigate">
                        <Navigate :type="activeKey"></Navigate>
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
                                    <img src="../images/an_2.png">
                            </a>
                        </template>
                    </i-col>
                </Row>
            </div>
        </div>
        <div class="footer">
            <div class="footer-main">
                <Row>
                    <i-col span="5">
                        <h4>
                            <Icon type="md-git-compare" />
                            {{ $t('index.Ecosphere') }}
                        </h4>
                        <ul>
                            <li>
                                <a href="https://www.anooc.com/" target="_blank">{{ $t('index.anooc_name') }}</a> - {{ $t('index.td') }}
                            </li>
                        </ul>
                    </i-col>
                    <i-col span="5">
                        <h4>
                            <Icon type="ios-link"></Icon>
                            {{ $t('index.links') }}
                        </h4>
                        <ul>
                            <li>
                                <a href="https://regex101.com/" target="_blank">regex101</a> - {{ $t('index.td_mi') }}
                            </li>
                            <li>
                                <a href="https://www.chuangkit.com/" target="_blank">创客贴</a> - 平面设计工具
                            </li>
                            
                        </ul>
                    </i-col>
                    <i-col span="5" offset="2">
                        <h4>
                            <Icon type="md-person" />
                            {{ $t('index.about') }}
                        </h4>
                        <ul>
                            <li>
                                <a href="http://www.anooc.com/sitemap/sitemapindex.xml" target="_blank">{{ $t('index.sitemap') }}</a>
                            </li>
                            <li>
                                <a href="http://www.anooc.com/visitor" target="_blank">{{ $t('index.visitor') }}</a>
                            </li>
                            <li>
                                <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">{{ $t('index.filing') }}</a>
                            </li>
                             <li>
                                <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">赣ICP备16009868号-2</a>
                            </li>     
                        </ul>
                    </i-col>
                    <i-col span="5" offset="2">
                        <div class="footer-aside">
                            <div class="footer-logo">
                                <img src="../images/logo/matougr.svg">
                            </div>
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>
        <Modal v-model="donate" title="成为 iView 赞助商" @on-ok="handleModalClose" @on-cancel="handleModalClose" width="600" class-name="vertical-center-modal">
            <div class="ivu-article">
                <p>如果您有品牌推广、活动推广、招聘推广、社区合作的需求，欢迎联系我们。</p>
                <p>联系邮箱 <a href="mailto:admin@aresn.com">admin@aresn.com</a> 咨询。</p>
                <p>位置如下图所示：</p>
                <div>
                    <Carousel v-if="donate" v-model="adCarousel" autoplay :autoplay-speed="5000" dots="outside">
                        <CarouselItem>
                            <div class="demo-carousel" style="height: 300px">
                                <img src="../images/ad-demo1.png" style="width: 100%">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel" style="height: 300px;">
                                <img src="../images/ad-demo3.png" style="width: 100%">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel" style="height: 300px;">
                                <img src="../images/ad-demo2.png" style="width: 100%">
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </div>
        </Modal>
        <Modal v-model="ask" title="免费加入 iView 官方QQ群参与讨论" class-name="vertical-center-modal">
            <div class="ivu-article">
                <p>免费加入官方QQ讨论群，交流 iView 技术问题。</p>
                <p>群号：<strong>71434987</strong></p>
                <p>二维码：</p>
                <p>
                    <img src="../images/qqgroup3.png" style="display: block;width: 50%;margin: 0 auto;">
                </p>
                <p>
                    <Alert show-icon>仅限开发者加入，请勿讨论与技术无关的问题，比如发招聘信息等。</Alert>
                </p>
            </div>
        </Modal>
    </div>
</template>
<script type="application/javascript">
    import Navigate from './navigate.vue';
    import navMenu from './menu.vue';
    import bus from './bus';

    export default {
        inject: ['app'],
        components: {
            Navigate,
            navMenu
        },
        data () {
            return {
                list: [],
                need_api: false,
                donate: false,
                ask: false,
                activeKey: '',
                lang: this.$lang,
                adCarousel: 0,
                ad_index: this.app.ad_index
            }
        },
        methods: {
            handleModalClose () {
                this.donate = false;
            },
            handleAskClose () {
                this.ask = false;
            },
            updateActiveNav () {
                const componentList = [
                    '/docs/guide/install',
                    '/docs/guide/install-en',
                    '/docs/guide/start',
                    '/docs/guide/start-en',
                    '/docs/guide/i18n',
                    '/docs/guide/i18n-en',
                    '/docs/guide/theme',
                    '/docs/guide/theme-en',
                    '/docs/guide/iview-loader',
                    '/docs/guide/iview-loader-en',
                    '/overview',
                    '/overview-en',
                    '/docs/guide/update',
                    '/docs/guide/update-en',
                    '/docs/guide/global',
                    '/docs/guide/global-en',
                ];

                const route = this.$route.path;
                if (route.indexOf('img') > -1 || componentList.indexOf(route) > -1) {
                    this.activeKey = 'img_list';
                } else if (route.indexOf('practice') > -1) {
                    this.activeKey = 'practice';
                } else if (route.indexOf('live') > -1) {
                    this.activeKey = 'live';
                }  else {
                    this.activeKey = 'guide';
                }
            },
            handleNavMenuChange (val) {
                this.activeKey = val;
            },
            // 控制锚点跳转
            handleClickLink (id) {
                const top = document.getElementById(id).offsetTop;
                window.location.hash = id;
                let scroll_top = top + 15;
                if (id === 'API') scroll_top -= 150;
                window.scrollTo(0, scroll_top);
            },
            handleAsideAd (name, isQQGroup = false) {
                _hmt.push(['_trackEvent', name, 'click']);
                if (isQQGroup) {
                    this.ask = true;
                }
            }
        },
        created () {
            this.lang = this.$lang;
        },
        mounted () {
            this.updateActiveNav();

            const examples = this.$slots.default[0].elm.querySelectorAll('.example');

            // 有示例时，显示示例的目录，没有，显示标题为目录
            if (examples.length) {
                this.need_api = true;
                for (let i = 0; i < examples.length; i++) {
                    const path = examples[i].querySelectorAll('header span a')[0].getAttribute('href').replace('#', '');
                    const title = examples[i].querySelectorAll('header span a')[0].getAttribute('data-title').replace('#', '');
                    this.list.push({
                        title: title,
                        path: path
                    });
                }
            } else {
                this.need_api = false;
                const headers = this.$slots.default[0].elm.querySelectorAll('.anchor');
                for (let i = 0; i < headers.length; i++) {
                    const title = headers[i].querySelectorAll('h2')[0];
                    if (title) {
                        const title_name = title.innerHTML;
                        const path = headers[i].querySelectorAll('h2')[0].getAttribute('id');
                        this.list.push({
                            title: title_name,
                            path: path
                        });
                    }
                }
            }

            bus.$on('on-donate-show', () => {
                this.donate = true;
            })
        }
    }
</script>