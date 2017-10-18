var util = require('../../utils/util.js');
var app = getApp();


Page({
  data: {
    showTopTips: false,
    errorMsg: "",
    openid:"",
    name:"",
    building_info:"",
    unit:"",
    floor:"",
    room_num:""
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.data.name = options.name;
    this.data.unit = options.unit;
    this.data.floor = options.floor;
    this.data.room_num = options.room_num;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log("成功");
        console.log(res.data);
       that.setData({
         openid:res.data
       })
      },
      fail:function(){
        console.log("失败");
      }
    });
  },

  formSubmit: function (e) {
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
    var PhoneNumber = e.detail.value.PhoneNumber;
    var name=this.data.name;
    var unit=this.data.unit;
    var floor=this.data.floor;
    var room_num=this.data.room_num;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册  
    if ("" == util.trim(PhoneNumber)) {
      util.isError("手机号不能为空", that);
      return;
    } else if (!(/^1[34578]\d{9}$/.test(PhoneNumber))) {
    // 判断手机格式  
      util.isError("手机格式不对", that);
      return;
    } 
    else{
      util.clearError(that);
      console.log("openid:"+that.data.openid);
      wx.request({
        url: 'https://www.ownersbuild.com/', //仅为示例，并非真实的接口地址
        data: {
          PhoneNumber: PhoneNumber,
          name: that.data.name,
          unit: that.data.unit,
          floor: that.data.floor,
          room_num: that.data.room_num,
          power: "1", //为数字1
          openid: that.data.openid
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(JSON.stringify(res.data).match('success'))
          {
            //以手机号进行验证是否具有权限去看公告
            wx.setStorage({
              key: "phone",
              data: e.detail.value.PhoneNumber
            })
            // 显示模态弹窗  
            wx.showModal({
              title: '注册状态',
              content: '注册成功，请等待管理员审核',
              success: function (res) {
                if (res.confirm) {
                  // 点击确定后跳转登录页面并关闭当前页面  
                  wx.redirectTo({
                    url: '../index/index'
                  })
                }
              }
            })
          }
          else
          {
            // 显示消息提示框  
            wx.showToast({
              title: '注册失败，用户已存在,请耐心等待管理员审核',
              icon: 'error',
              duration: 2000
            })
          }
          }
          
        
      }) 
    }  
    
  }
})