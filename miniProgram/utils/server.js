function getLoginToken(userID, appid) {
    let { tokenURL,cgi_token} = getApp().globalData;
    return new Promise((res, rej) => {
        wx.request({
            url: tokenURL, //仅为示例，并非真实的接口地址
            data: {
                app_id: appid,
                id_name: userID,
                cgi_token
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

function getLoginToken2 (appId, appSign, idName) {
    const { tokenURL2 } = getApp().globalData;
    const now = new Date().getTime();
    const time = Math.floor(now / 1000 + 30 * 60);
    return new Promise((resolve, reject) => {
        wx.request({
            url: tokenURL2,
            data: {
                app_id: appId,
                app_secret: appSign,
                id_name: idName,
                nonce: now,
                expired: time
            },
            header: {
                "content-type": "text/plain",
            },
            success(res) {
                console.log(">>> [live room] get token succeed, token is ", res)
                if (res.statusCode !== 200) return
                const token = /token:\s(.+)/.exec(res.data)&&/token:\s(.+)/.exec(res.data)[1];
                if (token) {
                    console.log("get token succeed")
                    resolve(token)
                } else {
                    console.log("get token fail")
                    reject()
                }
            },
            fail(err) {
                console.log(">>> [live room] get token failed, error is ", err)
                reject(err)
            }
        })
    })
}

module.exports = {
    getLoginToken,
    getLoginToken2
};