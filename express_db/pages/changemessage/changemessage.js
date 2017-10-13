Page({
  data: {
    //announcement
    showData: {},

    showtab: 0,  //顶部选项卡索引
    showtabtype: '', //选中类型,当前页面显示的内容
    tabnav: {},  //顶部选项卡数据
    testdataall: [],  //所有数据
    exam: [], //数据列表
    pass: [], //数据列表
    blacklist: [], //数据列表
    changeData: {}, //准备发回服务器修改的数据
    startx: 0,  //开始的位置x
    endx: 0, //结束的位置x
    critical: 100, //触发切换标签的临界值
    marginleft: 0,  //滑动距离
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'https://www.ownersbuild.com/', //仅为示例，并非真实的接口地址
      data: { message: 123456 },
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
        var ii=0;
        var arr1=[];
        res.data=res.data.reverse();
        for (let i = 0; i < res.data.length; i++) {
            arr1.push({
              "id": ii,
              "time": res.data[i].time,
              "title": res.data[i].title,
              "text": res.data[i].text,
              "author": res.data[i].author
            })
            ii = ii + 1;   
        }
        that.setData({
          exam: arr1
        })
        //console.log(that.data.showData);

      }
    })
    //索引配置
    this.setData({
      tabnav: { //顶部选项
        tabnum: 1,
        tabitem: [
          {
            "id": 1,
            "type": "A",
            "text": "显示所有公告"
          }
        ]
      },
    })
  },
  
  //第一个页面的checkbox的响应
  checkboxChange: function (e) {
    console.log('checkbox_exam发生change事件，携带value值为：', e.detail.value);
    var temp = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      temp.push(this.data.exam[Number(e.detail.value[i])]);
    }
    this.setData({
      changeData: temp
    })
    console.log(this.data.changeData);
  },

  //删除
  deletetitle: function () {
    wx.request({
      url: 'https://www.ownersbuild.com/titledelete',
      data: {
        changeData: this.data.changeData
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (JSON.stringify(res.data).match('deletetitle_success')) {
          // 显示模态弹窗  
          wx.showModal({
            title: '删除状态',
            content: '删除成功，请点击确定',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面  
                wx.redirectTo({
                  url: '../changemessage/changemessage'
                })
              }
            }
          })
        }
        else {
          // 显示消息提示框  
          wx.showToast({
            title: '修改失败，请重试',
            icon: 'error',
            duration: 2000
          })
        }
      }

    })


  },
})
