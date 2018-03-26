// page/play/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false,
    playUrl: '',
    videoContext: {},
    debug: true,
    buttonName: '开始拉流',
    buttonDisable: false,
    // buttonBackgroundColor: '#0D70FF'
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
    this.createContext(self);

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
    this.stopPlaying();
    self.data.videoContext && self.data.videoContext.stop();

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

  createContext: function (self) {
    console.log('>>> play create context');
    var context = wx.createLivePlayerContext('play-livePlayer', self);
    this.setData({
      videoContext: context
    })
  },

  // 停止拉流
  stopPlaying: function () {
    console.log('>>> stop playing');

    var self = this;
    self.setData({
      isPlaying: false,
      buttonName: '开始拉流',
      buttonDisable: false
    }, function () {
      self.data.videoContext.stop();
    })
  },

  // 开始拉流
  startPlaying: function (url) {
    console.log('>>> start playing');
    var self = this;

    self.setData({
      playUrl: url,
      buttonName: '拉流中，请稍候',
      buttonDisable: true
    }, function () {
      self.data.videoContext.stop();
      self.data.videoContext.play();
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
          title: 'URL不可为空',
          icon: 'loading'
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
            title: '仅支持rtmp/flv',
            icon: 'loading'
          })
          return;
        }
      } else {
        wx.showToast({
          title: '仅支持rtmp/flv',
          icon: 'loading'
        })
        return;
      }

      this.startPlaying(url);
    } else {
      // 停止拉流
      console.log('>>> 2222222', this);
      this.stopPlaying();
    }
  },

  onLiveStateChange: function (e) {
    console.log('>>> live-player onLiveStateChange:', e.detail.code);

    if (e.detail.code == -2301) {
      this.stopPlaying();
      this.setData({
        buttonName: "开始拉流",
        buttonDisable: false
      })
      wx.showToast({
        title: '-2301，拉流失败',
      })
    } else if (e.detail.code == 2004) {
      wx.hideToast();

      // 拉流成功
      this.setData({
        buttonName: "停止拉流",
        buttonDisable: false,
        isPlaying: true
      })
    } else if (e.detail.code == 2006) {
      this.setData({
        isPlaying: false
      })
    }
  },

  onLiveError: function (e) {
    console.error('>>> live-player onLiveError:', e.detail.errMsg);
    this.stopPlaying();
    wx.showToast({
      title: '拉流失败',
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      playUrl: e.detail.value
    })
  }
})