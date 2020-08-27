let {sharePage} = require('../../utils/util.js');
let { ZegoClient } = require("/../../js/jZego-wx-1.5.0.js");
// let { ZegoClient } = require("miniprogram-zego");

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
            },
            {
                icon: "../../resource/interactionLive.png",
                subtitle: '私有化',
                title: "视频直播",
                navigateTo: "../usecomponents/privatization-room/roomlist/roomlist"
            },
            {
                icon: "../../resource/setting.png",
                subtitle: 'demo',
                title: "电商直播",
                navigateTo: "173"
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
            if (toUrl === '173') {
                wx.navigateToMiniProgram({
                    appId: 'wx371ac5dc128c4c5e',
                    path: 'pages/roomList/index',
                    extraData: {
                      foo: 'bar'
                    },
                    envVersion: 'develop',
                    success(res) {
                      // 打开成功
                      console.log(res)
                    },
                    fail(e) {
                      console.error(e);
                    }
                  })
                  return;
            }
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
        ZegoClient.isSupportLive(result => {
            if (result.code === 10001) {
                console.log('result ', result.code)
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                    showCancel: false,
                });
                this.setData({
                    canShow: 0
                });
            } else if (result.code === 10002) {
                console.log('result ', result.code)
                let hasCamera = false;
                let hasRecord = false;
                wx.authorize({
                    scope: 'scope.camera',
                    success() {
                        hasCamera = true;
                        if (hasRecord) {
                            self.setData({
                                canShow: 1
                            });
                        } else {
                            self.setData({
                                canShow: 0
                            });
                        }
                    },
                    fail() {
                        hasCamera = false;
                        self.setData({
                            canShow: 0
                        });
                    }
                });

                wx.authorize({
                    scope: 'scope.record',
                    success() {
                        hasRecord = true;
                        if (hasCamera) {
                            self.setData({
                                canShow: 1
                            });
                        } else {
                            self.setData({
                                canShow: 0
                            });
                        }
                    },
                    fail() {
                        hasRecord = false;
                        self.setData({
                            canShow: 0
                        });
                    }
                });
            } else {
                this.setData({
                    canShow: 1
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log("onShow");
        this.authCheck();
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