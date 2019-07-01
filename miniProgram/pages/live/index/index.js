// pages/live/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: '',
    nTapTime: 0,
    eTapTime: 0,
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

  bindRoomInput: function ({detail: {value}}) {
    console.log('>>> live index', value)
      this.setData({
        roomId: value
      })
  },

  onCreateRoom () {
    let now = new Date().getTime();
    if (now - this.data.nTapTime < 1000) {
      return
    }
    this.setData({
      nTapTime: now
    })
    
    const  url = '/pages/live/room/room?roomID=' + this.data.roomId + '&roomName=' + this.data.roomId + '&loginType=anchor';
    console.log(">>>[main onLoad] try navigate to: ", url);
    wx.navigateTo({
        url: url,
    });
  },

  onJoinRoom () {
    let now = new Date().getTime();
    if (now - this.data.eTapTime < 1000) {
      return
    }
    this.setData({
      eTapTime: now
    })
    
    const  url = '/pages/live/room/room?roomID=' + this.data.roomId + '&roomName=' + this.data.roomId + '&loginType=audience'
    console.log(">>>[main onLoad] try navigate to: ", url);
    wx.navigateTo({
        url: url,
    });
  }
})