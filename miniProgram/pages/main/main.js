let {sharePage} = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canShow: -1,
        entryInfos: [
            {
                icon: "../../resource/interactionLive.png",
                subtitle: '《基础示例》',
                title: "视频直播",
                navigateTo: "../liveroom/roomlist/roomlist"
            },
            {
                icon: "../../resource/interactionLive.png",
                subtitle: '示例demo',
                title: "视频直播",
                navigateTo: "../live/index/index"
            },
            {
                icon: "../../resource/interactionLive.png",
                subtitle: '<live-room>',
                title: "视频直播",
                navigateTo: "../usecomponents/live-room/roomlist/roomlist"
            },
            {
                icon: "../../resource/videotlak.png",
                subtitle: '<rtc-room>',
                title: "互动视频",
                navigateTo: "../usecomponents/rtc-room/roomName/roomName"
            },
            {
                icon: "../../resource/playRtmp.png",
                subtitle: 'debug推拉流地址',
                title: "自定义推拉流",
                navigateTo: "../tool/customlive/index"
            },
            {
                icon: "../../resource/setting.png",
                subtitle: '设置APPID',
                title: "自定义设置",
                navigateTo: "../tool/setting/index"
            }
        ]
    },

    onEntryTap(e) {
        if (this.data.canShow) {
            // if(1) {
            // 防止两次点击操作间隔太快
            var nowTime = new Date();
            if (nowTime - this.data.tapTime < 1000) {
                return;
            }
            var toUrl = this.data.entryInfos[e.currentTarget.id].navigateTo;
            console.log(toUrl);
            wx.navigateTo({
                url: toUrl,
            });
            this.setData({'tapTime': nowTime});
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                showCancel: false
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(">>> main onLoad");

        var type = options.type;
        if (type == 'liveroomlist') {
            // 从列表页分享出的卡片进入
            wx.navigateTo({
                url: '/pages/liveroom/roomlist/roomlist',
            });
        } else if (type == 'liveroom') {
            // 从互动直播页分享出的卡片进入
            var roomID = options.roomID;
            var loginType = options.loginType;
            var url = '/pages/liveroom/room/room?roomId=' + roomID + '&roomName=' + roomID + '&loginType=' + loginType;
            console.log(">>>[main onLoad] try navigate to: ", url);
            wx.navigateTo({
                url: url,
            });
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log("onReady");
        this.authCheck();
    },

    authCheck() {
        let self = this;
        wx.getSetting({
            success: ({authSetting}) => {

                //推流必须要有这两权限
                if (!authSetting['scope.camera'] || !authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.camera',
                        success() {
                            self.setData({
                                canShow: 1
                            });
                        },
                        fail() {
                            self.setData({
                                canShow: 0
                            });
                        }
                    });

                    wx.authorize({
                        scope: 'scope.record',
                        success() {
                            self.setData({
                                canShow: 1
                            });
                        },
                        fail() {
                            self.setData({
                                canShow: 0
                            });
                        }
                    });


                } else if (!wx.createLivePlayerContext) {
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                        showCancel: false,
                    });
                    this.setData({
                        canShow: 0
                    });
                } else {
                    this.setData({
                        canShow: 1
                    });
                }

            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log("onShow");

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        console.log("onHide");

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log("onUnload");

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("onPullDownRefresh");

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log("onReachBottom");

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        console.log("onShareAppMessage");
        return sharePage();
    },

    settingCallback({detail}) {
         this.authCheck();
    }

});