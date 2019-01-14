(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sdk/wechatMini/zego.client.wechat.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./sdk/common/ZegoStreamCenter.ts":
/*!****************************************!*\
  !*** ./sdk/common/ZegoStreamCenter.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ZegoStreamCenter = /** @class */ (function () {
    function ZegoStreamCenter(log, stateCenter) {
        this.playerList = {};
        this.publisherList = {};
    }
    ZegoStreamCenter.prototype.setSessionInfo = function (appid, userid, token, testEnvironment) {
    };
    ;
    return ZegoStreamCenter;
}());
exports.ZegoStreamCenter = ZegoStreamCenter;


/***/ }),

/***/ "./sdk/common/clientBase/common.ts":
/*!*****************************************!*\
  !*** ./sdk/common/clientBase/common.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var Common = /** @class */ (function () {
    function Common() {
    }
    //播放拉流状态变化回掉
    Common.prototype.onPlayStateUpdateHandle = function (type, streamid, error) {
        if (type == 1) {
            this.stopPlayingStream(streamid);
        }
        this.onPlayStateUpdate(type, streamid, error);
    };
    ;
    //type: { start: 0, stop: 1}
    Common.prototype.onPublishStateUpdateHandle = function (type, streamid, error) {
        var _this = this;
        if (type == 0) {
            //start publish
            if (this.stateCenter.publishStreamList[streamid]) {
                if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.tryPublish) {
                    this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info;
                    this.streamHandler.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[streamid].extra_info, function (err) {
                        if (_this.stateCenter.publishStreamList[streamid] && _this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                            _this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.stop;
                            _this.onPublishStateUpdate(1, streamid, err);
                            _this.streamCenter.stopPlayingStream(streamid);
                        }
                    });
                }
                else {
                    this.WebrtcOnPublishStateUpdateHandle(type, streamid, error);
                }
                //当前状态为publishing时，如果小程序继续回调相同的开始推流状态码，不应该再返回推流成功的回调
                // else if (this.stateCenter.publishStreamList[streamid].state == ENUM_PUBLISH_STREAM_STATE.publishing) {
                //     this.onPublishStateUpdate(type, streamid, error);
                // }
            }
        }
        else {
            this.onPublishStateUpdate(type, streamid, error);
            if (type == 1) {
                this.stopPublishingStream(streamid);
            }
        }
    };
    ;
    //重置流
    Common.prototype.resetStreamCenter = function () {
        this.stateCenter.customUrl && (this.stateCenter.customUrl = null);
        this.streamCenter.reset();
        if (!this.socketCenter.isDisConnect()) {
            //send stream delete info
            for (var streamid in this.stateCenter.publishStreamList) {
                if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing) {
                    this.streamHandler.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd, this.stateCenter.publishStreamList[streamid].extra_info);
                }
            }
        }
    };
    /*
    *    "zb.cm.hfwur": "ZegoClient.base.Common.handleFetchWebRtcUrlRsp",
    */
    Common.prototype.handleFetchWebRtcUrlRsp = function (msg) {
        var streamId = msg.body.stream_id;
        if (msg.body.ptype === "push") {
            if (this.stateCenter.publishStreamList[streamId]) {
                this.streamCenter.startPublishingStream(streamId, msg.body.urls);
            }
            else {
                this.logger.error("cb.cm.hfwur no streamid to publish");
            }
        }
        else if (msg.body.ptype == "pull") {
            //check streamid exist
            var found = false;
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
                if (this.stateCenter.streamList[i].stream_id === streamId) {
                    // 根据传入的流id判断当前的流列表中是否存在该流
                    found = true;
                    break;
                }
            }
            if (found == false) {
                this.logger.warn("cb.cm.hfwur cannot find stream, continue to play");
                // return;
            }
            this.streamCenter.startPlayingStream(streamId, msg.body.urls);
        }
    };
    return Common;
}());
exports.Common = Common;


/***/ }),

/***/ "./sdk/common/clientBase/heartBeatHandler.ts":
/*!***************************************************!*\
  !*** ./sdk/common/clientBase/heartBeatHandler.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var MAX_TRY_HEARTBEAT_COUNT = 3; //最大心跳尝试次数
var HeartBeatHandler = /** @class */ (function () {
    function HeartBeatHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    HeartBeatHandler.prototype.resetHeartbeat = function () {
        this.logger.debug("zb.hb.rht call");
        clearTimeout(this.stateCenter.heartbeatTimer);
        this.stateCenter.heartbeatTimer = null;
        this.stateCenter.tryHeartbeatCount = 0;
        this.logger.debug("zb.hb.rht call success");
    };
    //空实现 ，logincenter覆盖
    HeartBeatHandler.prototype.hbLogout = function (err) {
    };
    HeartBeatHandler.prototype.start = function (heartbeatInterval) {
        var _this = this;
        this.logger.debug("zb.hb.sht call");
        // 若当前不是处于login登录状态，则返回不做心跳
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.hb.sht state error");
            return;
        }
        // 若尝试心跳次数大于最大尝试次数，则置为登出状态，清除状态数据
        if (++this.stateCenter.tryHeartbeatCount > MAX_TRY_HEARTBEAT_COUNT) {
            this.logger.error("zb.hb.sht come to try limit");
            this.hbLogout(zego_entity_1.sdkErrorList.HEARTBEAT_TIMEOUT);
            return;
        }
        // 发送消息
        this.logger.debug("zb.hb.sht send packet");
        var bodyData = {
            "reserve": 0
        };
        this.socketCenter.registerRouter('hb', function (msg) {
            _this.handleHeartbeatRsp(msg);
        });
        this.socketCenter.sendMessage('hb', bodyData);
        this.logger.debug("zb.hb.sht call success");
        this.stateCenter.heartbeatInterval = heartbeatInterval;
        // heartbeatInterval后再发
        this.stateCenter.heartbeatTimer = setTimeout(function () {
            _this.start(_this.stateCenter.heartbeatInterval);
        }, this.stateCenter.heartbeatInterval);
    };
    /*
    *    "hhbr.0": "ZegoClient.handleHeartbeatRsp",
    */
    HeartBeatHandler.prototype.handleHeartbeatRsp = function (msg) {
        this.logger.debug("zb.hb.hhbr call");
        if (msg.body.err_code !== 0) {
            this.logger.error("zb.hb.hhbr call disconnect, server error=", msg.body.err_code);
            this.hbLogout(client_util_1.ClientUtil.getServerError(msg.body.err_code));
            return;
        }
        //reset heartbeat fail count
        this.stateCenter.tryHeartbeatCount = 0;
        this.stateCenter.heartbeatInterval = msg.body.hearbeat_interval;
        if (this.stateCenter.heartbeatInterval < zego_entity_1.MINIUM_HEARTBEAT_INTERVAL) {
            this.stateCenter.heartbeatInterval = zego_entity_1.MINIUM_HEARTBEAT_INTERVAL;
        }
        //update timewindow
        if (msg.body.bigim_time_window && typeof msg.body.bigim_time_window == "number") {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window && typeof msg.body.dati_time_window == "number") {
            this.stateCenter.datiTimeWindow = msg.body.dati_time_window;
        }
        this.ReliableMessageHandler(msg);
        //update stream if diff/
        this.fetchStreamList(msg);
        //update user if diff
        if (msg.body.server_user_seq !== this.stateCenter.userSeq && this.stateCenter.userStateUpdate) {
            this.logger.info("zb.hb.hhbr call update user " + msg.body.server_user_seq, this.stateCenter.userSeq);
            this.fetchUserList();
        }
        //try updating stream info again
        for (var streamid in this.stateCenter.publishStreamList) {
            if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.logger.info("zb.hb.hhbr try to update stream info");
                this.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[streamid].extra_info);
            }
        }
        //get online count
        if (msg.body.online_count != undefined && msg.body.online_count != 0) {
            this.onUpdateOnlineCount(this.stateCenter.roomid, msg.body.online_count);
        }
        this.logger.debug("zb.hb.hhbr call success");
    };
    HeartBeatHandler.prototype.ReliableMessageHandler = function (msg) {
        //check trans seq
        if (msg.body.trans_seqs) {
            for (var i = 0; i < msg.body.trans_seqs.length; i++) {
                var type = msg.body.trans_seqs[i].trans_type;
                var seq = msg.body.trans_seqs[i].trans_seq;
                if (!this.stateCenter.transSeqMap[type] || this.stateCenter.transSeqMap[type].seq !== seq) {
                    //fetch trans
                    var oldSeq = 0;
                    if (!this.stateCenter.transSeqMap[type]) {
                        oldSeq = 0;
                        this.logger.debug("zb.hb.rmh type " + type + " server seq " + seq);
                    }
                    else {
                        oldSeq = this.stateCenter.transSeqMap[type].seq;
                        this.logger.debug("zb.hb.rmh type " + type + " old seq " + this.stateCenter.transSeqMap[type].seq + " server seq " + seq);
                    }
                    this.fetchReliableMessage(type, oldSeq);
                }
            }
        }
    };
    /*
     *    "frm.0": "ZegoClient.fetchReliableMessage",拉取可靠业务广播
     */
    HeartBeatHandler.prototype.fetchReliableMessage = function (type, localSeq) {
        var _this = this;
        this.logger.debug("zb.hb.frm call");
        var data = {
            "trans_type": type,
            "trans_local_seq": localSeq
        };
        this.socketCenter.registerRouter('trans_fetch', function (msg) {
            _this.handleFetchTransRsp(msg);
        });
        this.socketCenter.sendMessage("trans_fetch", data);
        this.logger.debug("zb.hb.frm call success");
    };
    //fetch trans 回包
    HeartBeatHandler.prototype.handleFetchTransRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.hb.hftr not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error("zb.hb.hftr trans send error " + msg.body.err_code);
            return;
        }
        var type = msg.body.trans_type;
        var seq = msg.body.trans_seq;
        this.stateCenter.transSeqMap[type] = {
            seq: seq
        };
        if (msg.body.trans_user_idname != this.stateCenter.idName) {
            this.onRecvReliableMessage(type, seq, msg.body.trans_data);
        }
        this.logger.debug("zb.hb.hftr trans " + type + " seq " + seq);
    };
    /*
     *    "fsl.0": "ZegoClient.fetchStreamList",拉取服务端流信息
     */
    HeartBeatHandler.prototype.fetchStreamList = function (msg) {
        var _this = this;
        //update stream if diff/
        if (msg.body.stream_seq === this.stateCenter.streamSeq)
            return;
        this.logger.debug("zb.hb.fsl current seq " + this.stateCenter.streamSeq + " server Seq " + msg.body.stream_seq);
        this.logger.debug("zb.hb.fsl call");
        // 不是处于登录状态，不让拉流
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.hb.fsl state error");
            return;
        }
        // 是否正处于拉流状态 false 为完成， true为正在拉流
        if (this.stateCenter.streamQuerying) {
            this.logger.warn("zb.hb.fsl already doing");
            return;
        }
        this.stateCenter.streamQuerying = true;
        this.logger.debug("zb.hb.fsl send fetch request");
        // 发送消息
        this.socketCenter.registerRouter('stream_info', function (msg) {
            _this.handleFetchStreamListRsp(msg);
        });
        this.socketCenter.sendMessage('stream_info', {
            "reserve": 0
        });
        this.logger.debug("zb.hb.fsl call success");
    };
    //空实现 被覆盖
    HeartBeatHandler.prototype.handleFetchStreamListRsp = function (msg) {
    };
    //空实现 被覆盖
    HeartBeatHandler.prototype.fetchUserList = function () {
    };
    //流更新信令  退出上次推的自己的流
    HeartBeatHandler.prototype.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
        if (stream_extra_info === void 0) { stream_extra_info = ''; }
    };
    //空实现 被sdk覆盖
    HeartBeatHandler.prototype.onUpdateOnlineCount = function (roomId, userCount) {
    };
    //空实现 被sdk覆盖了
    HeartBeatHandler.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    HeartBeatHandler.prototype.resetCheckMessage = function () {
        this.logger.debug("zb.hb.rcm call");
        clearTimeout(this.stateCenter.sendDataCheckTimer);
        this.stateCenter.sendDataCheckTimer = null;
        this.checkSendMessageList(this.stateCenter.sendDataList);
        this.checkSendMessageList(this.stateCenter.sendCommandList);
        this.stateCenter.sendDataMap = {};
        this.stateCenter.sendCommandMap = {};
        this.logger.debug("zb.hb.rcm call success");
    };
    HeartBeatHandler.prototype.checkSendMessageList = function (messageList) {
        var head = messageList.getFirst();
        while (head != null) {
            messageList.remove(head);
            if (head._data.error) {
                if (head._data.data.body.custom_msg) {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq, head._data.data.body.custom_msg);
                }
                else {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq);
                }
            }
            head = messageList.getFirst();
        }
    };
    HeartBeatHandler.prototype.checkMessageListTimeout = function (messageList, messageMap) {
        var head = messageList.getFirst();
        var timestamp = Date.parse(new Date() + '');
        var checkCount = 0;
        var timeoutMsgCount = 0;
        var dropMsgCount = 0;
        while (head != null) {
            if ((head._data.time + this.stateCenter.sendDataTimeout) > timestamp) {
                break;
            }
            delete messageMap[head._data.data.header.seq];
            messageList.remove(head);
            ++timeoutMsgCount;
            if (head._data.error == null || (this.stateCenter.sendDataDropTimeout > 0 && (head._data.time + this.stateCenter.sendDataDropTimeout) < timestamp)) {
                ++dropMsgCount;
            }
            else {
                if (head._data.data.body.custom_msg) {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq, head._data.data.body.custom_msg);
                }
                else {
                    head._data.error(zego_entity_1.sdkErrorList.SEND_MSG_TIMEOUT, head._data.data.header.seq);
                }
            }
            ++checkCount;
            if (checkCount >= this.stateCenter.sendDataCheckOnceCount) {
                break;
            }
            head = messageList.getFirst();
        }
        if (timeoutMsgCount != 0 || dropMsgCount != 0) {
            this.logger.debug("zb.hb.cmt call success, stat: timeout=", timeoutMsgCount, "drop=", dropMsgCount);
        }
    };
    /*
     *    "scmt.0": "ZegoClient.startCheckMessageTimeout",
     */
    //检查custommsg发送包是否超时
    HeartBeatHandler.prototype.startCheckMessageTimeout = function () {
        var _this = this;
        //this.logger.debug("scmt.0 call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.hb.scmt state error");
            return;
        }
        this.checkMessageListTimeout(this.stateCenter.sendDataList, this.stateCenter.sendDataMap);
        this.checkMessageListTimeout(this.stateCenter.sendCommandList, this.stateCenter.sendCommandMap);
        this.stateCenter.sendDataCheckTimer = setTimeout(function () {
            _this.startCheckMessageTimeout();
        }, this.stateCenter.sendDataCheckInterval);
    };
    return HeartBeatHandler;
}());
exports.HeartBeatHandler = HeartBeatHandler;


/***/ }),

/***/ "./sdk/common/clientBase/index.ts":
/*!****************************************!*\
  !*** ./sdk/common/clientBase/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! ./common */ "./sdk/common/clientBase/common.ts");
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var socketCenter_1 = __webpack_require__(/*! ./socketCenter */ "./sdk/common/clientBase/socketCenter.ts");
var roomHandler_1 = __webpack_require__(/*! ./roomHandler */ "./sdk/common/clientBase/roomHandler.ts");
var streamHandler_1 = __webpack_require__(/*! ./streamHandler */ "./sdk/common/clientBase/streamHandler.ts");
var heartBeatHandler_1 = __webpack_require__(/*! ./heartBeatHandler */ "./sdk/common/clientBase/heartBeatHandler.ts");
var messageHandler_1 = __webpack_require__(/*! ./messageHandler */ "./sdk/common/clientBase/messageHandler.ts");
var liveHandler_1 = __webpack_require__(/*! ./liveHandler */ "./sdk/common/clientBase/liveHandler.ts");
// 对外开发接口，与文档保持一致；调度中心
var BaseCenter = /** @class */ (function (_super) {
    __extends(BaseCenter, _super);
    function BaseCenter() {
        return _super.call(this) || this;
    }
    BaseCenter.prototype.init = function () {
        this.bindSocketHandler();
        this.bindStreamHandler();
        this.bindHeatBeatHandler();
        this.bindRoomHandler();
        this.bindMessageHandler();
        this.bindLiveHandler();
        this.bindStreamCenterHandler();
    };
    /*
   *    "zb.cm.bsh.0": "ZegoClient.base.bindSocketHandler",
   */
    BaseCenter.prototype.bindSocketHandler = function () {
        var _this = this;
        this.socketCenter = new socketCenter_1.SocketCenter(this.logger, this.stateCenter);
        this.socketCenter.registerRouter('push_signal', function (msg) {
            _this.liveHandler.handlePushSignalMsg(msg);
        });
        this.socketCenter.getSocket = function (server) {
            return _this.getSocket(server);
        };
        this.socketCenter.handlePushKickout = function (msg) {
            _this.logger.info("zb.cm.bsh.0  call hpk");
            _this.roomHandler.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            _this.roomHandler.resetRoom();
            _this.onKickOut({
                "code": zego_entity_1.sdkErrorList.KICK_OUT.code,
                "msg": zego_entity_1.sdkErrorList.KICK_OUT.msg + msg.body.reason
            });
            _this.logger.debug("zb.cm.bsh.0  call hpk success");
        };
        this.socketCenter.handlePushCustomMsg = function (msg) {
            _this.messageHandler.handlePushCustomMsg(msg);
        };
        this.socketCenter.handlePushUserStateUpdateMsg = function (msg) {
            _this.roomHandler.handlePushUserStateUpdateMsg(msg);
        };
        this.socketCenter.handlePushRoomMsg = function (msg) {
            _this.onRecvRoomMsg(msg.body.chat_data, msg.body.server_msg_id, msg.body.ret_msg_id);
        };
        this.socketCenter.handlePushMergeMsg = function (msg) {
            _this.messageHandler.handlePushMergeMsg(msg);
        };
        this.socketCenter.handlePushTransMsg = function (msg) {
            _this.messageHandler.handlePushTransMsg(msg);
        };
        this.socketCenter.handleBigImMsgRsp = function (msg) {
            _this.messageHandler.handleBigImMsgRsp(msg);
        };
    };
    BaseCenter.prototype.bindStreamHandler = function () {
        var _this = this;
        this.streamHandler = new streamHandler_1.StreamHandler(this.logger, this.stateCenter, this.socketCenter);
        this.streamHandler.onStreamUpdated = function (type, streamList) {
            _this.onStreamUpdated(type, streamList);
        };
        this.streamHandler.onPublishStateUpdate = function (type, streamid, error) {
            _this.onPublishStateUpdate(type, streamid, error);
        };
        this.streamHandler.onStreamExtraInfoUpdated = function (streamList) {
            _this.onStreamExtraInfoUpdated(streamList);
        };
        this.streamHandler.setCDNInfo = function (streamInfo, streamItem) {
            _this.setCDNInfo(streamInfo, streamItem);
        };
    };
    BaseCenter.prototype.bindHeatBeatHandler = function () {
        var _this = this;
        this.heartBeatHandler = new heartBeatHandler_1.HeartBeatHandler(this.logger, this.stateCenter, this.socketCenter);
        this.heartBeatHandler.onRecvReliableMessage = function (type, seq, data) {
            _this.onRecvReliableMessage(type, seq, data);
        };
        this.heartBeatHandler.handleFetchStreamListRsp = function (msg) {
            _this.streamHandler.handleFetchStreamListRsp(msg);
        };
        this.heartBeatHandler.fetchUserList = function () {
            _this.roomHandler.fetchUserList();
        };
        this.heartBeatHandler.onUpdateOnlineCount = function (roomId, userCount) {
            _this.onUpdateOnlineCount(roomId, userCount);
        };
        this.heartBeatHandler.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
            if (stream_extra_info === void 0) { stream_extra_info = ''; }
            _this.streamHandler.updateStreamInfo(streamid, cmd, stream_extra_info, error);
        };
        this.heartBeatHandler.hbLogout = function (err) {
            _this.onDisconnect(err);
        };
    };
    /*
   *    "zb.cm.brh": "ZegoClient.base.bindRoomHandler",
   */
    BaseCenter.prototype.bindRoomHandler = function () {
        var _this = this;
        this.roomHandler = new roomHandler_1.RoomHandler(this.logger, this.stateCenter, this.socketCenter);
        this.roomHandler.loginSuccessCallBack = function (lastRunState, msg) {
            //处理心跳
            var heartbeatInterval = msg.body.hearbeat_interval < zego_entity_1.MINIUM_HEARTBEAT_INTERVAL ? zego_entity_1.MINIUM_HEARTBEAT_INTERVAL : msg.body.hearbeat_interval;
            //setTimeout (() => {
            _this.heartBeatHandler.start(heartbeatInterval);
            // }, heartbeatInterval);
            //消息检查
            _this.heartBeatHandler.resetCheckMessage();
            _this.heartBeatHandler.startCheckMessageTimeout();
            _this.streamCenter.setSessionInfo(_this.stateCenter.appid, _this.stateCenter.idName, _this.stateCenter.token, _this.stateCenter.testEnvironment);
            //房间成员变化
            //handle anchor info
            if (msg.body.anchor_info) {
                _this.onGetAnchorInfo(msg.body.anchor_info.anchor_id_name, msg.body.anchor_info.anchor_nick_name);
            }
            if (msg.body.online_count) {
                _this.onUpdateOnlineCount(_this.stateCenter.roomid, msg.body.online_count);
            }
            //handle userStateUpdate
            _this.logger.info("zb.cm.brh hls userStateUpdate " + _this.stateCenter.userStateUpdate);
            if (_this.stateCenter.userStateUpdate) {
                _this.logger.info("zb.cm.brh hls fetch all new userlist");
                _this.roomHandler.fetchUserList();
            }
            //流处理理
            _this.streamHandler.handleStreamStart(lastRunState, msg);
        };
        this.roomHandler.onGetTotalUserList = function (roomId, userList) {
            _this.onGetTotalUserList(roomId, userList);
        };
        this.roomHandler.resetRoomCallBack = function () {
            // 清除心跳计时器对象
            _this.heartBeatHandler.resetHeartbeat();
            // 清除检查消息循环
            _this.heartBeatHandler.resetCheckMessage();
            //清除推拉流状态
            _this.resetStreamCenter();
        };
        this.roomHandler.onUserStateUpdate = function (roomId, userList) {
            _this.onUserStateUpdate(roomId, userList);
        };
        this.roomHandler.onDisconnect = function (err) {
            _this.onDisconnect(err);
        };
        this.roomHandler.loginBodyData = function () { return _this.loginBodyData(); };
    };
    BaseCenter.prototype.bindMessageHandler = function () {
        var _this = this;
        this.messageHandler = new messageHandler_1.MessageHandler(this.logger, this.stateCenter, this.socketCenter);
        this.messageHandler.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
            _this.onRecvCustomCommand(from_userid, from_idname, custom_content);
        };
        this.messageHandler.onRecvBigRoomMessage = function (messageList, roomId) {
            _this.onRecvBigRoomMessage(messageList, roomId);
        };
        this.messageHandler.onRecvReliableMessage = function (type, seq, data) {
            _this.onRecvReliableMessage(type, seq, data);
        };
    };
    BaseCenter.prototype.bindLiveHandler = function () {
        var _this = this;
        this.liveHandler = new liveHandler_1.LiveHandler(this.logger, this.stateCenter, this.socketCenter);
        this.liveHandler.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvEndJoinLiveCommand(requestId, from_userid, from_username, roomid);
        };
        this.liveHandler.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvInviteJoinLiveRequest(requestId, from_userid, from_username, roomid);
        };
        this.liveHandler.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
            _this.onRecvJoinLiveRequest(requestId, from_userid, from_username, roomid);
        };
    };
    BaseCenter.prototype.bindStreamCenterHandler = function () {
        var _this = this;
        this.streamCenter.onPlayStateUpdate = function (type, streamid, error) {
            _this.onPlayStateUpdateHandle(type, streamid, error);
        };
        this.streamCenter.onPlayQualityUpdate = function (streamId, streamQuality) {
            _this.onPlayQualityUpdate(streamId, streamQuality);
        };
        this.streamCenter.onPublishStateUpdate = function (type, streamid, error) {
            _this.onPublishStateUpdateHandle(type, streamid, error);
        };
        this.streamCenter.onPublishQualityUpdate = function (streamId, streamQuality) {
            _this.onPublishQualityUpdate(streamId, streamQuality);
        };
        this.streamCenter.onPlayerStreamUrlUpdate = function (streamid, url, type) {
            _this.onStreamUrlUpdate(streamid, url, type);
        };
        this.streamCenter.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
            _this.onVideoSizeChanged(streamId, videoWidth, videoHeight);
        };
    };
    /*********
     *
     * 下面的方法微信和web端实现一样，共用
     *
     *
     * ****/
    /*
    *    "zb.cm.cf": "ZegoClient.base.config",
    */
    // 配置client
    BaseCenter.prototype.config = function (option) {
        this.logger.debug("zb.cm.cf call");
        if (!client_util_1.ClientUtil.checkConfigParam(option, this.logger)) {
            this.logger.error("zb.cm.cf param error");
            return false;
        }
        this.stateCenter.appid = option.appid;
        this.stateCenter.server = option.server;
        this.stateCenter.idName = option.idName;
        this.stateCenter.nickName = option.nickName;
        this.logger.setLogLevel(option.logLevel);
        if (option.audienceCreateRoom === false) {
            this.stateCenter.roomCreateFlag = 0;
        }
        if (!option.remoteLogLevel) {
            this.logger.setRemoteLogLevel(0);
        }
        else {
            this.logger.setRemoteLogLevel(option.remoteLogLevel);
        }
        this.logger.setSessionInfo(option.appid, "", "", option.idName, "", zego_entity_1.PROTO_VERSION);
        if (option.logUrl) {
            this.logger.openLogServer(option.logUrl);
        }
        if (this.stateCenter.server.indexOf("test2-wsliveroom-api.zego.im") != -1) {
            this.stateCenter.testEnvironment = true;
        }
        this.stateCenter.configOK = true;
        this.logger.debug("zb.cm.cf call success");
        return true;
    };
    //房间相关---登录，房间人员变化
    BaseCenter.prototype.login = function (roomid, role, token, success, error) {
        if (typeof roomid !== 'string' || typeof token !== 'string' || (role !== 1 && role !== 2)) {
            console.error('login params error');
            return;
        }
        this.roomHandler.login(roomid, role, token, null, success, error);
    };
    ;
    BaseCenter.prototype.loginWithAuthor = function (roomid, role, token, authToken, success, error) {
        if (typeof roomid != 'string' || typeof token != 'string' || typeof authToken != 'string' || (role != 1 && role != 2)) {
            console.error('loginWithAuthor params error');
            return;
        }
        this.roomHandler.login(roomid, role, token, authToken, success, error);
    };
    ;
    BaseCenter.prototype.logout = function () {
        return this.roomHandler.logout();
    };
    ;
    BaseCenter.prototype.setUserStateUpdate = function (update) {
        if (typeof update !== "boolean") {
            console.error("setUserStateUpdate param error");
            return;
        }
        this.roomHandler.setUserStateUpdate(update);
    };
    BaseCenter.prototype.onUserStateUpdate = function (roomId, userList) {
    };
    BaseCenter.prototype.onGetTotalUserList = function (roomId, userList) {
    };
    BaseCenter.prototype.onUpdateOnlineCount = function (roomId, userCount) {
    };
    BaseCenter.prototype.onGetAnchorInfo = function (anchor_userid, anchro_username) {
    };
    /*
    *    "zc.p.r": "ZegoClient.release"
    */
    // 释放房间和播放器
    BaseCenter.prototype.release = function () {
        this.logger.debug("zb.cm.rl call");
        this.roomHandler.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.roomHandler.resetRoom();
        this.logger.stopLogServer();
        this.logger.debug("zb.cm.rl call success");
    };
    BaseCenter.prototype.sendCustomCommand = function (dstMembers, customContent, success, error) {
        if (typeof customContent !== 'string' && typeof customContent !== 'object') {
            console.error('sendCustomCommand params error');
            return false;
        }
        return this.messageHandler.sendCustomCommand(dstMembers, customContent, success, error);
    };
    BaseCenter.prototype.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
    };
    BaseCenter.prototype.sendRoomMsg = function (msg_category, msg_type, msg_content, success, error) {
        this.messageHandler.sendRoomMsg(msg_category, msg_type, msg_content, success, error);
    };
    BaseCenter.prototype.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
    };
    BaseCenter.prototype.sendReliableMessage = function (type, data, success, error) {
        this.messageHandler.sendReliableMessage(type, data, success, error);
    };
    BaseCenter.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    BaseCenter.prototype.sendBigRoomMessage = function (category, type, content, success, error) {
        this.messageHandler.sendBigRoomMessage(category, type, content, success, error);
    };
    BaseCenter.prototype.onRecvBigRoomMessage = function (messageList, roomId) {
    };
    BaseCenter.prototype.sendRelayMessage = function (type, data, success, error) {
        this.messageHandler.sendRelayMessage(type, data, success, error);
    };
    BaseCenter.prototype.requestJoinLive = function (destIdName, success, error, resultCallback) {
        return this.liveHandler.requestJoinLive(destIdName, success, error, resultCallback);
    };
    BaseCenter.prototype.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.inviteJoinLive = function (destIdName, success, error, resultCallback) {
        return this.liveHandler.inviteJoinLive(destIdName, success, error, resultCallback);
    };
    BaseCenter.prototype.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.endJoinLive = function (destIdName, success, error) {
        return this.liveHandler.endJoinLive(destIdName, success, error);
    };
    BaseCenter.prototype.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
    };
    BaseCenter.prototype.respondJoinLive = function (requestId, respondResult, success, error) {
        return this.liveHandler.respondJoinLive(requestId, respondResult, success, error);
    };
    /*
     *    "zc.p.ums": "ZegoClient.updateMixStream",//更新混流信令
     */
    BaseCenter.prototype.updateMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        return this.streamHandler.updateMixStream(mixStreamConfig, successCallback, errorCallback);
    };
    ;
    /*
     *    "zc.p.sms": "ZegoClient.stopMixStream", //停止混流信令
     */
    BaseCenter.prototype.stopMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        return this.streamHandler.stopMixStream(mixStreamConfig, successCallback, errorCallback);
    };
    ;
    BaseCenter.prototype.updateStreamExtraInfo = function (streamid, extraInfo) {
        return this.streamHandler.updateStreamExtraInfo(streamid, extraInfo);
    };
    BaseCenter.prototype.onStreamUrlUpdate = function (streamid, url, type) {
    };
    ;
    BaseCenter.prototype.onStreamUpdated = function (type, streamList) {
    };
    BaseCenter.prototype.onStreamExtraInfoUpdated = function (streamList) {
    };
    BaseCenter.prototype.onPlayStateUpdate = function (type, streamid, error) {
    };
    BaseCenter.prototype.onVideoSizeChanged = function (streamId, videoWidth, videoHeight) {
    };
    BaseCenter.prototype.onPlayQualityUpdate = function (streamId, streamQuality) {
    };
    BaseCenter.prototype.onPublishStateUpdate = function (type, streamid, error) {
    };
    BaseCenter.prototype.onPublishQualityUpdate = function (streamId, streamQuality) {
    };
    /********
     *
     *
     *  下面的方法都需要被覆盖，这里只是空实现
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * *******/
    BaseCenter.prototype.onDisconnect = function (err) {
    };
    BaseCenter.prototype.onKickOut = function (err) {
    };
    BaseCenter.getCurrentVersion = function () {
        return zego_entity_1.PROTO_VERSION;
    };
    return BaseCenter;
}(common_1.Common));
exports.BaseCenter = BaseCenter;


/***/ }),

/***/ "./sdk/common/clientBase/liveHandler.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/liveHandler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var LiveHandler = /** @class */ (function () {
    function LiveHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
    *    "zb.lh.rjl": "ZegoClient.base.LiveHandler.requestJoinLive",
     */
    LiveHandler.prototype.requestJoinLive = function (destIdName, success, error, resultCallback) {
        this.logger.debug("zb.lh.rjl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        if (resultCallback == undefined) {
            return false;
        }
        this.stateCenter.joinLiveCallbackMap[requestId] = resultCallback;
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveRequest, signalCmd, destIdName, success, error);
        return true;
    };
    /*
   *    "zb.lh.ijl": "ZegoClient.base.LiveHandler.inviteJoinLive",
    */
    LiveHandler.prototype.inviteJoinLive = function (destIdName, success, error, resultCallback) {
        this.logger.debug("zb.lh.ijl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        if (resultCallback == undefined) {
            return false;
        }
        this.stateCenter.joinLiveCallbackMap[requestId] = resultCallback;
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveInvite, signalCmd, destIdName, success, error);
        return true;
    };
    /*
  *    "zb.lh.ejl": "ZegoClient.base.LiveHandler.endJoinLive",
   */
    LiveHandler.prototype.endJoinLive = function (destIdName, success, error) {
        this.logger.debug("zb.lh.ejl call");
        var requestId = this.stateCenter.getRequestId();
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, destIdName);
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveStop, signalCmd, destIdName, success, error);
        return true;
    };
    /*
  *    "zb.lh.rpjl": "ZegoClient.base.LiveHandler.respondJoinLive",
   */
    LiveHandler.prototype.respondJoinLive = function (requestId, respondResult, success, error) {
        this.logger.debug("zb.lh.rpjl call");
        var dest_id_name = this.stateCenter.joinLiveRequestMap[requestId];
        if (!dest_id_name) {
            this.logger.info("zb.lh.rpjl no dest id name");
            return false;
        }
        var result = 0;
        if (respondResult === true)
            result = 1;
        var signalCmd = this.stateCenter.getSignalCmdContent(requestId, dest_id_name, result);
        this.sendSignalCmd(zego_entity_1.ENUM_SIGNAL_SUB_CMD.joinLiveResult, signalCmd, dest_id_name, success, error);
        delete this.stateCenter.joinLiveRequestMap[requestId];
        return true;
    };
    /*
    *    "zb.lh.ssc": "ZegoClient.base.LiveHandler.sendSignalCmd",
   */
    //连麦信令
    LiveHandler.prototype.sendSignalCmd = function (cmd, signalMsg, dest_id_name, success, error) {
        this.logger.debug("zb.lh.ssc call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.lh.ssc state error");
            return;
        }
        this.logger.debug("zb.lh.ssc send signal cmd " + cmd);
        var bodyData = {
            "sub_cmd": cmd,
            "signal_msg": signalMsg,
            "dest_id_name": [dest_id_name]
        };
        this.socketCenter.sendMessage("signal", bodyData, success, error);
        this.logger.info("zb.lh.ssc call success");
    };
    /*
   *    "zb.lh.hpsm": "ZegoClient.base.LiveHandler.handlePushSignalMsg",
   */
    // 连麦信令push
    LiveHandler.prototype.handlePushSignalMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.warn("zb.lh.hpsm not login");
            return;
        }
        var signalMsg = JSON.parse(msg.body.signal_msg);
        this.logger.debug("zb.lh.hpcm hpsm= ", signalMsg);
        switch (msg.body.sub_cmd) {
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:
                this.handlePushJoinLiveRequestMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:
                this.handlePushJoinLiveResultMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:
                this.handlePushJoinLiveInviteMsg(signalMsg);
                break;
            case zego_entity_1.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:
                this.handlePushJoinLiveStopMsg(signalMsg);
        }
        this.logger.debug("zb.lh.hpsm call end");
    };
    /*
    *    "zb.lh.hpjlrm": "ZegoClient.base.LiveHandler.handlePushJoinLiveRequestMsg",
   */
    //请求连麦push
    LiveHandler.prototype.handlePushJoinLiveRequestMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlrm no requestId");
            return;
        }
        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            this.logger.error("zb.lh.hpjlrm no from user");
            return;
        }
        this.stateCenter.joinLiveRequestMap[requestId] = dest_id_name;
        this.logger.info("zb.lh.hpjlrm onRecvJoinLiveRequest " + dest_id_name);
        this.onRecvJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    /*
    *    "zb.lh.hpjlim": "ZegoClient.base.LiveHandler.handlePushJoinLiveInviteMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveInviteMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlim no requestId");
            return;
        }
        var dest_id_name = signalMsg.from_userid;
        if (typeof dest_id_name !== "string") {
            this.logger.error("zb.lh.hpjlim no from user");
            return;
        }
        this.stateCenter.joinLiveRequestMap[requestId] = dest_id_name;
        this.logger.info("zb.lh.hpjlim onRecvInviteJoinLiveRequest " + dest_id_name);
        this.onRecvInviteJoinLiveRequest(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvInviteJoinLiveRequest = function (requestId, from_userid, from_username, roomid) {
    };
    /*
    *    "zb.lh.hpjlim": "ZegoClient.base.LiveHandler.handlePushJoinLiveResultMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveResultMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlrm no requestId");
            return;
        }
        var result = signalMsg.result;
        if (result == undefined) {
            this.logger.info("zb.lh.hpjlrm no result");
            return;
        }
        var respondResult = result == 1 ? true : false;
        if (this.stateCenter.joinLiveCallbackMap[requestId]) {
            var result_callback = this.stateCenter.joinLiveCallbackMap[requestId];
            if (!result_callback) {
                this.logger.info("hpjlrm.o no callback");
                return;
            }
            this.logger.info("zb.lh.hpjlrm joinLiveRequest/invite result " + respondResult);
            delete this.stateCenter.joinLiveCallbackMap[requestId];
            result_callback(respondResult, signalMsg.from_userid, signalMsg.from_username);
        }
    };
    /*
    *    "zb.lh.hpjlsm": "ZegoClient.base.LiveHandler.handlePushJoinLiveStopMsg",
    */
    LiveHandler.prototype.handlePushJoinLiveStopMsg = function (signalMsg) {
        var requestId = signalMsg.request_id;
        if (typeof requestId !== "string") {
            this.logger.error("zb.lh.hpjlsm no requestId");
            return;
        }
        this.logger.info("zb.lh.hpjlsm onRecvEndJoinLiveCommand " + signalMsg.from_userid);
        this.onRecvEndJoinLiveCommand(requestId, signalMsg.from_userid, signalMsg.from_username, signalMsg.room_id);
    };
    LiveHandler.prototype.onRecvEndJoinLiveCommand = function (requestId, from_userid, from_username, roomid) {
    };
    return LiveHandler;
}());
exports.LiveHandler = LiveHandler;


/***/ }),

/***/ "./sdk/common/clientBase/messageHandler.ts":
/*!*************************************************!*\
  !*** ./sdk/common/clientBase/messageHandler.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var MessageHandler = /** @class */ (function () {
    function MessageHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
    *    "zb.mh.scc": "ZegoClient.base.MessageHandler.sendCustomCommand",
    */
    MessageHandler.prototype.sendCustomCommand = function (dstMembers, customContent, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.scc call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.scc state error");
            return false;
        }
        if (!dstMembers || dstMembers.length == 0) {
            this.logger.error("zb.mh.scc dstMembers error");
            return false;
        }
        var customContent_send = {
            from_userid: this.stateCenter.idName,
            from_username: this.stateCenter.nickName,
            request_id: this.stateCenter.getRequestId(),
            custom_content: customContent || '',
            room_id: this.stateCenter.roomid
        };
        var bodyData = {
            "dest_id_name": dstMembers,
            "custom_msg": JSON.stringify(customContent_send)
        };
        if (!client_util_1.ClientUtil.checkCustomCommandParam(bodyData)) {
            this.logger.info("zb.mh.scc param error");
            return false;
        }
        // 发送消息
        this.socketCenter.registerRouter('custommsg', function (msg) {
            _this.handleSendCustomMsgRsp(msg);
        });
        this.socketCenter.sendCustomMessage('custommsg', bodyData, success, error);
        this.logger.info("zb.mh.scc call success");
        return true;
    };
    /*
    *    "zb.mh.hscmrcall": "ZegoClient.base.MessageHandler.handleSendCustomMsgRsp",
    */
    MessageHandler.prototype.handleSendCustomMsgRsp = function (msg) {
        this.logger.debug("zb.mh.hscmrcall");
        var sendDataNode = this.stateCenter.sendDataMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd != "custommsg") {
                this.logger.error("zb.mh.hscmrcmd wrong" + sendData.data.header.cmd);
            }
            else {
                if (msg.body.err_code === 0) {
                    if (sendData.success != null) {
                        sendData.success(msg.header.seq, sendData.data.body.custom_msg);
                    }
                }
                else {
                    if (sendData.error != null) {
                        sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.custom_msg);
                    }
                }
            }
            delete this.stateCenter.sendDataMap[msg.header.seq];
            this.stateCenter.sendDataList.remove(sendDataNode);
        }
        else {
            this.logger.error('zb.mh.hscmrno found seq=' + msg.header.seq);
        }
        this.logger.debug("zb.mh.hscmr  call success");
    };
    /*
   *    "zb.mh.hpcm": "ZegoClient.base.MessageHandler.handlePushCustomMsg",
   */
    MessageHandler.prototype.handlePushCustomMsg = function (msg) {
        var submsg = JSON.parse(msg.body.custommsg);
        this.logger.debug("zb.mh.hpcm submsg=", submsg);
        this.onRecvCustomCommand(submsg.from_userid, submsg.from_username, submsg.custom_content);
    };
    MessageHandler.prototype.onRecvCustomCommand = function (from_userid, from_idname, custom_content) {
    };
    /*
    *    "zb.mh.srm": "ZegoClient.base.MessageHandler.sendRoomMsg",
    */
    MessageHandler.prototype.sendRoomMsg = function (msg_category, msg_type, msg_content, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.srm call");
        // 不是处于登录状态
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.srm state error");
            return;
        }
        var timestamp = Date.parse(new Date() + '');
        if (this.stateCenter.sendRoomMsgTime > 0 && this.stateCenter.sendRoomMsgTime + this.stateCenter.SendRoomMsgInterval > timestamp) {
            this.logger.info("zb.mh.srm freq error");
            if (error) {
                error(zego_entity_1.sdkErrorList.FREQ_LIMITED, 0, msg_category, msg_type, msg_content);
            }
            return;
        }
        this.stateCenter.sendRoomMsgTime = timestamp;
        this.logger.debug("zb.mh.srm send fetch request");
        var bodyData = {
            "msg_category": msg_category,
            "msg_type": msg_type,
            "msg_content": msg_content,
        };
        // 发送消息
        this.socketCenter.registerRouter('im_chat', function (msg) {
            _this.handleSendRoomMsgRsp(msg);
        });
        this.socketCenter.sendCustomMessage('im_chat', bodyData, success, error);
        this.logger.info("zb.mh.srm call success");
    };
    /*
   *    "zb.mh.hsrmr": "ZegoClient.base.MessageHandler.handleSendRoomMsgRsp",
   */
    MessageHandler.prototype.handleSendRoomMsgRsp = function (msg) {
        this.logger.debug("zb.mh.hsrmr call");
        var sendDataNode = this.stateCenter.sendDataMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd != "im_chat") {
                this.logger.error("zb.mh.hsrmr cmd wrong" + sendData.data.header.cmd);
            }
            else {
                if (msg.body.err_code === 0) {
                    if (sendData.success) {
                        sendData.success(msg.header.seq, msg.body.msg_id, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                }
                else {
                    if (sendData.error) {
                        sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq, sendData.data.body.msg_category, sendData.data.body.msg_type, sendData.data.body.msg_content);
                    }
                }
            }
            delete this.stateCenter.sendDataMap[msg.header.seq];
            this.stateCenter.sendDataList.remove(sendDataNode);
        }
        else {
            this.logger.error('hzb.mh.hsrmr no found seq=' + msg.header.seq);
        }
        this.logger.info("zb.mh.hsrmr call success");
    };
    MessageHandler.prototype.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
    };
    /*
  *    "zb.mh.srirm": "ZegoClient.base.MessageHandler.sendReliableMessage",
  */
    MessageHandler.prototype.sendReliableMessage = function (type, data, success, error) {
        this.logger.debug("zb.mh.srirm call");
        if (this.stateCenter.transSeqMap[type]) {
            delete this.stateCenter.transSeqMap[type];
        }
        this.stateCenter.transSeqMap[type] = {
            seq: 0
        };
        var body = {
            "trans_type": type,
            "trans_data": data
        };
        this.socketCenter.sendMessage("trans", body, success, error);
    };
    /*
    *    "zb.mh.sbim": "ZegoClient.base.MessageHandler.sendBigRoomMessage",
   */
    MessageHandler.prototype.sendBigRoomMessage = function (category, type, content, success, error) {
        var _this = this;
        this.logger.debug("zb.mh.sbim call");
        var timeWindow = this.stateCenter.bigimTimeWindow;
        var offset = this.stateCenter.serverTimeOffset;
        var serverTime = (new Date()).getTime() + offset;
        var clientId = (++this.stateCenter.cmdSeq).toString();
        if (success == undefined) {
            success = null;
        }
        if (error == undefined) {
            error = null;
        }
        this.stateCenter.bigImCallbackMap[clientId] = {
            success: success,
            error: error
        };
        if (timeWindow == 0) {
            var bodyData = {
                "msg_category": category,
                "msg_type": type,
                "msg_content": content,
                "bigmsg_client_id": clientId
            };
            this.logger.debug("zb.mh.sbim no time window");
            this.sendBigRoomMessageInternal([bodyData], function (msg) {
                _this.handleBigImMsgRsp(msg);
            }, error);
        }
        else {
            var currentIndex = Math.floor(serverTime / timeWindow);
            this.logger.debug("currentIndex " + currentIndex + " lastTimeIndex " + this.stateCenter.bigImLastTimeIndex);
            if (this.stateCenter.bigImLastTimeIndex < currentIndex && this.stateCenter.bigImMessageList.length == 0) {
                this.stateCenter.bigImLastTimeIndex = currentIndex;
                var oneData = {
                    "msg_category": category,
                    "msg_type": type,
                    "msg_content": content,
                    "bigmsg_client_id": clientId
                };
                this.sendBigRoomMessageInternal([oneData], function (msg) {
                    _this.handleBigImMsgRsp(msg);
                }, error);
            }
            else {
                this.stateCenter.bigImMessageList.push({
                    msg_category: category,
                    msg_type: type,
                    msg_content: content,
                    bigmsg_client_id: clientId
                });
                if (this.stateCenter.bigImMessageList.length == 1) {
                    this.setBigImTimer(offset, timeWindow);
                }
            }
        }
    };
    /*
    *    "zb.mh.hpmmnot": "ZegoClient.base.MessageHandler.handlePushMergeMsg",
    */
    MessageHandler.prototype.handlePushMergeMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.hpmmnot login");
            return;
        }
        for (var i = 0; i < msg.body.messages.length; i++) {
            if (msg.body.messages[i].sub_cmd === 14001) {
                this.handlePushBigRooMsg(msg.body.messages[i].msg_body);
            }
        }
        this.logger.debug("zb.mh.hpmm call success");
    };
    /*
    *    "zb.mh.hpbrm": "ZegoClient.base.MessageHandler.handlePushBigRooMsg",
    */
    MessageHandler.prototype.handlePushBigRooMsg = function (bodyString) {
        var messageBody;
        //messageBody json
        try {
            messageBody = JSON.parse(bodyString);
        }
        catch (e) {
            this.logger.warn("zb.mh.hpbrm parse json error");
            return;
        }
        if (!messageBody) {
            this.logger.warn("zb.mh.hpbrm cann't find message body");
            return;
        }
        var roomId = messageBody.room_id;
        var pushData = [];
        for (var i = 0; i < messageBody.msg_data.length; i++) {
            var message = messageBody.msg_data[i];
            var idName = message.id_name;
            if (idName == this.stateCenter.idName) {
                this.logger.debug("zb.mh.hpbrm self message");
                continue;
            }
            pushData.push({
                idName: message.id_name,
                nickName: message.nick_name,
                messageId: message.bigmsg_id,
                category: message.msg_category,
                type: message.msg_type,
                content: message.msg_content,
                time: message.send_time
            });
        }
        if (pushData.length == 0) {
            this.logger.debug("zb.mh.hpbrm no other pushData except self");
        }
        else {
            this.onRecvBigRoomMessage(pushData, roomId);
        }
        this.logger.debug("zb.mh.hpbrm call success");
    };
    MessageHandler.prototype.onRecvBigRoomMessage = function (messageList, roomId) {
    };
    /*
   *    "zb.mh.sbim": "ZegoClient.base.MessageHandler.sendBigRoomMessageInternal",
   */
    MessageHandler.prototype.sendBigRoomMessageInternal = function (msgs, success, error) {
        this.logger.debug("zb.mh.sbim call");
        var bodyData = {
            "msgs": msgs
        };
        this.socketCenter.sendMessage("bigim_chat", bodyData, success, error);
    };
    /*
     *    "zb.mh.hbmr": "ZegoClient.base.MessageHandler.handleBigImMsgRsp",
     */
    MessageHandler.prototype.handleBigImMsgRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.info("zb.mh.hbmr not login");
            return;
        }
        if (this.stateCenter.bigimTimeWindow != msg.body.bigim_time_window) {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        for (var i = 0; i < msg.body.msgs.length; i++) {
            var clientId = msg.body.msgs[i].bigmsg_client_id;
            var msgId = msg.body.msgs[i].bigmsg_id;
            if (this.stateCenter.bigImCallbackMap[clientId]) {
                var success = this.stateCenter.bigImCallbackMap[clientId].success;
                if (success != null) {
                    success(msg.header.seq, msgId);
                }
                delete this.stateCenter.bigImCallbackMap[clientId];
            }
        }
    };
    /*
     *    "zb.mh.sbt": "ZegoClient.base.MessageHandler.setBigImTimer",
     */
    MessageHandler.prototype.setBigImTimer = function (offset, timeWindow) {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow - (serverTimestamp % timeWindow);
        var interval = client_util_1.ClientUtil.generateRandumNumber(timeWindow) + residue;
        this.logger.info("zb.mh.sbt setTimer " + interval);
        this.stateCenter.bigImTimer = setTimeout(function () {
            _this.onBigImTimer();
        }, interval);
    };
    MessageHandler.prototype.onBigImTimer = function () {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + this.stateCenter.serverTimeOffset;
        this.stateCenter.bigImLastTimeIndex = Math.floor(serverTimestamp / this.stateCenter.bigimTimeWindow);
        var bodyData = [];
        var requestList = [];
        for (var i = 0; i < this.stateCenter.bigImMessageList.length; i++) {
            if (i >= 20) {
                break;
            }
            var info = this.stateCenter.bigImMessageList[i];
            bodyData.push({
                "msg_category": info.msg_category,
                "msg_type": info.msg_type,
                "msg_content": info.msg_content,
                "bigmsg_client_id": info.bigmsg_client_id
            });
            requestList.push(info.bigmsg_client_id);
        }
        if (this.stateCenter.bigImMessageList.length > 20) {
            this.stateCenter.bigImMessageList.splice(0, 20);
        }
        else {
            this.stateCenter.bigImMessageList = [];
        }
        this.sendBigRoomMessageInternal(bodyData, function (msg) {
            _this.handleBigImMsgRsp(msg);
        }, function (err, seq) {
            for (var i = 0; i < requestList.length; i++) {
                var clientId = requestList[i];
                var callbackInfo = _this.stateCenter.bigImCallbackMap[clientId];
                if (callbackInfo) {
                    if (callbackInfo.error != null) {
                        callbackInfo.error(err, seq);
                    }
                    delete _this.stateCenter.bigImCallbackMap[clientId];
                }
            }
        });
        clearTimeout(this.stateCenter.bigImTimer);
        this.stateCenter.bigImTimer = null;
        if (this.stateCenter.bigImMessageList.length > 0) {
            this.setBigImTimer(this.stateCenter.serverTimeOffset, this.stateCenter.bigimTimeWindow);
        }
    };
    /*
    *    "zb.mh.srlm": "ZegoClient.base.MessageHandler.sendRelayMessage",
    */
    MessageHandler.prototype.sendRelayMessage = function (type, data, success, error) {
        this.logger.debug("zb.mh.srm call");
        var timeWindow = this.stateCenter.datiTimeWindow;
        var offset = this.stateCenter.serverTimeOffset;
        if (timeWindow > 0) {
            this.stateCenter.realyMessageList.push({
                type: type,
                data: data,
                success: success,
                error: error
            });
            if (this.stateCenter.realyMessageList.length == 1) {
                this.setRelayTimer(offset, timeWindow);
            }
        }
        else {
            this.sendRelayMessageInternal(type, data, success, error);
        }
    };
    /*
   *    "zb.mh.srlmi": "ZegoClient.base.MessageHandler.sendRelayMessageInternal",
   */
    MessageHandler.prototype.sendRelayMessageInternal = function (type, data, success, error) {
        this.logger.debug("zb.mh.srmi call");
        var bodyData = {
            "relay_type": type,
            "relay_data": data
        };
        this.socketCenter.sendMessage("relay", bodyData, success, error);
    };
    /*
  *    "zb.mh.srt": "ZegoClient.base.MessageHandler.setRelayTimer",
  */
    MessageHandler.prototype.setRelayTimer = function (offset, timeWindow) {
        var _this = this;
        var serverTimestamp = (new Date()).getTime() + offset;
        var residue = timeWindow * 2 - (serverTimestamp % timeWindow);
        var interval = client_util_1.ClientUtil.generateRandumNumber(residue);
        this.logger.info("zb.mh.srt setTimer " + interval);
        this.stateCenter.relayTimer = setTimeout(function () {
            _this.onRelayTimer();
        }, interval);
    };
    /*
    *    "zb.mh.ort": "ZegoClient.base.MessageHandler.onRelayTimer",
    */
    MessageHandler.prototype.onRelayTimer = function () {
        if (this.stateCenter.realyMessageList.length == 0) {
            this.logger.info("zb.mh.ort no relay data");
            return;
        }
        var relayInfo = this.stateCenter.realyMessageList[0];
        this.sendRelayMessageInternal(relayInfo.type, relayInfo.data, relayInfo.success, relayInfo.error);
        clearTimeout(this.stateCenter.relayTimer);
        this.stateCenter.relayTimer = null;
        this.stateCenter.realyMessageList.splice(0, 1);
        if (this.stateCenter.realyMessageList.length > 0) {
            this.setRelayTimer(this.stateCenter.serverTimeOffset, this.stateCenter.datiTimeWindow);
        }
    };
    /*
   *    "zb.mh.hptr": "ZegoClient.base.MessageHandler.handlePushTransMsg",
   */
    MessageHandler.prototype.handlePushTransMsg = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.mh.hptr not login");
            return;
        }
        var type = msg.body.trans_type;
        var seq = msg.body.trans_seq;
        if (!this.stateCenter.transSeqMap[type]) {
            this.stateCenter.transSeqMap[type] = {
                seq: seq
            };
        }
        else {
            this.stateCenter.transSeqMap[type].seq = seq;
        }
        if (msg.body.trans_user_idname != this.stateCenter.idName) {
            this.onRecvReliableMessage(type, seq, msg.body.trans_data);
        }
        else {
            this.logger.debug("zb.mh.hptr receive self trans message");
        }
        this.logger.info("zb.mh.hptr trans " + type + " seq " + seq);
    };
    MessageHandler.prototype.onRecvReliableMessage = function (type, seq, data) {
    };
    return MessageHandler;
}());
exports.MessageHandler = MessageHandler;


/***/ }),

/***/ "./sdk/common/clientBase/roomHandler.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/roomHandler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var RoomHandler = /** @class */ (function () {
    function RoomHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    /*
   *    "zb.rh.srs": "ZegoClient.base.RoomHandler.setRunState",
   */
    RoomHandler.prototype.setRunState = function (newRunState) {
        this.logger.debug("zb.rh.srs old=" + this.stateCenter.runState + ", new=" + newRunState);
        this.stateCenter.lastRunState = this.stateCenter.runState;
        this.stateCenter.runState = newRunState;
    };
    /*
  *    "zb.rh.rtl": "ZegoClient.base.RoomHandler.resetTryLogin",
  */
    RoomHandler.prototype.resetTryLogin = function () {
        this.logger.debug("zb.rh.rtl call");
        clearTimeout(this.stateCenter.tryLoginTimer);
        this.stateCenter.tryLoginTimer = null;
        this.stateCenter.tryLoginCount = 0;
        this.logger.debug("zb.rh.rtl call success");
    };
    RoomHandler.prototype.resetBigRoomInfo = function () {
        //清除trans信令信息
        this.stateCenter.transSeqMap = {};
        //清除relay信令信息
        this.stateCenter.realyMessageList = [];
        if (this.stateCenter.relayTimer) {
            clearTimeout(this.stateCenter.relayTimer);
            this.stateCenter.relayTimer = null;
        }
        //清除大房间消息
        this.stateCenter.bigImLastTimeIndex = 0;
        this.stateCenter.bigIMmessageList = [];
        this.stateCenter.bigImCallbackMap = {};
        if (this.stateCenter.bigImTimer) {
            clearTimeout(this.stateCenter.bigImTimer);
            this.stateCenter.bigImTimer = null;
        }
        this.stateCenter.serverTimeOffset = 0;
        this.stateCenter.datiTimeWindow = 0;
        this.stateCenter.bigimTimeWindow = 0;
    };
    /*
     *    "zb.rh.rr": "ZegoClient.base.RoomHandler.resetRoom",
     */
    RoomHandler.prototype.resetRoom = function () {
        var _this = this;
        this.logger.debug('zb.rh.rr call');
        // 清除尝试登录计时器对象
        this.resetTryLogin();
        this.resetRoomCallBack();
        // 清除流列表
        this.stateCenter.streamList = [];
        this.stateCenter.streamQuerying = false;
        this.stateCenter.publishStreamList = {};
        // 清除连麦信令
        this.stateCenter.joinLiveCallbackMap = {};
        this.stateCenter.joinLiveRequestMap = {};
        // 清除请求url信息
        this.stateCenter.streamUrlMap = {};
        //清除大房间消息
        this.resetBigRoomInfo();
        this.stateCenter.cmdCallback = {};
        // 防止多次重置时，发送多次消息
        this.logger.debug('zb.rh.rr call send logout=', this.stateCenter.sessionid);
        if (this.stateCenter.sessionid !== '0') {
            var bodyData = {
                "reserve": 0
            };
            this.socketCenter.registerRouter('logout', function (msg) {
                _this.handleLogoutRsp(msg);
            });
            this.socketCenter.sendMessage('logout', bodyData);
        }
        this.socketCenter.closeSocket();
        //setTimeout( () =>{
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.stateCenter.userid = '';
        this.stateCenter.sessionid = '';
        this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, zego_entity_1.PROTO_VERSION);
        //},500);
        this.logger.debug('zb.rh.rr call success');
    };
    //空接口，被覆盖
    RoomHandler.prototype.resetRoomCallBack = function () {
    };
    RoomHandler.prototype.onDisconnect = function (err) {
    };
    //空实现，被覆盖
    RoomHandler.prototype.loginSuccessCallBack = function (lastRunState, msg) {
    };
    //空实现 被sdk覆盖
    RoomHandler.prototype.onGetTotalUserList = function (roomId, userList) {
    };
    /*
    *    "zb.rh.lg": "ZegoClient.base.RoomHandler.login",
    */
    //登录房间
    RoomHandler.prototype.login = function (roomid, role, token, authToken, success, error) {
        this.logger.setSessionInfo(this.stateCenter.appid, roomid, "", this.stateCenter.idName, "", zego_entity_1.PROTO_VERSION);
        this.logger.info("zb.rh.lg call:", roomid, token);
        authToken && (this.stateCenter.third_token = authToken);
        if (!this.stateCenter.configOK || !client_util_1.ClientUtil.checkLoginParam(roomid, token)) {
            this.logger.error("zb.rh.lg param error");
            error({ code: '', msg: 'param error' });
            return;
        }
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.logout) {
            this.logger.debug("zb.rh.lg reset");
            this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            this.resetRoom();
        }
        this.logger.debug("zb.rh.lg begin");
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.trylogin);
        this.stateCenter.roomid = roomid;
        this.stateCenter.token = token;
        this.stateCenter.role = role;
        client_util_1.ClientUtil.registerCallback('login', {
            success: success,
            error: error
        }, this.stateCenter.callbackList);
        this.resetTryLogin();
        this.tryLogin();
        this.logger.info("zb.rh.lg call success");
    };
    //登录请求数据包  被覆盖
    RoomHandler.prototype.loginBodyData = function () {
        return null;
    };
    /*
      *    "zb.rh.tl": "ZegoClient.base.RoomHandler.tryLogin",
      */
    RoomHandler.prototype.tryLogin = function () {
        var _this = this;
        this.logger.debug('zb.rh.tl call');
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.trylogin) {
            this.logger.error('zb.rh.tl state error');
            return;
        }
        // 如果尝试登录次数大于最大可尝试次数，则直接置为logout登出状态
        if (++this.stateCenter.tryLoginCount > zego_entity_1.MAX_TRY_LOGIN_COUNT) {
            this.logger.error('zb.rh.tl fail times limit');
            var lastRunState = this.stateCenter.lastRunState;
            this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
            this.resetRoom();
            if (lastRunState == zego_entity_1.ENUM_RUN_STATE.login) {
                //relogin fail, not by user
                this.logger.error('zb.rh.tl fail and disconnect');
                this.onDisconnect(zego_entity_1.sdkErrorList.LOGIN_DISCONNECT);
            }
            else {
                //trylogin fail, call by user
                this.logger.info('zb.rh.tl fail and callback user');
                client_util_1.ClientUtil.actionErrorCallback('login', this.stateCenter.callbackList)(zego_entity_1.sdkErrorList.LOGIN_TIMEOUT);
            }
            return;
        }
        this.stateCenter.startConnceTime = new Date().getTime();
        console.warn('start connect', this.stateCenter.startConnceTime);
        // 如果websocket还未初始化或者还不是处于连接状态
        if (this.socketCenter.isDisConnect()) {
            this.logger.debug('zb.rh.tl need new websocket');
            try {
                // 若已经初始化，但是还不是连接状态，先清除置为null
                this.socketCenter.closeSocket();
                // 建立websocket连接
                this.logger.debug('zb.rh.tl new websocket');
                this.socketCenter.createSocket(this.stateCenter.server);
                this.socketCenter.registerRouter('login', function (msg, seq) {
                    _this.handleLoginRsp(msg, seq);
                });
                this.socketCenter.closeHandler(function (err) {
                    _this.socketCenter.closeSocket();
                    _this.closeHandler(err);
                });
                this.socketCenter.openHandler(function () {
                    _this.openHandler();
                });
            }
            catch (e) {
                this.logger.error("zb.rh.tl websocket err:" + e);
            }
        }
        else { // websocket已建立成功
            var bodyData = this.loginBodyData();
            this.logger.info('zb.rh.tl use current websocket and sent login');
            this.socketCenter.sendMessage('login', bodyData);
        }
        //settimeout
        this.stateCenter.tryLoginTimer = setTimeout(function () {
            _this.tryLogin();
        }, zego_entity_1.TRY_LOGIN_INTERVAL[this.stateCenter.tryLoginCount % zego_entity_1.MAX_TRY_LOGIN_COUNT]);
        this.logger.info('zb.rh.tl call success');
    };
    /*
     *    "zb.rh.hlr": "ZegoClient.base.RoomHandler.handleLoginRsp",
     */
    RoomHandler.prototype.handleLoginRsp = function (msg, cmdSeq) {
        this.logger.debug("zb.rh.hlr call");
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.trylogin) {
            this.logger.error("zb.rh.hlr state error");
            return;
        }
        else if (msg.header.seq !== cmdSeq) {
            this.logger.error("zb.rh.hlr in wrong seq, local=", cmdSeq, ",recv=", msg.header.seq);
            return;
        }
        else if (msg.body.err_code !== 0) {
            this.handleLoginFail(msg);
            this.logger.error("zb.rh.hlr server error=", msg.body.err_code);
            return;
        }
        else {
            this.handleLoginSuccess(msg);
            this.logger.info("zb.rh.hlr call success.");
        }
    };
    /*
     *    "zb.rh.hlf": "ZegoClient.base.RoomHandler.handleLoginFail",
     */
    //登录失败回调
    RoomHandler.prototype.handleLoginFail = function (msg) {
        this.logger.debug("zb.rh.hlf call");
        if (client_util_1.ClientUtil.isKeepTryLogin(msg.body.err_code)) {
            this.logger.warn("zb.rh.hlf KeepTry true");
            return;
        }
        //stop
        var lastRunState = this.stateCenter.lastRunState;
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
        this.resetRoom();
        var err = client_util_1.ClientUtil.getServerError(msg.body.err_code);
        if (lastRunState === zego_entity_1.ENUM_RUN_STATE.login) {
            //relogin fail, not by user
            this.logger.info('zb.rh.hlf callback disconnect');
            this.onDisconnect(err);
        }
        else {
            //trylogin fail, call by user
            this.logger.info('zb.rh.hlf callback error');
            client_util_1.ClientUtil.actionErrorCallback('login', this.stateCenter.callbackList)(err);
        }
        this.logger.debug("zb.rh.hlf call success");
    };
    /*
     *    "zb.rh.hls": "ZegoClient.base.RoomHandler.handleLoginSuccess",
     */
    //登录成功回调
    RoomHandler.prototype.handleLoginSuccess = function (msg) {
        this.stateCenter.startloginSucTime = new Date().getTime();
        console.warn('login suc', this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime);
        this.logger.info("zb.rh.hls call");
        //enter login
        var lastRunState = this.stateCenter.lastRunState;
        this.setRunState(zego_entity_1.ENUM_RUN_STATE.login);
        this.stateCenter.userid = msg.body.user_id;
        this.stateCenter.sessionid = msg.body.session_id;
        this.stateCenter.anchor_info = msg.body.anchor_info || this.stateCenter.anchor_info;
        //set log
        this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, zego_entity_1.PROTO_VERSION);
        if (msg.body.config_info) {
            this.logger.setRemoteLogLevel(msg.body.config_info.log_level);
            if (msg.body.config_info.log_url != "")
                this.logger.openLogServer(msg.body.config_info.log_url);
        }
        //get time stamp & window
        if (msg.body.ret_timestamp != undefined && typeof msg.body.ret_timestamp == "string") {
            var serverTime = parseFloat(msg.body.ret_timestamp);
            if (serverTime == 0) {
                this.stateCenter.serverTimeOffset = 0;
            }
            else {
                this.stateCenter.serverTimeOffset = msg.body.ret_timestamp - (new Date()).getTime();
            }
        }
        if (msg.body.bigim_time_window && typeof msg.body.bigim_time_window == "number") {
            this.stateCenter.bigimTimeWindow = msg.body.bigim_time_window;
        }
        if (msg.body.dati_time_window && typeof msg.body.dati_time_window == "number") {
            this.stateCenter.datiTimeWindow = msg.body.dati_time_window;
        }
        //stop trylogin
        this.resetTryLogin();
        this.loginSuccessCallBack(lastRunState, msg);
    };
    /*
    *    "zb.rh.oh": "ZegoClient.base.RoomHandler.openHandler",
    */
    RoomHandler.prototype.openHandler = function () {
        // websocket连接已经打开
        // 注册onmessage函数，处理服务的发过来的消息，该函数只调用一次
        this.logger.info('zb.rh.oh websocket.onpen call');
        this.socketCenter.responseHandler();
        // 发送消息
        var bodyData = this.loginBodyData();
        this.logger.info('zb.rh.oh websocket.onpen send login');
        this.stateCenter.startloginTime = new Date().getTime();
        console.warn('start login', this.stateCenter.startloginTime, this.stateCenter.startloginTime - this.stateCenter.startConnceTime);
        this.socketCenter.sendMessage('login', bodyData);
        this.logger.debug('zb.rh.oh websocket.onpen call success');
    };
    /*
    *    "zb.rh.oc": "ZegoClient.base.RoomHandler.closeHandler",
   */
    RoomHandler.prototype.closeHandler = function (e) {
        this.logger.info("zb.rh.ws.oc msg=" + JSON.stringify(e));
        if (this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.logout) {
            if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.trylogin && this.stateCenter.tryLoginCount <= zego_entity_1.MAX_TRY_LOGIN_COUNT) {
                //trylogin --> trylogin
                this.logger.info("zb.rh.ws.oc is called because of try login");
            }
            else if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.login) {
                //login --> trylogin
                this.logger.info("zb.rh.ws.oc is called because of network broken, try again");
                this.setRunState(zego_entity_1.ENUM_RUN_STATE.trylogin);
                this.resetTryLogin();
                this.tryLogin();
            }
            else {
                //unknown
                this.logger.error("zb.rh.ws.oc out of think!!!");
                this.setRunState(zego_entity_1.ENUM_RUN_STATE.logout);
                this.resetRoom();
                this.onDisconnect(zego_entity_1.sdkErrorList.UNKNOWN);
            }
        }
        else {
            //* --> logout
            this.logger.info("zb.rh.ws.oc onclose logout flow call websocket.close");
        }
    };
    /*
   *    "zb.rh.lo": "ZegoClient.base.RoomHandler.logout",
  */
    RoomHandler.prototype.logout = function () {
        this.logger.debug("zb.rh.lo call");
        if (this.stateCenter.runState === zego_entity_1.ENUM_RUN_STATE.logout) {
            this.logger.warn("zb.rh.lo at logout");
            return false;
        }
        this.resetRoom();
        this.logger.info("zb.rh.lo call success");
        return true;
    };
    /*
  *    "zb.rh.su": "ZegoClient.base.RoomHandler.setUserStateUpdate",
 */
    RoomHandler.prototype.setUserStateUpdate = function (update) {
        this.logger.debug("zb.rh.su call");
        if (typeof update !== "boolean") {
            this.logger.info("zb.rh.su param error");
            return false;
        }
        this.stateCenter.userStateUpdate = update;
        this.logger.info("zb.rh.su call success " + update);
        return true;
    };
    /*
    *    "zb.rh.ful": "ZegoClient.base.RoomHandler.fetchUserList",
   */
    // 拉取服务端user信息
    RoomHandler.prototype.fetchUserList = function () {
        this.logger.debug("zb.rh.ful call");
        if (this.stateCenter.userQuerying) {
            this.logger.warn("zb.rh.ful is already querying");
            return;
        }
        this.stateCenter.userQuerying = true;
        this.stateCenter.userTempList = [];
        zego_entity_1.ROOMVERSION === 'V1' ? this.fetchUserListWithPage(0) : this.fetchUserListWithPageV2(0);
        this.logger.info("zb.rh.ful the first time call");
    };
    /*
    *    "zb.rh.fulwp": "ZegoClient.base.RoomHandler.fetchUserListWithPage",
   */
    //分页拉取user list
    RoomHandler.prototype.fetchUserListWithPageV2 = function (userIndex) {
        var _this = this;
        this.logger.debug("zb.rh.fulwp call");
        this.socketCenter.registerRouter('user_list_v2', function (msg) {
            _this.handleFetchUserListRspV2(userIndex, msg);
        });
        // 发送消息
        this.socketCenter.sendMessage('user_list_v2', {
            marker: userIndex === 0 ? '' : (userIndex + ''),
            mode: 0,
            limit: 100
        });
        this.logger.info("zb.rh.fulwp call success");
    };
    /*
   *    "zb.rh.fulwp": "ZegoClient.base.RoomHandler.fetchUserListWithPage",
  */
    //分页拉取user list
    RoomHandler.prototype.fetchUserListWithPage = function (userIndex) {
        var _this = this;
        this.logger.debug("zb.rh.fulwp call");
        this.socketCenter.registerRouter('user_list', function (msg) {
            _this.handleFetchUserListRsp(msg);
        });
        // 发送消息
        this.socketCenter.sendMessage('user_list', {
            "user_index": userIndex,
            "sort_type": 0
        });
        this.logger.info("zb.rh.fulwp call success");
    };
    /*
    *    "zb.rh.hfulr": "ZegoClient.base.RoomHandler.handleFetchUserListRsp",
   */
    RoomHandler.prototype.handleFetchUserListRspV2 = function (currentIndex, msg) {
        this.logger.debug("zb.rh.hfulr call");
        if (msg.body.err_code != 0) {
            this.stateCenter.userQuerying = false;
            this.logger.info("zb.rh.hfulr fetch error " + msg.body.err_code);
            return;
        }
        //set userseq
        if (!this.stateCenter.userStateUpdate) {
            return;
        }
        this.stateCenter.userTempList = this.stateCenter.userTempList.concat(msg.body.user_baseinfos);
        // this.logger.debug("zb.rh.hfulr server user_list " + msg.body.user_baseinfos);
        var serverIndex = msg.body.marker;
        if (currentIndex != serverIndex) {
            this.logger.warn("zb.rh.hfulr fetch another page");
            this.fetchUserListWithPageV2(currentIndex + 1);
            return;
        }
        this.stateCenter.userSeq = msg.body.server_user_seq;
        this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < this.stateCenter.userTempList.length; i++) {
            var user_info = {
                "idName": this.stateCenter.userTempList[i].id_name,
                "nickName": this.stateCenter.userTempList[i].nick_name,
                "role": this.stateCenter.userTempList[i].role
            };
            user_list.push(user_info);
        }
        this.stateCenter.userQuerying = false;
        this.onGetTotalUserList(this.stateCenter.roomid, user_list);
        this.stateCenter.userTempList = [];
        this.logger.info("zb.rh.hfulr call success user_list " + user_list + " count " + user_list.length);
    };
    /*
    *    "zb.rh.hfulr": "ZegoClient.base.RoomHandler.handleFetchUserListRsp",
   */
    RoomHandler.prototype.handleFetchUserListRsp = function (msg) {
        this.logger.debug("zb.rh.hfulr call");
        if (msg.body.err_code != 0) {
            this.stateCenter.userQuerying = false;
            this.logger.info("zb.rh.hfulr fetch error " + msg.body.err_code);
            return;
        }
        //set userseq
        if (!this.stateCenter.userStateUpdate) {
            return;
        }
        this.stateCenter.userTempList = this.stateCenter.userTempList.concat(msg.body.user_baseinfos);
        // this.logger.debug("zb.rh.hfulr server user_list " + msg.body.user_baseinfos);
        var currentIndex = msg.body.ret_user_index;
        var serverIndex = msg.body.server_user_index;
        if (currentIndex != serverIndex) {
            this.logger.warn("zb.rh.hfulr fetch another page");
            this.fetchUserListWithPage(currentIndex + 1);
            return;
        }
        this.stateCenter.userSeq = msg.body.server_user_seq;
        this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < this.stateCenter.userTempList.length; i++) {
            var user_info = {
                "idName": this.stateCenter.userTempList[i].id_name,
                "nickName": this.stateCenter.userTempList[i].nick_name,
                "role": this.stateCenter.userTempList[i].role
            };
            user_list.push(user_info);
        }
        this.stateCenter.userQuerying = false;
        this.onGetTotalUserList(this.stateCenter.roomid, user_list);
        this.stateCenter.userTempList = [];
        this.logger.info("zb.rh.hfulr call success user_list " + user_list + " count " + user_list.length);
    };
    /*
    *    "zb.rh.hlor": "ZegoClient.base.RoomHandler.handleLogoutRsp",
     */
    RoomHandler.prototype.handleLogoutRsp = function (msg) {
        this.logger.debug("zb.rh.hlor result=", msg.body.err_code);
    };
    /*
   *    "zb.rh.hpus": "ZegoClient.base.RoomHandler.handlePushUserStateUpdateMsg",
    */
    RoomHandler.prototype.handlePushUserStateUpdateMsg = function (msg) {
        this.logger.info("zb.rh.hpus call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.rh.hpus not login");
            return;
        }
        if (!this.stateCenter.userStateUpdate) {
            this.logger.error("zb.rh.hpus no userStateUpdate flag");
            return;
        }
        if (this.stateCenter.userSeq + msg.body.user_actions.length !== msg.body.user_list_seq) {
            this.logger.warn("zb.rh.hpus fetch new userlist " + this.stateCenter.userSeq, +" server " + msg.body.user_list_seq);
            this.fetchUserList();
            return;
        }
        this.stateCenter.userSeq = msg.body.user_list_seq;
        this.logger.debug("zb.rh.hpus push userSeq " + this.stateCenter.userSeq);
        var user_list = [];
        for (var i = 0; i < msg.body.user_actions.length; i++) {
            var user_info = {
                "action": msg.body.user_actions[i].Action,
                "idName": msg.body.user_actions[i].IdName,
                "nickName": msg.body.user_actions[i].NickName,
                "role": msg.body.user_actions[i].Role,
                "loginTime": msg.body.user_actions[i].LoginTime
            };
            user_list.push(user_info);
        }
        this.onUserStateUpdate(msg.body.room_id, user_list);
        this.logger.info("zb.rh.hpus call success");
    };
    RoomHandler.prototype.onUserStateUpdate = function (roomId, userList) {
    };
    return RoomHandler;
}());
exports.RoomHandler = RoomHandler;


/***/ }),

/***/ "./sdk/common/clientBase/socketCenter.ts":
/*!***********************************************!*\
  !*** ./sdk/common/clientBase/socketCenter.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var SocketCenter = /** @class */ (function () {
    function SocketCenter(logger, stateCenter) {
        var _this = this;
        this.cmdSeq = 0;
        this.responseRouters = {};
        this.logger = logger;
        this.stateCenter = stateCenter;
        this.responseRouters = {
            'push_kickout': function (msg) {
                _this.handlePushKickout(msg);
            },
            'push_custommsg': function (msg) {
                _this.handlePushCustomMsg(msg);
            },
            'push_im_chat': function (msg) {
                _this.handlePushRoomMsg(msg);
            },
            'push_userlist_update': function (msg) {
                _this.handlePushUserStateUpdateMsg(msg);
            },
            'push_merge_message': function (msg) {
                _this.handlePushMergeMsg(msg);
            },
            'trans': function (msg) {
                _this.handleTransRsp(msg);
            },
            'push_trans': function (msg) {
                _this.handlePushTransMsg(msg);
            }
        };
    }
    /*
     *    "hpk.0": "ZegoClient.handlePushKickout",
     */
    SocketCenter.prototype.handlePushKickout = function (msg) {
    };
    SocketCenter.prototype.handlePushCustomMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushRoomMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushUserStateUpdateMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushMergeMsg = function (msg) {
    };
    SocketCenter.prototype.handlePushTransMsg = function (msg) {
    };
    SocketCenter.prototype.handleBigImMsgRsp = function (msg) {
    };
    /*
     *    "zb.sc.htr": "ZegoClient.base.SocketCenter.handleTransRsp",
     *
     */
    //trans回包
    SocketCenter.prototype.handleTransRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.sc.htr not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error("zb.sc.htr trans send error " + msg.body.err_code);
            return;
        }
        var type = msg.body.trans_type;
        if (!this.stateCenter.transSeqMap[type]) {
            this.logger.error("zb.sc.htr cannot match send info");
            return;
        }
        //update seq
        this.stateCenter.transSeqMap[type].seq = msg.body.trans_seq;
        this.logger.debug("zb.sc.htr trans " + type + " seq " + msg.body.trans_seq);
    };
    SocketCenter.prototype.handleBizChannelRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                sendData.success(msg.header.seq, msg.body.cmd, msg.body.rsp_body);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(msg.body.err_code, msg.header.seq, msg.body.rsp_body);
            }
        }
    };
    //注册cmd回调事件
    SocketCenter.prototype.registerRouter = function (name, callBack) {
        this.responseRouters[name] = callBack;
    };
    SocketCenter.prototype.getSocket = function (server) {
        return null;
    };
    // 获取全局参数对象header
    SocketCenter.prototype.getHeaderV2 = function (cmd) {
        var header = {
            'Protocol': 'req_v2',
            'cmd': cmd,
            'appid': this.stateCenter.appid,
            'seq': ++this.cmdSeq,
            'user_id': this.stateCenter.userid,
            'session_id': this.stateCenter.sessionid || '',
            'room_id': this.stateCenter.roomid || ''
        };
        return header;
    };
    // 获取全局参数对象header
    SocketCenter.prototype.getHeader = function (cmd) {
        return {
            'Protocol': 'req',
            'cmd': cmd,
            'appid': this.stateCenter.appid,
            'seq': ++this.cmdSeq,
            'user_id': this.stateCenter.userid,
            'session_id': this.stateCenter.sessionid || '',
            'room_id': this.stateCenter.roomid || '',
        };
    };
    /*
     *    "zb.sc.sm": "ZegoClient.base.SocketCenter.sendMessage",
     *
     */
    SocketCenter.prototype.sendMessage = function (cmd, body, success, error) {
        this.logger.debug("zb.sc.sm call " + cmd);
        if (this.isDisConnect()) {
            this.logger.error("zb.sc.sm error  " + cmd);
            return -1;
        }
        var header = zego_entity_1.ROOMVERSION === 'V1' ? this.getHeader(cmd) : this.getHeaderV2(cmd);
        var data = {
            "header": header,
            "body": body
        };
        success == undefined && (success = null);
        error == undefined && (error = null);
        if (success != null || error != null) {
            var cmdData = {
                data: data,
                seq: header.seq,
                deleted: false,
                time: Date.parse(new Date() + ''),
                success: success,
                error: error,
            };
            var cmdDataNode = this.stateCenter.sendCommandList.push(cmdData);
            this.stateCenter.sendCommandMap[cmdData.seq] = cmdDataNode;
        }
        this.websocket.send(JSON.stringify(data));
        this.logger.debug("zb.sc.sm success");
        return header.seq;
    };
    /*
     *    "zb.sc.scm": "ZegoClient.base.SocketCenter.sendCustomMessage"
     */
    //发送带回调消息
    SocketCenter.prototype.sendCustomMessage = function (cmd, body, success, error) {
        this.logger.debug("zb.sc.scm call");
        if (this.isDisConnect()) {
            this.logger.error("zb.sc.scm error");
            return false;
        }
        var header = zego_entity_1.ROOMVERSION === 'V1' ? this.getHeader(cmd) : this.getHeaderV2(cmd);
        var data = {
            "header": header,
            "body": body,
        };
        var dataBuffer = JSON.stringify(data);
        if (success == undefined)
            success = null;
        if (error == undefined)
            error = null;
        var cmdData = {
            data: data,
            seq: header.seq,
            deleted: false,
            time: Date.parse(new Date() + ''),
            success: success,
            error: error,
        };
        var cmdDataNode = this.stateCenter.sendDataList.push(cmdData);
        this.stateCenter.sendDataMap[cmdData.seq] = cmdDataNode;
        this.websocket.send(dataBuffer);
        this.logger.debug("zb.sc.scm success seq: ", header.seq);
        return true;
    };
    SocketCenter.prototype.isDisConnect = function () {
        return !this.websocket || this.websocket.readyState !== 1;
    };
    /*
    *    "zb.sc.cs": "ZegoClient.base.SocketCenter.closeSocket"
    */
    SocketCenter.prototype.closeSocket = function () {
        if (this.websocket) {
            this.logger.info('zb.sc.cs close websocket');
            this.websocket.onclose = null;
            this.websocket.onerror = null;
            this.websocket.close();
            this.websocket = null;
        }
    };
    SocketCenter.prototype.createSocket = function (server) {
        this.websocket = this.getSocket(server);
    };
    SocketCenter.prototype.openHandler = function (hander) {
        this.websocket.onopen = hander;
    };
    /*
    *    "zb.sc.ch": "ZegoClient.base.SocketCenter.closeHandler"
    */
    SocketCenter.prototype.closeHandler = function (hander) {
        this.websocket.onclose = hander;
    };
    /*
    *    "zb.sc.ws.oe": "ZegoClient.base.SocketCenter.errorHandler"
    */
    SocketCenter.prototype.errorHandler = function () {
        var _this = this;
        this.websocket.onerror = function (e) {
            _this.logger.error("zb.sc.oe msg=" + JSON.stringify(e));
        };
    };
    /*
    *    "zb.sc.crp": "ZegoClient.base.SocketCenter.checkResponse"
    */
    // 被logincenter 覆盖
    SocketCenter.prototype.checkResponse = function (msg) {
        if (msg.header.appid !== this.stateCenter.appid ||
            msg.header.session_id !== this.stateCenter.sessionid ||
            msg.header.user_id !== this.stateCenter.userid ||
            msg.header.room_id !== this.stateCenter.roomid ||
            this.stateCenter.runState !== zego_entity_1.ENUM_RUN_STATE.login) {
            this.logger.error("zb.sc.crp check session fail.");
            return true;
        }
        else {
            return false;
        }
    };
    /*
    *    "zb.sc.ws.rph: "ZegoClient.base.SocketCenter.responseHandler"
    */
    SocketCenter.prototype.responseHandler = function () {
        var _this = this;
        this.websocket.onmessage = function (e) {
            var msg = JSON.parse(e.data);
            _this.logger.info("zb.sc.ws.rph jsonmsg= ", msg.header.cmd);
            _this.logger.info("zb.sc.ws.rph jsonmsg= ", e.data);
            if (msg.header.cmd === 'login') {
                _this.responseRouters['login'](msg, _this.cmdSeq);
                return;
            }
            else if (msg.header.cmd === 'logout') {
                _this.responseRouters['logout'](msg, _this.cmdSeq);
                return;
            }
            if (!_this.stateCenter.isLogin()) {
                _this.logger.warn("zb.sc.ws.rph  already logout");
                return;
            }
            if (_this.checkResponse(msg)) {
                _this.logger.error("zb.sc.ws.rph check session fail.");
                return;
            }
            //检查消息回包
            _this.handleSendCommandMsgRsp(msg);
            _this.logger.info("zb.sc.ws.rph cmd=" + msg.header.cmd + ",function=" + !!_this.responseRouters[msg.header.cmd]);
            _this.responseRouters[msg.header.cmd] && _this.responseRouters[msg.header.cmd](msg);
            // switch (msg.header.cmd) {
            //   case 'hb':
            //     this.handleHeartbeatRsp(msg);
            //     break;
            //   case 'logout':
            //     this.handleLogoutRsp(msg);
            //     break;
            //   case 'custommsg':
            //     this.handleSendCustomMsgRsp(msg);
            //     break;
            //   case 'stream_info':
            //     this.handleFetchStreamListRsp(msg);
            //     break;
            //   case 'push_custommsg':
            //     this.handlePushCustomMsg(msg);
            //     break;
            //   case 'push_stream_update':
            //     this.handlePushStreamUpdateMsg(msg);
            //     break;
            //   case 'push_kickout':
            //     this.handlePushKickout(msg);
            //     break;
            //   case 'stream_url':?-wx
            //     this.handleFetchStreamUrlRsp(msg);
            //     break;
            //   case 'stream_publish':?-wx
            //     this.handleFetchStreamPublishUrlRsp(msg);
            //     break;
            //   case 'webrtc_url':
            //     this.handleFetchWebRtcUrlRsp(msg);
            //     break;
            //   case 'im_chat':
            //     this.handleSendRoomMsgRsp(msg);
            //     break;
            //   case 'push_im_chat':
            //     this.handlePushRoomMsg(msg);
            //     break;
            //   case 'push_userlist_update':
            //     this.handlePushUserStateUpdateMsg(msg);
            //     break;
            //   case 'user_list':
            //     this.handleFetchUserListRsp(msg);
            //     break;
            //   case 'push_signal':
            //     this.handlePushSignalMsg(msg);
            //     break;
            //   case 'stream':
            //     this.handleStreamUpdateRsp(msg);
            //     break;
            //   case 'trans':
            //     this.handleTransRsp(msg);
            //     break;
            //   case 'trans_fetch':
            //     this.handleFetchTransRsp(msg);
            //     break;
            //   case 'push_trans':
            //     this.handlePushTransMsg(msg);
            //     break;
            //   case 'push_merge_message':
            //     this.handlePushMergeMsg(msg);
            //     break;
            // }
        };
    };
    /*
   *    "zb.sc.hscmr: "ZegoClient.base.SocketCenter.handleSendCommandMsgRsp"
   */
    SocketCenter.prototype.handleSendCommandMsgRsp = function (msg) {
        this.logger.debug("zb.sc.hscmr call");
        var sendDataNode = this.stateCenter.sendCommandMap[msg.header.seq];
        var sendData;
        if (sendDataNode != null) {
            sendData = sendDataNode._data;
            if (sendData.data.header.cmd == "login") {
                this.logger.debug("zb.sc.hscmr don't check " + sendData.data.header.cmd);
            }
            else if (sendData.data.header.cmd == "relay") {
                this.handleRelayRspCallback(msg, sendData);
            }
            else if (sendData.data.header.cmd == "bigim_chat") {
                this.handleBigImRspCallback(msg, sendData);
            }
            else if (sendData.data.header.cmd == "biz_channel") {
                this.handleBizChannelRspCallback(msg, sendData);
            }
            else if (msg.body.err_code === 0) {
                sendData.success != null && sendData.success(msg.header.seq);
            }
            else {
                sendData.error != null && sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
            delete this.stateCenter.sendCommandMap[msg.header.seq];
            this.stateCenter.sendCommandList.remove(sendDataNode);
        }
        this.logger.debug("zb.sc.hscmr call success");
    };
    SocketCenter.prototype.handleRelayRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                sendData.success(msg.header.seq, msg.body.relay_result);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    };
    SocketCenter.prototype.handleBigImRspCallback = function (msg, sendData) {
        if (msg.body.err_code === 0) {
            if (sendData.success != null) {
                //should be sendData.success callback
                this.handleBigImMsgRsp(msg);
            }
        }
        else {
            if (sendData.error != null) {
                sendData.error(client_util_1.ClientUtil.getServerError(msg.body.err_code), msg.header.seq);
            }
        }
    };
    return SocketCenter;
}());
exports.SocketCenter = SocketCenter;


/***/ }),

/***/ "./sdk/common/clientBase/stateCenter.ts":
/*!**********************************************!*\
  !*** ./sdk/common/clientBase/stateCenter.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var zego_extern_1 = __webpack_require__(/*! ../zego.extern */ "./sdk/common/zego.extern.ts");
var StateCenter = /** @class */ (function () {
    function StateCenter() {
        this.testEnvironment = false;
        this.third_token = '';
        this.pullLimited = true;
        this.configOK = false;
        this.roomCreateFlag = 1;
        this.runState = zego_entity_1.ENUM_RUN_STATE.logout;
        this.lastRunState = zego_entity_1.ENUM_RUN_STATE.logout;
        this.callbackList = {};
        this.streamList = [];
        this.publishStreamList = {};
        //用户相关
        this.userQuerying = false;
        this.userTempList = [];
        this.userSeq = 0;
        this.anchor_info = {
            anchor_id: "",
            anchor_id_name: "",
            anchor_nick_name: ""
        };
        //command check timout
        this.sendCommandMap = {};
        this.sendCommandList = new zego_entity_1.LinkedList();
        this.sendDataMap = {};
        this.sendDataList = new zego_entity_1.LinkedList();
        this.joinLiveCallbackMap = {};
        this.joinLiveRequestMap = {};
        this.streamUrlMap = {};
        this.cmdCallback = {};
        //x消息相关
        this.transSeqMap = {};
        this.realyMessageList = [];
        this.relayTimer = null;
        this.bigImLastTimeIndex = 0;
        this.bigIMmessageList = [];
        this.bigImCallbackMap = {};
        this.bigImTimer = null;
        this.serverTimeOffset = 0;
        this.datiTimeWindow = 0;
        this.bigimTimeWindow = 0;
        this.bigImMessageList = [];
        this.tryLoginCount = 0;
        this.tryLoginTimer = null;
        this.heartbeatTimer = null;
        this.sendDataCheckTimer = null;
        this.sendDataCheckInterval = 2000; //检查发送消息间隔
        this.sendDataTimeout = 5 * 1000; //发送消息超时
        this.sendDataDropTimeout = 10 * 1000; //丢弃过期消息的超时时间
        this.sendDataCheckOnceCount = 100; //每次处理最大的超时包
        this.sendRoomMsgTime = 0; //上一次发送房间消息时间
        this.SendRoomMsgInterval = 500; //发送房间消息最多500毫秒发送一次
        this.cmdSeq = 0;
    }
    //是否登录
    StateCenter.prototype.isLogin = function () {
        return this.runState === zego_entity_1.ENUM_RUN_STATE.login;
    };
    //requestId
    StateCenter.prototype.getRequestId = function () {
        return this.idName + "-" + zego_extern_1.getSeq();
    };
    StateCenter.prototype.getSignalCmdContent = function (requestId, dest_id_name, result) {
        var data = {
            "request_id": requestId,
            "room_id": this.roomid,
            "from_userid": this.idName,
            "from_username": this.nickName,
            "to_userid": dest_id_name
        };
        if (result != undefined) {
            data["result"] = result;
        }
        return JSON.stringify(data);
    };
    return StateCenter;
}());
exports.StateCenter = StateCenter;


/***/ }),

/***/ "./sdk/common/clientBase/streamHandler.ts":
/*!************************************************!*\
  !*** ./sdk/common/clientBase/streamHandler.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ../zego.entity */ "./sdk/common/zego.entity.ts");
var client_util_1 = __webpack_require__(/*! ../../util/client-util */ "./sdk/util/client-util.ts");
var StreamHandler = /** @class */ (function () {
    function StreamHandler(logger, stateCenter, socketCenter) {
        this.logger = logger;
        this.socketCenter = socketCenter;
        this.stateCenter = stateCenter;
    }
    //空实现 被sdk覆盖
    StreamHandler.prototype.setCDNInfo = function (streamInfo, streamItem) {
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onStreamUpdated = function (type, streamList) {
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onStreamExtraInfoUpdated = function (streamList) {
    };
    /*
    *    "zb.sh.hss": "ZegoClient.base.StreamHandler.handleStreamStart",
     */
    StreamHandler.prototype.handleStreamStart = function (lastRunState, msg) {
        var _this = this;
        this.stateCenter.streamQuerying = false;
        this.socketCenter.registerRouter('stream', function (msg) {
            _this.handleStreamUpdateRsp(msg);
        });
        this.socketCenter.registerRouter('push_stream_update', function (msg) {
            _this.handlePushStreamUpdateMsg(msg);
        });
        if (lastRunState == zego_entity_1.ENUM_RUN_STATE.login) {
            this.logger.info("zb.sh.hss recover from disconnect so call streamupdate");
            //relogin and stream update callback
            this.handleFullUpdateStream(msg.body.stream_seq, msg.body.stream_info || []);
        }
        else {
            this.logger.info("zb.sh.hss success callback user");
            //login and callback
            this.stateCenter.streamList = (msg.body.stream_info || []);
            this.stateCenter.streamSeq = msg.body.stream_seq;
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
                //check whether stream contain self
                if (this.stateCenter.streamList[i].anchor_id_name == this.stateCenter.idName) {
                    //delete this stream
                    this.updateStreamInfo(this.stateCenter.streamList[i].stream_id, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd);
                    this.stateCenter.streamList.splice(i, 1);
                }
            }
            var callbackStreamList = this.makeCallbackStreamList(this.stateCenter.streamList);
            client_util_1.ClientUtil.actionSuccessCallback('login', this.stateCenter.callbackList)(callbackStreamList);
        }
    };
    //空实现 被sdk覆盖
    StreamHandler.prototype.onPublishStateUpdate = function (type, streamId, error) {
    };
    /*
   *    "zb.sh.usi": "ZegoClient.base.StreamHandler.updateStreamInfo",
   */
    //流更新信令  退出上次推的自己的流
    StreamHandler.prototype.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
        var _this = this;
        if (stream_extra_info === void 0) { stream_extra_info = ''; }
        this.logger.debug("zb.sh.usi call");
        var extra_info = stream_extra_info;
        var data = {
            "stream_id": streamid,
            "extra_info": extra_info
        };
        var stream_msg = JSON.stringify(data);
        var bodyData = {
            "sub_cmd": cmd,
            "stream_msg": stream_msg
        };
        this.socketCenter.registerRouter('stream', function (msg) {
            _this.handleStreamUpdateRsp(msg);
        });
        this.socketCenter.sendMessage("stream", bodyData, undefined, error);
        this.logger.info("zb.sh.usi call success cmd " + cmd);
    };
    /*
   *    "zb.sh.hsur": "ZegoClient.base.StreamHandler.handleStreamUpdateRsp",
   */
    //流更新回包
    StreamHandler.prototype.handleStreamUpdateRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zb.sh.hsur not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.error("zb.sh.hsur stream update error " + msg.body.err_code);
            return;
        }
        this.logger.info("zb.sh.hsur stream seq " + this.stateCenter.streamSeq + " server seq " + msg.body.stream_seq);
        this.stateCenter.streamSeq = msg.body.stream_seq;
        //流删除时，publishStreamList已经删除了
        for (var i = 0; i < msg.body.stream_info.length; i++) {
            var streamid = msg.body.stream_info[i].stream_id;
            if (!this.stateCenter.publishStreamList[streamid]) {
                this.logger.info("hsur.0 stream is not exist");
                return;
            }
            if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing;
                this.onPublishStateUpdate(0, streamid, 0);
            }
        }
    };
    /*
   *    "zb.sh.hfslr": "ZegoClient.base.StreamHandler.handleFetchStreamListRsp",
   */
    StreamHandler.prototype.handleFetchStreamListRsp = function (msg) {
        this.logger.info("zb.sh.hfslr call");
        this.stateCenter.streamQuerying = false;
        if (msg.body.err_code !== 0) {
            this.logger.info("zb.sh.hfslr server error=", msg.body.err_code);
            return;
        }
        if (this.stateCenter.streamSeq === msg.body.stream_seq) {
            this.logger.info("zb.sh.hfslr same seq");
            return;
        }
        this.handleFullUpdateStream(msg.body.stream_seq, msg.body.stream_info);
        this.logger.debug("zb.sh.hfslr call success");
    };
    /*
    *    "zb.sh.hfus": "ZegoClient.base.StreamHandler.handleFullUpdateStream",
   */
    StreamHandler.prototype.handleFullUpdateStream = function (serverStreamSeq, serverStreamList) {
        var _this = this;
        this.logger.debug("zb.sh.hfus call");
        this.stateCenter.streamSeq = serverStreamSeq;
        this.logger.debug("zb.sh.hfus server seq " + this.stateCenter.streamSeq);
        client_util_1.ClientUtil.mergeStreamList(this.logger, this.stateCenter.idName, this.stateCenter.streamList, serverStreamList, function (addStreamList, delStreamList, updateStreamList) {
            if (addStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback addstream");
                _this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.added, _this.makeCallbackStreamList(addStreamList));
            }
            if (delStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback delstream");
                _this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.deleted, _this.makeCallbackStreamList(delStreamList));
            }
            if (updateStreamList.length !== 0) {
                _this.logger.debug("zb.sh.hfus callback updatestream");
                _this.onStreamExtraInfoUpdated(_this.makeCallbackStreamList(updateStreamList));
            }
        });
        this.logger.info("zb.sh.hfus call success");
    };
    /*
    *    "zb.sh.hpsum": "ZegoClient.base.StreamHandler.handlePushStreamUpdateMsg",
    */
    StreamHandler.prototype.handlePushStreamUpdateMsg = function (msg) {
        this.logger.info("zb.sh.hpsum call");
        if (!msg.body.stream_info || msg.body.stream_info.length === 0) {
            this.logger.info("zb.sh.hpsum, emtpy list");
            return;
        }
        if (msg.body.stream_info.length + this.stateCenter.streamSeq !== msg.body.stream_seq) {
            this.logger.info("zb.sh.hpsum call updatestream");
            this.fetchStreamList();
            return;
        }
        this.stateCenter.streamSeq = msg.body.stream_seq;
        switch (msg.body.stream_cmd) {
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.added:
                this.handleAddedStreamList(msg.body.stream_info);
                break;
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.deleted:
                this.handleDeletedStreamList(msg.body.stream_info);
                break;
            case zego_entity_1.ENUM_STREAM_UPDATE_CMD.updated:
                this.handleUpdatedStreamList(msg.body.stream_info);
                break;
        }
        this.logger.info("zb.sh.hpsum call success");
    };
    /*
   *    "zb.sh.hasl": "ZegoClient.base.StreamHandler.handleAddedStreamList",
   */
    StreamHandler.prototype.handleAddedStreamList = function (streamList) {
        this.logger.debug("zb.sh.hasl call");
        var addStreamList = [];
        var flag;
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("hdsl.0 have self stream added");
                continue;
            }
            flag = false;
            for (var j = 0; j < this.stateCenter.streamList.length; j++) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                addStreamList.push(streamList[i]);
            }
        }
        if (addStreamList.length !== 0) {
            this.logger.debug("zb.sh.hasl callback addstream");
            // this.stateCenter.streamList.concat(addStreamList);
            for (var k = 0; k < addStreamList.length; k++) {
                this.stateCenter.streamList.push(addStreamList[k]);
            }
            this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(addStreamList));
        }
        this.logger.info("zb.sh.hasl call success");
    };
    /*
     *    "zb.sh.hdsl": "ZegoClient.base.StreamHandler.handleDeletedStreamList",
    */
    StreamHandler.prototype.handleDeletedStreamList = function (streamList) {
        this.logger.debug("zb.sh.hdsl call");
        var delStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("zb.sh.hdsl have self stream deleted");
                continue;
            }
            for (var j = this.stateCenter.streamList.length - 1; j >= 0; j--) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    this.stateCenter.streamList.splice(j, 1);
                    delStreamList.push(streamList[i]);
                    break;
                }
            }
        }
        if (delStreamList.length !== 0) {
            this.logger.debug("zb.sh.hdsl callback delstream");
            this.onStreamUpdated(zego_entity_1.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(delStreamList));
        }
        this.logger.info("zb.sh.hdsl call");
    };
    /*
     *    "zb.sh.husl": "ZegoClient.base.StreamHandler.handleUpdatedStreamList",
    */
    StreamHandler.prototype.handleUpdatedStreamList = function (streamList) {
        this.logger.debug("zb.sh.husl call");
        var updateStreamList = [];
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].anchor_id_name == this.stateCenter.idName) {
                this.logger.debug("hsul.0 have self stream updated");
                continue;
            }
            for (var j = 0; j < this.stateCenter.streamList.length; j++) {
                if (streamList[i].stream_id === this.stateCenter.streamList[j].stream_id) {
                    if (streamList[i].extra_info !== this.stateCenter.streamList[j].extra_info) {
                        this.stateCenter.streamList[j] = streamList[i];
                        updateStreamList.push(streamList[i]);
                    }
                    break;
                }
            }
        }
        if (updateStreamList.length !== 0) {
            this.logger.debug("zb.sh.husl callback updatestream");
            this.onStreamExtraInfoUpdated(this.makeCallbackStreamList(updateStreamList));
        }
        this.logger.info("zb.sh.husl call success");
    };
    /*
     *    "zb.sh.fsl": "ZegoClient.base.StreamHandler.fetchStreamList",
    */
    // 拉取服务端流信息
    StreamHandler.prototype.fetchStreamList = function () {
        this.logger.info("zb.sh.fsl call");
        // 不是处于登录状态，不让拉流
        if (this.stateCenter.isLogin()) {
            this.logger.info("zb.sh.fsl state error");
            return;
        }
        // 是否正处于拉流状态 false 为完成， true为正在拉流
        if (this.stateCenter.streamQuerying) {
            this.logger.info("zb.sh.fsl already doing");
            return;
        }
        this.stateCenter.streamQuerying = true;
        this.logger.debug("zb.sh.fsl send fetch request");
        var bodyData = {
            "reserve": 0
        };
        // 发送消息
        this.socketCenter.registerRouter('stream_info', this.handleFetchStreamListRsp);
        this.socketCenter.sendMessage('stream_info', bodyData);
        this.logger.debug("zb.sh.fsl call success");
    };
    StreamHandler.prototype.makeCallbackStreamList = function (streamList) {
        var callbackStreamList = [];
        if (streamList && streamList.length > 0) {
            for (var i = 0; i < streamList.length; i++) {
                var streamInfo = {
                    anchor_id_name: streamList[i].anchor_id_name,
                    stream_gid: streamList[i].stream_gid,
                    anchor_nick_name: streamList[i].anchor_nick_name,
                    extra_info: streamList[i].extra_info,
                    stream_id: streamList[i].stream_id,
                    urls_flv: '',
                    urls_rtmp: '',
                    urls_hls: '',
                    urls_https_flv: '',
                    urls_https_hls: ''
                };
                this.setCDNInfo(streamInfo, streamList[i]);
                callbackStreamList.push(streamInfo);
            }
        }
        return callbackStreamList;
    };
    /*
     *    "zb.sh.ums": "ZegoClient.base.StreamHandler.updateMixStream",
    */
    StreamHandler.prototype.updateMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        var _this = this;
        this.logger.info("zb.sh.ums call");
        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zb.sh.ums no mix stream info");
            return false;
        }
        if (mixStreamConfig.streamList.length == 0) {
            this.logger.error("zb.sh.ums no input stream");
            return false;
        }
        var req_body = {
            "id_name": this.stateCenter.idName,
            "live_channel": this.stateCenter.roomid,
            "appid": this.stateCenter.appid,
            "version": zego_entity_1.PROTO_VERSION
        };
        if (typeof mixStreamConfig.userData == "string" && mixStreamConfig.userData.length <= 10000) {
            req_body["UserData"] = mixStreamConfig.userData;
        }
        var mixInput = [];
        for (var i = 0; i < mixStreamConfig.streamList.length; i++) {
            var streamInfo = mixStreamConfig.streamList[i];
            var totalStreamId = streamInfo.streamId;
            if (this.stateCenter.testEnvironment) {
                totalStreamId = "zegotest-" + this.stateCenter.appid + "-" + streamInfo.streamId;
            }
            mixInput.push({
                stream_id: totalStreamId,
                rect: {
                    layer: i,
                    top: streamInfo.top,
                    left: streamInfo.left,
                    bottom: streamInfo.bottom,
                    right: streamInfo.right
                }
            });
        }
        req_body["MixInput"] = mixInput;
        var mixOutput = {};
        if (mixStreamConfig.outputStreamId != undefined) {
            if (this.stateCenter.testEnvironment) {
                mixOutput["stream_id"] = "zegotest-" + this.stateCenter.appid + "-" + mixStreamConfig.outputStreamId;
            }
            else {
                mixOutput["stream_id"] = mixStreamConfig.outputStreamId;
            }
        }
        else if (mixStreamConfig.outputUrl != undefined) {
            mixOutput["mixurl"] = mixStreamConfig.outputUrl;
        }
        if (mixStreamConfig.outputBitrate) {
            mixOutput["bitrate"] = mixStreamConfig.outputBitrate;
        }
        else {
            this.logger.error("zb.sh.ums no bitrate param");
            return false;
        }
        if (mixStreamConfig.outputFps) {
            mixOutput["fps"] = mixStreamConfig.outputFps;
        }
        else {
            this.logger.error("zb.sh.ums no fps param");
            return false;
        }
        if (mixStreamConfig.outputWidth) {
            mixOutput["width"] = mixStreamConfig.outputWidth;
        }
        else {
            this.logger.error("zb.sh.ums no width param");
            return false;
        }
        if (mixStreamConfig.outputHeight) {
            mixOutput["height"] = mixStreamConfig.outputHeight;
        }
        else {
            this.logger.error("zb.sh.ums no height param");
            return false;
        }
        if (mixStreamConfig.outputAudioConfig) {
            mixOutput["audio_enc_id"] = mixStreamConfig.outputAudioConfig;
        }
        if (mixStreamConfig.outputAudioBitrate) {
            mixOutput["audio_bitrate"] = mixStreamConfig.outputAudioBitrate;
        }
        if (mixStreamConfig.outputAudioChannels) {
            mixOutput["audio_channel_cnt"] = mixStreamConfig.outputAudioChannels;
        }
        if (mixStreamConfig.outputBgColor) {
            // mixOutput["output_bg_color"] = mixStreamConfig.outputBgColor;
            if (typeof mixStreamConfig.outputBgColor !== "string") {
                this.logger.error("zb.sh.ums param outputBgImage error");
                return false;
            }
            req_body["output_bg_color"] = mixStreamConfig.outputBgColor;
        }
        if (mixStreamConfig.outputBgImage) {
            // mixOutput["output_bg_image"] = mixStreamConfig.outputBgImage;
            if (typeof mixStreamConfig.outputBgImage !== "string" || !mixStreamConfig.outputBgImage.startsWith("preset-id://")) {
                this.logger.error("zb.sh.ums param outputBgImage error");
                return false;
            }
            req_body["output_bg_image"] = mixStreamConfig.outputBgImage;
        }
        if (this.stateCenter.testEnvironment) {
            mixOutput["testenv"] = 1;
        }
        else {
            mixOutput["testenv"] = 0;
        }
        req_body["MixOutput"] = [mixOutput];
        var body = {
            channel: "zeus",
            cmd: "start_mix",
            req_body: JSON.stringify(req_body)
        };
        this.logger.debug("zb.sh.ums send command");
        this.socketCenter.sendMessage("biz_channel", body, function (seq, cmd, rspBody) {
            _this.logger.debug("zb.sh.ums receive message");
            var prefix = "zegotest-" + _this.stateCenter.appid + "-";
            if (rspBody.length == 0) {
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + 1));
                }
                return;
            }
            var data = JSON.parse(rspBody);
            var mixPlayInfoList = [];
            var streamId = mixStreamConfig.outputStreamId;
            for (var i = 0; i < data.play.length; i++) {
                var mixPlayInfo = {
                    rtmpUrls: null,
                    hlsUrls: null,
                    flvUrls: null
                };
                if (_this.stateCenter.testEnvironment && streamId.startsWith(prefix)) {
                    streamId = streamId.slice(prefix.length);
                }
                if (data.play[i].rtmp_url && data.play[i].rtmp_url.length > 0) {
                    mixPlayInfo["rtmpUrls"] = [data.play[i].rtmp_url];
                }
                if (data.play[i].hls_url && data.play[i].hls_url.length > 0) {
                    mixPlayInfo["hlsUrls"] = [data.play[i].hls_url];
                }
                if (data.play[i].hdl_url && data.play[i].hdl_url.length > 0) {
                    mixPlayInfo["flvUrls"] = [data.play[i].hdl_url];
                }
                mixPlayInfoList.push(mixPlayInfo);
            }
            ;
            if (successCallback) {
                successCallback(streamId, mixPlayInfoList);
            }
        }, function (error, seq, rspBody) {
            if (typeof error == "number") {
                _this.logger.debug("zb.sh.ums error: " + error);
                var nonExistsStreamId = [];
                if (error == 1000000150 && rspBody.length != 0) {
                    //no stream list
                    var data = JSON.parse(rspBody);
                    var prefix = "zegotest-" + _this.stateCenter.appid + "-";
                    for (var i = 0; i < data.non_exist_streams.length; i++) {
                        var totalStreamId = data.non_exist_streams[i];
                        if (_this.stateCenter.testEnvironment && totalStreamId.startsWith(prefix)) {
                            nonExistsStreamId.push(totalStreamId.slice(prefix.length));
                        }
                        else {
                            nonExistsStreamId.push(totalStreamId);
                        }
                    }
                }
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + error), nonExistsStreamId);
                }
            }
            else {
                _this.logger.debug("zb.sh.ums error code " + error.code);
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
        return true;
    };
    ;
    /*
    *    "zb.sh.sms": "ZegoClient.base.StreamHandler.stopMixStream",
   */
    //停止混流信令
    StreamHandler.prototype.stopMixStream = function (mixStreamConfig, successCallback, errorCallback) {
        this.logger.info("zb.sh.sms call");
        if (mixStreamConfig.outputStreamId == undefined && mixStreamConfig.outputUrl == undefined) {
            this.logger.error("zb.sh.sms no mix stream info");
            return false;
        }
        var req_body = {
            "id_name": this.stateCenter.idName,
            "live_channel": this.stateCenter.roomid,
            "appid": this.stateCenter.appid,
            "version": zego_entity_1.PROTO_VERSION
        };
        if (mixStreamConfig.outputStreamId != undefined) {
            if (this.stateCenter.testEnvironment) {
                req_body["stream_id"] = "zegotest-" + this.stateCenter.appid + "-" + mixStreamConfig.outputStreamId;
            }
            else {
                req_body["stream_id"] = mixStreamConfig.outputStreamId;
            }
        }
        else if (mixStreamConfig.outputUrl != undefined) {
            req_body["mixurl"] = mixStreamConfig.outputUrl;
        }
        var body = {
            channel: "zeus",
            cmd: "stop_mix",
            req_body: JSON.stringify(req_body)
        };
        this.socketCenter.sendMessage("biz_channel", body, function (seq, data) {
            if (successCallback) {
                successCallback();
            }
        }, function (error, seq) {
            if (typeof error == "number") {
                if (errorCallback) {
                    errorCallback(client_util_1.ClientUtil.getServerError(zego_entity_1.MIXSTREAM_ERROR_CODE + error));
                }
            }
            else {
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
        return true;
    };
    ;
    /*
    *    "zb.sh.usei": "ZegoClient.base.StreamHandler.updateStreamExtraInfo",
   */
    StreamHandler.prototype.updateStreamExtraInfo = function (streamid, extraInfo) {
        this.logger.info("zb.sh.usei call");
        if (!streamid) {
            this.logger.error("zb.sh.usei param error");
            return false;
        }
        if (typeof extraInfo != "string") {
            return false;
        }
        if (this.stateCenter.publishStreamList[streamid]) {
            this.stateCenter.publishStreamList[streamid].extra_info = extraInfo;
            if (this.stateCenter.publishStreamList[streamid].state >= zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveUpdate, extraInfo);
            }
        }
        return true;
    };
    return StreamHandler;
}());
exports.StreamHandler = StreamHandler;


/***/ }),

/***/ "./sdk/common/zego.datareport.ts":
/*!***************************************!*\
  !*** ./sdk/common/zego.datareport.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ZegoDataReport = /** @class */ (function () {
    function ZegoDataReport(log) {
        this.log = log;
        this.dataStatistics = {};
        this.logger = log;
    }
    ZegoDataReport.prototype.newReport = function (seq) {
        this.dataStatistics[seq] = {
            abs_time: Date.now(),
            time_consumed: 0,
            error: 0,
            events: [],
        };
    };
    ;
    ZegoDataReport.prototype.addMsgExt = function (seq, msg_ext) {
        if (!this.dataStatistics[seq]) {
            console.warn(seq + " not exist");
            return;
        }
        this.dataStatistics[seq].msg_ext = msg_ext;
    };
    ;
    /*
     *    "zd.es.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventStart = function (seq, event_name) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.es.0 no seq match");
            return;
        }
        else if (this.dataStatistics[seq].events == undefined) {
            this.logger.warn("zd.es.0 no events");
            return;
        }
        this.dataStatistics[seq].events.push({
            event: event_name,
            abs_time: Date.now(),
            time_consumed: 0
        });
    };
    ;
    /*
     *    "zd.ee.0": "ZegoDataReport.eventStart"
     */
    ZegoDataReport.prototype.eventEnd = function (seq, event_name, extInfo) {
        if (!this.dataStatistics[seq]) {
            this.logger.info("zd.ee.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (!events || events.length === 0) {
            this.logger.info("zd.ee.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed) {
                events[i].time_consumed = Date.now() - events[i].abs_time;
                break;
            }
        }
    };
    ;
    ZegoDataReport.prototype.eventEndWithMsg = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.ee.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (!events) {
            this.logger.warn("zd.ee.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed) {
                events[i].time_consumed = Date.now() - events[i].abs_time;
                if (events[i].msg_ext == undefined) {
                    events[i].msg_ext = {};
                }
                events[i].msg_ext = __assign({}, msg_ext);
                break;
            }
        }
    };
    ;
    /*
     *    "zd.aei.0": "ZegoDataReport.addEventInfo"
     */
    ZegoDataReport.prototype.addEventInfo = function (seq, event_name, key, value) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.aei.0 no seq match");
            return;
        }
        var events = this.dataStatistics[seq].events;
        if (events == undefined) {
            this.logger.warn("zd.aei.0 no events");
            return;
        }
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].event == event_name && events[i].time_consumed != undefined) {
                if (events[i].event == event_name && events[i].time_consumed != undefined) {
                    if (events[i].msg_ext == undefined) {
                        events[i].msg_ext = {};
                    }
                    events[i].msg_ext[key] = value;
                    break;
                }
            }
        }
    };
    ;
    /*
     *    "zd.ae.0": "ZegoDataReport.addEvent"
     */
    ZegoDataReport.prototype.addEvent = function (seq, event_name, msg_ext) {
        if (!this.dataStatistics[seq]) {
            this.logger.warn("zd.ae.0 no seq match");
            return;
        }
        if (!this.dataStatistics[seq].events) {
            return;
        }
        if (msg_ext) {
            this.dataStatistics[seq].events.push({
                event: event_name,
                abs_time: Date.now(),
                msg_ext: msg_ext
            });
        }
        else {
            this.dataStatistics[seq].events.push({
                event: event_name,
                abs_time: Date.now(),
            });
        }
    };
    ;
    ZegoDataReport.prototype.uploadReport = function (seq, itemType) {
        var reportInfo = this.dataStatistics[seq];
        if (reportInfo == undefined) {
            return;
        }
        reportInfo.itemtype = itemType;
        reportInfo.time_consumed = Date.now() - reportInfo.abs_time;
        this.logger.report(reportInfo);
        delete this.dataStatistics[seq];
    };
    ;
    return ZegoDataReport;
}());
exports.ZegoDataReport = ZegoDataReport;


/***/ }),

/***/ "./sdk/common/zego.entity.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.entity.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PROTO_VERSION = "1.1.1";
exports.ROOMVERSION = "V1";
var ENUM_LOG_LEVEL;
(function (ENUM_LOG_LEVEL) {
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["debug"] = 0] = "debug";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["info"] = 1] = "info";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["warn"] = 2] = "warn";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["error"] = 3] = "error";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["report"] = 99] = "report";
    ENUM_LOG_LEVEL[ENUM_LOG_LEVEL["disable"] = 100] = "disable";
})(ENUM_LOG_LEVEL = exports.ENUM_LOG_LEVEL || (exports.ENUM_LOG_LEVEL = {}));
;
var ENUM_REMOTE_TYPE;
(function (ENUM_REMOTE_TYPE) {
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["disable"] = 0] = "disable";
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["websocket"] = 1] = "websocket";
    ENUM_REMOTE_TYPE[ENUM_REMOTE_TYPE["https"] = 2] = "https";
})(ENUM_REMOTE_TYPE = exports.ENUM_REMOTE_TYPE || (exports.ENUM_REMOTE_TYPE = {}));
;
var ListNode = /** @class */ (function () {
    function ListNode(id, data) {
        if (id === void 0) { id = null; }
        if (data === void 0) { data = null; }
        this._id = null;
        this.next = null;
        this.prev = null;
        this._id = id;
        this._data = data;
    }
    Object.defineProperty(ListNode.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListNode.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    ListNode.prototype.hasNext = function () {
        return this.next && this.next.id;
    };
    ListNode.prototype.hasPrev = function () {
        return this.prev && this.prev.id;
    };
    return ListNode;
}());
exports.ListNode = ListNode;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        //initialize end buffer nodes
        this.start = new ListNode();
        this.end = new ListNode();
        //initialize counters
        this._idCounter = 0;
        this._numNodes = 0;
        //initialize node pointers
        this.start.next = this.end;
        this.start.prev = null;
        this.end.prev = this.start;
        this.end.next = null;
    }
    /**
     *   Inserts a node before another node in the linked list
     *   @param {Node} toInsertBefore
     *   @param {Node} node
     */
    LinkedList.prototype.insertBefore = function (toInsertBefore, data) {
        var newNode = new ListNode(this._idCounter, data);
        newNode.next = toInsertBefore;
        newNode.prev = toInsertBefore.prev;
        toInsertBefore.prev.next = newNode;
        toInsertBefore.prev = newNode;
        ++this._idCounter;
        ++this._numNodes;
        return newNode;
    };
    /**
     *   Adds data wrapped in a Node object to the end of the linked list
     *   @param {object} data
     */
    LinkedList.prototype.addLast = function (data) {
        return this.insertBefore(this.end, data);
    };
    /**
     *   Alias for addLast
     *   @param {object} data
     */
    LinkedList.prototype.add = function (data) {
        return this.addLast(data);
    };
    /**
     *   Gets and returns the first node in the linked list or null
     *   @return {Node/null}
     */
    LinkedList.prototype.getFirst = function () {
        if (this._numNodes === 0) {
            return null;
        }
        else {
            return this.start.next;
        }
    };
    /**
     *   Gets and returns the last node in the linked list or null
     *   @return {Node/null}
     */
    LinkedList.prototype.getLast = function () {
        if (this._numNodes === 0) {
            return null;
        }
        else {
            return this.end.prev;
        }
    };
    /**
     *   Gets and returns the size of the linked list
     *   @return {number}
     */
    LinkedList.prototype.size = function () {
        return this._numNodes;
    };
    /**
     *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
     *   Use getAt instead of this function
     *   @param {number} index
     */
    LinkedList.prototype.getFromFirst = function (index) {
        var count = 0, temp = this.start.next;
        if (index >= 0) {
            while (count < index && temp !== null) {
                temp = temp.next;
                ++count;
            }
        }
        else {
            temp = null;
        }
        if (temp === null) {
            throw 'Index out of bounds.';
        }
        return temp;
    };
    /**
     *   Gets and returns the Node at the specified index in the linked list
     *   @param {number} index
     */
    LinkedList.prototype.get = function (index) {
        var temp = null;
        if (index === 0) {
            temp = this.getFirst();
        }
        else if (index === this._numNodes - 1) {
            temp = this.getLast();
        }
        else {
            temp = this.getFromFirst(index);
        }
        return temp;
    };
    /**
     *   Removes and returns node from the linked list by rearranging pointers
     *   @param {Node} node
     *   @return {Node}
     */
    LinkedList.prototype.remove = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        --this._numNodes;
        return node;
    };
    /**
     *   Removes and returns the first node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    LinkedList.prototype.removeFirst = function () {
        var temp = null;
        if (this._numNodes > 0) {
            temp = this.remove(this.start.next);
        }
        return temp;
    };
    /**
     *   Removes and returns the last node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    LinkedList.prototype.removeLast = function () {
        var temp = null;
        if (this._numNodes > 0) {
            temp = this.remove(this.end.prev);
        }
        return temp;
    };
    /**
     *   Removes all nodes from the list
     */
    LinkedList.prototype.removeAll = function () {
        this.start.next = this.end;
        this.end.prev = this.start;
        this._numNodes = 0;
        this._idCounter = 0;
    };
    /**
     *    Iterates the list calling the given fn for each node
     *    @param {function} fn
     */
    LinkedList.prototype.each = function (iterator) {
        var temp = this.start;
        while (temp.hasNext()) {
            temp = temp.next;
            iterator(temp);
        }
    };
    LinkedList.prototype.find = function (iterator) {
        var temp = this.start, found = false, result = null;
        while (temp.hasNext() && !found) {
            temp = temp.next;
            if (iterator(temp)) {
                result = temp;
                found = true;
            }
        }
        return result;
    };
    LinkedList.prototype.map = function (iterator) {
        var temp = this.start, results = [];
        while (temp.hasNext()) {
            temp = temp.next;
            if (iterator(temp)) {
                results.push(temp);
            }
        }
        return results;
    };
    /**
     *    Alias for addLast
     *    @param {object} data
     */
    LinkedList.prototype.push = function (data) {
        return this.addLast(data);
    };
    /**
     *    Performs insertBefore on the first node
     *    @param {object} data
     */
    LinkedList.prototype.unshift = function (data) {
        if (this._numNodes > 0) {
            this.insertBefore(this.start.next, data);
        }
        else {
            this.insertBefore(this.end, data);
        }
    };
    /**
     *    Alias for removeLast
     */
    LinkedList.prototype.pop = function () {
        return this.removeLast();
    };
    /**
     *    Alias for removeFirst()
     */
    LinkedList.prototype.shift = function () {
        return this.removeFirst();
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
exports.sdkErrorList = {
    SUCCESS: {
        code: "ZegoClient.Success",
        msg: "success."
    },
    PARAM: {
        code: "ZegoClient.Error.Param",
        msg: "input error."
    },
    HEARTBEAT_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "heartbeat timeout."
    },
    LOGIN_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "login timeout."
    },
    SEND_MSG_TIMEOUT: {
        code: "ZegoClient.Error.Timeout",
        msg: "send customsg timeout."
    },
    RESET_QUEUE: {
        code: "ZegoClient.Error.Timeout",
        msg: "msg waiting ack is clear when reset."
    },
    LOGIN_DISCONNECT: {
        code: "ZegoClient.Error.Network",
        msg: "network is broken and login fail."
    },
    KICK_OUT: {
        code: "ZegoClient.Error.Kickout",
        msg: "kickout reason="
    },
    UNKNOWN: {
        code: "ZegoClient.Error.Unknown",
        msg: "unknown error."
    },
    FREQ_LIMITED: {
        code: "ZegoClient.Error.requencyLimited",
        msg: "Frequency Limited."
    }
    // SIGNAL_DISCONNECT: {
    //     code: "ZegoClient.Error.Timeout",
    //     msg: "WebRTC Signal broken"
    // }
};
;
var ENUM_SIGNAL_STATE;
(function (ENUM_SIGNAL_STATE) {
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["disconnected"] = 0] = "disconnected";
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["connecting"] = 1] = "connecting";
    ENUM_SIGNAL_STATE[ENUM_SIGNAL_STATE["connected"] = 2] = "connected";
})(ENUM_SIGNAL_STATE = exports.ENUM_SIGNAL_STATE || (exports.ENUM_SIGNAL_STATE = {}));
;
exports.ENUM_RESOLUTION_TYPE = {
    LOW: {
        width: 240,
        height: 320,
        frameRate: 15,
        bitRate: 300
    },
    MEDIUM: {
        width: 480,
        height: 640,
        frameRate: 15,
        bitRate: 800
    },
    HIGH: {
        width: 720,
        height: 1280,
        frameRate: 20,
        bitRate: 1500
    }
};
exports.ENUM_RETRY_STATE = {
    didNotStart: 0,
    retrying: 1,
    finished: 2
};
exports.ENUM_PUBLISH_STATE = {
    start: 0,
    waitingSessionRsp: 1,
    waitingOffserRsp: 2,
    waitingServerAnswer: 3,
    waitingServerICE: 4,
    connecting: 5,
    publishing: 6,
    stop: 7,
    didNotStart: 8
};
exports.ENUM_PLAY_STATE = {
    start: 0,
    waitingSessionRsp: 1,
    waitingOffserRsp: 2,
    waitingServerAnswer: 3,
    waitingServerICE: 4,
    connecting: 5,
    playing: 6,
    stop: 7,
    didNotStart: 8
};
exports.ENUM_CONNECT_STATE = { disconnect: 0, connecting: 1, connected: 2 };
exports.MAX_TRY_CONNECT_COUNT = 3;
exports.SEND_MSG_RESET = 2;
exports.SEND_MSG_TIMEOUT = 1;
exports.MAX_TRY_HEARTBEAT_COUNT = 5;
exports.ENUM_PUBLISH_STREAM_STATE = {
    waiting_url: 1,
    tryPublish: 2,
    update_info: 3,
    publishing: 4,
    stop: 5
};
exports.ENUM_STREAM_SUB_CMD = {
    liveNone: 0,
    liveBegin: 2001,
    liveEnd: 2002,
    liveUpdate: 2003
};
exports.ENUM_STREAM_UPDATE_TYPE = {
    added: 0,
    deleted: 1
};
//运行状态
var ENUM_RUN_STATE;
(function (ENUM_RUN_STATE) {
    ENUM_RUN_STATE[ENUM_RUN_STATE["logout"] = 0] = "logout";
    ENUM_RUN_STATE[ENUM_RUN_STATE["trylogin"] = 1] = "trylogin";
    ENUM_RUN_STATE[ENUM_RUN_STATE["login"] = 2] = "login";
})(ENUM_RUN_STATE = exports.ENUM_RUN_STATE || (exports.ENUM_RUN_STATE = {}));
;
exports.ENUM_PUBLISH_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.ENUM_PLAY_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.MAX_TRY_LOGIN_COUNT = 5; //最大重试登录次数
exports.TRY_LOGIN_INTERVAL = [2000, 2000, 3000, 3000, 4000]; //重试登录的频率
exports.MINIUM_HEARTBEAT_INTERVAL = 3000; //最小心跳尝试间隔
exports.ENUM_STREAM_UPDATE_CMD = {
    added: 12001,
    deleted: 12002,
    updated: 12003
};
exports.SERVER_ERROR_CODE = 10000;
exports.MIXSTREAM_ERROR_CODE = 10000;
var QUALITYLEVEL;
(function (QUALITYLEVEL) {
    QUALITYLEVEL[QUALITYLEVEL["low"] = 1] = "low";
    QUALITYLEVEL[QUALITYLEVEL["stantard"] = 2] = "stantard";
    QUALITYLEVEL[QUALITYLEVEL["hight"] = 3] = "hight";
    QUALITYLEVEL[QUALITYLEVEL["custome"] = 4] = "custome";
})(QUALITYLEVEL = exports.QUALITYLEVEL || (exports.QUALITYLEVEL = {}));
exports.ENUM_SIGNAL_SUB_CMD = {
    none: 0,
    joinLiveRequest: 1001,
    joinLiveResult: 1002,
    joinLiveInvite: 1003,
    joinLiveStop: 1004
};
exports.ENUM_PUSH_SIGNAL_SUB_CMD = {
    none: 0,
    pushJoinLiveRequest: 11001,
    pushJoinLiveResult: 11002,
    pushJoinLiveInvite: 11003,
    pushJoinLiveStop: 11004
};
//拉流选择
var ENUM_PLAY_SOURCE_TYPE;
(function (ENUM_PLAY_SOURCE_TYPE) {
    ENUM_PLAY_SOURCE_TYPE[ENUM_PLAY_SOURCE_TYPE["auto"] = 0] = "auto";
    ENUM_PLAY_SOURCE_TYPE[ENUM_PLAY_SOURCE_TYPE["ultra"] = 1] = "ultra";
})(ENUM_PLAY_SOURCE_TYPE = exports.ENUM_PLAY_SOURCE_TYPE || (exports.ENUM_PLAY_SOURCE_TYPE = {}));
;
//推流选择
var ENUM_DISPATCH_TYPE;
(function (ENUM_DISPATCH_TYPE) {
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["cdn"] = 0] = "cdn";
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["ultra"] = 1] = "ultra";
    ENUM_DISPATCH_TYPE[ENUM_DISPATCH_TYPE["customUrl"] = 2] = "customUrl";
})(ENUM_DISPATCH_TYPE = exports.ENUM_DISPATCH_TYPE || (exports.ENUM_DISPATCH_TYPE = {}));
;
var E_CLIENT_TYPE;
(function (E_CLIENT_TYPE) {
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_None"] = 0] = "ClientType_None";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_H5"] = 1] = "ClientType_H5";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_SmallPragram"] = 2] = "ClientType_SmallPragram";
    E_CLIENT_TYPE[E_CLIENT_TYPE["ClientType_Webrtc"] = 3] = "ClientType_Webrtc";
})(E_CLIENT_TYPE = exports.E_CLIENT_TYPE || (exports.E_CLIENT_TYPE = {}));


/***/ }),

/***/ "./sdk/common/zego.extern.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.extern.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.playErrorList = {
    DISPATCH_ERROR: {
        code: "ZegoPlayWeb.Error.Dispatch",
        msg: "dispatch request error"
    },
    DISPATCH_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Dispatch",
        msg: "dispatch request timeout"
    },
    TOKEN_ERROR: {
        code: "ZegoPlayWeb.Error.Token",
        msg: "login token error"
    },
    SEND_SESSION_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Session",
        msg: "send session request timeout"
    },
    CREATE_SESSION_ERROR: {
        code: "ZegoPlayWeb.Error.Session",
        msg: "create session error"
    },
    CREATE_OFFER_ERROR: {
        code: "ZegoPublish.Error.CreateOffer",
        msg: "create offer error"
    },
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.RemoteOffer",
        msg: "wating server mediaDesc timeout"
    },
    SET_REMOTE_DESC_ERROR: {
        code: "ZegoPlayWeb.Error.RemoteOffer",
        msg: "other side offer error"
    },
    CREATE_ANSWER_ERROR: {
        code: "ZegoPlayWeb.Error.CreateAnswer",
        msg: "create offer error"
    },
    SET_LOCAL_DESC_ERROR: {
        code: "ZegoPlayWeb.Error.LocalDesc",
        msg: "setLocalDescription error"
    },
    SEND_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Desc",
        msg: "send mediaDesc timeout"
    },
    SEND_CANDIDATE_ERROR: {
        code: "ZegoPlayWeb.Error.Candidate",
        msg: "send candidate error"
    },
    SEND_CANDIDATE_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.Candidate",
        msg: "send candidate timeout"
    },
    SERVER_CANDIDATE_TIMEOUT: {
        code: "ZegoPlayWeb.Timeout.ServerCandidate",
        msg: "waiting candidate timeout"
    },
    SERVER_CANDIDATE_ERROR: {
        code: "ZegoPlayWeb.Error.ServerCandidate",
        msg: "recv candidate error"
    },
    MEDIA_CONNECTION_FAILED: {
        code: "ZegoPlayWeb.Error.ConnectionFailed",
        msg: "ice Connection state failed"
    },
    MEDIA_CONNECTION_CLOSED: {
        code: "ZegoPlayWeb.Error.ConnectionClosed",
        msg: "ice connection state closed"
    },
    SESSION_CLOSED: {
        code: "ZegoPlayWeb.Error.SessionClosed",
        msg: "server session closed"
    },
    WEBSOCKET_ERROR: {
        code: "ZegoPlayWeb.Error.SocketError",
        msg: "network error"
    }
};
exports.publishErrorList = {
    DISPATCH_ERROR: {
        code: "ZegoPublish.Error.Dispatch",
        msg: "dispatch request error"
    },
    DISPATCH_TIMEOUT: {
        code: "ZegoPublish.Timeout.Dispatch",
        msg: "dispatch request timeout"
    },
    TOKEN_ERROR: {
        code: "ZegoPublish.Error.Token",
        msg: "login token error"
    },
    SEND_SESSION_TIMEOUT: {
        code: "ZegoPublish.Timeout.Session",
        msg: "send session request timeout"
    },
    CREATE_SESSION_ERROR: {
        code: "ZegoPublish.Error.Session",
        msg: "create session error"
    },
    CREATE_OFFER_ERROR: {
        code: "ZegoPublish.Error.CreateOffer",
        msg: "create offer error"
    },
    SET_LOCAL_DESC_ERROR: {
        code: "ZegoPublish.Error.LocalDesc",
        msg: "setLocalDescription error"
    },
    SEND_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPublish.Timeout.Desc",
        msg: "send mediaDesc timeout"
    },
    SERVER_MEDIA_DESC_TIMEOUT: {
        code: "ZegoPublish.Timeout.ServerAnswer",
        msg: "waiting server mediaDesc timeout"
    },
    SERVER_MEDIA_DESC_ERROR: {
        code: "ZegoPublish.Error.ServerAnswer",
        msg: "server mediaDesc type error"
    },
    SET_REMOTE_DESC_ERROR: {
        code: "ZegoPublish.Error.RemoteDesc",
        msg: "other side offer error"
    },
    SEND_CANDIDATE_TIMEOUT: {
        code: "ZegoPublish.Timeout.Candidate",
        msg: "sendIceCandidate error"
    },
    SERVER_CANDIDATE_TIMEOUT: {
        code: "ZegoPublish.Timeout.ServerCandidate",
        msg: "waiting candidate timeout"
    },
    SERVER_CANDIDATE_ERROR: {
        code: "ZegoPublish.Error.ServerCandidate",
        msg: "recv candidate error"
    },
    SESSION_CLOSED: {
        code: "ZegoPublish.Error.SessionClosed",
        msg: "server session closed"
    },
    MEDIA_CONNECTION_FAILED: {
        code: "ZegoPublish.Error.IConnectionFailed",
        msg: "Iice Connection state failed"
    },
    MEDIA_CONNECTION_CLOSED: {
        code: "ZegoPublish.Error.ConnectionClosed",
        msg: "ice connection state closed"
    },
    WEBSOCKET_ERROR: {
        code: "ZegoPublish.Error.SocketError",
        msg: "network error"
    }
};
exports.ENUM_PUBLISH_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2
};
exports.ENUM_PLAY_STATE_UPDATE = {
    start: 0,
    error: 1,
    retry: 2,
    stop: 3
};
exports.ENUM_RETRY_STATE = {
    didNotStart: 0,
    retrying: 1,
    finished: 2
};
exports.getSeq = (function () {
    var seq = 1;
    return function () {
        return seq++;
    };
})();


/***/ }),

/***/ "./sdk/common/zego.logger.ts":
/*!***********************************!*\
  !*** ./sdk/common/zego.logger.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zego_entity_1 = __webpack_require__(/*! ./zego.entity */ "./sdk/common/zego.entity.ts");
exports.D = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
var Logger = /** @class */ (function () {
    function Logger() {
        this.logUploadTimer = null;
        this.logUploadInterval = 1000 * 10;
        this.logCache = [];
        this.logCacheSend = [];
        this.logCacheMax = 100;
    }
    Logger.prototype.setLogLevel = function (logLevel) {
        if (this.logLevel < zego_entity_1.ENUM_LOG_LEVEL.debug || this.logLevel > zego_entity_1.ENUM_LOG_LEVEL.report) {
            this.logLevel = zego_entity_1.ENUM_LOG_LEVEL.disable;
        }
        else {
            this.logLevel = logLevel;
        }
    };
    Logger.prototype.setRemoteLogLevel = function (logLevel) {
        if (this.logRemoteLevel < zego_entity_1.ENUM_LOG_LEVEL.debug || this.logRemoteLevel > zego_entity_1.ENUM_LOG_LEVEL.report) {
            this.logRemoteLevel = zego_entity_1.ENUM_LOG_LEVEL.disable;
        }
        else {
            this.logRemoteLevel = logLevel;
        }
    };
    Logger.prototype.setSessionInfo = function (appid, roomid, sessionid, userid, userName, version) {
        this.appid = appid;
        this.roomid = roomid;
        this.sessionid = sessionid;
        this.userid = userid;
        this.userName = userName;
        this.version = version;
    };
    ;
    Logger.prototype.openLogServer = function (url) {
        try {
            if (url.startsWith("wss:")) {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.websocket;
                this.openWebSocketLogServer(url);
            }
            else if (url.startsWith("https:")) {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.https;
                this.openHttpsLogServer(url);
            }
            else {
                this.logType = zego_entity_1.ENUM_REMOTE_TYPE.disable;
            }
        }
        catch (e) {
            this.error(JSON.stringify(e));
        }
    };
    Logger.prototype.stopLogServer = function () {
        if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.websocket) {
            this.stopWebSocketServer();
        }
        else if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.https) {
            //send last data
            this.SendHttpsLog();
            this.stopHttpsServer();
        }
        this.logType = zego_entity_1.ENUM_REMOTE_TYPE.disable;
    };
    ;
    Logger.prototype.stopWebSocketServer = function () {
        if (this.websocket) {
            this.websocket.onclose = null;
            this.websocket.onerror = null;
            this.websocket.close();
            this.websocket = null;
        }
    };
    Logger.prototype.openHttpsLogServer = function (url) {
        var _this = this;
        this.url = url;
        if (!url) {
            return;
        }
        this.stopHttpsServer();
        //start timer
        if (!this.logUploadTimer) {
            this.logUploadTimer = setInterval(function () {
                _this.SendHttpsLog();
            }, this.logUploadInterval);
        }
    };
    Logger.prototype.stopHttpsServer = function () {
        //stop timer
        if (this.logUploadTimer) {
            clearInterval(this.logUploadTimer);
            this.logUploadTimer = null;
        }
    };
    Logger.prototype.report = function (dataItem) {
        var log = this.logReportParamList(zego_entity_1.ENUM_LOG_LEVEL.report, dataItem);
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.report) {
            console.debug.apply(console, log);
        }
        //report 立即上报
        this.RemoteLog(zego_entity_1.ENUM_LOG_LEVEL.report, log, true);
    };
    Logger.prototype.debug = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.debug, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.debug) {
            console.debug.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.debug, log);
    };
    Logger.prototype.info = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.info, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.info) {
            console.info.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.info, log);
    };
    Logger.prototype.warn = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.warn, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.warn) {
            console.warn.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.warn, log);
    };
    Logger.prototype.error = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var log = this.logParamList(zego_entity_1.ENUM_LOG_LEVEL.error, values.join(''));
        if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= zego_entity_1.ENUM_LOG_LEVEL.error) {
            console.error.apply(console, log);
        }
        this.log(zego_entity_1.ENUM_LOG_LEVEL.error, log);
    };
    Logger.prototype.log = function (level, log) {
        if (this.logRemoteLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logRemoteLevel <= level) {
            this.RemoteLog(level, log);
        }
    };
    ;
    Logger.prototype.RemoteLog = function (level, log, force) {
        if (force === void 0) { force = false; }
        if (this.url == "") {
            return;
        }
        if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.websocket) {
            this.RemoteWebSocketLog(level, log);
        }
        else if (this.logType == zego_entity_1.ENUM_REMOTE_TYPE.https) {
            this.RemoteHttpsLog(level, log, force);
        }
        else if (this.logLevel !== zego_entity_1.ENUM_LOG_LEVEL.disable && this.logLevel <= level) {
            this.logCacheSend.push(log);
            while (this.logCacheSend.length > this.logCacheMax) {
                this.logCacheSend.shift();
            }
        }
    };
    ;
    Logger.prototype.RemoteWebSocketLog = function (level, log) {
        if (this.websocket == null || this.websocket.readyState == 2 || this.websocket.readyState == 3) {
            var url = this.url;
            this.url = "";
            this.openLogServer(url);
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
        else if (this.websocket.readyState == 0) {
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
        else if (this.websocket.readyState == 1) {
            if (this.logCacheSend.length > 0) {
                var logBefore = "";
                for (var i = 0; i < this.logCacheSend.length; i++) {
                    if ((logBefore + this.logCacheSend[i]).length > 4000) {
                        //console.warn('logBefore.length 4000',logBefore.length,logBefore);
                        this.websocket.send(logBefore);
                        logBefore = "";
                    }
                    logBefore = logBefore + this.logCacheSend[i] + "\n";
                }
                log = logBefore + log;
                this.logCacheSend = [];
                this.websocket.send(log);
            }
            else {
                this.websocket.send(log);
            }
        }
        else {
            console.warn("wrong socket state:" + this.websocket.readyState);
            if (this.logCacheSend.length < this.logCacheMax) {
                this.logCacheSend.push(log);
            }
        }
    };
    Logger.prototype.RemoteHttpsLog = function (level, log, force) {
        this.logCacheSend.push(log);
        if (this.logCacheSend.length >= this.logCacheMax || force === true) {
            this.SendHttpsLog();
        }
    };
    Logger.prototype.logParamList = function (level, logInfo) {
        var t = new Date();
        var stringTime = (t.getFullYear()) + "/";
        stringTime += (exports.D[t.getMonth() + 1] || t.getMonth() + 1) + "/";
        stringTime += (exports.D[t.getDate()] || t.getDate()) + " ";
        stringTime += (exports.D[t.getHours()] || t.getHours()) + ":";
        stringTime += (exports.D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (exports.D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;
        //get first space from logInfo
        var action = logInfo.substr(0, logInfo.indexOf(' '));
        if (action.length == 0) {
            action = logInfo;
        }
        var content = logInfo.substr(logInfo.indexOf(' ') + 1);
        if (content.length == 0) {
            content = "";
        }
        var s = {
            "time": stringTime,
            "level": level,
            "action": action,
            "content": content,
            "appid": this.appid,
            "roomid": this.roomid,
            "userid": this.userid,
            "userName": this.userName,
            "sessionid": this.sessionid
        };
        return [JSON.stringify(s)];
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ "./sdk/util/client-util.ts":
/*!*********************************!*\
  !*** ./sdk/util/client-util.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientUtil = /** @class */ (function () {
    function ClientUtil() {
    }
    ClientUtil.checkConfigParam = function (option, logger) {
        if (!option.appid || typeof option.appid !== 'number') {
            logger.error("ccp.0 appid must be number");
            return false;
        }
        if (!option.server) {
            logger.error("ccp.0 server must be string and not empty");
            return false;
        }
        if (!option.idName || typeof option.idName !== 'string') {
            logger.error("ccp.0 idName must be string and not empty");
            return false;
        }
        return true;
    };
    ClientUtil.checkLoginParam = function (roomid, token) {
        return true;
    };
    ClientUtil.registerCallback = function (fName, option, callbackList) {
        var sf, ef;
        if (option.success)
            sf = option.success;
        if (option.error)
            ef = option.error;
        callbackList[fName + "SuccessCallback"] = sf;
        callbackList[fName + "ErrorCallback"] = ef;
    };
    ClientUtil.actionErrorCallback = function (fName, callbackList) {
        return callbackList[fName + "ErrorCallback"];
    };
    // 执行成功回调函数
    ClientUtil.actionSuccessCallback = function (fName, callbackList) {
        return callbackList[fName + "SuccessCallback"];
    };
    /**
     错误管理
     */
    ClientUtil.getServerError = function (code) {
        var serverErrorList = {
            1: "parse json error.",
            1001: "login is processing.",
            1002: "liveroom request error.",
            1003: "zpush connect fail.",
            1004: "zpush handshake fail.",
            1005: "zpush login fail.",
            1006: "user login state is wrong.",
            1007: "got no zpush addr",
            1008: "token error",
            1009: "dispatch error",
            2002: "biz channel error",
            1000000000: "liveroom cmd error, result=",
        };
        if (code === 0) {
            return {
                code: "ZegoClient.Success",
                msg: "success"
            };
        }
        var err = {
            code: "ZegoClient.Error.Server",
            msg: "",
        };
        if (code > 1000000000) {
            err.msg = serverErrorList[1000000000] + code;
        }
        else if (!serverErrorList[code]) {
            err.msg = serverErrorList[code];
        }
        else {
            err.msg = "unknown error code:" + code;
        }
        return err;
    };
    ClientUtil.isKeepTryLogin = function (code) {
        switch (code) {
            case 1002: //liveroom connect error
            case 1003: //zpush connect error
                return true;
            default:
                return false;
        }
    };
    /*
    *    "msl.0": "ZegoClient.mergeStreamList",
    */
    ClientUtil.mergeStreamList = function (logger, idName, oldStreamList, newStreamList, callbackResult) {
        logger.debug("msl.0 call");
        var addStreamList = [];
        var delStreamList = [];
        var updateStreamList = [];
        var flag;
        for (var i = 0; i < newStreamList.length; i++) {
            if (newStreamList[i].anchor_id_name == idName) {
                logger.debug("msl.0 have self stream added");
                continue;
            }
            flag = false;
            for (var j = 0; j < oldStreamList.length; j++) {
                if (newStreamList[i].stream_id === oldStreamList[j].stream_id) {
                    if (newStreamList[i].extra_info !== oldStreamList[j].extra_info) {
                        updateStreamList.push(newStreamList[i]);
                    }
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                addStreamList.push(newStreamList[i]);
            }
        }
        for (var k = 0; k < oldStreamList.length; k++) {
            flag = false;
            for (var n = 0; n < newStreamList.length; n++) {
                if (newStreamList[n].anchor_id_name == idName) {
                    logger.debug("msl.0 have self stream deleted");
                    continue;
                }
                if (oldStreamList[k].stream_id === newStreamList[n].stream_id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                delStreamList.push(oldStreamList[k]);
            }
        }
        oldStreamList = newStreamList;
        callbackResult(addStreamList, delStreamList, updateStreamList);
        logger.debug("msl.0 call success");
    };
    ClientUtil.checkCustomCommandParam = function (param) {
        return true;
    };
    //生成随机数
    ClientUtil.generateRandumNumber = function (maxNum) {
        return parseInt(Math.random() * (maxNum + 1) + '', 10);
    };
    //生成随机数
    ClientUtil.uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            // rfc4122, version 4 form
            var r = void 0;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    ClientUtil.isSupportWebrtc = function () {
        var e = window['RTCPeerConnection'] || window['mozRTCPeerConnection'] || window['webkitRTCPeerConnection'], t = navigator['getUserMedia'] || navigator['webkitGetUserMedia'] ||
            navigator['msGetUserMedia'] || navigator['mozGetUserMedia'] ||
            navigator['mediaDevices'] && navigator['mediaDevices']['getUserMedia'], n = window['WebSocket'];
        return !!e && !!t && !!n;
    };
    ClientUtil.isSupportH264 = function (sucCall, errCall) {
        new RTCPeerConnection(null).createOffer({
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }).then(function (desc) {
            if (desc && desc.sdp) {
                var sdplist = desc.sdp.split('\r\n');
                var hasH264 = sdplist.some(function (item) {
                    return item.startsWith('a=rtpmap:') && (item.indexOf('H264/') > -1);
                });
                sucCall(hasH264);
            }
        }, function (err) {
            errCall(err);
        });
    };
    return ClientUtil;
}());
exports.ClientUtil = ClientUtil;


/***/ }),

/***/ "./sdk/wechatMini/zego.client.wechat.ts":
/*!**********************************************!*\
  !*** ./sdk/wechatMini/zego.client.wechat.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var zego_streamcenter_wechat_1 = __webpack_require__(/*! ./zego.streamcenter.wechat */ "./sdk/wechatMini/zego.streamcenter.wechat.ts");
var zego_logger_wx_1 = __webpack_require__(/*! ./zego.logger.wx */ "./sdk/wechatMini/zego.logger.wx.ts");
var zego_webSocket_1 = __webpack_require__(/*! ./zego.webSocket */ "./sdk/wechatMini/zego.webSocket.ts");
var zego_entity_1 = __webpack_require__(/*! ../common/zego.entity */ "./sdk/common/zego.entity.ts");
var index_1 = __webpack_require__(/*! ../common/clientBase/index */ "./sdk/common/clientBase/index.ts");
var stateCenter_1 = __webpack_require__(/*! ../common/clientBase/stateCenter */ "./sdk/common/clientBase/stateCenter.ts");
var ZegoClient = /** @class */ (function (_super) {
    __extends(ZegoClient, _super);
    function ZegoClient() {
        var _this = _super.call(this) || this;
        _this.preferPlaySourceType = zego_entity_1.ENUM_PLAY_SOURCE_TYPE.auto;
        _this.preferPublishSourceType = zego_entity_1.ENUM_DISPATCH_TYPE.ultra;
        _this.currentPlaySourceType = zego_entity_1.ENUM_DISPATCH_TYPE.cdn;
        _this.mixStreamList = {};
        _this.ultraPlaySourceType = "rtmp_v2";
        _this.logger = new zego_logger_wx_1.LoggerWechat();
        _this.stateCenter = new stateCenter_1.StateCenter();
        _this.streamCenter = new zego_streamcenter_wechat_1.ZegoStreamCenterWechat(_this.logger, _this.stateCenter);
        _this.init();
        return _this;
    }
    ZegoClient.prototype.getSocket = function (server) {
        return new zego_webSocket_1.ZegoWebSocket(server);
    };
    /*
    *    "zc.p.sppst.0": "ZegoClient.setPreferPlaySourceType",
    */
    // 设置优先播放流类型
    ZegoClient.prototype.setPreferPlaySourceType = function (sourceType) {
        this.logger.debug("zc.p.sppst.0 call");
        if (typeof sourceType !== "number" ||
            (sourceType !== zego_entity_1.ENUM_PLAY_SOURCE_TYPE.auto &&
                sourceType !== zego_entity_1.ENUM_PLAY_SOURCE_TYPE.ultra)) {
            this.logger.info("zc.p.sppst.0 param error");
            return false;
        }
        this.preferPlaySourceType = sourceType;
        this.logger.debug("zc.p.sppst.0 call success");
        return true;
    };
    ;
    /*
    *    "zc.p.sppst.1": "ZegoClient.setPreferPublishSourceType",
    */
    ZegoClient.prototype.setPreferPublishSourceType = function (sourceType, customUrl) {
        this.logger.debug("zc.p.sppst.1 call");
        if (typeof sourceType !== "number" ||
            (sourceType !== zego_entity_1.ENUM_DISPATCH_TYPE.cdn
                && sourceType !== zego_entity_1.ENUM_DISPATCH_TYPE.ultra
                && sourceType !== zego_entity_1.ENUM_DISPATCH_TYPE.customUrl)) {
            this.logger.error("zc.p.sppst.1 param error");
            return false;
        }
        if (sourceType === zego_entity_1.ENUM_DISPATCH_TYPE.customUrl && !customUrl) {
            this.logger.error("zc.p.sppst.1 param error");
            return false;
        }
        this.preferPublishSourceType = sourceType;
        this.customCdnUrl = customUrl;
        this.logger.debug("zc.p.sppst.1 call success");
        return true;
    };
    ;
    /*
    *    "zc.p.sps.0": "ZegoClient.startPlayingStream",
    */
    // 播放流
    ZegoClient.prototype.startPlayingStream = function (streamid, stream_params) {
        this.logger.debug("zc.p.sps.0 call");
        if (!streamid || streamid === "") {
            this.logger.info("zc.p.sps.0 param error");
            return false;
        }
        if (!this.stateCenter.isLogin()) {
            this.logger.info("zc.p.sps.0 not login");
            return false;
        }
        this.streamCenter.updatePlayingState(streamid, stream_params, true);
        if (this.streamCenter.isPublishing()) {
            //当前正在推流，根据推流模式确定拉流模式
            if (this.preferPublishSourceType == zego_entity_1.ENUM_DISPATCH_TYPE.cdn) {
                return this.startPlayingStreamFromCDN(streamid);
            }
            else {
                //current publish to BGP
                return this.startPlayingStreamFromBGP(streamid);
            }
        }
        else {
            //当前没有在推流，根据用户设置的拉流方式确定拉流地址
            if (this.preferPlaySourceType == zego_entity_1.ENUM_PLAY_SOURCE_TYPE.ultra) {
                return this.startPlayingStreamFromBGP(streamid);
            }
            else {
                return this.startPlayingStreamFromCDN(streamid);
            }
        }
    };
    ;
    /*
    *    "zc.p.sps.1.0": "ZegoClient.stopPlayingStream",
    */
    // 停止流
    ZegoClient.prototype.stopPlayingStream = function (streamid) {
        this.logger.debug("zc.p.sps.1.0 call");
        if (!streamid || streamid === "") {
            this.logger.info("zc.p.sps.1.0 param error");
            return false;
        }
        this.streamCenter.stopPlayingStream(streamid);
        for (var seq in this.stateCenter.streamUrlMap) {
            if (this.stateCenter.streamUrlMap[seq] === streamid) {
                delete this.stateCenter.streamUrlMap[seq];
                break;
            }
        }
        this.logger.debug("zc.p.sps.1.0 call success");
        return true;
    };
    ;
    /*
    *    "zc.p.sps.1": "ZegoClient.startPublishingStream",
    */
    //开始推流
    ZegoClient.prototype.startPublishingStream = function (streamid, stream_params, extraInfo) {
        if (stream_params === void 0) { stream_params = ''; }
        if (extraInfo === void 0) { extraInfo = ''; }
        this.logger.debug("zc.p.sps.1 call");
        if (!streamid) {
            this.logger.error("zc.p.sps.1 param error");
            return false;
        }
        if (!this.stateCenter.isLogin()) {
            this.logger.error("zc.p.sps.1 not login");
            return false;
        }
        this.stateCenter.publishStreamList[streamid] = {
            state: zego_entity_1.ENUM_PUBLISH_STREAM_STATE.waiting_url,
            extra_info: extraInfo
        };
        this.logger.info("zc.p.sps.0 fetch stream url");
        this.streamCenter.updatePublishingState(streamid, stream_params, true);
        this.fetchPublishStreamUrl(streamid);
        //need to check whether play to switch line
        if (this.streamCenter.isPlaying()) {
            //如果是BGP推流，选择auto拉流模式，需要切换服务器
            if (this.preferPublishSourceType == zego_entity_1.ENUM_DISPATCH_TYPE.ultra &&
                this.currentPlaySourceType == zego_entity_1.ENUM_DISPATCH_TYPE.cdn) {
                //switch CDN to bgp
                for (var i = 0; i < this.streamCenter.playingList.length; i++) {
                    var playStreamId = this.streamCenter.playingList[i].streamid;
                    var params = this.streamCenter.playingList[i].params;
                    this.stopPlayingStream(playStreamId);
                    this.streamCenter.updatePlayingState(playStreamId, params, true);
                    this.startPlayingStreamFromBGP(playStreamId);
                }
            }
        }
        return true;
    };
    ;
    /*
    *    "zc.p.sps.1.1": "ZegoClient.stopPublishingStream",
    */
    //结束推流
    ZegoClient.prototype.stopPublishingStream = function (streamid) {
        this.logger.debug("zc.p.sps.1.1 call");
        if (!streamid || streamid === "") {
            this.logger.info("zc.p.sps.1.1 param error");
            return false;
        }
        this.streamCenter.stopPublishingStream(streamid);
        if (this.stateCenter.publishStreamList[streamid]) {
            if (this.stateCenter.publishStreamList[streamid].state >= zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.updateStreamInfo(streamid, zego_entity_1.ENUM_STREAM_SUB_CMD.liveEnd);
            }
            delete this.stateCenter.publishStreamList[streamid];
        }
        if (this.stateCenter.streamUrlMap[streamid]) {
            delete this.stateCenter.streamUrlMap[streamid];
        }
        this.logger.debug("zc.p.sps.1.1 call success");
        return true;
    };
    ;
    /*
    *    "zc.p.upe.0": "ZegoClient.updatePlayerEvent",
    */
    // 更新播放器事件
    ZegoClient.prototype.updatePlayerState = function (streamid, event) {
        //通知playercenter
        this.logger.debug("zc.p.upe.0 call");
        this.streamCenter.updatePlayerState(streamid, event);
    };
    ;
    /*
    *    "zc.p.upns.0": "ZegoClient.updatePlayerEvent",
    */
    // 更新推拉流质量
    ZegoClient.prototype.updatePlayerNetStatus = function (streamid, event) {
        this.logger.debug("zc.p.upns.0 call");
        this.streamCenter.updatePlayerNetStatus(streamid, event);
    };
    ;
    /*
    *    "zc.p.spms.0": "ZegoClient.startPlayingMixStream",
    */
    //混流接口
    ZegoClient.prototype.startPlayingMixStream = function (mixStreamId, stream_params) {
        this.logger.debug("zc.p.spms.0 call");
        if (!mixStreamId || mixStreamId === "") {
            this.logger.info("zc.p.spms.0 param error");
            return false;
        }
        if (!this.stateCenter.isLogin()) {
            this.logger.info("zc.p.spms.0 not login");
            return false;
        }
        this.streamCenter.updatePlayingState(mixStreamId, stream_params, true);
        this.mixStreamList[mixStreamId] = {
            urltra_url_rtmp: null,
        };
        this.fetchPlayStreamUrl(mixStreamId, "rtmp_cdn");
        this.logger.debug("zc.p.spms.0 call success");
        return true;
    };
    ;
    /*
    *    "zc.p.spms.1": "ZegoClient.stopPlayingMixStream",
    */
    ZegoClient.prototype.stopPlayingMixStream = function (mixStreamId) {
        this.logger.debug("zc.p.spms.1 call");
        if (!mixStreamId || mixStreamId === "") {
            this.logger.info("zc.p.spms.1 param error");
            return false;
        }
        this.streamCenter.stopPlayingStream(mixStreamId);
        for (var seq in this.stateCenter.streamUrlMap) {
            if (this.stateCenter.streamUrlMap[seq] === mixStreamId) {
                delete this.stateCenter.streamUrlMap[seq];
                break;
            }
        }
        delete this.mixStreamList[mixStreamId];
        this.logger.debug("zc.p.spms.1 call success");
        return true;
    };
    ;
    //从CDN拉流
    ZegoClient.prototype.startPlayingStreamFromCDN = function (streamid) {
        this.logger.debug("zc.p.spsfc.0 call");
        var streamUrls = null; // 判断传入的流id，在当前流列表中能否找到，找到就存起相对应的流地址
        for (var i = 0; i < this.stateCenter.streamList.length; i++) {
            if (this.stateCenter.streamList[i].stream_id === streamid) {
                // 根据传入的流id判断当前的流列表中是否存在该流
                streamUrls = this.stateCenter.streamList[i].urls_rtmp || [];
                break;
            }
        }
        if (!streamUrls || streamUrls.length <= 0) {
            this.logger.error("zc.p.spsfc.0 cannot find stream url");
            return false;
        }
        this.currentPlaySourceType = zego_entity_1.ENUM_DISPATCH_TYPE.cdn;
        this.logger.debug("zc.p.spsfc.0 play stream");
        return this.doPlayStream(streamid, streamUrls, this.currentPlaySourceType);
    };
    /*
     *    "zc.p.spsfb.0": "ZegoClient.startPlayingStreamFromBGP",
     */
    //从BGP拉流
    ZegoClient.prototype.startPlayingStreamFromBGP = function (streamid) {
        this.currentPlaySourceType = zego_entity_1.ENUM_DISPATCH_TYPE.ultra;
        this.logger.info("zc.p.sps.0 fetch stream url");
        this.fetchPlayStreamUrl(streamid, this.ultraPlaySourceType);
        return true;
    };
    /*
     *    "fpsu.0": "ZegoClient.fetchPublishStreamUrl",
     */ //拉取服务端推流信息
    ZegoClient.prototype.fetchPublishStreamUrl = function (streamid) {
        var _this = this;
        this.logger.debug("fpsu.0 call");
        if (!this.stateCenter.isLogin()) {
            this.logger.error("fpsu.0 state error");
            return;
        }
        this.logger.info("fpsu.0 send fetch publish request");
        var publish_type = "";
        if (this.preferPublishSourceType == zego_entity_1.ENUM_DISPATCH_TYPE.cdn) {
            publish_type = "cdn";
        }
        else if (this.preferPublishSourceType == zego_entity_1.ENUM_DISPATCH_TYPE.ultra) {
            publish_type = "bgp";
        }
        var bodyData = {
            stream_id: streamid,
            url_type: this.ultraPlaySourceType,
            publish_type: publish_type,
            header_kvs: [{ key: "grpc-metadata-push", value: this.customCdnUrl || '' }]
        };
        this.socketCenter.registerRouter('stream_publish', function (msg) {
            _this.handleFetchStreamPublishUrlRsp(msg);
        });
        var seq = this.socketCenter.sendMessage("stream_publish", bodyData);
        if (seq == -1) {
            this.onPublishStateUpdate(1, streamid, -1);
            this.streamCenter.stopPublishingStream(streamid);
        }
        else {
            this.stateCenter.streamUrlMap[seq] = streamid;
        }
        this.logger.debug("fpsu.0 call success");
    };
    /*
     *    "fsu.0": "ZegoClient.fetchPlayStreamUrl",
     */
    // 拉取服务端流信息
    ZegoClient.prototype.fetchPlayStreamUrl = function (streamid, urlType) {
        var _this = this;
        this.logger.debug("fsu.0 call");
        // 不是处于登录状态，不让拉流
        if (!this.stateCenter.isLogin()) {
            this.logger.info("fsu.0 state error");
            return;
        }
        this.logger.info("fsu.0 send fetch request");
        var bodyData = {
            "stream_ids": [streamid],
            "url_type": urlType,
        };
        this.socketCenter.registerRouter('stream_url', function (msg) {
            _this.handleFetchStreamUrlRsp(msg);
        });
        // 发送消息
        var seq = this.socketCenter.sendMessage('stream_url', bodyData, undefined, function (err, seq) {
            if (_this.stateCenter.streamUrlMap[seq]) {
                _this.onPlayStateUpdate(1, _this.stateCenter.streamUrlMap[seq], -1);
            }
            else {
                _this.logger.info("fsu.0 already stop play");
            }
        });
        if (seq == -1) {
            this.onPlayStateUpdate(1, streamid, -1);
        }
        else {
            this.stateCenter.streamUrlMap[seq] = streamid;
        }
        this.logger.debug("fsu.0 call success");
    };
    /*
     *    "usi.0": "ZegoClient.updateStreamInfo",
     */ //流更新信令 
    ZegoClient.prototype.updateStreamInfo = function (streamid, cmd, stream_extra_info, error) {
        this.logger.debug("usi.0 call");
        var extra_info = "";
        if (stream_extra_info != undefined && typeof stream_extra_info == "string") {
            extra_info = stream_extra_info;
        }
        var data = {
            "stream_id": streamid,
            "extra_info": extra_info
        };
        var stream_msg = JSON.stringify(data);
        var bodyData = {
            "sub_cmd": cmd,
            "stream_msg": stream_msg
        };
        this.socketCenter.registerRouter('stream', function (msg) {
        });
        this.socketCenter.sendMessage("stream", bodyData, undefined, error);
        this.logger.debug("usi.0 call success cmd " + cmd);
    };
    /*
     *    "hsur.0": "ZegoClient.handleStreamUpdateRsp",
     */
    //流更新回包
    ZegoClient.prototype.handleStreamUpdateRsp = function (msg) {
        if (!this.stateCenter.isLogin()) {
            this.logger.info("hsur.0 not login");
            return;
        }
        if (msg.body.err_code != 0) {
            this.logger.info("hsur.0 stream update error " + msg.body.err_code);
            return;
        }
        this.logger.debug("hsur.0 stream seq " + this.stateCenter.streamSeq + " server seq " + msg.body.stream_seq);
        this.stateCenter.streamSeq = msg.body.stream_seq;
        //流删除时，publishStreamList已经删除了
        for (var i = 0; i < msg.body.stream_info.length; i++) {
            var streamid = msg.body.stream_info[i].stream_id;
            if (!this.stateCenter.publishStreamList[streamid]) {
                this.logger.info("hsur.0 stream is not exist");
                return;
            }
            if (this.stateCenter.publishStreamList[streamid].state == zego_entity_1.ENUM_PUBLISH_STREAM_STATE.update_info) {
                this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.publishing;
                this.onPublishStateUpdate(0, streamid, 0);
            }
        }
    };
    // 播放流
    ZegoClient.prototype.doPlayStream = function (streamid, streamUrls, sourceType) {
        this.logger.debug("zc.p.dps.0 call");
        /*
        const streamUrls = null;
        for (const i = 0; i < this.streamList.length; i++) {
            if (this.streamList[i].stream_id === streamid) {
                streamUrls = (this.streamList[i].urls_ws || []);
                break;
            }
        }
        */
        if (!streamUrls || streamUrls.length <= 0) {
            return false;
        }
        this.streamCenter.startPlayingStream(streamid, streamUrls, sourceType);
        return true;
    };
    /*
     *    "hfspur.0": "ZegoClient.handleFetchStreamPublishUrlRsp",
     */
    ZegoClient.prototype.handleFetchStreamPublishUrlRsp = function (msg) {
        this.logger.debug("hfspur.0 call");
        var requestStreamId = this.stateCenter.streamUrlMap[msg.header.seq];
        if (requestStreamId) {
            delete this.stateCenter.streamUrlMap[msg.header.seq];
        }
        if (msg.body.err_code !== 0) {
            this.logger.info("hfspur.0 server error=", msg.body.err_code);
            if (this.stateCenter.publishStreamList[requestStreamId]) {
                this.onPublishStateUpdate(1, requestStreamId, msg.body.err_code + zego_entity_1.SERVER_ERROR_CODE);
                this.streamCenter.stopPublishingStream(requestStreamId);
            }
            return;
        }
        if (msg.body.stream_url_info) {
            var streamid = msg.body.stream_url_info.stream_id;
            //return rtmp address
            var urlsWS = msg.body.stream_url_info.urls_ws;
            if (!this.stateCenter.publishStreamList[streamid]) {
                this.logger.error("hfspur.0 cannot find stream");
                return;
            }
            this.stateCenter.publishStreamList[streamid].url_rtmp = urlsWS;
            this.stateCenter.publishStreamList[streamid].state = zego_entity_1.ENUM_PUBLISH_STREAM_STATE.tryPublish;
            this.doPublishStream(streamid, urlsWS);
        }
    };
    /*
     *    "hfsur.0": "ZegoClient.handleFetchStreamUrlRsp",
     */
    ZegoClient.prototype.handleFetchStreamUrlRsp = function (msg) {
        this.logger.debug("hfsur.0 call");
        var requestStreamId = this.stateCenter.streamUrlMap[msg.header.seq];
        if (requestStreamId) {
            delete this.stateCenter.streamUrlMap[msg.header.seq];
        }
        if (msg.body.err_code !== 0) {
            this.logger.debug("hfsur.0 server error=", msg.body.err_code);
            //cann't get stream url, should callback
            this.onPlayStateUpdate(1, requestStreamId, msg.body.err_code + zego_entity_1.SERVER_ERROR_CODE);
            return;
        }
        if (msg.body.stream_url_infos && msg.body.stream_url_infos.length > 0) {
            var streamid = msg.body.stream_url_infos[0].stream_id;
            //return rtmp address
            var urlsWS = msg.body.stream_url_infos[0].urls_ws;
            var souceType = this.currentPlaySourceType;
            // 修复当this.streamList为空时，没有对新增的流进行保存的问题，导致客户端收到新增的流，启动starPlayingStream不能播放问题
            var found = false;
            // 检查拉流streamid
            for (var i = 0; i < this.stateCenter.streamList.length; i++) {
                if (this.stateCenter.streamList[i].stream_id == streamid) {
                    this.stateCenter.streamList[i].urltra_url_rtmp = urlsWS;
                    found = true;
                    break;
                }
            }
            //检查混流streamid
            if (!found && this.mixStreamList[streamid]) {
                this.mixStreamList[streamid].urltra_url_rtmp = urlsWS;
                souceType = zego_entity_1.ENUM_DISPATCH_TYPE.cdn;
                found = true;
            }
            if (!found) {
                this.logger.info("hfsur.0 cannot find streaminfo in existing stream list");
                this.stateCenter.streamList.push({
                    stream_id: streamid,
                    urltra_url_rtmp: urlsWS
                });
            }
            this.doPlayStream(streamid, urlsWS, souceType);
        }
        this.logger.debug("hfsur.0 call success");
    };
    // 发布流
    ZegoClient.prototype.doPublishStream = function (streamid, streamUrls) {
        this.logger.debug("zc.p.dps.1 call");
        if (!streamUrls || streamUrls.length <= 0) {
            return false;
        }
        this.logger.info("zc.p.dps.1 streamid: " + streamid + "streamUrl: " + streamUrls);
        this.streamCenter.startPublishingStream(streamid, streamUrls, this.preferPublishSourceType);
        this.logger.debug("zc.p.dps.1 call success");
        return true;
    };
    // web独有  -空实现
    ZegoClient.prototype.setCDNInfo = function (streamInfo, streamItem) {
    };
    ;
    ZegoClient.prototype.loginBodyData = function () {
        return {
            "id_name": this.stateCenter.idName,
            "nick_name": this.stateCenter.nickName,
            "role": this.stateCenter.role,
            "token": this.stateCenter.token,
            "version": zego_entity_1.PROTO_VERSION,
            "room_name": this.stateCenter.roomid,
            "user_state_flag": this.stateCenter.userStateUpdate ? 1 : 0,
            "room_create_flag": this.stateCenter.roomCreateFlag,
            "client_type": zego_entity_1.E_CLIENT_TYPE.ClientType_SmallPragram,
            third_token: this.stateCenter.third_token
        };
    };
    ZegoClient.prototype.WebrtcOnPublishStateUpdateHandle = function (type, streamid, error) {
    };
    return ZegoClient;
}(index_1.BaseCenter));
exports.ZegoClient = ZegoClient;


/***/ }),

/***/ "./sdk/wechatMini/zego.logger.wx.ts":
/*!******************************************!*\
  !*** ./sdk/wechatMini/zego.logger.wx.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var zego_logger_1 = __webpack_require__(/*! ../common/zego.logger */ "./sdk/common/zego.logger.ts");
var zego_webSocket_1 = __webpack_require__(/*! ./zego.webSocket */ "./sdk/wechatMini/zego.webSocket.ts");
var LoggerWechat = /** @class */ (function (_super) {
    __extends(LoggerWechat, _super);
    function LoggerWechat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoggerWechat.prototype.openWebSocketLogServer = function (url) {
        if (this.url != url) {
            this.url = url;
            this.stopWebSocketServer();
            if (!url)
                return;
            this.websocket = new zego_webSocket_1.ZegoWebSocket(url);
            this.websocket.onopen = function (evt) {
            };
            this.websocket.onclose = function (evt) {
            };
            this.websocket.onmessage = function (evt) {
            };
            this.websocket.onerror = function (err) {
                console.error("open log websocket error:" + err);
            };
        }
    };
    LoggerWechat.prototype.SendHttpsLog = function () {
        var _this = this;
        if (this.logCacheSend.length == 0) {
            return;
        }
        var uploadData = this.logCacheSend.join("\n");
        wx.request({
            url: this.url,
            data: uploadData,
            method: "POST",
            success: function (res) {
                //console.log(res.data);
                //check time interval
                if (res.data.length == 0) {
                    return;
                }
                var interval = res && res.data && res.data.interval;
                if (typeof interval === "number" && _this.logUploadInterval !== interval) {
                    _this.timeInterval = interval;
                    _this.openHttpsLogServer(_this.url);
                }
            },
            fail: function (res) {
                console.log("send failed " + res.statusCode);
            }
        });
        this.logCacheSend = [];
    };
    LoggerWechat.prototype.logReportParamList = function (level, logInfo) {
        var t = new Date();
        var stringTime = t.getFullYear() + "/";
        stringTime += (zego_logger_1.D[t.getMonth() + 1] || t.getMonth() + 1) + "/";
        stringTime += (zego_logger_1.D[t.getDate()] || t.getDate()) + " ";
        stringTime += (zego_logger_1.D[t.getHours()] || t.getHours()) + ":";
        stringTime += (zego_logger_1.D[t.getMinutes()] || t.getMinutes()) + ":";
        stringTime += (zego_logger_1.D[t.getSeconds()] || t.getSeconds());
        stringTime += "." + t.getTime() % 1000;
        logInfo["time"] = stringTime;
        logInfo["level"] = level;
        logInfo["console"] = "xcx";
        logInfo["appid"] = this.appid;
        logInfo["roomid"] = this.roomid;
        logInfo["userid"] = this.userid;
        logInfo["id_name"] = this.userid;
        logInfo["userName"] = this.userName;
        logInfo["sessionid"] = this.sessionid;
        logInfo["version"] = this.version;
        return [JSON.stringify(logInfo)];
    };
    return LoggerWechat;
}(zego_logger_1.Logger));
exports.LoggerWechat = LoggerWechat;


/***/ }),

/***/ "./sdk/wechatMini/zego.play.wechat.ts":
/*!********************************************!*\
  !*** ./sdk/wechatMini/zego.play.wechat.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ENUM_PLAY_STATE = { start: 0, playing: 1, stop: 2 };
/**
 ZegoPlayer
 */
var ZegoPlayWechat = /** @class */ (function () {
    function ZegoPlayWechat(logger, streamid, urls, params, reconnectLimit, streamcenter, sourceType, playerType, dataReport) {
        this.playUrlIndex = 0;
        this.playUrlTryCount = 0;
        this.currentUrl = null;
        this.reconnectCount = 0;
        this.state = ENUM_PLAY_STATE.stop;
        this.playerSeq = 0;
        this.publishQualitySeq = 0;
        this.publishQualityCount = 0;
        this.publishQulaityMaxCount = 30;
        this.everSuccess = false;
        this.playerLogUploadTime = new Date().getTime();
        this.streamid = streamid;
        //url list
        this.urls = urls;
        this.reconnectLimit = reconnectLimit;
        this.logger = logger;
        this.streamCenter = streamcenter;
        //this.stateTimeStamp = 0;
        this.sourceType = sourceType;
        this.playerType = playerType;
        this.params = params;
        this.dataReport = dataReport;
    }
    /*
    *    "zp.rpl.0": "ZegoPlayer.resetPlayer",
    */
    ZegoPlayWechat.prototype.resetPlayer = function () {
        this.state = ENUM_PLAY_STATE.stop;
        //this.stateTimeStamp = Date.now();
    };
    ZegoPlayWechat.prototype.newPlayer = function () {
        this.resetPlayer();
        var url = this.getCurrentPlayerUrl();
        var urlWithParams = url;
        if (this.params.length != 0) {
            urlWithParams = url + '?' + this.params;
        }
        if (url !== this.currentUrl) {
            this.currentUrl = url;
            this.streamCenter.onStreamUrlUpdate(this.streamid, urlWithParams, this.playerType);
        }
        else {
            this.streamCenter.onPlayerRetry(this.streamid, this.playerType);
        }
        if (this.everSuccess == false) {
            if (this.playerType == 0) {
                this.dataReport.eventStart(this.playerSeq, "PlayBegin");
                this.dataReport.addEventInfo(this.playerSeq, "PlayBegin", "url", urlWithParams);
            }
            else {
                this.dataReport.eventStart(this.playerSeq, "PublishBegin");
                this.dataReport.addEventInfo(this.playerSeq, "PublishBegin", "url", urlWithParams);
            }
        }
        else {
            if (this.playerType == 0) {
                this.dataReport.addEventInfo(this.playerSeq, "PlayRetry", "url", urlWithParams);
            }
            else {
                this.dataReport.addEventInfo(this.playerSeq, "PublishRetry", "url", urlWithParams);
            }
        }
        this.state = ENUM_PLAY_STATE.start;
        return true;
    };
    ZegoPlayWechat.prototype.stopPlayer = function () {
        if (this.playerType == 0) {
            this.dataReport.eventEndWithMsg(this.playerSeq, "PlayStat", {
                "quality": this.playerInfo
            });
        }
        else {
            this.dataReport.addEventInfo(this.playerSeq, "PublishStat", "quality", this.playerInfo);
            this.dataReport.eventEndWithMsg(this.playerSeq, "PublishStat", {
                "quality": this.playerInfo
            });
        }
    };
    ;
    /*
    *    "zp.tsp.0": "ZegoPlayer.tryStartPlayer",
    */
    ZegoPlayWechat.prototype.tryStartPlayer = function (errorCode) {
        //当前播放器的备用播放地址可能有多条，可尝试多次
        while (this.playUrlTryCount < this.urls.length) {
            if (++this.reconnectCount > this.reconnectLimit) {
                this.playUrlTryCount++;
                this.playUrlIndex = (this.playUrlIndex + 1) % this.urls.length;
                this.reconnectCount = 0;
                continue;
            }
            this.logger.info("zp.tsp.0 index: " + this.playUrlIndex + ", url: " + this.getCurrentPlayerUrl());
            if (this.newPlayer()) {
                break;
            }
        }
        if (this.playUrlTryCount >= this.urls.length) {
            this.logger.info("zp.tsp.0 stream: " + this.streamid);
            this.resetPlayer();
            var event_name = "";
            if (this.playerType == 0) {
                event_name = "PlayEnd";
            }
            else if (this.playerType == 1) {
                event_name = "PublishEnd";
                this.reportQualityStatics();
            }
            var info = {
                "error": errorCode,
                "reason": "no url to retry"
            };
            this.dataReport.addEvent(this.playerSeq, event_name, info);
            this.streamCenter.onPlayerStop(this.streamid, this.playerType, errorCode);
        }
    };
    ;
    ZegoPlayWechat.prototype.shouldRetryPlay = function (event) {
        var code = event.detail.code;
        if (code == 3001 ||
            code == 3002 ||
            code == 3003 ||
            code == 3005) {
            return true;
        }
        return false;
    };
    ZegoPlayWechat.prototype.isPlayFailed = function (event) {
        var code = event.detail.code;
        if (code == -2301 ||
            code == 2101 ||
            code == 2102) {
            return true;
        }
        return false;
    };
    ZegoPlayWechat.prototype.shouldRetryPublish = function (event) {
        var code = event.detail.code;
        if (code == 3001 ||
            code == 3002 ||
            code == 3003 ||
            code == 3004 ||
            code == 3005) {
            return true;
        }
        return false;
    };
    ZegoPlayWechat.prototype.isPublishFailed = function (event) {
        var code = event.detail.code;
        if (code == -1301 ||
            code == -1302 ||
            code == -1303 ||
            code == -1304 ||
            code == -1305 ||
            code == -1306 ||
            code == -1307 ||
            code == -1308 ||
            code == -1309 ||
            code == -1310 ||
            code == -1311) {
            return true;
        }
        return false;
    };
    /*
    *    "zp.tsp.0": "ZegoPlayer.updateEvent",
    */
    ZegoPlayWechat.prototype.updateEvent = function (event) {
        if (this.playerType == 0) {
            //拉流
            if (event.detail.code == 2004) {
                if (this.everSuccess) {
                    this.dataReport.eventEnd(this.playerSeq, "PlayRetry");
                }
                else {
                    this.everSuccess = true;
                    this.dataReport.eventStart(this.playerSeq, "PlayStat");
                }
                this.streamCenter.onPlayerStart(this.streamid, this.playerType);
            }
            else if (event.detail.code == 2009) {
                //video size changed
                this.streamCenter.onPlayerVideoSizeChanged(this.streamid);
            }
            else if (this.shouldRetryPlay(event)) {
                //try to restart palyer
                this.dataReport.eventStart(this.playerSeq, "PlayRetry");
                this.dataReport.addEventInfo(this.playerSeq, "PlayRetry", "error_code", event.detail.code);
                // this.tryStartPlayer(event.detail.code);
            }
            else if (this.isPlayFailed(event)) {
                this.logger.info("zp.ue.0 play error: " + this.streamid);
                this.resetPlayer();
                var palyFailedInfo = {
                    "errorCode": event.detail.code
                };
                this.dataReport.addEvent(this.playerSeq, "PlayError", palyFailedInfo);
                this.streamCenter.onPlayerStop(this.streamid, this.playerType, event.detail.code);
            }
            if (!this.everSuccess) {
                this.dataReport.eventEnd(this.playerSeq, "PlayBegin");
            }
        }
        else if (this.playerType == 1) {
            //推流
            if (event.detail.code == 1002) {
                if (this.everSuccess) {
                    this.dataReport.eventEnd(this.playerSeq, "PublishRetry");
                }
                else {
                    this.everSuccess = true;
                    this.dataReport.eventStart(this.playerSeq, "PublishStat");
                }
                this.streamCenter.onPlayerStart(this.streamid, this.playerType);
            }
            else if (this.shouldRetryPublish(event)) {
                //try to restart palyer
                this.dataReport.eventStart(this.playerSeq, "PublishRetry");
                this.dataReport.addEventInfo(this.playerSeq, "PublishRetry", "error_code", event.detail.code);
                //小程序内部retry
                // this.tryStartPlayer(event.detail.code);
            }
            else if (this.isPublishFailed(event)) {
                this.logger.info("zp.ue.0 publish error: " + this.streamid);
                this.resetPlayer();
                var publishFailedInfo = {
                    "errorCode": event.detail.code
                };
                this.dataReport.addEvent(this.playerSeq, "PublishError", publishFailedInfo);
                this.reportQualityStatics();
                this.streamCenter.onPlayerStop(this.streamid, this.playerType, event.detail.code);
            }
            if (!this.everSuccess) {
                this.dataReport.eventEnd(this.playerSeq, "PublishBegin");
            }
        }
    };
    ;
    ZegoPlayWechat.prototype.updatePlayerNetStatus = function (event) {
        var streamQuality = {
            "videoBitrate": event.detail.info.videoBitrate,
            "audioBitrate": event.detail.info.audioBitrate,
            "videoFPS": event.detail.info.videoFPS,
            "videoHeight": event.detail.info.videoHeight,
            "videoWidth": event.detail.info.videoWidth
        };
        this.playerInfo = streamQuality;
        if (this.playerType == 1) {
            var qualityInfo = {
                "videoBitrate": event.detail.info.videoBitrate,
                "audioBitrate": event.detail.info.audioBitrate,
                "videoFPS": event.detail.info.videoFPS,
                "videoGOP": event.detail.info.videoGOP,
                "netSpeed": event.detail.info.netSpeed,
                "netJitter": event.detail.info.netJitter,
                "videoWidth": event.detail.info.videoWidth,
                "videoHeight": event.detail.info.videoHeight
            };
            if (this.publishQualitySeq == 0) {
                this.publishQualitySeq = ++this.streamCenter.eventSeq;
                this.dataReport.newReport(this.publishQualitySeq);
                this.dataReport.addMsgExt(this.publishQualitySeq, {
                    "stream": this.streamid
                });
            }
            this.dataReport.addEvent(this.publishQualitySeq, "PublishQuality", qualityInfo);
            this.publishQualityCount += 1;
            if (this.publishQualityCount >= this.publishQulaityMaxCount) {
                var _now = new Date().getTime();
                if (_now - this.playerLogUploadTime > 45000) {
                    this.reportQualityStatics();
                    this.playerLogUploadTime = new Date().getTime();
                }
            }
        }
        this.streamCenter.onPlayerQuality(this.streamid, streamQuality, this.playerType);
    };
    ;
    ZegoPlayWechat.prototype.getCurrentPlayerUrl = function () {
        return this.urls[this.playUrlIndex % this.urls.length];
    };
    ;
    ZegoPlayWechat.prototype.reportQualityStatics = function () {
        //report
        this.dataReport.uploadReport(this.publishQualitySeq, "WXPublishStateUpdate");
        this.publishQualityCount = 0;
        this.publishQualitySeq = 0;
    };
    return ZegoPlayWechat;
}());
exports.ZegoPlayWechat = ZegoPlayWechat;


/***/ }),

/***/ "./sdk/wechatMini/zego.streamcenter.wechat.ts":
/*!****************************************************!*\
  !*** ./sdk/wechatMini/zego.streamcenter.wechat.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///<reference path="../common/ZegoStreamCenter.ts"/>
/**
 ZegoStreamCenter
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ZegoStreamCenter_1 = __webpack_require__(/*! ../common/ZegoStreamCenter */ "./sdk/common/ZegoStreamCenter.ts");
var zego_datareport_1 = __webpack_require__(/*! ../common/zego.datareport */ "./sdk/common/zego.datareport.ts");
var zego_play_wechat_1 = __webpack_require__(/*! ./zego.play.wechat */ "./sdk/wechatMini/zego.play.wechat.ts");
var ENUM_PLAY_STATE_UPDATE = {
    start: 0,
    stop: 1,
    retry: 2
};
var ENUM_PLAYER_TYPE = {
    play: 0,
    publish: 1
};
var ZegoStreamCenterWechat = /** @class */ (function (_super) {
    __extends(ZegoStreamCenterWechat, _super);
    function ZegoStreamCenterWechat(log, stateCenter) {
        var _this = _super.call(this, log, stateCenter) || this;
        _this.playerList = {};
        _this.playerCount = 0;
        _this.playingList = [];
        _this.publishingList = [];
        _this.eventSeq = 0;
        _this.streamEventMap = {};
        _this.playerWaitingList = [];
        _this.playerStatistics = {};
        _this.logger = log;
        _this.dataReport = new zego_datareport_1.ZegoDataReport(_this.logger);
        return _this;
    }
    //更新拉流信息
    //ZegoClient调用StartPlayingStream/StopPlayingStream时更新状态
    ZegoStreamCenterWechat.prototype.updatePlayingState = function (streamid, streamParams, start) {
        if (streamid == undefined) {
            return;
        }
        this.updateStreamState(streamid, start, streamParams, this.playingList);
        if (start) {
            //start a report
            this.eventSeq += 1;
            this.streamEventMap[streamid] = this.eventSeq;
            this.dataReport.newReport(this.eventSeq);
            //GetPublishInfo begin
            this.dataReport.eventStart(this.eventSeq, "GotPlayInfo");
        }
        else {
            //retport
            this.reportPlayEvent(streamid);
        }
    };
    ;
    //更新推流信息
    //ZegoClient调用StartPublishingStream/StopPublishingStream时更新状态
    ZegoStreamCenterWechat.prototype.updatePublishingState = function (streamid, streamParams, start) {
        if (streamParams === void 0) { streamParams = ''; }
        if (start === void 0) { start = false; }
        if (streamid == undefined) {
            return;
        }
        this.updateStreamState(streamid, start, streamParams, this.publishingList);
        if (start) {
            //start a report
            this.eventSeq += 1;
            this.streamEventMap[streamid] = this.eventSeq;
            this.dataReport.newReport(this.eventSeq);
            //GetPublishInfo begin
            this.dataReport.eventStart(this.eventSeq, "GotPublishInfo");
        }
        else {
            this.reportPublishEvent(streamid);
        }
    };
    ;
    ZegoStreamCenterWechat.prototype.updateStreamState = function (streamid, start, streamParams, streamList) {
        if (!streamid) {
            return;
        }
        if (!streamParams || typeof streamParams != "string") {
            streamParams = "";
        }
        if (start == true) {
            streamList.push({
                streamid: streamid,
                params: streamParams
            });
        }
        else {
            for (var i = 0; i < streamList.length; i++) {
                if (streamList[i].streamid == streamid) {
                    streamList.splice(i, 1);
                    break;
                }
            }
        }
    };
    //当前是否在拉流
    ZegoStreamCenterWechat.prototype.isPlaying = function () {
        if (this.playingList.length != 0) {
            return true;
        }
        return false;
    };
    ;
    //当前是否正在推流
    ZegoStreamCenterWechat.prototype.isPublishing = function () {
        if (this.publishingList.length != 0) {
            return true;
        }
        return false;
    };
    ;
    /*
     *    "zpc.sps.0": "ZegoStreamCenter.startPlayingStream",
     */
    //拉流开始(从本地或server获取到推拉流URL)
    ZegoStreamCenterWechat.prototype.startPlayingStream = function (streamid, streamUrlList, dispatchType) {
        this.logger.debug("zpc.sps.0 call");
        //获取到URL信息
        var seq = this.streamEventMap[streamid];
        if (seq) {
            var type = "";
            if (dispatchType == 0) {
                type = "cdn";
            }
            else if (dispatchType == 1) {
                type = "ultra_src";
            }
            this.dataReport.eventEndWithMsg(seq, "GotPlayInfo", {
                type: type,
                urls: streamUrlList
            });
        }
        return this.startPlayer(streamid, streamUrlList, dispatchType, ENUM_PLAYER_TYPE.play);
    };
    ;
    /*
     *    "zpc.sp.0": "ZegoStreamCenter.startPlayer",
     */
    ZegoStreamCenterWechat.prototype.startPlayer = function (streamid, streamUrlList, dispatchType, playerType) {
        var player = this.playerList[streamid];
        if (player) {
            return true;
        }
        //检查是否需要开始推拉流
        var streamList = [];
        if (playerType == ENUM_PLAYER_TYPE.play) {
            streamList = this.playingList;
        }
        else if (playerType == ENUM_PLAYER_TYPE.publish) {
            streamList = this.publishingList;
        }
        var found = false;
        var params = "";
        for (var i = 0; i < streamList.length; i++) {
            if (streamList[i].streamid == streamid) {
                found = true;
                params = streamList[i].params;
                break;
            }
        }
        if (!found) {
            this.logger.warn("zpc.sp.0 should not start");
            return false;
        }
        // 开始拉流，调用canvas，并存储起来 存进  this.playerList中
        player = this.playerList[streamid] = new zego_play_wechat_1.ZegoPlayWechat(this.logger, streamid, streamUrlList, params, this.getReconnectLimit(dispatchType), this, dispatchType, playerType, this.dataReport);
        player.playerSeq = this.streamEventMap[streamid];
        // 拉流失败则返回不做操作
        if (!player) {
            this.logger.info("zpc.sp.0 new player failed");
            return false;
        }
        // 拉流成功，播放器数量加1
        ++this.playerCount;
        var result = player.tryStartPlayer(0);
        this.logger.debug("zpc.sp.0 call result:", result);
        return result;
    };
    /*
     *    "zpc.sps.1.0": "ZegoStreamCenter.stopPlayingStream",//拉流结束
     */
    ZegoStreamCenterWechat.prototype.stopPlayingStream = function (streamid) {
        this.logger.debug("zpc.sps.1.0 call");
        if (streamid == undefined) {
            return;
        }
        this.stopPlayer(streamid);
        this.updatePlayingState(streamid);
    };
    ;
    /*
     *    "zpc.sp.1.0": "ZegoStreamCenter.stopPlayer",
     */
    ZegoStreamCenterWechat.prototype.stopPlayer = function (streamid) {
        var player = this.playerList[streamid];
        if (player) {
            player.stopPlayer();
            delete this.playerList[streamid];
            --this.playerCount;
            //this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.stop, player.streamid);
        }
        this.logger.debug("zpc.sp.1.0 call success");
    };
    /*
     *    "zpc.sps.1": "ZegoStreamCenter.startPublishingStream",//推流开始
     */
    ZegoStreamCenterWechat.prototype.startPublishingStream = function (streamid, streamUrlList, dispatchType) {
        this.logger.debug("zpc.sps.1 call");
        var seq = this.streamEventMap[streamid];
        if (seq) {
            var type = "";
            if (dispatchType == 0) {
                type = "cdn";
            }
            else if (dispatchType == 1) {
                type = "ultra_src";
            }
            this.dataReport.eventEndWithMsg(seq, "GotPublishInfo", {
                type: type,
                urls: streamUrlList
            });
        }
        return this.startPlayer(streamid, streamUrlList, dispatchType, ENUM_PLAYER_TYPE.publish);
    };
    ;
    /*
     *    "zpc.sps.1.1": "ZegoStreamCenter.stopPublishingStream",//推流结束
     */
    ZegoStreamCenterWechat.prototype.stopPublishingStream = function (streamid) {
        this.logger.debug("zpc.sps.1.1 call");
        if (streamid == undefined) {
            return;
        }
        this.stopPlayer(streamid);
        this.updatePublishingState(streamid, '', false);
    };
    ;
    /*
     *    "zpc.upe.1.0": "ZegoStreamCenter.updatePlayerEvent",//推拉流状态
     */
    ZegoStreamCenterWechat.prototype.updatePlayerState = function (streamid, event) {
        var player = this.playerList[streamid];
        if (player) {
            player.updateEvent(event);
        }
        else {
            this.logger.warn("zpc.upe.1.0 no player " + streamid);
        }
        this.logger.debug("zpc.upe.1.0 updatePlayerEvent success");
    };
    ;
    /*
     *    "zpc.upns.1.0": "ZegoStreamCenter.updatePlayerNetStatus",//推拉流质量
     */
    ZegoStreamCenterWechat.prototype.updatePlayerNetStatus = function (streamid, event) {
        var player = this.playerList[streamid];
        if (player) {
            player.updatePlayerNetStatus(event);
        }
        else {
            this.logger.warn("zpc.upns.1.0 no player " + streamid);
        }
        this.logger.debug("zpc.upns.1.0 updatePlayerNetStatus success");
    };
    ;
    /*
     *    "zpc.r.0": "ZegoStreamCenter.reset",
     */
    ZegoStreamCenterWechat.prototype.reset = function () {
        this.logger.debug('zpc.r.0 call');
        for (var i = 0; i < this.playingList.length; i++) {
            this.stopPlayingStream(this.playingList[i]);
        }
        for (var j = 0; j < this.publishingList.length; j++) {
            this.stopPublishingStream(this.publishingList[j]);
        }
        this.playerCount = 0;
        this.playerList = {};
        this.playerWaitingList = [];
        this.playerStatistics = {};
        this.streamEventMap = {};
        this.logger.debug('zpc.r.0 call success');
    };
    ;
    ZegoStreamCenterWechat.prototype.reportPublishEvent = function (streamid, error) {
        if (!this.streamEventMap[streamid]) {
            return;
        }
        var seq = this.streamEventMap[streamid];
        //report
        this.dataReport.addMsgExt(seq, {
            "stream": streamid,
            "error": error
        });
        this.dataReport.uploadReport(seq, "WXPublishStream");
        delete this.streamEventMap[streamid];
    };
    ZegoStreamCenterWechat.prototype.reportPlayEvent = function (streamid, error) {
        if (!this.streamEventMap[streamid]) {
            return;
        }
        var seq = this.streamEventMap[streamid];
        this.dataReport.addMsgExt(seq, {
            "stream": streamid,
            "error": error
        });
        this.dataReport.uploadReport(seq, "WXPlayStream");
        delete this.streamEventMap[streamid];
    };
    ZegoStreamCenterWechat.prototype.onPlayStateUpdate = function (type, streamid, error) {
    };
    ;
    ZegoStreamCenterWechat.prototype.onPlayQualityUpdate = function (streamid, streamQuality) {
    };
    ;
    ZegoStreamCenterWechat.prototype.onPublishStateUpdate = function (type, streamid, error) {
    };
    ;
    ZegoStreamCenterWechat.prototype.onPublishQualityUpdate = function (streamid, streamQuality) {
    };
    ;
    ZegoStreamCenterWechat.prototype.onPlayerStreamUrlUpdate = function (streamid, url, type) {
    };
    ;
    ZegoStreamCenterWechat.prototype.onVideoSizeChanged = function (streamid) {
    };
    ;
    ZegoStreamCenterWechat.prototype.getReconnectLimit = function (sourceType) {
        //switch(sourceType) in future
        return 1;
    };
    /*
     *    "ops.0": "ZegoStreamCenter.onPlayStart",
     */
    ZegoStreamCenterWechat.prototype.onPlayerStart = function (streamid, playerType) {
        this.logger.debug("ops.0 call");
        //callback
        if (playerType == ENUM_PLAYER_TYPE.play)
            this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.start, streamid, 0);
        else if (playerType == ENUM_PLAYER_TYPE.publish)
            this.onPublishStateUpdate(ENUM_PLAY_STATE_UPDATE.start, streamid, 0);
    };
    ;
    /*
     *    "ops.1": "ZegoStreamCenter.onPlayStop",
     */
    ZegoStreamCenterWechat.prototype.onPlayerStop = function (streamid, playerType, error) {
        this.logger.debug("ops.1 call");
        if (playerType == ENUM_PLAYER_TYPE.play) {
            // this.stopPlayingStream(streamid);
            //callback
            this.reportPlayEvent(streamid, error);
            this.logger.warn("ops.1 play error");
            this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.stop, streamid, error);
        }
        else if (playerType == ENUM_PLAYER_TYPE.publish) {
            // this.stopPublishingStream(streamid);
            this.reportPublishEvent(streamid, error);
            this.logger.warn("ops.1 publish error");
            this.onPublishStateUpdate(ENUM_PLAY_STATE_UPDATE.stop, streamid, error);
        }
    };
    ;
    /*
     *    "opr.0": "ZegoStreamCenter.onPlayStop",
     */
    ZegoStreamCenterWechat.prototype.onPlayerRetry = function (streamid, playerType) {
        this.logger.debug("opr.0 call");
        if (playerType == ENUM_PLAYER_TYPE.play)
            this.onPlayStateUpdate(ENUM_PLAY_STATE_UPDATE.retry, streamid, 0);
        else if (playerType == ENUM_PLAYER_TYPE.publish)
            this.onPublishStateUpdate(ENUM_PLAY_STATE_UPDATE.retry, streamid, 0);
    };
    ;
    ZegoStreamCenterWechat.prototype.onPlayerQuality = function (streamid, streamQuality, playerType) {
        if (playerType == ENUM_PLAYER_TYPE.play)
            this.onPlayQualityUpdate(streamid, streamQuality);
        else if (playerType == ENUM_PLAYER_TYPE.publish)
            this.onPublishQualityUpdate(streamid, streamQuality);
    };
    ;
    /*
     *    "opuu.0": "ZegoStreamCenter.onPlayUrlUpdated",
     */
    ZegoStreamCenterWechat.prototype.onStreamUrlUpdate = function (streamid, url, playerType) {
        this.logger.debug("opuu.0 call");
        //callback
        this.onPlayerStreamUrlUpdate(streamid, url, playerType);
    };
    ;
    ZegoStreamCenterWechat.prototype.onPlayerVideoSizeChanged = function (streamid) {
        this.onVideoSizeChanged(streamid);
    };
    ;
    return ZegoStreamCenterWechat;
}(ZegoStreamCenter_1.ZegoStreamCenter));
exports.ZegoStreamCenterWechat = ZegoStreamCenterWechat;


/***/ }),

/***/ "./sdk/wechatMini/zego.webSocket.ts":
/*!******************************************!*\
  !*** ./sdk/wechatMini/zego.webSocket.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ZegoWebSocket = /** @class */ (function () {
    function ZegoWebSocket(url, protocol) {
        this.url = url;
        this.protocol = protocol || null;
        this.readyState = 3;
        this._websocket = wx.connectSocket({
            url: url,
        });
        this.init();
    }
    ZegoWebSocket.prototype.init = function () {
        var _this = this;
        if (this._websocket) {
            this.readyState = 0;
            this._websocket.onOpen(function (e) {
                _this.readyState = _this._websocket.readyState;
                if (typeof _this.onopen === "function") {
                    _this.onopen(e);
                    _this._websocket.onClose(function (e) {
                        _this.readyState = _this._websocket.readyState;
                        if (typeof _this.onclose === "function") {
                            _this.onclose(e);
                        }
                    });
                    _this._websocket.onMessage(function (data) {
                        if (typeof _this.onmessage === "function") {
                            _this.onmessage(data);
                        }
                    });
                }
            });
            this._websocket.onError(function (e) {
                _this.readyState = _this._websocket.readyState;
                if (typeof _this.onerror === "function") {
                    _this.onerror(e);
                }
            });
        }
    };
    ZegoWebSocket.prototype.onopen = function (e) { };
    ;
    ZegoWebSocket.prototype.onerror = function (e) { };
    ;
    ZegoWebSocket.prototype.onclose = function (e) { };
    ;
    ZegoWebSocket.prototype.onmessage = function (e) { };
    ;
    ZegoWebSocket.prototype.send = function (msg) {
        this._websocket && this._websocket.send({
            data: msg
        });
    };
    ;
    ZegoWebSocket.prototype.close = function () {
        this._websocket && this._websocket.close();
    };
    ;
    return ZegoWebSocket;
}());
exports.ZegoWebSocket = ZegoWebSocket;


/***/ })

/******/ });
});