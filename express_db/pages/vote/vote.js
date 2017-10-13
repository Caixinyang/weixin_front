Page({
    data: {
        optionList: [
            {
                icon: '',
                num: '0'
            },
            {
                icon: '',
                num:'0'
            }
        ],

        showAddBtn: 1,

        date: "2017-09-01",
        time: "12:01",

        voteType: ['单选', '多选，最多2项', '多选，无限制'],
        voteTypeIndex: 0,

        files: [],

        voteTitle:"",
        voteText:"",
        access_token: null,

    },
    updateVoteType: function (){
        let _optionList = this.data.optionList;
        let _voteType = this.data.voteType;

        _voteType = [];

        _optionList.map(function (obj, i) {

            if (i === 0){
                _voteType.push('单选');
            }else {
                _voteType.push('多选，最多'+ (i + 1) +'项');
            }

            console.log(i)
            console.log(_voteType)

        })
        _voteType.push('多选，无限制');

        this.setData({voteType: _voteType});
        console.log(111)
    },
    showTopTips: function(e){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
        //发送数据到服务器
        wx.request({
          url: 'https://www.ownersbuild.com/vote/create',
          data: {
            date: this.data.date,//开始日期
            time: this.data.time,//结束时间
            voteType: this.data.voteType[this.data.voteTypeIndex],//类型
            voteTitle: this.data.voteTitle,//标题
            voteText: this.data.voteText,//内容
            files: this.data.files,//??
            optionList: this.data.optionList
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (JSON.stringify(res.data).match('success')) {
              // 显示模态弹窗  
              wx.showModal({
                title: '发布状态',
                content: '发布成功，请点击确定查看吧',
                success: function (res) {
                  if (res.confirm) {
                    // 点击确定后跳转登录页面并关闭当前页面  
                    wx.navigateTo({
                      url: '../vote_index/vote_index'
                    })
                  }
                }
              })
            }
            else {
              // 显示消息提示框  
              wx.showToast({
                title: "发布失败",
                icon: 'error',
                duration: 2000
              })
            }
          }
        })
        
        wx.request({
          url: 'https://www.ownersbuild.com/share/vote', //仅为示例，并非真实的接口地址
          data: {
            fId: e.detail.formId,
            keyword1: this.data.voteTitle,
            keyword2: this.data.date,
            keyword3: "管理员",
            keyword4: this.data.voteText,
            access_token: this.data.access_token,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("fid发送");

          }
        });
        //发送投票消息
        /*拿到fId
        var fId = e.detail.formId;
        console.log("fId");
        console.log(fId);
        console.log("access_token:");
        console.log(that.data.access_token);
        var array = [];
        var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token;
        //发送通告到每一个已经通过的人身上！！！
        var d = {
          touser: "",
          template_id: "ghh19_RQBBy3eYf_NrtwDpluekgR0gXI_kcSfj0cQmk",//这个是1、申请的模板消息id，  
          page: '/pages/vote_index/vote_index',
          form_id: fId,
          data: {

            "keyword1": {
              "value": this.data.voteTitle, 

            },

            "keyword2": {
              "value": this.data.date,

            },
            "keyword3": {
              "value": "管理员",

            },
            "keyword4": {
              "value": this.data.voteText,

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
    */
    },
    onLoad:function(){
      var that=this;
      wx.getStorage({
        key: 'access_token',
        success: function(res) {
          that.setData({
            access_token: res.data
          })
        },

      })
         
    },
    bindVoteTitleChange: function (e) {
      this.setData({
        voteTitle: e.detail.value
      })
    },
    bindVoteTextChange: function (e) {
      this.setData({
        voteText: e.detail.value
      })
    },
    bindVoteTypeChange: function (e){
        this.setData({
            voteTypeIndex: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    recordValue: function (e){
        let _optionList = this.data.optionList;
        let _index = e.target.dataset.index;
        let value = e.detail.value;
        _optionList[_index].value = value;

        this.setData({optionList: _optionList});

    },
    addOption: function (e){
        let _optionList = this.data.optionList;

        _optionList.push({icon: '/images/common/5.png',num:'0'})
        this.setData({optionList: _optionList});

        // 选项大于15个后移除添加按钮
        if(_optionList.length >= 15) {
            this.setData({showAddBtn: 0});
        }

        // 更新投票选项
        this.updateVoteType();

    },
    delOption: function (e){
        let _index = e.target.dataset.index;
        let _optionList = this.data.optionList;

        _optionList.splice(_index, 1);

        this.setData({optionList: _optionList});

        // 更新投票选项
        this.updateVoteType();

    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count: 1, // 最多可以选择的图片张数
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    }
});