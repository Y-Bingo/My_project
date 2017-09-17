var postData = require('../../../data/localDb.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var postId = +options.postid;
        var postDetail = postData.postList[postId];
        this.setData({
            postD: postDetail,
        });
        if (app.global_data.g_isPlayMusic && app.global_data.g_currentPostId
            == postId) {
            this.setData({
                isPlayMusic: true
            })
        }
        this.onCollectMonitor(postId);
        this.onMusicMonitor();
    },
    onCollectMonitor: function (postId){
        var postCollected = wx.getStorageSync('post_collected');
        if (postCollected) {
            if (postCollected[postId]) {
                this.setData({
                    collected: postCollected[postId]
                });
            }
        } else {
            postCollected = {};
            postCollected[postId] = false;
            wx.setStorageSync("post_collected", postCollected);
        }
    },
    onMusicMonitor: function () {//中控制台的事件监听
        var that = this;
        var postId = that.data.postD.postId;
        var g_currentPostId = app.global_data.g_currentPostId;
        console.log('postId', postId === g_currentPostId);
        console.log('g_postid', g_currentPostId);
        wx.onBackgroundAudioPlay(function(){
            // 音乐正在播放
            if(postId === g_currentPostId){
                that.setData({ isPlayMusic: true})
                app.global_data.g_isPlayMusic = true;
            }
        });
        wx.onBackgroundAudioPause(function () {
            // 音乐没有播放
            that.setData({isPlayMusic: false})
            app.global_data.g_isPlayMusic = false;
            app.global_data.g_currentPostId  = null;
        });
    },
    onMusicPlay: function (event) {//监听音乐是否播放
        var music = this.data.postD.music;
        var that = this;

        if (that.data.isPlayMusic) {
            wx.pauseBackgroundAudio()
            that.setData({ isPlayMusic: false });
            app.global_data.g_isPlayMusic = false;
            app.global_data.g_currentPostId = null;
        } else {
            wx.playBackgroundAudio({
                dataUrl: music.url,
                title: music.title,
                coverImgUrl: music.coverImg,
                success: function () {
                    that.setData({ isPlayMusic: true });
                    app.global_data.g_isPlayMusic = true;
                    app.global_data.g_currentPostId = that.data.postD.postId;
                }
            })
        }

    },
    onCollected: function () {
        var postCollected = wx.getStorageSync('post_collected');
        var postId = this.data.postD.postId;
        postCollected[postId] = !postCollected[postId];
        this.showToast(postCollected, postId);
    },
    showToast: function (postCollected, postId) {
        this.setData({
            collected: postCollected[postId]
        })
        wx.setStorageSync("post_collected", postCollected);
        wx.showToast({
            title: postCollected[postId] ? '收藏成功' : "取消成功",
            duration: 1000
        })
    },
    onShare: function (event) {
        var itemList = [
            "分享到朋友圈",
            "分享给朋友",
            "分享到微博",
            "分享到QQ",
        ]
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                wx.showToast({
                    title: res.cancel ? '取消' : itemList[res.tapIndex],
                })
            }
        })
    },

})