//index.js

//获取应用实例
var app = getApp()
Page({
  data: {},
  //事件处理函数
 
  onLoad: function () { 
  },
  checkTap: function(e) {
   wx.navigateTo({
     url: '../announcement/announcement',
   })
  },
  advertiseTap: function(e) {
  wx.navigateTo({
    url: '../advertise/advertise',
  })
  },
  messageTap: function(e) {
   wx.navigateTo({
     url: '../message/message',
   })
  },
  modifyTap: function (e) {
    wx.navigateTo({
      url: '../changemessage/changemessage',
    })
  },
  voteTap: function (e) {

   
      wx.setStorage({
        key: 'formId',
        data: e.detail.formId,
      })
      var that = this;
      wx.getStorage({
        key: 'openid',
        success: function (res) {
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
      wx.navigateTo({
        url: '../vote/vote',
      })

  },
  vote_indexTap: function (e) {
    wx.navigateTo({
      url: '../vote_index/vote_index',
    })
  }
})
