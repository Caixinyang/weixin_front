//message.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    userInfo: {}
  },
  comment: function (event) {
    console.log(event.target.dataset);
    app.comment_time = event.target.dataset.time;
    app.comment_title = event.target.dataset.title;
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
      })
      }
    }),
    wx.request({
      url: 'https://www.ownersbuild.com/', //仅为示例，并非真实的接口地址
      data: {message:123456},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("查询成功");
        //var array=res.data.split("\n");
        console.log(res.data);
        /*for(var i=0;i<array.length;i++){
          console.log(array[i]);
          console.log(JSON.parse(array[0]));
        }*/

        that.setData({
          feed: res.data.reverse()
        })
        //console.log(that.data.showData);

      }
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
 

  //网络请求数据, 实现首页刷新
  

  //使用本地 fake 数据实现刷新效果
  refresh: function(){

    console.log("loaddata");
  
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },
  openArrow:function(e){
    console.log(e);
    if (this.data.userInfo.nickName == "蔡信掦🐑") {
      wx.showModal({
        title: '提醒：',
        content: '是否删除本公告',
        success: function (res) {
          if (res.confirm) {
            // 点击确定后删除本公告
            console.log("du du...");
            }
          }
        }
      )
    }
}


})
