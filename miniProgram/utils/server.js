let { tokenURL} = getApp().globalData;

function getLoginToken(userID, appid) {
    return new Promise((res, rej) => {
        wx.request({
            url: tokenURL, //仅为示例，并非真实的接口地址
            data: {
                app_id: appid,
                id_name: userID,
            },
            header: {
                'content-type': 'text/plain'
            },
            success(result) {
                console.log(">>>[liveroom-room] get login token success. token is: " + result.data);
                if (result.statusCode != 200) {
                    return;
                }
                res(result.data);
            },
            fail(e) {
                console.log(">>>[liveroom-room] get login token fail, error is: ")
                console.log(e);
                rej(e)
            }
        });
    });
}

module.exports = {
    getLoginToken
};