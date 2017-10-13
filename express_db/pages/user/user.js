//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    openid:null,
  },
  
  //事件处理函数

  onLoad: function () {
  },
  voteTap: function (e) {
    wx.navigateTo({
      url: '../vote_index/vote_index',
    })
  },
  advertiseTap: function (e) {
    wx.navigateTo({
      url: '../message/message',
    })
    wx.setStorage({
      key: 'formId',
      data: e.detail.formId,
    })
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
    })
    wx.request({
      url: 'https://www.ownersbuild.com/update/formId',
      data: {
        formId: e.detail.formId,
        openid: that.data.openid
      },
      method: 'POST',
      success: function (res) {
        
      }
    })
    
  },

})
