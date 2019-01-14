//app.js

App({

  globalData:{
    appID: 1739272706,//,
    roomListURL:"https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706",//https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706//"https://test2-liveroom-api.zego.im/demo/roomlist?appid=1739272706",//"https://liveroom4081596842-api.zego.im/demo/roomlist?appid=4081596842",
    wsServerURL: "wss://wssliveroom-demo.zego.im/ws",//'wss://wssliveroom-test.zego.im/ws',//
    logServerURL: "https://wsslogger-demo.zego.im/httplog"//"https://wsslogger-test.zego.im/httplog"//
  },

  onLaunch: function () {
    console.log("App Launch");
  },

  onShow: function () {
    console.log("App Show");
  },

  onHide: function () {
    console.log("App Hide");
  },
})