// const zegoSdk = require('../../js/jZego-wx-1.1.2-V2.js');
const zegoSdk = require("miniprogram-zego");

let zego;
let playingList = [];

/***
 * rtc-room组件是将live-pusher,live-player组件和即构sdk结合使用，封装内部整合逻辑的一个组件；默认实现了常用的大部分功能，同时支持sdk自定义扩展；
 * 若有更多功能需求，可以在customFunction对象中添加调用sdk函数(可仿照sample函数)，可以在customFunction对象中listenCallBack函数中注册即构sdk回调
 * **/
let customFunction = {
    listenCallBack() {
        zego.onStreamUrlUpdate = (streamId, url, type) => {
            this.onStreamUrlUpdate(streamId, url, type);
        };
        zego.onStreamUpdated = (type, streamList) => {
            this.onStreamUpdated(type, streamList);
        };

        zego.onPublishStateUpdate = (type, streamId, error) => {
            console.log('onPublishStateUpdate', type, streamId, error);
            this.triggerEvent('RoomEvent', {
                tag: 'onPublishStateUpdate',
                code: 0,
                detail: {type, streamId, error}
            });
        };
        zego.onPublishQualityUpdate = (streamId, streamQuality) => {
            this.triggerEvent('RoomEvent', {
                tag: 'onPublishQualityUpdate',
                code: 0,
                detail: {streamId, streamQuality}
            });
        };

        zego.onDisconnect = (error) => {
            console.log('onDisconnect')
            this.data.isConnect = false;
        };
        zego.onPlayStateUpdate = (type, streamId, error) => {
            console.log('onPlayStateUpdate', type, streamId, error);
            this.triggerEvent('RoomEvent', {
                tag: 'onPlayStateUpdate',
                code: 0,
                detail: {type, streamId, error}
            });
        };
        zego.onPlayQualityUpdate = (streamId, streamQuality) => {
            this.triggerEvent('RoomEvent', {
                tag: 'onPlayQualityUpdate',
                code: 0,
                detail: {streamId, streamQuality}
            });
        };


        zego.onUserStateUpdate = (roomId, userList) => {
            console.log('onUserStateUpdate', roomId, userList);
            this.triggerEvent('RoomEvent', {
                tag: 'onUserStateUpdate',
                code: 0,
                detail: {roomId, userList}
            });
        };
        zego.onGetTotalUserList = (roomId, userList) => {
            console.log('onGetTotalUserList', roomId, userList);
            this.triggerEvent('RoomEvent', {
                tag: 'onGetTotalUserList',
                code: 0,
                detail: {roomId, userList}
            });
        };


        zego.onRecvRoomMsg = (chat_data, server_msg_id, ret_msg_id) => {
            this.triggerEvent('RoomEvent', {
                tag: 'onRecvRoomMsg',
                code: 0,
                detail: {chat_data, server_msg_id, ret_msg_id}
            });
        };

    },
    sample() {
        console.log('use zego to do some thing');
    }
};


let _data_propoerty = {
    /**
     * 组件的属性列表
     */
    properties: {
        roomid: {
            type: String, value: '', observer: function (newVal, oldVal) {
                this.data.roomID = newVal;
            }
        },
        roomname: {type: String, value: 'undefined'},
        debug: {
            type: Boolean, value: false, observer: function (newVal, oldVal) {
                this.data._debug = newVal;
            }
        },
        template: {type: String, value: '1v1'},
        beauty: {type: Number, value: 5},
        // 对于主播，muted是代表麦克风（音频输入），对于观众muted是耳机音量（音频输出）
        muted: {type: Boolean, value: false},
        pureaudio: {type: Boolean, value: false},
        pushstreamid: {type: String, value: ''},
    },

    /**
     * 组件的初始数据
     */
    data: {
        cameraStatus: 0,
        userName: '',
        userID: '',
        pusherContext: null,
        playerContext: null,
        //主播信息
        mainPusherInfo: {
            url: '',
            aspect: '3:4',
            mode: 'HD',
            minBitrate: 600,
            maxBitrate: 1200,
            puserID: '',
            state: 0,//0 初始 1 成功 2 首屏渲染
        },
        _debug: true,
        isLogin: false,
        isPublish: false,
        isConnect: false,
        //连麦成员信息
        streamList: []
    },
};


//对外开放的接口
let rtcRoomHandler = {
    config(Config) {
        zego = new zegoSdk.ZegoClient();
        zego.config(Config);
        zego.setUserStateUpdate(true);
        this.setData({
            userName: Config.nickName || Config.idName
        })
    },
    start(zegotoken, authorToken) {

        if (this.checkParam()) {

            let loginSucCallback = (streamList) => {
                this.data.isLogin = true;
                this.data.isConnect = true;
                zego.setPreferPublishSourceType(1);
                this.doPublish();


                zego.setPreferPlaySourceType(1);
                this.doPlay(streamList);
            };

            let loginFailCallback = (err) => {
                console.error(err);
            };

            if (authorToken) {
                zego.loginWithAuthor(this.data.roomID, 1, zegotoken, authorToken, loginSucCallback, loginFailCallback);
            } else {
                zego.login(this.data.roomID, 1, zegotoken, loginSucCallback, loginFailCallback);
            }


        }
    },
    stop() {
        playingList.forEach(item => {
            zego.stopPlayingStream(item.stream_id);
        });
        playingList = [];

        this.data.isPublish && zego.stopPublishingStream(this.data.pushstreamid);
        this.data.isLogin && zego.logout();


        this.setData({
            isLogin: false,
            isPublish: false,
            streamList: [],
            mainPusherInfo: {}
        });
    },
    resume(token) {
        this.stop();
        this.start(token);
    },
    isConnect() {
        return this.data.isConnect;
    },
    sendCustomCommand(dstMembers, customContent, success, error) {
        zego.sendCustomCommand(dstMembers, customContent, success, error);
    },
    updateStreamExtraInfo(extraInfo) {
        if (typeof extraInfo === 'string') {
            zego.updateStreamExtraInfo(this.data.pushstreamid, extraInfo);
        } else {
            console.error('updateStreamExtraInfo param extraInfo must be sting');
        }
    },
    sendRoomMsg(msg_category, msg_type, msg_content, success, error) {
        zego.sendRoomMsg(msg_category, msg_type, msg_content, success, error);
    },
    switchCamera() {
        this.data.pusherContext && this.data.pusherContext.switchCamera({
            success: () => {
                console.log('switchCamera success');
            },
            fail: () => {
                console.error('switchCamera success');
            },
            complete: () => {
                console.log('switchCamera complete');
            }
        });
    },
    toggleCamera() {
        if (this.data.cameraStatus == 1 || !this.data.pusherContext) {
            console.error('>> can not  toggleCamera....');
            return;
        }
        this.data.cameraStatus = 1;

        this.setData({
            pureaudio: !this.data.pureaudio
        }, () => {
            //这里必须这么写，否则会出现enable-camera不一致
            this.data.pusherContext.stop({
                success: () => {
                    this.data.pusherContext.start({
                        success: () => {
                            this.data.cameraStatus = 0;
                            console.log('>> toggleCamera: ', this.data.pureaudio);
                        }
                    });
                }
            });
        });
    },
    toggleBeauty() {
        let bty = this.data.beauty == 5 ? 0 : 5;
        this.setData({
            beauty: bty
        }, () => {
            console.log(bty > 0 ? '开启美颜' : '关闭美颜')
        })
    },
    toggleDebug() {
        this.setData({
            debug: !this.data.debug
        }, () => {
            console.log('>> Debug: ', this.data.debug);
        })
    },
    toggleMuted() {
        this.setData({
            muted: !this.data.muted
        }, () => {
            console.log('>> Debug: ', this.data.muted);
        })
    },

    stopSubPublish() {
        if (this.data.isPublish) {
            zego.stopPublishingStream(this.data.pushstreamid);
            this.setData({
                linkPusherInfo: {},
                liveReq: 0
            })
        }
    },
    getZegoClient() {
        if (!zego) console.error('please invoke config first');
        return zego;
    },
    updateMixStream(param,suc,err) {
        zego.updateMixStream(param,suc,err);
    },
    stopMixStream(param,suc,err) {
        zego.stopMixStream(param,suc,err);
    },
    startPlayingMixStream(mixStreamId) {
        zego.startPlayingMixStream(mixStreamId);
    },
    stopPlayingMixStream(mixStreamId) {
        zego.stopPlayingMixStream(mixStreamId);

        //关闭子主播
        let _streams = this.data.streamList;
        _streams = _streams.filter(_sm => _sm.stream_id !== mixStreamId);
        this.setData({
            streamList: _streams
        });
    },
};


//内部逻辑方法
let _rtcRoomHandler = {
    // 必填参数校验
    checkParam() {
        if (!zego) {
            console.error('please invoke config first');
            return false;
        } else if (!this.data.pushstreamid && this.data.role !== 'audience') {
            console.error('pushstreamid input empty');
            return false;
        }

        this.listenCallBack();
        return true;
    },
    doPublish() {
        this.data.isPublish = true;
        zego.startPublishingStream(this.data.pushstreamid);
    },

    doPlay(streamList) {
        if (streamList.length == 0) return;

        this.setData({
            streamList
        });
        streamList.forEach(stream => {
            if (!playingList.some(playItem => playItem.stream_id === stream.stream_id)) {

                zego.startPlayingStream(stream.stream_id);

                playingList.push(stream);
            }
        });
    },
};


//live-pusher,live-player组件回调
let mediaCallBackHandlers = {
    //拉流监听回调 s
    onMainPlayState: function (ev) {
        console.log('statePlaychange', ev);

        //通知sdk
        zego.updatePlayerState(ev.currentTarget.id, ev, 0);


        //改变拉流状态，变更覆盖图片
        let subStateChange = false, playingState;

        if (ev.detail.code === 2002 || ev.detail.code === 2004) {
            playingState = 'success';

        } else if (ev.detail.code === -2301) {
            playingState = 'failed';
        }

        playingState && this.data.streamList.forEach(item => {
            if (item.stream_id === ev.currentTarget.id) {
                subStateChange = true;
                item.playingState = playingState;
            }
        });

        if (subStateChange) {
            this.setData({
                streamList: this.data.streamList
            });
        }


    },
    onMainPlayStatus: function (ev) {
        console.log('netStatusPlayChange', ev);
        zego.updatePlayerNetStatus(ev.currentTarget.id, ev, 0);
    },
    onMainPlayError: function (ev) {
        console.error(ev);
    },
    //拉流监听回调 e

    //推流监听回调 s
    onMainPushState: function (ev) {
        console.log('statePublishchange', ev);
        if (ev.detail && ev.detail.code === 1007) {
            this.setData({
                mainPusherInfo: {
                    ...this.data.mainPusherInfo,
                    state: 2
                }
            });
        }
        zego.updatePlayerState(this.data.pushstreamid, ev, 1);
    },
    onMainPushStatus: function (ev) {
        console.log('netStatusPublishChange', ev);
        zego.updatePlayerNetStatus(this.data.pushstreamid, ev, 1);
    },
    onMainPushError: function (ev) {
        console.error(ev);
    }
    //推流监听回调 e
};

//即构sdk回调函数
let sdkCallBackHandler = {
    onStreamUrlUpdate(streamId, url, type) {
        if (type === 0) { //拉流地址
            let founded = false;

            const _streams = this.data.streamList.map(item => {
                if (item.stream_id === streamId) {
                    item.url = url;
                    item.userID = item.anchor_id_name;
                    item.minCache = 1;
                    item.maxCache = 3;
                    item.objectFit = 'contain';
                    item.userName = item.anchor_nick_name || item.anchor_id_name;
                    item.playingState = 'initial';
                    founded = true;
                }
                return item;
            });


            //混流地址--》作为观众小视频播放
            if (!founded) {
                _streams.push({
                    url,
                    isMixStream: true,
                    minCache: 1,
                    maxCache: 3,
                    stream_id: streamId,
                    objectFit: 'contain',
                    playingState: 'initial'
                });
            }

            this.setData({
                streamList: _streams,
            }, function () {
                const live = wx.createLivePlayerContext(streamId, this);
                live.play();
            });

        } else if (type === 1) {//推流地址
            console.log('push url added');
            this.setData({
                mainPusherInfo: {
                    ...this.data.mainPusherInfo,
                    ...{
                        stream_id: streamId,
                        url: url,
                        mode: 'RTC',
                        minBitrate: 150,
                        maxBitrate: 300
                    }
                },
            }, function () {
                this.data.pusherContext = wx.createLivePusherContext(streamId, this);
                this.data.pusherContext.start();
            });
        }

    },
    onStreamUpdated(type, streamList) {
        if (type === 0) { //add
            this.doPlay([...this.data.streamList, ...streamList]);
            console.log('pull stream added');
        } else if (type === 1) { // delete
            let _streams = [...this.data.streamList];

            this.data.streamList.forEach((item) => {
                if (streamList.some(playItem => playItem.stream_id === item.stream_id)) {

                    zego.stopPlayingStream(item.stream_id);

                    _streams = _streams.filter(_sm => _sm.stream_id !== item.stream_id);
                    playingList = playingList.filter(playing => playing.stream_id !== item.stream_id);
                }

            });
            this.setData({
                streamList: _streams
            });
        }
    }
};


// components/rtc-room/rtc-room.js
Component({
    ..._data_propoerty,

    /**
     * 组件的方法列表
     */
    methods: {
        ...rtcRoomHandler,
        ..._rtcRoomHandler,
        ...sdkCallBackHandler,
        ...mediaCallBackHandlers,
        ...customFunction
    }
});
