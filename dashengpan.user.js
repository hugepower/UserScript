// ==UserScript==
// @name         大圣盘
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  跳过大圣盘的扫码关注微信公众号，直接访问资源页面。
// @author       hugepower
// @match        https://www.dashengpan.com/detail/*
// @match        https://www.dashengpan.com/search?keyword=*
// @grant        GM_setClipboard
// @updateURL    https://github.com/hugepower/UserScript/blob/master/dashengpan.user.js


// ==/UserScript==

/*
    功能说明：
        1）、跳过扫码步骤，自动访问百度网盘资源链接。
        2）、若资源存在提取码，则将提取码自动拷贝到剪贴板。（无提示）
*/

(function() {
    'use strict';
    
    // 网页加载完毕后执行
    window.onload=function(){
        // 如果当前页面是目标页面
        if(window.location.href.indexOf("detail")>-1){
            dashengpanMain();
        }
        if(window.location.href.indexOf("search?keyword")>-1){
            openDashengpan();
        }
    }
    //解除【微信扫码关注公众号解锁资源】的限制
    function openDashengpan(){
        var resource_item = document.querySelectorAll('[class="resource-item-wrap valid"]');
        if(resource_item.length>0){
            var items = document.documentElement.outerHTML.match(/(?<=res=)(.+?)(?=;)/g);
            for (let index = 0; index < items.length; index++) {
                try {
                    const id = items[index].match(/(?<=id:")(.+?)(?=")/)[0];
                    document.getElementsByClassName('resource-title')[index].getElementsByTagName('a')[0].href="https://www.dashengpan.com/detail/"+id;
                } catch (error) {
                    console.log(items[index]);
                }
            }
        }
    }

    function dashengpanMain(){
        // 如果页面上存在资源的提取码
        if(document.getElementsByClassName('meta-item copy-item').length>0){
            // 获取提取码
            var pwd = document.getElementsByClassName('meta-item copy-item')[0].innerText.match(/(?<=提取密码 )(.+?)(?= 点击复制)/g)[0];
            // 将提取码拷贝到剪贴板
            GM_setClipboard(pwd);
        }
        // 获取网盘资源链接
        var url = document.documentElement.outerHTML.match(/https:\\u002F\\u002Fpan.baidu.com(.+?)(?=")/g)[0].replace(/\\u002F/g,'/');
        // 在当前标签页打开资源链接
        window.location.href = url;
    }

})();