// ==UserScript==
// @name         大圣盘
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  跳过扫码，直接跳转到网盘资源。
// @author       hugepower
// @match        https://www.dashengpan.com/detail/*
// @match        https://www.dashengpan.com
// @grant        none
// @updateURL    https://github.com/hugepower/UserScript/blob/master/dashengpan.user.js


// ==/UserScript==

(function() {
    'use strict';
    // 网页加载完毕后执行
    window.onload=function(){
        // 如果当前页面是目标页面
        if(window.location.href.indexOf("detail")>-1){
            // 如果页面上存在资源的加密密码
            if(document.getElementsByClassName('meta-item copy-item').length>0){
                // 获取密码
                var pwd = document.getElementsByClassName('meta-item copy-item')[0].innerText.match(/(?<=提取密码 )(.+?)(?= 点击复制)/g)[0];
                // 弹框显示，让用户复制密码。
                alert(pwd);
            }
            // 获取网盘资源链接
            var url = document.documentElement.outerHTML.match(/https:\\u002F\\u002Fpan.baidu.com(.+?)(?=")/g)[0].replace(/\\u002F/g,'/');
            // 在当前标签页打开资源链接
            window.location.href = url;
        }
    }
})();