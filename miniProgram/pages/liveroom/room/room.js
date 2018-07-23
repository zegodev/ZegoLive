  
var ZegoSDK = require("../../../js/jZego-wx-1.0.3.js");
var zg;

//获取应用实例
const app = getApp();
var wxPlayer;

Date.prototype.format = function(fmt) { 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt; 
}

function add0(m) {return m < 10 ? '0' + m : m}
function format(timestamp)
{
  // timestamp 是整数，否则要 parseInt 转换
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  return add0(h)+':'+add0(mm)+':'+add0(s);
}

var windowHeight;
var windowWidth;

/**
 * 页面的初始数据
 */
Page({
  data: {
    loginType: '',          // 登录类型。anchor：主播；audience：观众
    roomID: "",             // 房间 ID
    roomName:"",            // 房间名
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
      mode:'RTC',
      aspect: '3:4',        // 画面比例，取值为 3:4, 或者 9:16
      isBeauty: 6,          // 美颜程度，取值范围 [0,9]
      isMute: false,        // 推流是否静音
      showLog: false,       // 是否显示 log
      frontCamera: true,    // 前后置摄像头，false 表示后置
      minBitrate: 200,      // 最小视频编码码率
      maxBitrate: 500,      // 最大视频编码码率
    },
    playConfig: {
      mode:'RTC',
    },
    preferPublishSourceType: 1, // 0：推流到 cdn；1：推流到 bgp
    preferPlaySourceType: 1,    // 0：auto；1：从 bgp 拉流
    upperStreamLimit: 4,        // 房间内限制为最多 4 条流，当流数大于 4 条时，禁止新进入的用户连麦
    tapTime:"",
    pushUrl:"",
    containerAdapt: "",
    containerBaseAdapt: "containerBase-big-calc-by-height",
    messageAdapt:"message-hide",
    requestJoinLiveList: [],    // 请求连麦的成员列表
    messageList:[],             // 消息列表，列表中每个对象结构为 {name:'xxx', time:xxx, content:'xxx'}
    tmpMessageList:[],
    currentMessage:{},
    isCommentShow: false,
    inputMessage:"",
    isMessageHide: true,
    scrollToView: "",
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log('>>>[liveroom-room] onLoad, options are: ');
    console.log(options);

    var self = this;
    this.setData({
      roomID: options.roomId,
      roomName: options.roomName,
      loginType: options.loginType,
    });

    wx.setNavigationBarTitle({
      title: this.data.roomID,
    });

    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true,   
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('>>>[liveroom-room] onShow');

    // 回前台重新拉流
    for (var i = 0; i < this.data.playStreamList.length; i++) {
      zg.startPlayingStream(this.data.playStreamList[i]['streamID']);
      this.data.playStreamList[i]['playContext'] && this.data.playStreamList[i]['playContext'].play();
    }

    // 如果正在推流，回到前台，通知其他成员，使其触发拉流
    if (this.data.isPublishing) {
      console.log('>>>[liveroom-room] sendRoomMsg, begin to send');

      var roomData = "onShow." + this.data.publishStreamID;
      zg.sendRoomMsg(1, 1, roomData, 
        function (seq, msgId, msg_category, msg_type, msg_content) {
          console.log('>>>[liveroom-room] sendRoomMsg, send succeeded');
        },
        function (err, seq, msg_category, msg_type, msg_content) {
          console.log('>>>[liveroom-room] sendRoomMsg, send failed, err: ', err);
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('>>>[liveroom-room] onReady');

    // this.animation = wx.createAnimation({
    //   duration: 3000,
    //   timingFunction: "linear",
    // });

    var timestamp = new Date().getTime();
    var idName = 'xcxU' + timestamp;

    this.setData({
      userID: idName,
      userName : idName,
      appID: 3104114736,
    });

    zg = new ZegoSDK.ZegoClient();
    zg.config({
      appid: this.data.appID,        // 必填，应用id，由即构提供
      idName: this.data.userID,      // 必填，用户自定义id
      nickName: this.data.userName,  // 必填，用户自定义昵称
      remoteLogLevel: 2,             // 日志上传级别，建议取值不小于 logLevel
      logLevel: 0,                   // 日志级别，debug: 0, info: 1, warn: 2, error: 3, report: 99, disable: 100（数字越大，日志越少）
      server: "wss://wssliveroom-demo.zego.im/ws",        // 必填，服务器地址，由即构提供
      logUrl: "https://wsslogger-demo.zego.im/httplog",   // 必填，log 服务器地址，由即构提供
      audienceCreateRoom: true,     // 观众不允许创建房间
    });

    var self = this;

    var publishStreamID = 'xcxS' + timestamp;
    self.setData({
      publishStreamID : publishStreamID,
    });

    console.log('>>>[liveroom-room] publishStreamID is: ' + self.data.publishStreamID);

    // 进入房间，自动登录
    self.getLoginToken();

    // startPlayStream、startPublishStream 后，服务端主动推过来的流更新事件
    // type: {play: 0, publish: 1};
    zg.onStreamUrlUpdate = function (streamid, url, type, reason) {
      console.log(">>>[liveroom-room] zg onStreamUrlUpdate, streamId: " + streamid + ', type: ' + (type === 0 ? 'play' : 'publish') + ', url: ' + url);

      if (type === 1) {
        self.setPushUrl(url);
      } else {
        self.setPlayUrl(streamid, url, self);
      }
    };

    // 服务端主动推过来的 连接断开事件
    zg.onDisconnect = function (err) {
      console.log(">>>[liveroom-room] zg onDisconnect");
    };

    // 服务端主动推过来的 用户被踢掉在线状态事件
    zg.onKickOut = function (err) {
      console.log(">>>[liveroom-room] zg onKickOut");
    };

    // 接收服务端主推送的自定义信令
    zg.onRecvCustomCommand = function (from_userid, from_idName, custom_content) {
      console.log(">>>[liveroom-room] zg onRecvCustomCommand");
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
      console.log(">>>[liveroom-room] zg onStreamExtraInfoUpdated");
    };

    // 服务端主动推过来的 流的播放状态, 视频播放状态通知
    // type: { start:0, stop:1};
    zg.onPlayStateUpdate = function (updatedType, streamID) {
      console.log(">>>[liveroom-room] zg onPlayStateUpdate, " + (updatedType === 0 ? 'start ' : 'stop ') + streamID);

      if (updatedType === 1) {
        // 流播放失败, 停止拉流
        for (var i = 0; i < self.data.playStreamList.length; i++) {
          if (self.data.playStreamList[i]['streamID'] === streamID) {
            self.data.playStreamList[i]['playContext'] && self.data.playStreamList[i]['playContext'].stop();
            self.data.playStreamList[i]['playingState'] = 'failed';
            break;
          }
        }
      } else if (updatedType === 0) {
        // 流播放成功, 更新状态
        for (var i = 0; i < self.data.playStreamList.length; i++) {
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
      var content = chat_data[0].msg_content;
      var category = chat_data[0].msg_category;

      if (category === 1) {
        // 系统消息
        var data = content.split(".");
        var streamID = data[1];
        if (data[0] === "onShow") {
          for (var i = 0; i < self.data.playStreamList.length; i++) {
            if (self.data.playStreamList[i]["streamID"] === streamID && self.data.playStreamList[i]["playingState"] !== 'succeeded') {
              self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].stop();
              self.data.playStreamList[i]["playContext"] && self.data.playStreamList[i]["playContext"].play();
            }
          }
        }
      } else {
        // 评论消息
        var name = chat_data[0].id_name;
        var time = chat_data[0].send_time;

        var message = {};
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
    zg.onPlayQualityUpdate = function (streamID, streamQuality) {
      // console.log(">>>[liveroom-room] zg onPlayQualityUpdate");
      // console.log(streamQuality);
    };

    // 推流后，服务器主动推过来的，流状态更新
    // type: { start: 0, stop: 1 }，主动停止推流没有回调，其他情况均回调
    zg.onPublishStateUpdate = function (type, streamid, error) {
      console.log('>>>[liveroom-room] zg onPublishStateUpdate, streamid: ' + streamid + ', type: ' + (type === 0 ? 'start' : 'stop') + ', error: ' + error);

      // 推流成功
      if (type === 0 && error === 0) {
        if (self.data.loginType === 'anchor') {
          var title = '我(' + self.data.userName + ')'

          self.setData({
            isPublishing: true,
          });
        } else {
          self.setData({
            isPublishing: true,
            beginToPublish: false,
          })
        }
      }

      if (type == 1) {
        self.setData({
          isPublishing: false,
        });

        wx.showModal({
          title: '提示',
          content: '推流断开，请退出房间后重试',
          showCancel: false,
          success: function(res) {
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
        anchorID : anchorId,
        anchorName : anchorName,
      });
    };

    // 收到连麦请求
    zg.onRecvJoinLiveRequest = function(requestId, fromUserId, fromUsername, roomId) {
      console.log('>>>[liveroom-room] onRecvJoinLiveRequest, roomId: ' + roomId + 'requestUserId: ' + fromUserId + ', requestUsername: ' + fromUsername);

      self.data.requestJoinLiveList.push(requestId);

      var content = '观众 ' + fromUsername + ' 请求连麦，是否允许？';
      wx.showModal({
        title: '提示',
        content: content,
        success: function(res) {
          if (res.confirm) {
            console.log('>>>[liveroom-room] onRecvJoinLiveRequest accept join live');
            zg.respondJoinLive(requestId, true); // true：同意；false：拒绝 

            // self.switchPusherOrPlayerMode('pusher', 'RTC');

            // 已达房间上限，主播依然同意未处理的连麦，强制不处理
            if (self.data.reachStreamLimit) {
              wx.showToast({
                title: '房间内连麦人数已达上限，不建立新的连麦',
                icon: 'none',
                duration: 2000
              });
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

    zg.onUserStateUpdate = function(roomId, userList) {
      console.log('>>>[liveroom-room] onUserStateUpdate, roomID: ' + roomId + ', userList: ');
      console.log(userList);

      for (var i = 0; i < userList.length; i++) {
        if (userList[i].role === 1 && userList[i].action === 2) {
          // 主播退出房间
          wx.showModal({
            title: '提示',
            content: '主播已离开，请前往其他房间观看',
            showCancel: false,
            success: function(res) {
              // 用户点击确定，或点击安卓蒙层关闭
              if (res.confirm || !res.cancel) {
                // 强制用户退出
                wx.navigateBack();
                zg.logout();
              }
            }
          });
          break;
        }
      }
    };

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('>>>[liveroom-room] onHide');

    // 退后台停止拉流
    for (var i = 0; i < this.data.playStreamList.length; i++) {
      console.log('>>>[liveroom-room] onHide stopPlayStream: ', this.data.playStreamList[i]['streamID']);
      zg.stopPlayingStream(this.data.playStreamList[i]['streamID']);
      this.data.playStreamList[i]['playContext'] && this.data.playStreamList[i]['playContext'].stop();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('>>>[liveroom-room] onUnload');

    // 停止拉流
    var streamList = this.data.playStreamList;
    for (var i = 0; i < streamList.length; i++) {
      var streamID =  streamList[i]['streamID'];
      console.log('>>>[liveroom-room] onUnload stop play stream, streamid: ' + streamID);
      zg.stopPlayingStream(streamID);

      streamList[i]['playContext'] && streamList[i]['playContext'].stop();
    }

    this.setData({
      playStreamList: [],
    });

    // 停止推流
    zg.stopPublishingStream(this.data.publishStreamID);
    if (this.data.isPublishing) {
      console.log('>>>[liveroom-room] stop publish stream, streamid: ' + this.data.publishStreamID);
      
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var path = '/pages/main/main?type=liveroom&roomID=' + this.data.roomID + '&loginType=audience';
    return {
      title: '即构音视频云',
      path: path,
      imageUrl: '../../../resource/share.png'
    }
  },

  setPlayUrl: function (streamid, url, self) {
    console.log('>>>[liveroom-room] setPlayUrl: ', url);

    if (url.length === 0) {
      console.log('>>>[liveroom-room] setPlayUrl, url is null');
      return;
    }

    for (var i = 0; i < self.data.playStreamList.length; i++) {
      if (self.data.playStreamList[i]['streamID'] === streamid && self.data.playStreamList[i]['playUrl'] === url) {
        console.log('>>>[liveroom-room] setPlayUrl, streamid and url are repeated');
        return;
      }
    }

    var streamInfo = {};
    var isStreamRepeated = false;

    // 相同 streamid 的源已存在，更新 Url
    for (var i = 0; i < self.data.playStreamList.length; i++) {
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
    }, function(){
      // 检查流新增后，是否已经达到房间流上限
      if (self.data.playStreamList.length >= self.data.upperStreamLimit) {
        self.setData({
          reachStreamLimit : true,
        }, function(){
          wx.showToast({
            title: "房间内连麦人数已达上限，不允许新的连麦",
            icon: 'none',
            duration: 2000
          });
        });
      }

      self.adaptContainerSize(self);
    });
  },

  setPushUrl: function (url) {
    console.log('>>>[liveroom-room] setPushUrl: ', url);
    var self = this;

    if (url.length === 0) {
      console.log('>>>[liveroom-room] setPushUrl, url is null');
      return;
    }

    self.setData({
      pushUrl: url,
      pusherVideoContext : wx.createLivePusherContext("video-livePusher", self),
    }, function () {
      self.data.pusherVideoContext.stop();
      self.data.pusherVideoContext.start();

      self.adaptContainerSize(self);

      // self.animation.rotate(720).step();
      // self.setData({animation: this.animation.export()});
    });
  },

  // 界面上 player 和 pusher 数量之和大于 1，则动态调整视图大小
  adaptContainerSize: function () {
    var self = this;
    if (self.data.playStreamList.length + (self.data.pushUrl.length > 0 ? 1 : 0) > 1) {
      console.log('>>>[liveroom-room] adaptContainerSize, to multi size');
      if (!self.data.isMessageHide) {
        self.setData({
          containerAdapt: "container-multi-small",
        });
      } else {
        self.setData({
          containerAdapt: "container-multi-big",
        });
      }
    } else {
      if (!self.data.isMessageHide) {
        console.log('>>>[liveroom-room] adaptContainerSize, to single small size');
        self.setData({
          containerAdapt: "container-single-small",
        });
      } else {
        if (0.57975 * windowHeight > windowWidth) {
          console.log('>>>[liveroom-room] adaptContainerSize, to single big size, calc by width');
          self.setData({
            containerAdapt: "container-single-big-calc-by-width",
          });
        } else {
          console.log('>>>[liveroom-room] adaptContainerSize, to single big size, calc by height');
          self.setData({
            containerAdapt: "container-single-big-calc-by-height",
          });
        }
      }
    }
  },

  adaptContainerBaseSize: function () {
    var self = this;

    try {
      var res = wx.getSystemInfoSync();
      console.log('>>>[liveroom-room] getSystemInfoSync success');
      windowWidth = res.windowWidth;
      windowHeight = res.windowHeight; 
    } catch (e) {
      // Do something when catch error
    }

    if (!self.data.isMessageHide) {
      console.log('>>>[liveroom-room] adaptContainerBaseSize, to small size');
      self.setData({
        containerBaseAdapt: "containerBase-small",
      });
    } else {
      console.log('>>>[liveroom-room] adaptContainerBaseSize, to big size');

      if (0.57975 * windowHeight > windowWidth) {
        self.setData({
          containerBaseAdapt: "containerBase-big-calc-by-width",
        });
      } else {
        self.setData({
          containerBaseAdapt: "containerBase-big-calc-by-height",
        });
      }
    }
  },

  // 获取登录 token
  getLoginToken: function () {
    var self = this;
    const requestTask = wx.request({
      url: 'https://wssliveroom-demo.zego.im/token', //仅为示例，并非真实的接口地址
      data: {
        app_id: self.data.appID,
        id_name: self.data.userID,
      },
      header: {
        'content-type': 'text/plain'
      },
      success: function (res) {
        console.log(">>>[liveroom-room] get login token success. token is: " + res.data);
        if (res.statusCode != 200) {
          return;
        }

        zg.setUserStateUpdate(true);
        self.loginRoom(res.data, self);
      },
      fail: function (e) {
        console.log(">>>[liveroom-room] get login token fail, error is: ")
        console.log(e);
      }
    });
  },

  // 登录房间
  loginRoom: function (token) {
    var self = this;
    console.log('>>>[liveroom-room] login room, roomID: ' + self.data.roomID, ', userID: ' + self.data.userID + ', userName: ' + self.data.userName);

    zg.login(self.data.roomID, self.data.loginType === "anchor" ? 1 : 2, token, function (streamList) {
      console.log('>>>[liveroom-room] login success, streamList is: ');
      console.log(streamList);

      // 房间内已经有流，拉流
      self.startPlayingStreamList(streamList);

      // 主播登录成功即推流
      if (self.data.loginType === 'anchor') {
        console.log('>>>[liveroom-room] anchor startPublishingStream, publishStreamID: ' + self.data.publishStreamID); 
        zg.setPreferPublishSourceType(self.data.preferPublishSourceType); 
        zg.startPublishingStream(self.data.publishStreamID, '');
      }

      // 检查是否已经达到房间流上限
      if (self.data.playStreamList.length >= self.data.upperStreamLimit) {
        self.setData({
          reachStreamLimit : true,
        }, function() {
          wx.showToast({
            title: "房间内连麦人数已达上限，不允许新的连麦",
            icon: 'none',
            duration: 2000
          });
        });
      }
    }, function (err) {
      console.log('>>>[liveroom-room] login failed, error is: ', err);
      if (err) {       
        var title = '登录房间失败，请稍后重试。\n失败信息：' + err.msg;   
        wx.showModal({
          title: '提示',
          content: title,
          showCancel: false,
          success: function(res) {
            if (res.confirm || !res.cancel) {
              wx.navigateBack();
            }
          }
        });
      }
    });
  },

  startPlayingStreamList: function (streamList) {
    var self = this;

    if (streamList.length === 0) {
      console.log('>>>[liveroom-room] startPlayingStream, streamList is null');
      return;
    }

    zg.setPreferPlaySourceType(self.data.preferPlaySourceType); 

    // 获取每个 streamID 对应的拉流 url
    var playStreamList = self.data.playStreamList;
    for (var i = 0; i < streamList.length; i++) {
      var streamID = streamList[i].stream_id;
      var anchorID = streamList[i].anchor_id_name;  // 推这条流的用户id
      console.log('>>>[liveroom-room] startPlayingStream, playStreamID: ' + streamID + ', pushed by : ' + anchorID);
      zg.startPlayingStream(streamID);
    }
  },

  stopPlayingStreamList: function (streamList) {
    var self = this;

    if (streamList.length === 0) {
      console.log('>>>[liveroom-room] stopPlayingStream, streamList is empty');
      return;
    }

    var playStreamList = self.data.playStreamList;
    for (var i = 0; i < streamList.length; i++) {
      var streamID = streamList[i].stream_id;

      console.log('>>>[liveroom-room] stopPlayingStream, playStreamID: ' + streamID);
      zg.stopPlayingStream(streamID);

      // 删除播放流列表中，删除的流
      for (var j = 0; j < playStreamList.length; j++) {
        if (playStreamList[j]['streamID'] === streamID) {
          console.log('>>>[liveroom-room] stopPlayingStream, stream to be deleted: ');
          console.log(playStreamList[j]);

          playStreamList[j]['playContext'] && playStreamList[j]['playContext'].stop();
          
          var content = '一位观众结束连麦，停止拉流';
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
      playStreamList : playStreamList,
    }, function() {
      // 检查流删除后，是否低于房间流上限
      if (self.data.playStreamList.length === self.data.upperStreamLimit - 1) {
        self.setData({
          reachStreamLimit : false,
        }, function() {
          if(self.data.loginType === "audience") {
            wx.showToast({
              title: "一位观众结束连麦，允许新的连麦",
              icon: 'none',
              duration: 2000
            });
          }
        });
      }

      // 主播结束了所有的连麦，切换回 live 模式
      if (self.data.loginType === 'anchor' && self.data.playStreamList.length === 0) {
        // self.switchPusherOrPlayerMode('pusher', 'live');
      }

      self.adaptContainerSize(self);
    });
  },

  onLiveStateChange: function (e) {
    wxPlayer.wxEvent(e);
  },

  onLiveError: function (e) {
    wxPlayer.wxEvent(e);
  },

  // live-player 绑定拉流事件
  onPlayStateChange(e) {
    console.log('>>>[liveroom-room] onPlayStateChange, code: ' + e.detail.code + ', message:' + e.detail.message);
    // 透传拉流事件给 SDK，type 0 拉流
    zg.updatePlayerState(e.currentTarget.id, e, 0);

    if (e.detail.code === 2002 || e.detail.code === 2004) {
      this.updatePlayingStateOnly('succeeded');
    } else if (e.detail.code === -2301) {
      this.updatePlayingStateOnly('failed');
    }
  },

  // 主播异常操作，导致拉流端 play 失败，此时不会影响 SDK 内部拉流状态，但需要额外处理 live-player 状态
  updatePlayingStateOnly: function(newState) {
    for (var index in this.data.playStreamList) {
      var playStream = this.data.playStreamList[index];
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
    zg.updatePlayerNetStatus(this.data.publishStreamID, e, 1);
  },

  // 主播邀请连麦
  inviteJoinLive: function() {
    console.log('>>>[liveroom-room] inviteJoinLive');

    zg.inviteJoinLive('', function(res) {
      console.log('>>>[liveroom-room] inviteJoinLive sent succeeded');
    }, function(error) {
      console.log('>>>[liveroom-room] inviteJoinLive sent failed, error: ', error);
    }, function(result, userID, userName) {
      console.log('>>>[liveroom-room] inviteJoinLive, result: ' + result);
    });
  },

  // 观众请求连麦，或主播邀请连麦
  requestJoinLive: function () {
    var self = this;

    // 防止两次点击操作间隔太快
    var nowTime = new Date();
    if (nowTime - self.data.tapTime < 1000) {
      return;
    }
    self.setData({'tapTime': nowTime});

    // 正在连麦中，不处理
    if (self.data.beginToPublish === true) {
      console.log('>>>[liveroom-room] begin to publishing, ignore');
      return;
    }

    // 房间流已达上限，不处理
    if (self.data.reachStreamLimit === true) {
      console.log('>>>[liveroom-room] reach stream limit, ignore');
      return;
    }

    // 主播点击，走邀请连麦逻辑，待补充
    if (self.data.loginType === 'anchor') {
      console.log('>>>[liveroom-room] anchor inviteJoinLive');
      return;
    }

    // 观众正在连麦时点击，则结束连麦
    if (self.data.isPublishing) {
      zg.endJoinLive(self.data.anchorID, function(result, userID, userName) {
        console.log('>>>[liveroom-room] endJoinLive, result: ' + result);
      }, null);

      // 停止推流
      zg.stopPublishingStream(self.data.publishStreamID);
      
      // 观众结束连麦，切换回 live 模式
      // self.switchPusherOrPlayerMode('player', 'live');
      self.setData({
        isPublishing: false,
        pushUrl: "",
      }, function() {
        // 自己停止推流，不会收到流删减消息，所以此处需要主动调整视图大小
        self.adaptContainerSize(self);
      });

      self.data.pusherVideoContext.stop();
      return;
    }

    // 观众未连麦，点击开始推流
    console.log('>>>[liveroom-room] audience requestJoinLive');
    self.setData({
      beginToPublish: true,
    })

    zg.requestJoinLive(self.data.anchorID, function(res) {
      console.log('>>>[liveroom-room] requestJoinLive sent succeeded');
    }, function(error) {
      console.log('>>>[liveroom-room] requestJoinLive sent failed, error: ', error);
    }, function(result, userID, userName) {
      console.log('>>>[liveroom-room] requestJoinLive, result: ' + result);

      // 待补充，校验 userID
      if (result === false) {
        wx.showToast({
         title: '主播拒绝连麦',
         icon: 'none',
         duration: 2000
        })

        self.setData({
          beginToPublish: false,
        })
      } else {
        // 主播同意了连麦，但此时已经达到了房间流上限，不再进行连麦
        if (self.data.reachStreamLimit) {
          self.setData({
            beginToPublish: false,
          })
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

        // self.switchPusherOrPlayerMode('player', 'RTC');
      }
    });
  },

  switchPusherOrPlayerMode: function (type, mode) {
    var self = this;
    console.log('>>>[liveroom-room] switchPusherOrPlayerMode, type: ' + type + 'mode: ' + mode);
    if (type === 'pusher') {
      self.data.pushConfig.mode = mode;
    } else {
      self.data.playConfig.mode = mode;
    }
  },

  handleMultiJoinLive: function(requestJoinLiveList, requestId, self) {
    for (var i = 0; i < requestJoinLiveList.length; i++) {
      if (requestJoinLiveList[i] != requestId) {
        // 新的连麦弹框会覆盖旧的弹框，拒绝被覆盖的连麦请求
        zg.respondJoinLive(requestJoinLiveList[i], false);
      }
    }
  },

  // 推流画面配置
  switchCamera: function () {
    this.data.pushConfig.frontCamera = !this.data.pushConfig.frontCamera;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
    this.data.pusherVideoContext && this.data.pusherVideoContext.switchCamera();
  },

  setBeauty: function () {
    this.data.pushConfig.isBeauty = (this.data.pushConfig.isBeauty === 0 ? 6 : 0);
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  enableMute: function () {
    this.data.pushConfig.isMute = !this.data.pushConfig.isMute;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  showLog: function () {
    this.data.pushConfig.showLog = !this.data.pushConfig.showLog;
    this.setData({
      pushConfig: this.data.pushConfig,
    });
  },

  bindMessageInput: function (e) {
    var self = this;

    var message = {};
    message.content = e.detail.value;
    message.name = self.data.userID;
    message.time = new Date().format("hh:mm:ss");
    message.id = message.name + Date.parse(new Date());

    self.data.currentMessage = message;
    self.data.tmpMessageList.push(message);
  },

  onComment: function () {
    console.log('>>>[liveroom-room] begin to comment');
    
    var self = this;
    self.data.messageList.push(self.data.tmpMessageList[self.data.tmpMessageList.length - 1]);
    self.data.tmpMessageList = [];

    console.log('>>>[liveroom-room] currentMessage');
    console.log(self.data.currentMessage);

    self.setData({
      messageList: self.data.messageList,
      inputMessage: "",
      scrollToView: self.data.currentMessage.id,
    });

    zg.sendRoomMsg(2, 1, self.data.currentMessage.content, 
      function(seq, msgId, msg_category, msg_type, msg_content) {
      console.log('>>>[liveroom-room] onComment success');
    }, function(err, seq, msg_category, msg_type, msg_content) {
      console.log('>>>[liveroom-room] onComment, error: ');
      console.log(err);
    });
  },

  onShowMessage: function () {
    console.log('>>>[liveroom-room] onShowMessage');
    var self = this;

    if (self.data.messageAdapt === "message-hide") {
      self.data.messageAdapt = "message-show";
      self.data.isMessageHide = false;
    } else {
      self.data.messageAdapt = "message-hide";
      self.data.isMessageHide = true;
    }

    self.setData({
      messageAdapt: self.data.messageAdapt,
      isMessageHide: self.data.isMessageHide,
    });

    self.adaptContainerBaseSize();
    self.adaptContainerSize();

  },

  error(e) {
      console.error('live-player error:', e.detail.errMsg)
  },

})
