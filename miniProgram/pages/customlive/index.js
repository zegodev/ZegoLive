Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false,
    isPushing: false,
    playUrl: '',
    pushUrl: '',
    playVideoContext: {},
    pushVideoContext: {},
    debug: false,
    playButton: '开始拉流',
    isPlayButtonDisable: false,
    pushButton: '开始推流',
    isPushButtonDisable: false,
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
    console.log('>>> play onReady');

    var self = this;
    this.createPlayContext(self);
    this.createPushContext(self);

    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('>>> play onShow');

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('>>> play onHide');

    console.log('>>> 1111111', this);
    this.stopPlaying();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('>>> play onUnload');

    var self = this;
    self.stopPlaying();
    self.stopPushing();

    wx.setKeepScreenOn({
      keepScreenOn: false,
    })
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
    return {
      title: '即构音视频云',
      path: '/pages/main/main',
      imageUrl: '../../resource/share.png'
    }
  },

  // 拉流
  createPlayContext: function (self) {
    console.log('>>> play create context');
    var context = wx.createLivePlayerContext('livePlayer', self);
    this.setData({
      playVideoContext: context
    })
  },

  // 停止拉流
  stopPlaying: function () {
    console.log('>>> stop playing');

    var self = this;
    self.setData({
      isPlaying: false,
      playButton: '开始拉流',
      isPlayButtonDisable: false
    }, function () {
      self.data.playVideoContext.stop();
    })
  },

  // 开始拉流
  startPlaying: function (url) {
    console.log('>>> start playing');
    var self = this;

    self.setData({
      playUrl: url,
      playButton: '拉流中...',
      isPlayButtonDisable: true
    }, function () {
      self.data.playVideoContext.stop();
      self.data.playVideoContext.play();
    })
  },

  onSwitchPlayState: function (e) {
    console.log('>>> onSwitchPlayState: ', e);

    var url = this.data.playUrl;
    console.log('>>> playUrl is: ', url);

    if (!this.data.isPlaying) {
      // 开始拉流
      if (url.length == 0) {
        wx.showToast({
          title: '拉流 url 不可为空',
          icon: 'none'
        })
        return;
      }

      if (url.indexOf("rtmp:") == 0) {
        console.log('>>> playUrl is rtmp type');
      } else if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
        if (url.indexOf(".flv") != -1) {
          console.log('>>> playUrl is flv type');
        } else {
          wx.showToast({
            title: '仅支持 rtmp/flv',
            icon: 'none'
          })
          return;
        }
      } else {
        wx.showToast({
          title: '仅支持 rtmp/flv',
          icon: 'none'
        })
        return;
      }

      this.startPlaying(url);
    } else {
      // 停止拉流
      this.stopPlaying();
    }
  },

  onPlayStateChange: function (e) {
    console.log('>>> live-player onPlayStateChange:', e.detail.code);

    if (e.detail.code == -2301) {
      this.stopPlaying();
      this.setData({
        playButton: "开始拉流",
        isPlayButtonDisable: false
      })
      wx.showToast({
        title: '-2301，拉流失败',
      })
    } else if (e.detail.code == 2004) {
      wx.hideToast();

      // 拉流成功
      this.setData({
        playButton: "停止拉流",
        isPlayButtonDisable: false,
        isPlaying: true
      })
    } else if (e.detail.code == 2006) {
      this.setData({
        isPlaying: false
      })
    }
  },

  onPlayError: function (e) {
    console.error('>>> live-player onPlayError:', e.detail.errMsg);
    this.stopPlaying();
    wx.showToast({
      title: '拉流失败',
    })
  },

  bindKeyPlayInput: function (e) {
    console.log('>>> bindKeyPlayInput:');
    console.log(e);

    this.setData({
      playUrl: e.detail.value
    })
  },

  // 推流
  createPushContext: function (self) {
    console.log('>>> push create context');
    var context = wx.createLivePusherContext('livePusher', self);
    this.setData({
      pushVideoContext: context
    })
  },

  // 停止推流
  stopPushing: function () {
    console.log('>>> stop pushing');

    var self = this;
    self.setData({
      isPushing: false,
      pushButton: '开始推流',
      isPushButtonDisable: false
    }, function () {
      self.data.pushVideoContext.stop();
    })
  },

  // 开始推流
  startPushing: function (url) {
    console.log('>>> start pushing');
    var self = this;

    self.setData({
      pushUrl: url,
      pushButton: '推流中...',
      isPushButtonDisable: true
    }, function () {
      self.data.pushVideoContext.start();
    })
  },

  onSwitchPushState: function (e) {
    console.log('>>> onSwitchPushState: ', e);

    var url = this.data.pushUrl;
    console.log('>>> pushUrl is: ', url);

    if (!this.data.isPushing) {
      // 开始推流
      if (url.length == 0) {
        wx.showToast({
          title: '推流 url 不可为空',
          icon: 'none'
        })
        return;
      }

      if (url.indexOf("rtmp:") == 0) {
        console.log('>>> pushUrl is rtmp type');
      } else if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
        if (url.indexOf(".flv") != -1) {
          console.log('>>> pushUrl is flv type');
        } else {
          wx.showToast({
            title: '仅支持 rtmp/flv',
            icon: 'none'
          })
          return;
        }
      } else {
        wx.showToast({
          title: '仅支持 rtmp/flv',
          icon: 'none'
        })
        return;
      }

      this.startPushing(url);
    } else {
      // 停止拉流
      this.stopPushing();
    }
  },

  onPushStateChange: function (e) {
    console.log('>>> live-pusher onPushStateChange:', e.detail.code);

    if (e.detail.code == -1307) {
      this.stopPushing();
      this.setData({
        pushButton: "开始推流",
        isPushButtonDisable: false
      })
      wx.showToast({
        title: '-1307，拉流失败',
      })
    } else if (e.detail.code == 1007) {
      wx.hideToast();

      // 推流成功
      this.setData({
        pushButton: "停止推流",
        isPushButtonDisable: false,
        isPushing: true
      })
    }
  },

  onPushError: function (e) {
    console.error('>>> live-pusher onPushError:', e.detail.errMsg);
    this.stopPushing();
    wx.showToast({
      title: '推流失败',
    })
  },

  bindKeyPushInput: function (e) {
    console.log('>>> bindKeyPushInput:');
    console.log(e);

    this.setData({
      pushUrl: e.detail.value
    })
  },

  onDebug: function (e) {
    var self = this;
    self.setData({
      debug: !self.data.debug,
    })
  }

})