//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: '猛戳头像',
    userInfo: {},
    encryptedData: "",
    openid:null,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
      }

    })
    //判断是否注册过！
    var that=this;

    var manage ="om1sf0dZzSPykCaS4k-R6uRYKdzA";
    var manage_li = "om1sf0U_cq9d7bvpmFiWLC5srMVg"
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        if (res.data == manage || manage_li == res.data) {
          wx.redirectTo({

            url: '../manage/manage'
          })
        }
      }
    });
    //console.log(count);
    //用openid去验证一下是否已经通过！
    //没有这个id就去注册
    //有这个id但是power为1就是待审核
    //有id并且通过了就直接进入
    
    wx.request({
      url: 'https://www.ownersbuild.com/check', //仅为示例，并非真实的接口地址
      data: {
        openid: this.data.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (JSON.stringify(res.data).match('success'))
        {
          wx.navigateTo({
            url: '../user/user'
          })
        }
        else if (JSON.stringify(res.data).match('fail'))
        {
          wx.showToast({
            title: '请耐心等待管理员审核',
            icon: 'error',
            duration: 2000
          })
        }
        else 
        {
     wx.navigateTo({
         url: '../register_user/register_user'
            })
        }
      }
    })
      
    
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    wx.getStorage({
      key: "openid",
      success: function (res) {
        console.log("成功");
        console.log(res.data);
        that.setData({
          openid: res.data
        })
      }
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, encryptedData) {
      //更新数据
      that.setData({
        userInfo: userInfo,

      })
      that.setData({
        encryptedData: encryptedData

      })
      var manage = "om1sf0dZzSPykCaS4k-R6uRYKdzA";
      var manage_li = "om1sf0U_cq9d7bvpmFiWLC5srMVg"
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          if (res.data == manage || manage_li==res.data) {
            wx.redirectTo({
          
              url: '../manage/manage'
            })
          }
        }
        });
    })
    //存储当前时间
    wx.setStorage({
      key: 'Date',
      data: Date.parse(new Date()),
    })
  }
})
