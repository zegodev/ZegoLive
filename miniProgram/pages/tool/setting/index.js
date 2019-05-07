// pages/setting/index.js
let globalData = getApp().globalData;
let {liveAppID, rtcAppID, tokenURL, roomListURL, wsServerURL, cgi_token, testEnvironment} = globalData;

let _methods = {
    inputChange({detail, target}) {
        console.log('inputChange', detail, target);
        let name = target.dataset.name, value = detail.value;
        switch (name) {
            case 'liveAppID':
                this.setData({
                    _liveAppID: value
                });
                break;
            case 'rtcAppID':
                this.setData({
                    _rtcAppID: value
                });
                break;
            case 'tokenURL':
                this.setData({
                    _tokenURL: value
                });
                break;
            case 'serverURL':
                this.setData({
                    _wsServerURL: value
                });
                break;
            case 'testEnvironment':
                this.setData({
                    _testEnvironment: value ? 0 : 1
                });
                break;
            case 'roomListURL':
                this.setData({
                    _roomListURL: value
                });
                break;
            default :
                break;
        }

    },
    submit() {
        if (this.data._liveAppID !== liveAppID ||
            this.data._rtcAppID !== rtcAppID ||
            this.data._tokenURL !== tokenURL ||
            this.data._roomListURL !== roomListURL ||
            this.data._wsServerURL !== wsServerURL ||
            this.data._cgi_token != cgi_token ||
            this.data._testEnvironment != testEnvironment
        ) {
            wx.showModal({
                content: '确定要修改么？',
                success: (res) => {
                    if (res.confirm) {
                        globalData.liveAppID = this.data._liveAppID * 1;
                        globalData.rtcAppID = this.data._rtcAppID * 1;
                        globalData.tokenURL = this.data._tokenURL;
                        globalData.roomListURL = this.data._roomListURL;
                        globalData.wsServerURL = this.data._wsServerURL;
                        globalData.cgi_token = this.data._cgi_token;
                        globalData.testEnvironment = this.data._testEnvironment;
                        wx.navigateBack();
                    }
                }
            })
        } else {
            wx.navigateBack();
        }
    },
    reset() {

        globalData.liveAppID = 1739272706;
        globalData.rtcAppID = 1082937486;
        globalData.tokenURL = "https://wssliveroom-demo.zego.im/token";
        globalData.roomListURL = "https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706";
        globalData.wsServerURL = "wss://wssliveroom-demo.zego.im/ws";
        globalData.logServerURL = "https://wsslogger-demo.zego.im/httplog";
        globalData.testEnvironment = 0;

        wx.navigateBack();
    },
    scanQR() {

        wx.scanCode({
            success: ({result, scanType}) => {
                if (scanType === "QR_CODE") {
                    let {appid, server, roomlist, cgi_token, testEnvironment} = JSON.parse(result);
                    if (appid && !server) {
                        server = 'wss://wssliveroom' + appid + '-api.zego.im/ws';
                    }
                    this.setData({
                        _liveAppID: appid ? appid : this.data._liveAppID,
                        _rtcAppID: appid ? appid : this.data._rtcAppID,
                        _wsServerURL: server ? server : this.data._wsServerURL,
                        _roomListURL: roomlist ? roomlist : this.data._roomListURL,
                        _cgi_token: cgi_token,
                        _testEnvironment: testEnvironment,
                    });
                    this.data.useQR = 1;
                } else {
                    console.error('扫描的不是二维码')
                }
            },
            fail({errMsg}) {
                console.error('扫描失败', errMsg);
            }
        })
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        _liveAppID: liveAppID,
        _rtcAppID: rtcAppID,
        _tokenURL: tokenURL,
        _roomListURL: roomListURL,
        _wsServerURL: wsServerURL,
        _cgi_token: cgi_token,
        _testEnvironment: testEnvironment,
        useQR: 0
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

        //扫二维码的时候不更新
        if (this.data.useQR == 1) {
            this.data.useQR = 0;
            return;
        }

        liveAppID = getApp().globalData.liveAppID;
        rtcAppID = getApp().globalData.rtcAppID;
        tokenURL = getApp().globalData.tokenURL;
        roomListURL = getApp().globalData.roomListURL;
        wsServerURL = getApp().globalData.wsServerURL;
        testEnvironment = getApp().globalData.testEnvironment;
        this.setData({
            _liveAppID: liveAppID,
            _rtcAppID: rtcAppID,
            _tokenURL: tokenURL,
            _roomListURL: roomListURL,
            _wsServerURL: wsServerURL,
            _testEnvironment: testEnvironment
        })
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
    ..._methods
});