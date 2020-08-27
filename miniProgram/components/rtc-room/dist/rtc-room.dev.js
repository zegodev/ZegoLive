"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zegoSdk = require('../../js/jZego-wx-1.5.0.js'); // const zegoSdk = require("miniprogram-zego");


var zego;
var playingList = [];
/***
 * rtc-room组件是将live-pusher,live-player组件和即构sdk结合使用，封装内部整合逻辑的一个组件；默认实现了常用的大部分功能，同时支持sdk自定义扩展；
 * 若有更多功能需求，可以在customFunction对象中添加调用sdk函数(可仿照sample函数)，可以在customFunction对象中listenCallBack函数中注册即构sdk回调
 * **/

var customFunction = {
  listenCallBack: function listenCallBack() {
    var _this = this;

    zego.onStreamUrlUpdate = function (streamId, url, type) {
      console.log(">>>onStreamUrlUpdate, streamId: " + streamId + ', type: ' + (type === 0 ? 'play' : 'publish') + ', url: ' + url);

      _this.onStreamUrlUpdate(streamId, url, type);
    };

    zego.onStreamUpdated = function (type, streamList) {
      _this.onStreamUpdated(type, streamList);
    };

    zego.onPublishStateUpdate = function (type, streamId, error) {
      console.log('onPublishStateUpdate', type, streamId, error);

      _this.triggerEvent('RoomEvent', {
        tag: 'onPublishStateUpdate',
        code: 0,
        detail: {
          type: type,
          streamId: streamId,
          error: error
        }
      });
    };

    zego.onPublishQualityUpdate = function (streamId, streamQuality) {
      _this.triggerEvent('RoomEvent', {
        tag: 'onPublishQualityUpdate',
        code: 0,
        detail: {
          streamId: streamId,
          streamQuality: streamQuality
        }
      });
    };

    zego.onDisconnect = function (error) {
      console.log('onDisconnect');
      _this.data.isConnect = false;
    };

    zego.onPlayStateUpdate = function (type, streamId, error) {
      console.log('onPlayStateUpdate', type, streamId, error);

      _this.triggerEvent('RoomEvent', {
        tag: 'onPlayStateUpdate',
        code: 0,
        detail: {
          type: type,
          streamId: streamId,
          error: error
        }
      });
    };

    zego.onPlayQualityUpdate = function (streamId, streamQuality) {
      _this.triggerEvent('RoomEvent', {
        tag: 'onPlayQualityUpdate',
        code: 0,
        detail: {
          streamId: streamId,
          streamQuality: streamQuality
        }
      });
    };

    zego.onUserStateUpdate = function (roomId, userList) {
      console.log('onUserStateUpdate', roomId, userList);

      _this.triggerEvent('RoomEvent', {
        tag: 'onUserStateUpdate',
        code: 0,
        detail: {
          roomId: roomId,
          userList: userList
        }
      });
    };

    zego.onGetTotalUserList = function (roomId, userList) {
      console.log('onGetTotalUserList', roomId, userList);

      _this.triggerEvent('RoomEvent', {
        tag: 'onGetTotalUserList',
        code: 0,
        detail: {
          roomId: roomId,
          userList: userList
        }
      });
    };

    zego.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
      _this.triggerEvent('RoomEvent', {
        tag: 'onRecvRoomMsg',
        code: 0,
        detail: {
          chat_data: chat_data,
          server_msg_id: server_msg_id,
          ret_msg_id: ret_msg_id
        }
      });
    };
  },
  sample: function sample() {
    console.log('use zego to do some thing');
  }
};
var _data_propoerty = {
  /**
   * 组件的属性列表
   */
  properties: {
    roomid: {
      type: String,
      value: '',
      observer: function observer(newVal, oldVal) {
        this.data.roomID = newVal;
      }
    },
    roomname: {
      type: String,
      value: 'undefined'
    },
    debug: {
      type: Boolean,
      value: false,
      observer: function observer(newVal, oldVal) {
        this.data._debug = newVal;
      }
    },
    template: {
      type: String,
      value: '1v1'
    },
    beauty: {
      type: Number,
      value: 5
    },
    // 对于主播，muted是代表麦克风（音频输入），对于观众muted是耳机音量（音频输出）
    muted: {
      type: Boolean,
      value: false
    },
    pureaudio: {
      type: Boolean,
      value: false
    },
    pushstreamid: {
      type: String,
      value: ''
    }
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
      state: 0 //0 初始 1 成功 2 首屏渲染

    },
    _debug: true,
    isLogin: false,
    isPublish: false,
    isConnect: false,
    //连麦成员信息
    streamList: []
  }
}; //对外开放的接口

var rtcRoomHandler = {
  config: function config(Config) {
    zego = new zegoSdk.ZegoClient();
    zego.config(Config);
    zego.setUserStateUpdate(true);
    this.setData({
      userName: Config.nickName || Config.idName
    });
  },
  start: function start(zegotoken, authorToken) {
    var _this2 = this;

    if (this.checkParam()) {
      var loginSucCallback = function loginSucCallback(streamList) {
        _this2.data.isLogin = true;
        _this2.data.isConnect = true;
        zego.setPreferPublishSourceType(1);

        _this2.doPublish();

        zego.setPreferPlaySourceType(1);

        _this2.doPlay(streamList);
      };

      var loginFailCallback = function loginFailCallback(err) {
        console.error(err);
      };

      if (authorToken) {
        zego.loginWithAuthor(this.data.roomID, 1, zegotoken, authorToken, loginSucCallback, loginFailCallback);
      } else {
        zego.login(this.data.roomID, 1, zegotoken, loginSucCallback, loginFailCallback);
      }
    }
  },
  stop: function stop() {
    playingList.forEach(function (item) {
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
  resume: function resume(token) {
    this.stop();
    this.start(token);
  },
  isConnect: function isConnect() {
    return this.data.isConnect;
  },
  sendCustomCommand: function sendCustomCommand(dstMembers, customContent, success, error) {
    zego.sendCustomCommand(dstMembers, customContent, success, error);
  },
  updateStreamExtraInfo: function updateStreamExtraInfo(extraInfo) {
    if (typeof extraInfo === 'string') {
      zego.updateStreamExtraInfo(this.data.pushstreamid, extraInfo);
    } else {
      console.error('updateStreamExtraInfo param extraInfo must be sting');
    }
  },
  sendRoomMsg: function sendRoomMsg(msg_category, msg_type, msg_content, success, error) {
    zego.sendRoomMsg(msg_category, msg_type, msg_content, success, error);
  },
  switchCamera: function switchCamera() {
    this.data.pusherContext && this.data.pusherContext.switchCamera({
      success: function success() {
        console.log('switchCamera success');
      },
      fail: function fail() {
        console.error('switchCamera success');
      },
      complete: function complete() {
        console.log('switchCamera complete');
      }
    });
  },
  toggleCamera: function toggleCamera() {
    var _this3 = this;

    if (this.data.cameraStatus == 1 || !this.data.pusherContext) {
      console.error('>> can not  toggleCamera....');
      return;
    }

    this.data.cameraStatus = 1;
    this.setData({
      pureaudio: !this.data.pureaudio
    }, function () {
      //这里必须这么写，否则会出现enable-camera不一致
      _this3.data.pusherContext.stop({
        success: function success() {
          _this3.data.pusherContext.start({
            success: function success() {
              _this3.data.cameraStatus = 0;
              console.log('>> toggleCamera: ', _this3.data.pureaudio);
            }
          });
        }
      });
    });
  },
  toggleBeauty: function toggleBeauty() {
    var bty = this.data.beauty == 5 ? 0 : 5;
    this.setData({
      beauty: bty
    }, function () {
      console.log(bty > 0 ? '开启美颜' : '关闭美颜');
    });
  },
  toggleDebug: function toggleDebug() {
    var _this4 = this;

    this.setData({
      debug: !this.data.debug
    }, function () {
      console.log('>> Debug: ', _this4.data.debug);
    });
  },
  toggleMuted: function toggleMuted() {
    var _this5 = this;

    this.setData({
      muted: !this.data.muted
    }, function () {
      console.log('>> Debug: ', _this5.data.muted);
    });
  },
  stopSubPublish: function stopSubPublish() {
    if (this.data.isPublish) {
      zego.stopPublishingStream(this.data.pushstreamid);
      this.setData({
        linkPusherInfo: {},
        liveReq: 0
      });
    }
  },
  getZegoClient: function getZegoClient() {
    if (!zego) console.error('please invoke config first');
    return zego;
  },
  updateMixStream: function updateMixStream(param, suc, err) {
    zego.updateMixStream(param, suc, err);
  },
  stopMixStream: function stopMixStream(param, suc, err) {
    zego.stopMixStream(param, suc, err);
  },
  startPlayingMixStream: function startPlayingMixStream(mixStreamId) {
    zego.startPlayingMixStream(mixStreamId);
  },
  stopPlayingMixStream: function stopPlayingMixStream(mixStreamId) {
    zego.stopPlayingMixStream(mixStreamId); //关闭子主播

    var _streams = this.data.streamList;
    _streams = _streams.filter(function (_sm) {
      return _sm.stream_id !== mixStreamId;
    });
    this.setData({
      streamList: _streams
    });
  }
}; //内部逻辑方法

var _rtcRoomHandler = {
  // 必填参数校验
  checkParam: function checkParam() {
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
  doPublish: function doPublish() {
    this.data.isPublish = true;
    zego.startPublishingStream(this.data.pushstreamid);
  },
  doPlay: function doPlay(streamList) {
    if (streamList.length == 0) return;
    this.setData({
      streamList: streamList
    });
    this.triggerEvent('RoomEvent', {
      tag: 'onStreamUpdate',
      code: 0,
      detail: {
        streamList: streamList
      }
    });
    streamList.forEach(function (stream) {
      if (!playingList.some(function (playItem) {
        return playItem.stream_id === stream.stream_id;
      })) {
        zego.startPlayingStream(stream.stream_id);
        playingList.push(stream);
      }
    });
  }
}; //live-pusher,live-player组件回调

var mediaCallBackHandlers = {
  //拉流监听回调 s
  onMainPlayState: function onMainPlayState(ev) {
    console.log('statePlaychange', ev); //通知sdk

    zego.updatePlayerState(ev.currentTarget.id, ev, 0); //改变拉流状态，变更覆盖图片

    var subStateChange = false,
        playingState;

    if (ev.detail.code === 2002 || ev.detail.code === 2004) {
      playingState = 'success';
    } else if (ev.detail.code === -2301) {
      playingState = 'failed';
    }

    playingState && this.data.streamList.forEach(function (item) {
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
  onMainPlayStatus: function onMainPlayStatus(ev) {
    console.log('netStatusPlayChange', ev);
    zego.updatePlayerNetStatus(ev.currentTarget.id, ev, 0);
  },
  onMainPlayError: function onMainPlayError(ev) {
    console.error(ev);
  },
  //拉流监听回调 e
  //推流监听回调 s
  onMainPushState: function onMainPushState(ev) {
    console.log('statePublishchange', ev);

    if (ev.detail && ev.detail.code === 1007) {
      this.setData({
        mainPusherInfo: _objectSpread({}, this.data.mainPusherInfo, {
          state: 2
        })
      });
    }

    zego.updatePlayerState(this.data.pushstreamid, ev, 1);
  },
  onMainPushStatus: function onMainPushStatus(ev) {
    console.log('netStatusPublishChange', ev);
    zego.updatePlayerNetStatus(this.data.pushstreamid, ev, 1);
  },
  onMainPushError: function onMainPushError(ev) {
    console.error(ev);
  } //推流监听回调 e

}; //即构sdk回调函数

var sdkCallBackHandler = {
  onStreamUrlUpdate: function onStreamUrlUpdate(streamId, url, type) {
    if (type === 0) {
      //拉流地址
      var founded = false;

      var _streams = this.data.streamList.map(function (item) {
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
      }); //混流地址--》作为观众小视频播放


      if (!founded) {
        _streams.push({
          url: url,
          isMixStream: true,
          minCache: 1,
          maxCache: 3,
          stream_id: streamId,
          objectFit: 'contain',
          playingState: 'initial'
        });
      }

      this.setData({
        streamList: _streams
      }, function () {
        var live = wx.createLivePlayerContext(streamId, this);
        live.play();
      });
    } else if (type === 1) {
      //推流地址
      console.log('push url added');
      this.setData({
        mainPusherInfo: _objectSpread({}, this.data.mainPusherInfo, {}, {
          stream_id: streamId,
          url: url,
          mode: 'RTC',
          minBitrate: 150,
          maxBitrate: 300
        })
      }, function () {
        this.data.pusherContext = wx.createLivePusherContext(streamId, this);
        this.data.pusherContext.start();
      });
    }
  },
  onStreamUpdated: function onStreamUpdated(type, streamList) {
    if (type === 0) {
      //add
      this.doPlay([].concat(_toConsumableArray(this.data.streamList), _toConsumableArray(streamList)));
      console.log('pull stream added');
    } else if (type === 1) {
      // delete
      var _streams = _toConsumableArray(this.data.streamList);

      this.data.streamList.forEach(function (item) {
        if (streamList.some(function (playItem) {
          return playItem.stream_id === item.stream_id;
        })) {
          zego.stopPlayingStream(item.stream_id);
          _streams = _streams.filter(function (_sm) {
            return _sm.stream_id !== item.stream_id;
          });
          playingList = playingList.filter(function (playing) {
            return playing.stream_id !== item.stream_id;
          });
        }
      });
      this.setData({
        streamList: _streams
      });
      this.triggerEvent('RoomEvent', {
        tag: 'onStreamUpdate',
        code: 0,
        detail: {
          streamList: this.data.streamList
        }
      });
    }
  }
}; // components/rtc-room/rtc-room.js

Component(_objectSpread({}, _data_propoerty, {
  /**
   * 组件的方法列表
   */
  methods: _objectSpread({}, rtcRoomHandler, {}, _rtcRoomHandler, {}, sdkCallBackHandler, {}, mediaCallBackHandlers, {}, customFunction)
}));