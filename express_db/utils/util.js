var message_data = require('../data/data_message.js')
module.exports = {
  formatTime: formatTime
}
//insert
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = 'http://www.ownersbuild.com:3000/';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 去前后空格  
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息  
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息  
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}
//请求已发布过的公告的json文件
function getData2() {
  return data_message.data_message;
}
//test

function sleep(time) {
  var startTime = Date.now();
  var nowTime = 0;
  while (1) {
    nowTime = Date.now();
    if ((nowTime - startTime) > time) {
      return;
    }
  }
}

function prettyTime(time) {
  var nowTime = new Date().getTime();
  var diff = (nowTime - time) / 1000;
  var dayDiff = Math.floor(diff / 86400);
  var isPrev = diff > 0;
  if (diff < 0) {
    diff = Math.abs(diff);
    dayDiff = Math.abs(dayDiff);
  }
  if (diff < 60) {
    return '现在';
  }
  if (diff < 120) {
    return isPrev ? '一分钟前' : '一分钟后';
  }
}
module.exports = {
  formatTime: formatTime,
  req: req,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getReq: getReq,
  //test

  sleep: sleep
}  

//