// pages/vote_res/vote_res.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteTitle:'',
    voteDate:'',
    optionList:[],
    voteText:'',
    voteType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      voteTitle:options.voteTitle,
      voteDate:options.voteDate,
      voteText: options.voteText,
      voteType: options.voteType,
    })
    var that=this;
    wx.request({
      url: 'https://www.ownersbuild.com/vote/detail', //仅为示例，并非真实的接口地址
      data: {
        voteTitle: this.data.voteTitle,
        voteDate: this.data.voteDate
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          optionList: res.data
        });
        //  
      }
    });
    //拿到access_token
    var appid = "wxc646ed8048062646";
    var secret = "d0b4d738eed9ce201d68432d2661d439";
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
      method: 'GET',
      success: function (res) {
        that.setData({
          access_token: res.data.access_token
        })
      }
    })
  },
  evaSubmit:function(e){
    //发送投票消息
    //拿到fId
    var that=this;
    var fId = e.detail.formId;
    console.log("fId");
    console.log(fId);
    console.log("access_token:");
    console.log(that.data.access_token);
    var optionStr="";
    for(let i=0;i<this.data.optionList.length;i++){
      optionStr += this.data.optionList[i].value + ":" + this.data.optionList[i].num+"票  "
    }
    console.log(optionStr);
    var array = [];
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token;
    //发送通告到每一个已经通过的人身上！！！
    var d = {
      touser: "",
      template_id: "Jkxgg9KxZScPkYvhe-7yjiKrBKDxMZJCYWzLjhg9_-c",//这个是1、申请的模板消息id，  
      page: '/pages/vote_index/vote_index',
      form_id: fId,
      data: {

        "keyword1": {
          "value": this.data.voteTitle,

        },

        "keyword2": {
          "value": "管理员",

        },
        "keyword3": {
          "value": optionStr,

        },
        "keyword4": {
          "value": this.data.voteType,

        },
        color: '#ccc',
        emphasis_keyword: 'keyword1.DATA'
      }
    };
    wx.request({
      url: 'https://www.ownersbuild.com/openid',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      //拿到需要发送的openid
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          d.touser = res.data[i];
          wx.request({
            url: l,
            data: d,
            method: 'POST',
            success: function (res) {
              console.log("push msg");
              console.log(res);
            },
            fail: function (err) {
              // fail  
              console.log("push err")
              console.log(err);
            }
          })
        };
      }
    });
    wx.showModal({
      title: '投票状态',
      content: '提交成功',
      success: function (res) {
        if (res.confirm || res.cancel) {
          // 点击确定后跳转登录页面并关闭当前页面  
          wx.redirectTo({
            url: '../vote_index/vote_index'
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