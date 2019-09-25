let {format, sharePage} = require("../../../../utils/util.js");
let {getLoginToken} = require("../../../../utils/server.js");
//获取应用实例
const app = getApp();
let {liveAppID: appID, tokenURL,wsServerURL,testEnvironment} = app.globalData;


let _methods = {
    onRoomEvent(ev) {
        console.log('onRoomEvent', ev);
        let self = this, {detail, tag} = ev.detail;
        switch (tag) {
            case 'onPublishStateUpdate': {

            }
            case 'onPublishQualityUpdate': {

                break;
            }
            case 'onPlayStateUpdate': {

            }
            case 'onPlayQualityUpdate': {

                break;
            }
            case 'onRecvJoinLiveRequest': {
                wx.showModal({
                    title: '请求',
                    content: detail.from_username + '请求连麦',
                    success: function (res) {
                        self.data.component.respondJoinLive(detail.requestId, res.confirm,
                            seq => {
                                console.log('respondJoinLive suc', seq);
                            },
                            (err, seq) => {
                                console.log('respondJoinLive err', err, seq);
                            });
                    }
                });
                break;
            }
            case 'onRecvEndJoinLiveCommand': {

                break;
            }
            case 'onUserStateUpdate': {

                break;
            }
            case 'onGetTotalUserList': {

                break;
            }
            case 'onRecvRoomMsg': {
                let name = detail.chat_data[0].id_name;
                let time = detail.chat_data[0].send_time;

                let message = {};
                message.name = name;
                message.time = format(time);
                message.content = detail.chat_data[0].msg_content;
                message.id = name + time;

                this.data.messageList.push(message);

                this.setData({
                    messageList: this.data.messageList,
                    scrollToView: message.id,
                });
                break;
            }
            case 'onLogout': {

                wx.navigateBack({
                    complete: function () {
                        wx.showToast({
                            title: '该主播已退出!',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                });
                break;
            }

            case 'onRoomNotExist': {
                wx.showModal({
                    title: '提示',
                    content: '主播已退出!',
                    showCancel: false,
                    success(res) {
                        if (res.confirm || !res.cancel) {
                            wx.navigateBack();
                        }
                    }
                });
                break;
            }
            default: {
                console.log('onRoomEvent default: ', e);
                break;
            }
        }
    },

    showMessage() {
        this.setData({
            isMessageHide: !this.data.isMessageHide
        });
    },

    bindMessageInput(e) {
        this.data.inputMessage = e.detail.value;
    },

    onComment() {
        console.log('>>>[liveroom-room] begin to comment', this.data.inputMessage);

        let message = {
            id: this.data.idName + Date.parse(new Date()),
            name: this.data.idName,
            time: new Date().format("hh:mm:ss"),
            content: this.data.inputMessage,
        };

        this.data.messageList.push(message);
        console.log('>>>[liveroom-room] currentMessage', this.data.inputMessage);

        this.setData({
            messageList: this.data.messageList,
            inputMessage: "",
            scrollToView: message.id,
        });

        this.showMessage();

        this.data.component.sendRoomMsg(1, 1, message.content,
            function (seq, msgId, msg_category, msg_type, msg_content) {
                console.log('>>>[liveroom-room] onComment success');
            }, function (err, seq, msg_category, msg_type, msg_content) {
                console.log('>>>[liveroom-room] onComment, error: ');
                console.log(err);
            }
        );
    },

    canUseMixStream() {
        if (this.data.role === 'audience') {
            console.warn('本示例混流功能只对主播开放，sdk并没有这个限制');
            return false;
        }
        return true;
    },
    mixStream() {
        if (!this.canUseMixStream()) return;

        this.setData({
            mixStreamStart: !this.data.mixStreamStart,
        });

        if (this.data.mixStreamStart) {
            //start mix
            this.updateMixStream();
        } else {
            //stop mix
            this.stopMixStream();
        }
    },
    playMixStream() {
        if (!this.canUseMixStream()) return;

        //未开始混流，不能播放混流
        if(!this.data.playMixStreamStart&&!this.data.mixStreamStart){
            return;
        }

        this.setData({
            playMixStreamStart: !this.data.playMixStreamStart,
        });

        if (this.data.playMixStreamStart) {
            //start play mix
            this.startPlayingMixStream();
        } else {
            //stop play mix
            this.stopPlayingMixStream();
        }
    },


    updateMixStream() {
        let streamList = [{
            streamId: this.data.pushStreamId,
            top: 0,
            left: 0,
          bottom: 320,
          right: 240,
        }];

        this.data.component.updateMixStream({
            outputStreamId: this.data.mixStreamId,
            outputBitrate: 300*1000,
            outputFps: 15,
            outputWidth: 240,
            outputHeight: 320,
            outputBgColor: 0xc8c8c899,
            streamList: streamList
        }, (mixStreamId, mixStreamInfo) => {
            console.log('mixStreamId: ' + mixStreamId);
            console.log('mixStreamInfo: ' + JSON.stringify(mixStreamInfo));
        }, (err, errorInfo) => {
            console.log('err: ' + JSON.stringify(err));
            console.log('errorInfo: ' + JSON.stringify(errorInfo));
        });
    },
    stopMixStream() {
        this.data.component.stopMixStream({
                outputStreamId: this.data.mixStreamId
            },
            () => {
                console.log('stopMixStream suc')
            },
            err => {
                console.log('stopMixStream err', err)
            })
    },
    startPlayingMixStream() {
        this.data.component.startPlayingMixStream(this.data.mixStreamId)
    },
    stopPlayingMixStream() {
        this.data.component.stopPlayingMixStream(this.data.mixStreamId);
    }

};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        idName: '',
        nickName: '',
        pushStreamId: '',
        mixStreamId: '',
        roomID: '',
        pureAudio:false,
        roomName: '',
        preferPlaySourceType: 0,
        token: '',
        role: 1,
        component: null,
        isMessageHide: true,
        messageList: [],
        inputMessage: '',
        scrollToView: '',
        mixStreamStart: false,
        playMixStreamStart: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({roomID, roomName, loginType}) {
        let timestamp = new Date().getTime();
        roomName = roomName ? roomName : '';
        this.setData({
            idName: 'xcxU' + timestamp,
            nickName: 'xcxU' + timestamp,
            pushStreamId: 'xcxS' + timestamp,
            mixStreamId: 'xcxMixS' + timestamp,
            roomID,
            roomName,
            role: loginType,
            preferPlaySourceType: 0,
        });
        wx.setKeepScreenOn({
            keepScreenOn: true
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        // 进入房间，自动登录

        getLoginToken(this.data.idName, appID).then(token => {
            this.setData({
                token,
            });
            this.data.component = this.selectComponent("#liveRoom");
            this.data.component.config({
                appid: appID, // 必填，应用id，由即构提供
                idName: this.data.idName, // 必填，用户自定义id
                nickName: this.data.idName, // 必填，用户自定义昵称
                remoteLogLevel: 2, // 日志上传级别，建议取值不小于 logLevel
                logLevel: 0, // 日志级别，debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100（数字越大，日志越少）
                server: wsServerURL,//,"wss://wssliveroom-demo.zego.im/ws", // 必填，服务器地址，由即构提供
                logUrl: "https://wsslogger-demo.zego.im/httplog", // 选填，log 服务器地址，由即构提供
                audienceCreateRoom: false, // 观众不允许创建房间
                testEnvironment:!!testEnvironment
            });
            this.data.component.start(this.data.token);
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //刷新全局变量
        appID = getApp().globalData.liveAppID;
        tokenURL = getApp().globalData.tokenURL;
        wsServerURL = getApp().globalData.wsServerURL;
        testEnvironment =  getApp().globalData.testEnvironment;
        if (this.data.component && !this.data.component.isConnect()) {
            this.data.component.resume(this.data.token);
        }
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
        this.data.component && this.data.component.stop();
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
        let obj = sharePage({
            roomID: this.data.roomID,
            loginType: 'audience'
        });
        console.log('onShareAppMessage', obj);
        return obj;
    },
    ..._methods
});