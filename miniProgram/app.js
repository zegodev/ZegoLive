//app.js
const liveAppID = 1739272706, // appID
        appSign = "",  // appSign 不可随意暴露
    wsServerURL = "wss://wssliveroom-demo.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
   logServerURL = "https://wsslogger-demo.zego.im/httplog";//可不填，sdk有配置时，配置的地址会覆盖这个地址,
App({

    globalData: {
        liveAppID,
        appSign,
        tokenURL: "", // 该接口由开发者后台自行实现，开发者的 Token 从各自后台获取。Token实现方式参考文档https://doc-zh.zego.im/article/2313，login_token生成示例代码部分。
        roomListURL: "https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706",//房间列表接口
        wsServerURL,
        logServerURL,
        cgi_token:"", //即构测试用,开发者请忽略
        tokenURL2: "https://sig-wstoken.zego.im:8282/tokenverify", // 即构提供的，前期绕过后端，临时获取token，需要appSign
        existOwnRoomList: false,
    },

    onLaunch() {
        console.log("App Launch");
        var that = this
        if (that.globalData.roomListURL !== '' && that.globalData.roomListURL !== 'https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706') {
            that.globalData.existOwnRoomList = true
        }
    },

    onShow() {
        console.log("App Show");
    },

    onHide() {
        console.log("App Hide");
    },
})