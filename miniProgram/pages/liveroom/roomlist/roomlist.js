Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    roomName: '',
    roomID:'',
    roomList: [],
    userName: '',
    tapTime: '',
    loginType: '', // 主播：anchor；观众：audience
  },

  // 获取房间列表
  fetchRoomList: function (self) {
    console.log(">>>[liveroom-roomList] begin to fetchRoomList");
    wx.showLoading({
      title: '获取房间列表'
    })
    wx.request({
      url: "https://liveroom3104114736-api.zego.im/demo/roomlist?appid=3104114736",
      method: "GET",
      success: function (res) {
        self.stopRefresh();
        console.log(">>>[liveroom-roomList] fetchRoomList, result is: ");
        if (res.statusCode == 200) {
          console.log(res.data);
          self.setData({
            roomList: res.data.data.room_list
          })
        } else {
          wx.showToast({
            title: '获取房间列表失败，请稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  stopRefresh: function () {
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  // 点击进入房间
  onClickItem: function (e) {
    console.log('>>>[liveroom-roomList] onClickItem, item is: ');
    console.log(e);

    // 防止两次点击操作间隔太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 1000) {
      return;
    }

    this.setData({
      tapTime: nowTime,
      loginType: 'audience'
    })
  },

  // 输入的房间 ID
  bindKeyInput: function (e) {
    this.setData({
      roomID: e.detail.value,
      roomName: e.detail.value,
    })
  },

  // 创建房间（即主播首次登录房间）
  onCreateRoom: function () {
    console.log('>>>[liveroom-roomList] onCreateRoom, roomID is: ' + this.data.roomID);

    if (this.data.roomID.length == 0) {
      wx.showToast({
        title: '创建失败，房间 ID 不可为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (this.data.roomID.match(/^[ ]+$/)) {
      wx.showToast({
        title: '创建失败，房间 ID 不可为空格',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    this.setData({
      loginType:'anchor'
    });

    var url = '../room/room?roomId=' + this.data.roomID + '&roomName=' + this.data.roomID + '&loginType=' + this.data.loginType;
    wx.navigateTo({
      url: url,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('>>>[liveroom-roomList] onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('>>>[liveroom-roomList] onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('>>>[liveroom-roomList] onShow');
    var self = this;

    this.fetchRoomList(self);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('>>>[liveroom-roomList] onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('>>>[liveroom-roomList] onUnload');
    this.stopRefresh(self);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('>>>[liveroom-roomList] onPullDownRefresh');
    var self = this;
    this.fetchRoomList(self);
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
      path: '/pages/main/main?type=liveroomlist',
      imageUrl: '../../../resource/share.png'
    }
  }
})