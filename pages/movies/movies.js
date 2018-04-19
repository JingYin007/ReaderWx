// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  //RESTFUL API JSON
  //SOAP XML

  /**
   * 页面的初始数据
   */
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doubanBase = app.globalData.doubanBase;
    var in_theatersUrl = doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    var coming_soonUrl = doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getMoviesList(doubanBase, in_theatersUrl, 'in_theaters');
    this.getMoviesList(doubanBase, coming_soonUrl, 'coming_soon');
    this.getMoviesList(doubanBase, top250Url, 'top250');
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  },
  getMoviesList: function (doubanBase, in_theatersUrl, dataTag) {
    var that = this;
    wx.request({
      url: in_theatersUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.processDoubanData(res.data, dataTag);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  processDoubanData: function (moviesDouban, dataTag) {
    //console.log(moviesDouban);
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
    var slogan = '';
    if (dataTag == 'in_theaters'){
      slogan = '正在热映';
    } else if (dataTag == 'coming_soon'){
      slogan = '即将上映'
    }else{
      slogan = '豆瓣Top250';
    }
    //TODO javaScript 动态语言赋值
    var readyData = {};
    readyData[dataTag] = { movies: movies, slogan: slogan,dataTag:dataTag };
    this.setData(readyData)
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