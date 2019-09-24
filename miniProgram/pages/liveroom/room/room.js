let { ZegoClient } = require("../../../js/jZego-wx-1.2.0.js");
// let { ZegoClient } = require("miniprogram-zego");
let { format, sharePage } = require("../../../utils/util.js");
let { getLoginToken } = require("../../../utils/server.js");
let zg;
//获取应用实例
const app = getApp();
let { liveAppID: appID, wsServerURL, logServerURL, tokenURL, testEnvironment } = app.globalData;


/**
 * 页面的初始数据
 */
Page({
    data: {
        loginType: '',          // 登录类型。anchor：主播；audience：观众
        roomID: "",             // 房间 ID
        roomName: "",            // 房间名
        userID: "",             // 当前初始化的用户 ID
        userName: "",           // 当前初始化的用户名
        appID: "",              // appID，用于初始化 sdk
        anchorID: "",           // 主播 ID
        anchorName: "",         // 主播名
        anchorStreamID: "",     // 主播推流的流 ID
        publishStreamID: "",    // 推流 ID
        pusherVideoContext: {}, // live-pusher Context，内部只有一个对象
        playStreamList: [],     // 拉流流信息列表，列表中每个对象结构为 {anchorID:'xxx', streamID:'xxx', playContext:{}, playUrl:'xxx', playingState:'xxx'}
        beginToPublish: false,  // 准备连麦标志位
        reachStreamLimit: false,// 房间内达到流上限标志位
        isPublishing: false,    // 是否正在推流
        pushConfig: {           // 推流配置项
            mode: 'RTC',
            aspect: '3:4',        // 画面比例，取值为 3:4, 或者 9:16
            isBeauty: 6,          // 美颜程度，取值范围 [0,9]
            isMute: false,        // 推流是否静音
            showLog: false,       // 是否显示 log
            frontCamera: true,    // 前后置摄像头，false 表示后置
            minBitrate: 200,      // 最小视频编码码率
            maxBitrate: 500,      // 最大视频编码码率
            isMirror: false,      // 画面是否镜像
            bgmStart: false,      // 是否
            bgmPaused: false, 
        },
        playConfig: {
            mode: 'RTC',
        },
        preferPublishSourceType: 1, // 0：推流到 cdn；1：推流到 bgp
        preferPlaySourceType: 1,    // 0：auto；1：从 bgp 拉流
        upperStreamLimit: 4,        // 房间内限制为最多 4 条流，当流数大于 4 条时，禁止新进入的用户连麦
        connectType: -1,  // -1为初始状态，1为连接，0断开连接
        tapTime: "",
        pushUrl: "",
        containerAdapt: "",
        containerBaseAdapt: "containerBase-big-calc-by-height",
        messageAdapt: "message-hide",
        requestJoinLiveList: [],    // 请求连麦的成员列表
        messageList: [],     // 消息列表，列表中每个对象结构为 {name:'xxx', time:xxx, content:'xxx'}
        isCommentShow: false,
        inputMessage: "",
        isMessageHide: true,
        scrollToView: "",
        imgTempPath: "",
        tryPlayCount: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad({roomID, roomName, loginType}) {
        console.log('>>>[liveroom-room] onLoad, options are: ', roomID);
        roomName = roomName?roomName:'';
        this.setData({
            roomID,
            roomName,
            loginType,
            preferPlaySourceType: 0,
        });


        // 保持屏幕常亮
        wx.setKeepScreenOn({
            keepScreenOn: true,
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('>>>[liveroom-room] onReady');


        let timestamp = new Date().getTime();
        this.setData({
            userID: 'xcxU' + timestamp,
            userName: 'xcxU' + timestamp,
            appID,
            publishStreamID: 'xcxS' + timestamp,
        });

        zg = new ZegoClient();
        zg.config({
            appid: this.data.appID,        // 必填，应用id，由即构提供
            idName: this.data.userID,      // 必填，用户自定义id，全局唯一
            nickName: this.data.userName,  // 必填，用户自定义昵称
            remoteLogLevel: 2,             // 日志上传级别，建议取值不小于 logLevel
            logLevel: 0,                   // 日志级别，debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100（数字越大，日志越少）
            server: wsServerURL,        // 必填，服务器地址，由即构提供
            logUrl: logServerURL,   // 必填，log 服务器地址，由即构提供
            audienceCreateRoom: true,     // false观众不允许创建房间
            testEnvironment:!!testEnvironment
        });
        this.bindCallBack();  //监听zego-sdk回调

        console.log('>>>[liveroom-room] publishStreamID is: ' + this.data.publishStreamID);

        // 进入房间，自动登录
        getLoginToken(this.data.userID, appID).then(token => {
            this.setData({token});
            zg.setUserStateUpdate(true);
            this.loginRoom(token, self);
        });

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
        let obj = sharePage({
            roomID: this.data.roomID,
            loginType: 'audience'
        });
        console.log('onShareAppMessage',obj);
        return obj;
    },

    bindCallBack() {

      let self = this;

      // startPlayStream、startPublishStream 后，服务端主动推过来的流更新事件
      // type: {play: 0, publish: 1};
      zg.onStreamUrlUpdate = function (streamid, url, type, reason) {
        console.log(">>>[liveroom-room] zg onStreamUrlUpdate, streamId: " + streamid + ', type: ' + (type === 0 ? 'play' : 'publish') + ', url: ' + url);

        if (type === 1) {
          self.setPushUrl(url);
        } else {
          self.setPlayUrl(streamid, url);
        }
      };

      // 服务端主动推过来的 连接断开事件
      zg.onDisconnect = function (err) {
        console.log(">>>[liveroom-room] zg onDisconnect");
        self.setData({
          connectType: 0
        })
      };

      // 服务端主动推过来的 用户被踢掉在线状态事件
      zg.onKickOut = function (err) {
        console.log(">>>[liveroom-room] zg onKickOut");
      };

      // 接收服务端主推送的自定义信令
      zg.onRecvCustomCommand = function (from_userid, from_idName, custom_content) {
        console.log(">>>[liveroom-room] zg onRecvCustomCommand" + "from_userid: " + from_userid + "from_idName: " + from_idName + "content: ");
        console.log(custom_content);
      };

      // 服务端主动推过来的 流的创建/删除事件；updatedType: { added: 0, deleted: 1 }；streamList：增量流列表
      zg.onStreamUpdated = function (updatedType, streamList) {
        console.log(">>>[liveroom-room] zg onStreamUpdated, updatedType: " + (updatedType === 0 ? 'added' : 'deleted') + ', streamList: ');
        console.log(streamList);

        if (updatedType === 1) {
          // 流删除通知触发事件：有推流成员正常退出房间；有推流成员停止推流；90s 超时。播放失败不会导致流删除
          self.stopPlayingStreamList(streamList);
        } else {
          // 有成员正常推流成功，流增加
          self.startPlayingStreamList(streamList);
        }
      };

      // 服务端主动推过来的 流信息中的 ExtraInfo更新事件（暂时不用实现）
      zg.onStreamExtraInfoUpdated = function (streamList) {
        console.log(">>>[liveroom-room] zg onStreamExtraInfoUpdated IU");
      };

      // 服务端主动推过来的 流的播放状态, 视频播放状态通知
      // type: { start:0, stop:1};
      zg.onPlayStateUpdate = function (updatedType, streamID) {
        console.log(">>>[liveroom-room] zg onPlayStateUpdate, " + (updatedType === 0 ? 'start ' : 'stop ') + streamID);

        if (updatedType === 1) {
          // 流播放失败, 停止拉流
          for (let i = 0; i < self.data.playStreamList.length; i++) {
            if (self.data.playStreamList[i]['streamID'] === streamID) {
              self.data.playStreamList[i]['playContext'] && self.data.playStreamList[i]['playContext'].stop();
              self.data.playStreamList[i]['playingState'] = 'failed';
              break;
            }
          }
        } else if (updatedType === 0) {
          // 流播放成功, 更新状态
          for (let i = 0; i < self.data.playStreamList.length; i++) {
            if (self.data.playStreamList[i]['streamID'] === streamID) {
              self.data.playStreamList[i]['playingState'] = 'succeeded';
            }
          }
        }

        self.setData({
          playStreamList: self.data.playStreamList,
        });
      };

      // 接收房间IM消息
      zg.onRecvRoomMsg = function (chat_data, server_msg_id, ret_msg_id) {
        console.log(">>>[liveroom-room] zg onRecvRoomMsg, data: ", chat_data);

        // 收到其他成员的回到前台通知
        let content = chat_data[0].msg_content;
        let category = chat_data[0].msg_category;

        if (category === 2) {
          // 系统消息
          let data = content.split(".");
          let streamID = data[1];
          if (data[0] === "onShow") {
            for (let i = 0; i < self.data.playStreamList.length; i++) {
              if (self.data.playStreamList[i]["streamID"] === streamID && self.data.playStreamList[i]["playingState"] !== 'succeeded') {
                self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].stop();
                self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].play();
              }
            }
          }
        } else {
          // 评论消息
          let name = chat_data[0].id_name;
          let time = chat_data[0].send_time;

          let message = {};
          message.name = name;
          message.time = format(time);
          message.content = content;
          message.id = name + time;

          self.data.messageList.push(message);

          self.setData({
            messageList: self.data.messageList,
            scrollToView: message.id,
          });
        }

      };

      // 服务端主动推过来的 流的质量更新
      zg.onPublishQualityUpdate = function (streamID, streamQuality) {
        console.log(">>>[liveroom-room] zg onPublishQualityUpdate", streamQuality);
      };
      // 服务端主动推过来的 流的质量更新
      zg.onPlayQualityUpdate = function (streamID, streamQuality) {
        console.log(">>>[liveroom-room] zg onPlayQualityUpdate", streamQuality);
      };

      // 推流后，服务器主动推过来的，流状态更新
      // type: { start: 0, stop: 1 }，主动停止推流没有回调，其他情况均回调
      zg.onPublishStateUpdate = function (type, streamid, error) {
        console.log('>>>[liveroom-room] zg onPublishStateUpdate, streamid: ' + streamid + ', type: ' + (type === 0 ? 'start' : 'stop') + ', error: ' + error);


        self.setData({
          isPublishing: type === 0 ? true : false,
          beginToPublish: false,
        });
        // 推流失败
        if (type == 1) {
          wx.showModal({
            title: '提示',
            content: '推流断开，请退出房间后重试',
            showCancel: false,
            success(res) {
              // 用户点击确定，或点击安卓蒙层关闭
              if (res.confirm || !res.cancel) {
                // 强制用户退出
                wx.navigateBack();
                zg.logout();
              }
            }
          });
        }
      };

      // 登录成功后，服务器主动推过来的，主播信息
      zg.onGetAnchorInfo = function (anchorId, anchorName) {
        console.log('>>>[liveroom-room] onGetAnchorInfo, anchorId: ' + anchorId + ', anchorName: ' + anchorName);

        self.setData({
          anchorID: anchorId,
          anchorName: anchorName,
        });
      };

      // 收到连麦请求
      zg.onRecvJoinLiveRequest = function (requestId, fromUserId, fromUsername, roomId) {
        console.log('>>>[liveroom-room] onRecvJoinLiveRequest, roomId: ' + roomId + 'requestUserId: ' + fromUserId + ', requestUsername: ' + fromUsername);

        self.data.requestJoinLiveList.push(requestId);

        let content = '观众 ' + fromUsername + ' 请求连麦，是否允许？';
        wx.showModal({
          title: '提示',
          content: content,
          success(res) {
            if (res.confirm) {
              console.log('>>>[liveroom-room] onRecvJoinLiveRequest accept join live');
              // self.switchPusherOrPlayerMode('pusher', 'RTC');

              // 已达房间上限，主播依然同意未处理的连麦，强制不处理
              if (self.data.reachStreamLimit) {
                wx.showToast({
                  title: '房间内连麦人数已达上限，不建立新的连麦',
                  icon: 'none',
                  duration: 2000
                });
                zg.respondJoinLive(requestId, false); // true：同意；false：拒绝
              } else {
                zg.respondJoinLive(requestId, true); // true：同意；false：拒绝
              }


              self.handleMultiJoinLive(self.data.requestJoinLiveList, requestId, self);
            } else {
              console.log('>>>[liveroom-room] onRecvJoinLiveRequest refuse join live');
              zg.respondJoinLive(requestId, false); // true：同意；false：拒绝

              self.handleMultiJoinLive(self.data.requestJoinLiveList, requestId, self);
            }
          }
        });
      };

      // 收到停止连麦请求
      zg.onRecvEndJoinLiveCommand = function (requestId, fromUserId, fromUsername, roomId) {
        console.log('>>>[liveroom-room] onRecvEndJoinLiveCommand, roomId: ' + roomId + 'requestUserId: ' + fromUserId + ', requestUsername: ' + fromUsername);
      };

      zg.onUserStateUpdate = function (roomId, userList) {
        console.log('>>>[liveroom-room] onUserStateUpdate, roomID: ' + roomId + ', userList: ');
        console.log(userList);

        //for (let i = 0; i < userList.length; i++) {
        if (userList.length === 1 && userList[0].role === 1 && userList[0].action === 2) {
          // 主播退出房间
          wx.showModal({
            title: '提示',
            content: '主播已离开，请前往其他房间观看',
            showCancel: false,
            success(res) {
              // 用户点击确定，或点击安卓蒙层关闭
              if (res.confirm || !res.cancel) {
                // 强制用户退出
                wx.navigateBack();
                zg.logout();
              }
            }
          });
          //break;
        }
        //}
      };

      //
      zg.onUpdateOnlineCount = function (roomId, userCount) {
        console.log('>>>[liveroom-room] onUpdateOnlineCount, roomId: ' + roomId + ', userCount: ' + userCount);
      };
    },

    setPlayUrl(streamid, url) {
      console.log('>>>[liveroom-room] setPlayUrl: ', url);
      let self = this;
      if (!url) {
        console.log('>>>[liveroom-room] setPlayUrl, url is null');
        return;
      }

      for (let i = 0; i < self.data.playStreamList.length; i++) {
        if (self.data.playStreamList[i]['streamID'] === streamid && self.data.playStreamList[i]['playUrl'] === url) {
          console.log('>>>[liveroom-room] setPlayUrl, streamid and url are repeated');
          return;
        }
      }

      let streamInfo = {};
      let isStreamRepeated = false;

      // 相同 streamid 的源已存在，更新 Url
      for (let i = 0; i < self.data.playStreamList.length; i++) {
        if (self.data.playStreamList[i]['streamID'] === streamid) {
          isStreamRepeated = true;
          self.data.playStreamList[i]['playUrl'] = url;
          self.data.playStreamList[i]['playingState'] = 'initial';
          break;
        }
      }

      // 相同 streamid 的源不存在，创建新 player
      if (!isStreamRepeated) {
        streamInfo['streamID'] = streamid;
        streamInfo['playUrl'] = url;
        streamInfo['playContext'] = wx.createLivePlayerContext(streamid, self);
        streamInfo['playingState'] = 'initial';
        self.data.playStreamList.push(streamInfo);
      }

      self.setData({
        playStreamList: self.data.playStreamList,
      }, function () {
        // 检查流新增后，是否已经达到房间流上限
        if (self.data.playStreamList.length >= self.data.upperStreamLimit) {

          self.setData({
            reachStreamLimit: true,
          }, function () {
            wx.showToast({
              title: "房间内连麦人数已达上限，不允许新的连麦",
              icon: 'none',
              duration: 2000
            });
          });


        }

        //播放地址更新，需要重新停止再次播放
        if (isStreamRepeated) {
          self.data.playStreamList.forEach(streamInfo => {
            if (streamInfo.streamID == streamid) {
              streamInfo.playContext.stop();
              streamInfo.playingState = 'initial';
              streamInfo.playContext.play();
            }
          })
        }
      });

    },

    setPushUrl(url) {
      console.log('>>>[liveroom-room] setPushUrl: ', url);
      let self = this;

      if (!url) {
        console.log('>>>[liveroom-room] setPushUrl, url is null');
        return;
      }

      self.setData({
        pushUrl: url,
        pusherVideoContext: wx.createLivePusherContext("video-livePusher", self),
      }, function () {
          self.data.pusherVideoContext.stop();
          self.data.pusherVideoContext.start();

          // self.animation.rotate(720).step();
          // self.setData({animation: this.animation.export()});
      });
    },

    // 登录房间
    loginRoom(token) {
      let self = this;
      console.log('>>>[liveroom-room] login room, roomID: ' + self.data.roomID, ', userID: ' + self.data.userID + ', userName: ' + self.data.userName);

      zg.login(self.data.roomID, self.data.loginType === "anchor" ? 1 : 2, token, function (streamList) {
        console.log('>>>[liveroom-room] login success, streamList is: ');
        console.log(streamList);

        self.setData({
          connectType: 1 
        });
        // 房间内已经有流，拉流
        self.startPlayingStreamList(streamList);

        // 主播登录成功即推流
        if (self.data.loginType === 'anchor') {
          console.log('>>>[liveroom-room] anchor startPublishingStream, publishStreamID: ' + self.data.publishStreamID);
          zg.setPreferPublishSourceType(self.data.preferPublishSourceType);
          zg.startPublishingStream(self.data.publishStreamID, '');
        } else {
          if (streamList.length === 0) {
            let title = '主播已经退出！';
            wx.showModal({
              title: '提示',
              content: title,
              showCancel: false,
              success(res) {
                if (res.confirm || !res.cancel) {
                  wx.navigateBack();
                }
              }
            });
          }
        }

      }, function (err) {
        console.log('>>>[liveroom-room] login failed, error is: ', err);
        if (err) {
          let title = '登录房间失败，请稍后重试。\n失败信息：' + err.msg;
          wx.showModal({
            title: '提示',
            content: title,
            showCancel: false,
            success(res) {
              if (res.confirm || !res.cancel) {
                wx.navigateBack();
              }
            }
          });
        }
      });
    },

    startPlayingStreamList(streamList) {
      let self = this;

      if (streamList.length === 0) {
        console.log('>>>[liveroom-room] startPlayingStream, streamList is null');
        return;
      }


      zg.setPreferPlaySourceType(self.data.preferPlaySourceType);

      console.log('>>>[liveroom-room] startPlayingStream, preferPlaySourceType: ', self.data.preferPlaySourceType);

      // 获取每个 streamID 对应的拉流 url
      for (let i = 0; i < streamList.length; i++) {
        let streamID = streamList[i].stream_id;
        let anchorID = streamList[i].anchor_id_name;  // 推这条流的用户id
        console.log('>>>[liveroom-room] startPlayingStream, playStreamID: ' + streamID + ', pushed by : ' + anchorID);
        zg.startPlayingStream(streamID);
      }
    },

    stopPlayingStreamList(streamList) {
      let self = this;

      if (streamList.length === 0) {
        console.log('>>>[liveroom-room] stopPlayingStream, streamList is empty');
        return;
      }

      let playStreamList = self.data.playStreamList;
      for (let i = 0; i < streamList.length; i++) {
        let streamID = streamList[i].stream_id;

        console.log('>>>[liveroom-room] stopPlayingStream, playStreamID: ' + streamID);
        zg.stopPlayingStream(streamID);

        // 删除播放流列表中，删除的流
        for (let j = 0; j < playStreamList.length; j++) {
          if (playStreamList[j]['streamID'] === streamID) {
            console.log('>>>[liveroom-room] stopPlayingStream, stream to be deleted: ');
            console.log(playStreamList[j]);

            playStreamList[j]['playContext'] && playStreamList[j]['playContext'].stop();

            let content = '一位观众结束连麦，停止拉流';
            wx.showToast({
              title: content,
              icon: 'none',
              duration: 2000
            });

            playStreamList.splice(j, 1);
            break;
          }
        }
      }

      self.setData({
        playStreamList: playStreamList,
      }, function () {
        // 检查流删除后，是否低于房间流上限
        if (self.data.playStreamList.length === self.data.upperStreamLimit - 1) {
          self.setData({
            reachStreamLimit: false,
          }, function () {
            if (self.data.loginType === "audience") {
              wx.showToast({
                title: "一位观众结束连麦，允许新的连麦",
                icon: 'none',
                duration: 2000
              });
            }
          });
        }

        // 主播结束了所有的连麦，切换回 live 模式   （可选）
        if (self.data.loginType === 'anchor' && self.data.playStreamList.length === 0) {
          // self.switchPusherOrPlayerMode('pusher', 'live');
        }


      });
    },

    //live-player 绑定拉流事件
    onPlayStateChange(e) {
      console.log('>>>[liveroom-room] onPlayStateChange, code: ' + e.detail.code + ', message:' + e.detail.message);
      

      if (e.detail.code === 2002 || e.detail.code === 2004) {
        // 透传拉流事件给 SDK，type 0 拉流
      zg.updatePlayerState(e.currentTarget.id, e, 0);
        this.updatePlayingStateOnly(e, 'succeeded');
      } else if (e.detail.code === -2301) {
        //  this.updatePlayingStateOnly(e, 'failed');
        // if(this.data.playStreamList[0]&&this.data.playStreamList[0]['playContext']){
        //   this.data.playStreamList[0]['playContext'].stop();
        //   this.data.playStreamList[0]['playContext'].play();
        // }
        // this.data.tryPlayCount++;
        // if (this.data.tryPlayCount < 3) {
          
        // }
        this.data.playStreamList.forEach(item => {
          if (item['playContext']) {
            item['playContext'].stop();
            item['playContext'].play();
          }
        })
        
      } else {
        // 透传拉流事件给 SDK，type 0 拉流
        zg.updatePlayerState(e.currentTarget.id, e, 0);
      }
    },

    // 主播异常操作，导致拉流端 play 失败，此时不会影响 SDK 内部拉流状态，但需要额外处理 live-player 状态
    updatePlayingStateOnly(e, newState) {
      for (let index in this.data.playStreamList) {
          let playStream = this.data.playStreamList[index];
          if (playStream.streamID === e.currentTarget.id && playStream.playingState !== newState) {
              playStream.playingState = newState;
              this.setData({
                  playStreamList: this.data.playStreamList,
              })
              break;
          }
      }
    },
    // live-pusher 绑定推流事件
    onPushStateChange(e) {
        console.log('>>>[liveroom-room] onPushStateChange, code: ' + e.detail.code + ', message:' + e.detail.message);
        // 透传推流事件给 SDK，type 1 推流
        zg.updatePlayerState(this.data.publishStreamID, e, 1);
    },

    // live-player 绑定网络状态事件
    onPlayNetStateChange(e) {
        //透传网络状态事件给 SDK，type 0 拉流
        zg.updatePlayerNetStatus(e.currentTarget.id, e, 0);
    },

    // live-pusher 绑定网络状态事件
    onPushNetStateChange(e) {
        //透传网络状态事件给 SDK，type 1 推流
        console.log('quality', e);
        zg.updatePlayerNetStatus(this.data.publishStreamID, e, 1);
    },

    // 主播邀请连麦
    inviteJoinLive() {
        console.log('>>>[liveroom-room] inviteJoinLive');

        zg.inviteJoinLive('', function (res) {
            console.log('>>>[liveroom-room] inviteJoinLive sent succeeded');
        }, function (error) {
            console.log('>>>[liveroom-room] inviteJoinLive sent failed, error: ', error);
        }, function (result, userID, userName) {
            console.log('>>>[liveroom-room] inviteJoinLive, result: ' + result);
        });
    },

    // 观众请求连麦，或主播邀请连麦
    requestJoinLive() {
        let self = this;


        if (this.data.loginType === 'anchor') return;
        // 防止两次点击操作间隔太快
        let nowTime = new Date();
        if (nowTime - self.data.tapTime < 1000) {
            return;
        }
        self.setData({'tapTime': nowTime});

        // 正在发起连麦中，不处理
        if (self.data.beginToPublish === true) {
            console.log('>>>[liveroom-room] begin to publishing, ignore');
            return;
        }

        // 房间流已达上限，不处理
        if (self.data.reachStreamLimit === true) {
            console.log('>>>[liveroom-room] reach stream limit, ignore');
            return;
        }


        // 观众正在连麦时点击，则结束连麦
        if (self.data.isPublishing) {
            zg.endJoinLive(self.data.anchorID, function (result, userID, userName) {
                console.log('>>>[liveroom-room] endJoinLive, result: ' + result);
            }, null);

            // 停止推流
            zg.stopPublishingStream(self.data.publishStreamID);
            self.data.pusherVideoContext.stop();


            self.setData({
                isPublishing: false,
                pushUrl: "",
            }, function () {
                // 自己停止推流，不会收到流删减消息，所以此处需要主动调整视图大小
            });


            // setTimeout(() => {
            //     // 回前台重新拉流
            //     for (let i = 0; i < this.data.playStreamList.length; i++) {
            //         zg.startPlayingStream(this.data.playStreamList[i]['streamID']);
            //         this.data.playStreamList[i]['playContext'] && this.data.playStreamList[i]['playContext'].play();
            //     }
            // }, 500);
            return;
        }

        // 观众未连麦，点击开始推流
        console.log('>>>[liveroom-room] audience requestJoinLive');
        self.setData({
            beginToPublish: true,
        });

        zg.requestJoinLive(self.data.anchorID, function (res) {
            console.log('>>>[liveroom-room] requestJoinLive sent succeeded');
        }, function (error) {
            console.log('>>>[liveroom-room] requestJoinLive sent failed, error: ', error);
        }, function (result, userID, userName) {
            console.log('>>>[liveroom-room] requestJoinLive, result: ' + result);

            // 待补充，校验 userID
            if (result === false) {
                wx.showToast({
                    title: '主播拒绝连麦',
                    icon: 'none',
                    duration: 2000
                });

                self.setData({
                    beginToPublish: false,
                })
            } else {
                // 主播同意了连麦，但此时已经达到了房间流上限，不再进行连麦
                if (self.data.reachStreamLimit) {
                    self.setData({
                        beginToPublish: false,
                    });
                    return;
                }

                wx.showToast({
                    title: '主播同意连麦，准备推流',
                    icon: 'none',
                    duration: 2000
                });

                // 主播同意连麦后，观众开始推流
                console.log('>>>[liveroom-room] startPublishingStream, userID: ' + userID + ', publishStreamID: ' + self.data.publishStreamID);
                zg.setPreferPublishSourceType(self.data.preferPublishSourceType);
                zg.startPublishingStream(self.data.publishStreamID, '');


            }
        });
    },


    handleMultiJoinLive(requestJoinLiveList, requestId, self) {
        for (let i = 0; i < requestJoinLiveList.length; i++) {
            if (requestJoinLiveList[i] != requestId) {
                // 新的连麦弹框会覆盖旧的弹框，拒绝被覆盖的连麦请求
                zg.respondJoinLive(requestJoinLiveList[i], false);
            }
        }
    },
    // 推流画面配置
    switchCamera() {
      this.data.pushConfig.frontCamera = !this.data.pushConfig.frontCamera;
      this.setData({
        pushConfig: this.data.pushConfig,
      });
      this.data.pusherVideoContext && this.data.pusherVideoContext.switchCamera();
    },

    // 截图发送
    snapshot() {
        var that = this
        console.log('>>>[liveroom-room] snapshot ', this.data.loginType)
        const sucCallback = (ret) => {
            console.log('>>>[liveroom-room] snapshot success')
            console.log('ret', ret.tempImagePath);
            wx.showLoading({
                title: '正在上传...',
            })
            const imgPath = 'sdk-doc/mini-snapshot-' + new Date().getTime() + '.jpg'
            // 上传图片
            wx.uploadFile({
                //  服务器上传图片接口地址
                url: 'https://***', 
                filePath: ret.tempImagePath,
                name: 'file',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                formData: {
                  'path':  imgPath,
                  'space': 'DemoSpace'
                },
                success (res){
                  console.log('res', res)
                  const data = JSON.parse(res.data)
                  if (data.code == 200) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '发送成功',
                        duration: 1000,
                        mask: true
                    })
                    // 服务器存储图片地址
                    const msg = 'https://***' + imgPath
                    // 发送图片URL
                    zg.sendRoomMsg(2, 2, msg,
                        function (seq, msgId, msg_category, msg_type, msg_content) {
                            console.log('>>>[liveroom-room] onComment success');
                        }, function (err, seq, msg_category, msg_type, msg_content) {
                            console.log('>>>[liveroom-room] onComment, error: ');
                            console.log(err);
                        });
                  } else {
                      wx.showToast({
                          title: '发送失败',
                          duration: 1000,
                          mask: true
                      })
                  }
                },
                fail (err) {
                    console.log(err)
                    wx.hideLoading()
                    wx.showToast({
                        title: '发送失败',
                        duration: 1000,
                        mask: true
                    })
                }
            })
            setTimeout(() => {
                wx.showModal({
                    title: '提示',
                    content: '是否保存到手机相册',
                    success(resInfo) {
                        if (resInfo.confirm) {
                            console.log('saveImageToPhotosAlbum confirm')
                            that._saveImageToPhotosAlbum(ret.tempImagePath)
                        } else if (resInfo.cancel) {
                            console.log('saveImageToPhotosAlbum cancel')
                        }
                    }
                })
            }, 3000)   
        }
        const failCallback = (err) => {
            console.log('>>>[liveroom-room] snapshot fail', err)
        }
        if (this.data.loginType === 'anchor') {
            this.data.pusherVideoContext && this.data.pusherVideoContext.snapshot({
                success: sucCallback,
                fail: failCallback,
            });
        } else if (this.data.loginType === 'audience') {
            console.log('playStreamList', this.data.playStreamList)
            if (this.data.playStreamList[0].playContext.snapshot) {
                this.data.playStreamList.forEach(streamInfo => {
                    streamInfo.playContext && streamInfo.playContext.snapshot({
                        success: sucCallback,
                        fail: failCallback
                    })
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                    showCancel: false,
                });
            }
            
        }
        
    },
    _saveImageToPhotosAlbum(imgPath) {
        // 保存图片到本地相册
        wx.getSetting({
            success(res) {
                console.log('setting', res)
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope:'scope.writePhotosAlbum',
                        success() {
                            console.log('授权成功')
                            wx.saveImageToPhotosAlbum({
                                filePath: imgPath,
                                success(result) {
                                    console.log('writePhotosAlbum', result)
                                },
                                fail(error) {
                                    console.log('writePhotosAlbum', error)
                                }
                            })
                        }
                    })
                } else if (res.authSetting['scope.writePhotosAlbum']) {
                    wx.saveImageToPhotosAlbum({
                        filePath: imgPath,
                        success(result) {
                            console.log('writePhotosAlbum', result)
                        },
                        fail(error) {
                            console.log('writePhotosAlbum', error)
                        }
                    })
                }
            }
        })
    },

    // 设置镜像
    setMirror() {
        this.setData({
            "pushConfig.isMirror": !this.data.pushConfig.isMirror
        })
    },

    setBeauty() {
        this.data.pushConfig.isBeauty = (this.data.pushConfig.isBeauty === 0 ? 6 : 0);
        this.setData({
            pushConfig: this.data.pushConfig,
        });
    },

    enableMute() {
        this.data.pushConfig.isMute = !this.data.pushConfig.isMute;
        this.setData({
            pushConfig: this.data.pushConfig,
        });
    },

    showLog() {
        this.data.pushConfig.showLog = !this.data.pushConfig.showLog;
        this.setData({
            pushConfig: this.data.pushConfig,
        });
    },

    playOrStopBgm() {
      if (!this.data.pusherVideoContext.playBGM) {
          wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
              showCancel: false,
          });
          return
      }
      this.data.pushConfig.bgmStart = !this.data.pushConfig.bgmStart;
      this.setData({
          pushConfig: this.data.pushConfig,
      }, function() {
          if (this.data.pushConfig.bgmStart) {
            this.data.pusherVideoContext && this.data.pusherVideoContext.playBGM({
                url: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
                success: function (res) {
                    console.log('suc', res)
                },
                fail: function (err) {
                    console.log('fail', err)
                }
            }) 
          } else {
            this.data.pusherVideoContext && this.data.pusherVideoContext.stopBGM();
          }
      }); 
    },
    
    handleBgm() {
      if (!this.data.pusherVideoContext.pauseBGM) {
          wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
              showCancel: false,
          });
          return
      }
      if (!this.data.pushConfig.bgmStart) {
          return
      }
      this.data.pushConfig.bgmPaused = !this.data.pushConfig.bgmPaused
      this.setData({
          pushConfig: this.data.pushConfig
      }, function() {
          if (this.data.pushConfig.bgmPaused) {
              this.data.pusherVideoContext && this.data.pusherVideoContext.pauseBGM()            
          } else{
              this.data.pusherVideoContext && this.data.pusherVideoContext.resumeBGM()
          }
      })   
    },

    setBgmVolume() {
      console.log('>>>[liveroom-room] setBgmVolume, ');

    },
    
    onBgmStart(e) {
      console.log('>>>[liveroom-room] onBgmStart, code: ' + e.detail.code + ', message:' + e.detail.message);
    
    },
    onBgmProgress(e) {
      console.log('>>>[liveroom-room] onBgmProgress, code: ' + e.detail.code + ', message:' + e.detail.message);

    },
    onBgmComplete(e) {
      console.log('>>>[liveroom-room] onBgmComplete, code: ' + e.detail.code + ', message:' + e.detail.message);
    
    },

    bindMessageInput: function (e) {
        this.data.inputMessage = e.detail.value;
    },
    onComment() {
        console.log('>>>[liveroom-room] begin to comment', this.data.inputMessage);

        let message = {
            id: this.data.userID + Date.parse(new Date()),
            name: this.data.userID,
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

        zg.sendRoomMsg(1, 1, message.content,
            function (seq, msgId, msg_category, msg_type, msg_content) {
                console.log('>>>[liveroom-room] onComment success');
            }, function (err, seq, msg_category, msg_type, msg_content) {
                console.log('>>>[liveroom-room] onComment, error: ');
                console.log(err);
            });
    },


    showMessage() {
      console.log('>>>[liveroom-room] onShowMessage');

      this.setData({
        isMessageHide: !this.data.isMessageHide
      });

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {    
      console.log('>>>[liveroom-room] onShow');
    
      if (zg && this.data.connectType === 0) {
          zg.setUserStateUpdate(true);
          this.loginRoom(this.data.token);
      } 

      //刷新全局变量
      appID = getApp().globalData.liveAppID;
      wsServerURL = getApp().globalData.wsServerURL;
      logServerURL = getApp().globalData.logServerURL;
      tokenURL = getApp().globalData.tokenURL;
      testEnvironment = getApp().globalData.testEnvironment;
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      console.log('>>>[liveroom-room] onHide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
      console.log('>>>[liveroom-room] onUnload');
      
      // 停止拉流
      let streamList = this.data.playStreamList;
      for (let i = 0; i < streamList.length; i++) {
        let streamID = streamList[i]['streamID'];
        console.log('>>>[liveroom-room] onUnload stop play stream, streamid: ' + streamID);
        zg.stopPlayingStream(streamID);

        streamList[i]['playContext'] && streamList[i]['playContext'].stop();
      }

      this.setData({
        playStreamList: [],
      });

      // 停止推流
      if (this.data.isPublishing) {
        console.log('>>>[liveroom-room] stop publish stream, streamid: ' + this.data.publishStreamID);
        zg.stopPublishingStream(this.data.publishStreamID);
        this.setData({
          publishStreamID: "",
          isPublishing: false,
          pushUrl: "",
        });

        this.data.pusherVideoContext.stop();
      }

      // 停止连麦

      // 退出登录
      zg.logout();
    },
 
    error(e) {
      console.error('live-player error:', e.detail.errMsg)
    },


})
