import wx from 'weixin-js-sdk';
import api from '@/libs/api.js';
    const wxApi = {
      /**
      * [wxRegister 微信Api初始化]
      * @param  {Function} callback [ready回调函数]
      */
      wxRegister (url,sys) {
        if(sys == "ios"){
          url = window.entryUrl;
        }
        api.shareWeiXinSign(encodeURIComponent(url)).then(res => {
            let shareInfo = res.data;
            //https://juejin.cn/post/6844904000962166791
            //https://www.cnblogs.com/joshua317/p/4761948.html

            wx.config({
                //在测试的时候一定要开启这个 debug: true 只要有报错就一定会弹出来，
                debug: false, // 开启调试模式
                appId: shareInfo.appId, // 必填，公众号的唯一标识
                timestamp: shareInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: shareInfo.nonceStr, // 必填，生成签名的随机串
                signature: shareInfo.signature, // 必填，签名，见附录1
                jsApiList: [
                  'checkJsApi',//必填，检测api是否有权限
                  //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                  'updateAppMessageShareData',
                  //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                  'updateTimelineShareData'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        }),
        wx.ready(() => {
            //一定要保证分享的url和传递给后端url是一致的，如果路由发生了变化一定要获取当前的路由
            let links = location.href.split('#')[0];
          let optionApp = {
            title: '大爱小善，助力公益', // 分享标题, 请自行替换
            desc:'兑移动积分，可当钱花又添"好德"福报',
            link: links, 
            imgUrl: 'https://cdn-oss.yyang.net.cn/static/wishyoung/logo.jpeg', // 分享图标, 请自行替换，需要绝对路径
          }
          let optionTimeline = {
            title: '大爱小善，助力公益', // 分享标题, 请自行替换
            link: links, // 分享链接，根据自身项目决定是否需要split
            imgUrl: 'https://cdn-oss.yyang.net.cn/static/wishyoung/logo.jpeg', // 分享图标, 请自行替换，需要绝对路径
            desc:'兑移动积分，可当钱花又添"好德"福报'
          }
          // 微信分享给朋友
          wx.updateAppMessageShareData({
            title: optionApp.title, // 分享标题
            link: optionApp.link, // 分享链接
            imgUrl: optionApp.imgUrl, // 分享图标
            desc: optionApp.desc, // 分享图标
            success () {
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },fail(){
              // alert("分享失败！"+JSON.stringify(s));
            }
          }),
          // 微信分享到朋友圈
          wx.updateTimelineShareData({
            title: optionTimeline.title, // 分享标题
            link: optionTimeline.link, // 分享链接
            imgUrl: optionTimeline.imgUrl, // 分享图标
            desc:optionTimeline.desc,
            success () {
              // 用户成功分享后执行的回调函数
              
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },fail(){
              // alert(JSON.stringify(msg));
            }
          })
        })
        wx.error(function(){
          // alert(JSON.stringify(e)+'--------error')
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
      },
    }
export default wxApi;