/**
 * 电影星级转化方法
 */
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

/**
 * 封装 http 函数，默认‘GET’ 提交
 */
function http(toUrl, httpCallBack) {
  wx.request({
    url: toUrl,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
     //回调处理
      httpCallBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}


module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  //convertToCastString: convertToCastString,
  //convertToCastInfos: convertToCastInfos
}