// pages/movies/more-movies.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({
  /**
   * HELLO MY DEAR ! 为什么我的眼里常含泪水！！
   * 页面的初始数据
   */
  data: {
    movies: {},
    nextUrl: '',
    totalCount: 0,
    isEmpty: true,
  },
  /**
   *  LL生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setNavBarTitle(category);
    //console.log(category);
    var doubanBase = app.globalData.doubanBase;
    var requestMoviesUrl = doubanBase + '/v2/movie/' + category;
    this.setData({
      nextUrl: requestMoviesUrl,
    })
    util.http(requestMoviesUrl, this.processDoubandata);
    //wx.startPullownRefresh();
  },
  /**
    * 点击进入 电影详情页
    */
  movieDetailTap: function (event) {
    var movieId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '/pages/movies/movie-detail/detail?movieId=' + movieId,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  //TOO 进行上滑数据加载
  onReachBottom: function (event) {
    var nextUrl = this.data.nextUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubandata);
    //显示 导航栏加载效果
    wx.showNavigationBarLoading();
  },
  //下拉刷新 停止当前页面下拉刷新
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.nextUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubandata);
    //wx.startPullownRefresh();
    wx.showNavigationBarLoading();
  },
  processDoubandata: function (moviesDouban) {
    var movies = [];
    for (var ix in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[ix];
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

    var totalMovies = {};
    //如果要绑定新加载的数据 那么需要进行数据合并操作
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    //隐藏 导航栏加载效果
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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
    //TOO 详情页的标题栏设置 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})