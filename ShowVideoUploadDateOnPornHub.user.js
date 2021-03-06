// ==UserScript==
// @name         ShowVideoUploadDateOnPornHub
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Show the Upload date of the video on the video preview page.
// @author       hugepower
// @match        https://*.pornhub.com/*
// @grant        none
// @updateURL    https://github.com/hugepower/UserScript/blob/master/ShowVideoUploadDateOnPornHub.user.js
// ==/UserScript==


(function () {
    'use strict';

    window.onload = function () {
        setInterval(ShowVideoUploadDateOnPornhub, 2000);
        ShowVideoUploadDateOnPornhub();
    }

    function ShowVideoUploadDateOnPornhub() {
        var videoListItem = document.querySelectorAll('[class="pcVideoListItem  js-pop videoblock videoBox"],[class="pcVideoListItem  js-pop videoblock videoBox alpha"],[class="pcVideoListItem  js-pop videoblock videoBox omega"]');
        for (var i = 2; i < videoListItem.length; i++) {
            try {
                var videoPreviewUrl = videoListItem[i].getElementsByTagName('img')[0].src;
                if (containsVideoPreviewUrl(videoPreviewUrl) == false) {
                    var videoUploadDate = videoPreviewUrl.match(/\d{6}\/\d{2}/g)[0].replace(/\//g, '');
                    var spanVideoQuality = videoListItem[i].getElementsByClassName('marker-overlays js-noFade')[0].getElementsByTagName('span');
                    if (spanVideoQuality.length > 0) {
                        var videoQuality = spanVideoQuality[0].innerText;
                        // If the upload date has not been added.
                        if (containsNumber(videoQuality) == false) {
                            spanVideoQuality[0].innerText = videoUploadDate + ' ' + videoQuality;
                        }
                    } else {
                        var videoUploadDateSpan;
                        videoUploadDateSpan = document.createElement('span');
                        videoUploadDateSpan.innerHTML = videoUploadDate;
                        videoUploadDateSpan.className = "hd-thumbnail";
                        videoListItem[i].getElementsByClassName("marker-overlays js-noFade")[0].appendChild(videoUploadDateSpan);
                    }
                }

            } catch (exception) {
                console.table(exception);
            }
        }
    }

    function containsNumber(str) {
        var reg = /\d/;
        return reg.test(str);
    }

    function containsVideoPreviewUrl(str) {
        return !!str.match(/data:image\/gif*/);
    }
})();