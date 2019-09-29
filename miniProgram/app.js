//app.js
const liveAppID = 96527232,//1252712950,
    appSign = '0x51,0xf9,0x60,0x56,0x5e,0xa6,0xb2,0xe1,0x3a,0x8b,0x25,0x27,0x15,0xa0,0x91,0xec,0xce,0xdc,0x87,0xf3,0x3e,0xd3,0x08,0x46,0x22,0xb1,0xb7,0xe9,0xda,0xc9,0x16,0xc3',
// appSign 不可随意暴露
    wsServerURL = "wss://wssliveroom-test.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
   logServerURL = "https://wsslogger-demo.zego.im/httplog";//可不填，sdk有配置时，配置的地址会覆盖这个地址,
App({

    globalData: {
        liveAppID,
        appSign,
        testEnvironment:1,//如果是测试环境需要改成1，正式为0
        tokenURL: "https://wssliveroom-demo.zego.im/token",
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