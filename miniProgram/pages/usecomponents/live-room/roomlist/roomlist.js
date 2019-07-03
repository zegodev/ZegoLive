let {sharePage} = require('../../../../utils/util.js');
const app = getApp();
let {appSign, roomListURL: requestRoomListUrl, existOwnRoomList} = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomName: '',
        roomID: '',
        roomList: [],
        userName: '',
        tapTime: '',
        loginType: '', // 主播：anchor；观众：audience
        testMode: true,
    },

    // 获取房间列表
    fetchRoomList(self) {
        console.log(">>>[liveroom-roomList] begin to fetchRoomList");
        wx.showLoading({
            title: '获取房间列表'
        })
        wx.request({
            url: requestRoomListUrl,
            method: "GET",
            success(res) {
                self.stopRefresh();
                console.log(">>>[liveroom-roomList] fetchRoomList, result is: ");
                if (res.statusCode === 200) {
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

    stopRefresh() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
    },

    // 点击进入房间
    onClickItem({currentTarget: {dataset: {name, id}}}) {
        console.log('>>>[liveroom-roomList] onClickItem, item is: ', name, id);

        // 防止两次点击操作间隔太快
        let nowTime = new Date();
        if (nowTime - this.data.tapTime < 1000) {
            return;
        }

        this.setData({
            tapTime: nowTime,
            loginType: 'audience'
        }, function () {
            wx.navigateTo({
                url: `../room/room?roomID=${id}&roomName=${name}&loginType=audience`
            })
        })
    },

    // 输入的房间 ID
    bindKeyInput(e) {
        this.setData({
            roomID: e.detail.value,
            roomName: e.detail.value,
        })
    },

    // 创建房间（即主播首次登录房间）
    onCreateRoom() {
        let self = this;
        console.log('>>>[liveroom-roomList] onCreateRoom, roomID is: ' + self.data.roomID);

        if (self.data.roomID.length === 0) {
            wx.showToast({
                title: '创建失败，房间 ID 不可为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        if (self.data.roomID.match(/^[ ]+$/)) {
            wx.showToast({
                title: '创建失败，房间 ID 不可为空格',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        self.setData({
            loginType: 'anchor'
        });

        if (this.data.testMode) {
            wx.request({
                url: requestRoomListUrl,
                method: "GET",
                success(res) {
                    console.log(">>>[liveroom-roomList] fetchRoomList before create room, result is: ");
                    if (res.statusCode === 200) {
                        let roomList = res.data.data.room_list;
                        self.setData({
                            roomList: roomList
                        })
    
                        for (let index in roomList) {
                            if (roomList[index].room_id === self.data.roomID) {
                                wx.showToast({
                                    title: '创建失败，相同 ID 房间已存在，请重新创建',
                                    icon: 'none',
                                    duration: 3000
                                });
                                return;
                            }
                        }
    
                        let url = '../room/room?roomID=' + self.data.roomID + '&roomName=' + self.data.roomID + '&loginType=' + self.data.loginType;
                        wx.navigateTo({
                            url: url,
                        });
                    } else {
                        wx.showToast({
                            title: '创建失败，请稍后重试',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                }
            })
        } else {
            let url = '../room/room?roomID=' + self.data.roomID + '&roomName=' + self.data.roomID + '&loginType=' + self.data.loginType;
            wx.navigateTo({
                url: url,
            });
        }  
    },

    // 加入房间
    onJoinRoom() {
        var self = this;
        console.log('>>>[liveroom-roomList] onJoinRoom, roomID is: ' + self.data.roomID);

        if (self.data.roomID.length === 0) {
            wx.showToast({
                title: '房间 ID 不可为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        if (self.data.roomID.match(/^[ ]+$/)) {
            wx.showToast({
                title: '房间 ID 不可为空格',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        self.setData({
            loginType: 'audience'
        });

        var url = '../room/room?roomID=' + self.data.roomID + '&roomName=' + self.data.roomID + '&loginType=' + self.data.loginType;
        wx.navigateTo({
            url: url,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //wx.authorize({ scope: "scope.camera" })
        //wx.openSetting();
        console.log('>>>[liveroom-roomList] onLoad');
        if (appSign && !existOwnRoomList) {
            this.setData({
                testMode: false
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('>>>[liveroom-roomList] onReady');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('>>>[liveroom-roomList] onShow');
        if (this.data.testMode) {
            //刷新全局变量
            requestRoomListUrl = getApp().globalData.roomListURL;

            let self = this;

            this.fetchRoomList(self);
        }
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        console.log('>>>[liveroom-roomList] onHide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log('>>>[liveroom-roomList] onUnload');
        this.stopRefresh(self);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log('>>>[liveroom-roomList] onPullDownRefresh');
        let self = this;
        this.fetchRoomList(self);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return sharePage();
    }
});