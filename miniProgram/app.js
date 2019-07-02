//app.js
const liveAppID = 1739272706,//1252712950,
        // appSign 不可随意暴露
        appSign = "",
   wsServerURL2 = "wss://wsliveroom" + liveAppID + "-api.zego.im:8282/ws",   // 开发者请填写即构邮件发送给你的
       rtcAppID = 1082937486;//demo里面暂时没用到这个appid
App({

    globalData: {
        liveAppID,
        rtcAppID,
        appSign,
        testEnvironment:0,//如果是测试环境需要改成1，正式为0
        tokenURL: "https://wssliveroom-demo.zego.im/token",
        roomListURL: "https://liveroom1739272706-api.zego.im/demo/roomlist?appid=1739272706",//房间列表接口需要向后台申请才能使用
        wsServerURL: "wss://wssliveroom-demo.zego.im/ws",//即构demo专用，开发者请填写即构邮件发送给你的
        logServerURL: "https://wsslogger-demo.zego.im/httplog",//可不填，sdk有配置时，配置的地址会覆盖这个地址,
        cgi_token:"", //即构测试用,开发者请忽略
        tokenURL2: "https://sig-wstoken.zego.im:8282/tokenverify", // 即构提供的，前期绕过后端，临时获取token，需要appSign
        wsServerURL2,   
        logServerURL2: "",
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