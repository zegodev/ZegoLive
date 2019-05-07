!function (t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var r = e();
        for (var s in r) ("object" == typeof exports ? exports : t)[s] = r[s]
    }
}("undefined" != typeof self ? self : this, function () {
    return function (t) {
        var e = {};

        function r(s) {
            if (e[s]) return e[s].exports;
            var o = e[s] = {i: s, l: !1, exports: {}};
            return t[s].call(o.exports, o, o.exports, r), o.l = !0, o.exports
        }

        return r.m = t, r.c = e, r.d = function (t, e, s) {
            r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: s})
        }, r.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
        }, r.t = function (t, e) {
            if (1 & e && (t = r(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var s = Object.create(null);
            if (r.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var o in t) r.d(s, o, function (e) {
                return t[e]
            }.bind(null, o));
            return s
        }, r.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return r.d(e, "a", e), e
        }, r.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, r.p = "", r(r.s = 3)
    }([function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0}), e.PROTO_VERSION = "1.1.2", e.ROOMVERSION = "V1", function (t) {
            t[t.debug = 0] = "debug", t[t.info = 1] = "info", t[t.warn = 2] = "warn", t[t.error = 3] = "error", t[t.report = 99] = "report", t[t.disable = 100] = "disable"
        }(e.ENUM_LOG_LEVEL || (e.ENUM_LOG_LEVEL = {})), function (t) {
            t[t.disable = 0] = "disable", t[t.websocket = 1] = "websocket", t[t.https = 2] = "https"
        }(e.ENUM_REMOTE_TYPE || (e.ENUM_REMOTE_TYPE = {}));
        var s = function () {
            function t(t, e) {
                void 0 === t && (t = null), void 0 === e && (e = null), this._id = null, this.next = null, this.prev = null, this._id = t, this._data = e
            }

            return Object.defineProperty(t.prototype, "id", {
                get: function () {
                    return this._id
                }, set: function (t) {
                    this._id = t
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "data", {
                get: function () {
                    return this._data
                }, set: function (t) {
                    this._data = t
                }, enumerable: !0, configurable: !0
            }), t.prototype.hasNext = function () {
                return this.next && this.next.id
            }, t.prototype.hasPrev = function () {
                return this.prev && this.prev.id
            }, t
        }();
        e.ListNode = s;
        var o = function () {
            function t() {
                this.start = new s, this.end = new s, this._idCounter = 0, this._numNodes = 0, this.start.next = this.end, this.start.prev = null, this.end.prev = this.start, this.end.next = null
            }

            return t.prototype.insertBefore = function (t, e) {
                var r = new s(this._idCounter, e);
                return r.next = t, r.prev = t.prev, t.prev.next = r, t.prev = r, ++this._idCounter, ++this._numNodes, r
            }, t.prototype.addLast = function (t) {
                return this.insertBefore(this.end, t)
            }, t.prototype.add = function (t) {
                return this.addLast(t)
            }, t.prototype.getFirst = function () {
                return 0 === this._numNodes ? null : this.start.next
            }, t.prototype.getLast = function () {
                return 0 === this._numNodes ? null : this.end.prev
            }, t.prototype.size = function () {
                return this._numNodes
            }, t.prototype.getFromFirst = function (t) {
                var e = 0, r = this.start.next;
                if (t >= 0) for (; e < t && null !== r;) r = r.next, ++e; else r = null;
                if (null === r) throw"Index out of bounds.";
                return r
            }, t.prototype.get = function (t) {
                return 0 === t ? this.getFirst() : t === this._numNodes - 1 ? this.getLast() : this.getFromFirst(t)
            }, t.prototype.remove = function (t) {
                return t.prev.next = t.next, t.next.prev = t.prev, --this._numNodes, t
            }, t.prototype.removeFirst = function () {
                var t = null;
                return this._numNodes > 0 && (t = this.remove(this.start.next)), t
            }, t.prototype.removeLast = function () {
                var t = null;
                return this._numNodes > 0 && (t = this.remove(this.end.prev)), t
            }, t.prototype.removeAll = function () {
                this.start.next = this.end, this.end.prev = this.start, this._numNodes = 0, this._idCounter = 0
            }, t.prototype.each = function (t) {
                for (var e = this.start; e.hasNext();) t(e = e.next)
            }, t.prototype.find = function (t) {
                for (var e = this.start, r = !1, s = null; e.hasNext() && !r;) t(e = e.next) && (s = e, r = !0);
                return s
            }, t.prototype.map = function (t) {
                for (var e = this.start, r = []; e.hasNext();) t(e = e.next) && r.push(e);
                return r
            }, t.prototype.push = function (t) {
                return this.addLast(t)
            }, t.prototype.unshift = function (t) {
                this._numNodes > 0 ? this.insertBefore(this.start.next, t) : this.insertBefore(this.end, t)
            }, t.prototype.pop = function () {
                return this.removeLast()
            }, t.prototype.shift = function () {
                return this.removeFirst()
            }, t
        }();
        e.LinkedList = o, e.sdkErrorList = {
            SUCCESS: {code: "ZegoClient.Success", msg: "success."},
            PARAM: {code: "ZegoClient.Error.Param", msg: "input error."},
            HEARTBEAT_TIMEOUT: {code: "ZegoClient.Error.Timeout", msg: "heartbeat timeout."},
            LOGIN_TIMEOUT: {code: "ZegoClient.Error.Timeout", msg: "login timeout."},
            SEND_MSG_TIMEOUT: {code: "ZegoClient.Error.Timeout", msg: "send customsg timeout."},
            RESET_QUEUE: {code: "ZegoClient.Error.Timeout", msg: "msg waiting ack is clear when reset."},
            LOGIN_DISCONNECT: {code: "ZegoClient.Error.Network", msg: "network is broken and login fail."},
            KICK_OUT: {code: "ZegoClient.Error.Kickout", msg: "kickout reason="},
            UNKNOWN: {code: "ZegoClient.Error.Unknown", msg: "unknown error."},
            FREQ_LIMITED: {code: "ZegoClient.Error.requencyLimited", msg: "Frequency Limited."}
        }, function (t) {
            t[t.disconnected = 0] = "disconnected", t[t.connecting = 1] = "connecting", t[t.connected = 2] = "connected"
        }(e.ENUM_SIGNAL_STATE || (e.ENUM_SIGNAL_STATE = {})), e.ENUM_RESOLUTION_TYPE = {
            LOW: {
                width: 240,
                height: 320,
                frameRate: 15,
                bitRate: 300
            },
            MEDIUM: {width: 480, height: 640, frameRate: 15, bitRate: 800},
            HIGH: {width: 720, height: 1280, frameRate: 20, bitRate: 1500}
        }, e.ENUM_RETRY_STATE = {didNotStart: 0, retrying: 1, finished: 2}, e.ENUM_PUBLISH_STATE = {
            start: 0,
            waitingSessionRsp: 1,
            waitingOffserRsp: 2,
            waitingServerAnswer: 3,
            waitingServerICE: 4,
            connecting: 5,
            publishing: 6,
            stop: 7,
            didNotStart: 8
        }, e.ENUM_PLAY_STATE = {
            start: 0,
            waitingSessionRsp: 1,
            waitingOffserRsp: 2,
            waitingServerAnswer: 3,
            waitingServerICE: 4,
            connecting: 5,
            playing: 6,
            stop: 7,
            didNotStart: 8
        }, e.ENUM_CONNECT_STATE = {
            disconnect: 0,
            connecting: 1,
            connected: 2
        }, e.MAX_TRY_CONNECT_COUNT = 3, e.SEND_MSG_RESET = 2, e.SEND_MSG_TIMEOUT = 1, e.MAX_TRY_HEARTBEAT_COUNT = 5, e.ENUM_PUBLISH_STREAM_STATE = {
            waiting_url: 1,
            tryPublish: 2,
            update_info: 3,
            publishing: 4,
            stop: 5
        }, e.ENUM_STREAM_SUB_CMD = {
            liveNone: 0,
            liveBegin: 2001,
            liveEnd: 2002,
            liveUpdate: 2003
        }, e.ENUM_STREAM_UPDATE_TYPE = {added: 0, deleted: 1}, function (t) {
            t[t.logout = 0] = "logout", t[t.trylogin = 1] = "trylogin", t[t.login = 2] = "login"
        }(e.ENUM_RUN_STATE || (e.ENUM_RUN_STATE = {})), e.ENUM_PUBLISH_STATE_UPDATE = {
            start: 0,
            error: 1,
            retry: 2
        }, e.ENUM_PLAY_STATE_UPDATE = {
            start: 0,
            error: 1,
            retry: 2
        }, e.MAX_TRY_LOGIN_COUNT = 5, e.TRY_LOGIN_INTERVAL = [2e3, 2e3, 3e3, 3e3, 4e3], e.MINIUM_HEARTBEAT_INTERVAL = 3e3, e.ENUM_STREAM_UPDATE_CMD = {
            added: 12001,
            deleted: 12002,
            updated: 12003
        }, e.SERVER_ERROR_CODE = 1e4, e.MIXSTREAM_ERROR_CODE = 1e4, function (t) {
            t[t.low = 1] = "low", t[t.stantard = 2] = "stantard", t[t.hight = 3] = "hight", t[t.custome = 4] = "custome"
        }(e.QUALITYLEVEL || (e.QUALITYLEVEL = {})), e.ENUM_SIGNAL_SUB_CMD = {
            none: 0,
            joinLiveRequest: 1001,
            joinLiveResult: 1002,
            joinLiveInvite: 1003,
            joinLiveStop: 1004
        }, e.ENUM_PUSH_SIGNAL_SUB_CMD = {
            none: 0,
            pushJoinLiveRequest: 11001,
            pushJoinLiveResult: 11002,
            pushJoinLiveInvite: 11003,
            pushJoinLiveStop: 11004
        }, function (t) {
            t[t.auto = 0] = "auto", t[t.ultra = 1] = "ultra"
        }(e.ENUM_PLAY_SOURCE_TYPE || (e.ENUM_PLAY_SOURCE_TYPE = {})), function (t) {
            t[t.cdn = 0] = "cdn", t[t.ultra = 1] = "ultra", t[t.customUrl = 2] = "customUrl"
        }(e.ENUM_DISPATCH_TYPE || (e.ENUM_DISPATCH_TYPE = {})), function (t) {
            t[t.ClientType_None = 0] = "ClientType_None", t[t.ClientType_H5 = 1] = "ClientType_H5", t[t.ClientType_SmallPragram = 2] = "ClientType_SmallPragram", t[t.ClientType_Webrtc = 3] = "ClientType_Webrtc"
        }(e.E_CLIENT_TYPE || (e.E_CLIENT_TYPE = {}))
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = function () {
            function t() {
            }

            return t.checkConfigParam = function (t, e) {
                return t.appid && "number" == typeof t.appid ? t.server ? !(!t.idName || "string" != typeof t.idName) || (e.error("ccp.0 idName must be string and not empty"), !1) : (e.error("ccp.0 server must be string and not empty"), !1) : (e.error("ccp.0 appid must be number"), !1)
            }, t.checkLoginParam = function (t, e) {
                return !0
            }, t.registerCallback = function (t, e, r) {
                var s, o;
                e.success && (s = e.success), e.error && (o = e.error), r[t + "SuccessCallback"] = s, r[t + "ErrorCallback"] = o
            }, t.actionErrorCallback = function (t, e) {
                return e[t + "ErrorCallback"]
            }, t.actionSuccessCallback = function (t, e) {
                return e[t + "SuccessCallback"]
            }, t.getServerError = function (t) {
                var e = {
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
                    1000000000: "liveroom cmd error, result="
                };
                if (0 === t) return {code: "ZegoClient.Success", msg: "success"};
                var r = {code: "ZegoClient.Error.Server", msg: ""};
                return r.msg = t > 1e9 ? e[1e9] + t : e[t] ? "unknown error code:" + t : e[t], r
            }, t.isKeepTryLogin = function (t) {
                switch (t) {
                    case 1002:
                    case 1003:
                        return !0;
                    default:
                        return !1
                }
            }, t.mergeStreamList = function (t, e, r, s, o) {
                t.debug("msl.0 call");
                var i, n = [], a = [], h = [];
                s || (s = []);
                for (var l = 0; l < s.length; l++) if (s[l].anchor_id_name != e) {
                    i = !1;
                    for (var u = 0; u < r.length; u++) if (s[l].stream_id === r[u].stream_id) {
                        s[l].extra_info !== r[u].extra_info && h.push(s[l]), i = !0;
                        break
                    }
                    i || n.push(s[l])
                } else t.debug("msl.0 have self stream added");
                for (var c = 0; c < r.length; c++) {
                    i = !1;
                    for (var d = 0; d < s.length; d++) if (s[d].anchor_id_name != e) {
                        if (r[c].stream_id === s[d].stream_id) {
                            i = !0;
                            break
                        }
                    } else t.debug("msl.0 have self stream deleted");
                    i || a.push(r[c])
                }
                r.splice(0);
                for (l = 0; l < s.length; l++) r.push(s[l]);
                o(n, a, h), t.debug("msl.0 call success")
            }, t.checkCustomCommandParam = function (t) {
                return !0
            }, t.generateRandumNumber = function (t) {
                return parseInt(Math.random() * (t + 1) + "", 10)
            }, t.uuid = function (t, e) {
                var r, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), o = [];
                if (e = e || s.length, t) for (r = 0; r < t; r++) o[r] = s[0 | Math.random() * e]; else {
                    var i = void 0;
                    for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", r = 0; r < 36; r++) o[r] || (i = 0 | 16 * Math.random(), o[r] = s[19 == r ? 3 & i | 8 : i])
                }
                return o.join("")
            }, t.isSupportWebrtc = function () {
                var t = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                    e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
                    r = window.WebSocket;
                return !!t && !!e && !!r
            }, t.isSupportH264 = function (t, e) {
                var r = !1;
                new RTCPeerConnection(null).createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }).then(function (e) {
                    if (e && e.sdp) {
                        r = !0, clearTimeout(s);
                        var o = e.sdp.split("\r\n").some(function (t) {
                            return t.startsWith("a=rtpmap:") && t.indexOf("H264/") > -1
                        });
                        t && t(o)
                    }
                }, function (t) {
                    r = !0, clearTimeout(s), e && e(t)
                });
                var s = setTimeout(function () {
                    0 == r && e(!1)
                }, 200)
            }, t
        }();
        e.ClientUtil = s
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = function () {
            function t(t, e) {
                this.url = t, this.protocol = e || null, this.readyState = 3, this._websocket = wx.connectSocket({url: t}), this.init()
            }

            return t.prototype.init = function () {
                var t = this;
                this._websocket && (this.readyState = 0, this._websocket.onOpen(function (e) {
                    t.readyState = t._websocket.readyState, "function" == typeof t.onopen && (t.onopen(e), t._websocket.onClose(function (e) {
                        t.readyState = t._websocket.readyState, "function" == typeof t.onclose && t.onclose(e)
                    }), t._websocket.onMessage(function (e) {
                        "function" == typeof t.onmessage && t.onmessage(e)
                    }))
                }), this._websocket.onError(function (e) {
                    t.readyState = t._websocket.readyState, "function" == typeof t.onerror && t.onerror(e)
                }))
            }, t.prototype.onopen = function (t) {
            }, t.prototype.onerror = function (t) {
            }, t.prototype.onclose = function (t) {
            }, t.prototype.onmessage = function (t) {
            }, t.prototype.send = function (t) {
                this._websocket && this._websocket.send({data: t})
            }, t.prototype.close = function () {
                this._websocket && this._websocket.close()
            }, t
        }();
        e.ZegoWebSocket = s
    }, function (t, e, r) {
        "use strict";
        var s,
            o = this && this.__extends || (s = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }, function (t, e) {
                function r() {
                    this.constructor = t
                }

                s(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            });
        Object.defineProperty(e, "__esModule", {value: !0});
        var i = r(4), n = r(8), a = r(2), h = r(0), l = r(10), u = r(18), c = function (t) {
            function e() {
                var e = t.call(this) || this;
                return e.preferPlaySourceType = h.ENUM_PLAY_SOURCE_TYPE.auto, e.preferPublishSourceType = h.ENUM_DISPATCH_TYPE.ultra, e.currentPlaySourceType = h.ENUM_DISPATCH_TYPE.cdn, e.mixStreamList = {}, e.ultraPlaySourceType = "rtmp_v2", e.logger = new n.LoggerWechat, e.stateCenter = new u.StateCenter, e.streamCenter = new i.ZegoStreamCenterWechat(e.logger, e.stateCenter), e.init(), e
            }

            return o(e, t), e.prototype.getSocket = function (t) {
                return new a.ZegoWebSocket(t)
            }, e.prototype.setPreferPlaySourceType = function (t) {
                return this.logger.debug("zc.p.sppst.0 call"), "number" != typeof t || t !== h.ENUM_PLAY_SOURCE_TYPE.auto && t !== h.ENUM_PLAY_SOURCE_TYPE.ultra ? (this.logger.info("zc.p.sppst.0 param error"), !1) : (this.preferPlaySourceType = t, this.logger.debug("zc.p.sppst.0 call success"), !0)
            }, e.prototype.setPreferPublishSourceType = function (t, e) {
                return this.logger.debug("zc.p.sppst.1 call"), "number" != typeof t || t !== h.ENUM_DISPATCH_TYPE.cdn && t !== h.ENUM_DISPATCH_TYPE.ultra && t !== h.ENUM_DISPATCH_TYPE.customUrl ? (this.logger.error("zc.p.sppst.1 param error"), !1) : t !== h.ENUM_DISPATCH_TYPE.customUrl || e ? (this.preferPublishSourceType = t, this.customCdnUrl = e, this.logger.debug("zc.p.sppst.1 call success"), !0) : (this.logger.error("zc.p.sppst.1 param error"), !1)
            }, e.prototype.startPlayingStream = function (t, e) {
                return this.logger.debug("zc.p.sps.0 call"), t && "" !== t ? this.stateCenter.isLogin() ? (this.streamCenter.updatePlayingState(t, e, !0), this.streamCenter.isPublishing() ? this.preferPublishSourceType == h.ENUM_DISPATCH_TYPE.cdn ? this.startPlayingStreamFromCDN(t) : this.startPlayingStreamFromBGP(t) : this.preferPlaySourceType == h.ENUM_PLAY_SOURCE_TYPE.ultra ? this.startPlayingStreamFromBGP(t) : this.startPlayingStreamFromCDN(t)) : (this.logger.info("zc.p.sps.0 not login"), !1) : (this.logger.info("zc.p.sps.0 param error"), !1)
            }, e.prototype.stopPlayingStream = function (t) {
                if (this.logger.debug("zc.p.sps.1.0 call"), !t || "" === t) return this.logger.info("zc.p.sps.1.0 param error"), !1;
                for (var e in this.streamCenter.stopPlayingStream(t), this.stateCenter.streamUrlMap) if (this.stateCenter.streamUrlMap[e] === t) {
                    delete this.stateCenter.streamUrlMap[e];
                    break
                }
                return this.logger.debug("zc.p.sps.1.0 call success"), !0
            }, e.prototype.startPublishingStream = function (t, e, r) {
                if (void 0 === e && (e = ""), void 0 === r && (r = ""), this.logger.debug("zc.p.sps.1 call"), !t) return this.logger.error("zc.p.sps.1 param error"), !1;
                if (!this.stateCenter.isLogin()) return this.logger.error("zc.p.sps.1 not login"), !1;
                if (this.stateCenter.publishStreamList[t] = {
                    state: h.ENUM_PUBLISH_STREAM_STATE.waiting_url,
                    extra_info: r
                }, this.logger.info("zc.p.sps.0 fetch stream url"), this.streamCenter.updatePublishingState(t, e, !0), this.fetchPublishStreamUrl(t), this.streamCenter.isPlaying() && this.preferPublishSourceType == h.ENUM_DISPATCH_TYPE.ultra && this.currentPlaySourceType == h.ENUM_DISPATCH_TYPE.cdn) for (var s = 0; s < this.streamCenter.playingList.length; s++) {
                    var o = this.streamCenter.playingList[s].streamid, i = this.streamCenter.playingList[s].params;
                    this.stopPlayingStream(o), this.streamCenter.updatePlayingState(o, i, !0), this.startPlayingStreamFromBGP(o)
                }
                return !0
            }, e.prototype.stopPublishingStream = function (t) {
                return this.logger.debug("zc.p.sps.1.1 call"), t && "" !== t ? (this.streamCenter.stopPublishingStream(t), this.stateCenter.publishStreamList[t] && (this.stateCenter.publishStreamList[t].state >= h.ENUM_PUBLISH_STREAM_STATE.update_info && this.updateStreamInfo(t, h.ENUM_STREAM_SUB_CMD.liveEnd), delete this.stateCenter.publishStreamList[t]), this.stateCenter.streamUrlMap[t] && delete this.stateCenter.streamUrlMap[t], this.logger.debug("zc.p.sps.1.1 call success"), !0) : (this.logger.info("zc.p.sps.1.1 param error"), !1)
            }, e.prototype.updatePlayerState = function (t, e) {
                this.logger.debug("zc.p.upe.0 call"), this.streamCenter.updatePlayerState(t, e)
            }, e.prototype.updatePlayerNetStatus = function (t, e) {
                this.logger.debug("zc.p.upns.0 call"), this.streamCenter.updatePlayerNetStatus(t, e)
            }, e.prototype.startPlayingMixStream = function (t, e) {
                return this.logger.debug("zc.p.spms.0 call"), t && "" !== t ? this.stateCenter.isLogin() ? (this.streamCenter.updatePlayingState(t, e, !0), this.mixStreamList[t] = {urltra_url_rtmp: null}, this.fetchPlayStreamUrl(t, "rtmp_cdn"), this.logger.debug("zc.p.spms.0 call success"), !0) : (this.logger.info("zc.p.spms.0 not login"), !1) : (this.logger.info("zc.p.spms.0 param error"), !1)
            }, e.prototype.stopPlayingMixStream = function (t) {
                if (this.logger.debug("zc.p.spms.1 call"), !t || "" === t) return this.logger.info("zc.p.spms.1 param error"), !1;
                for (var e in this.streamCenter.stopPlayingStream(t), this.stateCenter.streamUrlMap) if (this.stateCenter.streamUrlMap[e] === t) {
                    delete this.stateCenter.streamUrlMap[e];
                    break
                }
                return delete this.mixStreamList[t], this.logger.debug("zc.p.spms.1 call success"), !0
            }, e.prototype.startPlayingStreamFromCDN = function (t) {
                this.logger.debug("zc.p.spsfc.0 call");
                for (var e = null, r = 0; r < this.stateCenter.streamList.length; r++) if (this.stateCenter.streamList[r].stream_id === t) {
                    e = this.stateCenter.streamList[r].urls_rtmp || [];
                    break
                }
                return !e || e.length <= 0 ? (this.logger.error("zc.p.spsfc.0 cannot find stream url"), !1) : (this.currentPlaySourceType = h.ENUM_DISPATCH_TYPE.cdn, this.logger.debug("zc.p.spsfc.0 play stream"), this.doPlayStream(t, e, this.currentPlaySourceType))
            }, e.prototype.startPlayingStreamFromBGP = function (t) {
                return this.currentPlaySourceType = h.ENUM_DISPATCH_TYPE.ultra, this.logger.info("zc.p.sps.0 fetch stream url"), this.fetchPlayStreamUrl(t, this.ultraPlaySourceType), !0
            }, e.prototype.fetchPublishStreamUrl = function (t) {
                var e = this;
                if (this.logger.debug("fpsu.0 call"), this.stateCenter.isLogin()) {
                    this.logger.info("fpsu.0 send fetch publish request");
                    var r = "";
                    this.preferPublishSourceType == h.ENUM_DISPATCH_TYPE.cdn ? r = "cdn" : this.preferPublishSourceType == h.ENUM_DISPATCH_TYPE.ultra && (r = "bgp");
                    var s = {
                        stream_id: t,
                        url_type: this.ultraPlaySourceType,
                        publish_type: r,
                        header_kvs: [{key: "grpc-metadata-push", value: this.customCdnUrl || ""}]
                    };
                    this.socketCenter.registerRouter("stream_publish", function (t) {
                        e.handleFetchStreamPublishUrlRsp(t)
                    });
                    var o = this.socketCenter.sendMessage("stream_publish", s);
                    -1 == o ? (this.onPublishStateUpdate(1, t, -1), this.streamCenter.stopPublishingStream(t)) : this.stateCenter.streamUrlMap[o] = t, this.logger.debug("fpsu.0 call success")
                } else this.logger.error("fpsu.0 state error")
            }, e.prototype.fetchPlayStreamUrl = function (t, e) {
                var r = this;
                if (this.logger.debug("fsu.0 call"), this.stateCenter.isLogin()) {
                    this.logger.info("fsu.0 send fetch request");
                    var s = {stream_ids: [t], url_type: e};
                    this.socketCenter.registerRouter("stream_url", function (t) {
                        r.handleFetchStreamUrlRsp(t)
                    });
                    var o = this.socketCenter.sendMessage("stream_url", s, void 0, function (t, e) {
                        r.stateCenter.streamUrlMap[e] ? r.onPlayStateUpdate(1, r.stateCenter.streamUrlMap[e], -1) : r.logger.info("fsu.0 already stop play")
                    });
                    -1 == o ? this.onPlayStateUpdate(1, t, -1) : this.stateCenter.streamUrlMap[o] = t, this.logger.debug("fsu.0 call success")
                } else this.logger.info("fsu.0 state error")
            }, e.prototype.updateStreamInfo = function (t, e, r, s) {
                this.logger.debug("usi.0 call");
                var o = "";
                null != r && "string" == typeof r && (o = r);
                var i = {stream_id: t, extra_info: o}, n = {sub_cmd: e, stream_msg: JSON.stringify(i)};
                this.socketCenter.registerRouter("stream", function (t) {
                }), this.socketCenter.sendMessage("stream", n, void 0, s), this.logger.debug("usi.0 call success cmd " + e)
            }, e.prototype.handleStreamUpdateRsp = function (t) {
                if (this.stateCenter.isLogin()) if (0 == t.body.err_code) {
                    this.logger.debug("hsur.0 stream seq " + this.stateCenter.streamSeq + " server seq " + t.body.stream_seq), this.stateCenter.streamSeq = t.body.stream_seq;
                    for (var e = 0; e < t.body.stream_info.length; e++) {
                        var r = t.body.stream_info[e].stream_id;
                        if (!this.stateCenter.publishStreamList[r]) return void this.logger.info("hsur.0 stream is not exist");
                        this.stateCenter.publishStreamList[r].state == h.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[r].state = h.ENUM_PUBLISH_STREAM_STATE.publishing, this.onPublishStateUpdate(0, r, 0))
                    }
                } else this.logger.info("hsur.0 stream update error " + t.body.err_code); else this.logger.info("hsur.0 not login")
            }, e.prototype.doPlayStream = function (t, e, r) {
                return this.logger.debug("zc.p.dps.0 call"), !(!e || e.length <= 0) && (this.streamCenter.startPlayingStream(t, e, r), !0)
            }, e.prototype.handleFetchStreamPublishUrlRsp = function (t) {
                this.logger.debug("hfspur.0 call");
                var e = this.stateCenter.streamUrlMap[t.header.seq];
                if (e && delete this.stateCenter.streamUrlMap[t.header.seq], 0 !== t.body.err_code) return this.logger.info("hfspur.0 server error=", t.body.err_code), void(this.stateCenter.publishStreamList[e] && (this.onPublishStateUpdate(1, e, t.body.err_code + h.SERVER_ERROR_CODE), this.streamCenter.stopPublishingStream(e)));
                if (t.body.stream_url_info) {
                    var r = t.body.stream_url_info.stream_id, s = t.body.stream_url_info.urls_ws;
                    if (!this.stateCenter.publishStreamList[r]) return void this.logger.error("hfspur.0 cannot find stream");
                    this.stateCenter.publishStreamList[r].url_rtmp = s, this.stateCenter.publishStreamList[r].state = h.ENUM_PUBLISH_STREAM_STATE.tryPublish, this.doPublishStream(r, s)
                }
            }, e.prototype.handleFetchStreamUrlRsp = function (t) {
                this.logger.debug("hfsur.0 call");
                var e = this.stateCenter.streamUrlMap[t.header.seq];
                if (e && delete this.stateCenter.streamUrlMap[t.header.seq], 0 !== t.body.err_code) return this.logger.debug("hfsur.0 server error=", t.body.err_code), void this.onPlayStateUpdate(1, e, t.body.err_code + h.SERVER_ERROR_CODE);
                if (t.body.stream_url_infos && t.body.stream_url_infos.length > 0) {
                    for (var r = t.body.stream_url_infos[0].stream_id, s = t.body.stream_url_infos[0].urls_ws, o = this.currentPlaySourceType, i = !1, n = 0; n < this.stateCenter.streamList.length; n++) if (this.stateCenter.streamList[n].stream_id == r) {
                        this.stateCenter.streamList[n].urltra_url_rtmp = s, i = !0;
                        break
                    }
                    !i && this.mixStreamList[r] && (this.mixStreamList[r].urltra_url_rtmp = s, o = h.ENUM_DISPATCH_TYPE.cdn, i = !0), i || (this.logger.info("hfsur.0 cannot find streaminfo in existing stream list"), this.stateCenter.streamList.push({
                        stream_id: r,
                        urltra_url_rtmp: s
                    })), this.doPlayStream(r, s, o)
                }
                this.logger.debug("hfsur.0 call success")
            }, e.prototype.doPublishStream = function (t, e) {
                return this.logger.debug("zc.p.dps.1 call"), !(!e || e.length <= 0) && (this.logger.info("zc.p.dps.1 streamid: " + t + "streamUrl: " + e), this.streamCenter.startPublishingStream(t, e, this.preferPublishSourceType), this.logger.debug("zc.p.dps.1 call success"), !0)
            }, e.prototype.setCDNInfo = function (t, e) {
            }, e.prototype.loginBodyData = function () {
                return {
                    id_name: this.stateCenter.idName,
                    nick_name: this.stateCenter.nickName,
                    role: this.stateCenter.role,
                    token: this.stateCenter.token,
                    version: h.PROTO_VERSION,
                    room_name: this.stateCenter.roomid,
                    user_state_flag: this.stateCenter.userStateUpdate ? 1 : 0,
                    room_create_flag: this.stateCenter.roomCreateFlag,
                    client_type: h.E_CLIENT_TYPE.ClientType_SmallPragram,
                    third_token: this.stateCenter.third_token
                }
            }, e.prototype.WebrtcOnPublishStateUpdateHandle = function (t, e, r) {
            }, e
        }(l.BaseCenter);
        e.ZegoClient = c
    }, function (t, e, r) {
        "use strict";
        var s,
            o = this && this.__extends || (s = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }, function (t, e) {
                function r() {
                    this.constructor = t
                }

                s(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            });
        Object.defineProperty(e, "__esModule", {value: !0});
        var i = r(5), n = r(6), a = r(7), h = 0, l = 1, u = 2, c = 0, d = 1, p = function (t) {
            function e(e, r) {
                var s = t.call(this, e, r) || this;
                return s.playerList = {}, s.playerCount = 0, s.playingList = [], s.publishingList = [], s.eventSeq = 0, s.streamEventMap = {}, s.playerWaitingList = [], s.playerStatistics = {}, s.logger = e, s.dataReport = new n.ZegoDataReport(s.logger), s
            }

            return o(e, t), e.prototype.updatePlayingState = function (t, e, r) {
                null != t && (this.updateStreamState(t, r, e, this.playingList), r ? (this.eventSeq += 1, this.streamEventMap[t] = this.eventSeq, this.dataReport.newReport(this.eventSeq), this.dataReport.eventStart(this.eventSeq, "GotPlayInfo")) : this.reportPlayEvent(t))
            }, e.prototype.updatePublishingState = function (t, e, r) {
                void 0 === e && (e = ""), void 0 === r && (r = !1), null != t && (this.updateStreamState(t, r, e, this.publishingList), r ? (this.eventSeq += 1, this.streamEventMap[t] = this.eventSeq, this.dataReport.newReport(this.eventSeq), this.dataReport.eventStart(this.eventSeq, "GotPublishInfo")) : this.reportPublishEvent(t))
            }, e.prototype.updateStreamState = function (t, e, r, s) {
                if (t) if (r && "string" == typeof r || (r = ""), 1 == e) s.push({
                    streamid: t,
                    params: r
                }); else for (var o = 0; o < s.length; o++) if (s[o].streamid == t) {
                    s.splice(o, 1);
                    break
                }
            }, e.prototype.isPlaying = function () {
                return 0 != this.playingList.length
            }, e.prototype.isPublishing = function () {
                return 0 != this.publishingList.length
            }, e.prototype.startPlayingStream = function (t, e, r) {
                this.logger.debug("zpc.sps.0 call");
                var s = this.streamEventMap[t];
                if (s) {
                    var o = "";
                    0 == r ? o = "cdn" : 1 == r && (o = "ultra_src"), this.dataReport.eventEndWithMsg(s, "GotPlayInfo", {
                        type: o,
                        urls: e
                    })
                }
                return this.startPlayer(t, e, r, c)
            }, e.prototype.startPlayer = function (t, e, r, s) {
                var o = this.playerList[t];
                if (o) return !0;
                var i = [];
                s == c ? i = this.playingList : s == d && (i = this.publishingList);
                for (var n = !1, h = "", l = 0; l < i.length; l++) if (i[l].streamid == t) {
                    n = !0, h = i[l].params;
                    break
                }
                if (!n) return this.logger.warn("zpc.sp.0 should not start"), !1;
                if ((o = this.playerList[t] = new a.ZegoPlayWechat(this.logger, t, e, h, this.getReconnectLimit(r), this, r, s, this.dataReport)).playerSeq = this.streamEventMap[t], !o) return this.logger.info("zpc.sp.0 new player failed"), !1;
                ++this.playerCount;
                var u = o.tryStartPlayer(0);
                return this.logger.debug("zpc.sp.0 call result:", u), u
            }, e.prototype.stopPlayingStream = function (t) {
                this.logger.debug("zpc.sps.1.0 call"), null != t && (this.stopPlayer(t), this.updatePlayingState(t))
            }, e.prototype.stopPlayer = function (t) {
                var e = this.playerList[t];
                e && (e.stopPlayer(), delete this.playerList[t], --this.playerCount), this.logger.debug("zpc.sp.1.0 call success")
            }, e.prototype.startPublishingStream = function (t, e, r) {
                this.logger.debug("zpc.sps.1 call");
                var s = this.streamEventMap[t];
                if (s) {
                    var o = "";
                    0 == r ? o = "cdn" : 1 == r && (o = "ultra_src"), this.dataReport.eventEndWithMsg(s, "GotPublishInfo", {
                        type: o,
                        urls: e
                    })
                }
                return this.startPlayer(t, e, r, d)
            }, e.prototype.stopPublishingStream = function (t) {
                this.logger.debug("zpc.sps.1.1 call"), null != t && (this.stopPlayer(t), this.updatePublishingState(t, "", !1))
            }, e.prototype.updatePlayerState = function (t, e) {
                var r = this.playerList[t];
                r ? r.updateEvent(e) : this.logger.warn("zpc.upe.1.0 no player " + t), this.logger.debug("zpc.upe.1.0 updatePlayerEvent success")
            }, e.prototype.updatePlayerNetStatus = function (t, e) {
                var r = this.playerList[t];
                r ? r.updatePlayerNetStatus(e) : this.logger.warn("zpc.upns.1.0 no player " + t), this.logger.debug("zpc.upns.1.0 updatePlayerNetStatus success")
            }, e.prototype.reset = function () {
                this.logger.debug("zpc.r.0 call");
                for (var t = 0; t < this.playingList.length; t++) this.stopPlayingStream(this.playingList[t]);
                for (var e = 0; e < this.publishingList.length; e++) this.stopPublishingStream(this.publishingList[e]);
                this.playerCount = 0, this.playerList = {}, this.playerWaitingList = [], this.playerStatistics = {}, this.streamEventMap = {}, this.logger.debug("zpc.r.0 call success")
            }, e.prototype.reportPublishEvent = function (t, e) {
                if (this.streamEventMap[t]) {
                    var r = this.streamEventMap[t];
                    this.dataReport.addMsgExt(r, {
                        stream: t,
                        error: e
                    }), this.dataReport.uploadReport(r, "WXPublishStream"), delete this.streamEventMap[t]
                }
            }, e.prototype.reportPlayEvent = function (t, e) {
                if (this.streamEventMap[t]) {
                    var r = this.streamEventMap[t];
                    this.dataReport.addMsgExt(r, {
                        stream: t,
                        error: e
                    }), this.dataReport.uploadReport(r, "WXPlayStream"), delete this.streamEventMap[t]
                }
            }, e.prototype.onPlayStateUpdate = function (t, e, r) {
            }, e.prototype.onPlayQualityUpdate = function (t, e) {
            }, e.prototype.onPublishStateUpdate = function (t, e, r) {
            }, e.prototype.onPublishQualityUpdate = function (t, e) {
            }, e.prototype.onPlayerStreamUrlUpdate = function (t, e, r) {
            }, e.prototype.onVideoSizeChanged = function (t) {
            }, e.prototype.getReconnectLimit = function (t) {
                return 1
            }, e.prototype.onPlayerStart = function (t, e) {
                this.logger.debug("ops.0 call"), e == c ? this.onPlayStateUpdate(h, t, 0) : e == d && this.onPublishStateUpdate(h, t, 0)
            }, e.prototype.onPlayerStop = function (t, e, r) {
                this.logger.debug("ops.1 call"), e == c ? (this.reportPlayEvent(t, r), this.logger.warn("ops.1 play error"), this.onPlayStateUpdate(l, t, r)) : e == d && (this.reportPublishEvent(t, r), this.logger.warn("ops.1 publish error"), this.onPublishStateUpdate(l, t, r))
            }, e.prototype.onPlayerRetry = function (t, e) {
                this.logger.debug("opr.0 call"), e == c ? this.onPlayStateUpdate(u, t, 0) : e == d && this.onPublishStateUpdate(u, t, 0)
            }, e.prototype.onPlayerQuality = function (t, e, r) {
                r == c ? this.onPlayQualityUpdate(t, e) : r == d && this.onPublishQualityUpdate(t, e)
            }, e.prototype.onStreamUrlUpdate = function (t, e, r) {
                this.logger.debug("opuu.0 call"), this.onPlayerStreamUrlUpdate(t, e, r)
            }, e.prototype.onPlayerVideoSizeChanged = function (t) {
                this.onVideoSizeChanged(t)
            }, e
        }(i.ZegoStreamCenter);
        e.ZegoStreamCenterWechat = p
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = function () {
            function t(t, e) {
                this.playerList = {}, this.publisherList = {}
            }

            return t.prototype.setSessionInfo = function (t, e, r, s) {
            }, t
        }();
        e.ZegoStreamCenter = s
    }, function (t, e, r) {
        "use strict";
        var s = this && this.__assign || Object.assign || function (t) {
            for (var e, r = 1, s = arguments.length; r < s; r++) for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        };
        Object.defineProperty(e, "__esModule", {value: !0});
        var o = function () {
            function t(t) {
                this.log = t, this.dataStatistics = {}, this.logger = t
            }

            return t.prototype.newReport = function (t) {
                this.dataStatistics[t] = {abs_time: Date.now(), time_consumed: 0, error: 0, events: []}
            }, t.prototype.addMsgExt = function (t, e) {
                this.dataStatistics[t] ? this.dataStatistics[t].msg_ext = e : console.warn(t + " not exist")
            }, t.prototype.eventStart = function (t, e) {
                this.dataStatistics[t] ? null != this.dataStatistics[t].events ? this.dataStatistics[t].events.push({
                    event: e,
                    abs_time: Date.now(),
                    time_consumed: 0
                }) : this.logger.warn("zd.es.0 no events") : this.logger.warn("zd.es.0 no seq match")
            }, t.prototype.eventEnd = function (t, e, r) {
                if (this.dataStatistics[t]) {
                    var s = this.dataStatistics[t].events;
                    if (s && 0 !== s.length) {
                        for (var o = s.length - 1; o >= 0; o--) if (s[o].event == e && s[o].time_consumed) {
                            s[o].time_consumed = Date.now() - s[o].abs_time;
                            break
                        }
                    } else this.logger.info("zd.ee.0 no events")
                } else this.logger.info("zd.ee.0 no seq match")
            }, t.prototype.eventEndWithMsg = function (t, e, r) {
                if (this.dataStatistics[t]) {
                    var o = this.dataStatistics[t].events;
                    if (o) {
                        for (var i = o.length - 1; i >= 0; i--) if (o[i].event == e && o[i].time_consumed) {
                            o[i].time_consumed = Date.now() - o[i].abs_time, null == o[i].msg_ext && (o[i].msg_ext = {}), o[i].msg_ext = s({}, r);
                            break
                        }
                    } else this.logger.warn("zd.ee.0 no events")
                } else this.logger.warn("zd.ee.0 no seq match")
            }, t.prototype.addEventInfo = function (t, e, r, s) {
                if (this.dataStatistics[t]) {
                    var o = this.dataStatistics[t].events;
                    if (null != o) {
                        for (var i = o.length - 1; i >= 0; i--) if (o[i].event == e && null != o[i].time_consumed && o[i].event == e && null != o[i].time_consumed) {
                            null == o[i].msg_ext && (o[i].msg_ext = {}), o[i].msg_ext[r] = s;
                            break
                        }
                    } else this.logger.warn("zd.aei.0 no events")
                } else this.logger.warn("zd.aei.0 no seq match")
            }, t.prototype.addEvent = function (t, e, r) {
                this.dataStatistics[t] ? this.dataStatistics[t].events && (r ? this.dataStatistics[t].events.push({
                    event: e,
                    abs_time: Date.now(),
                    msg_ext: r
                }) : this.dataStatistics[t].events.push({
                    event: e,
                    abs_time: Date.now()
                })) : this.logger.warn("zd.ae.0 no seq match")
            }, t.prototype.uploadReport = function (t, e) {
                var r = this.dataStatistics[t];
                null != r && (r.itemtype = e, r.time_consumed = Date.now() - r.abs_time, this.logger.report(r), delete this.dataStatistics[t])
            }, t
        }();
        e.ZegoDataReport = o
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = {start: 0, playing: 1, stop: 2}, o = function () {
            function t(t, e, r, o, i, n, a, h, l) {
                this.playUrlIndex = 0, this.playUrlTryCount = 0, this.currentUrl = null, this.reconnectCount = 0, this.state = s.stop, this.playerSeq = 0, this.publishQualitySeq = 0, this.publishQualityCount = 0, this.publishQulaityMaxCount = 30, this.everSuccess = !1, this.playerLogUploadTime = (new Date).getTime(), this.streamid = e, this.urls = r, this.reconnectLimit = i, this.logger = t, this.streamCenter = n, this.sourceType = a, this.playerType = h, this.params = o, this.dataReport = l
            }

            return t.prototype.resetPlayer = function () {
                this.state = s.stop
            }, t.prototype.newPlayer = function () {
                this.resetPlayer();
                var t = this.getCurrentPlayerUrl(), e = t;
                return 0 != this.params.length && (e = t + "?" + this.params), t !== this.currentUrl ? (this.currentUrl = t, this.streamCenter.onStreamUrlUpdate(this.streamid, e, this.playerType)) : this.streamCenter.onPlayerRetry(this.streamid, this.playerType), 0 == this.everSuccess ? 0 == this.playerType ? (this.dataReport.eventStart(this.playerSeq, "PlayBegin"), this.dataReport.addEventInfo(this.playerSeq, "PlayBegin", "url", e)) : (this.dataReport.eventStart(this.playerSeq, "PublishBegin"), this.dataReport.addEventInfo(this.playerSeq, "PublishBegin", "url", e)) : 0 == this.playerType ? this.dataReport.addEventInfo(this.playerSeq, "PlayRetry", "url", e) : this.dataReport.addEventInfo(this.playerSeq, "PublishRetry", "url", e), this.state = s.start, !0
            }, t.prototype.stopPlayer = function () {
                0 == this.playerType ? this.dataReport.eventEndWithMsg(this.playerSeq, "PlayStat", {quality: this.playerInfo}) : (this.dataReport.addEventInfo(this.playerSeq, "PublishStat", "quality", this.playerInfo), this.dataReport.eventEndWithMsg(this.playerSeq, "PublishStat", {quality: this.playerInfo}))
            }, t.prototype.tryStartPlayer = function (t) {
                for (; this.playUrlTryCount < this.urls.length;) if (++this.reconnectCount > this.reconnectLimit) this.playUrlTryCount++, this.playUrlIndex = (this.playUrlIndex + 1) % this.urls.length, this.reconnectCount = 0; else if (this.logger.info("zp.tsp.0 index: " + this.playUrlIndex + ", url: " + this.getCurrentPlayerUrl()), this.newPlayer()) break;
                if (this.playUrlTryCount >= this.urls.length) {
                    this.logger.info("zp.tsp.0 stream: " + this.streamid), this.resetPlayer();
                    var e = "";
                    0 == this.playerType ? e = "PlayEnd" : 1 == this.playerType && (e = "PublishEnd", this.reportQualityStatics());
                    var r = {error: t, reason: "no url to retry"};
                    this.dataReport.addEvent(this.playerSeq, e, r), this.streamCenter.onPlayerStop(this.streamid, this.playerType, t)
                }
            }, t.prototype.shouldRetryPlay = function (t) {
                var e = t.detail.code;
                return 3001 == e || 3002 == e || 3003 == e || 3005 == e
            }, t.prototype.isPlayFailed = function (t) {
                var e = t.detail.code;
                return -2301 == e || 2101 == e || 2102 == e
            }, t.prototype.shouldRetryPublish = function (t) {
                var e = t.detail.code;
                return 3001 == e || 3002 == e || 3003 == e || 3004 == e || 3005 == e
            }, t.prototype.isPublishFailed = function (t) {
                var e = t.detail.code;
                return -1301 == e || -1302 == e || -1303 == e || -1304 == e || -1305 == e || -1306 == e || -1307 == e || -1308 == e || -1309 == e || -1310 == e || -1311 == e
            }, t.prototype.updateEvent = function (t) {
                if (0 == this.playerType) {
                    if (2004 == t.detail.code) this.everSuccess ? this.dataReport.eventEnd(this.playerSeq, "PlayRetry") : (this.everSuccess = !0, this.dataReport.eventStart(this.playerSeq, "PlayStat")), this.streamCenter.onPlayerStart(this.streamid, this.playerType); else if (2009 == t.detail.code) this.streamCenter.onPlayerVideoSizeChanged(this.streamid); else if (this.shouldRetryPlay(t)) this.dataReport.eventStart(this.playerSeq, "PlayRetry"), this.dataReport.addEventInfo(this.playerSeq, "PlayRetry", "error_code", t.detail.code); else if (this.isPlayFailed(t)) {
                        this.logger.info("zp.ue.0 play error: " + this.streamid), this.resetPlayer();
                        var e = {errorCode: t.detail.code};
                        this.dataReport.addEvent(this.playerSeq, "PlayError", e), this.streamCenter.onPlayerStop(this.streamid, this.playerType, t.detail.code)
                    }
                    this.everSuccess || this.dataReport.eventEnd(this.playerSeq, "PlayBegin")
                } else if (1 == this.playerType) {
                    if (1002 == t.detail.code) this.everSuccess ? this.dataReport.eventEnd(this.playerSeq, "PublishRetry") : (this.everSuccess = !0, this.dataReport.eventStart(this.playerSeq, "PublishStat")), this.streamCenter.onPlayerStart(this.streamid, this.playerType); else if (this.shouldRetryPublish(t)) this.dataReport.eventStart(this.playerSeq, "PublishRetry"), this.dataReport.addEventInfo(this.playerSeq, "PublishRetry", "error_code", t.detail.code); else if (this.isPublishFailed(t)) {
                        this.logger.info("zp.ue.0 publish error: " + this.streamid), this.resetPlayer();
                        var r = {errorCode: t.detail.code};
                        this.dataReport.addEvent(this.playerSeq, "PublishError", r), this.reportQualityStatics(), this.streamCenter.onPlayerStop(this.streamid, this.playerType, t.detail.code)
                    }
                    this.everSuccess || this.dataReport.eventEnd(this.playerSeq, "PublishBegin")
                }
            }, t.prototype.updatePlayerNetStatus = function (t) {
                var e = {
                    videoBitrate: t.detail.info.videoBitrate,
                    audioBitrate: t.detail.info.audioBitrate,
                    videoFPS: t.detail.info.videoFPS,
                    videoHeight: t.detail.info.videoHeight,
                    videoWidth: t.detail.info.videoWidth
                };
                if (this.playerInfo = e, 1 == this.playerType) {
                    var r = {
                        videoBitrate: t.detail.info.videoBitrate,
                        audioBitrate: t.detail.info.audioBitrate,
                        videoFPS: t.detail.info.videoFPS,
                        videoGOP: t.detail.info.videoGOP,
                        netSpeed: t.detail.info.netSpeed,
                        netJitter: t.detail.info.netJitter,
                        videoWidth: t.detail.info.videoWidth,
                        videoHeight: t.detail.info.videoHeight
                    };
                    if (0 == this.publishQualitySeq && (this.publishQualitySeq = ++this.streamCenter.eventSeq, this.dataReport.newReport(this.publishQualitySeq), this.dataReport.addMsgExt(this.publishQualitySeq, {stream: this.streamid})), this.dataReport.addEvent(this.publishQualitySeq, "PublishQuality", r), this.publishQualityCount += 1, this.publishQualityCount >= this.publishQulaityMaxCount) (new Date).getTime() - this.playerLogUploadTime > 45e3 && (this.reportQualityStatics(), this.playerLogUploadTime = (new Date).getTime())
                }
                this.streamCenter.onPlayerQuality(this.streamid, e, this.playerType)
            }, t.prototype.getCurrentPlayerUrl = function () {
                return this.urls[this.playUrlIndex % this.urls.length]
            }, t.prototype.reportQualityStatics = function () {
                this.dataReport.uploadReport(this.publishQualitySeq, "WXPublishStateUpdate"), this.publishQualityCount = 0, this.publishQualitySeq = 0
            }, t
        }();
        e.ZegoPlayWechat = o
    }, function (t, e, r) {
        "use strict";
        var s,
            o = this && this.__extends || (s = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }, function (t, e) {
                function r() {
                    this.constructor = t
                }

                s(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            });
        Object.defineProperty(e, "__esModule", {value: !0});
        var i = r(9), n = r(2), a = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return o(e, t), e.prototype.openWebSocketLogServer = function (t) {
                if (this.url != t) {
                    if (this.url = t, this.stopWebSocketServer(), !t) return;
                    this.websocket = new n.ZegoWebSocket(t), this.websocket.onopen = function (t) {
                    }, this.websocket.onclose = function (t) {
                    }, this.websocket.onmessage = function (t) {
                    }, this.websocket.onerror = function (t) {
                        console.error("open log websocket error:" + t)
                    }
                }
            }, e.prototype.SendHttpsLog = function () {
                var t = this;
                if (0 != this.logCacheSend.length) {
                    var e = this.logCacheSend.join("\n");
                    wx.request({
                        url: this.url, data: e, method: "POST", success: function (e) {
                            if (0 != e.data.length) {
                                var r = e && e.data && e.data.interval;
                                "number" == typeof r && t.logUploadInterval !== r && (t.timeInterval = r, t.openHttpsLogServer(t.url))
                            }
                        }, fail: function (t) {
                            console.log("send failed " + t.statusCode)
                        }
                    }), this.logCacheSend = []
                }
            }, e.prototype.logReportParamList = function (t, e) {
                var r = new Date, s = r.getFullYear() + "/";
                return s += (i.D[r.getMonth() + 1] || r.getMonth() + 1) + "/", s += (i.D[r.getDate()] || r.getDate()) + " ", s += (i.D[r.getHours()] || r.getHours()) + ":", s += (i.D[r.getMinutes()] || r.getMinutes()) + ":", s += i.D[r.getSeconds()] || r.getSeconds(), s += "." + r.getTime() % 1e3, e.time = s, e.level = t, e.console = "xcx", e.appid = this.appid, e.roomid = this.roomid, e.userid = this.userid, e.id_name = this.userid, e.userName = this.userName, e.sessionid = this.sessionid, e.version = this.version, [JSON.stringify(e)]
            }, e
        }(i.Logger);
        e.LoggerWechat = a
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0);
        e.D = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
        var o = function () {
            function t() {
                this.logUploadTimer = null, this.logUploadInterval = 1e4, this.logCache = [], this.logCacheSend = [], this.logCacheMax = 100
            }

            return t.prototype.setLogLevel = function (t) {
                this.logLevel < s.ENUM_LOG_LEVEL.debug || this.logLevel > s.ENUM_LOG_LEVEL.report ? this.logLevel = s.ENUM_LOG_LEVEL.disable : this.logLevel = t
            }, t.prototype.setRemoteLogLevel = function (t) {
                this.logRemoteLevel < s.ENUM_LOG_LEVEL.debug || this.logRemoteLevel > s.ENUM_LOG_LEVEL.report ? this.logRemoteLevel = s.ENUM_LOG_LEVEL.disable : this.logRemoteLevel = t
            }, t.prototype.setSessionInfo = function (t, e, r, s, o, i) {
                this.appid = t, this.roomid = e, this.sessionid = r, this.userid = s, this.userName = o, this.version = i
            }, t.prototype.openLogServer = function (t) {
                try {
                    t.startsWith("wss:") ? (this.logType = s.ENUM_REMOTE_TYPE.websocket, this.openWebSocketLogServer(t)) : t.startsWith("https:") ? (this.logType = s.ENUM_REMOTE_TYPE.https, this.openHttpsLogServer(t)) : this.logType = s.ENUM_REMOTE_TYPE.disable
                } catch (t) {
                    this.error(JSON.stringify(t))
                }
            }, t.prototype.stopLogServer = function () {
                this.logType == s.ENUM_REMOTE_TYPE.websocket ? this.stopWebSocketServer() : this.logType == s.ENUM_REMOTE_TYPE.https && (this.SendHttpsLog(), this.stopHttpsServer()), this.logType = s.ENUM_REMOTE_TYPE.disable
            }, t.prototype.stopWebSocketServer = function () {
                this.websocket && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null)
            }, t.prototype.openHttpsLogServer = function (t) {
                var e = this;
                this.url = t, t && (this.stopHttpsServer(), this.logUploadTimer || (this.logUploadTimer = setInterval(function () {
                    e.SendHttpsLog()
                }, this.logUploadInterval)))
            }, t.prototype.stopHttpsServer = function () {
                this.logUploadTimer && (clearInterval(this.logUploadTimer), this.logUploadTimer = null)
            }, t.prototype.report = function (t) {
                var e = this.logReportParamList(s.ENUM_LOG_LEVEL.report, t);
                this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= s.ENUM_LOG_LEVEL.report && console.debug.apply(console, e), this.RemoteLog(s.ENUM_LOG_LEVEL.report, e, !0)
            }, t.prototype.debug = function () {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var r = this.logParamList(s.ENUM_LOG_LEVEL.debug, t.join(""));
                this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= s.ENUM_LOG_LEVEL.debug && console.debug.apply(console, r), this.log(s.ENUM_LOG_LEVEL.debug, r)
            }, t.prototype.info = function () {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var r = this.logParamList(s.ENUM_LOG_LEVEL.info, t.join(""));
                this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= s.ENUM_LOG_LEVEL.info && console.info.apply(console, r), this.log(s.ENUM_LOG_LEVEL.info, r)
            }, t.prototype.warn = function () {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var r = this.logParamList(s.ENUM_LOG_LEVEL.warn, t.join(""));
                this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= s.ENUM_LOG_LEVEL.warn && console.warn.apply(console, r), this.log(s.ENUM_LOG_LEVEL.warn, r)
            }, t.prototype.error = function () {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var r = this.logParamList(s.ENUM_LOG_LEVEL.error, t.join(""));
                this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= s.ENUM_LOG_LEVEL.error && console.error.apply(console, r), this.log(s.ENUM_LOG_LEVEL.error, r)
            }, t.prototype.log = function (t, e) {
                this.logRemoteLevel !== s.ENUM_LOG_LEVEL.disable && this.logRemoteLevel <= t && this.RemoteLog(t, e)
            }, t.prototype.RemoteLog = function (t, e, r) {
                if (void 0 === r && (r = !1), "" != this.url) if (this.logType == s.ENUM_REMOTE_TYPE.websocket) this.RemoteWebSocketLog(t, e); else if (this.logType == s.ENUM_REMOTE_TYPE.https) this.RemoteHttpsLog(t, e, r); else if (this.logLevel !== s.ENUM_LOG_LEVEL.disable && this.logLevel <= t) for (this.logCacheSend.push(e); this.logCacheSend.length > this.logCacheMax;) this.logCacheSend.shift()
            }, t.prototype.RemoteWebSocketLog = function (t, e) {
                if (null == this.websocket || 2 == this.websocket.readyState || 3 == this.websocket.readyState) {
                    var r = this.url;
                    this.url = "", this.openLogServer(r), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(e)
                } else if (0 == this.websocket.readyState) this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(e); else if (1 == this.websocket.readyState) if (this.logCacheSend.length > 0) {
                    for (var s = "", o = 0; o < this.logCacheSend.length; o++) (s + this.logCacheSend[o]).length > 4e3 && (this.websocket.send(s), s = ""), s = s + this.logCacheSend[o] + "\n";
                    e = s + e, this.logCacheSend = [], this.websocket.send(e)
                } else this.websocket.send(e); else console.warn("wrong socket state:" + this.websocket.readyState), this.logCacheSend.length < this.logCacheMax && this.logCacheSend.push(e)
            }, t.prototype.RemoteHttpsLog = function (t, e, r) {
                this.logCacheSend.push(e), (this.logCacheSend.length >= this.logCacheMax || !0 === r) && this.SendHttpsLog()
            }, t.prototype.logParamList = function (t, r) {
                var s = new Date, o = s.getFullYear() + "/";
                o += (e.D[s.getMonth() + 1] || s.getMonth() + 1) + "/", o += (e.D[s.getDate()] || s.getDate()) + " ", o += (e.D[s.getHours()] || s.getHours()) + ":", o += (e.D[s.getMinutes()] || s.getMinutes()) + ":", o += e.D[s.getSeconds()] || s.getSeconds(), o += "." + s.getTime() % 1e3;
                var i = r.substr(0, r.indexOf(" "));
                0 == i.length && (i = r);
                var n = r.substr(r.indexOf(" ") + 1, 4500);
                0 == n.length && (n = "");
                var a = {
                    time: o,
                    level: t,
                    action: i,
                    content: n,
                    appid: this.appid,
                    roomid: this.roomid,
                    userid: this.userid,
                    userName: this.userName,
                    sessionid: this.sessionid
                };
                return [JSON.stringify(a)]
            }, t
        }();
        e.Logger = o
    }, function (t, e, r) {
        "use strict";
        var s,
            o = this && this.__extends || (s = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }, function (t, e) {
                function r() {
                    this.constructor = t
                }

                s(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            });
        Object.defineProperty(e, "__esModule", {value: !0});
        var i = r(11), n = r(0), a = r(1), h = r(12), l = r(13), u = r(14), c = r(15), d = r(16), p = r(17),
            g = function (t) {
                function e() {
                    return t.call(this) || this
                }

                return o(e, t), e.prototype.init = function () {
                    this.bindSocketHandler(), this.bindStreamHandler(), this.bindHeatBeatHandler(), this.bindRoomHandler(), this.bindMessageHandler(), this.bindLiveHandler(), this.bindStreamCenterHandler()
                }, e.prototype.bindSocketHandler = function () {
                    var t = this;
                    this.socketCenter = new h.SocketCenter(this.logger, this.stateCenter), this.socketCenter.registerRouter("push_signal", function (e) {
                        t.liveHandler.handlePushSignalMsg(e)
                    }), this.socketCenter.getSocket = function (e) {
                        return t.getSocket(e)
                    }, this.socketCenter.handlePushKickout = function (e) {
                        t.logger.info("zb.cm.bsh.0  call hpk"), t.roomHandler.setRunState(n.ENUM_RUN_STATE.logout), t.roomHandler.resetRoom(), t.onKickOut({
                            code: n.sdkErrorList.KICK_OUT.code,
                            msg: n.sdkErrorList.KICK_OUT.msg + e.body.reason
                        }), t.logger.debug("zb.cm.bsh.0  call hpk success")
                    }, this.socketCenter.handlePushCustomMsg = function (e) {
                        t.messageHandler.handlePushCustomMsg(e)
                    }, this.socketCenter.handlePushUserStateUpdateMsg = function (e) {
                        t.roomHandler.handlePushUserStateUpdateMsg(e)
                    }, this.socketCenter.handlePushRoomMsg = function (e) {
                        t.onRecvRoomMsg(e.body.chat_data, e.body.server_msg_id, e.body.ret_msg_id)
                    }, this.socketCenter.handlePushMergeMsg = function (e) {
                        t.messageHandler.handlePushMergeMsg(e)
                    }, this.socketCenter.handlePushTransMsg = function (e) {
                        t.messageHandler.handlePushTransMsg(e)
                    }, this.socketCenter.handleBigImMsgRsp = function (e) {
                        t.messageHandler.handleBigImMsgRsp(e)
                    }
                }, e.prototype.bindStreamHandler = function () {
                    var t = this;
                    this.streamHandler = new u.StreamHandler(this.logger, this.stateCenter, this.socketCenter), this.streamHandler.onStreamUpdated = function (e, r) {
                        t.onStreamUpdated(e, r)
                    }, this.streamHandler.onPublishStateUpdate = function (e, r, s) {
                        t.onPublishStateUpdate(e, r, s)
                    }, this.streamHandler.onStreamExtraInfoUpdated = function (e) {
                        t.onStreamExtraInfoUpdated(e)
                    }, this.streamHandler.setCDNInfo = function (e, r) {
                        t.setCDNInfo(e, r)
                    }
                }, e.prototype.bindHeatBeatHandler = function () {
                    var t = this;
                    this.heartBeatHandler = new c.HeartBeatHandler(this.logger, this.stateCenter, this.socketCenter), this.heartBeatHandler.onRecvReliableMessage = function (e, r, s) {
                        t.onRecvReliableMessage(e, r, s)
                    }, this.heartBeatHandler.handleFetchStreamListRsp = function (e) {
                        t.streamHandler.handleFetchStreamListRsp(e)
                    }, this.heartBeatHandler.fetchUserList = function () {
                        t.roomHandler.fetchUserList()
                    }, this.heartBeatHandler.onUpdateOnlineCount = function (e, r) {
                        t.onUpdateOnlineCount(e, r)
                    }, this.heartBeatHandler.updateStreamInfo = function (e, r, s, o) {
                        void 0 === s && (s = ""), t.streamHandler.updateStreamInfo(e, r, s, o)
                    }, this.heartBeatHandler.hbLogout = function (e) {
                        t.onDisconnect(e)
                    }
                }, e.prototype.bindRoomHandler = function () {
                    var t = this;
                    this.roomHandler = new l.RoomHandler(this.logger, this.stateCenter, this.socketCenter), this.roomHandler.loginSuccessCallBack = function (e, r) {
                        var s = r.body.hearbeat_interval < n.MINIUM_HEARTBEAT_INTERVAL ? n.MINIUM_HEARTBEAT_INTERVAL : r.body.hearbeat_interval;
                        t.heartBeatHandler.start(s), t.heartBeatHandler.resetCheckMessage(), t.heartBeatHandler.startCheckMessageTimeout(), t.streamCenter.setSessionInfo(t.stateCenter.appid, t.stateCenter.idName, t.stateCenter.token, t.stateCenter.testEnvironment), r.body.anchor_info && t.onGetAnchorInfo(r.body.anchor_info.anchor_id_name, r.body.anchor_info.anchor_nick_name), r.body.online_count && t.onUpdateOnlineCount(t.stateCenter.roomid, r.body.online_count), t.logger.info("zb.cm.brh hls userStateUpdate " + t.stateCenter.userStateUpdate), t.stateCenter.userStateUpdate && (t.logger.info("zb.cm.brh hls fetch all new userlist"), t.roomHandler.fetchUserList()), t.streamHandler.handleStreamStart(e, r)
                    }, this.roomHandler.onGetTotalUserList = function (e, r) {
                        t.onGetTotalUserList(e, r)
                    }, this.roomHandler.resetRoomCallBack = function () {
                        t.heartBeatHandler.resetHeartbeat(), t.heartBeatHandler.resetCheckMessage(), t.resetStreamCenter()
                    }, this.roomHandler.onUserStateUpdate = function (e, r) {
                        t.onUserStateUpdate(e, r)
                    }, this.roomHandler.onDisconnect = function (e) {
                        t.onDisconnect(e)
                    }, this.roomHandler.loginBodyData = function () {
                        return t.loginBodyData()
                    }
                }, e.prototype.bindMessageHandler = function () {
                    var t = this;
                    this.messageHandler = new d.MessageHandler(this.logger, this.stateCenter, this.socketCenter), this.messageHandler.onRecvCustomCommand = function (e, r, s) {
                        t.onRecvCustomCommand(e, r, s)
                    }, this.messageHandler.onRecvBigRoomMessage = function (e, r) {
                        t.onRecvBigRoomMessage(e, r)
                    }, this.messageHandler.onRecvReliableMessage = function (e, r, s) {
                        t.onRecvReliableMessage(e, r, s)
                    }
                }, e.prototype.bindLiveHandler = function () {
                    var t = this;
                    this.liveHandler = new p.LiveHandler(this.logger, this.stateCenter, this.socketCenter), this.liveHandler.onRecvEndJoinLiveCommand = function (e, r, s, o) {
                        t.onRecvEndJoinLiveCommand(e, r, s, o)
                    }, this.liveHandler.onRecvInviteJoinLiveRequest = function (e, r, s, o) {
                        t.onRecvInviteJoinLiveRequest(e, r, s, o)
                    }, this.liveHandler.onRecvJoinLiveRequest = function (e, r, s, o) {
                        t.onRecvJoinLiveRequest(e, r, s, o)
                    }
                }, e.prototype.bindStreamCenterHandler = function () {
                    var t = this;
                    this.streamCenter.onPlayStateUpdate = function (e, r, s) {
                        t.onPlayStateUpdateHandle(e, r, s)
                    }, this.streamCenter.onPlayQualityUpdate = function (e, r) {
                        t.onPlayQualityUpdate(e, r)
                    }, this.streamCenter.onPublishStateUpdate = function (e, r, s) {
                        t.onPublishStateUpdateHandle(e, r, s)
                    }, this.streamCenter.onPublishQualityUpdate = function (e, r) {
                        t.onPublishQualityUpdate(e, r)
                    }, this.streamCenter.onPlayerStreamUrlUpdate = function (e, r, s) {
                        t.onStreamUrlUpdate(e, r, s)
                    }, this.streamCenter.onVideoSizeChanged = function (e, r, s) {
                        t.onVideoSizeChanged(e, r, s)
                    }
                }, e.prototype.config = function (t) {
                    return this.logger.debug("zb.cm.cf call"), a.ClientUtil.checkConfigParam(t, this.logger) ? (this.stateCenter.appid = t.appid, this.stateCenter.server = t.server, this.stateCenter.idName = t.idName, this.stateCenter.nickName = t.nickName, "boolean" == typeof t.testEnvironment && (this.stateCenter.testEnvironment = t.testEnvironment), this.logger.setLogLevel(t.logLevel), !1 === t.audienceCreateRoom && (this.stateCenter.roomCreateFlag = 0), t.remoteLogLevel ? this.logger.setRemoteLogLevel(t.remoteLogLevel) : this.logger.setRemoteLogLevel(0), this.logger.setSessionInfo(t.appid, "", "", t.idName, "", n.PROTO_VERSION), t.logUrl && this.logger.openLogServer(t.logUrl), -1 == this.stateCenter.server.indexOf("test2-wsliveroom-api.zego.im") && -1 == this.stateCenter.server.indexOf("wsliveroom-test.zegocloud.com") && -1 == this.stateCenter.server.indexOf("wsliveroom-test.zego.im") || (this.stateCenter.testEnvironment = !0), this.stateCenter.configOK = !0, this.logger.debug("zb.cm.cf call success"), !0) : (this.logger.error("zb.cm.cf param error"), !1)
                }, e.prototype.login = function (t, e, r, s, o) {
                    "string" != typeof t || "string" != typeof r || 1 !== e && 2 !== e ? this.logger.error("zb.rh.lg params error") : this.roomHandler.login(t, e, r, null, s, o)
                }, e.prototype.loginWithAuthor = function (t, e, r, s, o, i) {
                    "string" != typeof t || "string" != typeof r || "string" != typeof s || 1 !== e && 2 !== e ? this.logger.error("zb.rh.lg params error") : this.roomHandler.login(t, e, r, s, o, i)
                }, e.prototype.logout = function () {
                    return this.roomHandler.logout()
                }, e.prototype.setUserStateUpdate = function (t) {
                    "boolean" == typeof t ? this.roomHandler.setUserStateUpdate(t) : console.error("setUserStateUpdate param error")
                }, e.prototype.onUserStateUpdate = function (t, e) {
                }, e.prototype.onGetTotalUserList = function (t, e) {
                }, e.prototype.onUpdateOnlineCount = function (t, e) {
                }, e.prototype.onGetAnchorInfo = function (t, e) {
                }, e.prototype.release = function () {
                    this.logger.debug("zb.cm.rl call"), this.roomHandler.setRunState(n.ENUM_RUN_STATE.logout), this.roomHandler.resetRoom(), this.logger.stopLogServer(), this.logger.debug("zb.cm.rl call success")
                }, e.prototype.sendCustomCommand = function (t, e, r, s) {
                    return "string" != typeof e && "object" != typeof e ? (this.logger.error("zb.mh.scc params error"), !1) : this.messageHandler.sendCustomCommand(t, e, r, s)
                }, e.prototype.onRecvCustomCommand = function (t, e, r) {
                }, e.prototype.sendRoomMsg = function (t, e, r, s, o) {
                    this.messageHandler.sendRoomMsg(t, e, r, s, o)
                }, e.prototype.onRecvRoomMsg = function (t, e, r) {
                }, e.prototype.sendReliableMessage = function (t, e, r, s) {
                    this.messageHandler.sendReliableMessage(t, e, r, s)
                }, e.prototype.onRecvReliableMessage = function (t, e, r) {
                }, e.prototype.sendBigRoomMessage = function (t, e, r, s, o) {
                    this.messageHandler.sendBigRoomMessage(t, e, r, s, o)
                }, e.prototype.onRecvBigRoomMessage = function (t, e) {
                }, e.prototype.sendRelayMessage = function (t, e, r, s) {
                    this.messageHandler.sendRelayMessage(t, e, r, s)
                }, e.prototype.requestJoinLive = function (t, e, r, s) {
                    return this.liveHandler.requestJoinLive(t, e, r, s)
                }, e.prototype.onRecvJoinLiveRequest = function (t, e, r, s) {
                }, e.prototype.inviteJoinLive = function (t, e, r, s) {
                    return this.liveHandler.inviteJoinLive(t, e, r, s)
                }, e.prototype.onRecvInviteJoinLiveRequest = function (t, e, r, s) {
                }, e.prototype.endJoinLive = function (t, e, r) {
                    return this.liveHandler.endJoinLive(t, e, r)
                }, e.prototype.onRecvEndJoinLiveCommand = function (t, e, r, s) {
                }, e.prototype.respondJoinLive = function (t, e, r, s) {
                    return this.liveHandler.respondJoinLive(t, e, r, s)
                }, e.prototype.updateMixStream = function (t, e, r) {
                    return this.streamHandler.updateMixStream(t, e, r)
                }, e.prototype.stopMixStream = function (t, e, r) {
                    return this.streamHandler.stopMixStream(t, e, r)
                }, e.prototype.updateStreamExtraInfo = function (t, e) {
                    return this.streamHandler.updateStreamExtraInfo(t, e)
                }, e.prototype.onStreamUrlUpdate = function (t, e, r) {
                }, e.prototype.onStreamUpdated = function (t, e) {
                }, e.prototype.onStreamExtraInfoUpdated = function (t) {
                }, e.prototype.onPlayStateUpdate = function (t, e, r) {
                }, e.prototype.onVideoSizeChanged = function (t, e, r) {
                }, e.prototype.onPlayQualityUpdate = function (t, e) {
                }, e.prototype.onPublishStateUpdate = function (t, e, r) {
                }, e.prototype.onPublishQualityUpdate = function (t, e) {
                }, e.prototype.onDisconnect = function (t) {
                }, e.prototype.onKickOut = function (t) {
                }, e.getCurrentVersion = function () {
                    return n.PROTO_VERSION
                }, e
            }(i.Common);
        e.BaseCenter = g
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = function () {
            function t() {
            }

            return t.prototype.onPlayStateUpdateHandle = function (t, e, r) {
                1 == t && this.stopPlayingStream(e), this.onPlayStateUpdate(t, e, r)
            }, t.prototype.onPublishStateUpdateHandle = function (t, e, r) {
                var o = this;
                0 == t ? this.stateCenter.publishStreamList[e] && (this.stateCenter.publishStreamList[e].state == s.ENUM_PUBLISH_STREAM_STATE.tryPublish ? (this.stateCenter.publishStreamList[e].state = s.ENUM_PUBLISH_STREAM_STATE.update_info, this.streamHandler.updateStreamInfo(e, s.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[e].extra_info, function (t) {
                    o.stateCenter.publishStreamList[e] && o.stateCenter.publishStreamList[e].state == s.ENUM_PUBLISH_STREAM_STATE.update_info && (o.stateCenter.publishStreamList[e].state = s.ENUM_PUBLISH_STREAM_STATE.stop, o.onPublishStateUpdate(1, e, t), o.streamCenter.stopPlayingStream(e))
                })) : this.WebrtcOnPublishStateUpdateHandle(t, e, r)) : (this.onPublishStateUpdate(t, e, r), 1 == t && this.stopPublishingStream(e))
            }, t.prototype.resetStreamCenter = function () {
                if (this.stateCenter.customUrl && (this.stateCenter.customUrl = null), this.streamCenter.reset(), !this.socketCenter.isDisConnect()) for (var t in this.stateCenter.publishStreamList) this.stateCenter.publishStreamList[t].state == s.ENUM_PUBLISH_STREAM_STATE.publishing && this.streamHandler.updateStreamInfo(t, s.ENUM_STREAM_SUB_CMD.liveEnd, this.stateCenter.publishStreamList[t].extra_info)
            }, t.prototype.handleFetchWebRtcUrlRsp = function (t) {
                var e = t.body.stream_id;
                if ("push" === t.body.ptype) this.stateCenter.publishStreamList[e] ? this.streamCenter.startPublishingStream(e, t.body.urls) : this.logger.error("cb.cm.hfwur no streamid to publish"); else if ("pull" == t.body.ptype) {
                    for (var r = !1, s = 0; s < this.stateCenter.streamList.length; s++) if (this.stateCenter.streamList[s].stream_id === e) {
                        r = !0;
                        break
                    }
                    0 == r && this.logger.warn("cb.cm.hfwur cannot find stream, continue to play"), this.streamCenter.startPlayingStream(e, t.body.urls)
                }
            }, t
        }();
        e.Common = o
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(1), i = function () {
            function t(t, e) {
                var r = this;
                this.cmdSeq = 0, this.responseRouters = {}, this.logger = t, this.stateCenter = e, this.responseRouters = {
                    push_kickout: function (t) {
                        r.handlePushKickout(t)
                    }, push_custommsg: function (t) {
                        r.handlePushCustomMsg(t)
                    }, push_im_chat: function (t) {
                        r.handlePushRoomMsg(t)
                    }, push_userlist_update: function (t) {
                        r.handlePushUserStateUpdateMsg(t)
                    }, push_merge_message: function (t) {
                        r.handlePushMergeMsg(t)
                    }, trans: function (t) {
                        r.handleTransRsp(t)
                    }, push_trans: function (t) {
                        r.handlePushTransMsg(t)
                    }
                }
            }

            return t.prototype.handlePushKickout = function (t) {
            }, t.prototype.handlePushCustomMsg = function (t) {
            }, t.prototype.handlePushRoomMsg = function (t) {
            }, t.prototype.handlePushUserStateUpdateMsg = function (t) {
            }, t.prototype.handlePushMergeMsg = function (t) {
            }, t.prototype.handlePushTransMsg = function (t) {
            }, t.prototype.handleBigImMsgRsp = function (t) {
            }, t.prototype.handleTransRsp = function (t) {
                if (this.stateCenter.isLogin()) if (0 == t.body.err_code) {
                    var e = t.body.trans_type;
                    this.stateCenter.transSeqMap[e] ? (this.stateCenter.transSeqMap[e].seq = t.body.trans_seq, this.logger.debug("zb.sc.htr trans " + e + " seq " + t.body.trans_seq)) : this.logger.error("zb.sc.htr cannot match send info")
                } else this.logger.error("zb.sc.htr trans send error " + t.body.err_code); else this.logger.error("zb.sc.htr not login")
            }, t.prototype.handleBizChannelRspCallback = function (t, e) {
                0 === t.body.err_code ? null != e.success && e.success(t.header.seq, t.body.cmd, t.body.rsp_body) : null != e.error && e.error(t.body.err_code, t.header.seq, t.body.rsp_body)
            }, t.prototype.registerRouter = function (t, e) {
                this.responseRouters[t] = e
            }, t.prototype.getSocket = function (t) {
                return null
            }, t.prototype.getHeaderV2 = function (t) {
                return {
                    Protocol: "req_v2",
                    cmd: t,
                    appid: this.stateCenter.appid,
                    seq: ++this.cmdSeq,
                    user_id: this.stateCenter.userid,
                    session_id: this.stateCenter.sessionid || "",
                    room_id: this.stateCenter.roomid || ""
                }
            }, t.prototype.getHeader = function (t) {
                return {
                    Protocol: "req",
                    cmd: t,
                    appid: this.stateCenter.appid,
                    seq: ++this.cmdSeq,
                    user_id: this.stateCenter.userid,
                    session_id: this.stateCenter.sessionid || "",
                    room_id: this.stateCenter.roomid || ""
                }
            }, t.prototype.sendMessage = function (t, e, r, o) {
                if (this.logger.debug("zb.sc.sm call " + t), this.isDisConnect()) return this.logger.error("zb.sc.sm error  " + t), -1;
                var i = "V1" === s.ROOMVERSION ? this.getHeader(t) : this.getHeaderV2(t), n = {header: i, body: e};
                if (null == r && (r = null), null == o && (o = null), null != r || null != o) {
                    var a = {data: n, seq: i.seq, deleted: !1, time: Date.parse(new Date + ""), success: r, error: o},
                        h = this.stateCenter.sendCommandList.push(a);
                    this.stateCenter.sendCommandMap[a.seq] = h
                }
                return this.websocket.send(JSON.stringify(n)), this.logger.debug("zb.sc.sm success"), i.seq
            }, t.prototype.sendCustomMessage = function (t, e, r, o) {
                if (this.logger.debug("zb.sc.scm call"), this.isDisConnect()) return this.logger.error("zb.sc.scm error"), !1;
                var i = "V1" === s.ROOMVERSION ? this.getHeader(t) : this.getHeaderV2(t), n = {header: i, body: e},
                    a = JSON.stringify(n);
                null == r && (r = null), null == o && (o = null);
                var h = {data: n, seq: i.seq, deleted: !1, time: Date.parse(new Date + ""), success: r, error: o},
                    l = this.stateCenter.sendDataList.push(h);
                return this.stateCenter.sendDataMap[h.seq] = l, this.websocket.send(a), this.logger.debug("zb.sc.scm success seq: ", i.seq), !0
            }, t.prototype.isDisConnect = function () {
                return !this.websocket || 1 !== this.websocket.readyState
            }, t.prototype.closeSocket = function () {
                this.websocket && (this.logger.info("zb.sc.cs close websocket"), this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.close(), this.websocket = null)
            }, t.prototype.createSocket = function (t) {
                this.websocket = this.getSocket(t)
            }, t.prototype.openHandler = function (t) {
                this.websocket.onopen = t
            }, t.prototype.closeHandler = function (t) {
                this.websocket.onclose = t
            }, t.prototype.errorHandler = function () {
                var t = this;
                this.websocket.onerror = function (e) {
                    t.logger.error("zb.sc.oe msg=" + JSON.stringify(e))
                }
            }, t.prototype.checkResponse = function (t) {
                return (t.header.appid !== this.stateCenter.appid || t.header.session_id !== this.stateCenter.sessionid || t.header.user_id !== this.stateCenter.userid || t.header.room_id !== this.stateCenter.roomid || this.stateCenter.runState !== s.ENUM_RUN_STATE.login) && (this.logger.error("zb.sc.crp check session fail."), !0)
            }, t.prototype.responseHandler = function () {
                var t = this;
                this.websocket.onmessage = function (e) {
                    var r = JSON.parse(e.data);
                    t.logger.info("zb.sc.ws.rph jsonmsg= ", r.header.cmd), t.logger.info("zb.sc.ws.rph jsonmsg= ", e.data), "login" !== r.header.cmd ? "logout" !== r.header.cmd ? t.stateCenter.isLogin() ? t.checkResponse(r) ? t.logger.error("zb.sc.ws.rph check session fail.") : (t.handleSendCommandMsgRsp(r), t.logger.info("zb.sc.ws.rph cmd=" + r.header.cmd + ",function=" + !!t.responseRouters[r.header.cmd]), t.responseRouters[r.header.cmd] && t.responseRouters[r.header.cmd](r)) : t.logger.warn("zb.sc.ws.rph  already logout") : t.responseRouters.logout(r, t.cmdSeq) : t.responseRouters.login(r, t.cmdSeq)
                }
            }, t.prototype.handleSendCommandMsgRsp = function (t) {
                this.logger.debug("zb.sc.hscmr call");
                var e, r = this.stateCenter.sendCommandMap[t.header.seq];
                null != r && ("login" == (e = r._data).data.header.cmd ? this.logger.debug("zb.sc.hscmr don't check " + e.data.header.cmd) : "relay" == e.data.header.cmd ? this.handleRelayRspCallback(t, e) : "bigim_chat" == e.data.header.cmd ? this.handleBigImRspCallback(t, e) : "biz_channel" == e.data.header.cmd ? this.handleBizChannelRspCallback(t, e) : 0 === t.body.err_code ? null != e.success && e.success(t.header.seq) : null != e.error && e.error(o.ClientUtil.getServerError(t.body.err_code), t.header.seq), delete this.stateCenter.sendCommandMap[t.header.seq], this.stateCenter.sendCommandList.remove(r)), this.logger.debug("zb.sc.hscmr call success")
            }, t.prototype.handleRelayRspCallback = function (t, e) {
                0 === t.body.err_code ? null != e.success && e.success(t.header.seq, t.body.relay_result) : null != e.error && e.error(o.ClientUtil.getServerError(t.body.err_code), t.header.seq)
            }, t.prototype.handleBigImRspCallback = function (t, e) {
                0 === t.body.err_code ? null != e.success && this.handleBigImMsgRsp(t) : null != e.error && e.error(o.ClientUtil.getServerError(t.body.err_code), t.header.seq)
            }, t
        }();
        e.SocketCenter = i
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(1), i = function () {
            function t(t, e, r) {
                this.logger = t, this.socketCenter = r, this.stateCenter = e
            }

            return t.prototype.setRunState = function (t) {
                this.logger.debug("zb.rh.srs old=" + this.stateCenter.runState + ", new=" + t), this.stateCenter.lastRunState = this.stateCenter.runState, this.stateCenter.runState = t
            }, t.prototype.resetTryLogin = function () {
                this.logger.debug("zb.rh.rtl call"), clearTimeout(this.stateCenter.tryLoginTimer), this.stateCenter.tryLoginTimer = null, this.stateCenter.tryLoginCount = 0, this.logger.debug("zb.rh.rtl call success")
            }, t.prototype.resetBigRoomInfo = function () {
                this.stateCenter.transSeqMap = {}, this.stateCenter.realyMessageList = [], this.stateCenter.relayTimer && (clearTimeout(this.stateCenter.relayTimer), this.stateCenter.relayTimer = null), this.stateCenter.bigImLastTimeIndex = 0, this.stateCenter.bigIMmessageList = [], this.stateCenter.bigImCallbackMap = {}, this.stateCenter.bigImTimer && (clearTimeout(this.stateCenter.bigImTimer), this.stateCenter.bigImTimer = null), this.stateCenter.serverTimeOffset = 0, this.stateCenter.datiTimeWindow = 0, this.stateCenter.bigimTimeWindow = 0
            }, t.prototype.resetRoom = function () {
                var t = this;
                if (this.logger.debug("zb.rh.rr call"), this.resetTryLogin(), this.resetRoomCallBack(), this.stateCenter.streamList = [], this.stateCenter.streamQuerying = !1, this.stateCenter.publishStreamList = {}, this.stateCenter.joinLiveCallbackMap = {}, this.stateCenter.joinLiveRequestMap = {}, this.stateCenter.streamUrlMap = {}, this.resetBigRoomInfo(), this.stateCenter.cmdCallback = {}, this.logger.debug("zb.rh.rr call send logout=", this.stateCenter.sessionid), "0" !== this.stateCenter.sessionid) {
                    this.socketCenter.registerRouter("logout", function (e) {
                        t.handleLogoutRsp(e)
                    }), this.socketCenter.sendMessage("logout", {reserve: 0})
                }
                this.socketCenter.closeSocket(), this.setRunState(s.ENUM_RUN_STATE.logout), this.stateCenter.userid = "", this.stateCenter.sessionid = "", this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, s.PROTO_VERSION), this.logger.debug("zb.rh.rr call success")
            }, t.prototype.resetRoomCallBack = function () {
            }, t.prototype.onDisconnect = function (t) {
            }, t.prototype.loginSuccessCallBack = function (t, e) {
            }, t.prototype.onGetTotalUserList = function (t, e) {
            }, t.prototype.login = function (t, e, r, i, n, a) {
                if (this.logger.setSessionInfo(this.stateCenter.appid, t, "", this.stateCenter.idName, "", s.PROTO_VERSION), this.logger.info("zb.rh.lg call:", t, r), i && (this.stateCenter.third_token = i), !this.stateCenter.configOK || !o.ClientUtil.checkLoginParam(t, r)) return this.logger.error("zb.rh.lg param error"), void a({
                    code: "",
                    msg: "param error"
                });
                this.stateCenter.runState !== s.ENUM_RUN_STATE.logout && (this.logger.debug("zb.rh.lg reset"), this.setRunState(s.ENUM_RUN_STATE.logout), this.resetRoom()), this.logger.debug("zb.rh.lg begin"), this.setRunState(s.ENUM_RUN_STATE.trylogin), this.stateCenter.roomid = t, this.stateCenter.token = r, this.stateCenter.role = e, o.ClientUtil.registerCallback("login", {
                    success: n,
                    error: a
                }, this.stateCenter.callbackList), this.resetTryLogin(), this.tryLogin(), this.logger.info("zb.rh.lg call success")
            }, t.prototype.loginBodyData = function () {
                return null
            }, t.prototype.tryLogin = function () {
                var t = this;
                if (this.logger.debug("zb.rh.tl call"), this.stateCenter.runState === s.ENUM_RUN_STATE.trylogin) {
                    if (++this.stateCenter.tryLoginCount > s.MAX_TRY_LOGIN_COUNT) {
                        this.logger.error("zb.rh.tl fail times limit");
                        var e = this.stateCenter.lastRunState;
                        return this.setRunState(s.ENUM_RUN_STATE.logout), this.resetRoom(), void(e == s.ENUM_RUN_STATE.login ? (this.logger.error("zb.rh.tl fail and disconnect"), this.onDisconnect(s.sdkErrorList.LOGIN_DISCONNECT)) : (this.logger.info("zb.rh.tl fail and callback user"), o.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(s.sdkErrorList.LOGIN_TIMEOUT)))
                    }
                    if (this.stateCenter.startConnceTime = (new Date).getTime(), console.warn("start connect", this.stateCenter.startConnceTime), this.socketCenter.isDisConnect()) {
                        this.logger.debug("zb.rh.tl need new websocket");
                        try {
                            this.socketCenter.closeSocket(), this.logger.debug("zb.rh.tl new websocket"), this.socketCenter.createSocket(this.stateCenter.server), this.socketCenter.registerRouter("login", function (e, r) {
                                t.handleLoginRsp(e, r)
                            }), this.socketCenter.closeHandler(function (e) {
                                t.socketCenter.closeSocket(), t.closeHandler(e)
                            }), this.socketCenter.openHandler(function () {
                                t.openHandler()
                            })
                        } catch (t) {
                            this.logger.error("zb.rh.tl websocket err:" + t)
                        }
                    } else {
                        var r = this.loginBodyData();
                        this.logger.info("zb.rh.tl use current websocket and sent login"), this.socketCenter.sendMessage("login", r)
                    }
                    this.stateCenter.tryLoginTimer = setTimeout(function () {
                        t.tryLogin()
                    }, s.TRY_LOGIN_INTERVAL[this.stateCenter.tryLoginCount % s.MAX_TRY_LOGIN_COUNT]), this.logger.info("zb.rh.tl call success")
                } else this.logger.error("zb.rh.tl state error")
            }, t.prototype.handleLoginRsp = function (t, e) {
                if (this.logger.debug("zb.rh.hlr call"), this.stateCenter.runState === s.ENUM_RUN_STATE.trylogin) {
                    if (t.header.seq === e) return 0 !== t.body.err_code ? (this.handleLoginFail(t), void this.logger.error("zb.rh.hlr server error=", t.body.err_code)) : (this.handleLoginSuccess(t), void this.logger.info("zb.rh.hlr call success."));
                    this.logger.error("zb.rh.hlr in wrong seq, local=", e, ",recv=", t.header.seq)
                } else this.logger.error("zb.rh.hlr state error")
            }, t.prototype.handleLoginFail = function (t) {
                if (this.logger.debug("zb.rh.hlf call"), o.ClientUtil.isKeepTryLogin(t.body.err_code)) this.logger.warn("zb.rh.hlf KeepTry true"); else {
                    var e = this.stateCenter.lastRunState;
                    this.setRunState(s.ENUM_RUN_STATE.logout), this.resetRoom();
                    var r = o.ClientUtil.getServerError(t.body.err_code);
                    e === s.ENUM_RUN_STATE.login ? (this.logger.info("zb.rh.hlf callback disconnect"), this.onDisconnect(r)) : (this.logger.info("zb.rh.hlf callback error"), o.ClientUtil.actionErrorCallback("login", this.stateCenter.callbackList)(r)), this.logger.debug("zb.rh.hlf call success")
                }
            }, t.prototype.handleLoginSuccess = function (t) {
                this.stateCenter.startloginSucTime = (new Date).getTime(), console.warn("login suc", this.stateCenter.startloginSucTime, this.stateCenter.startloginSucTime - this.stateCenter.startloginTime, this.stateCenter.startloginSucTime - this.stateCenter.startConnceTime), this.logger.info("zb.rh.hls call");
                var e = this.stateCenter.lastRunState;
                if (this.setRunState(s.ENUM_RUN_STATE.login), this.stateCenter.userid = t.body.user_id, this.stateCenter.sessionid = t.body.session_id, this.stateCenter.anchor_info = t.body.anchor_info || this.stateCenter.anchor_info, this.logger.setSessionInfo(this.stateCenter.appid, this.stateCenter.roomid, this.stateCenter.userid, this.stateCenter.idName, this.stateCenter.sessionid, s.PROTO_VERSION), t.body.config_info && (this.logger.setRemoteLogLevel(t.body.config_info.log_level), "" != t.body.config_info.log_url && this.logger.openLogServer(t.body.config_info.log_url)), null != t.body.ret_timestamp && "string" == typeof t.body.ret_timestamp) {
                    var r = parseFloat(t.body.ret_timestamp);
                    this.stateCenter.serverTimeOffset = 0 == r ? 0 : t.body.ret_timestamp - (new Date).getTime()
                }
                t.body.bigim_time_window && "number" == typeof t.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = t.body.bigim_time_window), t.body.dati_time_window && "number" == typeof t.body.dati_time_window && (this.stateCenter.datiTimeWindow = t.body.dati_time_window), this.resetTryLogin(), this.loginSuccessCallBack(e, t)
            }, t.prototype.openHandler = function () {
                this.logger.info("zb.rh.oh websocket.onpen call"), this.socketCenter.responseHandler();
                var t = this.loginBodyData();
                this.logger.info("zb.rh.oh websocket.onpen send login"), this.stateCenter.startloginTime = (new Date).getTime(), console.warn("start login", this.stateCenter.startloginTime, this.stateCenter.startloginTime - this.stateCenter.startConnceTime), this.socketCenter.sendMessage("login", t), this.logger.debug("zb.rh.oh websocket.onpen call success")
            }, t.prototype.closeHandler = function (t) {
                this.logger.info("zb.rh.ws.oc msg=" + JSON.stringify(t)), this.stateCenter.runState !== s.ENUM_RUN_STATE.logout ? this.stateCenter.runState === s.ENUM_RUN_STATE.trylogin && this.stateCenter.tryLoginCount <= s.MAX_TRY_LOGIN_COUNT ? this.logger.info("zb.rh.ws.oc is called because of try login") : this.stateCenter.runState === s.ENUM_RUN_STATE.login ? (this.logger.info("zb.rh.ws.oc is called because of network broken, try again"), this.setRunState(s.ENUM_RUN_STATE.trylogin), this.resetTryLogin(), this.tryLogin()) : (this.logger.error("zb.rh.ws.oc out of think!!!"), this.setRunState(s.ENUM_RUN_STATE.logout), this.resetRoom(), this.onDisconnect(s.sdkErrorList.UNKNOWN)) : this.logger.info("zb.rh.ws.oc onclose logout flow call websocket.close")
            }, t.prototype.logout = function () {
                return this.logger.debug("zb.rh.lo call"), this.stateCenter.runState === s.ENUM_RUN_STATE.logout ? (this.logger.warn("zb.rh.lo at logout"), !1) : (this.resetRoom(), this.logger.info("zb.rh.lo call success"), !0)
            }, t.prototype.setUserStateUpdate = function (t) {
                return this.logger.debug("zb.rh.su call"), "boolean" != typeof t ? (this.logger.info("zb.rh.su param error"), !1) : (this.stateCenter.userStateUpdate = t, this.logger.info("zb.rh.su call success " + t), !0)
            }, t.prototype.fetchUserList = function () {
                this.logger.debug("zb.rh.ful call"), this.stateCenter.userQuerying ? this.logger.warn("zb.rh.ful is already querying") : (this.stateCenter.userQuerying = !0, this.stateCenter.userTempList = [], "V1" === s.ROOMVERSION ? this.fetchUserListWithPage(0) : this.fetchUserListWithPageV2(0), this.logger.info("zb.rh.ful the first time call"))
            }, t.prototype.fetchUserListWithPageV2 = function (t) {
                var e = this;
                this.logger.debug("zb.rh.fulwp call"), this.socketCenter.registerRouter("user_list_v2", function (r) {
                    e.handleFetchUserListRspV2(t, r)
                }), this.socketCenter.sendMessage("user_list_v2", {
                    marker: 0 === t ? "" : t + "",
                    mode: 0,
                    limit: 100
                }), this.logger.info("zb.rh.fulwp call success")
            }, t.prototype.fetchUserListWithPage = function (t) {
                var e = this;
                this.logger.debug("zb.rh.fulwp call"), this.socketCenter.registerRouter("user_list", function (t) {
                    e.handleFetchUserListRsp(t)
                }), this.socketCenter.sendMessage("user_list", {
                    user_index: t,
                    sort_type: 0
                }), this.logger.info("zb.rh.fulwp call success")
            }, t.prototype.handleFetchUserListRspV2 = function (t, e) {
                if (this.logger.debug("zb.rh.hfulr call"), 0 != e.body.err_code) return this.stateCenter.userQuerying = !1, void this.logger.info("zb.rh.hfulr fetch error " + e.body.err_code);
                if (this.stateCenter.userStateUpdate) {
                    if (this.stateCenter.userTempList = this.stateCenter.userTempList.concat(e.body.user_baseinfos), t != e.body.marker) return this.logger.warn("zb.rh.hfulr fetch another page"), void this.fetchUserListWithPageV2(t + 1);
                    this.stateCenter.userSeq = e.body.server_user_seq, this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
                    for (var r = [], s = 0; s < this.stateCenter.userTempList.length; s++) {
                        var o = {
                            idName: this.stateCenter.userTempList[s].id_name,
                            nickName: this.stateCenter.userTempList[s].nick_name,
                            role: this.stateCenter.userTempList[s].role
                        };
                        r.push(o)
                    }
                    this.stateCenter.userQuerying = !1, this.onGetTotalUserList(this.stateCenter.roomid, r), this.stateCenter.userTempList = [], this.logger.info("zb.rh.hfulr call success user_list " + r + " count " + r.length)
                }
            }, t.prototype.handleFetchUserListRsp = function (t) {
                if (this.logger.debug("zb.rh.hfulr call"), 0 != t.body.err_code) return this.stateCenter.userQuerying = !1, void this.logger.info("zb.rh.hfulr fetch error " + t.body.err_code);
                if (this.stateCenter.userStateUpdate) {
                    this.stateCenter.userTempList = this.stateCenter.userTempList.concat(t.body.user_baseinfos);
                    var e = t.body.ret_user_index;
                    if (e != t.body.server_user_index) return this.logger.warn("zb.rh.hfulr fetch another page"), void this.fetchUserListWithPage(e + 1);
                    this.stateCenter.userSeq = t.body.server_user_seq, this.logger.info("zb.rh.hfulr set user Seq " + this.stateCenter.userSeq);
                    for (var r = [], s = 0; s < this.stateCenter.userTempList.length; s++) {
                        var o = {
                            idName: this.stateCenter.userTempList[s].id_name,
                            nickName: this.stateCenter.userTempList[s].nick_name,
                            role: this.stateCenter.userTempList[s].role
                        };
                        r.push(o)
                    }
                    this.stateCenter.userQuerying = !1, this.onGetTotalUserList(this.stateCenter.roomid, r), this.stateCenter.userTempList = [], this.logger.info("zb.rh.hfulr call success user_list " + r + " count " + r.length)
                }
            }, t.prototype.handleLogoutRsp = function (t) {
                this.logger.debug("zb.rh.hlor result=", t.body.err_code)
            }, t.prototype.handlePushUserStateUpdateMsg = function (t) {
                if (this.logger.info("zb.rh.hpus call"), this.stateCenter.isLogin()) if (this.stateCenter.userStateUpdate) {
                    if (this.stateCenter.userSeq + t.body.user_actions.length !== t.body.user_list_seq) return this.logger.warn("zb.rh.hpus fetch new userlist " + this.stateCenter.userSeq, NaN + t.body.user_list_seq), void this.fetchUserList();
                    this.stateCenter.userSeq = t.body.user_list_seq, this.logger.debug("zb.rh.hpus push userSeq " + this.stateCenter.userSeq);
                    for (var e = [], r = 0; r < t.body.user_actions.length; r++) {
                        var s = {
                            action: t.body.user_actions[r].Action,
                            idName: t.body.user_actions[r].IdName,
                            nickName: t.body.user_actions[r].NickName,
                            role: t.body.user_actions[r].Role,
                            loginTime: t.body.user_actions[r].LoginTime
                        };
                        e.push(s)
                    }
                    this.onUserStateUpdate(t.body.room_id, e), this.logger.info("zb.rh.hpus call success")
                } else this.logger.error("zb.rh.hpus no userStateUpdate flag"); else this.logger.error("zb.rh.hpus not login")
            }, t.prototype.onUserStateUpdate = function (t, e) {
            }, t
        }();
        e.RoomHandler = i
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(1), i = function () {
            function t(t, e, r) {
                this.logger = t, this.socketCenter = r, this.stateCenter = e
            }

            return t.prototype.setCDNInfo = function (t, e) {
            }, t.prototype.onStreamUpdated = function (t, e) {
            }, t.prototype.onStreamExtraInfoUpdated = function (t) {
            }, t.prototype.handleStreamStart = function (t, e) {
                var r = this;
                if (this.stateCenter.streamQuerying = !1, this.socketCenter.registerRouter("stream", function (t) {
                    r.handleStreamUpdateRsp(t)
                }), this.socketCenter.registerRouter("push_stream_update", function (t) {
                    r.handlePushStreamUpdateMsg(t)
                }), t == s.ENUM_RUN_STATE.login) this.logger.info("zb.sh.hss recover from disconnect so call streamupdate"), this.handleFullUpdateStream(e.body.stream_seq, e.body.stream_info || []); else {
                    this.logger.info("zb.sh.hss success callback user"), this.stateCenter.streamList = e.body.stream_info || [], this.stateCenter.streamSeq = e.body.stream_seq;
                    for (var i = 0; i < this.stateCenter.streamList.length; i++) this.stateCenter.streamList[i].anchor_id_name == this.stateCenter.idName && (this.updateStreamInfo(this.stateCenter.streamList[i].stream_id, s.ENUM_STREAM_SUB_CMD.liveEnd), this.stateCenter.streamList.splice(i, 1));
                    var n = this.makeCallbackStreamList(this.stateCenter.streamList);
                    o.ClientUtil.actionSuccessCallback("login", this.stateCenter.callbackList)(n)
                }
            }, t.prototype.onPublishStateUpdate = function (t, e, r) {
            }, t.prototype.updateStreamInfo = function (t, e, r, s) {
                var o = this;
                void 0 === r && (r = ""), this.logger.debug("zb.sh.usi call");
                var i = {stream_id: t, extra_info: r}, n = {sub_cmd: e, stream_msg: JSON.stringify(i)};
                this.socketCenter.registerRouter("stream", function (t) {
                    o.handleStreamUpdateRsp(t)
                }), this.socketCenter.sendMessage("stream", n, void 0, s), this.logger.info("zb.sh.usi call success cmd " + e)
            }, t.prototype.handleStreamUpdateRsp = function (t) {
                if (this.stateCenter.isLogin()) if (0 == t.body.err_code) {
                    this.logger.info("zb.sh.hsur stream seq " + this.stateCenter.streamSeq + " server seq " + t.body.stream_seq), this.stateCenter.streamSeq = t.body.stream_seq;
                    for (var e = 0; e < t.body.stream_info.length; e++) {
                        var r = t.body.stream_info[e].stream_id;
                        if (!this.stateCenter.publishStreamList[r]) return void this.logger.info("hsur.0 stream is not exist");
                        this.stateCenter.publishStreamList[r].state == s.ENUM_PUBLISH_STREAM_STATE.update_info && (this.stateCenter.publishStreamList[r].state = s.ENUM_PUBLISH_STREAM_STATE.publishing, this.onPublishStateUpdate(0, r, 0))
                    }
                } else this.logger.error("zb.sh.hsur stream update error " + t.body.err_code); else this.logger.error("zb.sh.hsur not login")
            }, t.prototype.handleFetchStreamListRsp = function (t) {
                this.logger.info("zb.sh.hfslr call"), this.stateCenter.streamQuerying = !1, 0 === t.body.err_code ? this.stateCenter.streamSeq !== t.body.stream_seq ? (this.handleFullUpdateStream(t.body.stream_seq, t.body.stream_info), this.logger.debug("zb.sh.hfslr call success")) : this.logger.info("zb.sh.hfslr same seq") : this.logger.info("zb.sh.hfslr server error=", t.body.err_code)
            }, t.prototype.handleFullUpdateStream = function (t, e) {
                var r = this;
                this.logger.debug("zb.sh.hfus call"), this.stateCenter.streamSeq = t, this.logger.debug("zb.sh.hfus server seq " + this.stateCenter.streamSeq), o.ClientUtil.mergeStreamList(this.logger, this.stateCenter.idName, this.stateCenter.streamList, e, function (t, e, o) {
                    0 !== t.length && (r.logger.debug("zb.sh.hfus callback addstream"), r.onStreamUpdated(s.ENUM_STREAM_UPDATE_TYPE.added, r.makeCallbackStreamList(t))), 0 !== e.length && (r.logger.debug("zb.sh.hfus callback delstream"), r.onStreamUpdated(s.ENUM_STREAM_UPDATE_TYPE.deleted, r.makeCallbackStreamList(e))), 0 !== o.length && (r.logger.debug("zb.sh.hfus callback updatestream"), r.onStreamExtraInfoUpdated(r.makeCallbackStreamList(o)))
                }), this.logger.info("zb.sh.hfus call success")
            }, t.prototype.handlePushStreamUpdateMsg = function (t) {
                if (this.logger.info("zb.sh.hpsum call"), t.body.stream_info && 0 !== t.body.stream_info.length) {
                    if (t.body.stream_info.length + this.stateCenter.streamSeq !== t.body.stream_seq) return this.logger.info("zb.sh.hpsum call updatestream"), void this.fetchStreamList();
                    switch (this.stateCenter.streamSeq = t.body.stream_seq, t.body.stream_cmd) {
                        case s.ENUM_STREAM_UPDATE_CMD.added:
                            this.handleAddedStreamList(t.body.stream_info);
                            break;
                        case s.ENUM_STREAM_UPDATE_CMD.deleted:
                            this.handleDeletedStreamList(t.body.stream_info);
                            break;
                        case s.ENUM_STREAM_UPDATE_CMD.updated:
                            this.handleUpdatedStreamList(t.body.stream_info)
                    }
                    this.logger.info("zb.sh.hpsum call success")
                } else this.logger.info("zb.sh.hpsum, emtpy list")
            }, t.prototype.handleAddedStreamList = function (t) {
                this.logger.debug("zb.sh.hasl call");
                for (var e, r = [], o = 0; o < t.length; o++) if (t[o].anchor_id_name != this.stateCenter.idName) {
                    e = !1;
                    for (var i = 0; i < this.stateCenter.streamList.length; i++) if (t[o].stream_id === this.stateCenter.streamList[i].stream_id) {
                        e = !0;
                        break
                    }
                    e || r.push(t[o])
                } else this.logger.debug("hdsl.0 have self stream added");
                if (0 !== r.length) {
                    this.logger.debug("zb.sh.hasl callback addstream");
                    for (var n = 0; n < r.length; n++) this.stateCenter.streamList.push(r[n]);
                    this.onStreamUpdated(s.ENUM_STREAM_UPDATE_TYPE.added, this.makeCallbackStreamList(r))
                }
                this.logger.info("zb.sh.hasl call success")
            }, t.prototype.handleDeletedStreamList = function (t) {
                this.logger.debug("zb.sh.hdsl call");
                for (var e = [], r = 0; r < t.length; r++) if (t[r].anchor_id_name != this.stateCenter.idName) {
                    for (var o = this.stateCenter.streamList.length - 1; o >= 0; o--) if (t[r].stream_id === this.stateCenter.streamList[o].stream_id) {
                        this.stateCenter.streamList.splice(o, 1), e.push(t[r]);
                        break
                    }
                } else this.logger.debug("zb.sh.hdsl have self stream deleted");
                0 !== e.length && (this.logger.debug("zb.sh.hdsl callback delstream"), this.onStreamUpdated(s.ENUM_STREAM_UPDATE_TYPE.deleted, this.makeCallbackStreamList(e))), this.logger.info("zb.sh.hdsl call")
            }, t.prototype.handleUpdatedStreamList = function (t) {
                this.logger.debug("zb.sh.husl call");
                for (var e = [], r = 0; r < t.length; r++) if (t[r].anchor_id_name != this.stateCenter.idName) {
                    for (var s = 0; s < this.stateCenter.streamList.length; s++) if (t[r].stream_id === this.stateCenter.streamList[s].stream_id) {
                        t[r].extra_info !== this.stateCenter.streamList[s].extra_info && (this.stateCenter.streamList[s] = t[r], e.push(t[r]));
                        break
                    }
                } else this.logger.debug("hsul.0 have self stream updated");
                0 !== e.length && (this.logger.debug("zb.sh.husl callback updatestream"), this.onStreamExtraInfoUpdated(this.makeCallbackStreamList(e))), this.logger.info("zb.sh.husl call success")
            }, t.prototype.fetchStreamList = function () {
                if (this.logger.info("zb.sh.fsl call"), this.stateCenter.isLogin()) this.logger.info("zb.sh.fsl state error"); else if (this.stateCenter.streamQuerying) this.logger.info("zb.sh.fsl already doing"); else {
                    this.stateCenter.streamQuerying = !0, this.logger.debug("zb.sh.fsl send fetch request");
                    this.socketCenter.registerRouter("stream_info", this.handleFetchStreamListRsp), this.socketCenter.sendMessage("stream_info", {reserve: 0}), this.logger.debug("zb.sh.fsl call success")
                }
            }, t.prototype.makeCallbackStreamList = function (t) {
                var e = [];
                if (t && t.length > 0) for (var r = 0; r < t.length; r++) {
                    var s = {
                        anchor_id_name: t[r].anchor_id_name,
                        stream_gid: t[r].stream_gid,
                        anchor_nick_name: t[r].anchor_nick_name,
                        extra_info: t[r].extra_info,
                        stream_id: t[r].stream_id,
                        urls_flv: "",
                        urls_rtmp: "",
                        urls_hls: "",
                        urls_https_flv: "",
                        urls_https_hls: ""
                    };
                    this.setCDNInfo(s, t[r]), e.push(s)
                }
                return e
            }, t.prototype.updateMixStream = function (t, e, r) {
                var i = this;
                if (this.logger.info("zb.sh.ums call"), null == t.outputStreamId && null == t.outputUrl) return this.logger.error("zb.sh.ums no mix stream info"), !1;
                if (0 == t.streamList.length) return this.logger.error("zb.sh.ums no input stream"), !1;
                var n = {
                    id_name: this.stateCenter.idName,
                    live_channel: this.stateCenter.roomid,
                    appid: this.stateCenter.appid,
                    version: s.PROTO_VERSION
                };
                "string" == typeof t.userData && t.userData.length <= 1e4 && (n.UserData = t.userData);
                for (var a = [], h = 0; h < t.streamList.length; h++) {
                    var l = t.streamList[h], u = l.streamId;
                    this.stateCenter.testEnvironment && (u = "zegotest-" + this.stateCenter.appid + "-" + l.streamId), a.push({
                        stream_id: u,
                        rect: {layer: h, top: l.top, left: l.left, bottom: l.bottom, right: l.right}
                    })
                }
                n.MixInput = a;
                var c = {};
                if (null != t.outputStreamId ? this.stateCenter.testEnvironment ? c.stream_id = "zegotest-" + this.stateCenter.appid + "-" + t.outputStreamId : c.stream_id = t.outputStreamId : null != t.outputUrl && (c.mixurl = t.outputUrl), !t.outputBitrate) return this.logger.error("zb.sh.ums no bitrate param"), !1;
                if (c.bitrate = t.outputBitrate, !t.outputFps) return this.logger.error("zb.sh.ums no fps param"), !1;
                if (c.fps = t.outputFps, !t.outputWidth) return this.logger.error("zb.sh.ums no width param"), !1;
                if (c.width = t.outputWidth, !t.outputHeight) return this.logger.error("zb.sh.ums no height param"), !1;
                if (c.height = t.outputHeight, t.outputAudioConfig && (c.audio_enc_id = t.outputAudioConfig), t.outputAudioBitrate && (c.audio_bitrate = t.outputAudioBitrate), t.outputAudioChannels && (c.audio_channel_cnt = t.outputAudioChannels), t.outputBgColor) {
                    if ("string" != typeof t.outputBgColor) return this.logger.error("zb.sh.ums param outputBgImage error"), !1;
                    n.output_bg_color = t.outputBgColor
                }
                if (t.outputBgImage) {
                    if ("string" != typeof t.outputBgImage || !t.outputBgImage.startsWith("preset-id://")) return this.logger.error("zb.sh.ums param outputBgImage error"), !1;
                    n.output_bg_image = t.outputBgImage
                }
                this.stateCenter.testEnvironment ? c.testenv = 1 : c.testenv = 0, n.MixOutput = [c];
                var d = {channel: "zeus", cmd: "start_mix", req_body: JSON.stringify(n)};
                console.warn('biz_channel',d);
                return this.logger.debug("zb.sh.ums send command"),
                    this.socketCenter.sendMessage("biz_channel", d, function (n, a, h) {
                    i.logger.debug("zb.sh.ums receive message");
                    var l = "zegotest-" + i.stateCenter.appid + "-";
                    if (0 != h.length) {
                        for (var u = JSON.parse(h), c = [], d = t.outputStreamId, p = 0; p < u.play.length; p++) {
                            var g = {rtmpUrls: null, hlsUrls: null, flvUrls: null};
                            i.stateCenter.testEnvironment && d.startsWith(l) && (d = d.slice(l.length)), u.play[p].rtmp_url && u.play[p].rtmp_url.length > 0 && (g.rtmpUrls = [u.play[p].rtmp_url]), u.play[p].hls_url && u.play[p].hls_url.length > 0 && (g.hlsUrls = [u.play[p].hls_url]), u.play[p].hdl_url && u.play[p].hdl_url.length > 0 && (g.flvUrls = [u.play[p].hdl_url]), c.push(g)
                        }
                        e && e(d, c)
                    } else r && r(o.ClientUtil.getServerError(s.MIXSTREAM_ERROR_CODE + 1))
                }, function (t, e, n) {
                    if ("number" == typeof t) {
                        i.logger.debug("zb.sh.ums error: " + t);
                        var a = [];
                        if (1000000150 == t && 0 != n.length) for (var h = JSON.parse(n), l = "zegotest-" + i.stateCenter.appid + "-", u = 0; u < h.non_exist_streams.length; u++) {
                            var c = h.non_exist_streams[u];
                            i.stateCenter.testEnvironment && c.startsWith(l) ? a.push(c.slice(l.length)) : a.push(c)
                        }
                        r && r(o.ClientUtil.getServerError(s.MIXSTREAM_ERROR_CODE + t), a)
                    } else i.logger.debug("zb.sh.ums error code " + t.code), r && r(t)
                }), !0
            }, t.prototype.stopMixStream = function (t, e, r) {
                if (this.logger.info("zb.sh.sms call"), null == t.outputStreamId && null == t.outputUrl) return this.logger.error("zb.sh.sms no mix stream info"), !1;
                var i = {
                    id_name: this.stateCenter.idName,
                    live_channel: this.stateCenter.roomid,
                    appid: this.stateCenter.appid,
                    version: s.PROTO_VERSION
                };
                null != t.outputStreamId ? this.stateCenter.testEnvironment ? i.stream_id = "zegotest-" + this.stateCenter.appid + "-" + t.outputStreamId : i.stream_id = t.outputStreamId : null != t.outputUrl && (i.mixurl = t.outputUrl);
                var n = {channel: "zeus", cmd: "stop_mix", req_body: JSON.stringify(i)};
                return this.socketCenter.sendMessage("biz_channel", n, function (t, r) {
                    e && e()
                }, function (t, e) {
                    "number" == typeof t ? r && r(o.ClientUtil.getServerError(s.MIXSTREAM_ERROR_CODE + t)) : r && r(t)
                }), !0
            }, t.prototype.updateStreamExtraInfo = function (t, e) {
                return this.logger.info("zb.sh.usei call"), t ? "string" == typeof e && (this.stateCenter.publishStreamList[t] && (this.stateCenter.publishStreamList[t].extra_info = e, this.stateCenter.publishStreamList[t].state >= s.ENUM_PUBLISH_STREAM_STATE.update_info && this.updateStreamInfo(t, s.ENUM_STREAM_SUB_CMD.liveUpdate, e)), !0) : (this.logger.error("zb.sh.usei param error"), !1)
            }, t
        }();
        e.StreamHandler = i
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(1), i = function () {
            function t(t, e, r) {
                this.logger = t, this.socketCenter = r, this.stateCenter = e
            }

            return t.prototype.resetHeartbeat = function () {
                this.logger.debug("zb.hb.rht call"), clearTimeout(this.stateCenter.heartbeatTimer), this.stateCenter.heartbeatTimer = null, this.stateCenter.tryHeartbeatCount = 0, this.logger.debug("zb.hb.rht call success")
            }, t.prototype.hbLogout = function (t) {
            }, t.prototype.start = function (t) {
                var e = this;
                if (this.logger.debug("zb.hb.sht call"), this.stateCenter.isLogin()) {
                    if (++this.stateCenter.tryHeartbeatCount > 3) return this.logger.error("zb.hb.sht come to try limit"), void this.hbLogout(s.sdkErrorList.HEARTBEAT_TIMEOUT);
                    this.logger.debug("zb.hb.sht send packet");
                    this.socketCenter.registerRouter("hb", function (t) {
                        e.handleHeartbeatRsp(t)
                    }), this.socketCenter.sendMessage("hb", {reserve: 0}), this.logger.debug("zb.hb.sht call success"), this.stateCenter.heartbeatInterval = t, this.stateCenter.heartbeatTimer = setTimeout(function () {
                        e.start(e.stateCenter.heartbeatInterval)
                    }, this.stateCenter.heartbeatInterval)
                } else this.logger.error("zb.hb.sht state error")
            }, t.prototype.handleHeartbeatRsp = function (t) {
                if (this.logger.debug("zb.hb.hhbr call"), 0 !== t.body.err_code) return this.logger.error("zb.hb.hhbr call disconnect, server error=", t.body.err_code), void this.hbLogout(o.ClientUtil.getServerError(t.body.err_code));
                for (var e in this.stateCenter.tryHeartbeatCount = 0, this.stateCenter.heartbeatInterval = t.body.hearbeat_interval, this.stateCenter.heartbeatInterval < s.MINIUM_HEARTBEAT_INTERVAL && (this.stateCenter.heartbeatInterval = s.MINIUM_HEARTBEAT_INTERVAL), t.body.bigim_time_window && "number" == typeof t.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = t.body.bigim_time_window), t.body.dati_time_window && "number" == typeof t.body.dati_time_window && (this.stateCenter.datiTimeWindow = t.body.dati_time_window), this.ReliableMessageHandler(t), this.fetchStreamList(t), t.body.server_user_seq !== this.stateCenter.userSeq && this.stateCenter.userStateUpdate && (this.logger.info("zb.hb.hhbr call update user " + t.body.server_user_seq, this.stateCenter.userSeq), this.fetchUserList()), this.stateCenter.publishStreamList) this.stateCenter.publishStreamList[e].state == s.ENUM_PUBLISH_STREAM_STATE.update_info && (this.logger.info("zb.hb.hhbr try to update stream info"), this.updateStreamInfo(e, s.ENUM_STREAM_SUB_CMD.liveBegin, this.stateCenter.publishStreamList[e].extra_info));
                null != t.body.online_count && 0 != t.body.online_count && this.onUpdateOnlineCount(this.stateCenter.roomid, t.body.online_count), this.logger.debug("zb.hb.hhbr call success")
            }, t.prototype.ReliableMessageHandler = function (t) {
                if (t.body.trans_seqs) for (var e = 0; e < t.body.trans_seqs.length; e++) {
                    var r = t.body.trans_seqs[e].trans_type, s = t.body.trans_seqs[e].trans_seq;
                    if (!this.stateCenter.transSeqMap[r] || this.stateCenter.transSeqMap[r].seq !== s) {
                        var o = 0;
                        this.stateCenter.transSeqMap[r] ? (o = this.stateCenter.transSeqMap[r].seq, this.logger.debug("zb.hb.rmh type " + r + " old seq " + this.stateCenter.transSeqMap[r].seq + " server seq " + s)) : (o = 0, this.logger.debug("zb.hb.rmh type " + r + " server seq " + s)), this.fetchReliableMessage(r, o)
                    }
                }
            }, t.prototype.fetchReliableMessage = function (t, e) {
                var r = this;
                this.logger.debug("zb.hb.frm call");
                var s = {trans_type: t, trans_local_seq: e};
                this.socketCenter.registerRouter("trans_fetch", function (t) {
                    r.handleFetchTransRsp(t)
                }), this.socketCenter.sendMessage("trans_fetch", s), this.logger.debug("zb.hb.frm call success")
            }, t.prototype.handleFetchTransRsp = function (t) {
                if (this.stateCenter.isLogin()) if (0 == t.body.err_code) {
                    var e = t.body.trans_type, r = t.body.trans_seq;
                    this.stateCenter.transSeqMap[e] = {seq: r}, t.body.trans_user_idname != this.stateCenter.idName && this.onRecvReliableMessage(e, r, t.body.trans_data), this.logger.debug("zb.hb.hftr trans " + e + " seq " + r)
                } else this.logger.error("zb.hb.hftr trans send error " + t.body.err_code); else this.logger.error("zb.hb.hftr not login")
            }, t.prototype.fetchStreamList = function (t) {
                var e = this;
                t.body.stream_seq !== this.stateCenter.streamSeq && (this.logger.debug("zb.hb.fsl current seq " + this.stateCenter.streamSeq + " server Seq " + t.body.stream_seq), this.logger.debug("zb.hb.fsl call"), this.stateCenter.isLogin() ? this.stateCenter.streamQuerying ? this.logger.warn("zb.hb.fsl already doing") : (this.stateCenter.streamQuerying = !0, this.logger.debug("zb.hb.fsl send fetch request"), this.socketCenter.registerRouter("stream_info", function (t) {
                    e.handleFetchStreamListRsp(t)
                }), this.socketCenter.sendMessage("stream_info", {reserve: 0}), this.logger.debug("zb.hb.fsl call success")) : this.logger.error("zb.hb.fsl state error"))
            }, t.prototype.handleFetchStreamListRsp = function (t) {
            }, t.prototype.fetchUserList = function () {
            }, t.prototype.updateStreamInfo = function (t, e, r, s) {
                void 0 === r && (r = "")
            }, t.prototype.onUpdateOnlineCount = function (t, e) {
            }, t.prototype.onRecvReliableMessage = function (t, e, r) {
            }, t.prototype.resetCheckMessage = function () {
                this.logger.debug("zb.hb.rcm call"), clearTimeout(this.stateCenter.sendDataCheckTimer), this.stateCenter.sendDataCheckTimer = null, this.checkSendMessageList(this.stateCenter.sendDataList), this.checkSendMessageList(this.stateCenter.sendCommandList), this.stateCenter.sendDataMap = {}, this.stateCenter.sendCommandMap = {}, this.logger.debug("zb.hb.rcm call success")
            }, t.prototype.checkSendMessageList = function (t) {
                for (var e = t.getFirst(); null != e;) t.remove(e), e._data.error && (e._data.data.body.custom_msg ? e._data.error(s.sdkErrorList.SEND_MSG_TIMEOUT, e._data.data.header.seq, e._data.data.body.custom_msg) : e._data.error(s.sdkErrorList.SEND_MSG_TIMEOUT, e._data.data.header.seq)), e = t.getFirst()
            }, t.prototype.checkMessageListTimeout = function (t, e) {
                for (var r = t.getFirst(), o = Date.parse(new Date + ""), i = 0, n = 0, a = 0; !(null == r || r._data.time + this.stateCenter.sendDataTimeout > o || (delete e[r._data.data.header.seq], t.remove(r), ++n, null == r._data.error || this.stateCenter.sendDataDropTimeout > 0 && r._data.time + this.stateCenter.sendDataDropTimeout < o ? ++a : r._data.data.body.custom_msg ? r._data.error(s.sdkErrorList.SEND_MSG_TIMEOUT, r._data.data.header.seq, r._data.data.body.custom_msg) : r._data.error(s.sdkErrorList.SEND_MSG_TIMEOUT, r._data.data.header.seq), ++i >= this.stateCenter.sendDataCheckOnceCount));) r = t.getFirst();
                0 == n && 0 == a || this.logger.debug("zb.hb.cmt call success, stat: timeout=", n, "drop=", a)
            }, t.prototype.startCheckMessageTimeout = function () {
                var t = this;
                this.stateCenter.isLogin() ? (this.checkMessageListTimeout(this.stateCenter.sendDataList, this.stateCenter.sendDataMap), this.checkMessageListTimeout(this.stateCenter.sendCommandList, this.stateCenter.sendCommandMap), this.stateCenter.sendDataCheckTimer = setTimeout(function () {
                    t.startCheckMessageTimeout()
                }, this.stateCenter.sendDataCheckInterval)) : this.logger.error("zb.hb.scmt state error")
            }, t
        }();
        e.HeartBeatHandler = i
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(1), i = function () {
            function t(t, e, r) {
                this.logger = t, this.socketCenter = r, this.stateCenter = e
            }

            return t.prototype.sendCustomCommand = function (t, e, r, s) {
                var i = this;
                if (this.logger.debug("zb.mh.scc call"), !this.stateCenter.isLogin()) return this.logger.error("zb.mh.scc state error"), !1;
                if (!t || 0 == t.length) return this.logger.error("zb.mh.scc dstMembers error"), !1;
                var n = {
                    from_userid: this.stateCenter.idName,
                    from_username: this.stateCenter.nickName,
                    request_id: this.stateCenter.getRequestId(),
                    custom_content: e || "",
                    room_id: this.stateCenter.roomid
                }, a = {dest_id_name: t, custom_msg: JSON.stringify(n)};
                return o.ClientUtil.checkCustomCommandParam(a) ? (this.socketCenter.registerRouter("custommsg", function (t) {
                    i.handleSendCustomMsgRsp(t)
                }), this.socketCenter.sendCustomMessage("custommsg", a, r, s), this.logger.info("zb.mh.scc call success"), !0) : (this.logger.info("zb.mh.scc param error"), !1)
            }, t.prototype.handleSendCustomMsgRsp = function (t) {
                this.logger.debug("zb.mh.hscmrcall");
                var e, r = this.stateCenter.sendDataMap[t.header.seq];
                null != r ? ("custommsg" != (e = r._data).data.header.cmd ? this.logger.error("zb.mh.hscmrcmd wrong" + e.data.header.cmd) : 0 === t.body.err_code ? null != e.success && e.success(t.header.seq, e.data.body.custom_msg) : null != e.error && e.error(o.ClientUtil.getServerError(t.body.err_code), t.header.seq, e.data.body.custom_msg), delete this.stateCenter.sendDataMap[t.header.seq], this.stateCenter.sendDataList.remove(r)) : this.logger.error("zb.mh.hscmrno found seq=" + t.header.seq), this.logger.debug("zb.mh.hscmr  call success")
            }, t.prototype.handlePushCustomMsg = function (t) {
                var e = JSON.parse(t.body.custommsg);
                this.logger.debug("zb.mh.hpcm submsg=", e), this.onRecvCustomCommand(e.from_userid, e.from_username, e.custom_content)
            }, t.prototype.onRecvCustomCommand = function (t, e, r) {
            }, t.prototype.sendRoomMsg = function (t, e, r, o, i) {
                var n = this;
                if (this.logger.debug("zb.mh.srm call"), this.stateCenter.isLogin()) {
                    var a = Date.parse(new Date + "");
                    if (this.stateCenter.sendRoomMsgTime > 0 && this.stateCenter.sendRoomMsgTime + this.stateCenter.SendRoomMsgInterval > a) return this.logger.info("zb.mh.srm freq error"), void(i && i(s.sdkErrorList.FREQ_LIMITED, 0, t, e, r));
                    this.stateCenter.sendRoomMsgTime = a, this.logger.debug("zb.mh.srm send fetch request");
                    var h = {msg_category: t, msg_type: e, msg_content: r};
                    this.socketCenter.registerRouter("im_chat", function (t) {
                        n.handleSendRoomMsgRsp(t)
                    }), this.socketCenter.sendCustomMessage("im_chat", h, o, i), this.logger.info("zb.mh.srm call success")
                } else this.logger.error("zb.mh.srm state error")
            }, t.prototype.handleSendRoomMsgRsp = function (t) {
                this.logger.debug("zb.mh.hsrmr call");
                var e, r = this.stateCenter.sendDataMap[t.header.seq];
                null != r ? ("im_chat" != (e = r._data).data.header.cmd ? this.logger.error("zb.mh.hsrmr cmd wrong" + e.data.header.cmd) : 0 === t.body.err_code ? e.success && e.success(t.header.seq, t.body.msg_id, e.data.body.msg_category, e.data.body.msg_type, e.data.body.msg_content) : e.error && e.error(o.ClientUtil.getServerError(t.body.err_code), t.header.seq, e.data.body.msg_category, e.data.body.msg_type, e.data.body.msg_content), delete this.stateCenter.sendDataMap[t.header.seq], this.stateCenter.sendDataList.remove(r)) : this.logger.error("hzb.mh.hsrmr no found seq=" + t.header.seq), this.logger.info("zb.mh.hsrmr call success")
            }, t.prototype.onRecvRoomMsg = function (t, e, r) {
            }, t.prototype.sendReliableMessage = function (t, e, r, s) {
                this.logger.debug("zb.mh.srirm call"), this.stateCenter.transSeqMap[t] || (this.stateCenter.transSeqMap[t] = {seq: 0});
                var o = {
                    trans_type: t,
                    trans_data: e,
                    trans_local_seq: this.stateCenter.transSeqMap[t].seq,
                    trans_channel: ""
                };
                this.socketCenter.sendMessage("trans", o, r, s)
            }, t.prototype.sendBigRoomMessage = function (t, e, r, s, o) {
                var i = this;
                this.logger.debug("zb.mh.sbim call");
                var n = this.stateCenter.bigimTimeWindow, a = this.stateCenter.serverTimeOffset,
                    h = (new Date).getTime() + a, l = (++this.stateCenter.cmdSeq).toString();
                if (null == s && (s = null), null == o && (o = null), this.stateCenter.bigImCallbackMap[l] = {
                    success: s,
                    error: o
                }, 0 == n) {
                    var u = {msg_category: t, msg_type: e, msg_content: r, bigmsg_client_id: l};
                    this.logger.debug("zb.mh.sbim no time window"), this.sendBigRoomMessageInternal([u], function (t) {
                        i.handleBigImMsgRsp(t)
                    }, o)
                } else {
                    var c = Math.floor(h / n);
                    if (this.logger.debug("currentIndex " + c + " lastTimeIndex " + this.stateCenter.bigImLastTimeIndex), this.stateCenter.bigImLastTimeIndex < c && 0 == this.stateCenter.bigImMessageList.length) {
                        this.stateCenter.bigImLastTimeIndex = c;
                        var d = {msg_category: t, msg_type: e, msg_content: r, bigmsg_client_id: l};
                        this.sendBigRoomMessageInternal([d], function (t) {
                            i.handleBigImMsgRsp(t)
                        }, o)
                    } else this.stateCenter.bigImMessageList.push({
                        msg_category: t,
                        msg_type: e,
                        msg_content: r,
                        bigmsg_client_id: l
                    }), 1 == this.stateCenter.bigImMessageList.length && this.setBigImTimer(a, n)
                }
            }, t.prototype.handlePushMergeMsg = function (t) {
                if (this.stateCenter.isLogin()) {
                    for (var e = 0; e < t.body.messages.length; e++) 14001 === t.body.messages[e].sub_cmd && this.handlePushBigRooMsg(t.body.messages[e].msg_body);
                    this.logger.debug("zb.mh.hpmm call success")
                } else this.logger.error("zb.mh.hpmmnot login")
            }, t.prototype.handlePushBigRooMsg = function (t) {
                var e;
                try {
                    e = JSON.parse(t)
                } catch (t) {
                    return void this.logger.warn("zb.mh.hpbrm parse json error")
                }
                if (e) {
                    for (var r = e.room_id, s = [], o = 0; o < e.msg_data.length; o++) {
                        var i = e.msg_data[o];
                        i.id_name != this.stateCenter.idName ? s.push({
                            idName: i.id_name,
                            nickName: i.nick_name,
                            messageId: i.bigmsg_id,
                            category: i.msg_category,
                            type: i.msg_type,
                            content: i.msg_content,
                            time: i.send_time
                        }) : this.logger.debug("zb.mh.hpbrm self message")
                    }
                    0 == s.length ? this.logger.debug("zb.mh.hpbrm no other pushData except self") : this.onRecvBigRoomMessage(s, r), this.logger.debug("zb.mh.hpbrm call success")
                } else this.logger.warn("zb.mh.hpbrm cann't find message body")
            }, t.prototype.onRecvBigRoomMessage = function (t, e) {
            }, t.prototype.sendBigRoomMessageInternal = function (t, e, r) {
                this.logger.debug("zb.mh.sbim call");
                var s = {msgs: t};
                this.socketCenter.sendMessage("bigim_chat", s, e, r)
            }, t.prototype.handleBigImMsgRsp = function (t) {
                if (this.stateCenter.isLogin()) {
                    this.stateCenter.bigimTimeWindow != t.body.bigim_time_window && (this.stateCenter.bigimTimeWindow = t.body.bigim_time_window);
                    for (var e = 0; e < t.body.msgs.length; e++) {
                        var r = t.body.msgs[e].bigmsg_client_id, s = t.body.msgs[e].bigmsg_id;
                        if (this.stateCenter.bigImCallbackMap[r]) {
                            var o = this.stateCenter.bigImCallbackMap[r].success;
                            null != o && o(t.header.seq, s), delete this.stateCenter.bigImCallbackMap[r]
                        }
                    }
                } else this.logger.info("zb.mh.hbmr not login")
            }, t.prototype.setBigImTimer = function (t, e) {
                var r = this, s = e - ((new Date).getTime() + t) % e, i = o.ClientUtil.generateRandumNumber(e) + s;
                this.logger.info("zb.mh.sbt setTimer " + i), this.stateCenter.bigImTimer = setTimeout(function () {
                    r.onBigImTimer()
                }, i)
            }, t.prototype.onBigImTimer = function () {
                var t = this, e = (new Date).getTime() + this.stateCenter.serverTimeOffset;
                this.stateCenter.bigImLastTimeIndex = Math.floor(e / this.stateCenter.bigimTimeWindow);
                for (var r = [], s = [], o = 0; o < this.stateCenter.bigImMessageList.length && !(o >= 20); o++) {
                    var i = this.stateCenter.bigImMessageList[o];
                    r.push({
                        msg_category: i.msg_category,
                        msg_type: i.msg_type,
                        msg_content: i.msg_content,
                        bigmsg_client_id: i.bigmsg_client_id
                    }), s.push(i.bigmsg_client_id)
                }
                this.stateCenter.bigImMessageList.length > 20 ? this.stateCenter.bigImMessageList.splice(0, 20) : this.stateCenter.bigImMessageList = [], this.sendBigRoomMessageInternal(r, function (e) {
                    t.handleBigImMsgRsp(e)
                }, function (e, r) {
                    for (var o = 0; o < s.length; o++) {
                        var i = s[o], n = t.stateCenter.bigImCallbackMap[i];
                        n && (null != n.error && n.error(e, r), delete t.stateCenter.bigImCallbackMap[i])
                    }
                }), clearTimeout(this.stateCenter.bigImTimer), this.stateCenter.bigImTimer = null, this.stateCenter.bigImMessageList.length > 0 && this.setBigImTimer(this.stateCenter.serverTimeOffset, this.stateCenter.bigimTimeWindow)
            }, t.prototype.sendRelayMessage = function (t, e, r, s) {
                this.logger.debug("zb.mh.srm call");
                var o = this.stateCenter.datiTimeWindow, i = this.stateCenter.serverTimeOffset;
                o > 0 ? (this.stateCenter.realyMessageList.push({
                    type: t,
                    data: e,
                    success: r,
                    error: s
                }), 1 == this.stateCenter.realyMessageList.length && this.setRelayTimer(i, o)) : this.sendRelayMessageInternal(t, e, r, s)
            }, t.prototype.sendRelayMessageInternal = function (t, e, r, s) {
                this.logger.debug("zb.mh.srmi call");
                var o = {relay_type: t, relay_data: e};
                this.socketCenter.sendMessage("relay", o, r, s)
            }, t.prototype.setRelayTimer = function (t, e) {
                var r = this, s = 2 * e - ((new Date).getTime() + t) % e, i = o.ClientUtil.generateRandumNumber(s);
                this.logger.info("zb.mh.srt setTimer " + i), this.stateCenter.relayTimer = setTimeout(function () {
                    r.onRelayTimer()
                }, i)
            }, t.prototype.onRelayTimer = function () {
                if (0 != this.stateCenter.realyMessageList.length) {
                    var t = this.stateCenter.realyMessageList[0];
                    this.sendRelayMessageInternal(t.type, t.data, t.success, t.error), clearTimeout(this.stateCenter.relayTimer), this.stateCenter.relayTimer = null, this.stateCenter.realyMessageList.splice(0, 1), this.stateCenter.realyMessageList.length > 0 && this.setRelayTimer(this.stateCenter.serverTimeOffset, this.stateCenter.datiTimeWindow)
                } else this.logger.info("zb.mh.ort no relay data")
            }, t.prototype.handlePushTransMsg = function (t) {
                if (this.stateCenter.isLogin()) {
                    var e = t.body.trans_type, r = t.body.trans_seq;
                    this.stateCenter.transSeqMap[e] ? this.stateCenter.transSeqMap[e].seq = r : this.stateCenter.transSeqMap[e] = {seq: r}, t.body.trans_user_idname != this.stateCenter.idName ? this.onRecvReliableMessage(e, r, t.body.trans_data) : this.logger.debug("zb.mh.hptr receive self trans message"), this.logger.info("zb.mh.hptr trans " + e + " seq " + r)
                } else this.logger.error("zb.mh.hptr not login")
            }, t.prototype.onRecvReliableMessage = function (t, e, r) {
            }, t
        }();
        e.MessageHandler = i
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = function () {
            function t(t, e, r) {
                this.logger = t, this.socketCenter = r, this.stateCenter = e
            }

            return t.prototype.requestJoinLive = function (t, e, r, o) {
                this.logger.debug("zb.lh.rjl call");
                var i = this.stateCenter.getRequestId(), n = this.stateCenter.getSignalCmdContent(i, t);
                return null != o && (this.stateCenter.joinLiveCallbackMap[i] = o, this.sendSignalCmd(s.ENUM_SIGNAL_SUB_CMD.joinLiveRequest, n, t, e, r), !0)
            }, t.prototype.inviteJoinLive = function (t, e, r, o) {
                this.logger.debug("zb.lh.ijl call");
                var i = this.stateCenter.getRequestId(), n = this.stateCenter.getSignalCmdContent(i, t);
                return null != o && (this.stateCenter.joinLiveCallbackMap[i] = o, this.sendSignalCmd(s.ENUM_SIGNAL_SUB_CMD.joinLiveInvite, n, t, e, r), !0)
            }, t.prototype.endJoinLive = function (t, e, r) {
                this.logger.debug("zb.lh.ejl call");
                var o = this.stateCenter.getRequestId(), i = this.stateCenter.getSignalCmdContent(o, t);
                return this.sendSignalCmd(s.ENUM_SIGNAL_SUB_CMD.joinLiveStop, i, t, e, r), !0
            }, t.prototype.respondJoinLive = function (t, e, r, o) {
                this.logger.debug("zb.lh.rpjl call");
                var i = this.stateCenter.joinLiveRequestMap[t];
                if (!i) return this.logger.info("zb.lh.rpjl no dest id name"), !1;
                var n = 0;
                !0 === e && (n = 1);
                var a = this.stateCenter.getSignalCmdContent(t, i, n);
                return this.sendSignalCmd(s.ENUM_SIGNAL_SUB_CMD.joinLiveResult, a, i, r, o), delete this.stateCenter.joinLiveRequestMap[t], !0
            }, t.prototype.sendSignalCmd = function (t, e, r, s, o) {
                if (this.logger.debug("zb.lh.ssc call"), this.stateCenter.isLogin()) {
                    this.logger.debug("zb.lh.ssc send signal cmd " + t);
                    var i = {sub_cmd: t, signal_msg: e, dest_id_name: [r]};
                    this.socketCenter.sendMessage("signal", i, s, o), this.logger.info("zb.lh.ssc call success")
                } else this.logger.error("zb.lh.ssc state error")
            }, t.prototype.handlePushSignalMsg = function (t) {
                if (this.stateCenter.isLogin()) {
                    var e = JSON.parse(t.body.signal_msg);
                    switch (this.logger.debug("zb.lh.hpcm hpsm= ", e), t.body.sub_cmd) {
                        case s.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveRequest:
                            this.handlePushJoinLiveRequestMsg(e);
                            break;
                        case s.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveResult:
                            this.handlePushJoinLiveResultMsg(e);
                            break;
                        case s.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveInvite:
                            this.handlePushJoinLiveInviteMsg(e);
                            break;
                        case s.ENUM_PUSH_SIGNAL_SUB_CMD.pushJoinLiveStop:
                            this.handlePushJoinLiveStopMsg(e)
                    }
                    this.logger.debug("zb.lh.hpsm call end")
                } else this.logger.warn("zb.lh.hpsm not login")
            }, t.prototype.handlePushJoinLiveRequestMsg = function (t) {
                var e = t.request_id;
                if ("string" == typeof e) {
                    var r = t.from_userid;
                    "string" == typeof r ? (this.stateCenter.joinLiveRequestMap[e] = r, this.logger.info("zb.lh.hpjlrm onRecvJoinLiveRequest " + r), this.onRecvJoinLiveRequest(e, t.from_userid, t.from_username, t.room_id)) : this.logger.error("zb.lh.hpjlrm no from user")
                } else this.logger.error("zb.lh.hpjlrm no requestId")
            }, t.prototype.onRecvJoinLiveRequest = function (t, e, r, s) {
            }, t.prototype.handlePushJoinLiveInviteMsg = function (t) {
                var e = t.request_id;
                if ("string" == typeof e) {
                    var r = t.from_userid;
                    "string" == typeof r ? (this.stateCenter.joinLiveRequestMap[e] = r, this.logger.info("zb.lh.hpjlim onRecvInviteJoinLiveRequest " + r), this.onRecvInviteJoinLiveRequest(e, t.from_userid, t.from_username, t.room_id)) : this.logger.error("zb.lh.hpjlim no from user")
                } else this.logger.error("zb.lh.hpjlim no requestId")
            }, t.prototype.onRecvInviteJoinLiveRequest = function (t, e, r, s) {
            }, t.prototype.handlePushJoinLiveResultMsg = function (t) {
                var e = t.request_id;
                if ("string" == typeof e) {
                    var r = t.result;
                    if (null != r) {
                        var s = 1 == r;
                        if (this.stateCenter.joinLiveCallbackMap[e]) {
                            var o = this.stateCenter.joinLiveCallbackMap[e];
                            if (!o) return void this.logger.info("hpjlrm.o no callback");
                            this.logger.info("zb.lh.hpjlrm joinLiveRequest/invite result " + s), delete this.stateCenter.joinLiveCallbackMap[e], o(s, t.from_userid, t.from_username)
                        }
                    } else this.logger.info("zb.lh.hpjlrm no result")
                } else this.logger.error("zb.lh.hpjlrm no requestId")
            }, t.prototype.handlePushJoinLiveStopMsg = function (t) {
                var e = t.request_id;
                "string" == typeof e ? (this.logger.info("zb.lh.hpjlsm onRecvEndJoinLiveCommand " + t.from_userid), this.onRecvEndJoinLiveCommand(e, t.from_userid, t.from_username, t.room_id)) : this.logger.error("zb.lh.hpjlsm no requestId")
            }, t.prototype.onRecvEndJoinLiveCommand = function (t, e, r, s) {
            }, t
        }();
        e.LiveHandler = o
    }, function (t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = r(0), o = r(19), i = function () {
            function t() {
                this.testEnvironment = !1, this.third_token = "", this.pullLimited = !0, this.configOK = !1, this.roomCreateFlag = 1, this.runState = s.ENUM_RUN_STATE.logout, this.lastRunState = s.ENUM_RUN_STATE.logout, this.callbackList = {}, this.streamList = [], this.publishStreamList = {}, this.userQuerying = !1, this.userTempList = [], this.userSeq = 0, this.anchor_info = {
                    anchor_id: "",
                    anchor_id_name: "",
                    anchor_nick_name: ""
                }, this.sendCommandMap = {}, this.sendCommandList = new s.LinkedList, this.sendDataMap = {}, this.sendDataList = new s.LinkedList, this.joinLiveCallbackMap = {}, this.joinLiveRequestMap = {}, this.streamUrlMap = {}, this.cmdCallback = {}, this.transSeqMap = {}, this.realyMessageList = [], this.relayTimer = null, this.bigImLastTimeIndex = 0, this.bigIMmessageList = [], this.bigImCallbackMap = {}, this.bigImTimer = null, this.serverTimeOffset = 0, this.datiTimeWindow = 0, this.bigimTimeWindow = 0, this.bigImMessageList = [], this.tryLoginCount = 0, this.tryLoginTimer = null, this.heartbeatTimer = null, this.sendDataCheckTimer = null, this.sendDataCheckInterval = 2e3, this.sendDataTimeout = 5e3, this.sendDataDropTimeout = 1e4, this.sendDataCheckOnceCount = 100, this.sendRoomMsgTime = 0, this.SendRoomMsgInterval = 500, this.cmdSeq = 0
            }

            return t.prototype.isLogin = function () {
                return this.runState === s.ENUM_RUN_STATE.login
            }, t.prototype.getRequestId = function () {
                return this.idName + "-" + o.getSeq()
            }, t.prototype.getSignalCmdContent = function (t, e, r) {
                var s = {
                    request_id: t,
                    room_id: this.roomid,
                    from_userid: this.idName,
                    from_username: this.nickName,
                    to_userid: e
                };
                return null != r && (s.result = r), JSON.stringify(s)
            }, t
        }();
        e.StateCenter = i
    }, function (t, e, r) {
        "use strict";
        var s;
        Object.defineProperty(e, "__esModule", {value: !0}), e.playErrorList = {
            DISPATCH_ERROR: {
                code: "ZegoPlayWeb.Error.Dispatch",
                msg: "dispatch request error"
            },
            DISPATCH_TIMEOUT: {code: "ZegoPlayWeb.Timeout.Dispatch", msg: "dispatch request timeout"},
            TOKEN_ERROR: {code: "ZegoPlayWeb.Error.Token", msg: "login token error"},
            SEND_SESSION_TIMEOUT: {code: "ZegoPlayWeb.Timeout.Session", msg: "send session request timeout"},
            CREATE_SESSION_ERROR: {code: "ZegoPlayWeb.Error.Session", msg: "create session error"},
            CREATE_OFFER_ERROR: {code: "ZegoPublish.Error.CreateOffer", msg: "create offer error"},
            SERVER_MEDIA_DESC_TIMEOUT: {
                code: "ZegoPlayWeb.Timeout.RemoteOffer",
                msg: "wating server mediaDesc timeout"
            },
            SET_REMOTE_DESC_ERROR: {code: "ZegoPlayWeb.Error.RemoteOffer", msg: "other side offer error"},
            CREATE_ANSWER_ERROR: {code: "ZegoPlayWeb.Error.CreateAnswer", msg: "create offer error"},
            SET_LOCAL_DESC_ERROR: {code: "ZegoPlayWeb.Error.LocalDesc", msg: "setLocalDescription error"},
            SEND_MEDIA_DESC_TIMEOUT: {code: "ZegoPlayWeb.Timeout.Desc", msg: "send mediaDesc timeout"},
            SEND_CANDIDATE_ERROR: {code: "ZegoPlayWeb.Error.Candidate", msg: "send candidate error"},
            SEND_CANDIDATE_TIMEOUT: {code: "ZegoPlayWeb.Timeout.Candidate", msg: "send candidate timeout"},
            SERVER_CANDIDATE_TIMEOUT: {code: "ZegoPlayWeb.Timeout.ServerCandidate", msg: "waiting candidate timeout"},
            SERVER_CANDIDATE_ERROR: {code: "ZegoPlayWeb.Error.ServerCandidate", msg: "recv candidate error"},
            MEDIA_CONNECTION_FAILED: {code: "ZegoPlayWeb.Error.ConnectionFailed", msg: "ice Connection state failed"},
            MEDIA_CONNECTION_CLOSED: {code: "ZegoPlayWeb.Error.ConnectionClosed", msg: "ice connection state closed"},
            SESSION_CLOSED: {code: "ZegoPlayWeb.Error.SessionClosed", msg: "server session closed"},
            WEBSOCKET_ERROR: {code: "ZegoPlayWeb.Error.SocketError", msg: "network error"}
        }, e.publishErrorList = {
            DISPATCH_ERROR: {code: "ZegoPublish.Error.Dispatch", msg: "dispatch request error"},
            DISPATCH_TIMEOUT: {code: "ZegoPublish.Timeout.Dispatch", msg: "dispatch request timeout"},
            TOKEN_ERROR: {code: "ZegoPublish.Error.Token", msg: "login token error"},
            SEND_SESSION_TIMEOUT: {code: "ZegoPublish.Timeout.Session", msg: "send session request timeout"},
            CREATE_SESSION_ERROR: {code: "ZegoPublish.Error.Session", msg: "create session error"},
            CREATE_OFFER_ERROR: {code: "ZegoPublish.Error.CreateOffer", msg: "create offer error"},
            SET_LOCAL_DESC_ERROR: {code: "ZegoPublish.Error.LocalDesc", msg: "setLocalDescription error"},
            SEND_MEDIA_DESC_TIMEOUT: {code: "ZegoPublish.Timeout.Desc", msg: "send mediaDesc timeout"},
            SERVER_MEDIA_DESC_TIMEOUT: {
                code: "ZegoPublish.Timeout.ServerAnswer",
                msg: "waiting server mediaDesc timeout"
            },
            SERVER_MEDIA_DESC_ERROR: {code: "ZegoPublish.Error.ServerAnswer", msg: "server mediaDesc type error"},
            SET_REMOTE_DESC_ERROR: {code: "ZegoPublish.Error.RemoteDesc", msg: "other side offer error"},
            SEND_CANDIDATE_TIMEOUT: {code: "ZegoPublish.Timeout.Candidate", msg: "sendIceCandidate error"},
            SERVER_CANDIDATE_TIMEOUT: {code: "ZegoPublish.Timeout.ServerCandidate", msg: "waiting candidate timeout"},
            SERVER_CANDIDATE_ERROR: {code: "ZegoPublish.Error.ServerCandidate", msg: "recv candidate error"},
            SESSION_CLOSED: {code: "ZegoPublish.Error.SessionClosed", msg: "server session closed"},
            MEDIA_CONNECTION_FAILED: {code: "ZegoPublish.Error.IConnectionFailed", msg: "Iice Connection state failed"},
            MEDIA_CONNECTION_CLOSED: {code: "ZegoPublish.Error.ConnectionClosed", msg: "ice connection state closed"},
            WEBSOCKET_ERROR: {code: "ZegoPublish.Error.SocketError", msg: "network error"}
        }, e.ENUM_PUBLISH_STATE_UPDATE = {start: 0, error: 1, retry: 2}, e.ENUM_PLAY_STATE_UPDATE = {
            start: 0,
            error: 1,
            retry: 2,
            stop: 3
        }, e.ENUM_RETRY_STATE = {didNotStart: 0, retrying: 1, finished: 2}, e.getSeq = (s = 1, function () {
            return s++
        })
    }])
});