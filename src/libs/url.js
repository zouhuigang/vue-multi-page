
//获取网址中的参数
exports.getQueryString =function (name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//获取路径名称
exports.getUrlName = function(){
    // var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    // var pos = curWwwPath.indexOf(pathName)
    //删除一个/
    var new_path=pathName.substr(1).replace(/\//g,'_');
    if(!new_path){
        new_path='welcome';
    }

    return new_path;
}


//拦截路由