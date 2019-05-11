<template>
 <div class="footer">
            <div class="footer-main">
                <Row>
                    <i-col span="5">
                        <h4>
                            <Icon type="md-git-compare" />
                            生态圈
                        </h4>
                        <ul>
                            <li>
                                <a href="https://www.matougr.com/" target="_blank">安橙在线工具箱</a> - 为有品质的生活
                            </li>
                        </ul>
                    </i-col>
                    <i-col span="5">
                        <h4>
                            <Icon type="ios-link"></Icon>
                            站点推荐
                        </h4>
                        <ul>
                            <li>
                                <a href="https://regex101.com/" target="_blank">regex101</a> - 在线正则表达式调试
                            </li>
                            <li>
                                <a href="https://www.chuangkit.com/" target="_blank">创客贴</a> - 平面设计工具
                            </li>
                            
                        </ul>
                    </i-col>
                    <i-col span="5" offset="2">
                        <h4>
                            <Icon type="md-person" />
                            关于我们
                        </h4>
                        <ul>
                            <li>
                                <a href="http://www.anooc.com/sitemap/sitemapindex.xml" target="_blank">网站地图</a>
                            </li>
                            <li>
                                <a href="http://www.anooc.com/visitor" target="_blank">城市用户分布图</a>
                            </li>
                            <li>
                                <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">赣ICP备16009868号-1</a>
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
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {
      msg: ''
    }
  }
}
</script>