//app.js
const liveAppID = 1739272706,//1252712950,//
       rtcAppID = 1082937486;//demo里面暂时没用到这个appid
App({

    globalData: {
        liveAppID,
        rtcAppID,
        tokenURL: "https://wssliveroom-demo.zego.im/token",
        roomListURL: "https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706",//房间列表接口需要向后台申请才能使用
        wsServerURL: "wss://wssliveroom-demo.zego.im/ws",//'wss://wsliveroom-alpha.zego.im:8282/ws'
        logServerURL: "https://wsslogger-demo.zego.im/httplog",//可不填，sdk有配置时，配置的地址会覆盖这个地址,
        cgi_token:"", //测试用,开发者请
    },

    onLaunch() {
        console.log("App Launch");
    },

    onShow() {
        console.log("App Show");
    },

    onHide() {
        console.log("App Hide");
    },
})