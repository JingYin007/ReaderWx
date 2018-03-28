// pages/posts/post-detail.js
var postsData_js = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectTag: false,
    currentId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData_js.objData[postId];
    this.data.currentId = postId;
    this.setData({
      readInfo: postData,
    });

    //进行文章收藏的初始化显示
    var collectedInfo = wx.getStorageSync('collectedInfo');
    if (collectedInfo) {
      var collectTag = collectedInfo[postId] ? collectedInfo[postId]:false;
      this.setData({
        collectTag: collectTag
      })
    }else{
      var postCollected = {};
      postCollected[postId] = false;
      wx.setStorageSync('collectedInfo', postCollected);
    }
  },
  /**
   * 收藏按钮的事件触发
   */
  collectTap: function (event) {
    var collectTag = this.data.collectTag;
    var collectedInfo = wx.getStorageSync('collectedInfo');
    //收藏变成未收藏，未收藏变成已收藏
    collectedInfo[this.data.currentId] = !collectTag;
    //更新缓存值
    wx.setStorageSync('collectedInfo', collectedInfo);
    //更新数据绑定变量 ，从而实现切换图片
    this.setData({
      collectTag: !collectTag
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})