//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    appID: 0,
    roomListURL: '',
    wsServerURL: '',
    logServerURL: ''
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
    return {
      title: '即构音视频云',
      path: '/pages/main/main',
      imageUrl: '../../resource/share.png'
    }
  },

  onFinishSetting: function (e) {
    var self = this;

    if(self.data.appID == 0 || self.data.roomListURL.length == 0 || self.data.wsServerURL.length == 0 || self.data.logServerURL.length == 0) {
      wx.showModal({
        title: '提示',
        content: "上述任一内容均不可为空！",
        showCancel: false,
        success: function (res) {}
      });
      return;
    }

    app.globalData.appID = self.data.appID;
    app.globalData.roomListURL = self.data.roomListURL;
    app.globalData.wsServerURL = self.data.wsServerURL;
    app.globalData.logServerURL = self.data.logServerURL;

    console.log(">>>[setting] onFinishSetting, appID: ", app.globalData.appID);
    console.log(">>>[setting] onFinishSetting, roomListURL: ", app.globalData.roomListURL);
    console.log(">>>[setting] onFinishSetting, wsServerURL: ", app.globalData.wsServerURL);
    console.log(">>>[setting] onFinishSetting, logServerURL: ", app.globalData.logServerURL);

    wx.navigateBack();
  },

  bindKeyAppID: function (e) {
    var self = this;
    self.setData({
      appID: e.detail.value,
    });
  },

  bindKeyRoomListURL: function (e) {
    var self = this;
    self.setData({
      roomListURL: e.detail.value,
    });
  },

  bindKeyWsServerURL: function (e) {
    var self = this;
    self.setData({
      wsServerURL: e.detail.value,
    });
  },

  bindKeyLogServerURL: function (e) {
    var self = this;
    self.setData({
      logServerURL: e.detail.value,
    });
  }

})