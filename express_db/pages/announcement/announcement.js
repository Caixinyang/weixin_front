Page({
  data: {
    //announcement
    showData: {},

    showtab:0,  //顶部选项卡索引
    showtabtype:'', //选中类型,当前页面显示的内容
    tabnav:{},  //顶部选项卡数据
    testdataall:[],  //所有数据
    exam:[], //数据列表
    pass:[], //数据列表
    blacklist:[], //数据列表
    changeData:{}, //准备发回服务器修改的数据
    startx:0,  //开始的位置x
    endx:0, //结束的位置x
    critical: 100, //触发切换标签的临界值
    marginleft:0,  //滑动距离
  },
  onLoad: function () {
  //请求数据
    var that = this;
    wx.request({
      url: 'https://www.ownersbuild.com/', //仅为示例，并非真实的接口地址
      data: {
        management: '123456',
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("查询成功");

        that.setData({
          showData: res.data
        })
        console.log(that.data.showData);

      }
    })
//索引配置
    this.setData({
      tabnav:{ //顶部选项
        tabnum:3,
        tabitem:[
          {
            "id":1,
            "type":"A",
            "text":"未审核"
          },
          {
            "id":2,
            "type":"B",
            "text":"已通过"
          },
          {
            "id":3,
            "type":"C",
            "text":"黑名单"
          },
          
        ]
      },
    })

    this.fetchTabData("0");//初始化调用fetchTabData，fetchTabData函数会调用fetchData
  },
  fetchData:function(t){  //生成数据
    const arr1 =[];
    var ii=0;
    //用showData
    for(let i=0;i<this.data.showData.length;i++){
      if (Number(this.data.showData[i].power)==t){//找到数据中对应权限的数据
      arr1.push({
        "id": ii,
        "type": Number(this.data.showData[i].power),
        "name": this.data.showData[i].name,
        "phone": this.data.showData[i].PhoneNumber,
        "unit": this.data.showData[i].unit,
        "floor": this.data.showData[i].floor,
        "room_num": this.data.showData[i].room_num
      })
       ii=ii+1;
      }
    }
    return arr1
  },
  //fetchTabData调用fetchData，每点一下“未审核”运行一次
  fetchTabData:function(i){//导入的i是0,1，2来选择当前显示的页面，初始化为0，显示未审核
    console.log(Number(i));
    switch(Number(i)) {
      case 0:
        console.log("刷新第一页");
        this.setData({
          exam: this.fetchData(1)//刷新第一页
        })
        break;
      case 1:
        console.log("刷新第二页");
        this.setData({
          pass: this.fetchData(2)//刷新第二页
        })
        break;
      case 2:
        console.log("刷新第三页");
        this.setData({
          blacklist: this.fetchData(0)//刷新第三页
        })
        break;
      default:
        return;
    }
  },
  //点击”未通过“、"已通过”、“黑名单”进行内容的转换
  setTab:function(e){ //设置选项卡选中索引
    const edata = e.currentTarget.dataset;//
    console.log(edata);//{type: "B", tabindex: 1}
    this.setData({
      showtab: Number(edata.tabindex),//number转换成数字
      showtabtype: edata.type
    })
    this.fetchTabData(edata.tabindex);//显示转换后的页面
  },
  scrollTouchstart:function(e){
    let px = e.touches[0].pageX;
    this.setData({
      startx: px
    })
  },
  scrollTouchmove:function(e){
    let px = e.touches[0].pageX;
    let d = this.data;
    this.setData({
      endx: px,
    })
    if(px-d.startx<d.critical && px-d.startx>-d.critical){
      this.setData({
        marginleft: px - d.startx
      })
    }
  },
  scrollTouchend:function(e){
    let d = this.data;
    if(d.endx-d.startx >d.critical && d.showtab>0){
      this.setData({
        showtab: d.showtab-1,
      })
      // this.fetchTabData(d.showtab-1);
    }else if(d.endx-d.startx <-d.critical && d.showtab<this.data.tabnav.tabnum-1){
      this.setData({
        showtab: d.showtab+1,
      })
    }
    this.fetchTabData(d.showtab);
    this.setData({
        startx:0,
        endx:0,
        marginleft:0
    })
  },
  //第一个页面的checkbox的响应
  checkboxChange_exam: function (e) {
    console.log('checkbox_exam发生change事件，携带value值为：', e.detail.value);
    var temp=[];
    for (let i= 0; i < e.detail.value.length;i++){
      temp.push(this.data.exam[Number(e.detail.value[i])]);
    }
    this.setData({
      changeData: temp
    })
    console.log(this.data.changeData);
  },
  //第二个页面的checkbox的响应
  checkboxChange_pass: function (e) {
    console.log('checkbox_pass发生change事件，携带value值为：', e.detail.value);
    var temp = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      temp.push(this.data.pass[Number(e.detail.value[i])]);
    }
    this.setData({
      changeData: temp
    })
    console.log(this.data.changeData);
  },
  //第三个页面的checkbox的响应
  checkboxChange_blacklist: function (e) {
    console.log('checkbox_blacklist发生change事件，携带value值为：', e.detail.value);
    var temp = [];
    for (let i = 0; i < e.detail.value.length; i++) {
      temp.push(this.data.blacklist[Number(e.detail.value[i])]);
    }
    this.setData({
      changeData: temp
    })
    console.log(this.data.changeData);
  },

  //增删改查
  blackchange: function () 
  {
      wx.request({
        url: 'https://www.ownersbuild.com/exam/blackchange',
        data: {
        changeData: this.data.changeData
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
          },
        success: function (res) {
        if (JSON.stringify(res.data).match('changedata_success')) {
          // 显示模态弹窗  
          wx.showModal({
            title: '修改状态',
            content: '修改成功，请点击确定',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面  
                wx.redirectTo({
                  url: '../announcement/announcement'
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
  //
  passchange: function () {
    wx.request({
      url: 'https://www.ownersbuild.com/exam/passchange',
      data: {
        changeData: this.data.changeData
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (JSON.stringify(res.data).match('changedata_success')) {
          // 显示模态弹窗  
          wx.showModal({
            title: '修改状态',
            content: '修改成功，请点击确定',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面  
                wx.redirectTo({
                  url: '../announcement/announcement'
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
