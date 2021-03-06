// ==UserScript==
// @name         JavbusExpandThumbnail
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Expand all thumbnails.
// @author       hugepower
// @match        https://www.javbus.com/*
// @updateURL    https://github.com/hugepower/UserScript/blob/master/JavbusExpandThumbnail.user.js
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    function javbusRemoveAds(){
        var adList = document.querySelectorAll('[class="ad-list"],[class="row"]');
        for(var i = adList.length - 1; i >= 0; i--){
            adList[i].remove();
        }
    }

    function javbusStyle(){
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = ".Thumbnail{-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3)}";
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function javbusExpandThumbnail(){
        var thumbnailList = document.getElementsByClassName('sample-box');
        if(thumbnailList){
            var waterfall = document.getElementById('sample-waterfall');
            waterfall.setAttribute('style','text-align:center');
            for(var i = thumbnailList.length - 1; i >= 0; i--){
                var img = document.createElement('img');
                var br = document.createElement('br');
                img.src = thumbnailList[i].href;
                img.className = "Thumbnail";
                waterfall.insertBefore(img,thumbnailList[i]);
                waterfall.insertBefore(br,thumbnailList[i]);
                waterfall.removeChild(thumbnailList[i]);
            }
        }
    }

    window.onload = function () {
        if (document.getElementsByClassName('row movie')){
            javbusStyle();
            javbusExpandThumbnail();
            javbusRemoveAds();
        }
    }
})();