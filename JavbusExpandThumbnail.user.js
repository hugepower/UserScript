// ==UserScript==
// @name         JavbusExpandThumbnail
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Expand all thumbnails.
// @author       hugepower
// @match        https://www.javbus.com/*
// @updateURL    https://github.com/hugepower/UserScript/blob/master/JavbusExpandThumbnail.user.js
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    function JavbusExpandThumbnail(){
        var aTags = document.getElementsByClassName('sample-box');
        if(aTags){
            document.getElementById('sample-waterfall').setAttribute('style','text-align:center');
            for(var i = aTags.length - 1; i >= 0; i--){
                var img = document.createElement('img');
                img.src = aTags[i].href;
                document.getElementById('sample-waterfall').insertBefore(img,aTags[i]);
                document.getElementById('sample-waterfall').removeChild(aTags[i]);
            }
        }
    }

    window.onload = function () {
        if (document.getElementsByClassName('row movie')){
            JavbusExpandThumbnail();
        }
    }
})();