// pages/components/rtc-room/roomName/roomName.js
let {sharePage} = require('../../../../utils/util.js');

let _methods = {
    radioChange() {
        this.setData({
            roomType: this.data.roomType === 1 ? 2 : 1
        })
    },


    bindKeyInput(e){
        this.setData({
            roomID: e.detail.value
        });
    },
    // 创建房间（即主播首次登录房间）
    onCreateRoom() {

        console.log('>>>[liveroom-roomList] onCreateRoom, roomID is: ' + this.data.roomID);

        if (this.data.roomID.length === 0) {
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
        let url = '../room/room?roomID=' + this.data.roomID +  '&roomType=' + this.data.roomType;
        wx.navigateTo({
            url: url,
        });


    },
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomType: 1,
        roomID: ''
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
         return sharePage();
    },
    ..._methods
})