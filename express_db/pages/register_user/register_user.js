var util = require('../../utils/util.js');
var app = getApp();

// register_user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

   formSubmit: function (e) {
     // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
     var name = e.detail.value.name;
     var that = this;
     // 判断账号是否为空和判断该账号名是否被注册  
     if ("" == util.trim(name)) {
       util.isError("名字不能为空", that);
       return;
     } 
     else{
       util.clearError(that);
       console.log(this.data.openid);
       wx.navigateTo({
         url: '../register_building/register_building?name=' + name,
       })   
     }
   }
})