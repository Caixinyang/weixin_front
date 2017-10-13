// pages/comment/comment.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: [],
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    }),
      wx.request({
        url: 'https://www.ownersbuild.com/comment/load', //仅为示例，并非真实的接口地址
        data: {
          time: app.comment_time,
          title: app.comment_title
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("查询成功");
          console.log(res.data);
          that.setData({
            feed: res.data.reverse()
          })

        }
      })
  },
  //提交评论
  formSubmit: function (e) {
    //获取当前时间
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log(this.data.userInfo);
    wx.request({
      url: 'https://www.ownersbuild.com/comment/write', //仅为示例，并非真实的接口地址
      data: {
        time: app.comment_time,
        title: app.comment_title,
        author: this.data.userInfo.nickName,
        submit_time: date.toDateString(),
        text: e.detail.value.text
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (JSON.stringify(res.data).match('success')) {
          // 显示模态弹窗  
          wx.showModal({
            title: '评价状态',
            content: '评价成功，请点击确定查看吧',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面  
                wx.redirectTo({
                  url: '../comment/comment'
                })
              }
            }
          })
        }
        else {
          // 显示消息提示框  
          wx.showToast({
            title: "评价失败",
            icon: 'error',
            duration: 2000
          })
        }
      }
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