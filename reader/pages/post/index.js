var localDb = require('../../data/localDb');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // this.data.postList = localDb.postList;
    this.setData({
        postList: localDb.postList
    });
  },
  postDetail:function(event){
      var postId = event.currentTarget.dataset.postid;
      wx.navigateTo({
          url: './post-detail/post-detail?postid='+postId
      })
  }
})