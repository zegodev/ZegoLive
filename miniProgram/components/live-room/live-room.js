const zegoSdk = require('../../js/jZego-wx-1.5.0.js');
// const zegoSdk = require("miniprogram-zego");
let zego;
let playingList = [];

/***
 * liveroom组件是将live-pusher,live-player组件和即构sdk结合使用，封装内部整合逻辑的一个组件；默认实现了常用的大部分功能，同时支持sdk自定义扩展；
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

        zego.onGetAnchorInfo = (anchor_userid, anchro_username) => {
            this.onGetAnchorInfo(anchor_userid, anchro_username);
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

        zego.onRecvJoinLiveRequest = (requestId, from_userid, from_username, roomid) => {
            this.triggerEvent('RoomEvent', {
                tag: 'onRecvJoinLiveRequest',
                code: 0,
                detail: {requestId, from_userid, from_username, roomid}
            });

        };

        zego.onRecvEndJoinLiveCommand = (requestId, from_userid, from_username, roomid) => {
            console.log('onRecvEndJoinLiveCommand', requestId, from_userid, from_username, roomid);

            zego.stopPublishingStream(this.data.pushstreamid);
            this.setData({
                linkPusherInfo: {},
                liveReq: 0
            });

            this.triggerEvent('RoomEvent', {
                tag: 'onRecvEndJoinLiveCommand',
                code: 0,
                detail: {requestId, from_userid, from_username, roomid}
            });
        }

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
        role: {type: String, value: 'audience'},
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
        template: {type: String, value: '1v3'},
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
        isCaster: true,
        userName: '',
        userID: '',
        liveReq: 0,//0 可以连麦 1 连麦请求中 2 连麦成功
        pusherContext: null,
        playerContext: null,
        linkedPlayerContext: null,
        //主播信息
        mainPusherInfo: {
            url: '',
            aspect: '3:4',
            mode: 'HD',
            minBitrate: 600,
            maxBitrate: 1200,
            puserID: '',
        },
        //子主播信息
        linkPusherInfo: {
            url: '',
            aspect: '3:4',
            mode: 'RTC',
            minBitrate: 150,
            maxBitrate: 300,
            puserID: '',
        },
        mode: 'SD',
        _debug: true,
        isLogin: false,
        isPublish: false,
        isConnect: false,
        //连麦成员信息
        streamList: []
    },
};


//对外开放的接口
let liveRoomHandler = {
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

                this.data.isCaster && zego.setPreferPublishSourceType(1);
                this.data.isCaster && this.doPublish();

                if (!this.data.isCaster && streamList.length == 0) {
                    // console.error('主播已退出')
                    //通知使用组件页面
                    this.triggerEvent('RoomEvent', {
                        tag: 'onRoomNotExist',
                        code: 0,
                        detail: {}
                    });
                } else {
                    zego.setPreferPlaySourceType(0);
                    this.doPlay(streamList);
                }
            };

            let loginFailCallback = (err) => {
                if (!this.data.isCaster) {
                    // console.error('主播已退出')
                    //通知使用组件页面
                    this.triggerEvent('RoomEvent', {
                        tag: 'onRoomNotExist',
                        code: 0,
                        detail: {}
                    });
                } else {
                    console.error(err);
                }
            };

            if (authorToken) {
                zego.loginWithAuthor(this.data.roomID, this.data.isCaster ? 1 : 2,
                    zegotoken, authorToken, loginSucCallback, loginFailCallback);
            } else {
                zego.login(this.data.roomID, this.data.isCaster ? 1 : 2, zegotoken, loginSucCallback, loginFailCallback)
            }


        }
    },
    resume(token) {
        this.stop();
        this.start(token);
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
            liveReq: 0,
            streamList: [],
            mainPusherInfo: {},
            linkPusherInfo: {}
        });
    },
    isConnect() {
        return this.data.isConnect;
    },
    respondJoinLive(requestId, isgree) {

        //首次收到连麦，并且同意，若此时不是RTC模式则切换为RTC模式
        if (isgree && this.data.mainPusherInfo.mode != 'RTC') {
            this.setData({
                mainPusherInfo: {
                    ...this.data.mainPusherInfo,
                    ...{
                        mode: 'RTC',
                        minBitrate: 200,
                        maxBitrate: 1000
                    }
                }
            }, function () {
                //mode 改变需要重新停止再推流
                if (this.data.pusherContext) {
                    this.data.pusherContext.stop();
                    this.data.pusherContext.start();
                }
            });
        }

        zego.respondJoinLive(requestId, isgree,
            seq => {
                console.log('respondJoinLive suc', seq);
            },
            (err, seq) => {
                console.log('respondJoinLive err', err, seq);
            }
        );
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
    getZegoClient() {
        if (!zego) console.error('please invoke config first');
        return zego;
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

    requestJionPusher() {

        if (this.data.liveReq !== 0) return;

        this.setData({
            liveReq: 1
        });
        zego.requestJoinLive(
            this.data.mainPusherInfo.puserID,
            (seq) => {
                console.log('requestJoinLive suc', seq)
            },
            (err, seq) => {
                console.error('requestJoinLive err', err, seq)
            },
            (result, fromUserId, fromUserName) => {
                console.log('requestJoinLive response', result, fromUserId, fromUserName);
                wx.showToast({
                    title: result ? '同意连麦' : '拒绝连麦',
                    duration: 4500
                });
                if (result) {
                    this.setData({
                        liveReq: 2
                    });
                    zego.setPreferPublishSourceType(1);
                    this.doPublish();
                } else {
                    this.setData({
                        liveReq: 0
                    });
                }
            });
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
    kickoutSubPusher(ev) {
        zego.endJoinLive(
            ev.target.dataset.userid,
            (seq) => {
                console.log('kickoutSubPusher suc', seq);
            },
            (err, seq) => {
                console.err('kickoutSubPusher err', err, seq);
            }
        );
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
let _liveRoomHandler = {
    // 必填参数校验
    checkParam() {
        if (!zego) {
            console.error('please invoke config first');
            return false;
        } else if (!this.data.pushstreamid && this.data.role !== 'audience') {
            console.error('pushstreamid input empty');
            return false;
        }

        this.setData({
            isCaster: this.data.role !== 'audience',
        });
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
        this.triggerEvent('RoomEvent', {
            tag: 'onStreamUpdate',
            code: 0,
            detail: {streamList}
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
        } else if (this.data.mainPusherInfo.stream_id == ev.currentTarget.id) {
            this.setData({
                mainPusherInfo: {
                    ...this.data.mainPusherInfo,
                    playingState
                }
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
            let founded = false, isHost = false;

            const _streams = this.data.streamList.map(item => {
                if (item.stream_id === streamId) {
                    item.url = url;
                    item.isMixStream = false;
                    item.userID = item.anchor_id_name;
                    item.minCache = 1;
                    item.maxCache = 3;
                    item.objectFit = 'contain';
                    item.userName = item.anchor_nick_name || item.anchor_id_name;
                    item.playingState = 'initial';
                    founded = true;
                }

                if (item.userID == this.data.mainPusherInfo.puserID) {
                    isHost = true;
                }
                return item;
            });
            if (streamId == this.data.mainPusherInfo.stream_id) {
                isHost = true;
            }


            // 挑出主播信息，大屏幕播放
            let userName;
            let streamList = _streams.filter(item => {
                if (item.userID != this.data.mainPusherInfo.puserID) {
                    return true;
                } else {
                    userName = item.anchor_nick_name || item.anchor_id_name;
                    return false;
                }
            });


            //混流地址--》作为观众小视频播放
            if (!founded &&this.data.mainPusherInfo.stream_id !== streamId) {
                streamList.push({
                    url,
                    isMixStream: true,
                    minCache: 1,
                    maxCache: 3,
                    stream_id: streamId,
                    objectFit: 'contain',
                    playingState: 'initial'
                });
            }

            //播放的不是主播
            if (!isHost) {
                //主播已经在播放，修改主播的node
                if (this.data.mainPusherInfo.url && this.data.mainPusherInfo.mode != 'RTC') {
                    this.setData({
                        streamList: streamList,
                        mainPusherInfo: {
                            ...this.data.mainPusherInfo,
                            ...{
                                mode: 'RTC',
                            }
                        }
                    }, function () {
                        const live = wx.createLivePlayerContext(streamId, this);
                        live.play();

                        //改变推流mode 停止再次播放
                        if (this.data.playerContext) {
                            this.data.playerContext.stop();
                            this.data.playerContext.play();
                        } else if (this.data.pusherContext) {
                            this.data.pusherContext.stop();
                            this.data.pusherContext.start();
                        }


                    });
                } else {
                    //主播未开始播放
                    this.setData({
                        streamList: streamList,
                    }, function () {
                        const live = wx.createLivePlayerContext(streamId, this);
                        live.play();
                    });
                }

            } else {//播放的是主播
                this.setData({
                    streamList: streamList,
                    mainPusherInfo: {
                        ...this.data.mainPusherInfo,
                        ...{
                            url: url,
                            stream_id: streamId,
                            mode: (streamList.length > 0 || this.data.linkPusherInfo.url) ? 'RTC' : 'live',
                            minCache: 1,
                            maxCache: 3,
                            objectFit: 'contain',
                            playingState: 'initial',
                            userName
                        }
                    },
                }, function () {
                    this.data.playerContext = wx.createLivePlayerContext(streamId, this);
                    this.data.playerContext.play();
                });
            }

        } else if (type === 1) {//推流地址
            console.log('push url added');
            var self = this;

            if (this.data.isCaster) {
                self.setData({
                    mainPusherInfo: {
                        ...this.data.mainPusherInfo,
                        ...{
                            stream_id: streamId,
                            url: url,
                            mode: 'HD',
                            minBitrate: 600,
                            maxBitrate: 1200

                        }
                    },
                }, function () {
                    this.data.pusherContext = wx.createLivePusherContext(streamId, this);
                    this.data.pusherContext.start();
                });
            } else {
                self.setData({
                    linkPusherInfo: {
                        ...this.data.linkPusherInfo,
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

        }
    },
    onStreamUpdated(type, streamList) {
        if (type === 0) { //add
            this.doPlay([...this.data.streamList, ...streamList]);
            console.log('pull stream added');
        } else if (type === 1) { // delete
            let _streams = [...this.data.streamList];

            //关闭子主播
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

            this.triggerEvent('RoomEvent', {
                tag: 'onStreamUpdate',
                code: 0,
                detail: {streamList: this.data.streamList}
            });
            //关闭主播，此时房间没有主播，则所有房间人员都强制退出
            if (streamList.some(playItem => playItem.stream_id === this.data.mainPusherInfo.stream_id)) {

                playingList = playingList.filter(playing => playing.stream_id !== this.data.mainPusherInfo.stream_id);
                zego.stopPlayingStream(this.data.mainPusherInfo.stream_id);

                //通知使用组件页面
                this.triggerEvent('RoomEvent', {
                    tag: 'onLogout',
                    code: 0,
                    detail: {}
                });
                this.stop();
            }

        }
    },
    onGetAnchorInfo(anchor_userid, anchro_username) {
        console.log('onGetAnchorInfo', anchor_userid, anchro_username);
        this.setData({
            mainPusherInfo: {
                ...this.data.mainPusherInfo,
                ...{
                    puserID: anchor_userid
                }
            },

        })
    }
};


// components/live-room/live-room.js
Component({
    ..._data_propoerty,

    /**
     * 组件的方法列表
     */
    methods: {
        ...liveRoomHandler,
        ..._liveRoomHandler,
        ...sdkCallBackHandler,
        ...mediaCallBackHandlers,
        ...customFunction
    }
});
