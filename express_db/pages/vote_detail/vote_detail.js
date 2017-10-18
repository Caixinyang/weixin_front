//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    createFace: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',
    detailImg: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',
    // radioItems: [
    //     {name: '选项1', value: '0'},
    //     {name: '选项2', value: '1'},
    //     {name: '选项3', value: '2'},
    //     {name: '选项4', value: '3'},
    //     {name: '选项5', value: '4'}
    // ],
    checkboxMax: 2,
    // checkboxItems: [
    //     {name: '选项1', value: '0', checked: true},
    //     {name: '选项2', value: '1'},
    //     {name: '选项3', value: '2'},
    //     {name: '选项4', value: '3'},
    //     {name: '选项5', value: '4'}
    // ],
    progress: 0,
    disabled: false,
    optionList: [],
    people: '',
    feed: [],
    changeData: null,
    voteTitle: null,
    voteDate: null,
    voteType: null,
    openid: null,
  },
  //页面跳转拿到数据
  onLoad: function (options) {
    var voteTitle = options.voteTitle;
    var voteDate = options.voteDate;
    var voteTime = options.voteTime;
    var voteText = options.voteText;
    var voteType = options.voteType;
    var str = voteDate + ' ' + voteTime;
    str = str.replace(/-/g, '/');
    var date = new Date(str);
    var time = date.getTime();
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    console.log(app.globalData.openid);
    wx.getStorage({
      key: 'Date',
      success: function (res) {
        if (res.data >= time) {
          if (that.data.openid == "om1sf0dZzSPykCaS4k-R6uRYKdzA") {
            wx.showModal({
              title: '投票状态',
              content: '投票已结束，是否公布',
              success: function (res) {
                if (res.confirm) {
                  // 点击确定后公布投票结果 
                  wx.redirectTo({
                    url: '../vote_res/vote_res?voteTitle=' + voteTitle + '&voteDate=' + voteDate + '&voteText=' + voteText + '&voteType=' + voteType
                  })
                }
              }
            })
          }
          else {
            wx.showModal({
              title: '投票状态',
              content: '投票已结束，谢谢参与',
              success: function (res) {
                if (res.confirm || res.cancel) {
                  // 点击确定后跳转登录页面并关闭当前页面  
                  wx.redirectTo({
                    url: '../vote_index/vote_index'
                  })
                }
              }
            })
          }
        }

      },
    })
    this.setData({
      voteTitle: options.voteTitle,
      voteType: options.voteType,
      voteText: options.voteText,
      voteTime: options.voteTime,
      voteDate: options.voteDate,
      voteFiles: options.voteFiles,
    })
    console.log("拿到的类型" + options.voteType);
    //拿选项！！
    var that = this;
    wx.request({
      url: 'https://www.ownersbuild.com/vote/detail', //仅为示例，并非真实的接口地址
      data: {
        voteTitle: voteTitle,
        voteDate: voteDate
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data); 

        that.setData({
          optionList: res.data
        });
        //  console.log(that.data.optionList);
      }
    });
    wx.request({
      url: 'https://www.ownersbuild.com/people', //仅为示例，并非真实的接口地址
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.status);
        that.setData({
          people: res.data.status
        });
        //计算比例
        var array = [];
        for (let i = 0; i < that.data.optionList.length; i++) {
          array.push({ "value": that.data.optionList[i].value, "num": that.data.optionList[i].num, "scale": Number(that.data.optionList[i].num) / Number(that.data.people) * 100 });
        }
        that.setData({
          feed: array
        });
        console.log(that.data.feed);
      }
    });

  },
  //点击投票
  showTopTips: function (e) {
    console.log(this.data.voteDate);
    console.log(this.data.voteTitle);
    var that = this;
    var flag = true;
    wx.getStorage({
      key: 'vote',
      complete: function (res) {
        if (that.data.voteTitle == res.data) {
          // 显示消息提示框  
          wx.showModal({
            title: '投票状态',
            content: '不可重复投票'

          })
        }
        else {
          wx.setStorage({
            key: 'vote',
            data: that.data.voteTitle,
          })
          wx.request({
            url: 'https://www.ownersbuild.com/vote/change',
            data: {
              voteDate: that.data.voteDate,
              voteTitle: that.data.voteTitle,
              option: that.data.changeData
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (JSON.stringify(res.data).match('success')) {
                // 显示模态弹窗  
                wx.showModal({
                  title: '投票状态',
                  content: '投票成功，请点击确定',
                  success: function (res) {
                    if (res.confirm) {
                      // 点击确定后跳转登录页面并关闭当前页面  
                      wx.redirectTo({
                        url: '../vote_index/vote_index'
                      })
                    }
                  }
                })
              }
              else {
                // 显示消息提示框  
                wx.showModal({
                  title: '投票状态',
                  content: '投票失败，不能为空',
                  success: function (res) {
                    if (res.confirm) {
                      // 点击确定后跳转登录页面并关闭当前页面  
                      wx.redirectTo({
                        url: '../vote_index/vote_index'
                      })
                    }
                  }
                })
              }
            }

          })
        }
      },
    })




  },
  //点击选中投哪个
  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    //var voteTypeList: ['单选', '多选，最多2项', '多选，无限制'];
    var length = e.detail.value.length;
    console.log(length);
    console.log(this.data.voteType);
    if ((this.data.voteType == "单选" && length > 1) || (this.data.voteType == "多选，最多2项" && length > 2)) {
      wx.showModal({
        title: '投票状态',
        content: '超过选择项，请点击确定重新投票',
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转登录页面并关闭当前页面  
            wx.navigateTo({
              url: '../vote_detail/vote_detail'
            })
          }
        }
      })

    }

    if (1) {
      this.setData({
        changeData: e.detail.value
      })
    } else {

    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    let checkboxItems = this.data.checkboxItems;
    let checkboxMax = this.data.checkboxMax;

    let values = e.detail.value;

    if (checkboxMax < values.length) {
      values = values.splice(0, checkboxMax);


      console.log(values)

      for (let j = 0; j < checkboxItems.length; j++) {
        checkboxItems[j].checked = false;

        for (let i = 0; i < values.length; i++) {
          if (checkboxItems[j].value == values[i]) {
            checkboxItems[j].checked = true;
          }
        }
      }

      console.log(checkboxItems)

    } else {
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {

            checkboxItems[i].checked = true;
            break;
          }
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });

  },
  upload: function () {
    if (this.data.disabled) return;

    this.setData({
      progress: 0,
      disabled: true
    });
    _next.call(this);
  }
})
