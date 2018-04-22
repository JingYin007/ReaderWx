// pages/movies/more-movies.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setNavBarTitle(category);
    var doubanBase = app.globalData.doubanBase;
    var requestMoviesUrl = doubanBase + '/v2/movie/' +category+ '?start=3&count=18';
    util.http(requestMoviesUrl, this.processDoubanData);
  },
  //进行下拉刷新数据加载
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=18";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      title = title.length >= 6 ? title.substring(0, 6) + "..." : title;

      var temp = {
        movieId: subject.id,
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        stars: util.convertToStarsArray(subject.rating.stars),
      }
      movies.push(temp);
    }
    this.setData({
      movies:movies
    })
  },
  //动态设置 导航栏标题
  setNavBarTitle: function (category) {
    var titleBarName = '更多电影';
    if (category == 'in_theaters') {
      titleBarName = '正在热映';
    } else if (category == 'coming_soon') {
      titleBarName = '即将上映';
    } else {
      titleBarName = '豆瓣top250';
    }
    this.setData({
      titleBarName: titleBarName
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    //TODO 详情页的标题栏设置 
    wx.setNavigationBarTitle({
      title: this.data.titleBarName
    })
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