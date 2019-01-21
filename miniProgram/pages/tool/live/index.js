// pages/tool/live/index.js

let _methods = {
    switchCamera() {
        this.data.pusherContext && this.data.pusherContext.switchCamera({
            success: () => {
                console.log('switchCamera success');
            },
            fail: () => {
                console.error('switchCamera success');
            },
            complete: () => {
                console.log('switchCamera complete');
            }
        });
    },
    toggleBeauty() {
        let bty = this.data.beauty == 5 ? 0 : 5;
        this.setData({
            beauty: bty
        }, () => {
            console.log(bty > 0 ? '开启美颜' : '关闭美颜')
        })
    },
    toggleDebug() {
        this.setData({
            debug: !this.data.debug
        }, () => {
            console.log('>> Debug: ', this.data.debug);
        })
    },
    toggleMuted() {
        this.setData({
            muted: !this.data.muted
        }, () => {
            console.log('>> Debug: ', this.data.muted);
        });
    },
    toggleOrientation() {
        this.setData({
            orientation: this.data.orientation === 'vertical' ? 'horizontal' : 'vertical'
        }, () => {
            console.log('>> orientation: ', this.data.muted);
        });
    },
    toggleFullScreen() {
        this.setData({
            fullScreen: !this.data.fullScreen
        }, () => {
            console.log('>> fullScreen: ', this.data.fullScreen);
            if (this.data.fullScreen) {
                this.data.playerContext.requestFullScreen();
            }else{
                this.data.playerContext.exitFullScreen();
            }
        });
    }
};

//live-pusher,live-player组件回调
let mediaCallBackHandlers = {
    //拉流监听回调 s
    onMainPlayState: function (ev) {
        console.log('statePlaychange', ev);

        if (ev.detail.code === 2003 || ev.detail.code === 2004) {
            this.setData({
                playingState: 'success'
            });

        } else if (ev.detail.code === -2301) {
            this.setData({
                playingState: 'failed'
            });

        }
    },
    onMainPlayStatus: function (ev) {
        console.log('netStatusPlayChange', ev);
    },
    onMainPlayError: function (ev) {
        console.error(ev);
    },
    //拉流监听回调 e

    //推流监听回调 s
    onMainPushState: function (ev) {
        console.log('statePublishchange', ev);
    },
    onMainPushStatus: function (ev) {
        console.log('netStatusPublishChange', ev);
    },
    onMainPushError: function (ev) {
        console.error(ev);
    }
    //推流监听回调 e
};


Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 1,
        beauty: true,
        debug: false,
        muted: false,
        url: '',
        orientation: "vertical",
        pusherContext: null,
        playerContext: null,
        fullScreen: false,
        playingState: 'initial'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({type, url}) {
        this.setData({type, url});
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        if(this.data.type==1){
            this.data.pusherContext = wx.createLivePlayerContext("pusher", this);
            this.data.pusherContext.start();
        }else if(this.data.type==2){
            this.data.playerContext = wx.createLivePlayerContext("player", this);
            this.data.playerContext.play();
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.data.playerContext.stop();
        this.data.pusherContext.stop();
        this.setData({
            type: 1,
            beauty: true,
            debug: false,
            muted: false,
            url: '',
            orientation: "vertical",
            pusherContext: null,
            playerContext: null,
            fullScreen: false,
            playingState: 'initial'
        });

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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

    },
    ...mediaCallBackHandlers,
    ..._methods
});