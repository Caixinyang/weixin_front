var util = require('../../utils/util.js');
var app = getApp();

// register_building.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.data.name = options.name
  console.log("name:"+ options.name);
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

  formSubmit: function (e){
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
    var unit = e.detail.value.unit;
    var floor = e.detail.value.floor;
    var room_num = e.detail.value.room_num;
    var name=this.data.name;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册  
    if ("" == util.trim(unit)) {
      util.isError("栋号不能为空", that);
      return;
    } else if ("" == util.trim(floor)){
      util.isError("楼层不能为空", that);
      return;
    } else if ("" == util.trim(room_num)){
      util.isError("房间号不能为空", that);
      return;
    }
    else {
      util.clearError(that);
    
      wx.navigateTo({
        url: '../register/register?name='+name+'&unit='+unit +'&floor='+floor+'&room_num='+room_num,
      })
    }
  }
})